# Contributing to GitRunByKaru

Thank you for your interest in contributing to **GitRunByKaru**!

GitRunByKaru is an open-source developer tool and npm CLI designed to automatically clone, configure, install dependencies, and launch conventional GitHub repositories locally with a single command. It also powers an Anthropic Model Context Protocol (MCP) server for AI coding assistants.

---

## 🏗️ Core Architecture at a Glance

GitRunByKaru is structured in four decoupled layers:

```text
       Interfaces (Human CLI `grbk` / Native MCP Server `gitrunbykaru-mcp` / Machine `--json`)
                                       │
                                       ▼
       Workspace Providers (`RemoteWorkspaceProvider` ephemeral / `LocalWorkspaceProvider` in-place)
                                       │
                                       ▼
       Runtime Engine (`executeEngineOnDirectory` pure orchestration pipeline)
                                       │
                                       ▼
       Execution Strategies (`Node`, `Python`, `Static`, `Go [Dev]`, `Rust [Dev]`)
```

*   **Interfaces (`src/cli/`, `src/mcp/`):** Capture user intent, manage flags, and handle CLI UI spinners or MCP JSON-RPC protocol.
*   **Workspace Providers (`src/providers/`):** Prepare target directories (shallow cloning to ephemeral OS temp paths vs. local in-place).
*   **Runtime Engine (`src/engine/`):** Pure, stateless orchestration orchestrating detection, environment synthesis, installation, process spawning, port discovery, and teardown.
*   **Execution Strategies (`src/strategies/`):** Modular strategies defining framework installation commands, execution scripts, and port detection regex patterns.

---

## 🤝 How You Can Participate

We welcome contributions across all areas of the project:

1. **Report Bugs:** Open an issue if a command fails unexpectedly or crashes.
2. **Report Repository Compatibility:** Help test real-world repositories and report what works or breaks via the [Compatibility Report template](.github/ISSUE_TEMPLATE/compatibility_report.md).
3. **Suggest Features:** Share workflow improvements or new CLI/MCP capabilities.
4. **Improve Documentation:** Fix typos, add examples, or improve setup guides.
5. **Submit Fixes & Optimizations:** Fix cross-platform edge cases, process lifecycle bugs, or packaging overhead.
6. **Add or Improve Execution Strategies:** Enhance existing framework detection or add new stack strategies.

---

## 🛠️ Local Development Setup

To work on GitRunByKaru locally:

```bash
# 1. Clone your fork of the repository
git clone https://github.com/YOUR_USERNAME/gitrunbykaru.git
cd gitrunbykaru

# 2. Install dependencies
npm install

# 3. Run the automated test suite
npm test
```

To test the CLI binary locally against a real repository without global install:
```bash
node bin/gitrunbykaru.js https://github.com/user/repo
```

To run the local documentation landing page:
```bash
npm run web:dev
```

---

## 🔄 Recommended Contribution Workflow

1. **Fork the Repository:** Create your own fork on GitHub.
2. **Create a Feature Branch:**
   ```bash
   git checkout -b fix/your-bug-fix
   # or
   git checkout -b feat/your-feature
   ```
3. **Make Focused Changes:** Keep pull requests concise and centered around a single issue or improvement.
4. **Run Tests:** Ensure all tests pass before opening a PR:
   ```bash
   npm test
   ```
   If you modified the website, verify the production build succeeds:
   ```bash
   npm run web:build
   ```
5. **Submit a Pull Request:** Open a PR against `main` using the provided PR template. Explain clearly what changed, why, and how you tested it.

---

## 🧩 Strategy Contributions

Framework support is modularized using the **Strategy Pattern**.

*   Each strategy is an isolated module located in [`src/strategies/`](src/strategies/) conforming to the engine contract (`name`, `install`, `getRunCommand`, `portPattern`).
*   Strategies should integrate cleanly with the existing engine pipeline rather than duplicating orchestration, cloning, or process handling logic.
*   Check existing implementations ([`src/strategies/node.js`](src/strategies/node.js), [`src/strategies/python.js`](src/strategies/python.js)) as reference models.

### 🐹 Go and 🦀 Rust Support Status
Go and Rust strategies are implemented in `src/strategies/go.js` and `src/strategies/rust.js`, but remain **Under Development / Experimental** while wider ecosystem compatibility is being validated. Contributions helping test, harden, and expand Go/Rust project structure compatibility are very welcome!

---

## 🛡️ Security & Defensive Coding

Because GitRunByKaru executes code locally on the user's host machine:
*   **Never execute untrusted input directly in unquoted shell strings.** Always use argument arrays with `spawn` / `spawnSync` / `execFileSync`.
*   **Never commit secrets, credentials, or `.env` files.**
*   **Maintain ephemeral safety:** Ensure child process trees and temporary directories are guaranteed to terminate and clean up cleanly on `SIGINT` / `SIGTERM` / error.

---

## 📜 Code of Conduct

All contributors and participants are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat everyone with respect and kindness.
