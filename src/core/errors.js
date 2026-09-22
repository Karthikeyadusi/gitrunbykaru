/**
 * RuntimeEngineError - Structured error class for the GitRunByKaru engine
 * Provides stable error codes for programmatic handling across CLI, MCP, and Chrome extension
 */

export const ErrorCodes = {
  // Detection phase
  DETECTION_FAILED: 'DETECTION_FAILED',
  UNSUPPORTED_PROJECT: 'UNSUPPORTED_PROJECT',
  NO_STRATEGY: 'NO_STRATEGY',

  // Preparation phase
  PREPARATION_FAILED: 'PREPARATION_FAILED',

  // Installation phase
  INSTALLATION_FAILED: 'INSTALLATION_FAILED',

  // Launch phase
  LAUNCH_FAILED: 'LAUNCH_FAILED',

  // Readiness phase
  READINESS_FAILED: 'READINESS_FAILED',
  PORT_TIMEOUT: 'PORT_TIMEOUT',

  // Generic
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BRIDGE_UNAVAILABLE: 'BRIDGE_UNAVAILABLE',
  SESSION_NOT_FOUND: 'SESSION_NOT_FOUND',
};

export class RuntimeEngineError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = 'RuntimeEngineError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();

    // Maintains proper stack trace in V8 environments
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RuntimeEngineError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }

  static fromError(error, fallbackCode = ErrorCodes.INTERNAL_ERROR) {
    if (error instanceof RuntimeEngineError) {
      return error;
    }
    return new RuntimeEngineError(fallbackCode, error?.message || String(error), {
      originalError: error?.stack,
    });
  }
}

// Helper functions for common errors
export function detectionFailed(message, details) {
  return new RuntimeEngineError(ErrorCodes.DETECTION_FAILED, message, details);
}

export function unsupportedProject(message, details) {
  return new RuntimeEngineError(ErrorCodes.UNSUPPORTED_PROJECT, message, details);
}

export function noStrategy(type, details) {
  return new RuntimeEngineError(ErrorCodes.NO_STRATEGY, `No engine strategy available for type "${type}".`, details);
}

export function preparationFailed(message, details) {
  return new RuntimeEngineError(ErrorCodes.PREPARATION_FAILED, message, details);
}

export function installationFailed(message, details) {
  return new RuntimeEngineError(ErrorCodes.INSTALLATION_FAILED, message, details);
}

export function launchFailed(message, details) {
  return new RuntimeEngineError(ErrorCodes.LAUNCH_FAILED, message, details);
}

export function readinessFailed(message, details) {
  return new RuntimeEngineError(ErrorCodes.READINESS_FAILED, message, details);
}

export function portTimeout(port, details) {
  return new RuntimeEngineError(ErrorCodes.PORT_TIMEOUT, `Port ${port} did not become ready within timeout.`, details);
}