# SILORA ORIENT — Phase 2 Launch Note
# SILORA ORIENT — 第二阶段启动说明

**Version · 版本:** 1.0  
**Date · 日期:** April 2026 · 2026年4月  
**Audience · 适用对象:** Founder · Co-founder · Future technical collaborators · 创始人 · 联合创始人 · 未来技术协作者

---

## Phase Objective · 阶段目标

Convert Phase 1 infrastructure into operating rhythm. Phase 1 put the pipes in place — analytics, subscriptions, commission tracking, booking, payment. Phase 2 turns those pipes on. It establishes the repeatable, low-maintenance processes that let the brand run systematically: a welcome sequence that delivers brand narrative to every new subscriber without any founder action, a B2B pipeline that turns research into structured relationships, and a data review cycle that makes traffic numbers meaningful. When Phase 2 is complete, the brand can operate for 30 days without any configuration work.

将第一阶段基础设施转化为运营节奏。第一阶段建立了管道——分析、订阅、定制追踪、预约、支付。第二阶段将这些管道开启。它建立了可重复的、低维护的流程，让品牌系统化运营：无需创始人操作即可向每位新订阅者传递品牌叙事的欢迎序列、将调研转化为结构化关系的B2B管道，以及使流量数字具有意义的数据审查周期。第二阶段完成后，品牌无需任何配置工作即可运营30天。

---

## Why This Phase Exists · 此阶段存在的原因

Phase 1 infrastructure is inert without Phase 2. Specifically:

没有第二阶段，第一阶段基础设施是惰性的。具体来说：

**Without 1.2.A (welcome automation) · 没有1.2.A（欢迎自动化）:**  
Every new Mailchimp subscriber receives nothing. The brand spends effort and infrastructure on capturing emails, then delivers no experience to the people who opted in. The subscription becomes meaningless — a data point rather than the beginning of a relationship.

每位新Mailchimp订阅者什么都收不到。品牌在捕获邮箱上花费精力和基础设施，然后对那些选择加入的人不提供任何体验。订阅变得毫无意义——一个数据点，而非关系的开始。

**Without 1.2.B (B2B database) · 没有1.2.B（B2B数据库）:**  
The B2B outreach that Phase 1 enables — a systematic, tracked, follow-up-dated pipeline — never begins. Potential wholesale and consignment partners remain unknown and uncontacted. The Airtable B2B Partners table exists in the schema but holds no data.

第一阶段所能实现的B2B外联——系统化的、有追踪、有跟进日期的管道——从未开始。潜在的批发和寄售合作伙伴仍然未知且未被联系。Airtable B2B合作方表在架构中存在但没有数据。

**Without the analytics review · 没有分析审查:**  
GA4 collects data that is never read. Traffic numbers accumulate without informing any decision. The conversion events — `newsletter_signup`, `custom_form_submit` — fire without anyone checking whether they represent a healthy rate.

GA4收集从未被阅读的数据。流量数字积累但不为任何决策提供信息。转化事件——`newsletter_signup`、`custom_form_submit`——触发但没有人检查它们是否代表健康的比率。

---

## What Systems and Modules This Phase Supports · 本阶段支持的系统与模块

Phase 2 deepens three modules already partially active and fully activates one new module:

第二阶段深化三个已部分激活的模块，并完全激活一个新模块：

| Module · 模块 | Phase 1 state · 第一阶段状态 | Phase 2 addition · 第二阶段新增 |
|-------------|--------------------------|-------------------------------|
| M-6 Growth & Analytics · 增长与分析 | GA4 installed; Mailchimp connected | Welcome automation (1.2.A); first data review cycle (2.2.A); quarterly issue dry run (2.2.B) · 欢迎自动化；首次数据审查周期；季刊演练 |
| M-4 B2B & Outreach · B2B与外联 | Table schema defined, empty | First 50 records entered (1.2.B); first outreach batch sent (2.1.C) · 录入前50条记录；发送首批外联邮件 |
| M-5 Booking & Payment · 预约与支付 | Consultation booking on custom.html | Workshop public page with separate Cal.com event types (2.1.A) · 含独立Cal.com活动类型的工作坊公开页面 |
| M-3 Client CRM · 客户关系管理 | Commission tracking live | Story intake process — consent-tracked story collection after delivery (2.1.B) · 故事采集流程——交付后带授权追踪的故事采集 |

