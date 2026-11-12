# Graph Report - Makeindiafoundation  (2026-11-12)

## Corpus Check
- 42 files · ~29,257 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 4, .example 2, .css 2)

## Summary
- 282 nodes · 519 edges · 30 communities (11 shown, 19 thin omitted)
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3320cd0b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- build-assets.test.mjs
- server.mjs
- CompetitionsPage
- package.json
- src/pages/CompetitionCategoriesPage.js
- index.js
- src/components/CommonUI.js
- src/components/Footer.js
- src/components/TrendingNews.js
- src/context/RegistrationContext.js
- src/components/ScienceSimplified.js
- Navigation.js
- Cloudflare-only form API

## God Nodes (most connected - your core abstractions)
1. `Icon()` - 85 edges
2. `cn()` - 20 edges
3. `ScienceHeroBackground()` - 10 edges
4. `CompetitionsPage()` - 10 edges
5. `GuidelinesPage()` - 10 edges
6. `scripts` - 8 edges
7. `Users()` - 8 edges
8. `MakersSpacePage()` - 8 edges
9. `Lightbulb()` - 7 edges
10. `Trophy()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `GuidelinesPage()` --indirect_call--> `Microscope()`  [INFERRED]
  src/pages/GuidelinesPage.js → src/components/CommonUI.js
- `MakersSpacePage()` --indirect_call--> `Blocks()`  [INFERRED]
  src/pages/MakersSpacePage.js → src/components/CommonUI.js
- `WorkshopPage()` --indirect_call--> `Blocks()`  [INFERRED]
  src/pages/WorkshopPage.js → src/components/CommonUI.js
- `GuidelinesPage()` --indirect_call--> `Lightbulb()`  [INFERRED]
  src/pages/GuidelinesPage.js → src/components/CommonUI.js
- `CompetitionsPage()` --indirect_call--> `Award()`  [INFERRED]
  src/pages/CompetitionsPage.js → src/components/CommonUI.js

## Import Cycles
- None detected.

## Communities (30 total, 19 thin omitted)

### Community 0 - "build-assets.test.mjs"
Cohesion: 0.16
Nodes (9): assetExtensions, buildAssets(), frontendPaths, isFrontendAsset(), projectRoot, files(), fixture(), projectRoot (+1 more)

### Community 1 - "server.mjs"
Cohesion: 0.28
Nodes (13): appendRegistration(), appendVolunteer(), escapeHtml(), getTransporter(), handleContact(), handleRegister(), handleSubscribe(), handleVolunteerRegister() (+5 more)

### Community 2 - "CompetitionsPage"
Cohesion: 0.10
Nodes (23): Beaker(), BookOpen(), Calculator(), CheckCircle2(), Clock(), FileText(), ListChecks(), Mail() (+15 more)

### Community 3 - "package.json"
Cohesion: 0.10
Nodes (23): dependencies, dotenv@^17.4.2, googleapis@^178.0.0, nodemailer@^10.0.3, devDependencies, nodemon@^3.1.14, tailwindcss@^3.4.17, name (+15 more)

### Community 4 - "src/pages/CompetitionCategoriesPage.js"
Cohesion: 0.07
Nodes (31): Activity(), Atom(), Award(), Bot(), Brain(), Bug(), CircuitBoard(), Cpu() (+23 more)

### Community 5 - "index.js"
Cohesion: 0.30
Nodes (17): append(), b64url(), body(), contact(), cors(), fetch(), field(), googleToken() (+9 more)

### Community 7 - "src/components/CommonUI.js"
Cohesion: 0.06
Nodes (57): AccordionContent(), AccordionItem(), AccordionTrigger(), AlertTriangle(), ArrowRight(), Badge(), Battery(), Building() (+49 more)

### Community 8 - "src/components/Footer.js"
Cohesion: 0.14
Nodes (16): Facebook(), Instagram(), Linkedin(), MessageCircle(), Twitter(), Youtube(), ContactItem(), Footer() (+8 more)

### Community 11 - "src/components/TrendingNews.js"
Cohesion: 0.67
Nodes (3): getRSSJson(), RSS_FEEDS, TrendingNews()

### Community 165 - "Navigation.js"
Cohesion: 0.21
Nodes (10): Blocks(), Compass(), Heart(), HelpCircle(), Medal(), MobileMenu(), NAV_ITEMS, NavButton() (+2 more)

### Community 166 - "Cloudflare-only form API"
Cohesion: 0.40
Nodes (4): Cloudflare-only form API, Deploy the website, Required Cloudflare email setup, Required Worker variables and secrets

## Knowledge Gaps
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Icon()` connect `src/components/CommonUI.js` to `src/components/Footer.js`, `CompetitionsPage`, `src/pages/CompetitionCategoriesPage.js`, `Navigation.js`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `ScienceHeroBackground()` (e.g. with `Atom()` and `Cpu()`) actually correct?**
  _`ScienceHeroBackground()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Should `CompetitionsPage` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `Mail()` connect `CompetitionsPage` to `src/components/Footer.js`, `Navigation.js`, `src/components/CommonUI.js`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `CompetitionsPage()` (e.g. with `Award()` and `BookOpen()`) actually correct?**
  _`CompetitionsPage()` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10144927536231885 - nodes in this community are weakly interconnected._
- **Why does `MapPin()` connect `CompetitionsPage` to `src/components/Footer.js`, `src/components/CommonUI.js`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._