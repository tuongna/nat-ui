# CLAUDE.md — nat-ui Project Guide

> **Purpose:** Authoritative context file for AI agents working on **nat-ui**.
> The symlinked `.agent/` directory is **shared** across multiple projects.
> Use persona **`nat-ui-dev`** (`.agent/personas/nat-ui-dev.md`) to resolve which skills and rules apply.

## ⚡ Active Persona: `nat-ui-dev`

```yaml
persona: nat-ui-dev
skills:
  - stencil-components       # StencilJS v4 decorators, lifecycle, JSX
  - web-components           # Shadow DOM, :host, ::part, slots
  - css-design-tokens        # --nat-* tokens, BEM, theming
  - a11y-wcag                # WCAG 2.1 accessibility
  - troubleshooting-patterns # Debugging methodology (adapt for Shadow DOM)
  - git-commit               # Conventional Commits
  - github-pr                # PR lifecycle
  - ci-cd                    # GitHub Actions (adapted for Stencil)
  - figma-node-explore       # Figma-to-code design extraction
  - design-system            # Token discipline (ignore Tailwind sections)
ignore_all_other_skills: true
ignore_rules:
  - workspace-context        # Describes Project K (Spring Boot + Vue 3) — WRONG
```

> [!CAUTION]
> `.agent/skills/` contains 26 skills shared across projects. **Only the 11 skills listed above apply to nat-ui.**
> All Java, Spring Boot, Vue, Tailwind, PostgreSQL, Docker, K8s, and Terraform skills are **irrelevant**.
> The rule `workspace-context.md` (`alwaysApply: true`) describes a completely different tech stack — **ignore it**.

---

## 1. Project Overview