Module M-1 (Brand CMS) and the full M-6 editorial pipeline are not activated until Phase 3, when volume justifies a more structured content workflow.

模块M-1（品牌内容管理系统）和完整的M-6编辑管道要到第三阶段才会激活，届时体量才能证明更结构化的内容工作流的必要性。

---

## How Phase 2 Connects to Other Phases · 第二阶段与其他阶段的关联

**Relationship to Phase 1 · 与第一阶段的关系:**

Phase 2 is entirely dependent on Phase 1 activation. Every Phase 2 task has at least one Phase 1 prerequisite:

第二阶段完全依赖于第一阶段激活。每个第二阶段任务至少有一个第一阶段前提条件：

| Phase 2 task · 第二阶段任务 | Required Phase 1 activation · 所需第一阶段激活 |
|--------------------------|----------------------------------------------|
| 1.2.A Welcome automation | P0-B: Mailchimp connected and env vars set · P0-B：Mailchimp已连接且环境变量已设置 |
| 1.2.B B2B database | P0-C: Airtable base live with B2B Partners table · P0-C：含B2B合作方表的Airtable数据库已上线 |
| 2.1.A Workshops page | P1-B: Cal.com active with real username · P1-B：Cal.com已使用真实用户名激活 |
| 2.1.B Story intake | P0-C: Airtable Commissions table with at least 1 delivered commission · P0-C：Airtable定制订单表含至少1件已交付定制 |
| 2.1.C First outreach | 1.2.B: 50 B2B records in Airtable · 1.2.B：Airtable中50条B2B记录 |
| 2.2.A Analytics review | P0-A: GA4 with real Measurement ID, live 2–4 weeks · P0-A：使用真实测量ID的GA4，上线2–4周 |
| 2.2.B Quarterly issue | 1.2.A: Welcome automation live + 50+ real subscribers · 1.2.A：欢迎自动化已上线+50+位真实订阅者 |

**Relationship to Phase 3 · 与第三阶段的关系:**

Phase 2 creates the operating data and relationships that Phase 3 will systematize:

第二阶段创建第三阶段将系统化的运营数据和关系：

- The subscriber list and open rate data from Phase 2 inform whether a custom email tool or Mailchimp upgrade is needed in Phase 3  
  第二阶段的订阅者列表和打开率数据为第三阶段是否需要自定义邮件工具或Mailchimp升级提供依据
- The B2B relationships started in Phase 2 become the first wholesale accounts tracked in the Phase 3 admin dashboard  
  第二阶段开始的B2B关系成为第三阶段管理后台追踪的首批批发账户
- Customer stories collected in Phase 2 populate the first content pipeline that Phase 3's CMS will manage  
  第二阶段采集的客户故事填充第三阶段内容管理系统将管理的首个内容管道
- GA4 data reviewed in Phase 2 informs the analytics dashboard design in Phase 3  
  第二阶段审查的GA4数据为第三阶段分析仪表板设计提供依据

---

## What Will Be Done in This Phase · 本阶段将完成的内容

### Task 1.2.A — Mailchimp Welcome Automation · 欢迎自动化序列

**Configuration approach · 配置方式:**  
Mailchimp Customer Journeys (native automation tool, free tier). Trigger: subscribes to audience with tag `homepage_signup`. Three email actions with delays: 0 / 3 days / 7 days.

Mailchimp客户旅程（原生自动化工具，免费套餐）。触发器：带`homepage_signup`标签的受众订阅。三个邮件操作，延迟：0/3天/7天。

**Brand voice principles applied · 应用的品牌语气原则:**

- Quiet and specific — no hype, no urgency, no "limited offer"  
  安静而具体——无夸大宣传、无紧迫感、无"限时优惠"
