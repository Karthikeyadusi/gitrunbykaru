import { realpathSync, existsSync } from 'fs';
import { resolve } from 'path';
import { executeEngineOnDirectory } from '../engine/index.js';

/**
 * LocalWorkspaceProvider — Adapts an existing local filesystem workspace.
 * Executes engine in-place and NEVER deletes workspace files on teardown.
 */
export class LocalWorkspaceProvider {
  static async acquireAndRun(targetPath = '.', options = {}, logger = {}) {
    const absPath = resolve(process.cwd(), targetPath);
    if (!existsSync(absPath)) {
      throw new Error(`Directory not found: ${absPath}`);
    }

    const canonicalPath = process.platform === 'win32'
      ? realpathSync.native(absPath)
      : realpathSync(absPath);

    // Executes engine in-place — session.stop() kills process tree without touching workspace files
    const session = await executeEngineOnDirectory(canonicalPath, options, logger);
    return session;
  }
}
