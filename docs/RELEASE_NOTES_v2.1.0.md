# Release Notes: v2.1.0

GitRunByKaru **v2.1.0** is a major architectural milestone. It introduces a **3-Tier Layered Engine Architecture**, stateful **`RuntimeSession` object management**, machine-readable **`--json` CLI mode**, **`--mcp` helper guide**, and native **Anthropic Model Context Protocol (MCP)** integration for AI Coding Agents.

---

## 🛠️ Key Highlights & Features

### 🏛️ 3-Tier Layered Engine Architecture
- **Interfaces Layer (`src/cli/`, `src/mcp/`):** Separates human CLI presentation and AI agent protocol translation from core runtime execution.
- **Workspace Providers Layer (`src/providers/`):** 
  - `RemoteWorkspaceProvider`: Shallow clones remote GitHub repositories to OS `/tmp` and executes 100% clean directory teardown on exit.
  - `LocalWorkspaceProvider`: Adapts in-place local workspace directories (`.`) with zero file deletion on session stop.
- **Stateless Engine Layer (`src/engine/`):** Pure runtime engine operating strictly on target directories (unaware of Git or CLI/MCP interfaces).

### 🔄 Stateful `RuntimeSession` Object Pattern
Every execution returns a structured `RuntimeSession` instance:
```json
{
  "sessionId": "grbk-sess-8a391f-1",
  "workspace": "/path/to/workspace",
  "pid": 35784,
  "url": "http://localhost:5173",
  "port": 5173,
  "framework": "Node.js",
  "status": "ready"
}
```

### 🤖 Anthropic Model Context Protocol (MCP) Server
Allows AI Agents (**Cursor**, **Claude Desktop**, **Claude Code**, **Windsurf**, **VS Code**) to invoke GitRunByKaru as a native tool over `stdio` JSON-RPC:
- `gitrun_remote({ repoUrl, preferredPort })`
- `gitrun_local({ workspacePath, preferredPort })`
- `gitrun_stop({ sessionId })`

### ⚡ Machine-Readable `--json` CLI Mode & `--mcp` Guide
- Run `gitrunbykaru <target> --json --no-open` to output clean machine-readable JSON status.
- Run `gitrunbykaru --mcp` to print copy-pasteable JSON configuration for Cursor and Claude.

---

## 🛡️ Backward Compatibility
Human CLI terminal commands (`gitrunbykaru <url>` / `grbk <url>`), banner graphics, interactive fallback prompts, spinners, and `Ctrl+C` teardown remain **100% identical**.
