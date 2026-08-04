import { detectProject } from './detect.js';
import { prepareEnvironment } from './prepare.js';
import { spawnProcessTree } from './runner.js';
import { verifyHttpServerReady } from './readiness.js';
import { getStrategy } from '../strategies/index.js';
import { RuntimeSession } from './session.js';

let sessionCounter = 0;

/**
 * Pure Engine Orchestrator: Runs on a target directory.
 * Unaware of Git, GitHub URLs, CLI interfaces, or MCP protocols.
 * Returns a stateful RuntimeSession instance.
 */
export async function executeEngineOnDirectory(dirPath, options = {}, logger = {}) {
  sessionCounter++;
  const sessionId = `grbk-sess-${Date.now().toString(36)}-${sessionCounter}`;

  // Step 1: Detect
  const detection = await detectProject(dirPath, logger);
  if (!detection) {
    throw new Error('UNSUPPORTED_PROJECT: Could not auto-detect project strategy.');
  }

  const strategy = getStrategy(detection.type);
  if (!strategy) {
    throw new Error(`NO_STRATEGY: No engine strategy available for type "${detection.type}".`);
  }

  // Step 2: Prepare (.env)
  prepareEnvironment(dirPath, logger);

  // Step 3: Install dependencies
  await strategy.install(dirPath, detection);

  // Step 4: Spawn process tree
  const { pid, port, killChild } = await spawnProcessTree(dirPath, detection, strategy, options, logger);

  // Step 5: Instantiate RuntimeSession
  const session = new RuntimeSession({
    sessionId,
    workspace: dirPath,
    port,
    framework: detection.framework || detection.label,
    pid,
    stopFn: async () => {
      if (typeof killChild === 'function') {
        killChild();
      }
    }
  });

  session.setState('Launching');

  // Step 6: Verify HTTP readiness
  if (port) {
    const isReady = await verifyHttpServerReady(port);
    if (isReady) {
      session.setState('Ready');
    }
  } else {
    session.setState('Ready');
  }

  return session;
}