- Story-first — brand facts emerge from narrative, not from description  
  故事优先——品牌事实从叙事中浮现，而非从描述中
- Bilingual-capable — sequence is written in English first; Chinese can be layered in as subscriber base grows  
  双语能力——序列首先以英文撰写；随着订阅者群体增长可叠加中文
- The commission invitation (Email 3) is offered, not pushed — the closing paragraph explicitly acknowledges that a commission may not be right for everyone right now  
  定制委托邀请（邮件3）是提供而非推送——结尾段落明确承认定制目前可能不适合每个人

**Three-email arc · 三封邮件叙事弧线:**

```
Email 1 (immediate):  Who we are — the workshop, the craft, the origin
                      我们是谁——工作室、工艺、起源

Email 2 (day 3):      What we make — the Eye Color Collection and the story behind it
                      我们制作什么——眼色系列及其背后的故事

Email 3 (day 7):      What we could make for you — the custom commission invitation
                      我们能为你制作什么——定制委托邀请
```

Full email copy, A/B test variants, setup steps, success metrics, ongoing operations guide, and troubleshooting reference are all in `admin/mailchimp-welcome.md`.

完整邮件文案、A/B测试变体、配置步骤、成功指标、持续运营指南和故障排查参考均在`admin/mailchimp-welcome.md`中。

---

### Task 1.2.B — B2B Partner Database · B2B合作方数据库

**Research approach · 调研方式:**  
Manual research using Google, Instagram, and physical scouting in relevant NYC neighborhoods (SoHo, Nolita, Lower East Side, Brooklyn). Each record requires at minimum: business name, website, direct email, category, and an honest assessment of aesthetic fit (Strong / Moderate / Unknown).

使用Google、Instagram和在相关纽约社区（SoHo、Nolita、下东区、布鲁克林）实地考察进行手动调研。每条记录至少需要：商业名称、网站、直接邮箱、分类，以及对审美契合度的诚实评估（强/中等/未知）。

**Why 50 as the starting number · 50作为起始数量的原因:**  
50 records gives enough pipeline to absorb a 20–30% response rate without the outreach feeling transactional or rushed. If 50 emails generate 10–15 replies, that is a strong first cohort for relationship-building. The number is not a target in itself — it is the minimum needed to make the outreach systematic rather than ad hoc.

50条记录提供足够的管道，以吸收20–30%的回复率，而不会让外联感觉交易性或仓促。如果50封邮件产生10–15个回复，那对于关系建立来说是强大的首批。这个数字本身不是目标——它是使外联系统化而非临时性所需的最低数量。

**Aesthetic fit as the primary filter · 审美契合度作为主要过滤器:**  
Not every NYC boutique is a fit. The Silora Orient aesthetic — handmade, Chinese craft heritage, quiet luxury, bilingual and bicultural — has a specific audience. Records with Strong aesthetic fit go to the top of the Outreach Queue. Records with Unknown fit can be researched further before outreach. Records with Weak fit are retained but deprioritized.

并非每家纽约精品店都合适。Silora Orient的美学——手工制作、中国工艺传承、安静的奢华、双语和双文化——有特定的受众。审美契合度强的记录排在外联队列的顶部。契合度未知的记录可以在外联前进一步调研。契合度弱的记录保留但优先级降低。

---

### Tasks 2.1.A through 2.2.B

These tasks follow the completion of 1.2.A and 1.2.B, and are planned but not yet in execution. Full specifications are in `docs/phase-2-status.md`.

这些任务在1.2.A和1.2.B完成后进行，目前已规划但尚未执行。完整规格在`docs/phase-2-status.md`中。

