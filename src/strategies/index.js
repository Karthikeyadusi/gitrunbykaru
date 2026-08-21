import { nodeStrategy }   from './node.js';
import { pythonStrategy } from './python.js';
import { staticStrategy } from './static.js';
import { goStrategy }     from './go.js';

const strategies = {
  node:   nodeStrategy,
  python: pythonStrategy,
  static: staticStrategy,
  go:     goStrategy,
};

export function getStrategy(type) {
  return strategies[type] || null;
}