# GitRunByKaru v2.1.0 — Runtime Engine & MCP

GitRunByKaru **v2.1.0** is the largest architectural release since the project began.

This release refactors the project into a layered runtime architecture, introduces stateful `RuntimeSession` management, adds machine-readable `--json` output, and includes native Model Context Protocol (MCP) support while preserving the existing CLI experience.

---

## 🛠️ Added

### Runtime Engine Architecture
GitRunByKaru now uses a 3-tier layered architecture:

```text
Interfaces
    ↓
Workspace Providers
    ↓
Runtime Engine
```

This separates:
- **Interfaces** (CLI, `--json` mode, and MCP)
- **Workspace acquisition & cleanup** (Remote & Local providers)
- **Repository execution logic** (Pure engine)

The Runtime Engine now operates purely on workspace directories, independent of the interface invoking it.

### RuntimeSession
Introduced a stateful `RuntimeSession` model representing every execution. Each session tracks:
- Session ID
- Workspace path
- Process ID
- Framework detection
- Local URL & Port
- Runtime status

This provides a consistent execution model across the CLI, JSON mode, and MCP.

### Model Context Protocol (MCP)
Added native Model Context Protocol (MCP) support. GitRunByKaru can now be configured as an MCP server for compatible AI clients.

Available tools:
- `gitrun_remote()`
- `gitrun_local()`
- `gitrun_stop()`

### Machine-Readable JSON Output
Added a new `--json` flag:
```bash
gitrunbykaru <repository> --json
```
Returns structured runtime metadata suitable for automation, scripting, and integrations.

### Local Workspace Execution
Added support for launching existing local workspaces (`.`). Unlike remote repository execution, local workspace sessions never delete project files during cleanup.

---

## 🔄 Changed
- Refactored the execution pipeline into reusable runtime modules.
- Introduced Workspace Providers for remote and local execution workflows.
- Improved separation of concerns between interfaces, workspace management, and execution logic.
- Updated the internal execution lifecycle around `RuntimeSession`.

---

## 🛡️ Compatibility
This release maintains **full backward compatibility**. Existing CLI workflows continue to work without changes, including:
- Existing commands
- Interactive terminal output
- Browser launch behavior
- Progress indicators
- Cleanup behavior
- Existing command-line flags

No migration is required.

---

## 📖 Documentation
Updated project documentation with:
- Runtime Engine architecture
- Design philosophy
- MCP configuration and usage
- Runtime execution pipeline
- Revised README

---

## ❤️ Thanks
Thank you to everyone who has tried GitRunByKaru, reported issues, suggested improvements, and contributed feedback. Every release continues to improve the developer experience and shape the project's direction.
