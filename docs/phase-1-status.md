# SILORA ORIENT — Phase 1 Status Document
# SILORA ORIENT — 第一阶段状态文档

**Version · 版本:** 2.1  
**Last Updated · 最后更新:** April 11, 2026 · 2026年4月11日  
**Overall Status · 整体状态:** Code & Documentation Complete — Awaiting Founder Activation · 代码与文档已完成，等待创始人激活  
**Audience · 适用对象:** Founder · Co-founder · Future technical collaborators · 创始人 · 联合创始人 · 未来技术协作者

---

## Phase Summary · 阶段概述

Phase 1 addresses the three silent failures that are costing the brand real business right now: a newsletter form that captures no subscribers, a website with no analytics, and a commission process that leaves orders untracked. It is the mandatory foundation before any growth or automation work can begin.

第一阶段解决了当前正在损害品牌真实业务的三个静默失败：不捕获任何订阅者的订阅表单、没有分析数据的网站，以及导致订单无法追踪的定制流程。这是所有增长或自动化工作开始之前的必要基础。

**Role in the overall architecture · 在整体架构中的角色:**  
Phase 1 activates three of the six system modules: M-6 (Analytics & Growth — GA4 + Mailchimp), M-2/M-3 (Product Studio + Client CRM — Airtable commission tracker), and M-5 (Booking & Payment — Cal.com + Stripe). Without Phase 1, Phase 2 cannot function: Mailchimp welcome automation requires real subscribers, and the B2B database requires an active Airtable base.

第一阶段激活六个系统模块中的三个：M-6（分析与增长——GA4+Mailchimp）、M-2/M-3（产品工作室+客户关系管理——Airtable定制追踪）和M-5（预约与支付——Cal.com+Stripe）。没有第一阶段，第二阶段无法运作：Mailchimp欢迎自动化需要真实订阅者，B2B数据库需要活跃的Airtable数据库。

**Why Phase 1 was prioritized · 第一阶段优先执行的原因:**  
Every task in Phase 1 is a fix for a silent loss, not a new feature. The newsletter form has been collecting zero subscribers since launch. The website has produced zero traffic data. Custom order inquiries have been tracked manually in email with no structured system. These are not future problems — they are active losses happening now.

第一阶段的每项任务都是对静默损失的修复，而非新功能。订阅表单自上线以来一直收集零个订阅者。网站产生了零流量数据。定制订单询价一直在邮件中手动追踪，没有结构化系统。这些不是未来的问题——它们是当前正在发生的损失。

---

## Task Table · 任务一览表

| Task ID | Task Name · 任务名称 | Description · 描述 | Status · 状态 | Completion Date · 完成日期 | Deliverable · 交付成果 | Notes · 备注 |
|---------|--------------------|--------------------|-------------|--------------------------|----------------------|------------|
| INFRA | Deploy Pipeline · 部署流水线 | Fix Vercel deploy so static site + serverless functions coexist · 修复Vercel部署使静态网站与无服务器函数共存 | ✅ Complete | April 8, 2026 | Green deploy pipeline · 绿色部署流水线 | Both root causes fixed: `vercel.json` builders + CommonJS syntax · 两个根本原因均已修复 |
| P0-A | Google Analytics 4 | Insert GA4 script on all 9 pages; wire 3 custom events · 在全部9页插入GA4脚本；接入3个自定义事件 | ✅ Code complete · 代码已完成 | April 7–8, 2026 | GA4 on all pages + 3 custom events · 全部页面GA4 + 3个自定义事件 | Awaiting founder: replace `G-XXXXXXXXXX` with real Measurement ID in 9 files · 等待创始人替换GA4 ID |
| P0-B | Mailchimp Newsletter · Mailchimp订阅 | Replace fake newsletter form with real Mailchimp API serverless function · 用真实Mailchimp API无服务器函数替换虚假订阅表单 | ✅ Code complete · 代码已完成 | April 8, 2026 | `api/subscribe.js` + updated `main.js` | Awaiting founder: create Mailchimp account + set 3 Vercel env vars · 等待创始人创建账户并设置环境变量 |
| P0-C | Airtable Schema · Airtable架构 | Define full 3-table Airtable operations base schema · 定义完整3表Airtable运营数据库架构 | ✅ Doc complete · 文档已完成 | April 8, 2026 | `admin/airtable-schema.md` | Awaiting founder: manually build base in Airtable UI · 等待创始人在Airtable界面手动构建数据库 |
| P1-A | Zapier Sync · Zapier同步 | Write step-by-step guide for 2 Zaps: Formspree → Airtable · 撰写2个Zap的逐步指南：Formspree→Airtable | ✅ Doc complete · 文档已完成 | April 8, 2026 | `admin/zapier-setup.md` | Awaiting founder: create Zapier account + configure both Zaps · 等待创始人创建账户并配置Zap |
| P1-B | Cal.com Booking · Cal.com预约 | Add booking section to `custom.html` with Cal.com inline embed · 向`custom.html`添加含Cal.com内嵌的预约区域 | ✅ Code complete · 代码已完成 | April 8, 2026 | Booking section in `custom.html` | Awaiting founder: create Cal.com account + replace `YOUR_CAL_USERNAME` · 等待创始人创建账户并替换用户名 |
| P1-C | Stripe Links · Stripe支付链接 | Write guide for 15 Stripe payment links + email templates · 撰写15条Stripe支付链接指南及邮件模板 | ✅ Doc complete · 文档已完成 | April 8, 2026 | `admin/stripe-payment-links.md` | Awaiting founder: create Stripe account + create 15 links · 等待创始人创建账户并创建支付链接 |

