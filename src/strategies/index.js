import { nodeStrategy }   from './node.js';
import { pythonStrategy } from './python.js';
import { staticStrategy } from './static.js';
import { goStrategy }     from './go.js';
import { rustStrategy }   from './rust.js';

const strategies = {
  node:   nodeStrategy,
  python: pythonStrategy,
  static: staticStrategy,
  go:     goStrategy,
  rust:   rustStrategy,
};

export function getStrategy(type) {
  return strategies[type] || null;
}