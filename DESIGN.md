---
name: Anthony Griffin Portfolio
description: A quiet, evidence-led engineering portfolio shaped like a release notebook.
colors:
    violet-status: '#8b91ff'
    graphite-void: '#090b0f'
    graphite-surface: '#0e1117'
    graphite-raised: '#12161e'
    warm-white: '#f3f4f7'
    cool-steel: '#a9afbd'
    slate-metadata: '#747b8c'
    hairline: 'rgba(199, 207, 255, 0.13)'
    hairline-strong: 'rgba(199, 207, 255, 0.22)'
typography:
    display:
        fontFamily: 'Manrope, Segoe UI, sans-serif'
        fontSize: 'clamp(2.25rem, 3.6vw, 3.25rem)'
        fontWeight: 560
        lineHeight: 1.04
        letterSpacing: '-0.04em'
    headline:
        fontFamily: 'Manrope, Segoe UI, sans-serif'
        fontSize: 'clamp(2rem, 4vw, 3rem)'
        fontWeight: 560
        lineHeight: 1.1
        letterSpacing: '-0.035em'
    title:
        fontFamily: 'Manrope, Segoe UI, sans-serif'
        fontSize: '1.125rem'
        fontWeight: 600
        lineHeight: 1.25
        letterSpacing: '-0.015em'
    body:
        fontFamily: 'Manrope, Segoe UI, sans-serif'
        fontSize: '1rem'
        fontWeight: 400
        lineHeight: 1.7
    label:
        fontFamily: 'Manrope, Segoe UI, sans-serif'
        fontSize: '0.75rem'
        fontWeight: 500
        lineHeight: 1.4
        letterSpacing: '0.05em'
rounded:
    focus: '4px'
    control: '12px'
    media: '14px'
spacing:
    xs: '0.5rem'
    sm: '0.75rem'
    md: '1.5rem'
    lg: '3rem'
components:
    external-action:
        backgroundColor: 'transparent'
        textColor: '{colors.warm-white}'
        rounded: '{rounded.control}'
        padding: '0 1.25rem'
        height: '52px'
    nav-link:
        backgroundColor: 'transparent'
        textColor: '{colors.cool-steel}'
        typography: '{typography.label}'
        height: '44px'
    project-media:
        backgroundColor: '{colors.graphite-surface}'
        rounded: '{rounded.media}'
---

# Design System: Anthony Griffin Portfolio

## Overview

**Creative North Star: "The Engineering Release Notebook"**

The portfolio treats Anthony's work as a precise, evolving record rather than a promotional spectacle. Graphite surfaces
recede, evidence stays in the foreground, and small pieces of release-style metadata give the page an engineering
character without turning code aesthetics into a costume.

The system is calm, exact, and technically credible. A sparse constellation layer connects it to the landing experience,
while the post-landing interface refuses oversized portfolio typography, decorative logo clouds, overlapping white
showcase cards, and theatrical scroll motion.

**Key Characteristics:**

-   Evidence-led ledgers instead of résumé cards.
-   Warm-white hierarchy on layered graphite surfaces.
-   One rare violet-blue status signal.
-   Faint constellation geometry used only as connective atmosphere.
-   Short, accessible state transitions with reduced-motion fallbacks.

## Colors

The palette is a restrained cool-dark system in which the accent behaves like a status light, not a decorative fill.

### Primary

-   **Violet Status:** The single active signal for constellation nodes, metadata emphasis, focus rings, and restrained
    state feedback.

### Neutral

-   **Graphite Void:** The page ground and darkest ambient field.
-   **Graphite Surface:** The base for framed project artifacts.
-   **Graphite Raised:** A reserved tonal step for future interactive or elevated states.
-   **Warm White:** Primary headings, active navigation, and decisive actions.
-   **Cool Steel:** Body copy and secondary explanations.
-   **Slate Metadata:** Dates, locations, stacks, and other subordinate evidence.
-   **Hairline / Hairline Strong:** Structure sections, ledgers, media frames, and controls without creating boxes
    around every element.

**The One Signal Rule.** Violet Status is rare enough that every use communicates navigation, focus, or identity.

## Typography

**Display Font:** Manrope (with Segoe UI and sans-serif fallbacks) **Body Font:** Manrope (with Segoe UI and sans-serif
fallbacks)

**Character:** Manrope keeps the interface contemporary and human without leaning on a monospace developer costume.
Weight and measure create hierarchy; decoration does not.

### Hierarchy

-   **Display** (560, responsive 36–52px, 1.04): The single introductory statement; keep it balanced and below
    conventional hero scale.
-   **Headline** (560, responsive 32–48px, 1.1): Major section and closing headings.
-   **Title** (600, 18px, 1.25): Company and ledger-entry titles.
-   **Body** (400, 16–18px, 1.7–1.8): Explanations and project evidence, normally capped near 64 characters per line.
-   **Label** (500, 12–13px, moderate tracking): Dates, locations, versions, and technology metadata.

**The Quiet Hierarchy Rule.** No text grows merely to create excitement; the work artifact is allowed to become the
focal point.

