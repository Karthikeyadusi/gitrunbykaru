# [Tracking] Community Call for Testing: Go & Rust Project Compatibility

**Labels:** `help wanted`, `compatibility`, `enhancement`

---

## Help Us Test & Harden Go and Rust Support

In `v2.2.0`, GitRunByKaru introduced **experimental execution strategies** for:
- **Go** (`go.mod`, `main.go`)
- **Rust** (`Cargo.toml`, `main.rs`)

Go and Rust support is currently **Under Development / Experimental**.

Project compatibility may vary across different project structures, frameworks, and operating systems. We need the community's help to test real-world repositories and identify compatibility issues and edge cases.

---

## How to Test

You can test any public open-source Go or Rust project without manually cloning it:

```bash
# Using npx directly
npx -y gitrunbykaru https://github.com/username/repository

# Or using the global CLI
grbk https://github.com/username/repository
```

---

## What to Report

If you find a repository that fails or behaves unexpectedly, please report:

1. **Repository URL:** `https://github.com/...`
2. **Stack & Framework:** e.g. Rust / Axum, Go / Fiber
3. **Operating System:** Windows / macOS / Linux
4. **GitRunByKaru Version:** e.g. `2.2.0`
5. **Go / Rust Version:** e.g. `go version ...` or `rustc --version`
6. **Lifecycle Failure Stage:**
   - [ ] Detection
   - [ ] Dependency installation
   - [ ] Build
   - [ ] Application launch
   - [ ] Port detection
   - [ ] Readiness verification
   - [ ] Runtime
   - [ ] Cleanup
7. **Terminal Output / Error:**
   ```text
   Paste the relevant error or terminal output here.
   ```

> ⚠️ **Security:** Please remove API keys, passwords, tokens, `.env` contents, credentials, or other sensitive information before posting logs.

---

## Successful Runs Are Useful Too

If the repository runs successfully, let us know! Please include:
- Repository URL
- Language / framework
- Operating system
- GitRunByKaru version

Successful reports help us identify verified project structures and frameworks as Go and Rust support matures.

---

## Want to Submit a Fix?

Pull requests are welcome.

If you find an edge case you'd like to fix:
1. Fork the repository.
2. Create a dedicated branch:
   ```bash
   git checkout -b fix/your-issue-name
   ```
3. Implement and test your changes.
4. Run:
   ```bash
   npm test
   ```
5. Open a Pull Request against `main`.
6. Reference this issue in the PR description (e.g., `Fixes #...`).

See the [Contributing Guide](https://github.com/Karthikeyadusi/gitrunbykaru/blob/main/CONTRIBUTING.md) for architecture details and contribution expectations.

If you're unsure about the expected behavior, comment on this issue before implementing the fix.

---

## Current Status

Go and Rust support is experimental and under development and may not work with every project structure yet.

The stable production stacks currently supported by GitRunByKaru are:
- **Node.js**
- **Python**
- **Static Web**

Thank you for helping test, improve, and expand GitRunByKaru's Go and Rust support! ❤️
