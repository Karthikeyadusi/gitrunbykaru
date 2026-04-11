import { nodeStrategy }   from './node.js';
import { pythonStrategy } from './python.js';
import { staticStrategy } from './static.js';

const strategies = {
  node:   nodeStrategy,
  python: pythonStrategy,
  static: staticStrategy,
};

export function getStrategy(type) {
  return strategies[type] || null;
}