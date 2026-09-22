import { runCli } from './cli/index.js';
import {
  RemoteWorkspaceProvider,
  LocalWorkspaceProvider,
  executeEngineOnDirectory,
  detectProject,
  prepareEnvironment,
  spawnProcessTree,
  verifyHttpServerReady,
  RuntimeSession,
  RuntimeEngineError,
  ErrorCodes,
  getStrategy,
  registerStrategy,
  nodeStrategy,
  pythonStrategy,
  staticStrategy,
  goStrategy,
  rustStrategy,
  cloneRepo,
} from './core/index.js';

export async function run(target, options = {}) {
  await runCli(target, options);
}

export {
  // Engine
  executeEngineOnDirectory as executeEngine,
  executeEngineOnDirectory,
  detectProject,
  prepareEnvironment,
  spawnProcessTree,
  verifyHttpServerReady,

  // Session
  RuntimeSession,

  // Errors
  RuntimeEngineError,
  ErrorCodes,

  // Strategies
  getStrategy,
  registerStrategy,
  nodeStrategy,
  pythonStrategy,
  staticStrategy,
  goStrategy,
  rustStrategy,

  // Providers
  RemoteWorkspaceProvider,
  LocalWorkspaceProvider,

  // Clone
  cloneRepo,
};