import http from 'http';

/**
 * Probes the HTTP port every 100ms until a valid TCP socket GET response is received.
 * Returns true if server accepts connection before timeout.
 */
export function verifyHttpServerReady(port, host = 'localhost', timeout = 45000) {
  return new Promise((resolve) => {
    const start = Date.now();
    const check = () => {
      if (Date.now() - start > timeout) {
        resolve(false);
        return;
      }
      const req = http.request({
        method: 'GET',
        host,
        port,
        path: '/',
        timeout: 500,
      }, (res) => {
        res.resume(); // consume response stream
        resolve(true);
      });
      req.once('error', () => {
        setTimeout(check, 100);
      });
      req.once('timeout', () => {
        req.destroy();
        setTimeout(check, 100);
      });
      req.end();
    };
    check();
  });
}
