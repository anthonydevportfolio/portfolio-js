# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are hiring managers, recruiters, and technical collaborators evaluating Anthony Griffin's
software-engineering experience, judgment, and personal work. They usually scan quickly on desktop or mobile and need
credible evidence before deciding to explore a project or continue the conversation.

## Product Purpose

This portfolio introduces Anthony Griffin, presents his professional experience and selected projects, and gives
interested visitors a clear path to inspect his work. Success means a visitor can quickly understand what Anthony
builds, see evidence of his capabilities, and take a meaningful next step.

## Positioning

The portfolio combines real employment history, working project links, and implementation-specific details in one
concise narrative. It must demonstrate engineering craft through the quality of the experience itself rather than
relying on generic claims.

## Operating Context

Visitors enter through an animated landing screen, then explore About, Experience, and Projects as a continuous page.
They may compare employment entries, inspect screenshots, and open deployed projects or Anthony's public GitHub profile.

## Capabilities and Constraints

-   The application is a React 18 and TypeScript single-page site built with Vite and deployed as a static site.
-   The constellation landing experience and its completed button transition remain part of the product.
-   The post-landing surface must work across desktop and mobile layouts.
-   Existing employment history, project names, project URLs, and technology information are factual source material and
    must remain accurate. `Anthony-Griffin-Resume-0826.pdf` is the approved source for current employment dates,
    responsibilities, and quantified impact.
-   A public email address, resume URL, and LinkedIn URL are not present in the repository. Future work must not invent
    them.

## Brand Commitments

-   The product represents Anthony Griffin by name.
-   The opening constellation field is a recognizable identity asset worth preserving across the experience.
-   The approved product impression is modern, elegant, calm, and technically credible.

## Evidence on Hand

-   Employment history and descriptions for Workday and Freddie Mac via Hexaware Technologies in
    `src/components/experience/data.ts`, sourced from `Anthony-Griffin-Resume-0826.pdf`.
-   Project screenshots, descriptions, technology stacks, and live URLs for Pokedle and pol.ai in
    `src/components/projects/projectsData.ts`.
-   Anthony's public GitHub organization/profile path is supported by the repository remote:
    `https://github.com/anthonydevportfolio`.
-   Technology references are available in `src/components/me/data.ts`.
-   The resume approves the quantitative impact metrics used in the experience ledger. The repository still contains no
    approved testimonials, public resume asset, direct contact address, or LinkedIn URL. These must not be fabricated.

## Product Principles

1. Lead with real work and evidence, not a technology inventory.
2. Make Anthony's role and engineering decisions easier to understand than employer or tool branding.
3. Keep navigation, reading, and interaction fast and accessible.
4. End every visitor journey with a clear, honest next step.
5. Preserve factual accuracy and label unresolved information instead of inventing it.

## Accessibility & Inclusion

The portfolio must support keyboard navigation, semantic headings and landmarks, visible focus states, meaningful image
alternatives, responsive touch targets, and reduced-motion preferences.
