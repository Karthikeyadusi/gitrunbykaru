---
name: Repository compatibility report
about: Report whether a specific open-source repository ran successfully or failed
title: '[COMPAT] '
labels: ['compatibility']
assignees: ''
---

> ℹ️ **Status Note:** Node.js, Python, and Static Web are stable production stacks. Go and Rust support is currently **Under Development / Experimental** and being validated across open-source project structures.
> 
> ⚠️ **Security Notice:** Do **NOT** include secrets, private tokens, API keys, credentials, or `.env` files. Only report public repositories.

### Repository Information
- **Public Repository URL:** 
- **Primary Language:** (e.g., TypeScript, JavaScript, Python, Go, Rust, HTML)
- **Framework:** (e.g., Next.js, Vite, Express, Flask, Django, FastAPI, Gin, Fiber, Axum, Actix-web, None)
- **Package Manager / Toolchain:** (e.g., npm, yarn, pnpm, bun, pip, go mod, cargo)

### Environment Information
- **GitRunByKaru Version:** (e.g., `2.2.0`)
- **Operating System:** (e.g., Windows 11, macOS Sequoia, Ubuntu 24.04)
- **Node.js Version:** (e.g., `v20.x`)

### Execution Outcome
- **Did the repository launch successfully?** [ ] Yes / [ ] No
- **If failed, at which lifecycle stage?**
  - [ ] **Clone** (git clone failed)
  - [ ] **Detection** (failed to detect or misidentified framework)
  - [ ] **Environment Preparation** (.env / venv creation failed)
  - [ ] **Installation** (dependency install / compilation failed)
  - [ ] **Launch** (subprocess spawn failed or exited immediately)
  - [ ] **Readiness / Port** (failed to detect port or HTTP readiness probe timed out)
  - [ ] **Cleanup** (process teardown or temp folder deletion failed)

### Actual Behavior
Describe what happened when GitRunByKaru attempted to run the project.

### Expected Behavior
Describe how the project is intended to start according to its upstream README.

### Terminal Logs / Diagnostics
```text
Paste sanitized terminal output and compiler/runtime errors here
```