## Layout

The desktop system uses an 1180px maximum shell with 24px side gutters. The opening is a 1.35-to-0.65 split between
Anthony's introduction and current role. Section headers and experience rows use ledger columns; project rows give the
existing screenshot the larger share of a two-column band.

At 900px, complex rows simplify and project bands stack. At 640px, all ledgers become one column, side gutters reduce to
16px, project copy precedes its screenshot, and the navigation moves into a name-led disclosure panel. Heights remain
content-driven at every breakpoint.

Spacing follows related-content grouping: 8–24px within a group, roughly 48px between neighboring ideas, and responsive
72–120px section breathing room. Sections always have more space above a heading than immediately below it.

**The Natural Flow Rule.** Do not use translated layouts, desktop minimum widths, fixed mobile content heights, or
overflow as a compositional technique.

## Elevation & Depth

The system uses no shadows. Depth comes from tonal surfaces, ambient constellation points, one purposeful navigation
blur, and hairline separation. Project screenshots are framed with a border only; controls use either a border or a
tonal state, never both a border and a shadow.

**The Flat Evidence Rule.** Content earns prominence through scale, placement, and contrast—not simulated elevation.

## Shapes

Most structure is square and grid-led. Focus targets may use a subtle 4px radius, external actions use a restrained 12px
radius, and project media uses a 14px radius to distinguish artifacts from document structure. Dots remain circular
because they represent constellation and status points.

Hairlines are always 1px. There are no pills, clipped technology badges, overlapping card silhouettes, or decorative
containers around ordinary text.

## Components

### External Actions

-   **Shape:** Gently curved control (12px radius), 52px high.
-   **Default:** Transparent graphite with a one-pixel strong hairline and Warm White text.
-   **Hover / Focus:** A faint Violet Status surface appears on hover; keyboard focus receives a two-pixel Violet Status
    outline with a four-pixel offset.
-   **Motion:** The authored external-link arrow moves two pixels up and right over 180ms.

### Navigation

-   **Style:** A 64px sticky document index on a translucent Graphite Void surface with an 18px functional backdrop
    blur.
-   **Targets:** Every link, including the brand, is at least 44px high.
-   **Typography:** Compact Cool Steel labels; the brand and hover/focus states move to Warm White.
-   **Mobile:** The name remains visible beside a compact disclosure button. Opening it reveals About, Projects,
    Experience, Contact, and a labeled Theme row in one quiet full-width panel. Activating Theme slides a dedicated
    System, Light, and Dark submenu in from the right; Back restores the navigation panel and focus. The outer panel
    moves only four pixels and resolves from a tightly bounded soft blur; keyboard and reduced-motion paths update
    immediately.

### Scroll Rail

The native scrollbar is replaced by a dense interactive rail of neutral hairlines. Page position is communicated by the
single longest bar, with a steep exponential falloff through its neighbors; there is no separate colored position
cursor.

### Profile Actions

LinkedIn and GitHub sit directly below the introduction as two compact, equal logo-only tiles. Each keeps an accessible
link name and visible focus treatment without repeating the service name or adding an external-link cue.

### Experience Ledger

Employment entries are separated by hairlines and use three desktop columns: period/location, company/title, and
evidence. At tablet width, evidence moves under the role; at mobile width every field becomes a natural single-column
sequence.

### Project Artifact

The screenshot is the dominant proof surface, framed by a single hairline and a 14px radius. Its paired copy carries a
factual description and one live-project action. Hover may scale the image by no more than 1.012.

### Tech Stack Ledger

Resume-approved tools are grouped by working context in a two-column ledger. Items stay inline with quiet separators,
then collapse to one column on mobile. The stack remains searchable and complete without becoming a logo wall or badge
cloud.

### Contact Methods

Email, phone, and LinkedIn share one bordered contact group with three equal desktop actions. On mobile, the actions
stack with internal hairlines and preserve direct `mailto:` and `tel:` behavior.

### Constellation Layer

Sparse three-pixel nodes and one-pixel joining lines sit behind content with low opacity. The layer never captures
input, never competes with reading, and becomes quieter at smaller breakpoints.

## Do's and Don'ts

### Do:

-   **Do** lead sections with factual work, roles, screenshots, or decisions.
-   **Do** keep body copy left-aligned and within a readable measure.
-   **Do** preserve the single Warm White → Cool Steel → Slate Metadata hierarchy.
-   **Do** use Violet Status only for identity, focus, navigation, or state.
-   **Do** keep content mounted and useful before below-fold images finish loading.
-   **Do** preserve semantic headings, landmarks, lists, image alternatives, and reduced-motion behavior.

### Don't:

-   **Don't** bring back centered oversized headings, justified paragraphs, logo clouds, or floating white cards.
-   **Don't** use fixed content heights, translated layout offsets, or minimum widths that can overflow the viewport.
-   **Don't** add gradients, glass, glow, or monospace styling as shorthand for technology.
-   **Don't** animate every section; the post-landing entrance is the single authored reveal.
-   **Don't** fabricate metrics, testimonials, contact details, or project outcomes.
