# Cypher — Design Plan

## Color
- `#0A0A0A` void — page background, deliberately not pure black so the red glow has somewhere to bloom into
- `#141414` surface — card/input background, one step up from void
- `#1B1B1B` surface-raised — nested content inside cards (results blocks, skeletons)
- `#262626` surface-border — the only border color in the system
- `#FF003C` signal — the single accent: primary actions, focus states, premium markers, hook/timestamp emphasis
- `#EDEDED` / `#9C9C9C` / `#5C5C5C` ink / ink-muted / ink-faint — a three-step text hierarchy instead of opacity tricks

## Type
Geist Sans for all UI text, Geist Mono for the wordmark, timestamps, unlock
codes, and hashtags — anywhere a "system" or "terminal" register is earned by
the content itself (a code, a time index), never as generic decoration.

## Layout
Left-aligned, content-first, generous vertical rhythm. No centered marketing
blocks, no card-grid-for-everything default — the Studio list is genuinely a
grid (it's a catalog), but the generation page and results view are a single
linear column, because reading a script and a shot list in two columns would
force the eye to zigzag.

```
[ header: wordmark  ·  nav  ·  unlock ]
[ hero: headline + subhead, left-aligned, no illustration ]
[ featured studios: 4-up card grid ]
```

## Principles
1. **One accent, spent deliberately.** Red only marks: primary actions, the
   active nav/filter state, premium locks, and the timeline's time column.
   Everything else stays in the ink/border grayscale.
2. **The matrix rain is atmosphere, not chrome.** Rendered at ~6% glyph
   opacity on a canvas behind all content, it never carries information and
   is fully disabled under `prefers-reduced-motion`.
3. **No template tells.** No tracked-out all-caps eyebrows, no em-dash
   labels, no numbered-marker decoration where the content isn't actually a
   sequence (Missions steps *are* a sequence, so they *do* get numbered
   markers — that's the one legitimate use in the app).
4. **Locked states are honest, not punitive.** A locked Skill shows its
   category and title in full, with only the prompt body blurred — the
   person can see exactly what they'd unlock, not a vague padlock icon with
   no context.
