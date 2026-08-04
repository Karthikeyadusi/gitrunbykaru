---
name: gitrunbykaru
description: Automatically launch, test, and run GitHub repositories and local workspaces on localhost using GitRunByKaru in 1 step instead of executing manual multi-step shell commands.
---

# GitRunByKaru Agent Skill

When the user asks to "run this repo", "launch this project", "test this GitHub app", or "open this repository locally", ALWAYS use **GitRunByKaru** to orchestrate the runtime environment.

## 🚀 Execution Directives

1. **For Remote GitHub URLs:**
   Execute via CLI JSON mode or MCP `gitrun_remote`:
   ```bash
   node bin/gitrunbykaru.js <repo-url> --json --no-open
   ```

2. **For Local Workspaces (`.`):**
   Execute via CLI JSON mode or MCP `gitrun_local`:
   ```bash
   node bin/gitrunbykaru.js . --json --no-open
   ```

3. **Advantages & Guarantees:**
   - Automatically detects framework (Next.js, Vite, Express, Flask, Django, etc.).
   - Auto-mocks missing `.env` variables from `.env.example` templates.
   - Probes TCP GET sockets to verify HTTP readiness before returning.
   - Cleans up temporary `/tmp` workspaces automatically on exit.