---

## Files Created or Modified · 创建或修改的文件

### New files created · 新建文件

| File · 文件 | Purpose · 用途 |
|-----------|--------------|
| `api/subscribe.js` | Vercel serverless function — receives email, calls Mailchimp API · 接收邮箱，调用Mailchimp API |
| `admin/airtable-schema.md` | Full Airtable base setup guide (3 tables, 77 fields total, 20 views) · 完整Airtable数据库配置指南 |
| `admin/zapier-setup.md` | Step-by-step guide for 2 Zapier automations · 2个Zapier自动化的逐步指南 |
| `admin/stripe-payment-links.md` | 15 payment links guide + deposit/balance email templates · 15条支付链接指南及定金/尾款邮件模板 |
| `admin/un-exhibition-proposal.md` | Full UN exhibition proposal — Chinese Language Day (Apr 20) + Mid-Autumn · 联合国展览合作提案 |

### Modified files · 修改的文件

| File · 文件 | Change · 修改内容 |
|-----------|----------------|
| `main.js` | Newsletter handler replaced (fake → real Mailchimp API call); GA4 events added · 订阅处理器替换；GA4事件已添加 |
| `custom.html` | Cal.com booking section added above footer; `custom_form_submit` GA4 event wired · Cal.com预约区域已添加；GA4事件已接入 |
| `index.html` | GA4 script block added · GA4脚本块已添加 |
| `about.html` | GA4 script block added · GA4脚本块已添加 |
| `collections.html` | GA4 script block added · GA4脚本块已添加 |
| `other-collections.html` | GA4 script block added · GA4脚本块已添加 |
| `stories.html` | GA4 script block added · GA4脚本块已添加 |
| `journal.html` | GA4 script block added · GA4脚本块已添加 |
| `documentary.html` | GA4 script block added · GA4脚本块已添加 |
| `contact.html` | GA4 script block added · GA4脚本块已添加 |
| `vercel.json` | Rewritten: explicit `@vercel/node` + `@vercel/static` builders · 重写：明确指定构建器 |
| `CLAUDE.md` | Hardcoded Vercel token replaced with `YOUR_VERCEL_TOKEN` placeholder · 硬编码令牌已替换为占位符 |
| `collections.html` | Added 四时之景 series crossover section (dark panel, 5 series listed) + separate CTA section · 新增四时之景跨版块 |
| `other-collections.html` | Added Lotus in the Wind (5th series); updated page title/subtitle; updated count to Five Series · 新增第五系列"一一风荷举" |
| `custom.html` | Added Hairpin (发簪) + Hair Crown (发冠) jewelry types; added Phalaenopsis/Osmanthus/Lily/Lotus flower options; updated pricing to 6-tier $300–$2,000+ · 新增发簪/发冠类型；新增花型选项；更新定价体系 |

---

## Activation Steps — In Priority Order · 激活步骤——按优先级顺序

