# 🤖 AI Integration Guide

GitRunByKaru includes an MCP server that allows compatible AI coding assistants to use the same runtime engine as the CLI.

---

## Supported AI Clients

| Client | Status |
| :--- | :---: |
| **Cursor** | ✅ |
| **Claude Desktop** | ✅ |
| **Claude Code** | ✅ |
| **VS Code (Cline / Roo / Continue)** | ✅ |
| **Windsurf** | ✅ |

---

## Prerequisites

- Node.js 18+
- GitRunByKaru installed (or available through `npx`)
- An MCP-compatible AI client

---

## How It Works

```text
AI Agent
   │
   ▼
GitRunByKaru MCP Server
   │
   ▼
GitRunByKaru Runtime Engine
   │
   ▼
Running Development App
```

Your AI agent delegates repository setup and execution to GitRunByKaru, which handles workspace preparation, dependency installation, application launch, readiness detection, and lifecycle management.

---

## ⚡ Setup Guides by AI Client

### 🔵 1. Cursor Setup
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

### 🟠 2. Claude Desktop Setup
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

### 🟣 3. Claude Code CLI Setup
Run the following command in your terminal:

```bash
claude mcp add gitrunbykaru -- npx -y gitrunbykaru-mcp
```

---

### 🟢 4. VS Code Setup (Cline / Roo / Continue)
1. Open your AI Extension in VS Code (Cline / Roo Code / Continue.dev).
2. Click **Configure MCP Servers** (opens settings JSON).
3. Paste the `gitrunbykaru` MCP server configuration block shown above and save.

---

### 🏄 5. Windsurf Setup
Open `~/.codeium/windsurf/mcp_config.json` and add:

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

## 🛠️ Available MCP Tools

Once connected, your AI Agent gets 3 native tools:

| Tool Name | Description | Example Arguments |
| :--- | :--- | :--- |
| **`gitrun_remote`** | Shallow clones a remote GitHub repo to an ephemeral workspace, auto-mocks `.env`, installs dependencies, and launches dev server. | `{ "repoUrl": "https://github.com/expressjs/express" }` |
| **`gitrun_local`** | Detects framework, auto-mocks `.env`, heals lockfiles, and launches dev server in-place for a local workspace **without deleting files**. | `{ "workspacePath": "." }` |
| **`gitrun_stop`** | Kills process tree and performs workspace teardown cleanly by `sessionId`. | `{ "sessionId": "grbk-sess-123" }` |

---

## 💬 Example Prompts

Here are natural prompts you can ask your AI Agent:

- *"Run the current workspace using GitRunByKaru."*
- *"Launch https://github.com/username/repo and tell me when it's ready."*
- *"Start this repository and summarize how it's structured."*
- *"Stop the current GitRunByKaru session."*

---

## 🔍 Troubleshooting

### The MCP server doesn't appear
- Restart your AI client.
- Verify the configuration file is valid JSON.
- Ensure `npx` is available in your PATH.

### The tool isn't available
- Check that the MCP configuration was saved.
- Restart the client after adding the server.
