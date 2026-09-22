import { printBanner, printSuccess, printError, printWarning, cliLogger, createSpinner, runInstallWithProgress } from './logger.js';

export const cliUi = {
  printBanner,
  printSuccess,
  printError,
  printWarning,
  log: cliLogger,
  step: cliLogger.step,
  success: cliLogger.success,
  warning: cliLogger.warning,
  error: cliLogger.error,
  dim: cliLogger.dim,
  info: cliLogger.info,
  createSpinner,
  runInstallWithProgress,
};