# Editorial Creative Director - Aesthetic Rework Plan

## Context

The site is a personal portfolio for Dheeraj Kale, a senior advertising and
corporate-communications professional with roughly 30 years of experience.
The audience is recruiters, agency principals, corporate clients, and
public-sector clients. They scan for credibility, taste, and proof of work.

The current landing section works: tiny, confident copy that creates intrigue.
The rest of the site reads like a styled résumé. Every section is a full-height
island with the same centered heading, the same gray blobs, and inconsistent
type and spacing. The gallery - the strongest evidence of capability - is
buried in a low-contrast carousel.

## Direction

Keep the monochrome restraint, the tiny-text hook, and the existing content.
Elevate the site into an editorial portfolio:

- Warm paper and off-black ink instead of pure white/black.
- Instrument Serif for display statements, Bricolage Grotesque for the name
  and UI, Source Serif 4 for reading, JetBrains Mono for dates and labels.
- One restrained accent: burnt orange.
- A real page shell: fixed header, section links, scroll progress, footer.
- A consistent 12-column grid, a measured reading width, and deliberate
  section rhythm instead of every section filling the viewport.
- The work moves forward and becomes the visual centrepiece.
- One signature motion language: quiet fade/rise reveals plus subtle image
  parallax, with `prefers-reduced-motion` respected.

## Page order

1. Landing - the hook, now resolving into identity.
2. About - editorial portrait and profile.
3. Selected Work - the gallery, reimagined as a project grid.
4. Experience - a timeline with proof and selected clients.
5. Contact - a designed closing section and footer.

## Design tokens

- `paper` `#f4f1ea` - primary light background.
- `ink` `#141414` - primary dark background and text.
- `muted` `#6f6b64` - secondary text.
- `line` `rgba(20, 20, 20, 0.14)` - rules and borders.
- `accent` `#c2410c` - links, active states, small moments only.
- Type scale: display `clamp(2.75rem, 6vw, 5.5rem)`, section title
  `clamp(2rem, 4vw, 3.5rem)`, body `1rem–1.125rem`, meta `0.6875–0.75rem`
  with uppercase tracking.

## Implementation

### 1. Foundation

- Load Instrument Serif and JetBrains Mono alongside the current fonts.
- Add a favicon, page description, Open Graph metadata, and theme colour in
  `index.html`.
- Extend `src/index.css` with colour and font tokens, base typography,
  selection colour, focus-visible styles, smooth scrolling, grain texture,
  and reduced-motion handling.
- Add `SiteHeader`, `SectionLabel`, and `SiteFooter` components.
- Add a thin scroll-progress line and active-section tracking.
- Wrap `App` in the shell and add section IDs. Remove `w-screen` in favour of
  `w-full` / `max-w` layouts.

### 2. Landing

- Keep the five-line hook and its small, quiet typography.
- Use an off-black background with a subtle grain.
- Stagger the lines on entry; finish with the last line in display serif.
- Add a bottom identity row with name, discipline, and a scroll cue.
- Keep the landing at full viewport height; every other section uses
  generous but content-led padding.

### 3. About

- Left-aligned editorial spread on a 12-column grid.
- Section label `01 - About`, display heading, and a short positioning line.
- Replace the floating halftone/stripe scraps with a single offset frame,
  a quiet halftone field, and a caption.
- Constrain body copy to a readable measure, add a drop cap, and add a
  three-item fact row: experience, agencies, media disciplines.
- Keep the existing three paragraphs verbatim.

### 4. Selected Work

- Rename Gallery to Selected Work in the UI.
- Replace the autoplay carousel with horizontal category tabs and a
  responsive project grid.
- Each card shows a contained preview, index, title, and media type. PDFs
  keep their existing first-page preview. Clicking opens the existing viewer.
- Show the active project's title and description above the grid. Never show
  "No description available"; fall back to a neutral line.
- Remove the pause control and the one-document-at-a-time layout.
- Restyle the viewer to match the new palette and typography, and keep
  previous/next navigation within the active section.

### 5. Experience

- Convert the list into a vertical timeline.
- Dates and labels in mono, role in display type, company in uppercase meta,
  description in muted body copy.
- Emphasize the current role and keep older roles quieter.
- Add a "Selected clients" chip row drawn from the existing experience copy.
- Remove the full-height island treatment.

### 6. Contact

- Use the dark ink background for a strong close, with a display headline and
  an oversized email link.
- Restyle contact rows for the dark surface with clear hover states.
- Add a footer with name, copyright, section links, and a back-to-top link.
- Keep every existing contact value and link unchanged.

### 7. Polish

- Use `min-h-svh`, `w-full`, `max-w-6xl`/`max-w-5xl`, and consistent
  `px-5 sm:px-8 lg:px-12` gutters.
- Fix low-contrast text: no informational copy below `muted`.
- Add focus-visible rings to all interactive elements.
- Preserve the existing gallery data model, PDF rendering, image viewer,
  markdown parsing, and asset paths.
- Verify with `npm run build`.

## Out of scope for this pass

- Writing new project descriptions or curating individual campaign covers.
- Generating new thumbnails or editing assets.
- Adding case-study routes, a CMS, or new content pages.
- Replacing the PDF viewer or markdown pipeline.
