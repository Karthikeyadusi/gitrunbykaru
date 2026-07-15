# gitrunbykaru

[![npm version](https://img.shields.io/npm/v/gitrunbykaru.svg)](https://www.npmjs.com/package/gitrunbykaru)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![node](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)](https://nodejs.org)

> Found a cool GitHub project? See it running before you lose interest.

A command-line tool for quickly exploring conventional public GitHub repositories without the usual setup friction.

```bash
gitrunbykaru https://github.com/user/repo
```

---

## Why I Built This

As developers, we constantly browse Reddit, GitHub, LinkedIn, hackathons, and developer communities. We find many interesting, creative, or educational open-source repositories that we want to quickly run or learn from.

But getting them running locally involves repetitive setup friction:
1. Cloning the repository.
2. Reading the README.
3. Figuring out the package manager.
4. Installing dependencies.
5. Configuring `.env` files.
6. Finding the correct run command.
7. Debugging setup errors.
8. Finally opening localhost in the browser.

Often, this setup takes 20–30 minutes, only to realize within two minutes of running the app that it isn't what we wanted to inspect. We spend more time configuring repositories than actually exploring them.

I built GitRunByKaru to solve this exact workflow: **"I found a cool conventional repository, and I want to see it running locally right now."**

It optimizes for the common case: getting interesting projects running quickly with minimal effort. If a repository follows common conventions, GitRunByKaru aims to get you from a GitHub URL to a running application with a single command.

---

## What GitRunByKaru Does

GitRunByKaru automates the entire repository setup and launch experience:

*   **Clones the repository** into a clean, temporary workspace.
*   **Detects the project type** automatically without manual configuration.
*   **Installs the correct dependencies** using the appropriate package manager (npm, yarn, pnpm, bun, or pip).
*   **Creates a usable environment** from `.env.example` templates by mocking missing placeholders.
*   **Starts the application** and waits until the application is ready.
*   **Opens your browser** immediately as soon as the app is ready to receive requests.
*   **Cleans up the temporary directory** automatically when you exit the tool.

---

## Installation

Requires Node.js 18+.

```bash
npm install -g gitrunbykaru
```

---

## Quick Start

Run a public repository locally in one command:
```bash
gitrunbykaru https://github.com/user/repo
```

### Real-world Example

Try the tool directly on its own repository to see it run:
```bash
gitrunbykaru https://github.com/Karthikeyadusi/gitrunbykaru
```

### Useful Flags

*   `--no-open`: Skip opening the browser automatically.
*   `--keep`: Keep the temporary cloned directory after exiting (useful for debugging).

---

## Supported Projects

GitRunByKaru supports conventional web applications, APIs, and static pages:

| Stack | Detection File | Install Command | Run Priority |
| :--- | :--- | :--- | :--- |
| **Node.js** | `package.json` | `npm`, `yarn`, `pnpm`, or `bun` | `dev` ➔ `start` ➔ `serve` ➔ `build && preview` |
| **Next.js** | `package.json` + next | matching lockfile | `dev` |
| **Vite / React**| `package.json` + vite | matching lockfile | `dev` |
| **Python / Flask**| `requirements.txt` + `app.py` | `pip` inside local venv | `python app.py` |
| **Django** | `manage.py` | `pip` inside local venv | `python manage.py runserver` |
| **FastAPI** | `requirements.txt` + fastapi | `pip` inside local venv | `python main.py` |
| **Static HTML** | `index.html` (only) | None | `npx serve .` ➔ `python -m http.server` |

---

## How It Works

GitRunByKaru processes repositories through a clean, isolated execution lifecycle:

![Architecture Diagram](docs/gitrun_architecture.svg)

---

## Design Philosophy

*   **Developer Curiosity First:** GitRunByKaru is designed to minimize the time between discovering an interesting repository and interacting with it locally.
*   **Convention Over Configuration:** The tool assumes standard directory structures and startup scripts. It targets the 80% conventional setups, not highly customized build steps.
*   **Clean Workspaces:** It uses temporary folders so your local drive does not accumulate old experimental repositories.
*   **Auto-Environment Mocking:** It reads `.env.example` templates and generates placeholder values (like `gitrunbykaru_dummy_key_12345`) to prevent boot-time crashes caused by missing keys.
*   **Fast Exploration:** It is optimized for checking out repositories quickly. It is not designed for production deployments or code editing.

---

## What GitRunByKaru Doesn't Try to Solve

GitRunByKaru intentionally does not solve:
*   **Heavy Database Dependencies:** If a project requires a database instance (such as PostgreSQL, MySQL, or Redis) to run, it will fail unless that database is already running locally on your machine and accessible.
*   **Complex Monorepos:** It does not support workspaces that require running multiple concurrent backend and frontend server processes simultaneously.
*   **Private Repositories:** It is limited to public repositories where SSH or Git credentials are not required for checkout.

---

## Security

> [!IMPORTANT]
> **Local Code Execution Warning**
> GitRunByKaru executes code locally on your machine. It does not run inside a sandbox or VM. The tool automatically runs package manager installation hooks (which can run custom `postinstall` scripts) and executes launch commands.
> 
> **You should only run repositories that you trust.**

---

## Development

To set up the tool locally and contribute:

```bash
# Clone the repository
git clone https://github.com/yourusername/gitrunbykaru
cd gitrunbykaru

# Install dependencies
npm install

# Link command globally
npm link
```

### Running Tests
The project has tests configured in `package.json` pointing to a local test suite:
```bash
npm test
```

---

## License

This project is licensed under the MIT License.
