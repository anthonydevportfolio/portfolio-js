---
version: 1
slug: 'src-components-view-view-tsx'
primary_target: 'src/components/view/view.tsx'
related_targets:
    [
        'src/components/me/me.tsx',
        'src/components/experience/experience.tsx',
        'src/components/projects/projects.tsx',
        'src/components/projects/project.tsx',
        'src/components/view/footer.tsx'
    ]
---

# Post-landing portfolio

## Scope and mode

-   Primary target: `src/components/view/view.tsx`
-   Related targets: About, Experience, Projects, Footer, and shared application styling.
-   Visitor mode: Experience.

## Audience, job, and action

Hiring managers, recruiters, and technical collaborators need to understand Anthony's engineering focus, scan credible
project and employment evidence, and continue to a live project, professional profile, or direct contact method.

## Proof and content

Use the approved resume for Workday and Freddie Mac via Hexaware Technologies history and impact metrics. Use the
existing fmr.fyi, Pokedle, BlockLens, Chrona, pol.ai, and Solas screenshots and links, the resume-approved technology
inventory and contact details, the published resume asset, and the verified GitHub profile path. Do not fabricate
testimonials or project claims.

## Chosen direction

An editorial split ledger inside a quiet engineering release notebook. The interface uses compact evidence rows,
version-style metadata, hairline structure, and a faint constellation layer. Project artifacts lead without overlapping
white cards. Dark is the original ink-black canvas; light is a cool paper companion that preserves the violet accent.

Approved comp: `.impeccable/mocks/post-landing-ledger.png`

Memorable moment: the first project screenshot breaks the otherwise disciplined ledger and becomes the visual proof
point.

## Constraints

-   Preserve the completed landing and button transition.
-   Work responsively without fixed minimum widths, translated desktop layout, or fixed mobile content heights.
-   Keep semantic content mounted after entry.
-   Support keyboard use, focus visibility, image alternatives, and reduced motion.
-   The post-landing page must render useful text before noncritical imagery finishes.

## Implementation fidelity inventory

| Visible ingredient             | Commitment                                                                                      | Medium                                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Slim sticky navigation         | Name plus accessible disclosure button; mobile panel holds all links and the labeled theme UI  | Semantic HTML, React state, and CSS       |
| Interactive scroll rail        | Dense neutral bars with one dramatic longest bar as the sole page-position signal               | React, CSS transforms, and ARIA scrollbar |
| Theme control                  | Icon-led System, Light, and Dark menu; stored preference stays distinct from the resolved theme | Custom accessible menu and localStorage   |
| Constellation connective layer | Sparse points and faint joining lines; atmospheric, never interactive                           | CSS nodes and pseudo-elements             |
| Opening split                  | Concise About statement and profile links paired with current-role evidence                     | Semantic HTML and responsive CSS grid     |
| Experience ledger              | Compact company metadata paired with top-aligned achievement details                            | Semantic HTML lists and responsive grid   |
| Project bands                  | Screenshot-dominant rows with project name, concise factual description, and live action        | Existing raster assets plus semantic HTML |
| Tech stack ledger              | Complete resume stack grouped into compact, wrapping categories                                 | Semantic definition list and CSS          |
| Contact methods                | Email, phone, and LinkedIn actions grouped into one quiet panel                                 | Semantic address and anchors              |
| Motion                         | One short entry reveal, then quiet one-shot section continuations that keep content mounted     | IntersectionObserver and CSS transforms   |

## Unresolved decisions

None. Contact details and the published resume are sourced from the approved resume.