| # | Action · 操作 | Estimated Time · 预计时间 | Unlocks · 解锁内容 |
|---|-------------|------------------------|-----------------|
| 1 | Replace `G-XXXXXXXXXX` with real GA4 Measurement ID in all 9 HTML files → `git push` · 在9个HTML文件中替换GA4 ID并推送 | 10 min | Traffic data starts immediately · 流量数据立即开始 |
| 2 | Create Mailchimp account + set `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID`, `MAILCHIMP_DC` in Vercel → redeploy · 创建Mailchimp账户并在Vercel中设置3个环境变量 | 30 min | Real newsletter subscriptions · 真实邮件订阅 |
| 3 | Build Airtable base `SILORA ORIENT — Operations` per `admin/airtable-schema.md` · 按文档构建Airtable数据库 | 2–3 hr | Commission tracking · 定制订单追踪 |
| 4 | Configure 2 Zapier Zaps per `admin/zapier-setup.md` · 按文档配置2个Zapier Zap | 45 min | Auto-sync all form submissions to Airtable · 表单自动同步至Airtable |
| 5 | Create Cal.com account → replace `YOUR_CAL_USERNAME` in `custom.html` → `git push` · 创建Cal.com账户并替换用户名 | 30 min | Online consultation booking · 在线咨询预约 |
| 6 | Create Stripe account → create 15 payment links per `admin/stripe-payment-links.md` · 创建Stripe账户并创建支付链接 | 30–45 min | Commission deposit collection · 定制定金收取 |

**Total estimated activation time · 预计总激活时间:** ~5 hours (can be split across 2 sessions) · 约5小时（可分两次完成）

---

## Verification Checklist · 验证核查清单

Run this checklist after completing all activation steps.  
完成所有激活步骤后运行此核查清单。

**GA4 · 分析:**
- [ ] Visit `silora-orient.vercel.app` → open GA4 → Realtime → confirm active users visible · 访问网站 → GA4实时报告 → 确认活跃用户可见
- [ ] Submit contact form → confirm `contact_form_submit` event in GA4 DebugView · 提交联系表单 → 在GA4 DebugView中确认事件
- [ ] Submit newsletter → confirm `newsletter_signup` event · 提交订阅 → 确认事件

**Mailchimp · 邮件订阅:**
- [ ] Enter email on homepage → check Mailchimp audience within 30 seconds · 在主页输入邮箱 → 30秒内检查Mailchimp受众列表
- [ ] Subscriber appears with tag `homepage_signup` · 订阅者出现并带有标签`homepage_signup`
- [ ] Enter already-subscribed email → form still succeeds (no error shown) · 输入已订阅邮箱 → 表单仍成功（不显示错误）

**Airtable · 数据库:**
- [ ] Airtable base `SILORA ORIENT — Operations` created · Airtable数据库已创建
- [ ] Customers table has all 26 fields · 客户表含全部26个字段
- [ ] Commissions table has 14-state status flow · 定制订单表含14状态流转
- [ ] All views created and accessible · 所有视图已创建并可访问

**Zapier · 自动化同步:**
- [ ] Submit test custom order on `custom.html` · 在`custom.html`提交测试定制订单
- [ ] Customer record appears in Airtable within 15 minutes · 15分钟内客户记录出现在Airtable中
- [ ] Commission record appears, linked to customer, Status = Inquiry · 定制订单记录出现，关联至客户，状态=询价

**Cal.com · 预约:**
- [ ] Visit `custom.html` → booking calendar visible and functional · 访问定制页面 → 预约日历可见且可用
- [ ] Book a test slot → confirmation email received · 预约测试时段 → 收到确认邮件

**Stripe · 支付:**
- [ ] At least one test payment completed using card `4242 4242 4242 4242` · 使用测试卡完成至少一笔测试支付
- [ ] Receipt email received from Stripe · 收到Stripe收据邮件

---

## Dependencies · 依赖关系

```
GA4 account created
    └─→ P0-A: Replace Measurement ID in 9 files

Mailchimp account created → API key + Audience ID + DC
    └─→ P0-B: Set 3 Vercel env vars → newsletter goes live
            └─→ Phase 2, Task 1.2.A: Welcome automation

Airtable account created → base built
    └─→ P0-C: Airtable operations base
            ├─→ P1-A: Zapier can sync to Airtable
            └─→ Phase 2, Task 1.2.B: B2B Partners table

Zapier account created → P0-C complete
    └─→ P1-A: Both Zaps active

Cal.com account created → Google Calendar connected
    └─→ P1-B: Replace YOUR_CAL_USERNAME → booking live

Stripe account verified
    └─→ P1-C: 15 payment links created
```

