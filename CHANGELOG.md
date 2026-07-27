# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.2] - 2026-07-27

This patch release introduces a smooth 80s-calibrated animated loading bar for dependency installation, cleans up CLI banner text rendering, and fixes internal string names.

### Added
- Added a dynamic, animated loading bar `[██████████░░░░░░░░░░] 50% (30s)` for Node and Python dependency installation, calibrated for an 80-second average installation lifecycle with continuous micro-ticking past 85% so it never stalls.

### Fixed
- Corrected CLI banner header string formatting from `gitrunbykarubykaru by karu` to clean `gitrunbykaru`.
- Fixed internal virtual environment directory naming in the Python strategy.

## [2.0.1] - 2026-07-15

This patch release fixes dependency installation issues on repositories containing out-of-sync package locks.

### Fixed
- Added a fallback safety check during Node installation: if a fast clean install (`npm ci`) fails due to a desynchronized `package-lock.json`, the installer automatically falls back to a standard `npm install` run to heal and configure dependencies.

## [2.0.0] - 2026-07-15

This release focuses on production hardening, cross-platform reliability, security, and documentation. GitRunByKaru is now considered the first stable production release.

### Added
- HTTP server readiness checks using Node's native `http` module, verifying standard HTTP responses before opening the browser.
- Comprehensive architecture documentation (`ARCHITECTURE.md`).
- Contributor documentation (`CONTRIBUTING.md`).
- Release documentation (`RELEASE_NOTES_v2.0.0.md`).

### Changed
- Process-tree termination for Windows platforms using `taskkill` via `spawnSync` to prevent orphan processes.
- Memory leak protections by removing process `SIGINT` and `SIGTERM` signal handlers on completion.
- Migrated Python runtime strategy state properties out of the `detection` object, making the strategy stateless and resolving execution environments dynamically.
- Upgraded repository URL parsing to use the standard `URL` constructor to robustly handle trailing slashes, search parameters, and branch pages.
- Replaced chunk-based stdout and stderr parsing with line-buffered processing using Node's `readline` module, preventing fragmented log parsing.
- Refactored the README to focus on developer motivation, capabilities, user-centric outcomes, and explicit security boundaries.

### Fixed
- Resolved a logical path detection bug in `src/detect.js` that caused the tool to ignore the primary `.env` file path.
- Fixed premature browser launches by waiting until the application responds to HTTP requests.

### Security
- Eliminated shell command injection risks during repository cloning by replacing shell-based command execution with direct process invocation (`execFileSync`).
