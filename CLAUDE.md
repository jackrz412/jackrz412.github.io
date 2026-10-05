# Portfolio — project instructions

## What this is
Jack Roberts' personal portfolio site, published on GitHub Pages under the GitHub account `jackrz412`.
It will showcase data analysis and AI engineering projects as he moves from cost estimation into technical roles.

## How to work with me
- I'm learning. Before running a command or adding a dependency, say in one or two sentences what it does and why we need it.
- Define technical terms the first time they come up.
- Prefer the simplest approach that works. Don't add frameworks, libraries, or abstractions we don't need yet.
- Make small, focused changes, and pause after each one so I can review it before you continue.
- Don't commit or push unless I ask you to. I want to run Git myself while I'm learning it.

## Stack (decided)
- Astro static site, built to plain HTML/CSS/JS.
- Deployed to GitHub Pages via a GitHub Actions workflow.
- Node.js and npm installed through Homebrew.
- No backend, no database, no tracking scripts.

## Hard rules
- Never include anything from my employers or their programs, sanitized or not. Use only public data sources.
- Never put personal contact details (phone, home address, personal email) in the code or in commits.
- Never commit secrets: API keys, tokens, `.env` files.

## Commands
- `npm run dev` — start a local preview at http://localhost:4321 that refreshes as you edit.
- `npm run build` — build the final site into `dist/` (the same build GitHub Actions runs).
- `npm run preview` — serve the built `dist/` folder locally to check it before pushing.
