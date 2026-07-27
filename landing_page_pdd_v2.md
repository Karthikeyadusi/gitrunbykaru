# GitRunByKaru — Landing Page Product Design Document

> **Version:** 2.0
> **Date:** July 27, 2026
> **Status:** Ready for Implementation

---

## Executive Summary

This document defines the complete design specification for the GitRunByKaru landing page. The page has one job: make a developer understand what GitRunByKaru does and install it. Everything on the page serves that conversion.

The page should feel like [bun.sh](https://bun.sh), [raycast.com](https://raycast.com), or [turbo.build](https://turbo.build) — minimal, technically credible, quietly confident. Not a portfolio. Not documentation. Not SaaS marketing. A premium developer product page for a growing open-source CLI tool.

### Changes from V1

This revision addresses 12 points of design review feedback. The major structural changes:

| Change | Rationale |
|--------|-----------|
| **Sections reduced from 12 → 9** | V1 had section bloat. Smart Detection + DX Details merged into one. Latest Release absorbed into a compact status strip. Standalone Install Bar section removed (now sticky behavior only). |
| **Before vs After replaces The Problem** | A visual side-by-side comparison is more visceral and faster to scan than the 8-step strikethrough animation. |
| **Project Journey Timeline added** | Tells the evolution story. Creates trust through demonstrated momentum. |
| **Hero now includes trust signals** | 700+ downloads, 5 releases, MIT license — surfaced immediately, not buried. |
| **Origin story woven into the page** | The project has personality. A brief, authentic line about why it was built appears as a callout near the hero, not as an "About Me" section. |
| **Contributing section expanded** | From a link to GitHub → a welcoming contributor experience with resource cards. |
| **All copy direction revised** | "Conventional GitHub projects" replaces "any GitHub repo." Honest scope. |

---

## Part I — Strategic Analysis

### What the Landing Page Must Communicate (in order)

1. **What it does** — One command. GitHub URL → running localhost.
2. **Why it matters** — The setup ritual is real, universal, and annoying.
3. **That it actually works** — The terminal demo IS the proof.
4. **That it's smart** — Auto-detection, `.env` mocking, cleanup.
5. **That it's alive** — 5 releases, 700+ downloads, active development.
6. **How to get it** — `npm install -g gitrunbykaru`

Everything else is noise. If a section doesn't serve one of these six points, it shouldn't exist.

### What Should NOT Appear

| Excluded | Reason |
|----------|--------|
| Architecture SVG | Too dense. Belongs in docs. |
| Technical deep dive content | Internal engineering. Zero landing page value. |
| "What It Doesn't Solve" section | Negative framing kills momentum. |
| Cover images (7MB) | Performance disaster. The terminal animation IS the visual. |
| Security warning as a section | Important but handled as a small note near the install CTA. |
| Implementation details (readline, execFileSync) | Users care that it works, not how you parse stdout. |
| Full CONTRIBUTING.md text | The expanded section uses resource cards, not a wall of text. |
| Testimonials | Not enough social proof yet. Fabricated quotes damage credibility. |

---

## Part II — Design Language

### Aesthetic Direction

**Dark-first. Terminal-native. Developer-credible.**

The visual identity is derived directly from the CLI output itself — chalk magenta, cyan success states, gray separators. The website should feel like the terminal grew a beautiful marketing page around it.

Key tension: **technically honest** (not corporate-slick) but **visually premium** (not raw hacker aesthetic). Vercel's restraint meets Bun's quiet confidence, with a touch of personal warmth.

### Typography

| Role | Font | Weight | Rationale |
|------|------|--------|-----------|
| **Headings** | `JetBrains Mono` | 700 | Monospace headings = CLI identity. Industry standard for dev tool pages. |
| **Body** | `Inter` | 400 / 500 | Clean, highly legible. The developer product standard. |
| **Code / Terminal** | `JetBrains Mono` | 400 | Matches real terminal aesthetics. |

### Color Palette

Derived from the actual chalk output colors in [logger.js](file:///c:/Users/Karthikeya%20Dusi/Desktop/Artifacts/gitrunbykaru/src/logger.js):

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0A0A0F` | Page background. Near-black, subtle blue undertone. |
| `--bg-surface` | `#111118` | Cards, raised surfaces. |
| `--bg-terminal` | `#0D0D14` | Terminal window interior. |
| `--accent-magenta` | `#C084FC` | Brand accent. The `→` step color. |
| `--accent-cyan` | `#22D3EE` | Links, URL highlights, the `http://localhost` moment. |
| `--accent-green` | `#4ADE80` | Success. The `✔` checkmark moments. |
| `--accent-yellow` | `#FACC15` | Attention. Used sparingly. |
| `--text-primary` | `#F0F0F5` | Main text. Warm white. |
| `--text-secondary` | `#71717A` | Dim descriptions. Matches chalk.gray. |
| `--border` | `#1E1E2A` | Card borders, dividers. |
| `--glow-magenta` | `rgba(192, 132, 252, 0.12)` | Background glow behind hero. |

### Motion Principles

1. **Terminal pacing.** Animations feel like watching a CLI execute — sequential, purposeful, with natural pauses between steps.
2. **Scroll-triggered reveals.** Fade-up with 20px translate, 400ms duration, ease-out. Never aggressive.
3. **No bounce. No elastic.** Motion is mechanical and precise. This is an engineering tool, not a toy.
4. **The terminal demo is the hero animation.** It auto-plays a real CLI session. Every other animation is subordinate.
5. **Stagger, don't blast.** Multi-item reveals stagger 80–120ms apart.

### Layout System

- **Max width:** `1200px` centered.
- **Section spacing:** `140px` desktop, `80px` mobile.
- **Grid:** CSS Grid, 12-column. Content occupies 8–10 columns centered.
- **Breakpoints:** `1200px` / `768px` / `480px`.

### Responsiveness

- Terminal animation: scale font to `13px` on mobile, allow horizontal scroll on narrow viewports. Never line-wrap terminal output.
- Two-column layouts stack vertically below `768px`.
- Sticky install bar becomes a fixed bottom bar on mobile.

### Accessibility

- WCAG 2.1 AA contrast on all text against dark backgrounds.
- `prefers-reduced-motion`: terminal shows final state immediately, all transitions disabled.
- Visible focus rings using `--accent-magenta`.
- Semantic HTML: proper heading hierarchy, landmark regions, `aria-labels` on icon-only buttons.

---

## Part III — Section-by-Section Design

### Revised Section Order

```
1. Navigation
2. Hero + Trust Signals
3. Before vs After
4. Terminal Demo
5. How It Works (Pipeline)
6. Features (merged: detection + .env + cleanup + progress bar)
7. Project Journey
8. Open Source & Contributing
9. Footer
```

**Why this order works:** Hook → Pain → Proof → Understanding → Details → Trust → Community → Exit. The Before/After creates tension. The terminal demo immediately resolves it. Everything after builds confidence. The install command appears three times (hero, below terminal, sticky bar) so it's always one click away.

**What was removed from V1:**
- **Supported Stacks (standalone section):** Merged into the Pipeline section as inline icons. A separate section for 10 logos felt padded.
- **DX Details (standalone section):** Merged into Features. The progress bar and package manager detection don't need their own section.
- **Latest Release (standalone section):** Absorbed into the Trust Signals strip in the hero area. Compact. Not a section.
- **Install Bar (standalone section):** The install command already appears in the hero and below the terminal. A third standalone section is redundant. The sticky bar behavior is sufficient.

---

### Section 1: Navigation

**Purpose:** Orientation. Credibility signal. Quick access to install.

**User Emotion:** *"This is a real, maintained project."*

**Content:**
```
[gitrunbykaru]                         GitHub · npm · Changelog          [npm i -g gitrunbykaru  📋]
```

**Visual Specification:**
- Transparent on load. Gains `backdrop-filter: blur(12px)` + subtle `border-bottom` after 60px scroll.
- Logo: `gitrunbykaru` in JetBrains Mono bold, `--accent-magenta`.
- Right side: install command in a dark pill with copy icon.
- Mobile: logo + GitHub icon + install pill. No hamburger menu.

**Animation:** Fades in 200ms after page load. Blur transition is 300ms.

**Things to avoid:**
- No logo graphic. The word IS the brand.
- Maximum 3 nav links. More looks like documentation.

---

### Section 2: Hero + Trust Signals

**Purpose:** Communicate what GitRunByKaru does in 5 seconds. Establish credibility immediately.

**User Emotion:** *"This solves a problem I have. And it looks legit."*

This is the most significant revision from V1. The hero now has three layers:

#### Layer 1: The Hook

**Content Hierarchy:**
1. **H1 Tagline:** Maximum 10 words. Technically accurate. Copy direction:
   - `From GitHub URL to localhost. One command.`
   - `Spend less time setting up. More time exploring.`
   - `Run conventional GitHub projects instantly.`
2. **Subtitle:** One line. Copy direction: `Clone, detect, install, launch — all automatic. One command, zero config.`
3. **Install command:** `npm install -g gitrunbykaru` in a terminal-styled pill with copy button.
4. **Secondary CTA:** `View on GitHub →`

> [!IMPORTANT]
> **Messaging constraint:** Never say "Run any GitHub repo." The tool supports conventional public repositories. Accuracy builds trust. Overpromising erodes it.

**Visual:**
- Centered vertically in the first viewport.
- Subtle radial magenta glow behind the tagline (`--glow-magenta`).
- Faint dot-grid texture on the background (opacity 0.03).
- The install command pill has a soft magenta border and a blinking cursor.

**Animation:**
- H1 fades up (30px, 600ms).
- Subtitle follows 200ms later.
- Install command follows 400ms after that.
- Total sequence: under 1.5s.

#### Layer 2: Trust Signals Strip

Immediately below the install command. A single horizontal line of subtle, dim stats:

```
700+ downloads  ·  5 releases  ·  MIT License  ·  Open Source
```

**Visual:**
- `--text-secondary` color. Small font (13px). Monospace.
- Centered. No icons. No badges. Just facts.
- Each stat separated by a dim `·` dot.

**Why this exists:** V1 had zero trust signals in the hero. For a growing project with 700+ downloads and 5 releases, these facts should appear within the first viewport. They don't need to shout — they just need to be visible. A developer scanning the hero sees: what it does, how to install it, and that it's a real, maintained project. All in 5 seconds.

**Things to avoid:**
- Don't call downloads "users." They're installs/downloads.
- Don't use colored badges. They feel like a README, not a product page.
- Don't inflate numbers. `700+` is honest. `Nearly 1000` is not.

#### Layer 3: Origin Callout

Below the trust strip, a small, italicized personal line:

```
Built because I was tired of spending 20 minutes configuring repos I'd close in 2.
```

**Visual:**
- `--text-secondary` color. Italic. 14px. Inter.
- No box, no card, no special treatment. Just a line of text.
- Optional: preceded by a dim `—` dash.

**Why this exists:** The design review asked for personality. This single line does it. It's the origin story compressed to one sentence. It's authentic because it's literally why the project was built (from the README: *"We spend more time configuring repositories than actually exploring them"*). It makes the project feel human without creating an "About Me" section.

**Things to avoid:**
- Don't make this a paragraph. One sentence.
- Don't add the author's name here. That's in the footer.
- Don't make it a callout box or card. It should feel like a whispered aside, not a feature.

---

### Section 3: Before vs After

**Purpose:** Visualize the value proposition in the most visceral, instantly scannable way possible.

**User Emotion:** *"Eight steps became one. I need this."*

This replaces V1's "The Problem" section. The design review specifically requested a Before vs After comparison. This is more effective than the strikethrough animation because it shows both states simultaneously — the developer doesn't have to wait for an animation sequence to understand the value.

**Content — Two Columns:**

| Without GitRunByKaru | With GitRunByKaru |
|---|---|
| ① Clone the repo | `$ gitrunbykaru <url>` |
| ② Read the README | |
| ③ Figure out the package manager | |
| ④ Install dependencies | |
| ⑤ Configure .env | |
| ⑥ Find the run command | |
| ⑦ Debug setup errors | |
| ⑧ Open localhost manually | |

**Visual Specification:**
- Two-column layout, side by side.
- **Left column ("Without"):** Dark card with `--bg-surface` background. The 8 steps are listed vertically with dim numbering (①②③...). Text in `--text-secondary`. Each step has a subtle `border-left` connector line. The overall mood is tedious, gray, heavy.
- **Right column ("With"):** Same card height. But the content is a single terminal line — `$ gitrunbykaru https://github.com/user/repo` — centered vertically in the card. Magenta text. Generous whitespace. The contrast between the dense left column and the empty-but-powerful right column IS the design.
- Below the right column, a small green success line: `✔ Ready  http://localhost:3000`
- The visual weight difference between the two columns communicates everything without a single word of explanation.

**Animation:**
- Left column steps appear staggered on scroll (80ms apart, top to bottom).
- Right column fades in after all 8 steps are visible (300ms delay).
- The `✔ Ready` line appears last with a brief green glow pulse.

**CTA Placement:** None. This creates desire. The terminal demo (next) provides the proof.

**Things to avoid:**
- Don't add explanatory text above or below. The visual speaks for itself.
- Don't animate the right side with a typewriter effect here. Save that for the terminal demo. The static command is enough.
- Don't label the columns with headers like "The Old Way" / "The New Way." The visual contrast is self-explanatory. If headers are needed, use `Without gitrunbykaru` and `With gitrunbykaru` — lowercase, dim.
- On mobile: stack the columns vertically. Left on top, right below.

---

### Section 4: Terminal Demo

**Purpose:** This is the product demo. The most important section on the page.

**User Emotion:** *"That's beautiful. I want that in my terminal."*

**Content:**
- A full-width terminal window component auto-playing a complete GitRunByKaru execution.

**Terminal Script (Primary — Next.js):**

```
$ gitrunbykaru https://github.com/user/next-portfolio

  gitrunbykaru  —  run any GitHub repo in seconds
  ──────────────────────────────────────────────

  →  Cloning  https://github.com/user/next-portfolio
  ✔  Cloned   https://github.com/user/next-portfolio

  →  Detecting project type...
  ◆  Detected  Next.js (npm run dev) via npm

  →  Installing dependencies  [████████████████░░░░] 82% (54s)
  ✔  Installed dependencies ready (67.3s)

  →  Starting  npm run dev
  ────────────────────────────────────────────────

  ✔  Ready   http://localhost:3000

  Press Ctrl+C to stop
```

**Terminal Script (Secondary — Python Flask, shown on loop after primary):**

```
$ gitrunbykaru https://github.com/user/flask-api

  gitrunbykaru  —  run any GitHub repo in seconds
  ──────────────────────────────────────────────

  →  Cloning  https://github.com/user/flask-api
  ✔  Cloned   https://github.com/user/flask-api

  →  Detecting project type...
  ◆  Detected  Python/Flask app

  →  Installing Python packages  [██████████████████░░] 91% (18s)
  ✔  Installed dependencies ready (22.1s)

  →  Starting  python app.py
  ────────────────────────────────────────────────

  ✔  Ready   http://localhost:5000

  Press Ctrl+C to stop
```

**Why two demos:** The alternating loop (Next.js → Flask → Next.js → ...) demonstrates multi-stack support without needing a separate "Supported Stacks" section. The developer sees it work with Node AND Python within one scroll stop.

**Visual Specification:**
- Terminal window with window chrome (three circles or a neutral title bar).
- Title bar: `~/terminal`
- Background: `--bg-terminal`.
- Full container width (max `1200px`).
- Below the terminal: `Try it without installing: npx gitrunbykaru https://github.com/Karthikeyadusi/gitrunbykaru` — a real command the developer can paste right now.

**Timing & Pacing (critical):**
- Initial command: typewriter effect, 40ms per character.
- Banner: instant.
- Clone start → clone done: 1.8s pause.
- Detect: 0.5s pause.
- Progress bar: 4s accelerated animation, bar fills smoothly from 0% → 100%.
- Install done → Start: 0.3s.
- Start → Ready: 1.0s dramatic pause.
- `✔ Ready` appears with a brief green glow behind the terminal.
- Hold on the completed state for 4s.
- Fade out, then start the alternate demo.
- Replay button (circular arrow icon) in the top-right of the terminal chrome.

**CTA below terminal:**

```
npm install -g gitrunbykaru                                                       [Copy  📋]
```

A slim install bar directly beneath the terminal. Dark background, monospace, copy button.

**Things to avoid:**
- No GIFs. Build the terminal as an HTML/CSS/JS component. GIFs look compressed and awful.
- No error states. This is the happy path.
- Don't make the animation too fast. The pauses between steps are what make it feel real.
- Don't show flags (`--no-open`, `--keep`). Simple command only.

---

### Section 5: How It Works — Pipeline

**Purpose:** Give the technically curious a mental model. Builds engineering trust.

**User Emotion:** *"This is well-thought-out, not a hack."*

**Content — 5-step horizontal pipeline:**

```
[ Clone ]  →  [ Detect ]  →  [ Install ]  →  [ Launch ]  →  [ Cleanup ]
```

Each node has a one-line description:

1. **Clone** — Shallow clone into an isolated temp directory.
2. **Detect** — Reads lockfiles, manifests, and scripts to identify the stack.
3. **Install** — Runs the correct package manager. npm · yarn · pnpm · bun · pip
4. **Launch** — Starts the server, verifies HTTP readiness, opens your browser.
5. **Cleanup** — Deletes everything on exit. Your machine stays clean.

**Below the pipeline,** a compact horizontal row of supported technology icons (monochrome):

```
Node.js · Next.js · Vite · React · Express · Python · Django · Flask · FastAPI · HTML
```

This replaces the V1 "Supported Stacks" standalone section. The tech icons live here because they're context for the "Detect" and "Install" steps — they answer "detect WHAT?" and "install WITH WHAT?"

**Visual Specification:**
- Horizontal flow of 5 rounded-rectangle nodes connected by dashed lines.
- Each node: icon (Lucide) + label + one-line description in `--text-secondary`.
- Connecting lines have a subtle animated traveling particle (a dim dot moving left to right).
- Technology icons below: small (24px), monochrome by default, gain brand color on hover.
- Mobile: pipeline becomes a vertical stepper. Tech icons wrap into two rows.

**Animation:**
- Nodes appear staggered on scroll (100ms apart, left to right).
- Traveling particle animates after all nodes are visible.
- Tech icons fade in together after the pipeline completes.

**Things to avoid:**
- No code. This isn't documentation.
- Don't use the architecture SVG from the repo.
- Maximum 5 steps. Simplicity IS the message.
- Don't explain the Strategy Pattern here. That's for contributors.

---

### Section 6: Features

**Purpose:** Highlight the smartest, most differentiated behaviors. The "they thought of everything" moment.

**User Emotion:** *"Auto env mocking? That's clever."*

This section merges V1's "Smart Detection" and "DX Details" into a single, tighter section. Four feature cards instead of six scattered items across two sections.

**Content — 4 Feature Cards:**

| Feature | Heading | Description |
|---------|---------|-------------|
| **Auto Detection** | `Zero config detection` | Reads package.json, lockfiles, pyproject.toml, manage.py. Identifies the framework, package manager, and run command automatically. |
| **Environment Mocking** | `Auto .env generation` | If `.env.example` exists, generates a working `.env` with placeholder values. Apps don't crash on missing keys. |
| **Progress Bar** | `Visual install feedback` | Animated progress bar with percentage and elapsed time during dependency installation. You always know what's happening. |
| **Clean Exit** | `Automatic cleanup` | Cloned repos live in temp directories and are deleted when you Ctrl+C. Your machine stays clean. |

**Visual Specification:**
- 2×2 grid of glass-effect cards.
- Each card: subtle `--bg-surface` background, faint `--border`, slight glass blur.
- Each card has: a terminal-style icon at top-left, bold heading (3-4 words), 2-line description.
- **Environment Mocking card is visually featured:** it has a magenta left-border accent. This is the unique differentiator — no other tool does this.
- Mobile: cards stack vertically in a single column.

**Animation:**
- Cards fade in staggered on scroll (100ms apart).
- Hover: `translateY(-4px)`, soft shadow, border glow.

**Things to avoid:**
- Don't show more than 4 cards. Diminishing returns.
- Don't show code or implementation details.
- Don't use the phrase "convention over configuration." Translate it to "zero config" — a user benefit, not a philosophy.

---

### Section 7: Project Journey

**Purpose:** Tell the evolution story. Demonstrate momentum. Build trust through visible growth.

**User Emotion:** *"This has been steadily improving for months. It's not going anywhere."*

This is a new section, requested by the design review. It replaces the V1 "Latest Release" standalone section by integrating release highlights into a visual timeline.

**Content — Vertical Timeline:**

```
●  Weekend Idea
   "Spent 25 minutes setting up a repo I closed in 2."
   The frustration that started it all.

●  First npm Release — v1.0.0
   Core pipeline: clone → detect → install → launch.
   A working proof of concept.

●  Production Hardening — v2.0.0
   Cross-platform fixes. Security improvements.
   Architecture documentation. First stable release.

●  700+ Downloads
   Developers started finding and using the tool.
   Growing adoption on npm.

●  Latest — v2.0.2
   ✨ Animated dependency progress bar
   ✨ Cleaner CLI experience
   ✨ Continuous UX polish

●  Still improving
   Active maintenance. Regular releases.
   5 releases and counting.
```

**Visual Specification:**
- Vertical timeline with a thin line running down the left side in `--accent-magenta`.
- Each milestone is a node (small filled circle) on the line with content to the right.
- The first milestone ("Weekend Idea") and the last ("Still improving") are the emotional anchors.
- The milestone descriptions are very short — 1-2 lines each. No paragraphs.
- The "Latest" milestone has a subtle pulse animation on its dot, signaling "you are here."
- The "Still improving" milestone uses a dotted line continuing downward, suggesting the journey isn't over.

**Animation:**
- Timeline draws itself as the user scrolls (the line extends downward, nodes appear when the line reaches them).
- Each milestone fades in as its dot appears.

**Why this section exists:** The design review identified that momentum creates trust. A visual timeline showing consistent progress over 4 months, 5 releases, and 700+ downloads tells a story that no badge or stat counter can. It also absorbs the "Latest Release" information that V1 wasted a full section on — the latest version's highlights are naturally embedded as the final milestone.

**Things to avoid:**
- Don't list raw version numbers and dates. Tell the story, not the changelog.
- Don't include every patch release. Compress to 5-6 meaningful milestones.
- Don't make this section too tall. Each milestone is 2-3 lines, not a paragraph.
- Don't fabricate milestones. Every item must be real.

---

### Section 8: Open Source & Contributing

**Purpose:** Invite participation. Make contributing feel accessible and welcoming.

**User Emotion:** *"I could contribute to this. They've made it easy."*

V1 had a minimal section with a GitHub link. The design review asked for a welcoming contributor experience. This revision provides that.

**Content:**

**Heading:** `Open source. Contributor friendly.`

**Subtext:** `GitRunByKaru is MIT-licensed and built in the open. Every part of the codebase, architecture, and release process is documented.`

**4 Resource Cards in a horizontal row:**

| Card | Icon | Label | Description | Link |
|------|------|-------|-------------|------|
| 1 | `Book` | Architecture Docs | Execution pipeline, strategy pattern, design principles. | `→ Read` |
| 2 | `GitPullRequest` | Contributing Guide | Setup, coding principles, PR expectations. | `→ Read` |
| 3 | `FileText` | Changelog | Full version history with every change documented. | `→ Read` |
| 4 | `Tag` | Release Notes | Detailed notes for every release. | `→ Read` |

Below the cards:

```
[★ Star on GitHub]        [View Repository →]
```

**Visual Specification:**
- Section has a slightly different background tone (`--bg-surface`) to create visual separation.
- Resource cards are compact: icon + label + one-line description + link.
- Cards use `--bg-primary` background against the `--bg-surface` section, creating a layered effect.
- The GitHub star button should be styled like GitHub's actual dark-mode star button.
- Mobile: resource cards wrap into a 2×2 grid, then a single column on very small screens.

**Animation:**
- Cards stagger on scroll (100ms apart).
- Star button: subtle scale pulse on hover.

**Things to avoid:**
- Don't show the CONTRIBUTING.md content verbatim.
- Don't show a contributor avatar grid if there are very few contributors.
- Don't add a "Good First Issues" card unless there are actually tagged issues in the repo. Linking to an empty filter damages credibility.

---

### Section 9: Footer

**Purpose:** Sign-off. Links. Human attribution.

**User Emotion:** *"Complete. Professional."*

**Content:**

```
gitrunbykaru                    GitHub · npm · Changelog              Built by Karthikeya Dusi
MIT License                                                           
```

**Visual:**
- Slim (60–80px). Subtle `border-top` in `--border`.
- Monochrome text. `--text-secondary` color. 14px.
- Three columns: brand + license (left), links (center), attribution (right).
- Mobile: stack vertically, centered.

**Animation:** None.

**Things to avoid:**
- No social media links unless the project has active accounts.
- Don't make the footer tall.

---

## Part IV — Sticky Install Bar (Global Behavior)

This is not a section — it's a global UI behavior.

**Trigger:** When the hero's install command scrolls out of the viewport, a slim sticky bar slides down from the top of the page (or up from the bottom on mobile).

**Content:** `npm install -g gitrunbykaru` + copy button.

**Visual:** Thin bar (44px height). `--bg-surface` background. Monospace text. Copy icon. Subtle `box-shadow` for depth.

**Animation:** Slides in with 300ms ease-out. Disappears when the hero's install command scrolls back into view.

**Security Note:** A small `⚠` icon at the far right of the sticky bar. On hover, shows a tooltip: `"This tool executes code locally. Only run repositories you trust."` This addresses the security warning without dedicating a section to it.

---

## Part V — Component Architecture

### Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Vite + React | Fastest DX. Single page, no SSR needed. |
| **Styling** | Vanilla CSS + Custom Properties | Full design control. No utility class bloat. |
| **Animation** | Framer Motion | Scroll reveals, staggers, spring physics. Best-in-class for React. |
| **Terminal** | Custom-built component | No library matches the exact GitRunByKaru CLI aesthetic. |
| **Icons** | Lucide React | Clean, consistent, MIT licensed. |
| **Tech Logos** | Self-hosted SVGs | No external CDN dependency. |
| **Fonts** | Google Fonts (preconnect) | JetBrains Mono + Inter. |
| **Clipboard** | Native `navigator.clipboard` | No library needed. |
| **Deployment** | Vercel or GitHub Pages | Free, fast, automatic. |

### Folder Structure

```
website/
├── public/
│   ├── fonts/
│   └── icons/                  # Tech stack SVG logos
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx            # Includes TrustStrip + OriginCallout
│   │   ├── BeforeAfter.jsx
│   │   ├── TerminalDemo.jsx    # ★ The star of the show
│   │   ├── Pipeline.jsx        # Includes StackIcons
│   │   ├── Features.jsx        # 4 feature cards
│   │   ├── ProjectJourney.jsx  # Visual timeline
│   │   ├── OpenSource.jsx      # Contributing + resource cards
│   │   └── Footer.jsx
│   ├── components/ui/
│   │   ├── TerminalWindow.jsx  # Reusable terminal chrome
│   │   ├── TerminalLine.jsx    # Single animated line
│   │   ├── ProgressBar.jsx     # Animated bar component
│   │   ├── CopyButton.jsx      # Copy with tooltip
│   │   ├── SectionHeading.jsx  # Consistent titles
│   │   ├── FeatureCard.jsx     # Glass-effect card
│   │   ├── TimelineNode.jsx    # Journey milestone
│   │   ├── ResourceCard.jsx    # Contributing resource link
│   │   ├── TechIcon.jsx        # Grayscale-to-color icon
│   │   └── StickyInstallBar.jsx
│   ├── hooks/
│   │   ├── useInView.js        # Scroll-triggered visibility
│   │   ├── useTypewriter.js    # Typewriter text effect
│   │   └── useStickyBar.js     # Hero scroll detection
│   ├── data/
│   │   ├── terminalSequence.js # Demo timeline/scripts
│   │   ├── pipeline.js         # Pipeline step data
│   │   ├── features.js         # Feature card data
│   │   ├── journey.js          # Timeline milestone data
│   │   └── stacks.js           # Technology icon data
│   ├── styles/
│   │   ├── index.css           # Tokens, resets, globals
│   │   ├── terminal.css        # Terminal-specific styles
│   │   └── animations.css      # Keyframes
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

### Key Component Detail

**`TerminalDemo.jsx`:**
- Timeline system defining each line, its delay, and style (prompt, step, info, spinner, progress, success, dim).
- State machine: `idle → typing → executing → complete → pause → reset → typing (alt demo)`.
- Progress bar animates via CSS transition on width.
- Line colors map to chalk equivalents: magenta (→), cyan (◆), green (✔), gray (dim).
- Auto-plays when scrolled into view (`IntersectionObserver`). Pauses when scrolled out.
- Two demo scripts alternate on loop (Next.js → Flask → Next.js...).
- Replay button in terminal chrome corner.

**`StickyInstallBar.jsx`:**
- Uses `IntersectionObserver` on the hero install command.
- When hero command exits viewport → bar slides in. When it re-enters → bar slides out.
- Includes the security tooltip on hover.

**`ProjectJourney.jsx`:**
- Timeline draws itself on scroll using a CSS animation tied to scroll position (or Framer Motion's `useScroll`).
- Each `TimelineNode` fades in when the line reaches its position.
- The "Latest" node has a persistent subtle pulse.
- The "Still improving" node has a dotted continuation line.

---

## Part VI — Implementation Phases

### Phase 1: Foundation (Day 1)
- Initialize Vite + React.
- CSS custom properties (all design tokens).
- Font loading (JetBrains Mono + Inter).
- `TerminalWindow`, `TerminalLine`, `ProgressBar` base components.
- `Navbar`, `Hero` (with trust strip + origin callout), `Footer`.

### Phase 2: Core Experience (Day 2)
- `TerminalDemo` with full auto-playing dual-demo sequence.
- `BeforeAfter` with staggered reveal.
- `StickyInstallBar` with `IntersectionObserver`.
- `CopyButton` with tooltip.
- Framer Motion scroll triggers.

### Phase 3: Content Sections (Day 3)
- `Pipeline` with traveling particle animation and inline tech icons.
- `Features` (4 glass-effect cards, `.env` card featured).
- `ProjectJourney` timeline with scroll-draw animation.

### Phase 4: Polish & Ship (Day 4)
- `OpenSource` section with resource cards.
- `prefers-reduced-motion` fallbacks.
- Full mobile responsiveness pass.
- Lighthouse audit (target: 95+ performance, 100 accessibility).
- Deploy to Vercel or GitHub Pages.

---

## Part VII — Micro-Interactions Catalog

| Interaction | Behavior |
|-------------|----------|
| **Copy button** | Clipboard → checkmark icon. "Copied!" tooltip for 2s. |
| **Nav scroll** | Transparent → blurred dark background at 60px scroll. |
| **Terminal replay** | Circular arrow in chrome corner. Resets and replays. |
| **Tech icon hover** | Grayscale → brand color. Scale 1.05×. |
| **Feature card hover** | `translateY(-4px)`. Border glow in magenta. |
| **Pipeline node hover** | Scale 1.02×. Description brightens. |
| **Before/After reveal** | Left steps stagger in. Right column fades in after. Green glow on `✔ Ready`. |
| **Timeline scroll-draw** | Line extends downward as user scrolls. Nodes appear at their positions. |
| **Latest milestone pulse** | Subtle magenta pulse on the dot. Persistent, slow (3s cycle). |
| **Sticky bar entrance** | Slides down from top, 300ms ease-out. |
| **Security tooltip** | `⚠` on sticky bar, hover reveals warning text. |
| **Keyboard shortcut** | `⌘K` (Mac) / `Ctrl+K` (Win) copies install command. Subtle hint in hero. |

---

## Part VIII — Terminal-Inspired Interactions

1. **The command IS the CTA.** No "Get Started" button. The install command is the button. Click to copy. This is how Bun and Deno do it.

2. **Keyboard shortcut.** `⌘K` / `Ctrl+K` copies the install command anywhere on the page. A small hint appears below the hero install pill: `⌘K to copy`.

3. **npx instant try.** Below the terminal demo: `$ npx gitrunbykaru https://github.com/Karthikeyadusi/gitrunbykaru`. A real command the developer can paste without installing globally. This is the "try before you buy" moment.

4. **Terminal-style section dividers.** Between sections, a thin gray `──────` line with a blinking cursor `█` at the right edge. Reinforces the CLI identity throughout the scroll.

---

## Part IX — Final Design Opinions

1. **The terminal demo pacing is everything.** If it feels canned or rushed, the page fails. The clone delay (1.8s), the detect pause (0.5s), the progress bar fill (4s), the dramatic pause before `✔ Ready` (1.0s) — these timings are specified because they mimic real CLI behavior. Don't speed them up.

2. **Show 30% of the README, not 80%.** The landing page is a highlight reel. Documentation lives in the repo. A page that tries to be both is neither.

3. **The `.env` mocking is the hidden gem.** No competitor does it. The featured card treatment (magenta border) ensures developers notice it. It's the "oh, that's clever" moment that separates GitRunByKaru from "just a wrapper around git clone."

4. **No testimonials.** The project has 700+ downloads. That's growing, not established. Fake-feeling testimonials would do more harm than good. Let the terminal demo and the stats speak.

5. **Page loads in under 1 second.** No hero images (the 7MB covers are excluded). No video embeds. Terminal is HTML/CSS/JS. Tech icons are tiny SVGs. Fonts preloaded. Target: 98+ Lighthouse performance score.

6. **One page. No routing.** Single scroll experience. No `/docs`, `/about`, or `/changelog`. Links to GitHub for everything else.

7. **Progressive enhancement.** All text content visible without JavaScript. Animations and the terminal demo are enhancements.

8. **Honest messaging throughout.** "Conventional GitHub projects" — not "any." "700+ downloads" — not "thousands." "Growing" — not "popular." Accuracy builds the kind of trust that matters to developers.

---

> This document is designed to be handed directly to a frontend engineer. Every section, component, animation, and timing is specified precisely enough to build without ambiguity. The terminal demo is the centerpiece. The install command is the conversion. The journey timeline is the trust signal. Everything else is supporting evidence for a growing, well-engineered open-source project.
