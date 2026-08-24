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
employment and project evidence, and continue to a live project or public GitHub profile.

## Proof and content

Use the approved resume for Workday and Freddie Mac via Hexaware Technologies history and impact metrics. Use the
existing fmr.fyi, Pokedle, BlockLens, Chrona, pol.ai, and Solas screenshots and links, the established technology list,
and the verified GitHub profile path. Do not fabricate testimonials, contact details, resume links, or project claims.

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
| Slim sticky navigation         | Anthony Griffin plus About, Experience, Work, and GitHub; collapses cleanly on mobile           | Semantic HTML and CSS                     |
| Theme control                  | Icon-led System, Light, and Dark menu; stored preference stays distinct from the resolved theme | Custom accessible menu and localStorage   |
| Constellation connective layer | Sparse points and faint joining lines; atmospheric, never interactive                           | CSS nodes and pseudo-elements             |
| Opening split                  | Concise About statement paired with current-role and technology evidence                        | Semantic HTML and responsive CSS grid     |
| Experience ledger              | Compact company metadata paired with top-aligned achievement details                            | Semantic HTML lists and responsive grid   |
| Selected-work bands            | Screenshot-dominant rows with project name, concise factual description, stack, and live action | Existing raster assets plus semantic HTML |
| Closing GitHub action          | Visible full-width close with one primary action                                                | Semantic anchor and CSS                   |
| Motion                         | One short entry reveal, then quiet one-shot section continuations that keep content mounted     | IntersectionObserver and CSS transforms   |

## Unresolved decisions

A public email address, resume URL, and LinkedIn URL are unavailable. The initial close therefore uses the verified
GitHub profile and existing live-project links.