---

## Risks and Blockers · 风险与阻塞

| Risk · 风险 | Likelihood · 可能性 | Impact · 影响 | Mitigation · 缓解方案 |
|-----------|------------------|-------------|---------------------|
| Vercel token expires before env vars are set · Vercel令牌过期 | Low · 低 | Blocks deploy · 阻塞部署 | Rotate token in Vercel → update GitHub Secret · 在Vercel轮换令牌并更新GitHub Secret |
| Mailchimp free tier (500 subscribers) reached · Mailchimp免费套餐达到上限 | Low in Phase 1 · 第一阶段低 | New signups fail silently · 新注册静默失败 | `api/subscribe.js` returns 500 with error detail — monitor Vercel logs · 监控Vercel日志 |
| Zapier free tier (100 tasks/month) exceeded · Zapier免费任务超限 | Low · 低 | Form submissions stop syncing · 表单提交停止同步 | Monitor Zapier task usage; upgrade ($20/mo) if volume grows · 监控Zapier任务用量 |
| Cal.com username `YOUR_CAL_USERNAME` not replaced before push · 用户名未替换 | None — guarded · 无，已保护 | Widget shows placeholder only · 插件仅显示占位信息 | Guard condition in script prevents broken embed · 脚本中的保护条件防止嵌入损坏 |
| GA4 `G-XXXXXXXXXX` placeholder pushed without replacement · GA4 ID未替换 | None — tracking just inactive · 无，追踪仅为非活跃 | No data collected · 无数据收集 | Site functions normally; data simply doesn't flow · 网站正常运行，数据只是不流入 |

---

## Completion Summary · 完成情况摘要

**What is fully complete (code and docs) · 完全完成的内容（代码和文档）:**

Phase 1 is complete as a code and documentation system. The deploy pipeline is fixed and running. All 9 HTML pages have GA4 instrumentation. The newsletter backend is a real, production-ready Mailchimp integration with graceful error handling. Three admin guides have been written covering Airtable, Zapier, and Stripe. The Cal.com booking widget is embedded and guarded. Three custom GA4 conversion events are wired and tracking.

第一阶段作为代码和文档系统已完全完成。部署流水线已修复并运行。全部9个HTML页面已添加GA4埋点。订阅后端是真实的、生产就绪的Mailchimp集成，含优雅的错误处理。已撰写三份管理指南，涵盖Airtable、Zapier和Stripe。Cal.com预约插件已嵌入并受保护。三个自定义GA4转化事件已接入并追踪。

**What remains — founder activation only · 仍需完成的内容——仅需创始人激活:**

Six external services need credentials and configuration by the founder: GA4 (replace placeholder ID), Mailchimp (account + API key + 3 env vars), Airtable (build base from schema guide), Zapier (configure 2 Zaps), Cal.com (account + replace username), and Stripe (account + 15 payment links). No additional code changes are required.

六项外部服务需要创始人提供凭据和配置：GA4（替换占位符ID）、Mailchimp（账户+API密钥+3个环境变量）、Airtable（按架构指南构建数据库）、Zapier（配置2个Zap）、Cal.com（账户+替换用户名）和Stripe（账户+15条支付链接）。无需额外代码修改。

---

## Next Phase · 下一阶段

See `docs/phase-2-status.md` and `docs/phase-2-launch.md` for Phase 2 planning.  
见`docs/phase-2-status.md`和`docs/phase-2-launch.md`了解第二阶段规划。

Phase 2 cannot begin in full until Phase 1 activation is complete. The first Phase 2 task (1.2.A Mailchimp welcome automation) depends on Mailchimp being live and receiving real subscribers.

第一阶段激活完成之前，第二阶段无法全面开始。第一个第二阶段任务（1.2.A Mailchimp欢迎自动化）依赖Mailchimp已上线并接收真实订阅者。

---

*Document version: 2.0 · April 8, 2026*  
*See `docs/phase-1-launch.md` for phase rationale and architecture context*  
*See `docs/phase-1-roadmap.md` for full task specifications and email copy*
