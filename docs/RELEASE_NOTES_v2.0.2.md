# Release Notes: v2.0.2

GitRunByKaru **v2.0.2** introduces a brand-new animated dependency loading bar and cleans up terminal header rendering.

---

## Key Improvements

### Animated Loading Bar
* **Visual Progress Tracking:** Replaced static spinners with an active, real-time progress bar, percentage ticker, and timer during dependency installation:
  ```
    →  Installing dependencies  [█████████████░░░░░░░░░░░] 65% (12s)
  ```
* **Smooth Continuous Motion:** The progress bar moves naturally and continuously without freezing or stalling while package managers install dependencies.

---

### UI & Header Polish
* **Clean Banner Output:** Refreshed the terminal header layout for a cleaner look:
  ```
    gitrunbykaru  —  run any GitHub repo in seconds
    ──────────────────────────────────────────────
  ```
* **Internal Fixes:** Fixed minor typos in header text rendering and virtual environment path configurations.

---

## Installation & Update

Update globally using npm:

```bash
npm install -g gitrunbykaru@latest
```

Run any public GitHub repository:

```bash
gitrunbykaru https://github.com/user/repo
```
