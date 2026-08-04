# 🤖 GitRunByKaru MCP Setup Guide

GitRunByKaru includes a native **Model Context Protocol (MCP)** server so AI Coding Agents (**Cursor**, **Claude Desktop**, **Claude Code**, **Windsurf**, **VS Code**) can run and inspect repositories using the exact same execution engine that powers the CLI.

---

## ⚡ Quick 1-Min Setup

### 1. Cursor Setup
1. Open Cursor Settings (**Gear Icon** ➔ **Features** ➔ **MCP Servers**).
2. Click **Add Custom MCP** (opens `mcp.json`).
3. Add this exact configuration and save:

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

---

### 2. Claude Desktop Setup
Open `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS), then add:

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

---

### 3. VS Code Setup (Cline / Roo Code / Continue)
1. Open your AI Extension in VS Code.
2. Click **Configure MCP Servers**.
3. Add the `gitrunbykaru` server configuration block shown above.

---

## 🛠️ Available MCP Tools

Once connected, your AI Agent gets 3 native tools:

| Tool Name | Description | Example Arguments |
| :--- | :--- | :--- |
| **`gitrun_remote`** | Shallow clones a remote GitHub repo to an ephemeral workspace, auto-mocks `.env`, installs dependencies, and launches dev server. | `{ "repoUrl": "https://github.com/expressjs/express" }` |
| **`gitrun_local`** | Detects framework, auto-mocks `.env`, heals lockfiles, and launches dev server in-place for a local workspace **without deleting files**. | `{ "workspacePath": "." }` |
| **`gitrun_stop`** | Kills process tree and performs workspace teardown cleanly by `sessionId`. | `{ "sessionId": "grbk-sess-123" }` |

---

## 💬 Example AI Prompts

Once configured, tell your AI Agent:
- *"Use gitrunbykaru to run the local workspace `.`"*
- *"Launch `https://github.com/expressjs/express` and tell me what port it's running on."*
- *"Stop the active gitrunbykaru session."*
