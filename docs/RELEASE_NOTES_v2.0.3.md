# Release Notes: v2.0.3

GitRunByKaru **v2.0.3** introduces robust process handle lock handling during workspace teardown, ensuring 100% clean deletion of temporary directories upon pressing `Ctrl+C`.

---

## 🛠️ Key Fixes & Enhancements

### 🛡️ Windows File-Lock Teardown Fix
* **Process Handle Release Delay:** Resolved a race condition on Windows OS where `rmSync` failed silently if killed process trees (`node.exe`, `python.exe`) still held open file handles for a few milliseconds after `SIGINT` / `Ctrl+C`.
* **Built-in Retry Loop:** Configured `rmSync` with `maxRetries: 10` and `retryDelay: 250ms`, giving the operating system up to 2.5 seconds to unlock files before removing the temporary directory.
* **Fallback Handle Polling:** Implemented a secondary retry loop for persistent file locks to guarantee zero clutter left behind in your system's temp folder.

---

## 💻 Installation & Update

Update to the latest version via npm:

```bash
npm install -g gitrunbykaru@latest
```

Run any public GitHub repository:

```bash
gitrunbykaru https://github.com/user/repo
```
