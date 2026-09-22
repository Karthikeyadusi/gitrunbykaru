#!/usr/bin/env node
import { RemoteWorkspaceProvider } from '../core/providers/remote.js';

const MAX_MESSAGE_BYTES = 1024 * 1024;

/** Chrome Native Messaging host. It never accepts shell commands. */
export class NativeMessagingHost {
  constructor({ send, launchRemote = defaultLaunchRemote } = {}) {
    this.send = send || (() => {});
    this.launchRemote = launchRemote;
    this.activeSessions = new Map();
  }

  async handleMessage(message) {
    const requestId = message?.requestId ?? null;
    try {
      if (!message || typeof message !== 'object') throw protocolError('INVALID_REQUEST', 'Message must be an object.');
      switch (message.type) {
        case 'run': return this.startRun(message, requestId);
        case 'stop': return this.stopSession(message, requestId);
        case 'status': return this.getSessionStatus(message, requestId);
        default: throw protocolError('UNKNOWN_COMMAND', `Unsupported bridge command: ${String(message.type)}.`);
      }
    } catch (error) {
      this.replyError(requestId, error);
    }
  }

  startRun(message, requestId) {
    const repoUrl = normalizeGitHubRepositoryUrl(message.repoUrl);
    const preferredPort = validatePreferredPort(message.preferredPort);
    const launchId = `grbk-launch-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    this.send({ type: 'accepted', requestId, launchId, repoUrl });
    this.send({ type: 'session_status', requestId, launchId, status: 'cloning', repoUrl });

    void this.launchRemote(repoUrl, {
      quiet: true,
      open: true,
      port: preferredPort,
      onStatus: (event) => this.send({ type: 'session_status', requestId, launchId, ...event }),
    }).then((session) => {
      this.activeSessions.set(session.sessionId, session);
      this.send({ type: 'run_result', requestId, launchId, ...session.toJSON() });
    }).catch((error) => this.replyError(requestId, error, { launchId }));
  }

  async stopSession(message, requestId) {
    const sessionId = requireSessionId(message.sessionId);
    const session = this.activeSessions.get(sessionId);
    if (!session) throw protocolError('SESSION_NOT_FOUND', `Session ID "${sessionId}" is not active.`);
    await session.stop();
    this.activeSessions.delete(sessionId);
    this.send({ type: 'stop_result', requestId, sessionId, status: 'stopped' });
  }

  getSessionStatus(message, requestId) {
    const sessionId = requireSessionId(message.sessionId);
    const session = this.activeSessions.get(sessionId);
    if (!session) throw protocolError('SESSION_NOT_FOUND', `Session ID "${sessionId}" is not active.`);
    this.send({ type: 'status_result', requestId, ...session.toJSON() });
  }

  replyError(requestId, error, details = {}) {
    const payload = typeof error?.toJSON === 'function'
      ? error.toJSON()
      : { code: error?.code || 'BRIDGE_ERROR', message: error?.message || String(error) };
    this.send({ type: 'error', requestId, status: 'error', ...details, ...payload });
  }
}

export function normalizeGitHubRepositoryUrl(value) {
  if (typeof value !== 'string') throw protocolError('INVALID_REPOSITORY_URL', 'repoUrl must be a string.');
  let url;
  try { url = new URL(value); } catch { throw protocolError('INVALID_REPOSITORY_URL', 'repoUrl must be a valid URL.'); }
  const [owner, repository] = url.pathname.split('/').filter(Boolean);
  if (url.protocol !== 'https:' || url.hostname !== 'github.com' || !owner || !repository) {
    throw protocolError('INVALID_REPOSITORY_URL', 'Only public https://github.com/<owner>/<repository> URLs are allowed.');
  }
  return `https://github.com/${owner}/${repository.replace(/\.git$/, '')}`;
}

export function validatePreferredPort(value) {
  if (value === undefined || value === null) return undefined;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw protocolError('INVALID_PORT', 'preferredPort must be an integer between 1 and 65535.');
  return port;
}

function requireSessionId(value) {
  if (typeof value !== 'string' || !value.trim()) throw protocolError('INVALID_SESSION_ID', 'sessionId must be a non-empty string.');
  return value;
}

function protocolError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

async function defaultLaunchRemote(repoUrl, options) {
  return RemoteWorkspaceProvider.acquireAndRun(repoUrl, options, {});
}

export function writeNativeMessage(message, write = process.stdout.write.bind(process.stdout)) {
  const body = Buffer.from(JSON.stringify(message), 'utf8');
  const header = Buffer.alloc(4);
  header.writeUInt32LE(body.length, 0);
  write(Buffer.concat([header, body]));
}

export function startNativeMessagingHost({ input = process.stdin, output = process.stdout } = {}) {
  const write = output.write.bind(output);
  const host = new NativeMessagingHost({ send: (message) => writeNativeMessage(message, write) });
  let pending = Buffer.alloc(0);
  input.on('data', (chunk) => {
    pending = Buffer.concat([pending, chunk]);
    while (pending.length >= 4) {
      const messageLength = pending.readUInt32LE(0);
      if (messageLength > MAX_MESSAGE_BYTES) {
        pending = Buffer.alloc(0);
        host.replyError(null, protocolError('MESSAGE_TOO_LARGE', 'Native message exceeds 1 MiB.'));
        return;
      }
      if (pending.length < messageLength + 4) return;
      const raw = pending.subarray(4, messageLength + 4).toString('utf8');
      pending = pending.subarray(messageLength + 4);
      try { void host.handleMessage(JSON.parse(raw)); }
      catch { host.replyError(null, protocolError('INVALID_JSON', 'Native message is not valid JSON.')); }
    }
  });
  return host;
}

if (import.meta.url === `file:///${process.argv[1]?.replace(/\\/g, '/')}`) {
  const protocolWrite = process.stdout.write.bind(process.stdout);
  process.stdout.write = () => true;
  process.stderr.write = () => true;
  startNativeMessagingHost({ output: { write: protocolWrite } });
}
