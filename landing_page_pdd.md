# GitRunByKaru — Landing Page Product Design Document

> **Author:** Principal Product Designer & DX Engineer
> **Date:** July 27, 2026
> **Version:** 1.0
> **Status:** Ready for Implementation

---

## Executive Summary

This document defines the complete design specification for the GitRunByKaru landing page—a single-page experience that converts developer curiosity into an `npm install`. The page should feel like visiting [bun.sh](https://bun.sh), [biomejs.dev](https://biomejs.dev), or [turbo.build](https://turbo.build): minimal, technically credible, and impossible to leave without trying the tool.

GitRunByKaru's strongest asset is its **single-command simplicity** against a **universally relatable pain point**. Every developer has abandoned a GitHub repo because the setup was annoying. The landing page must weaponize that shared frustration and present the install command as the obvious resolution.

---

## Part I — Strategic Analysis

### What Deserves to Be Showcased

After analyzing the full codebase, documentation, architecture, and release history, these are the elements ranked by landing page impact:

| Priority | Element | Why It's Compelling |
|----------|---------|---------------------|
| **1** | The one-command experience | This IS the product. One line. That's it. |
| **2** | The terminal output sequence | The CLI UX is genuinely beautiful (ora spinners, chalk colors, progress bar, `✔ Ready` moment). Showing this IS the demo. |
| **3** | The pain point narrative | Every developer has lived this. 8 steps reduced to 1. Visceral. |
| **4** | Auto-detection intelligence | The tool reads `package.json`, lockfiles, `requirements.txt`, `manage.py` — it *figures things out*. This is the "magic" moment. |
| **5** | The cleanup philosophy | Temp dirs, auto-deletion, zero clutter. Developers love this. |
| **6** | The `.env` mocking | Nobody else does this. It's a genuinely clever feature. |
| **7** | Multi-stack support table | Node, Python, Static — with specific framework labels. |
| **8** | Architecture (Strategy Pattern) | For contributors and the technically curious. Not for the hero. |

### What Should NOT Appear on the Landing Page

| Excluded Element | Reason |
|------------------|--------|
| Full architecture SVG diagram | Too dense for a marketing page. Save for docs site. |
| `CONTRIBUTING.md` content verbatim | A link to GitHub is sufficient. Contributor instructions belong in the repo. |
| Internal implementation details (readline, execFileSync, etc.) | Users don't care how you parse stdout. They care that it works. |
| The "What It Doesn't Solve" section from README | Negative framing kills momentum. Mention limitations only subtly in a FAQ or footer. |
| Security warning block | Important but should be handled as a brief note near the install CTA, not a section. A tooltip or small disclaimer. |
| Technical deep dive content | This is internal engineering documentation. Zero landing page value. |
| Cover images (cover1.png, cover2.jpg) | At 7MB combined, these are too heavy. The terminal animation IS the visual. |
| Version numbers prominently | Users don't care about semver. Show "Latest release" subtly. |

---

## Part II — Design Language

### Overall Aesthetic Direction

**Dark-first, terminal-native, developer-credible.**

The design language should feel like a hybrid between a polished product page and a terminal session. Think: what if your terminal had a beautiful marketing page inside it.

The key tension to maintain: **technically credible** (not corporate-slick) but **visually premium** (not raw/hacker). The sweet spot is Vercel's restraint meets Bun's playfulness.

### Typography

| Role | Font | Weight | Rationale |
|------|------|--------|-----------|
| **Headings** | `JetBrains Mono` or `Geist Mono` | 700 | Monospace for headings reinforces the CLI-tool identity. Every major dev tool page (Bun, Turbo) does this. |
| **Body Text** | `Inter` or `Geist Sans` | 400/500 | Clean, highly legible sans-serif. Industry standard for developer products. |
| **Code / Terminal** | `JetBrains Mono` or `Fira Code` | 400 | Must match real terminal aesthetics. Ligatures optional but nice. |

### Color Palette

The palette is derived from the existing CLI output (chalk magenta, cyan, green, gray):

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0A0A0F` | Page background. Near-black with a subtle blue undertone. |
| `--bg-surface` | `#111118` | Card/section backgrounds. Slight lift from the page. |
| `--bg-terminal` | `#0D0D14` | Terminal window backgrounds. |
| `--accent-magenta` | `#C084FC` | Primary accent. Matches chalk.magenta from CLI. Brand color. |
| `--accent-cyan` | `#22D3EE` | Secondary accent. Links, highlights, the URL in `✔ Ready`. |
| `--accent-green` | `#4ADE80` | Success states. The `✔` checkmark moments. |
| `--accent-yellow` | `#FACC15` | Warning/attention. Sparingly. |
| `--text-primary` | `#F0F0F5` | Main text. Slightly warm white. |
| `--text-secondary` | `#71717A` | Dimmed descriptions, labels. Matches chalk.gray. |
| `--border` | `#1E1E2A` | Subtle borders on cards and terminal windows. |
| `--glow` | `rgba(192, 132, 252, 0.15)` | Magenta glow behind hero elements. |

### Motion Principles

1. **Terminal-native pacing.** Animations should feel like watching a CLI execute — sequential, purposeful, with natural delays between steps.
2. **Scroll-triggered reveals.** Sections should animate in as the user scrolls, but never aggressively. Fade-up with 20px translate, 400ms duration, ease-out.
3. **No bounce. No elastic. No playful.** This is a developer tool. Motion should feel mechanical and precise.
4. **The hero terminal is the hero animation.** It should auto-type and execute a real GitRunByKaru session — this is the single most important animation on the entire page.
5. **Stagger, don't blast.** When multiple items appear (like the feature cards or stack icons), stagger them 80-120ms apart.

### Layout System

- **Max width:** `1200px` centered container.
- **Section spacing:** `160px` between major sections on desktop, `96px` on mobile.
- **Grid:** CSS Grid with 12-column base. Most content occupies 8-10 columns centered.
- **Breakpoints:** `1200px` (desktop), `768px` (tablet), `480px` (mobile).

### Responsiveness Strategy

- The terminal animation must remain legible on mobile. Scale font size down to `13px` and allow horizontal scroll on very narrow viewports rather than line-wrapping terminal output (wrapping breaks the illusion).
- Stack the two-column layouts vertically below `768px`.
- The sticky install bar (see Section 10) should become a fixed bottom bar on mobile.

### Accessibility

- All text meets WCAG 2.1 AA contrast ratios against the dark background.
- Terminal animations must have a `prefers-reduced-motion` fallback that shows the final state immediately.
- Interactive elements have visible focus rings using `--accent-magenta`.
- Semantic HTML: proper heading hierarchy, landmark regions, `aria-labels` on icon-only buttons.

---

## Part III — Section-by-Section Design

### Section Order & Rationale

```
1.  Navigation Bar
2.  Hero — "The Hook"
3.  The Problem — "The Pain"
4.  Terminal Demo — "The Proof"
5.  How It Works — "The Pipeline"
6.  Smart Detection — "The Magic"
7.  Supported Stacks — "The Breadth"
8.  Developer Experience Details — "The Polish"
9.  Latest Release — "The Momentum"
10. Install Bar — "The CTA"
11. Open Source & Community — "The Invitation"
12. Footer
```

**Why this order works:** It follows the classic persuasion arc: **Hook → Problem → Solution → Proof → Details → Social Proof → Action.** The terminal demo comes AFTER the problem statement because the user needs to feel the pain before they can appreciate the solution. The install CTA appears twice (hero + sticky bar) so it's always reachable.

---

### Section 1: Navigation Bar

**Purpose:** Orientation, credibility, quick navigation.

**User Emotion:** "This looks like a real, maintained project."

**Content Hierarchy:**
1. Logo/wordmark (left)
2. Nav links (center): Docs · GitHub · npm
3. Install button (right): `npm i -g gitrunbykaru`

**Visual Ideas:**
- Transparent background that gains a subtle `backdrop-filter: blur(12px)` and border-bottom on scroll.
- The logo is just the word `gitrunbykaru` in JetBrains Mono bold, magenta color.
- No hamburger menu on mobile — just collapse to logo + GitHub icon + install button.

**Animation Ideas:**
- Nav fades in on page load with a 200ms delay (after the hero starts).
- Background blur transition on scroll is 300ms.

**CTA Placement:** Install command as a clickable "copy" pill button on the right.

**Why this section exists:** Every credible tool page has a nav. It's the "this is a real product" signal.

**Things to avoid:**
- Don't add a logo icon/graphic. The word itself IS the brand. Adding a cute icon makes it feel like a side project.
- Don't link to too many things. Three links maximum.

---

### Section 2: Hero — "The Hook"

**Purpose:** Communicate what GitRunByKaru does in under 5 seconds.

**User Emotion:** "Wait, I can do THAT with one command?"

**Content Hierarchy:**
1. **Tagline (H1):** One line. Maximum 8 words. Example direction: `Run any GitHub repo. Instantly.` or `From GitHub URL to localhost. One command.`
2. **Subtitle:** One sentence. Example direction: `Clone, detect, install, launch — automatically. No setup, no config, no friction.`
3. **Install command block:** `npm install -g gitrunbykaru` with a copy button.
4. **Secondary CTA:** `View on GitHub →`

**Visual Ideas:**
- The tagline sits in the center of the viewport with generous whitespace above and below.
- Behind the text, a very subtle radial gradient glow in magenta (`--glow`) emanating from the center — creates depth without distraction.
- The install command is inside a terminal-styled pill: dark background, monospace font, a blinking cursor, and a copy icon.
- Subtle grid/dot pattern on the background, barely visible (opacity 0.03). Creates texture.

**Animation Ideas:**
- Tagline fades in and translates up 30px over 600ms.
- Subtitle appears 200ms after with the same animation.
- Install command slides in 400ms after that, with the cursor blinking.
- Entire sequence completes in under 1.5 seconds.

**CTA Placement:** Primary CTA is the install command. Secondary is the GitHub link.

**Why this section exists:** This is the most important 5 seconds of the entire page. If the developer doesn't understand what GitRunByKaru does after reading the hero, the page has failed.

**Things to avoid:**
- Don't show a screenshot or cover image. The terminal demo in the next section is worth more.
- Don't write a paragraph. This must be scannable in 3 seconds.
- Don't use the word "tool" in the tagline. It's generic and forgettable.
- Don't put the version number here.

---

### Section 3: The Problem — "The Pain"

**Purpose:** Create emotional resonance. Make the developer nod and say "yes, this is annoying."

**User Emotion:** "I literally did this yesterday."

**Content Hierarchy:**
1. **Section heading:** Something like `You've done this a hundred times.` or `The 8-step ritual nobody talks about.`
2. **The 8 steps** from the README, but presented as a visual sequence — not a markdown list.

**Visual Ideas:**
- Display the 8 steps as a vertical timeline or numbered sequence with dim styling (gray text, subtle step numbers).
- As the user scrolls, each step appears one by one with a slight fade-in.
- After all 8 steps are visible, a dramatic visual "collapse" or strikethrough animation occurs — all 8 steps are crossed out or compressed.
- Below the collapsed steps, a single line appears in magenta: `gitrunbykaru https://github.com/user/repo`
- The contrast between 8 dimmed-out steps and 1 bright command is the entire emotional payload.

**Animation Ideas:**
- Steps appear staggered on scroll (100ms apart).
- After all 8 are visible, a 500ms pause, then all steps get a strikethrough animation with opacity reduction.
- The single command line types itself out (typewriter effect) in magenta.

**CTA Placement:** None. This section creates tension that the next section (Terminal Demo) resolves.

**Why this section exists:** The README's "Why I Built This" section contains a genuinely compelling narrative. But a wall of text won't work on a landing page. This visual treatment preserves the emotional impact in a scannable format.

**Things to avoid:**
- Don't explain WHY these steps are annoying. Every developer already knows.
- Don't make this section too long. 8 items + the punchline, then move on.
- Don't use the phrase "setup friction" — it's accurate but not visceral.

---

### Section 4: Terminal Demo — "The Proof"

**Purpose:** Show, don't tell. This is the product demo.

**User Emotion:** "That's… beautiful. I want that in my terminal right now."

**Content Hierarchy:**
1. **Section heading:** `See it work.` or `One command. Full lifecycle.`
2. **Animated terminal window** showing a complete GitRunByKaru execution.

**Visual Ideas:**
- A full-width terminal window component with:
  - macOS-style window chrome (three dots: red/yellow/green, or a more neutral tab bar).
  - Title bar showing `~ / terminal`.
  - Dark background matching `--bg-terminal`.
- The terminal auto-plays a full execution sequence:

```
$ gitrunbykaru https://github.com/user/cool-project

  gitrunbykaru  —  run any GitHub repo in seconds
  ──────────────────────────────────────────────

  →  Cloning  https://github.com/user/cool-project
  ✔  Cloned   https://github.com/user/cool-project

  →  Detecting project type...
  ◆  Detected  Next.js (npm run dev) via npm

  →  Installing dependencies  [████████████████░░░░] 82% (54s)
  ✔  Installed dependencies ready (67.3s)

  →  Starting  npm run dev
  ────────────────────────────────────────────────

  ✔  Ready   http://localhost:3000

  Press Ctrl+C to stop
```

- Each line appears with realistic timing delays:
  - Clone: 1.5s delay
  - Detect: 0.4s delay
  - Install progress bar: 3-4s accelerated animation showing the bar filling
  - Ready: dramatic 0.8s pause before the green checkmark appears
- The `http://localhost:3000` URL should pulse once in cyan when it appears.

**Animation Ideas:**
- Typewriter effect for the initial command.
- Lines appear sequentially with terminal-realistic pacing.
- The progress bar animates smoothly (this is the v2.0.2 feature — show it off).
- When `✔ Ready` appears, a subtle green glow briefly pulses behind the terminal.
- The entire sequence loops after a 3-second pause at the end, or can be replayed with a small "replay" button.
- Consider: the terminal could show a second example on loop (switching between a Next.js repo and a Python Flask repo to demonstrate multi-stack support).

**CTA Placement:** Below the terminal, a subtle `Try it yourself →` with the install command.

**Why this section exists:** This is the single most important section on the page. The CLI output IS the product's UX. The animated terminal does what no screenshot, GIF, or paragraph can: it lets the developer experience the tool without installing it.

**Things to avoid:**
- Don't use a GIF. It will look compressed and awful. Build the terminal as a real HTML/CSS component with JS-driven animations.
- Don't show error states here. This is the happy path.
- Don't make the animation too fast. Real terminal pacing is what makes it feel authentic.
- Don't include the `--no-open` or `--keep` flags in the demo. Keep it simple.

---

### Section 5: How It Works — "The Pipeline"

**Purpose:** Give the technically curious a mental model of what happens under the hood.

**User Emotion:** "Oh, it's actually well-engineered."

**Content Hierarchy:**
1. **Section heading:** `What happens under the hood.`
2. **5-step horizontal pipeline** (not the full 10-step architecture doc):
   - Clone → Detect → Install → Launch → Cleanup

**Visual Ideas:**
- A horizontal flow of 5 connected nodes/cards.
- Each node is a rounded rectangle with:
  - An icon (use simple line icons: git branch, magnifying glass, package, play, trash).
  - A short label (`Clone`, `Detect`, `Install`, `Launch`, `Cleanup`).
  - A one-line description beneath in secondary text.
- Nodes are connected by dotted/dashed lines with animated flow (a subtle traveling dot or dash animation moving left to right).
- On mobile, this becomes a vertical stepper.

**Content for each node:**
1. **Clone** — `Shallow clone into a temp directory. Zero clutter on your machine.`
2. **Detect** — `Reads package.json, lockfiles, requirements.txt to identify the stack.`
3. **Install** — `Runs the right package manager automatically. npm, yarn, pnpm, bun, pip.`
4. **Launch** — `Starts the dev server, waits for HTTP readiness, opens your browser.`
5. **Cleanup** — `Deletes everything when you Ctrl+C. Like it never happened.`

**Animation Ideas:**
- Nodes appear staggered as the user scrolls into view (100ms apart, left to right).
- The connecting line animates after all nodes are visible — a traveling particle moves from Clone to Cleanup.
- Each node has a subtle hover effect: slight scale increase (1.02) and border glow in magenta.

**CTA Placement:** None needed. This is informational.

**Why this section exists:** Developers don't trust black boxes. Showing the pipeline gives them confidence that the tool is well-structured, not a fragile bash script.

**Things to avoid:**
- Don't show code. This isn't a documentation page.
- Don't use the full architecture SVG from the repo. It's too detailed.
- Don't explain the Strategy Pattern here. That's for contributors, not users.
- Don't show more than 5 steps. Simplicity is the message.

---

### Section 6: Smart Detection — "The Magic"

**Purpose:** Highlight the intelligence of the detection engine as a "wow" feature.

**User Emotion:** "It figures out EVERYTHING automatically?"

**Content Hierarchy:**
1. **Section heading:** `It figures out your stack.` or `Zero config. Auto everything.`
2. **Three feature cards** in a row showing the smartest behaviors:
   - **Stack Detection** — Reads package.json, lockfiles, pyproject.toml, manage.py, and index.html to auto-identify the project type and correct run command.
   - **Environment Mocking** — If `.env.example` exists, GitRunByKaru auto-generates a working `.env` with placeholder values so the app doesn't crash on missing keys.
   - **Smart Cleanup** — Cloned repos live in OS temp directories and are deleted automatically on exit. Your machine stays clean.

**Visual Ideas:**
- Three cards in a horizontal row (stacks vertically on mobile).
- Each card has:
  - A terminal-style icon or emoji at the top.
  - A bold heading (3-4 words).
  - A 2-line description.
- Cards have a subtle glass effect: semi-transparent background with a faint border.
- One card (Environment Mocking) should be visually "featured" — slightly larger or with a magenta border — because nobody else does this. It's the unique differentiator.

**Animation Ideas:**
- Cards fade-in staggered on scroll.
- On hover, cards lift slightly (translateY -4px) with a soft shadow.

**CTA Placement:** None. Informational.

**Why this section exists:** The README lists these as bullet points. But on a landing page, they deserve visual weight because they answer the developer's unspoken question: "But what about my `.env` file? What about cleanup?"

**Things to avoid:**
- Don't list every single feature from the README. Pick the three most impressive.
- Don't show code snippets of how detection works internally.
- Don't mention "convention over configuration" — it's an engineering philosophy, not a user benefit. Translate it to "zero config."

---

### Section 7: Supported Stacks — "The Breadth"

**Purpose:** Quickly signal which ecosystems are supported.

**User Emotion:** "Oh good, it works with my stack."

**Content Hierarchy:**
1. **Section heading:** `Works with what you use.`
2. **Grid of technology logos/icons** with labels.

**Visual Ideas:**
- A grid of technology icons (5-8 items):
  - Node.js, Next.js, Vite, React, Express
  - Python, Django, Flask, FastAPI
  - HTML5 (Static)
- Each icon is monochrome/grayscale by default and gains its brand color on hover.
- Below the icon grid, a single line: `And any conventional project that follows standard dev scripts.`

**Animation Ideas:**
- Icons fade in with a slight stagger.
- Hover: icon colorizes and scales up 1.05x.

**CTA Placement:** None.

**Why this section exists:** Developers immediately want to know: "Does this work with Next.js?" A visual grid answers that faster than a table.

**Things to avoid:**
- Don't use the full markdown table from the README. It's too dense for a landing page.
- Don't show detection file names or install commands here. The user doesn't care about lockfile logic on a marketing page.
- Don't include stacks that aren't actually supported (Go, Rust, Ruby). Be honest.

---

### Section 8: Developer Experience Details — "The Polish"

**Purpose:** Showcase the small details that make the tool feel premium.

**User Emotion:** "They thought of everything."

**Content Hierarchy:**
1. **Section heading:** `Built for developers who care about details.`
2. **2-3 side-by-side comparison snippets** or small feature highlights:
   - **Animated Progress Bar:** Show a small terminal snippet of the loading bar `[████████████░░░░░░░░] 65% (12s)`
   - **Package Manager Detection:** `yarn.lock → yarn install`, `pnpm-lock.yaml → pnpm install`, etc.
   - **Graceful Fallbacks:** If `npm ci` fails, auto-falls back to `npm install`.

**Visual Ideas:**
- Two-column layout: left side has a description, right side has a small terminal snippet.
- Alternate sides for each feature (description left/terminal right, then terminal left/description right).
- Terminal snippets are small, focused, showing just 2-3 lines each.

**Animation Ideas:**
- Each pair fades in on scroll.
- The progress bar in the terminal snippet is actually animated (the bars filling).

**CTA Placement:** None.

**Why this section exists:** The v2.0.2 animated loading bar is a genuinely nice touch. Package manager detection is impressive. These details separate GitRunByKaru from "just a bash script."

**Things to avoid:**
- Don't show more than 3 details. Diminishing returns.
- Don't explain implementation (asymptotic curves, exponential decay). Show the result.

---

### Section 9: Latest Release — "The Momentum"

**Purpose:** Signal that the project is alive and actively maintained.

**User Emotion:** "This isn't abandoned. It's actively developed."

**Content Hierarchy:**
1. **Section heading:** `Latest Release`
2. **Release card** showing:
   - Version badge: `v2.0.2`
   - Date: `July 2026`
   - 2-3 bullet highlights from the changelog
   - Link: `View all releases →`

**Visual Ideas:**
- A single card with a subtle magenta left-border accent.
- Version number in a pill badge.
- Compact — this shouldn't dominate the page.

**Animation Ideas:**
- Simple fade-in on scroll. No theatrics.

**CTA Placement:** `View all releases →` links to GitHub releases page.

**Why this section exists:** Abandoned projects are a developer's worst nightmare. A recent release date is the strongest signal of health.

**Things to avoid:**
- Don't show the entire changelog. Just the latest version's highlights.
- Don't show download counts if they're low. Omit stats entirely unless they're impressive.
- Don't show multiple versions. Just the latest.

---

### Section 10: Install Bar — "The CTA"

**Purpose:** Persistent, always-accessible install command.

**User Emotion:** "OK, I'm sold. Let me install this."

**Content Hierarchy:**
1. The install command: `npm install -g gitrunbykaru`
2. A copy button.

**Visual Ideas:**
- A slim horizontal bar spanning the full container width.
- Dark background with a magenta top-border glow.
- The command is centered in monospace font with a copy icon on the right.
- On mobile, this becomes a fixed bottom bar (like a mobile app install banner).
- Appears as a standalone section AND as a sticky element when the user scrolls past the hero's install command (so it's always reachable).

