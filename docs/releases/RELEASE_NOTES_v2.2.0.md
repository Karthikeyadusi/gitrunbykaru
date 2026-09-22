# 🚀 GitRunByKaru v2.2.0 Release Notes

**Release Date:** August 21, 2026  
**Package Version:** `gitrunbykaru@2.2.0`  
**License:** MIT

---

## 🌟 Overview

GitRunByKaru **v2.2.0** expands the runtime engine with experimental execution support for **Go** and **Rust** repositories, while preserving 100% backward compatibility for all stable production stacks (Node.js, Python, and Static Web).

---

## 📦 What's New in v2.2.0

### 1. 🐹 Go Execution Strategy (Under Development)
- **Detection:** Automatically detects Go applications with `go.mod` or standalone `main.go`.
- **Framework Support:** Configured for standard HTTP servers, Gin, Fiber, Echo, and Chi.
- **Workflow:** Executes `go mod download` followed by `go run .` with real-time port detection.
- **Toolchain Discovery:** Automatically locates Go compilers across standard Windows paths (`C:\Program Files\Go\bin`, `C:\Go\bin`) even if not yet on active terminal PATH.

### 2. 🦀 Rust Execution Strategy (Under Development)
- **Detection:** Automatically detects Cargo packages (`Cargo.toml`) and single-file scripts (`main.rs`).
- **Framework Support:** Configured for Axum, Actix-web, Rocket, and Warp.
- **Workflow:** Runs `cargo build` with live progress indicator, followed by `cargo run` and port detection. Single-file scripts compile directly via `rustc`.

### 3. 🛡️ Windows Environment & Path Hardening
- **Dynamic PATH Prepending:** Prepends discovered toolchain binaries to `process.env.PATH` at runtime, completely eliminating Windows `cmd.exe` whitespace parsing errors for paths like `C:\Program Files\Go\bin`.
- **Ephemeral Cleanup:** Zero-leak guarantee remains enforced on SIGINT or compile failure across all strategies.

### 4. 🪶 Packaging Optimization
- Refined `.npmignore` to exclude development documentation, screenshots, and test fixtures from the published npm package.
- Reduced published npm tarball from **11.1 MB** down to **21.8 kB** (99.8% reduction).

---

## ⚠️ Stability & Support Classification

| Stack | Status | Notes |
|---|:---:|---|
| **Node.js** | **Stable** | Full support for Next.js, Vite, React, Express, Fastify, Vue, Svelte, Remix |
| **Python** | **Stable** | Full support for Flask, Django, FastAPI with isolated `.venv` |
| **Static HTML** | **Stable** | Zero-config static server |
| **Go** | **Under Development** | Tested on verified repos; wider ecosystem compatibility in progress |
| **Rust** | **Under Development** | Tested on verified crates; wider ecosystem compatibility in progress |

> *Go and Rust support is currently under development and may not work with all project structures.*

---

## 📥 Installation & Upgrade

```bash
# Update globally via npm
npm install -g gitrunbykaru@latest

# Or run instantly via npx
npx -y gitrunbykaru https://github.com/user/repo
```
