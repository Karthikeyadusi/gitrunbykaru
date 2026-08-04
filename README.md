# gitrunbykaru (or `grbk`)

[![npm version](https://img.shields.io/npm/v/gitrunbykaru.svg)](https://www.npmjs.com/package/gitrunbykaru)
[![Website](https://img.shields.io/badge/Website-gitrunbykaru.vercel.app-c084fc)](https://gitrunbykaru.vercel.app)
[![MCP Ready](https://img.shields.io/badge/MCP-Ready-00C853.svg)](https://modelcontextprotocol.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![node](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)](https://nodejs.org)

> Found a cool GitHub project? See it running before you lose interest.  
> 🌐 **Live Web Demo:** [https://gitrunbykaru.vercel.app](https://gitrunbykaru.vercel.app)

**GitRunByKaru** is the **Runtime Orchestration Engine** for source repositories. It allows human developers and AI Coding Agents (Cursor, Claude Desktop, Windsurf, VS Code) to run any GitHub repository or local project on localhost in 1 single command.

```bash
# Full command or short 4-letter alias (grbk)
gitrunbykaru https://github.com/user/repo
grbk https://github.com/user/repo
```

---

## 🤖 AI Agent & Model Context Protocol (MCP) Support

GitRunByKaru is natively built as an **Anthropic Model Context Protocol (MCP) Server**, giving AI agents (Cursor, Claude Desktop, Windsurf, VS Code) a 1-call execution engine button instead of running trial-and-error shell scripts.

### 🔌 Connecting to Claude Desktop / Cursor / Windsurf

Add GitRunByKaru to your MCP server configuration (`claude_desktop_config.json`, `mcp.json`, or Cursor MCP Settings):

```json
{
  "mcpServers": {
    "gitrunbykaru": {
      "command": "npx",
      "args": ["-y", "gitrunbykaru", "--mcp"]
    }
  }
}
```

### 🛠️ Exposed MCP Tools for AI Agents

1. **`gitrun_remote({ repoUrl, preferredPort })`**: Shallow clones a remote GitHub repo to an ephemeral workspace, auto-mocks `.env`, installs dependencies, and launches dev server on localhost.
2. **`gitrun_local({ workspacePath, preferredPort })`**: Detects, auto-mocks `.env`, heals lockfiles, and launches dev server in-place for a local workspace **without deleting files on exit**.
3. **`gitrun_stop({ sessionId })`**: Kills process tree and executes cleanup cleanly by `sessionId`.

---

## ⚡ Machine-Readable `--json` Mode

You can run GitRunByKaru in headless `--json` mode for scripts, automation, and CI/CD pipelines:

```bash
gitrunbykaru https://github.com/user/repo --json --no-open
```

**Structured Output:**
```json
{
  "sessionId": "grbk-sess-msehc443-1",
  "workspace": "C:\\Users\\...\\AppData\\Local\\Temp\\gitrunbykaru-repo",
  "pid": 35784,
  "url": "http://localhost:5173",
  "port": 5173,
  "framework": "Node.js",
  "status": "ready"
}
```

---

## What GitRunByKaru Does

GitRunByKaru automates the entire repository setup and launch experience:

*   **Clones the repository** into a clean, temporary workspace.
*   **Detects the project type** automatically without manual configuration.
*   **Installs the correct dependencies** using the appropriate package manager (npm, yarn, pnpm, bun, or pip).
*   **Creates a usable environment** from `.env.example` templates by mocking missing placeholders.
*   **Starts the application** and waits until TCP GET socket readiness is verified.
*   **Opens your browser** immediately as soon as the app is ready to receive requests.
*   **Cleans up the temporary directory** automatically when you exit the tool.

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
# or short alias
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
*   `--json`: Output machine-readable JSON status payload.

---

## Supported Projects

GitRunByKaru supports conventional web applications, APIs, and static pages:

| Stack | Detection File | Install Command | Run Priority |
| :--- | :--- | :--- | :--- |
| **Node.js** | `package.json` | `npm`, `yarn`, `pnpm`, or `bun` | `dev` ➔ `start` ➔ `serve` ➔ `build && preview` |
| **Next.js** | `package.json` + next | matching lockfile | `dev` |
| **Vite / React**| `package.json` + vite | matching lockfile | `dev` |
| **Python / Flask**| `requirements.txt` + `app.py` | `pip` inside local venv | `python app.py` |
| **Django** | `manage.py` | `pip` inside local venv | `python manage.py runserver` |
| **FastAPI** | `requirements.txt` + fastapi | `pip` inside local venv | `python main.py` |
| **Static HTML** | `index.html` (only) | None | `npx serve .` ➔ `python -m http.server` |

---

## How It Works

GitRunByKaru processes repositories through a 3-tier layered architecture:

```text
               Interfaces Layer
      [ CLI Interface ]     [ MCP Server ]
             │                     │
             └──────────┬──────────┘
                        │
                        ▼
            Workspace Providers Layer
  [ RemoteWorkspaceProvider ]   [ LocalWorkspaceProvider ]
                        │
                        ▼
             Stateless Engine Layer
  [ Detect | Install | Prepare | Launch | Readiness | Session ]
```

---

## Security

> [!IMPORTANT]
> **Local Code Execution Warning**
> GitRunByKaru executes code locally on your machine. It does not run inside a sandbox or VM. The tool automatically runs package manager installation hooks (which can run custom `postinstall` scripts) and executes launch commands.
> 
> **You should only run repositories that you trust.**

---

## License

This project is licensed under the MIT License.
