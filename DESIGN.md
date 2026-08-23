---
name: Anthony Griffin Portfolio
description: Five deliberately different portfolio structures built from the same verified work history.
colors:
    proof-violet: '#8b91ff'
    proof-graphite: '#090b0f'
    proof-ambient: 'rgba(70, 76, 127, 0.12)'
    proof-line: 'rgba(210, 214, 255, 0.2)'
    artifact-acid: '#d7ff45'
    artifact-black: '#11120f'
    map-mint: '#7ef2c7'
    map-navy: '#06141f'
    map-navy-middle: '#081a26'
    map-navy-light: '#0d202a'
    map-paper: '#e8f1ed'
    map-paper-ink: '#10211b'
    map-paper-muted: '#52635d'
    map-card: '#f9fcfa'
    map-media: '#c8d8d1'
    map-footer: '#050f17'
    dossier-blue: '#1748d4'
    dossier-paper: '#f4f2ed'
    story-amber: '#e07a2c'
    story-cream: '#f2e9da'
    story-rule: 'rgba(33, 28, 24, 0.28)'
    story-media: '#d8c9b5'
    story-footer-muted: '#afa292'
    selector-rule: 'rgba(255, 255, 255, 0.12)'
    selector-shadow: 'rgba(0, 0, 0, 0.3)'
    selector-muted: '#9aa0af'
    white: '#fff'
typography:
    sans:
        fontFamily: 'Manrope, Segoe UI, sans-serif'
        bodyLineHeight: 1.65
        displayLetterSpacing: '-0.04em'
    editorial:
        fontFamily: 'Newsreader, Georgia, serif'
        bodyLineHeight: 1.55
        displayLetterSpacing: '-0.035em'
rounded:
    focus: '4px'
    control: '10px'
    media: '12px'
    panel: '14px'
---

# Design System: Anthony Griffin Portfolio

## Global UI rule

**Structure before skin.** A selectable design must change the order, hierarchy, and interaction model of the portfolio.
Changing only colors, type, or card treatments does not qualify as a new direction.

Every direction uses the same verified roles, projects, technology list, and links. No direction invents metrics,
testimonials, clients, or outcomes. Each direction keeps semantic landmarks, visible keyboard focus, readable measures,
responsive flow, and reduced-motion support.

## Direction selector

The fixed selector is the only shared design control. It supports direct selection, previous and next controls, left and
right arrow keys, and drag repositioning. The active design is the only design mounted in the document.

## Directions

### Proof Index

The control direction is a dark evidence ledger. It leads with Anthony's current role, then presents employment and
projects as a quiet engineering record. Graphite, warm white, and a rare violet signal support the release-notebook
metaphor.

### Artifact First

The first viewport is a project case study, not a biography. Pokedle occupies most of the screen, followed by pol.ai,
profile context, and work history. Acid green, black, clipped image framing, and high contrast make the artifact the
primary proof.

### Constellation Map

The constellation is functional navigation. Its nodes link to About, Workday, Pokedle, Hexaware, pol.ai, and GitHub. The
map resolves into a mint profile band, role signals, and an asymmetric project mosaic.

### Hiring Dossier

This is the fastest hiring-manager scan. A compact masthead and sticky profile rail sit beside dense role and project
records. Paper, black rules, and blue links make it read like a factual personnel dossier rather than a landing page.

### Career Narrative

Roles and projects are interleaved as chapters. Workday leads to Pokedle; Hexaware leads to pol.ai. Editorial
typography, chronology markers, warm paper, and restrained amber create a readable career story.

## Shared craft floor

-   Use real screenshots as evidence, with descriptive alternative text and stable dimensions.
-   Keep body text left aligned and within a readable measure.
-   Use authored SVG icons instead of Unicode interface symbols.
-   Avoid decorative card grids, fabricated statistics, pill-shaped metadata, and ornamental gradients.
-   Preserve natural document flow at every breakpoint. Do not use fixed content heights on mobile.
-   Give interactive targets a clear hover state and a visible `:focus-visible` outline.
-   Use motion only when it explains entry, state, or navigation. Respect `prefers-reduced-motion`.

## Responsive behavior

Each direction changes composition instead of shrinking a desktop canvas. The constellation becomes a link grid, dossier
columns stack, narrative markers stop sticking, project layouts become single-column, and the selector converts to a
bottom control. No direction may create horizontal page overflow at 320 CSS pixels.
