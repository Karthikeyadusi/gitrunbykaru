# Contributing to GitRunByKaru

Thank you for your interest in contributing to GitRunByKaru!

Whether you're fixing a bug, improving documentation, or adding support for a new framework, contributions are always welcome. GitRunByKaru is designed to be a simple, convention-over-configuration repository explorer.

---

## Development Setup

To run and debug the tool locally:

1. Clone the repository and install Node dependencies:
   ```bash
   git clone https://github.com/yourusername/gitrunbykaru
   cd gitrunbykaru
   npm install
   ```

2. Link the binary globally to run the command on demand:
   ```bash
   npm link
   ```

Now you can test it in any shell:
```bash
gitrunbykaru https://github.com/user/repo
```

---

## Running Tests

Before submitting a pull request, run the test suite to verify there are no syntax or configuration regressions:
```bash
npm test
```

---

## Repository Structure

*   `bin/`: CLI command argument mapping and option setup (`commander` logic).
*   `src/index.js`: The orchestrator that coordinates cloning, detecting, installing, running, and cleaning up.
*   `src/clone.js`: Clones repositories and resolves Windows path bugs.
*   `src/detect.js`: Scans the directories to detect stack setups.
*   `src/runner.js`: Manages child processes, stdin/stdout stream routing, and browser launches.
*   `src/strategies/`: Strategy modules defining installation, execution commands, and port log regex checks.
*   `docs/`: Architecture documentation, changelogs, and release notes.

---

## Strategy Interface Overview

Framework support is isolated using the **Strategy Pattern**. If you want to add support for a new framework (e.g., Rust, Go, Ruby on Rails), your strategy module must conform to the following interface:

```typescript
interface Strategy {
  readonly name: string;
  install(dir: string, detection: DetectionResult): Promise<void>;
  getRunCommand(detection: DetectionResult, dir: string): string;
  readonly portPattern: RegExp;
}
```

*   `install`: Performs any installation needed (e.g. creating Python virtual environments or installing dependencies). Keep this stateless.
*   `getRunCommand`: Generates the command string. Avoid mutating parameters; resolve paths dynamically using the `dir` parameter.
*   `portPattern`: A regular expression to extract the active port number from stdout/stderr lines.

Register your new module in [`src/strategies/index.js`](src/strategies/index.js). Existing strategies provide good reference implementations and should be preferred over introducing new execution patterns.

---

## Coding Principles

*   **Security First:** Never run user inputs inside command shells. Use `execFileSync` or argument arrays for `spawn`/`spawnSync`.
*   **Stateless Strategies:** Strategies must never store mutable runtime data on shared objects or within singleton class properties. Keep strategy implementation stateless.
*   **Convention Over Configuration:** Do not add complex JSON parameters, custom configs, or system override flags unless absolutely necessary.
*   **Stream Line Buffering:** Always parse output stream lines using Node's standard `readline` module. Avoid chunk-based splits.
*   **Platform Neutrality:** Ensure path joins use standard `path` utilities and that Windows-specific process tree cleanup (`taskkill` and shell wrapping) is respected.

---

## Reporting Issues

If you encounter a bug, please include:
- Operating system.
- Node.js version.
- Repository URL.
- Console output logs.
- Step-by-step instructions to reproduce the issue.

---

## Pull Request Expectations

1. Keep PR scope focused on fixing a single issue or adding a single framework strategy.
2. Verify behavior on the platforms affected by your change. Cross-platform changes should be tested on both Windows and Unix-like systems whenever possible.
3. Ensure no memory leaks are introduced in the global process signal registry.
4. Keep the documentation in the README clean and focused on developer experience.
5. Update documentation if behavior changes.
