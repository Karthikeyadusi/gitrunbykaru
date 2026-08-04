/**
 * RuntimeSession — Stateful representation of a running workspace execution session.
 * States: Created ➔ Preparing ➔ Installing ➔ Launching ➔ Ready ➔ Stopped ➔ Destroyed
 */
export class RuntimeSession {
  constructor({ sessionId, workspace, port, framework, pid, stopFn }) {
    this.sessionId = sessionId;
    this.workspace = workspace;
    this.port = port || null;
    this.url = port ? `http://localhost:${port}` : null;
    this.framework = framework || 'Unknown';
    this.pid = pid || null;
    this.state = 'Created';
    this._stopFn = stopFn || null;
    this.createdAt = new Date().toISOString();
  }

  setState(newState) {
    this.state = newState;
  }

  async stop() {
    if (this.state === 'Stopped' || this.state === 'Destroyed') return;
    this.state = 'Stopped';
    if (typeof this._stopFn === 'function') {
      await this._stopFn();
    }
    this.state = 'Destroyed';
  }

  toJSON() {
    return {
      sessionId: this.sessionId,
      workspace: this.workspace,
      pid: this.pid,
      url: this.url,
      port: this.port,
      framework: this.framework,
      status: this.state === 'Destroyed' ? 'stopped' : this.state.toLowerCase()
    };
  }
}
