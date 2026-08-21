# gitrunbykaru

[![npm version](https://img.shields.io/npm/v/gitrunbykaru.svg)](https://www.npmjs.com/package/gitrunbykaru)
[![Website](https://img.shields.io/badge/Website-gitrunbykaru.vercel.app-c084fc)](https://gitrunbykaru.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![node](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)](https://nodejs.org)

> Turn a GitHub repository into a running development environment with a single command.  
> 🌐 **Live Web Demo:** [https://gitrunbykaru.vercel.app](https://gitrunbykaru.vercel.app)

```bash
gitrunbykaru https://github.com/user/repo
# or short command:
grbk https://github.com/user/repo
```

GitRunByKaru started as a CLI, but its execution pipeline has evolved into a reusable runtime engine shared by both developers and AI coding agents.

---

## Installation

Requires Node.js 18+.

```bash
npm install -g gitrunbykaru
```

---

## Quick Start

Run a public repository locally in one command:
```bash
gitrunbykaru https://github.com/user/repo
# Short command alias:
grbk https://github.com/user/repo
```

### Real-world Example

Try the tool directly on its own repository to see it run:
```bash
gitrunbykaru https://github.com/Karthikeyadusi/gitrunbykaru
```

### Useful Flags

*   `--no-open`: Skip opening the browser automatically.
*   `--keep`: Keep the temporary cloned directory after exiting (useful for debugging).
*   `--json`: Output structured machine-readable `RuntimeSession` JSON payload.

---

## Why I Built This

As developers, we constantly browse Reddit, GitHub, LinkedIn, hackathons, and developer communities. We find many interesting, creative, or educational open-source repositories that we want to quickly run or learn from.

But getting them running locally involves repetitive setup friction:
1. Cloning the repository.
2. Reading the README.
3. Figuring out the package manager.
4. Installing dependencies.
5. Configuring `.env` files.
6. Finding the correct run command.
7. Debugging setup errors.
8. Finally opening localhost in the browser.

Too often, you spend more time getting a project running than actually exploring it.

I built GitRunByKaru to solve this exact workflow: **"I found a cool conventional repository, and I want to see it running locally right now."**

It optimizes for the common case: getting interesting projects running quickly with minimal effort. If a repository follows common conventions, GitRunByKaru aims to get you from a GitHub URL to a running application with a single command.

---

## What GitRunByKaru Does

GitRunByKaru processes repositories through an automated execution pipeline:

```text
GitHub URL
      ↓
    Clone
      ↓
Detect Framework
      ↓
Install Dependencies
      ↓
Prepare Environment (.env)
      ↓
   Launch
      ↓
    Ready
      ↓
   Cleanup
```

*   **Clones the repository** into a clean, temporary workspace.
*   **Detects the project type** automatically without manual configuration.
*   **Installs the correct dependencies** using the appropriate package manager (npm, yarn, pnpm, bun, or pip).
*   **Creates a usable environment** from `.env.example` templates by mocking missing placeholders.
*   **Starts the application** and verifies HTTP socket readiness.
*   **Opens your browser** immediately as soon as the app is ready to receive requests.
*   **Cleans up the temporary directory** automatically when you exit the tool.

---

## Supported Projects

GitRunByKaru supports conventional web applications, APIs, and static pages:

### Stable

| Stack | Detection File | Install Command | Run Priority |
| :--- | :--- | :--- | :--- |
| **Node.js** | `package.json` | `npm`, `yarn`, `pnpm`, or `bun` | `dev` ➔ `start` ➔ `serve` ➔ `build && preview` |
| **Next.js** | `package.json` + next | matching lockfile | `dev` |
| **Vite / React**| `package.json` + vite | matching lockfile | `dev` |
| **Python / Flask**| `requirements.txt` + `app.py` | `pip` inside local venv | `python app.py` |
| **Django** | `manage.py` | `pip` inside local venv | `python manage.py runserver` |
| **FastAPI** | `requirements.txt` + fastapi | `pip` inside local venv | `python main.py` |
| **Static HTML** | `index.html` (only) | None | `npx serve .` ➔ `python -m http.server` |

### Under Development (Experimental)

| Stack | Detection File | Toolchain Action | Status |
| :--- | :--- | :--- | :--- |
| **Go** | `go.mod` / `main.go` | `go mod download` ➔ `go run .` | Under Development |
| **Rust** | `Cargo.toml` | `cargo build` ➔ `cargo run` | Under Development |

> ⚠️ **Note:** Go and Rust support is currently under development and may not work with all project structures.

---

## Why a Runtime Engine?

GitRunByKaru began as a CLI for quickly launching GitHub repositories.

As the project evolved, the execution pipeline was extracted into a reusable runtime engine that now powers both the human CLI and AI integrations through the Model Context Protocol (MCP).

The CLI is one interface to the engine. The MCP server is another. Both rely on the same execution pipeline.

---

## 🤖 AI Agent & Model Context Protocol (MCP) Integration

GitRunByKaru exposes its runtime through the **Model Context Protocol (MCP)**, allowing compatible AI coding agents (**Cursor**, **Claude Desktop**, **Claude Code**, **Windsurf**, **VS Code**) to launch repositories using the same execution engine that powers the CLI.

```
                                ┌─────────────────────────────────┐
                                │   GITRUNBYKARU RUNTIME ENGINE   │
                                └────────────────┬────────────────┘
                                                 │
                                 ┌───────────────┴───────────────┐
                                 ▼                               ▼
                      ┌─────────────────────┐         ┌─────────────────────┐
                      │  HUMAN CLI (`grbk`) │         │ AI AGENT MCP SERVER │
                      └─────────────────────┘         └─────────────────────┘
```

### Add GitRunByKaru to Cursor, Claude Desktop, or VS Code:

Add this to your `claude_desktop_config.json`, Cursor MCP Settings, or VS Code MCP configuration:

```json
{
  "mcpServers": {
    "gitrunbykaru": {
      "command": "npx",
      "args": ["-y", "gitrunbykaru-mcp"]
    }
  }
}
```

### Exposed MCP Tools:
- **`gitrun_remote({ repoUrl, preferredPort })`**: Clones a remote GitHub repository to an ephemeral workspace, auto-mocks `.env`, installs dependencies, and launches dev server on localhost.
- **`gitrun_local({ workspacePath, preferredPort })`**: Detects framework, auto-mocks `.env`, heals lockfiles, and launches dev server in-place for a local workspace without deleting files on teardown.
- **`gitrun_stop({ sessionId })`**: Stops an active `RuntimeSession` by `sessionId`.

---

## Architecture & Design Philosophy

GitRunByKaru processes repositories through a 3-tier layered architecture (**Interfaces ➔ Workspace Providers ➔ Pure Engine**):

```text
               Interfaces
        [ CLI ]          [ MCP ]
────────────────────────────────────────
            Workspace Providers
   [ Remote Workspace ]   [ Local Workspace ]
────────────────────────────────────────
                 Engine
   [ Detect | Install | Prepare | Launch | Ready | Session ]
```

*   **Developer Curiosity First:** GitRunByKaru is designed to minimize the time between discovering an interesting repository and interacting with it locally.
*   **Convention Over Configuration:** The tool assumes standard directory structures and startup scripts. It targets the 80% conventional setups, not highly customized build steps.
*   **Clean Workspaces:** It uses temporary folders so your local drive does not accumulate old experimental repositories.
*   **Auto-Environment Mocking:** It reads `.env.example` templates and generates placeholder values (like `gitrunbykaru_dummy_key_12345`) to prevent boot-time crashes caused by missing keys.

---

## What GitRunByKaru Doesn't Try to Solve

GitRunByKaru intentionally does not solve:
*   **Heavy Database Dependencies:** If a project requires a database instance (such as PostgreSQL, MySQL, or Redis) to run, it will fail unless that database is already running locally on your machine and accessible.
*   **Complex Monorepos:** It does not support workspaces that require running multiple concurrent backend and frontend server processes simultaneously.
*   **Private Repositories:** It is limited to public repositories where SSH or Git credentials are not required for checkout.

---

## Security

> [!IMPORTANT]
> **Local Code Execution Warning**
> GitRunByKaru executes code locally on your machine. It does not run inside a sandbox or VM. The tool automatically runs package manager installation hooks (which can run custom `postinstall` scripts) and executes launch commands.
> 
> **You should only run repositories that you trust.**

---

## Development

To set up the tool locally and contribute:

```bash
# Clone the repository
git clone https://github.com/Karthikeyadusi/gitrunbykaru
cd gitrunbykaru

# Install dependencies
npm install

# Link command globally
npm link
```

### Running Tests
The project has tests configured in `package.json` pointing to a local test suite:
```bash
npm test
```

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, development guidelines, and pull request expectations, and read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## License

This project is licensed under the MIT License.
