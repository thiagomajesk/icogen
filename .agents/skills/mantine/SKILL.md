---
name: mantine
description: Mantine documentation workflow using split references from mantine.dev/llms-full.txt. Use when building, debugging, or reviewing Mantine UI code (components, hooks, theming, styles, charts, dates, and @mantine/x) and you need exact API/usage guidance from Mantine docs.
---

# Mantine Skill

Use the split documentation files in `references/` to answer Mantine questions without loading the full monolithic document.

## References Map

- `references/00-overview.md`: document preface and scope
- `references/01-core-components-and-features.md`: `@mantine/core` components and examples
- `references/02-hooks-components-and-features.md`: `@mantine/hooks`
- `references/03-dates-components-and-features.md`: `@mantine/dates`
- `references/04-charts-components-and-features.md`: `@mantine/charts`
- `references/05-guides-components-and-features.md`: guides
- `references/06-theming-components-and-features.md`: theming
- `references/07-styles-components-and-features.md`: styling APIs and patterns
- `references/08-x-components-and-features.md`: `@mantine/x-*`
- `references/09-other-components-and-features.md`: additional Mantine packages
- `references/10-frequently-asked-questions.md`: FAQ/troubleshooting

## Workflow

1. Identify the target Mantine package or topic from the user request.
2. Open only the relevant reference file from the map above.
3. If the target is unknown, search headings first:
   - `rg "^### <ComponentOrHookName>$" .agents/skills/mantine/references`
4. For props, examples, or styles API details, search inside the selected file:
   - `rg -n "#### Props|## Styles API|#### Example:" <reference-file>`
5. Use documented Mantine APIs/examples directly; avoid inventing props or unsupported patterns.

## Notes

- Source of truth is `https://mantine.dev/llms-full.txt`.
- Keep responses focused by loading only the minimum required reference file(s).
