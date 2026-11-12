# Graph Report - Makeindiafoundation  (2026-11-12)

## Corpus Check
- Corpus is ~28,499 words - fits in a single context window. You may not need a graph.

## Summary
- 259 nodes · 490 edges · 30 communities (12 shown, 18 thin omitted)
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 106 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Code Community 0
- Code Community 1
- Code Community 2
- Code Community 3
- Code Community 4
- Code Community 5
- Code Community 6
- Code Community 7
- Code Community 8
- Code Community 9
- Code Community 10
- Code Community 11
- Code Community 12
- Code Community 13

## God Nodes (most connected - your core abstractions)
1. `Icon()` - 85 edges
2. `cn()` - 20 edges
3. `ScienceHeroBackground()` - 10 edges
4. `CompetitionsPage()` - 10 edges
5. `GuidelinesPage()` - 10 edges
6. `Users()` - 8 edges
7. `MakersSpacePage()` - 8 edges
8. `Lightbulb()` - 7 edges
9. `Trophy()` - 7 edges
10. `WorkshopPage()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `GuidelinesPage()` --indirect_call--> `Users()`  [INFERRED]
  src/pages/GuidelinesPage.js → src/components/CommonUI.js
- `WorkshopPage()` --indirect_call--> `Bot()`  [INFERRED]
  src/pages/WorkshopPage.js → src/components/CommonUI.js
- `GuidelinesPage()` --indirect_call--> `BookOpen()`  [INFERRED]
  src/pages/GuidelinesPage.js → src/components/CommonUI.js
- `ScienceHeroBackground()` --indirect_call--> `Lightbulb()`  [INFERRED]
  src/components/ScienceHeroBackground.js → src/components/CommonUI.js
- `GuidelinesPage()` --indirect_call--> `Lightbulb()`  [INFERRED]
  src/pages/GuidelinesPage.js → src/components/CommonUI.js

## Import Cycles
- None detected.

## Communities (30 total, 18 thin omitted)

### Community 0 - "Code Community 0"
Cohesion: 0.09
Nodes (32): AlertTriangle(), ArrowRight(), Battery(), Building(), Calendar(), CheckCircle(), ChevronDown(), ChevronLeft() (+24 more)

### Community 1 - "Code Community 1"
Cohesion: 0.09
Nodes (24): Activity(), Atom(), Beaker(), Bot(), Brain(), Bug(), Calculator(), CheckCircle2() (+16 more)

### Community 2 - "Code Community 2"
Cohesion: 0.10
Nodes (24): BookOpen(), Clock(), FileText(), Heart(), HelpCircle(), Mail(), MapPin(), Phone() (+16 more)

### Community 3 - "Code Community 3"
Cohesion: 0.11
Nodes (21): dependencies, dotenv@^17.4.2, googleapis@^178.0.0, nodemailer@^10.0.3, devDependencies, nodemon@^3.1.14, tailwindcss@^3.4.17, name (+13 more)

### Community 4 - "Code Community 4"
Cohesion: 0.11
Nodes (16): Award(), Blocks(), CircuitBoard(), Compass(), Globe(), GraduationCap(), Lightbulb(), Medal() (+8 more)

### Community 5 - "Code Community 5"
Cohesion: 0.30
Nodes (17): append(), b64url(), body(), contact(), cors(), fetch(), field(), googleToken() (+9 more)

### Community 6 - "Code Community 6"
Cohesion: 0.23
Nodes (13): appendRegistration(), appendVolunteer(), escapeHtml(), getTransporter(), handleContact(), handleRegister(), handleSubscribe(), handleVolunteerRegister() (+5 more)

### Community 7 - "Code Community 7"
Cohesion: 0.12
Nodes (17): AccordionContent(), AccordionItem(), AccordionTrigger(), Badge(), Card(), CardContent(), CardDescription(), CardFooter() (+9 more)

### Community 8 - "Code Community 8"
Cohesion: 0.14
Nodes (16): Facebook(), Instagram(), Linkedin(), MessageCircle(), Twitter(), Youtube(), ContactItem(), Footer() (+8 more)

### Community 9 - "Code Community 9"
Cohesion: 0.40
Nodes (4): NavIcon(), Sparkles(), Star(), ArisePage()

### Community 10 - "Code Community 10"
Cohesion: 0.50
Nodes (4): Button(), Input(), RegistrationModal(), Textarea()

### Community 11 - "Code Community 11"
Cohesion: 0.67
Nodes (3): getRSSJson(), RSS_FEEDS, TrendingNews()

## Knowledge Gaps
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Icon()` connect `Code Community 0` to `Code Community 1`, `Code Community 2`, `Code Community 4`, `Code Community 7`, `Code Community 8`, `Code Community 9`, `Code Community 10`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `ScienceHeroBackground()` (e.g. with `Atom()` and `Cpu()`) actually correct?**
  _`ScienceHeroBackground()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Should `Code Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09176788124156546 - nodes in this community are weakly interconnected._
- **Why does `Mail()` connect `Code Community 2` to `Code Community 0`, `Code Community 8`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `CompetitionsPage()` (e.g. with `Award()` and `BookOpen()`) actually correct?**
  _`CompetitionsPage()` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Should `Code Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08505747126436781 - nodes in this community are weakly interconnected._
- **Why does `MapPin()` connect `Code Community 2` to `Code Community 0`, `Code Community 8`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._