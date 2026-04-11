# gitrunbykaru

Run any GitHub repository locally in seconds — no setup, no friction.

```
gitrunbykaru https://github.com/user/repo
```

That's it. GitRun clones the repo, detects what kind of project it is, installs dependencies, and runs it. You get a `localhost` link.

---

## Install

```bash
npm install -g gitrunbykaru
```

Node.js 18+ required.

---

## Usage

```bash
# Run a repo
gitrunbykaru https://github.com/user/repo

# Don't auto-open the browser
gitrunbykaru https://github.com/user/repo --no-open

# Keep the cloned directory after exit (for debugging)
gitrunbykaru https://github.com/user/repo --keep
```

---

## Supported stacks

| Stack          | Detected by                   | Install / Package Manager          | Run                                            |
| -------------- | ----------------------------- | ---------------------------------- | ---------------------------------------------- |
| Node.js / JS   | `package.json`                | npm, yarn, pnpm, bun (auto-detect) | `dev` → `start` → `serve` → `build && preview` |
| Next.js        | `package.json` + next dep     | matching lockfile (`npm/yarn/...`) | `dev`                                          |
| Vite / React   | `package.json` + vite dep     | matching lockfile (`npm/yarn/...`) | `dev`                                          |
| Python / Flask | `requirements.txt` + `app.py` | `pip install -r requirements.txt`  | `python app.py`                                |
| Django         | `manage.py`                   | `pip install -r requirements.txt`  | `python manage.py runserver`                   |
| FastAPI        | `requirements.txt` + fastapi  | `pip install -r requirements.txt`  | `python main.py`                               |
| Static HTML    | `index.html` only             | —                                  | `npx serve .`                                  |

---

## 🔥 Magic Features (Why it's smart)

- **Auto-Environment Mocking:** If a repo requires a `.env` file but only provides a `.env.example` or `.env.sample`, GitRun automatically clones it and injects dummy keys so the app doesn't crash on startup!
- **Interactive Fallback:** If a repository is too weird to auto-detect, GitRun won't just crash. It pauses and gives you an interactive menu to manually type the run command.
- **Auto-Downloads Missing Tools:** If a repo strictly uses `yarn`, `pnpm`, or `bun`, but you don't have them installed globally, GitRun will automatically fetch them securely via `npx` just for that run.
- **Windows Path Fixes:** Bypasses legacy Windows 8.3 short-path bugs so strict bundlers like Vite and React never crash.

---

## Philosophy

- **Speed over perfection** — works for 80% of repos without any config
- **Zero effort** — you provide the URL, GitRun handles everything else
- **Local first** — runs on your machine, no cloud, no auth
- **Opinionated** — makes decisions for you so you don't have to

---

## What it doesn't handle (by design)

- True database dependencies (Postgres, MySQL, Redis, etc.)
- Monorepos with complex workspace setups (e.g., `client/` and `api/` folders requiring separate terminal tabs — _coming soon_)
- Private repositories where Git needs explicit SSH keys/auth

For these, you'll need to set things up manually.

---

## Development

```bash
git clone https://github.com/yourusername/gitrunbykaru
cd gitrunbykaru
npm install
npm link          # makes 'gitrunbykaru' available globally
node tests/test.js
```

---

## License

MIT