**Animation Ideas:**
- Copy button shows a brief "Copied!" tooltip with a checkmark animation on click.
- The sticky version slides in from the top when the hero scrolls out of view.

**CTA Placement:** THIS IS THE CTA.

**Why this section exists:** The install command is the conversion event. It must be omnipresent.

**Things to avoid:**
- Don't add marketing language around it. The command speaks for itself.
- Don't make the bar too thick. It should be slim and elegant.
- Don't require a click to reveal the command. It must be visible immediately.

---

### Section 11: Open Source & Community — "The Invitation"

**Purpose:** Invite contributions and signal open-source values.

**User Emotion:** "I could contribute to this."

**Content Hierarchy:**
1. **Section heading:** `Open source. Community driven.`
2. **Short paragraph:** 1-2 sentences about the project being MIT-licensed and contribution-friendly.
3. **Two buttons:** `Star on GitHub` · `Read Contributing Guide`
4. **GitHub stats widget:** Stars count (if available), latest commit indicator.

**Visual Ideas:**
- Centered text layout, minimal.
- The GitHub star button should look like an actual GitHub star button (dark style).
- A subtle animated border or shimmer effect on the GitHub card.

**Animation Ideas:**
- Fade in on scroll.
- The star button has a micro-animation on hover (star icon rotates slightly).