| Task · 任务 | When · 时间 | Key output · 关键产出 |
|-----------|-----------|---------------------|
| 2.1.A Workshops page | After Cal.com active | `workshops.html` with bookable events · 含可预约活动的工作坊页面 |
| 2.1.B Story intake | After first commission delivered | Written SOP + first story collected · 书面SOP+采集第一个故事 |
| 2.1.C First outreach | After 1.2.B complete | 15–20 emails sent, tracked in Airtable · 15–20封邮件已发送并在Airtable追踪 |
| 2.2.A Analytics review | Week 3+ of GA4 data | 1-page findings + 3 actions · 1页发现+3个行动 |
| 2.2.B Quarterly issue | After 1.2.A + 50 subscribers | Issue sent + metrics recorded · 期刊已发送+指标已记录 |

---

## Expected Output · 预期产出

When Phase 2 is complete, the brand will have moved from infrastructure to operation:

第二阶段完成后，品牌将从基础设施转向运营：

| Category · 类别 | Before Phase 2 · 第二阶段前 | After Phase 2 · 第二阶段后 |
|---------------|--------------------------|--------------------------|
| New subscriber experience · 新订阅者体验 | Nothing received · 什么都收不到 | 3 brand emails over 7 days · 7天内3封品牌邮件 |
| B2B relationships · B2B关系 | 0 contacts · 0个联系人 | 50+ researched targets, 15–20 contacted, replies tracked · 50+已调研目标，15–20已联系，回复已追踪 |
| Workshop availability · 工作坊可用性 | No public page · 无公开页面 | `workshops.html` with bookable slots · 含可预约时段的工作坊页面 |
| Customer story supply · 客户故事供应 | Ad hoc, untracked · 临时，无追踪 | Consent-tracked intake process, first story published · 带授权追踪的采集流程，第一个故事已发布 |
| Traffic data use · 流量数据使用 | Collected, unread · 已收集，未阅读 | First review done, 3 data-informed actions taken · 首次审查已完成，3个基于数据的行动已采取 |
| Email to full list · 向完整名单发送邮件 | Never attempted · 从未尝试 | Quarterly issue sent and measured · 季刊已发送并衡量 |

---

## Completion Criteria · 完成标准

Phase 2 is complete when all seven success metrics in `docs/phase-2-status.md` are met:

当`docs/phase-2-status.md`中的全部七个成功指标达成时，第二阶段完成：

1. Welcome Email 1 open rate >50% · 欢迎邮件1打开率>50%
2. Welcome Email 3 CTA click rate >5% of opens · 欢迎邮件3 CTA点击率>5%打开者
3. 50+ B2B records in Airtable with email and status · Airtable中50+条含邮箱和状态的B2B记录
4. 15–20 outreach emails sent and tracked · 15–20封外联邮件已发送并追踪
5. At least 1 bookable workshop event on `workshops.html` · `workshops.html`上至少1个可预约工作坊活动
6. At least 1 customer story collected with explicit consent · 至少1个客户故事已采集并获得明确授权
7. Quarterly issue sent with open rate and click rate recorded · 季刊已发送，打开率和点击率已记录

Phase 2 is not complete until the brand has also operated all Phase 1 systems for at least 2 weeks — meaning real data is flowing, not just infrastructure deployed.

第二阶段未完成，直到品牌还运营了所有第一阶段系统至少2周——意味着真实数据正在流入，而不仅仅是基础设施已部署。

---

## Handoff and Review Notes · 移交与审查说明

**For the founder executing Phase 2 · 对于执行第二阶段的创始人:**

Phase 2 tasks are founder-executed, not code changes. Tasks 1.2.A and 2.2.A–B are done through the Mailchimp UI. Task 1.2.B is manual research and data entry. Task 2.1.A requires adding one HTML file (the workshops page) and modifying the nav on all existing pages. Task 2.1.C is personal emails from the founder's inbox — not a mass email tool. Keep it personal.

第二阶段任务由创始人执行，而非代码变更。任务1.2.A和2.2.A–B通过Mailchimp界面完成。任务1.2.B是手动调研和数据录入。任务2.1.A需要添加一个HTML文件（工作坊页面）并修改所有现有页面的导航。任务2.1.C是从创始人收件箱发送的个人邮件——不使用群发邮件工具。保持个人化。

**For a future technical collaborator · 对于未来的技术协作者:**