**nat-ui** is a **framework-agnostic Web Component library** built with [StencilJS v4](https://stenciljs.com/).
Components compile to native Custom Elements and work in any framework (React, Vue, Angular, Svelte) or vanilla HTML.

| Attribute          | Value                                           |
|--------------------|------------------------------------------------|
| **Name**           | `nat-ui`                                        |
| **Version**        | `0.1.0`                                         |
| **License**        | MIT (LICENSE) / Apache-2.0 (package.json)       |
| **Namespace**      | `nat-ui`                                        |
| **Tag Prefix**     | `nat-`                                          |
| **Repository**     | `https://github.com/tuongna/nat-ui.git`         |
| **Package Entry**  | `dist/index.js` (ESM), `dist/index.cjs.js` (CJS) |

---

## 2. Tech Stack

| Layer         | Technology                                      |
|---------------|------------------------------------------------|
| **Compiler**  | StencilJS `^4.38.0`                            |
| **Language**  | TypeScript + JSX (`.tsx`)                       |
| **Styling**   | Vanilla CSS with CSS Custom Properties (`--nat-*`) |
| **Shadow DOM** | Enabled per component (`shadow: true`)         |
| **Testing**   | Stencil spec tests + Vitest/Storybook integration |
| **Docs**      | Auto-generated README + `docs/components.json`  |
| **CI/CD**     | GitHub Actions → GitHub Pages                   |
| **Formatting**| Prettier (printWidth 180, singleQuote, trailingComma all) |
| **Editor**    | EditorConfig (2-space indent, LF endings)       |

### What nat-ui Does NOT Use
- ❌ Vue, React, Angular — nat-ui **outputs** Web Components for these, but does not use them internally
- ❌ Tailwind CSS — styling is pure CSS with design tokens
- ❌ Java / Spring Boot — no backend
- ❌ PostgreSQL / Flyway — no database
- ❌ JPA / JdbcClient — no data access layer
- ❌ Pinia / Vue Router — no application state

---

## 3. Architecture

### Component Structure
```
src/components/nat-<name>/
├── nat-<name>.tsx        # Component class (Stencil @Component decorator)
├── nat-<name>.css        # Shadow DOM scoped styles
├── readme.md             # Auto-generated docs (DO NOT edit manually)
└── test/
    └── nat-<name>.spec.ts  # Unit tests
```

### Design Token System
All tokens live in `src/global/styles/globals.css` under `:root` with `--nat-*` prefix:
- **Colors**: `--nat-primary-{50..900}`, `--nat-success-*`, `--nat-warning-*`, `--nat-error-*`, `--nat-info-*`, `--nat-gray-{50..950}`
- **Semantic colors**: `--nat-bg-*`, `--nat-text-*`, `--nat-border-*`, `--nat-interactive-*`
- **Glassmorphism**: `--nat-glass-bg`, `--nat-glass-border`, `--nat-glass-blur`
- **Spacing**: `--nat-space-{0..32}` (rem-based scale)
- **Radius**: `--nat-radius-{none..full}`
- **Shadows**: `--nat-shadow-{xs..2xl}`, `--nat-shadow-inner`
- **Typography**: `--nat-text-{xs..7xl}`, `--nat-font-{thin..black}`, `--nat-leading-*`, `--nat-tracking-*`
- **Transitions**: `--nat-transition-{instant..slow}`, `--nat-ease-*`
- **Z-index**: `--nat-z-{base..notification}`
- **Sizes**: `--nat-size-{xs..xl}` (component sizing)
- **Breakpoints**: `--nat-breakpoint-{xs..2xl}`

### Themes
- **Default** (`:root`) — Light mode
- **Dark** (`@media (prefers-color-scheme: dark)`) — Auto dark mode
- **Mist** (`[data-theme='mist']`) — Glassmorphism theme with neumorphic shadows

### CSS Conventions
- **BEM naming**: `.nat-button`, `.nat-button--primary`, `.nat-button__spinner`
- **`:host`** for Custom Element display behavior
- **`:host([attr])`** for attribute-driven host styles
- **All tokens referenced via `var(--nat-*)`** — no hardcoded values in component CSS
- **Focus**: `:focus-visible` with `--nat-focus-ring`

### Output Targets
| Target                  | Purpose                                |
|-------------------------|----------------------------------------|
| `dist`                  | Lazy-loading distribution (npm)        |
| `dist-custom-elements`  | Standalone auto-defined elements       |
| `www`                   | Dev server / GitHub Pages demo         |
| `docs-readme`           | Per-component README generation        |
| `docs-json`             | Machine-readable component API docs    |

### Component Catalog (29 components)
`nat-alert`, `nat-avatar`, `nat-badge`, `nat-breadcrumb`, `nat-breadcrumb-item`,
`nat-button`, `nat-card`, `nat-checkbox`, `nat-checkbox-group`, `nat-divider`,
`nat-dropdown`, `nat-icon`, `nat-input`, `nat-list`, `nat-logo`, `nat-menu`,
`nat-modal`, `nat-pagination`, `nat-popover`, `nat-radio`, `nat-select`,
`nat-spinner`, `nat-stepper`, `nat-switch`, `nat-table`, `nat-tabs`,
`nat-textarea`, `nat-toast`, `nat-tooltip`

### Icon System
Pluggable icon library registry (`src/utils/icon-library.ts`):
- Default: **Lucide** (via CDN)
- Built-in libraries: Heroicons, Tabler, Bootstrap Icons
- Custom libraries via `registerIconLibrary(name, { resolver, mutator })`

---

## 4. Development Commands

```bash
npm start              # Dev server with hot reload (stencil build --dev --watch --serve)
npm run build          # Production build with docs
npm test               # Run spec tests
npm run test.watch     # Watch mode tests
npm run test.e2e       # E2E tests
npm run test.coverage  # Coverage report
npm run generate       # Scaffold new component (stencil generate)
```

---

## 5. Coding Conventions

### Component Authoring (TSX)
- **Decorator**: `@Component({ tag: 'nat-<name>', styleUrl: 'nat-<name>.css', shadow: true })`
- **Props**: `@Prop()` with JSDoc, explicit types, default values
- **Events**: `@Event() natEventName: EventEmitter<T>` — always prefixed `nat`
- **State**: `@State()` for internal reactive state
- **Methods**: `@Method()` for public API (use sparingly)
- **Slots**: Use `<slot />` and `<slot name="..." />` for composition
- **Accessibility**: Always include `aria-*` attributes, `role`, and keyboard handlers

### Naming
- Component tags: `nat-<name>` (lowercase kebab-case)
- Component classes: `PascalCase` (e.g., `NatButton`)
- CSS classes: BEM `.nat-<component>`, `.nat-<component>--<modifier>`, `.nat-<component>__<element>`
- Props: `camelCase` in TypeScript, reflected as `kebab-case` attributes
- Events: `natEventName` (camelCase, `nat` prefix)
- Design tokens: `--nat-<category>-<name>`

### Code Quality
- Prettier formatting enforced (see `.prettierrc.json`)
- EditorConfig for consistent whitespace
- No hardcoded color/spacing values — always use `var(--nat-*)`
- JSDoc on all `@Prop`, `@Event`, `@Method`
- Type exports via `src/components.d.ts` (auto-generated)

---

## 6. `.agent/` Resource Mapping

> The `.agent/` directory is symlinked from `D:\Proj\ai-agent\.agent` — originally
> built for **Project K** (Spring Boot + Vue 3 + PostgreSQL Kanban app).
> Most resources are **NOT applicable** to nat-ui without adaptation.

### ✅ Directly Applicable Resources

| Resource | Path | Why |
|----------|------|-----|
| `git-commit` skill | `.agent/skills/git-commit/` | Conventional Commits — universal |
| `github-pr` skill | `.agent/skills/github-pr/` | PR lifecycle — universal |
| `a11y-wcag` skill | `.agent/skills/a11y-wcag/` | WCAG compliance — applies to all UI |
| `ci-cd` skill | `.agent/skills/ci-cd/` | GitHub Actions concepts apply (adapt for Stencil) |
| `figma-node-explore` skill | `.agent/skills/figma-node-explore/` | Figma-to-code workflow — applicable for component design |

### ⚠️ Partially Applicable (need adaptation)

| Resource | Path | What Applies | What Doesn't |
|----------|------|-------------|--------------|
| `design-system` skill | `.agent/skills/design-system/` | Token discipline, a11y contrast | Tailwind v4-specific directives |
| `code-quality-standards` rule | `.agent/rules/code-quality-standards.md` | Naming, size limits, hygiene | Vue/Java-specific sections |

### ❌ NOT Applicable (ignore for nat-ui)

| Resource | Reason |
|----------|--------|
| `java-core`, `java-jdbc`, `java-springboot`, `java-spring-gcp` | No Java backend |
| `database-migration` | No database |
| `tailwind-v4` | nat-ui uses vanilla CSS |
| `vue-testing` | No Vue; Stencil has its own test setup |
| `websocket-sse` | No real-time; this is a UI component library |
| `error-handling` (Spring-focused) | Wrong framework |
| `logging-metrics` (SLF4J/Actuator) | Wrong framework |
| `security` (Spring Security/JWT) | Wrong framework |
| `docker` | Not needed for a JS component library |
| `kubernetes`, `terraform-cloud` | Not needed for npm package |
| `seo-meta` | Components don't manage SEO |
| `api-design` | No REST API |

### ❌ Rules to IGNORE

| Rule | Reason |
|------|--------|
| `workspace-context.md` | Describes Project K stack (Spring Boot, Vue 3, Tailwind v4) — completely wrong for nat-ui |
| `architectural-constraints.md` | Describes Controller→Service→Repository, JdbcClient, Pinia — none apply |
| `vue-template-safety.md` | nat-ui uses Stencil TSX, not Vue templates |
| `webgl-debug.md` | Not relevant to UI components |
| `ba-standards.md` | Business analysis for Project K |
| `project-audit-deploy.md` | Deployment rules for a different project |
| `pre-execution-checks.md` | May contain Project K-specific checks |

### ⚠️ Workflows — Mostly Applicable (general-purpose)

| Workflow | Applicability |
|----------|--------------|
| `task-execution.md` | ✅ General dev workflow |
| `code-review.md` | ✅ Universal |
| `refactor.md` | ✅ Universal |
| `maintenance-cycle.md` | ✅ Universal |
| `agent-audit.md` | ✅ Cross-model review |
| `high-reasoning-debug.md` | ✅ Debugging methodology |
| `retro.md` | ✅ Universal |
| `agent-git-workflow.md` | ⚠️ Review branching conventions for nat-ui |

### 📝 Memories / ADRs — NOT Applicable

All ADRs in `.agent/memories/` document Project K decisions (navigation context, drag-drop contract, AI error handling, tech stack). They do **not** apply to nat-ui.

---

## 7. Skills Needed for nat-ui (NOT in .agent)

The following skills should be created or sourced to properly support nat-ui development:

### Priority 1 — Essential
| Skill ID | Purpose |
|----------|---------|
| `stencil-components` | StencilJS component patterns: decorators (@Prop, @Event, @State, @Method, @Watch, @Listen), lifecycle hooks, Shadow DOM, slots, CSS encapsulation, JSX rendering |
| `web-components` | Custom Elements v1 spec, Shadow DOM, CSS Custom Properties, `:host`/`:slotted`/`::part`, attribute reflection, form association |
| `css-design-tokens` | CSS Custom Property naming, theming strategies, multi-theme support (light/dark/mist), token cascade through Shadow DOM |

### Priority 2 — Quality & Process
| Skill ID | Purpose |
|----------|---------|
| `stencil-testing` | Stencil `newSpecPage()`, `newE2EPage()`, event testing, prop mutation testing, Shadow DOM queries |
| `npm-publishing` | Package.json exports field, semver, prepublishOnly hooks, dist structure, changesets |
| `storybook-wc` | Storybook for Web Components, Vitest addon integration, visual testing |

### Priority 3 — DX & Ecosystem
| Skill ID | Purpose |
|----------|---------|
| `framework-wrappers` | Generating React/Vue/Angular wrappers from Stencil output, framework-specific event binding |
| `component-api-design` | Prop naming conventions, event contracts, slot patterns, progressive disclosure in component APIs |

---

## 8. Key Files Quick Reference

| File | Purpose |
|------|---------|
| `stencil.config.ts` | Build configuration, output targets, namespace |
| `src/global/styles/globals.css` | Design token system (ALL `--nat-*` variables) |
| `src/index.ts` | Public API entry point (exports utilities, NOT components) |
| `src/components.d.ts` | Auto-generated type definitions for all components |
| `src/utils/icon-library.ts` | Pluggable icon library system |
| `src/utils/icon-registry.ts` | Core icon registration logic |
| `docs/components.json` | Machine-readable component API docs |
| `package.json` | npm config, scripts, exports map |
| `.prettierrc.json` | Code formatting rules |
| `.editorconfig` | Editor whitespace rules |
| `.github/workflows/deploy.yml` | GitHub Pages deployment |

---

## 9. Critical Rules for AI Agents

1. **NEVER import frameworks** — nat-ui components must remain framework-agnostic
2. **ALWAYS use Shadow DOM** — set `shadow: true` in every `@Component` decorator
3. **ALWAYS use design tokens** — reference `var(--nat-*)` instead of hardcoded values
4. **ALWAYS prefix events with `nat`** — e.g., `natClick`, `natChange`, `natOpen`
5. **ALWAYS prefix tags with `nat-`** — e.g., `nat-button`, `nat-modal`
6. **NEVER edit `readme.md` in component dirs** — they are auto-generated by `docs-readme`
7. **NEVER edit `src/components.d.ts`** — auto-generated by Stencil compiler
8. **BEM CSS naming** — `.nat-<component>`, `.nat-<component>--<variant>`, `.nat-<component>__<child>`
9. **JSDoc every public API** — Props, Events, Methods, and Slots must have `/** */` documentation
10. **OS: Windows, PowerShell** — chain commands with `;` not `&&`
