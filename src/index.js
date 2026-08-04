import { runCli } from './cli/index.js';
import { RemoteWorkspaceProvider } from './providers/remote.js';
import { LocalWorkspaceProvider } from './providers/local.js';
import { executeEngineOnDirectory } from './engine/index.js';

export async function run(target, options = {}) {
  await runCli(target, options);
}

export {
  RemoteWorkspaceProvider,
  LocalWorkspaceProvider,
  executeEngineOnDirectory as executeEngine
};