Phase 2 introduces one new HTML page (`workshops.html`) and no new backend code. All new functionality in Phase 2 uses existing infrastructure: Mailchimp (already connected), Airtable (already structured), Cal.com (already embedded), and Stripe (payment links already created). If you are asked to make technical changes in Phase 2, the most common request will be: adding `workshops.html` with a Cal.com embed following the same pattern as the booking section in `custom.html`.

第二阶段引入一个新HTML页面（`workshops.html`），没有新的后端代码。第二阶段所有新功能使用现有基础设施：Mailchimp（已连接）、Airtable（已结构化）、Cal.com（已嵌入）和Stripe（支付链接已创建）。如果被要求在第二阶段进行技术变更，最常见的请求将是：按照`custom.html`中预约区域的相同模式，添加含Cal.com嵌入的`workshops.html`。

**Known constraints and decisions · 已知约束和决策:**

- The welcome automation is English-only in Phase 2. Chinese versions of the emails can be added when the subscriber base shows a meaningful proportion of Chinese-language preference. Do not add bilingual emails speculatively — the added complexity reduces deliverability testing clarity.  
  第二阶段欢迎自动化仅为英文。当订阅者群体显示出有意义的中文偏好比例时，可以添加中文版本。不要推测性地添加双语邮件——增加的复杂性会降低可送达性测试的清晰度
- B2B outreach emails are sent from the founder's personal email, not from a tool. This is deliberate — early B2B relationships are personal, not brand-automated. The Airtable tracking system handles the pipeline management.  
  B2B外联邮件从创始人个人邮箱发送，而非工具。这是刻意的——早期B2B关系是个人化的，而非品牌自动化的。Airtable追踪系统处理管道管理
- Story consent is tracked separately from general data consent. `story_consent_given` in Airtable is a separate field from `consent_given`. A customer can consent to data storage (via form submission) without consenting to story publication. Never publish a story without `story_consent_given = true` confirmed via email.  
  故事授权与一般数据授权分开追踪。Airtable中的`story_consent_given`是与`consent_given`分开的字段。客户可以同意数据存储（通过表单提交）而不同意故事发布。未经通过邮件确认的`story_consent_given = true`，切勿发布故事

---

## Phase 3 Preview · 第三阶段预览

Phase 3 begins when Phase 2 success metrics are met and the brand has operated the full system for at least 4 weeks. Phase 3 is a technical build phase — it requires a developer and introduces real infrastructure complexity for the first time.

当第二阶段成功指标达成且品牌已运营完整系统至少4周后，第三阶段开始。第三阶段是技术构建阶段——需要开发人员，并首次引入真正的基础设施复杂性。

| Phase 3 component · 第三阶段组件 | Rationale · 理由 |
|-------------------------------|----------------|
| Admin dashboard (Next.js / Tailwind / shadcn/ui) | SaaS tools become limiting when commission volume grows past ~20/month · SaaS工具在每月定制量超过约20件时变得有限 |
| Supabase migration (Airtable → PostgreSQL + RLS + Storage) | Airtable at $20/seat becomes expensive and lacks API flexibility · Airtable按席位收费，缺乏API灵活性 |
| Automated commission proposal PDF generator | Manual proposal creation becomes a bottleneck at scale · 手动提案创建在规模扩大时成为瓶颈 |
| Journal / content CMS | Git push for content updates requires founder technical comfort · 通过git push更新内容需要创始人具备技术能力 |
| B2B proposal PDF generator | B2B pipeline requires professional collateral · B2B管道需要专业宣传材料 |
| Workshop capacity management | Cal.com free tier has limited group booking and waitlist functionality · Cal.com免费套餐的团体预约和候补名单功能有限 |

---

*Document version: 1.0 · April 2026*  
*See `docs/phase-2-status.md` for current task status and activation checklists*  
*See `admin/mailchimp-welcome.md` for Task 1.2.A full email copy and Mailchimp setup guide*  
*See `docs/phase-1-launch.md` for Phase 1 rationale and technical decisions*
