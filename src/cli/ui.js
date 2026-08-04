import { printBanner, printSuccess, printError, printWarning, log } from '../logger.js';

export const cliUi = {
  printBanner,
  printSuccess,
  printError,
  printWarning,
  log,
  step: (msg) => log.step(msg),
  success: (msg) => log.success(msg),
  warning: (msg) => log.warning(msg),
  error: (msg) => log.error(msg),
  dim: (msg) => log.dim(msg),
  info: (msg) => log.info(msg)
};
