---
target: the main app after clicking the button
total_score: 16
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-23T05-35-35Z
slug: src-components-view-view-tsx
---
# Post-landing portfolio critique

## Design Health Score

| Nielsen heuristic | Score | Main concern |
|---|---:|---|
| Visibility of system status | 2/4 | The entire portfolio waits behind a bare `Loading..` state. |
| Match with the real world | 3/4 | The section order is familiar, but the writing is generic and resume-like. |
| User control and freedom | 2/4 | There is no persistent navigation, skip path, deep link, or return path. |
| Consistency and standards | 2/4 | Headings, tabs, links, and imagery use inconsistent or nonstandard semantics. |
| Error prevention | 2/4 | Remote company assets can fail visibly and weaken trust. |
| Recognition rather than recall | 2/4 | No current-location cue or persistent section navigation exists. |
| Flexibility and efficiency | n/a | Expert accelerators are not essential for this portfolio surface. |
| Aesthetic and minimalist design | 2/4 | Oversized type, justified prose, overflow, overlap, and blank space dilute hierarchy. |
| Error recognition and recovery | 1/4 | Image failures silently become generic placeholders. |
| Help and documentation | n/a | Documentation is not required for this surface. |
| **Total** | **16/32** | **Acceptable at the threshold; significant improvement needed.** |

## Design Specificity Verdict

Low-to-moderate specificity. The constellation landing and honeycomb technology cluster feel authored, but the post-landing experience falls back to familiar developer-portfolio conventions: centered headings, a logo cloud, resume bullets, and alternating screenshot cards. The real work is specific; its presentation does not yet express engineering judgment, outcomes, or a distinctive point of view.

## Overall Impression

The main app feels dated because every element tries to carry visual weight. Large headings, large logos, large body text, overlapping cards, long reveal animations, and broad spacing compete instead of forming a calm hierarchy. The experience also ends without a conversion moment, so its weakest state becomes the final impression.

## What Is Working

1. The landing has a strong single focus and a memorable constellation identity.
2. About to Experience to Projects is a natural recruiter-oriented narrative.
3. Real screenshots and live-app links provide evidence rather than decoration.
4. The alternating project composition has the seed of an authored showcase.

## Priority Issues

### P1 - Responsive composition visibly breaks

Desktop Experience content overflows horizontally by about 50-84 px depending on viewport state. At 390 px, the Projects heading overlaps the final Experience bullet by about 36 px. Mobile tabs are only 29 px high, and justified About copy creates severe spacing rivers. Fixed minimum widths, translated layouts, fixed mobile heights, and oversized project media are the main causes.

Why it matters: visible collisions and scrollbars are immediate trust failures on a portfolio intended to demonstrate frontend quality.

Fix: replace translated and minimum-width layouts with a bounded responsive grid; use natural section height; left-align body copy; constrain the reading measure; provide 44 px controls; remove image oversizing that depends on clipping.

Suggested command: `$impeccable adapt`

### P1 - Core content is not keyboard- or screen-reader-operable

Experience tabs are clickable `div` elements, section titles are styled `div` elements, project titles repeat `h1`, visible images lack alt intent, and most post-landing animation lacks reduced-motion handling.

Why it matters: keyboard and assistive-technology users cannot operate or understand the central work-history interaction, and the markup signals weak product craft.

Fix: implement a semantic tablist with buttons and linked panels; use one `h1`, section `h2`s, and project `h3`s; add meaningful or intentionally empty alt text; provide visible focus; honor `prefers-reduced-motion` everywhere.

Suggested command: `$impeccable audit`

### P1 - The journey has no conversion endpoint

The footer is invisible, translated below the page, and still contains `this is a footer`. The experience ends in a large blank region with no contact, resume, GitHub, LinkedIn, or closing proposition.

Why it matters: a persuaded visitor has no obvious next step, and the unfinished ending becomes the remembered ending.

Fix: add a visible closing section with a specific proposition, one primary contact action, resume access, and secondary professional links.

Suggested command: `$impeccable layout`

### P2 - The content inventories work instead of proving impact

About uses generic aspiration copy. Experience emphasizes employer branding and activity bullets. Project cards list technologies and features but omit role, constraint, decision, and result.

Why it matters: the page reads like a resume rendered as cards instead of a demonstration of engineering judgment.

Fix: structure each featured project as problem, role, key decision, and measurable result. Give outcomes more typographic weight than technology logos. Surface the existing experience-location data.

Suggested command: `$impeccable bolder`

### P2 - Loading and motion delay access to the work

The app preloads every experience, technology, and project image before rendering. Scroll reveals last one to two seconds, content mounts and unmounts with viewport state, and essential employer marks depend on remote assets.

Why it matters: slow networks and asset failures delay or degrade the highest-trust content. Repeated long reveals make the site feel like a demo.

Fix: render text immediately; lazy-load below-fold imagery; self-host essential assets; shorten scroll reveals to subtle opacity and movement; keep content in the document once loaded.

Suggested command: `$impeccable optimize`

### P3 - The visual language loses its identity after landing

The strongest brand motif disappears after the CTA. The main surface uses flat charcoal, Montserrat, oversized employer logos, hexagonal badges, white overlay cards, gradients, and several motion styles without one restrained system.

Why it matters: modern elegance comes from controlled hierarchy and continuity, not the number of effects.

Fix: retain a faint constellation/grid motif as connective tissue; use a neutral surface palette with one cool accent; adopt a tighter type scale; use thin borders and low-contrast panels instead of floating white cards; standardize motion to one short easing system.

Suggested command: `$impeccable distill`

## Persona Red Flags

- Jordan, a first-time visitor, understands the opening but loses orientation after entry and reaches a blank ending without a next action.
- Riley, a deliberate stress tester, finds remote-logo failure, horizontal overflow, mobile overlap, broken heading structure, and an invisible placeholder footer.
- Casey, a distracted mobile visitor, encounters a long justified About block, small experience targets, dense achievements, delayed imagery, and section collision.

## Minor Observations

- The Workday mark is much louder than Anthony's accomplishments.
- Desktop project cards leave large dead gaps and use an older overlapping-card convention.
- Dates and project-description punctuation need consistent editorial polish.
- External links need visible focus states and safe `rel` attributes.
- Viewport-gated unmounting can remove earlier content from find-in-page and the accessibility tree.
- React reports a state-update-during-render warning from the About section.