**CTA Placement:** GitHub star button is the primary CTA here.

**Why this section exists:** Open-source projects live and die by community. This section converts users into contributors.

**Things to avoid:**
- Don't copy the entire CONTRIBUTING.md here.
- Don't show a contributor grid/avatars if there are very few contributors. It will look sparse.
- Don't over-explain the contribution process. A link to the guide is sufficient.

---

### Section 12: Footer

**Purpose:** Legal, links, sign-off.

**User Emotion:** "Professional. Complete."

**Content Hierarchy:**
1. **Left:** `gitrunbykaru` wordmark + `MIT License`
2. **Center:** Links — GitHub · npm · Changelog · Architecture
3. **Right:** `Built by Karthikeya Dusi`

**Visual Ideas:**
- Slim footer with a subtle top border.
- Monochrome. No color accents.
- Small text (14px).

**Animation Ideas:** None. Footers don't need animation.

**CTA Placement:** None.

**Things to avoid:**
- Don't add social media links unless the project has active social accounts.
- Don't make the footer tall. 60-80px maximum.

---

## Part IV — Component Architecture

### Recommended Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Vite + React | Fastest DX for a single-page site. No SSR needed. |
| **Styling** | Vanilla CSS with CSS Custom Properties | Full control over the design system. No utility class bloat. |
| **Animation** | Framer Motion | Best-in-class React animation library. Scroll-triggered reveals, stagger, spring physics. |
| **Terminal Component** | Custom-built | No library captures the exact GitRunByKaru CLI output aesthetic. Build it. |
| **Icons** | Lucide React | Clean, consistent line icons. MIT licensed. |
| **Tech Logos** | SVG files (self-hosted) | Don't depend on external CDNs for technology logos. |
| **Font Loading** | Google Fonts (preconnect) | JetBrains Mono + Inter. |
| **Deployment** | Vercel or GitHub Pages | Free, fast, automatic deploys from the repo. |
| **Copy to Clipboard** | Native `navigator.clipboard` API | No library needed for this. |

