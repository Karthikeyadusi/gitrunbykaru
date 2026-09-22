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

export function registerStrategy(type, strategy) {
  strategies[type] = strategy;
}

export { strategies };
export { nodeStrategy } from './node.js';
export { pythonStrategy } from './python.js';
export { staticStrategy } from './static.js';
export { goStrategy } from './go.js';
export { rustStrategy } from './rust.js';