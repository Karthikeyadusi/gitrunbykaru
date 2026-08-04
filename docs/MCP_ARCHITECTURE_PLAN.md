# Architectural Blueprint & Product Strategy — GitRunByKaru MCP

> **Core Thesis:** AI coding agents can generate code and write shell commands, but they lack an atomic, zero-clutter execution runtime. GitRunByKaru owns the **Ephemeral Execution Lifecycle Contract** for AI Agents.

---

## 1. Problem Validation

### Do AI coding agents struggle with repository setup today?
**Yes, significantly.** When an AI agent (Cursor, Claude, AutoGPT) is asked to inspect or test a GitHub repo, it attempts to execute raw shell commands (`git clone`, `cd`, `npm install`, `npm run dev`). This process fails frequently due to five systemic pain points:
1. **Desynchronized Lockfiles:** `npm ci` crashes when lockfiles are out of sync; LLMs don't automatically fall back to `npm install` without wasting multiple reasoning turns.
2. **Missing Environment Variables:** Apps crash immediately on launch because `.env` doesn't exist; LLMs rarely parse `.env.example` templates automatically before launching.
3. **False Readiness Signals:** LLMs misread stdout logs (e.g. string matches) before the HTTP server is actually accepting TCP sockets.
4. **Orphan Process Leaks:** Background dev servers remain running on ports `3000`/`8080`, blocking subsequent agent runs.
5. **Disk Clutter:** Cloned repos and `node_modules` clutter the user's workspace permanently.

### How are they solving it now?
Agents run 5 to 10 sequential bash tool calls, burning API tokens and retrying when commands fail.

### The Gap GitRunByKaru Fills:
GitRunByKaru converts a multi-turn, error-prone shell sequence into a **single, deterministic, 1-call atomic execution contract**.

---

## 2. Product Fit

### Why use GitRunByKaru instead of raw shell commands?
- **Atomic Execution:** 1 MCP tool call replaces 8 manual shell steps.
- **Auto `.env` Mocking:** Injects placeholder keys into missing `.env` files automatically to prevent initial boot crashes.
- **HTTP Probe Verification:** Guarantees the HTTP server is accepting GET requests before reporting `ready`.
- **Zero-Clutter Teardown:** Ephemeral `/tmp` execution with process tree termination on exit.

---

## 3. MCP Scope & API Boundaries

To keep the AI API simple enough to learn in 5 minutes, the MCP server will expose **3 core tools**:

```
┌────────────────────────────────────────────────────────────────────────┐
│ MCP EXPOSED TOOLS                                                      │
├────────────────────────────────────────────────────────────────────────┤
│ 1. gitrun_launch({ repoUrl, preferredPort })                            │
│    Clones, detects, mocks .env, installs, launches, & returns JSON.    │
│                                                                        │
│ 2. gitrun_inspect({ workspaceId })                                     │
│    Returns workspace path, framework, env vars, & running port.       │
│                                                                        │
│ 3. gitrun_stop({ workspaceId })                                        │
│    Terminates child process tree & deletes /tmp workspace cleanly.     │
└────────────────────────────────────────────────────────────────────────┘
```

- **CLI-Only:** Interactive terminal prompts (`Select 1-3`), terminal spinners, colored banner graphics.
- **Internal Engine:** `taskkill` signal handles, Node.js `rmSync` retry loops, HTTP probe checks.

---

## 4. AI Experience & Structured Outputs

Every MCP tool call returns a predictable, machine-readable JSON structure:

```json
{
  "workspaceId": "grbk-nextjs-portfolio-8a391f",
  "status": "ready",
  "url": "http://localhost:3000",
  "port": 3000,
  "framework": "Next.js",
  "packageManager": "npm",
  "tmpDir": "C:/Users/.../AppData/Local/Temp/gitrunbykaru-nextjs-portfolio-8a391f",
  "envMocked": true,
  "elapsedMs": 14200
}
```

### Error Reporting:
If a project fails to launch, the tool returns a clear error code and the last 30 lines of stderr:
```json
{
  "workspaceId": "grbk-failed-repo-123",
  "status": "error",
  "errorCode": "INSTALLATION_FAILED",
  "message": "npm install failed due to incompatible Node version requirement >=20.0.0",
  "stderrSnippet": "error engine Unsupported engine..."
}
```

---

## 5. Architecture & Core Decoupling

Refactor `src/` into a clean, modular engine so CLI, MCP Server, and Programmatic Node API consume the exact same underlying logic without duplication:

```text
                  ┌──────────────────────┐
                  │  gitrunbykaru Engine │
                  │     (src/core/)      │
                  └──────────┬───────────┘
                             │
       ┌─────────────────────┼─────────────────────┐
       ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│  CLI Binary  │     │  MCP Server  │     │ Programmatic API │
│ (bin/cli.js) │     │ (mcp/server) │     │  (src/index.js)  │
└──────────────┘     └──────────────┘     └──────────────────┘
```

- **`src/core/clone.js`**: Shallow git cloning & path normalization.
- **`src/core/detect.js`**: Lockfile & framework heuristics.
- **`src/core/env.js`**: Template `.env` auto-generation.
- **`src/core/runner.js`**: Process tree spawning & HTTP probing.
- **`src/core/cleanup.js`**: Process tree termination & retry deletion.

---

## 6. Reliability & Readiness Guarantees

### When is a project "ready"?
A project is ONLY marked `ready` when Node's `http.request()` GET probe receives a valid HTTP status code (`200`, `300`, `404`) on the target port. Text stdout parsing is used only to discover the active port.

### Timeouts:
- **Git Clone:** 300s max timeout.
- **Dependency Install:** 120s max timeout.
- **Port Probing:** 45s max timeout before returning `PORT_TIMEOUT`.

---

## 7. Security & Sandboxing

- Executed inside the operating system's default temporary directory (`tmpdir()`).
- Process tree termination traps `SIGINT`/`SIGTERM` to prevent orphan memory leaks.
- Commands restricted to standard package managers (`npm`, `yarn`, `pnpm`, `bun`, `pip`, `npx serve`).

---

## 8. Supported Ecosystem Clients

The MCP server uses the standard Anthropic `@modelcontextprotocol/sdk` over `stdio`, making it instantly compatible out-of-the-box with:
1. **Cursor**
2. **Claude Desktop**
3. **Claude Code**
4. **Windsurf**
5. **VS Code (Copilot / MCP extension)**

---

## 9. 3-Year Product Vision

> **Vision Statement:** *"GitRunByKaru is the universal, zero-clutter ephemeral runtime layer for AI coding agents."*

If the MCP protocol disappeared tomorrow, the core engine remains an ultra-fast, zero-clutter CLI tool loved by human developers.

---

## 🔟 The Single Most Important Question Answered

> **Q: If AI coding agents already know what commands to run, what should GitRunByKaru uniquely own so they don't have to reinvent it?**
>
> **A:** GitRunByKaru uniquely owns the **Ephemeral Execution Lifecycle Contract**: atomic clone, framework detection, `.env` auto-mocking, HTTP readiness probing, process tree isolation, and guaranteed zero-clutter workspace teardown.