### Folder Structure

```
website/
├── public/
│   ├── fonts/
│   └── icons/              # Tech stack SVG logos
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProblemSection.jsx
│   │   ├── TerminalDemo.jsx     # The star of the show
│   │   ├── Pipeline.jsx
│   │   ├── SmartDetection.jsx
│   │   ├── StackGrid.jsx
│   │   ├── DXDetails.jsx
│   │   ├── LatestRelease.jsx
│   │   ├── InstallBar.jsx
│   │   ├── OpenSource.jsx
│   │   └── Footer.jsx
│   ├── components/ui/
│   │   ├── TerminalWindow.jsx   # Reusable terminal chrome
│   │   ├── TerminalLine.jsx     # Single animated terminal line
│   │   ├── ProgressBar.jsx      # Animated progress bar component
│   │   ├── CopyButton.jsx       # Click-to-copy with tooltip
│   │   ├── SectionHeading.jsx   # Consistent section titles
│   │   ├── FeatureCard.jsx      # Glass-effect card
│   │   └── TechIcon.jsx         # Grayscale-to-color icon
│   ├── hooks/
│   │   ├── useInView.js         # Scroll-triggered visibility
│   │   └── useTypewriter.js     # Typewriter text effect
│   ├── data/
│   │   ├── terminalSequence.js  # Terminal demo script/timeline
│   │   ├── pipeline.js          # Pipeline step data
│   │   └── stacks.js            # Supported technology data
│   ├── styles/
│   │   ├── index.css            # Design tokens, resets, globals
│   │   ├── terminal.css         # Terminal-specific styles
│   │   └── animations.css       # Keyframes and transitions
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

### Key Components Detail

**`TerminalDemo.jsx`** — This is the most complex component. It needs:
- A timeline/script system that defines each line, its delay, and its style (prompt, output, spinner, progress bar, success).
- A state machine: `idle → typing → executing → complete → loop`.
- The progress bar must animate smoothly (CSS transition on width).
- Each line type maps to a different visual treatment (magenta for steps, cyan for info, green for success, gray for dim).
- Auto-play when scrolled into view. Pause when scrolled out.
- Replay button in the top-right corner of the terminal chrome.

**`InstallBar.jsx`** — Two modes:
- **Inline mode:** Rendered normally in the page flow (Section 10).
- **Sticky mode:** Fixed to the top of the viewport with a slide-down animation when the hero's install command scrolls out of view. Uses `IntersectionObserver` to detect this threshold.

---

## Part V — Implementation Phases

### Phase 1: Foundation (Day 1)
- Initialize Vite + React project.
- Set up CSS custom properties (design tokens).
- Load fonts (JetBrains Mono, Inter).
- Build `TerminalWindow` and `TerminalLine` base components.
- Build `Navbar`, `Hero`, `Footer`.

### Phase 2: The Core Experience (Day 2)
- Build the `TerminalDemo` with the full auto-playing sequence.
- Build `ProblemSection` with the 8-step strikethrough animation.
- Build `InstallBar` with copy functionality and sticky behavior.
- Wire up scroll-triggered animations with Framer Motion.

### Phase 3: Content Sections (Day 3)
- Build `Pipeline` (5-step horizontal flow).
- Build `SmartDetection` (3 feature cards).
- Build `StackGrid` (technology icons).
- Build `DXDetails` (side-by-side feature highlights).

### Phase 4: Polish & Ship (Day 4)
- Build `LatestRelease` card.
- Build `OpenSource` section.
- Add `prefers-reduced-motion` fallbacks.
- Mobile responsiveness pass.
- Lighthouse audit (target: 95+ performance, 100 accessibility).
- Deploy to Vercel or GitHub Pages.

---

## Part VI — Micro-Interactions Catalog

| Interaction | Behavior |
|-------------|----------|
| **Copy button click** | Icon changes from clipboard → checkmark. Tooltip says "Copied!" for 2s. |
| **Nav scroll** | Background transitions from transparent → blurred dark on scroll. |
| **Terminal replay** | A circular arrow icon in terminal chrome. On click, resets and replays the sequence. |
| **Tech icon hover** | Grayscale → full brand color. Scale 1.0 → 1.05. |
| **Feature card hover** | translateY -4px. Border glow in magenta. |
| **Pipeline node hover** | Slight scale (1.02). Descriptive tooltip appears. |
| **Problem steps strikethrough** | Each step gets `text-decoration: line-through` with opacity fade to 0.3. |
| **GitHub star button hover** | Star icon rotates 15° and pulses once. |
| **Install command focus** | Subtle magenta outline glow. |
| **Sticky install bar appearance** | Slides down from top with 300ms ease-out. |

---

## Part VII — Terminal-Inspired Interactions

These are the ideas that make this page feel uniquely "developer-first":

1. **The command is the CTA.** Instead of a generic "Get Started" button, the install command IS the button. Click it to copy. This is how Bun and Deno do it.

2. **Terminal-style section transitions.** Between major sections, show a thin gray line with a blinking cursor: `█`. It reinforces the CLI identity throughout the page.

3. **Keyboard shortcut hint.** On desktop, show a subtle `Press ⌘K to copy install command` at the bottom of the hero. Wire up the keyboard shortcut so it actually works.

4. **"Run this right now" prompt.** Near the terminal demo, show: `$ npx gitrunbykaru https://github.com/Karthikeyadusi/gitrunbykaru` — suggesting users can try the tool via npx without even installing it globally. (This is a real thing they can do.)

