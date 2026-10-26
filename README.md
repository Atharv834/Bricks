# BountyBricks

An independent library of vulnerability report notes for security researchers. Browse 20 findings, understand their methods, and keep a personal reading list.

**[Open the live library](https://atharv834.github.io/Bricks/)**

## The research workspace

- Graphite and mint interface with dark and light themes.
- Six broad topic groups, preserving all original vulnerability labels and report content.
- Search titles, companies, descriptions, methods, lessons and tags. Multiple search words can appear anywhere in a report.
- Combine search with severity, topic and collection filters. Sort by collection order, bounty, severity or name.
- Grid and compact list views, plus useful empty states and one-click filter reset.
- Save reports and return to recently opened notes. Reading progress, bookmarks, theme and layout are stored in this browser; they are not synced to an account.
- Report briefings with a highlighted lesson, original methodology, copy control and clickable tags.
- Keyboard support: `/` or `Ctrl/Cmd+K` focuses search; `Esc` closes a report. Native modal focus containment, focus restoration and reduced-motion support.
- Responsive navigation and report layouts for small screens.

The dataset is in `src/data.js`. These are collected research notes; original disclosures and bounty claims have not been independently verified. Reports have no recorded publication dates, so the interface does not imply a chronological order.

## Run locally

```bash
npm ci
npm start
```

```bash
# Check filtering, topic grouping, reading history and numeric sorting
CI=true npm test -- --watchAll=false --runInBand

# Production bundle, with the configured /Bricks/ public path
npm run build
```

React 19, Create React App / react-scripts 5, CSS and inline SVG. No backend or additional runtime dependency is required for the workspace features.

## Publishing

The source lives on `main` and the repository's default `master` branch. GitHub Pages serves the built output from `gh-pages`. Source changes are checked by the build workflow; the deployment branch contains the published static bundle.

To publish from an authenticated local checkout:

```bash
npm run deploy
```

This builds the project and publishes the `build` directory with the existing `gh-pages` package. Keep the GitHub Pages publishing source on its existing `gh-pages` branch setting.

## Design references

The redesign prioritizes visible results, predictable controls, a quiet sidebar and legible report hierarchy:

- [Linear: A calmer interface for a product in motion](https://linear.app/now/behind-the-latest-design-refresh)
- [Linear: How we redesigned the UI](https://linear.app/now/how-we-redesigned-the-linear-ui)
- [Nielsen Norman Group: Helpful filter categories and values](https://www.nngroup.com/articles/filter-categories-values/)
- [Nielsen Norman Group: Mobile faceted search with a tray](https://www.nngroup.com/articles/mobile-faceted-search/)
- [Raycast: Search bar and keyboard-first navigation](https://manual.raycast.com/search-bar)
