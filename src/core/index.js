/**
 * @gitrunbykaru/core - Public API
 * Pure engine for running GitHub repositories locally.
 * No CLI dependencies (chalk, ora). Consumers provide their own logger implementation.
 */

// Engine
export { executeEngineOnDirectory } from './engine.js';
export { detectProject } from './detection.js';
export { prepareEnvironment } from './prepare.js';
export { spawnProcessTree } from './runner.js';
export { verifyHttpServerReady } from './readiness.js';

// Session
export { RuntimeSession } from './session.js';

// Errors
export {
  RuntimeEngineError,
  ErrorCodes,
  detectionFailed,
  unsupportedProject,
  noStrategy,
  preparationFailed,
  installationFailed,
  launchFailed,
  readinessFailed,
  portTimeout,
} from './errors.js';

// Strategies
export {
  getStrategy,
  registerStrategy,
  strategies,
  nodeStrategy,
  pythonStrategy,
  staticStrategy,
  goStrategy,
  rustStrategy,
} from './strategies/index.js';

// Providers
export { RemoteWorkspaceProvider } from './providers/remote.js';
export { LocalWorkspaceProvider } from './providers/local.js';

// Clone
export { cloneRepo } from './clone.js';

// Logger interface
export { LoggerInterface, noopLogger, ensureLogger } from './logger.js';