---

## Part VIII — Final Design Opinions

1. **The terminal demo must feel real.** If the animation feels canned or too fast, it loses all credibility. Time the pauses. Match real CLI behavior. The clone should take 1.5s. The detect should take 0.4s. The install bar should take 4s. The ready moment should have a pause before it. This pacing is everything.

2. **Don't show too much.** The README has a lot of content. The landing page should show maybe 40% of it. The rest belongs in documentation. A landing page that tries to be documentation is neither.

3. **The `.env` mocking feature is undervalued.** It's genuinely novel. No competitor (degit, tiged, npx create-*) does this. The landing page should give it a spotlight. It's the "oh, that's clever" moment.

4. **No testimonials section.** The project doesn't have enough social proof yet for testimonials to feel authentic. A quotes section with 1-2 fabricated or thin testimonials will damage credibility. Omit it entirely. Let the GitHub stars speak.

5. **The page should load in under 1 second.** No hero images (the existing cover images are 7MB — absolutely not). No video embeds. The terminal demo is built in HTML/CSS/JS. The tech icons are tiny SVGs. Fonts are preloaded. This page should score 98+ on Lighthouse.

6. **One page. No routing.** This is a single-page scroll experience. No `/docs`, no `/about`, no `/changelog` routes. If people want docs, link them to the GitHub repo. Keep it simple.

7. **The page must work without JavaScript for basic content.** Progressive enhancement. All text content should be visible in the initial HTML render. Animations and the terminal demo are enhancements.

---

> **This document is designed to be handed directly to a frontend engineer for implementation. Every section, every component, every animation is specified with enough detail to build without ambiguity. The terminal demo is the hero. The install command is the conversion. Everything else is supporting evidence.**
