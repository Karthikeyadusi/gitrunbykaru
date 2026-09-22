/**
 * Logger Interface - Abstract interface for logging in the GitRunByKaru core.
 * Consumers (CLI, MCP, Chrome extension) must implement this interface.
 * The core only depends on this interface, not on chalk, ora, or any specific logging library.
 */

/**
 * @typedef {Object} LoggerInterface
 * @property {function(string): void} step - Major pipeline step (e.g., "Detecting project type...")
 * @property {function(string): void} success - Success message (e.g., "Ready http://localhost:3000")
 * @property {function(string): void} warn - Warning (non-fatal issue)
 * @property {function(string): void} warning - Alias for warn
 * @property {function(string): void} error - Error message
 * @property {function(string): void} dim - Dim/debug message
 * @property {function(string): void} info - Info message
 * @property {function(string): {start: function(), succeed: function(string), fail: function(string)}} createSpinner - Creates a spinner for long-running operations
 */

/**
 * Default no-op logger for when no logger is provided
 */
export const noopLogger = {
  step: () => {},
  success: () => {},
  warn: () => {},
  warning: () => {},
  error: () => {},
  dim: () => {},
  info: () => {},
  createSpinner: (text) => ({
    start: () => {},
    succeed: (msg) => {},
    fail: (msg) => {},
  }),
};

/**
 * Validates that a logger implements the required interface
 * @param {LoggerInterface} logger
 * @returns {LoggerInterface} - The logger with noop fallbacks for missing methods
 */
export function ensureLogger(logger = {}) {
  return {
    step: logger.step || noopLogger.step,
    success: logger.success || noopLogger.success,
    warn: logger.warn || noopLogger.warn,
    warning: logger.warning || logger.warn || noopLogger.warning,
    error: logger.error || noopLogger.error,
    dim: logger.dim || noopLogger.dim,
    info: logger.info || noopLogger.info,
    createSpinner: logger.createSpinner || noopLogger.createSpinner,
  };
}

export const LoggerInterface = {
  step: 'function',
  success: 'function',
  warn: 'function',
  warning: 'function',
  error: 'function',
  dim: 'function',
  info: 'function',
  createSpinner: 'function',
};