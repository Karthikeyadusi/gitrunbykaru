import { cloneRepo } from '../clone.js';
import { executeEngineOnDirectory } from '../engine/index.js';
import { rmSync, existsSync } from 'fs';

function removeTmpDir(targetDir, logger) {
  if (!targetDir || !existsSync(targetDir)) return;
  try {
    rmSync(targetDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 250 });
    if (!existsSync(targetDir)) {
      if (logger && typeof logger.success === 'function') {
        logger.success(`Cleaned up ${targetDir}`);
      }
      return;
    }
  } catch {
    for (let i = 0; i < 5; i++) {
      try {
        const start = Date.now();
        while (Date.now() - start < 300) {}
        rmSync(targetDir, { recursive: true, force: true });
        if (!existsSync(targetDir)) {
          if (logger && typeof logger.success === 'function') {
            logger.success(`Cleaned up ${targetDir}`);
          }
          return;
        }
      } catch {}
    }
  }
}

/**
 * RemoteWorkspaceProvider — Acquires workspace via Git clone into OS /tmp.
 * Tears down and deletes temporary directory on session stop.
 */
export class RemoteWorkspaceProvider {
  static async acquireAndRun(repoUrl, options = {}, logger = {}) {
    const url = repoUrl.replace(/\.git$/, '');
    const tmpDir = await cloneRepo(url);

    try {
      const session = await executeEngineOnDirectory(tmpDir, options, logger);

      // Wrap session.stop() to perform teardown directory deletion
      const originalStop = session.stop.bind(session);
      session.stop = async () => {
        await originalStop();
        if (!options.keep) {
          removeTmpDir(tmpDir, logger);
        }
      };

      return session;
    } catch (err) {
      if (!options.keep) {
        removeTmpDir(tmpDir, logger);
      }
      throw err;
    }
  }
}
