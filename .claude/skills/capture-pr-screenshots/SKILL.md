---
name: capture-pr-screenshots
description: Capture screenshots that actually depict a pull request's changes — from the PR's deploy preview by default — upload them to a public gist, and embed them in the PR body. Use when the user asks to add, attach, capture, update, or fix screenshots for a PR or set of PRs. The skill's hard rule is: every screenshot must visibly contain the changed element — not a generic home page. Works across projects; respects per-project screenshot conventions when the repo documents them (e.g. in CLAUDE.md or docs/screenshots/README.md).
---

# Capture PR screenshots

## When to use

User asks to add / attach / capture / update / fix screenshots for a PR, a batch of PRs, or "all my PRs". Also when addressing a review comment that asks for a screenshot.

## The one hard rule

**Every screenshot must visibly contain the element(s) the PR changes or is directly related to.** A generic home-page or admin-dashboard screenshot that could have been captured on any branch is worthless to a reviewer — it's noise pretending to be evidence.

Everything else in this skill supports that rule.

## Pre-flight

### 1. Read the repo's screenshot convention, if any

Look for:

- `CLAUDE.md` (repo root or feature subdir) — search for "screenshot"
- `docs/screenshots/README.md`
- `.github/PULL_REQUEST_TEMPLATE.md` — may specify format / hosting

Follow that convention's naming, size budget, and hosting rules. If none exists, default to the conventions below.

### 2. For each PR, figure out what actually changed

```bash
gh pr view <N> --json headRefName,baseRefName,files,body,title
git fetch origin
git diff origin/<base>...origin/<head> --stat
```

Scan the file list. For each changed file, answer:

- **Does this file produce rendered output?** (`.astro`, `.tsx`, `.vue`, `.css`, template files)
- **Does this file change a CMS/admin surface?** (keystatic schema, Strapi config, Sanity schema)
- **Does this file change only types, tests, docs, or build tooling?** → likely no screenshot needed; see "When to skip" below.

For each rendered surface: identify the **exact URL** where the changed element renders. For admin surfaces: identify the **exact admin route** (e.g. Keystatic singleton path, collection item form) where the new/changed field appears.

> Critical failure mode: defaulting to `/` or `/keystatic` without verifying the element is there. The block you changed may only live on `/music/`, and might be part-way down the page; the field you added may only appear when editing a specific collection item. **Find where the element actually renders.**

### 3. When to skip screenshots entirely

Skip — and note it explicitly in the PR body — for:

- Pure refactors with no visible UI delta.
- Type system / build tooling only.
- Backend-only changes (API handlers, schemas with no admin surface, DB migrations).
- Test-only PRs.

Noted in the PR body: `No screenshots — pure refactor, no visible UI change.` (Or whatever applies.)

## Where to capture from

**The PR's deploy preview, by default.** It is the build a reviewer can click and the artifact CI produced, so a shot taken from it also proves the branch deploys and renders. A localhost shot proves your machine renders it.

Find the preview URL from the PR rather than guessing at a URL pattern:

```bash
gh pr view <N> --json statusCheckRollup \
  --jq '.statusCheckRollup[] | select(.targetUrl != null) | "\(.name)\t\(.targetUrl)"'

gh api "repos/<owner>/<repo>/deployments?ref=<head-branch>" --jq '.[0].id' \
  | xargs -I{} gh api "repos/<owner>/<repo>/deployments/{}/statuses" --jq '.[0].environment_url'
```

Most preview hosts also leave a bot comment or a check named after themselves — Vercel, Netlify, Cloudflare Pages, Render. If the preview is still building, wait for it. A shot of a half-built page is worse than no shot, and a stale preview from an earlier push is worse still: check the deployment points at the head commit you're documenting.

**If the repo has no previews, say so before capturing anything.** Tell the user this repo has no per-PR preview deployment and roughly what adding one would take for its stack, then carry on — don't block on it. Capture from a local **production** build (`npm run build && npm run start`, or the stack's equivalent) rather than the dev server, since dev overlays, unminified fonts and hot-reload artifacts all end up in the frame. Label the block in the PR body so nobody misreads it:

> Captured from a local production build — this repo has no deploy previews.

Substack is the exception and needs no such note: there's no per-PR preview an agent can reach, so local captures on the Mac are the normal path there.

## Capturing

### Site views

1. **Point the browser at the preview.** Falling back to a local build, check out the PR branch — a worktree if the main checkout is dirty — and serve a production build. Either way, if the repo has a capture script (e.g. `scripts/capture-pr-screenshots.mjs`), prefer it over ad-hoc tooling: it'll handle viewport size, wait states, and naming.

2. **Navigate to the specific URL showing the change.** Not `/`. The actual URL.

3. **Verify the changed element is visible in the viewport before capturing.** Scroll it into view if needed. If the element is occluded (e.g. a page-background image hidden behind a fullscreen hero on `/`, or a footer below the fold), pick a different page where it's prominent, or scroll/resize until it's visible.

4. **Before/after is stronger than after-alone** for subtle visual changes (font-size nudge, color shift, spacing tweak). Capture the same URL on the base branch and the head branch; name them `site-<page>-before.jpg` / `site-<page>-after.jpg`. For additive changes (new block that didn't exist before), after-only is fine.

5. **One capture per distinct change surface.** If a PR touches both `/photos/` and `/press/`, capture both.

### Admin views

1. **Navigate to the exact admin route that surfaces the new/changed field.** For Keystatic, that's usually:
   - `/keystatic/singleton/<name>` for config singletons (siteConfig, appearance)
   - `/keystatic/collection/<name>` for collection index
   - `/keystatic/collection/<name>/item/<slug>` for a specific item where the new field lives

2. **If admin auth is required and the capture script can't reach it headlessly**, DO NOT substitute a public-site screenshot. Tell the user the admin view needs manual capture from a signed-in browser. Give them the exact URL(s) to visit and the filename(s) to save. Proceed with the other screenshots and note the gap in the PR body.

3. **Scroll so the new field is in the viewport.** Don't capture the top of a long form when the new field is at the bottom.

### Recordings

Record only what a still can't carry — a transition, a hover state, a drag, a flow that takes several steps. It's an addition to the screenshots, never a replacement, because a reviewer skimming on a phone sees the stills and not the video.

Keep it under about ten seconds, no narration, and start it on the screen the change is on rather than on a navigation. MP4 over GIF: GIF of a UI flow runs to tens of megabytes and looks worse.

**A recording can't be hosted on the gist.** GitHub only plays video from its own `user-attachments` URLs, so a raw gist link renders as a dead link rather than a player. Save the file, tell the user where it is, and ask them to drag-drop it into the PR body — the same handoff `create-pr` uses for images, for the same reason.

### Quality check before uploading

Open each file in a preview app (or `open <file>` on macOS). If you can't find the changed element in the screenshot within 3 seconds, the screenshot isn't useful — re-capture.

Common miss: the element is technically rendered but too small to see, or hidden by another layer, or the capture ran before the page finished loading. Fix these before uploading.

## Uploading

Host on a **public gist**, one gist per PR. Private repos' `raw.githubusercontent.com` URLs 404 for unauthenticated viewers, so in-tree hosting doesn't work for the PR body.

```bash
# 1. Seed the gist
echo "stagecraft PR #<N> screenshots" > /tmp/pr-<N>-readme.md
gh gist create --public --desc "PR #<N> screenshots" /tmp/pr-<N>-readme.md
# → https://gist.github.com/<user>/<GIST_ID>

# 2. Push images with a token (gist's default clone URL can't auth from CLI)
git clone https://gist.github.com/<GIST_ID>.git /tmp/pr-<N>-gist
cp /tmp/pr-<N>-screenshots/*.{png,jpg} /tmp/pr-<N>-gist/
cd /tmp/pr-<N>-gist
git add -A && git commit -m "Add PR #<N> screenshots"
git remote set-url origin \
  "https://<user>:$(gh auth token)@gist.github.com/<GIST_ID>.git"
git push
```

**Size budget**: aim for < 500 KB per image. JPEG for photographs / site views, PNG for admin UI and anything with text. Use `--jpeg-quality 65` in the capture tool if files are large.

**Verify each URL returns 200 anonymously** before updating the PR:

```bash
curl -sI "https://gist.githubusercontent.com/<user>/<GIST_ID>/raw/site-<page>.jpg" | head -1
# Expect: HTTP/2 200
```

## Updating the PR body

Replace any existing `## Screenshots` section. Group by surface. Use clear alt text — the reviewer sees it if the image fails to load.

```markdown
## Screenshots

### Site

**Before** (`main`):
![Music page before tour-dates grouping](https://gist.githubusercontent.com/<user>/<GIST_ID>/raw/site-music-before.jpg)

**After** (this PR):
![Music page with upcoming/past auto-grouping](https://gist.githubusercontent.com/<user>/<GIST_ID>/raw/site-music-after.jpg)

### Admin

![Keystatic tour-date editor with new Category field](https://gist.githubusercontent.com/<user>/<GIST_ID>/raw/admin-tour-date-item.png)
```

For additive/no-change-to-existing PRs, drop the before/after sub-headings.

Fetch the body immediately before the write and replace the `## Screenshots` section in that exact text — `--body` overwrites the whole thing, and the user edits bodies in the browser while you work. Follow [`pr-body-rules`](../pr-body-rules/SKILL.md), which has the full rule and the recovery query.

```bash
CREATE_PR_SKILL=1 gh pr edit <N> --body "$(cat <<'EOF'
<new body, preserving the rest>
EOF
)"
```

The `CREATE_PR_SKILL=1` prefix is required — a guard denies bare `gh pr edit`.

Preserve the rest of the body verbatim — summary, test plan, stacking notes, checklists. Only replace the `## Screenshots` section.

## Hard rules

- **Never upload a screenshot that doesn't visibly contain the change.** Pick a different page, scroll, or skip the section entirely — but don't ship noise.
- **Never re-use screenshots across unrelated PRs.** Each PR gets its own gist and its own captures.
- **Never substitute a public-site screenshot for an admin screenshot you couldn't capture headlessly.** Tell the user the admin frame needs manual capture.
- **Always verify URLs return 200 anonymously before updating the PR body.** A 404 image in the PR body is worse than an empty section.
- **Never commit screenshots to the repo unless the repo's convention explicitly allows it.** Most don't; gists are the default.
- **Never fabricate a screenshot** (e.g. manually editing a non-representative image, reusing a mock). If you can't produce a real screenshot of the actual change, skip and document why.

## Batch mode (multiple PRs)

When the user asks for "all my PRs" or a list:

1. Build the list of PR numbers up front. Confirm it with the user if the scope is ambiguous.
2. Process each PR end-to-end (scan → capture → upload → update body) before moving to the next. One PR at a time is cleaner than batching by stage and then flailing on edge cases at the end.
3. Report per-PR: the URL updated, any skips (with reason), any manual captures the user needs to do.
4. If multiple PRs touch the same surface (e.g. four PRs all change the musician-site home page), each still gets its own gist + its own captures. The captures will differ branch-to-branch because each PR's changes layer onto the same page.

## Notes

- If the repo has `scripts/capture-pr-screenshots.mjs` or similar, read it before writing any ad-hoc capture code — it encodes project-specific knowledge (viewport, wait states, naming, handling of auth-gated routes).
- For projects using Claude Preview / Claude-in-Chrome MCP tools, use those instead of launching a headless browser by hand. They handle the dev-server lifecycle and can interact with auth flows.
- Don't leave temp files around. Clean up `/tmp/pr-<N>-*` after each PR finishes uploading.

## Afterwards

Once the task's result is fully delivered, invoke the `refine-skill` skill to retrospect on this execution. It runs as a background fork where supported, so it costs the task nothing.
