# Release Notes: v2.0.0 - Production Hardening

GitRunByKaru v2.0.0 focuses on stability, security, and cross-platform reliability. This release updates the tool's process management, parser buffering, and path resolution systems.

---

## Why v2.0.0?

Rather than introducing major new features, v2.0.0 focuses on making GitRunByKaru more reliable, predictable, and maintainable. This release represents the first production-ready milestone of the project.

---

## Highlights

This release focuses on improving reliability rather than expanding functionality. GitRunByKaru still starts with the same single command:

```bash
gitrunbykaru <repository>
```

...but now does so with stronger process management, safer execution, improved startup detection, and more complete documentation. This marks the first production-ready release of the project.

---

## Key Improvements

### Security
Repository cloning now uses direct process execution instead of shell command construction, eliminating shell command injection risks.

### Reliability
The browser now opens only after the application is ready to receive requests, replacing the previous fixed startup delay. A 5-second timeout acts as a fallback.

### Stream Parsing
Improves startup reliability by making application detection resilient to fragmented console output logs.

### Cross-Platform
Cleans up spawned child process trees on Windows, preventing background applications from leaking ports when the parent CLI exits.

### Documentation
The project documentation has been completely refreshed:
- Rewritten README focused on developer workflows.
- New architecture documentation (`ARCHITECTURE.md`).
- Contributor guide (`CONTRIBUTING.md`).
- Changelog (`CHANGELOG.md`).
- Release documentation (`RELEASE_NOTES_v2.0.0.md`).

---

## Migration Notes

This release is fully backward compatible:
*   The CLI commands and options (`--keep`, `--no-open`) remain unchanged.
*   Fixed a logical path detection bug in `src/detect.js` that caused the tool to ignore the primary `.env` file path.

---

## Who This Release Is For

This release is for developers, open-source contributors, and code reviewers looking for a fast, reliable, and secure way to explore public GitHub repositories locally.
