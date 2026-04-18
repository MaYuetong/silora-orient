# SILORA ORIENT — Phase 1 Implementation Roadmap
# SILORA ORIENT — 第一阶段实施路线图

**Version 文档版本:** 1.1  
**Date 日期:** April 2026 · 2026年4月  
**Status 状态:** P0 + P1 Complete · P0及P1已完成  
**Updated 更新日期:** April 8, 2026 · 2026年4月8日  
**Audience 阅读对象:** Founders · Co-founder · Future technical collaborators  
**阅读对象:** 创始人 · 联合创始人 · 未来技术协作者

---

> Phase 1 has one overriding goal: stop losing real business to the absence of infrastructure. Before any new feature is added, the three silent failures that exist today must be fixed — the fake newsletter form, the missing analytics, and the untracked commissions. Everything in this phase is additive and low-risk. Nothing in the current website is changed or removed.
>
> 第一阶段只有一个核心目标：停止因基础设施缺失而流失真实业务。在添加任何新功能之前，必须先修复当前存在的三个静默失败——虚假的订阅表单、缺失的分析数据，以及无追踪的定制订单。本阶段所有内容均为追加性质，风险极低。现有网站不做任何删改。

---

## Implementation Record · 实施记录

*This section records the actual completion status of all Phase 1 tasks, including exact dates, files created or modified, what each task enables, and what still requires founder action to activate.*

*本节记录所有第一阶段任务的实际完成状态，包括确切日期、创建或修改的文件、每项任务开启的功能，以及仍需创始人操作才能激活的内容。*

---

### Deploy Pipeline Fix · 部署流水线修复

**Completed · 完成日期:** April 8, 2026  
**Status · 状态:** ✅ Complete · 已完成

**What was fixed · 修复内容:**

Two root causes caused all Vercel deployments to fail after `api/subscribe.js` was added to the repository.

两个根本原因导致将 `api/subscribe.js` 添加到仓库后，所有 Vercel 部署均失败。

| Cause · 原因 | Fix · 修复方案 |
|------------|--------------|
| `vercel.json` used a single `@vercel/static` catch-all builder that treated `api/subscribe.js` as a static file, not a serverless function · `vercel.json`使用单一的`@vercel/static`通配构建器，将`api/subscribe.js`视为静态文件而非无服务器函数 | Rewrote `vercel.json` with explicit `@vercel/node` builder for `api/*.js` and `@vercel/static` for each static file pattern separately · 重写`vercel.json`，为`api/*.js`使用`@vercel/node`，为每种静态文件类型单独指定`@vercel/static` |
| `api/subscribe.js` used ES module `export default` syntax; Vercel's Node.js runtime defaults to CommonJS without `"type": "module"` in `package.json` · `api/subscribe.js`使用ES模块`export default`语法；Vercel的Node.js运行时默认使用CommonJS | Changed `export default async function handler` to `module.exports = async function handler` throughout the file · 将文件中的`export default async function handler`改为`module.exports = async function handler` |

**GitHub Secrets required · 所需GitHub Secrets:**

Four secrets were created in GitHub → Settings → Actions → Secrets for the deploy workflow to function:

在GitHub → 设置 → Actions → Secrets中创建了四个密钥，以使部署工作流正常运行：

| Secret Name · 密钥名称 | Value · 值 |
|----------------------|----------|
| `VERCEL_TOKEN` | Vercel personal access token (create at vercel.com/account/tokens) · Vercel个人访问令牌（在vercel.com/account/tokens创建） |
| `VERCEL_SCOPE` | `yuetongma0107-6224s-projects` |
| `VERCEL_ORG_ID` | `team_wvSHIRMeGmTf6MA6Lv4qoftJ` |
| `VERCEL_PROJECT_ID` | `prj_DN5UT9QgOIjH7iglkh8l7SunT3Mw` |

**Security note · 安全说明:** The Vercel token is stored only in GitHub Secrets — never in any file in the repository. The previous token was exposed in a commit and has been rotated. A new token must be created by the founder and stored in GitHub Secrets only.

Vercel令牌仅存储在GitHub Secrets中，从不存入仓库的任何文件。之前的令牌在某次提交中被暴露，已完成轮换。创始人必须创建新令牌，并仅存储在GitHub Secrets中。

**Files modified · 修改的文件:**
- `vercel.json` — rewritten with explicit builders · 重写，使用明确的构建器
- `api/subscribe.js` — changed from ES module to CommonJS syntax · 从ES模块语法改为CommonJS语法
- `CLAUDE.md` — hardcoded token replaced with `YOUR_VERCEL_TOKEN` placeholder · 硬编码令牌替换为`YOUR_VERCEL_TOKEN`占位符

---

### Task 1.0.A — Google Analytics 4 · GA4安装

**Completed · 完成日期:** April 7–8, 2026  
**Status · 状态:** ✅ Code complete; requires founder activation · 代码已完成；需创始人激活

**What was done · 已完成内容:**

The GA4 script block was inserted into the `<head>` of all 9 HTML pages, immediately after the stylesheet link and before any page-specific `<style>` blocks. Three custom conversion events were wired directly into the site's JavaScript.

GA4脚本块已插入全部9个HTML页面的 `<head>` 标签中，紧跟样式表链接之后、任何页面特定 `<style>` 块之前。三个自定义转化事件已直接接入网站的JavaScript代码。

**Script block added to all 9 pages · 已添加至全部9个页面的脚本块:**

```html
<!-- Google Analytics 4 — replace G-XXXXXXXXXX with real Measurement ID -->
<!-- Google Analytics 4 — 将G-XXXXXXXXXX替换为真实测量ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Files modified · 修改的文件:**
- `index.html` — GA4 block added · 已添加GA4代码块
- `about.html` — GA4 block added · 已添加GA4代码块
- `collections.html` — GA4 block added · 已添加GA4代码块
- `other-collections.html` — GA4 block added · 已添加GA4代码块
- `custom.html` — GA4 block added + `custom_form_submit` event wired into `submitForm()` · 已添加GA4代码块 + `custom_form_submit`事件已接入`submitForm()`
- `stories.html` — GA4 block added · 已添加GA4代码块
- `journal.html` — GA4 block added · 已添加GA4代码块
- `documentary.html` — GA4 block added · 已添加GA4代码块
- `contact.html` — GA4 block added · 已添加GA4代码块
- `main.js` — `newsletter_signup` and `contact_form_submit` GA4 events added · 已添加`newsletter_signup`和`contact_form_submit` GA4事件

**Custom events wired · 已接入的自定义事件:**

| Event Name · 事件名称 | Location · 位置 | Trigger · 触发条件 | Category · 分类 |
|----------------------|---------------|-------------------|----------------|
| `newsletter_signup` | `main.js` newsletter handler | Successful Mailchimp API response · 成功的Mailchimp API响应 | `engagement` |
| `custom_form_submit` | `custom.html` `submitForm()` | Successful Formspree submission · 成功的Formspree提交 | `conversion` |
| `contact_form_submit` | `main.js` contact form handler | Formspree form submit detected · 检测到Formspree表单提交 | `engagement` |

**Founder activation required · 需创始人激活:**

1. Go to analytics.google.com → Create a new GA4 property for `silora-orient.vercel.app`  
   进入analytics.google.com → 为`silora-orient.vercel.app`创建新GA4属性
2. Copy the Measurement ID (format: `G-XXXXXXXXXX`)  
   复制测量ID（格式：`G-XXXXXXXXXX`）
3. Open all 9 HTML files and replace every instance of `G-XXXXXXXXXX` with the real ID — there are 2 instances per file (18 total replacements)  
   打开全部9个HTML文件，将每处`G-XXXXXXXXXX`替换为真实ID——每文件2处，共18处替换

---

### Task 1.0.B — Mailchimp Newsletter Integration · Mailchimp订阅集成

**Completed · 完成日期:** April 8, 2026  
**Status · 状态:** ✅ Code complete; requires founder activation · 代码已完成；需创始人激活

**What was done · 已完成内容:**

The homepage newsletter form was previously a fake — it changed the button color and displayed "Thank you" but stored no subscriber data. This has been fully replaced with a real Mailchimp integration consisting of two parts: a Vercel serverless function (`api/subscribe.js`) that calls the Mailchimp API server-side (keeping the API key private), and an updated newsletter handler in `main.js` that calls this function with the submitted email.

主页订阅表单之前是虚假的——它仅改变按钮颜色并显示"谢谢"，但不储存任何订阅者数据。现已完全替换为真实的Mailchimp集成，包含两个部分：一个调用Mailchimp API（服务端调用，保持API密钥私密）的Vercel无服务器函数（`api/subscribe.js`）；以及`main.js`中更新的订阅处理器，用于将提交的邮箱发送给此函数。

**File created · 新建文件:** `api/subscribe.js`

```javascript
// Vercel serverless function — receives email, adds to Mailchimp audience
// Vercel无服务器函数——接收邮箱，添加至Mailchimp受众列表
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};
  if (!email || typeof email !== 'string' || !email.includes('@'))
    return res.status(400).json({ error: 'Invalid email address' });

  const API_KEY     = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const DC          = process.env.MAILCHIMP_DC;

  if (!API_KEY || !AUDIENCE_ID || !DC) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const url = `https://${DC}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
  const mcRes = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `apikey ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email_address: email.toLowerCase().trim(),
      status: 'subscribed',
      tags: ['homepage_signup'],
    }),
  });

  const result = await mcRes.json();
  if (mcRes.status === 200) return res.status(200).json({ success: true });
  if (mcRes.status === 400 && result.title === 'Member Exists')
    return res.status(200).json({ success: true, note: 'already_subscribed' });
  return res.status(500).json({ error: 'Subscription failed', detail: result.title });
};
```

**File modified · 修改的文件:** `main.js` — newsletter handler replaced with async fetch:

```javascript
// Replaces the previous fake button handler
// 替换之前的虚假按钮处理器
newsletterBtn.addEventListener('click', async function () {
  const email = input ? input.value.trim() : '';
  if (!email.includes('@')) { /* validation UI */ return; }
  newsletterBtn.textContent = '...';
  newsletterBtn.disabled = true;
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) {
      newsletterBtn.textContent = '✓ Thank you · 感谢订阅';
      newsletterBtn.style.background = '#A8B89C';
      if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', { event_category: 'engagement' });
      }
    } else { throw new Error('subscription failed'); }
  } catch {
    newsletterBtn.textContent = 'Try again · 请重试';
    newsletterBtn.disabled = false;
  }
});
```

**Subscriber tag · 订阅者标签:** All subscribers added through the homepage form receive the tag `homepage_signup` in Mailchimp, enabling segmentation by acquisition channel.

所有通过主页表单添加的订阅者将在Mailchimp中获得标签 `homepage_signup`，实现按获取渠道的细分管理。

**Founder activation required · 需创始人激活:**

1. Create Mailchimp account at mailchimp.com (free tier: up to 500 subscribers)  
   在mailchimp.com创建账户（免费套餐：最多500位订阅者）
2. Create audience named "Silora Orient — Main List"  
   创建名为"Silora Orient — Main List"的受众列表
3. Get API key: Account → Extras → API Keys → Create A Key  
   获取API密钥：账户 → 扩展 → API密钥 → 创建密钥
4. Get Audience ID: Audience → Settings → Audience name and defaults  
   获取受众ID：受众 → 设置 → 受众名称与默认值
5. Get datacenter prefix (DC): last segment of API key after final dash (e.g. `us21`)  
   获取数据中心前缀（DC）：API密钥最后一个破折号后的内容（例如`us21`）
6. In Vercel project settings → Environment Variables, add:  
   在Vercel项目设置 → 环境变量中添加：
   - `MAILCHIMP_API_KEY` = your API key
   - `MAILCHIMP_AUDIENCE_ID` = your Audience ID
   - `MAILCHIMP_DC` = your datacenter prefix (e.g. `us21`)
7. Redeploy (git push or manual deploy) after setting env vars  
   设置环境变量后重新部署（git push或手动部署）

---

### Task 1.0.C — Airtable Commission Tracker · Airtable定制订单追踪器

**Completed · 完成日期:** April 8, 2026  
**Status · 状态:** ✅ Schema document complete; requires founder to build in Airtable · 架构文档已完成；需创始人在Airtable中构建

**What was done · 已完成内容:**

A complete Airtable schema guide was written and saved as `admin/airtable-schema.md`. The document specifies every table, field, field type, status value set, and view for the Silora Orient operations base. This document is the single source of truth for the founder when building the Airtable base.

完整的Airtable架构指南已撰写并保存为 `admin/airtable-schema.md`。该文档详细说明了Silora Orient运营数据库的每个表格、字段、字段类型、状态值集合及视图。本文档是创始人构建Airtable数据库时的唯一权威参考。

**File created · 新建文件:** `admin/airtable-schema.md`

**Database structure · 数据库结构:** Base name: `SILORA ORIENT — Operations`

**Table 1: Customers · 表一：客户**

26 fields covering the full client portrait:

26个字段，覆盖完整的客户画像：

| Key Fields · 关键字段 | Details · 详情 |
|----------------------|--------------|
| Name, Email, Phone · 姓名、邮箱、电话 | Standard contact · 标准联系信息 |
| Eye Color · 眼睛颜色 | Core CRM field — central to commission process · 核心CRM字段——定制流程的核心 |
| Color Preferences · 颜色偏好 | Long text — collected in consultation · 长文本——在咨询中收集 |
| Flower Preferences · 花卉偏好 | Long text — guides design direction · 长文本——引导设计方向 |
| Story Notes · 故事记录 | Long text — the personal narrative behind each commission · 长文本——每件定制背后的个人叙事 |
| Family Memory Notes · 家族记忆记录 | Long text — cultural and ancestral references · 长文本——文化与家族传承参考 |
| Brand Relationship Stage · 品牌关系阶段 | Single select: Prospect / First Commission / Repeat Customer / Community Member / Ambassador · 单选：潜在客户/首次定制/复购客户/社群成员/品牌大使 |
| Story Consent Given · 故事分享授权 | Checkbox — separate from general consent · 复选框——与一般授权分开 |
| Workshops Attended · 参加工作坊 | Number — cumulative count · 数字——累计次数 |
| Newsletter Status · 邮件状态 | Single select: Subscribed / Not Subscribed / Unsubscribed · 单选：已订阅/未订阅/已退订 |

**Table 2: Commissions · 表二：定制订单**

24 fields with 14-state status flow:

24个字段，含14状态流转：

Status flow (in order) · 状态流转（按顺序）:
```
inquiry → consultation_scheduled → consultation_complete → proposal_sent →
approved → deposit_paid → in_production → quality_review →
shipped → delivered → followup_sent → story_invited → complete
```

| Key Fields · 关键字段 | Details · 详情 |
|----------------------|--------------|
| Customer (link) · 客户（关联） | Linked to Customers table · 关联客户表 |
| Status · 状态 | 14-state flow as above · 如上所示14状态流转 |
| Payment Status · 支付状态 | Unpaid / Deposit Paid / Balance Due / Paid in Full / Refunded · 未付/已付定金/余款待付/全款已付/已退款 |
| Flower Type · 花卉类型 | The primary flower used in the piece · 作品使用的主要花卉 |
| Total Price, Deposit Amount, Balance Due · 总价、定金金额、余款 | Formula fields · 公式字段 |
| Stripe Payment ID · Stripe支付ID | Format `pi_xxxxxxxxxx` — copied from Stripe Dashboard · 格式`pi_xxxxxxxxxx`——从Stripe后台复制 |
| Symbolism Notes · 象征意义记录 | The story behind the piece · 作品背后的故事 |
| Story Shared · 故事已分享 | Checkbox — tracks if customer story has been published · 复选框——追踪客户故事是否已发布 |

**Table 3: B2B Partners · 表三：B2B合作方**

27 fields for the B2B outreach pipeline. See `admin/airtable-schema.md` for full details.

27个字段，用于B2B外联管道。完整详情见 `admin/airtable-schema.md`。

**Views created per table · 每表创建的视图:**

- Customers: 6 views (All / Active Commissions / Stories / Newsletter List / High Value / New This Month)
- Commissions: 7 views including Kanban (All / Active / Kanban / Awaiting Payment / Ready to Ship / Archive / New This Week)
- B2B Partners: 7 views (All / Outreach Queue / Awaiting Reply / Active Leads / Follow Up Today / Won / No Reply)

**Founder activation required · 需创始人激活:**

1. Go to airtable.com → Create new base named `SILORA ORIENT — Operations`  
   进入airtable.com → 创建名为`SILORA ORIENT — Operations`的新数据库
2. Follow `admin/airtable-schema.md` exactly to build all three tables, fields, status values, and views  
   严格按照`admin/airtable-schema.md`构建全部三个表格、字段、状态值及视图
3. Enter any existing commissions manually to populate the base  
   手动录入现有定制订单以填充数据库

---

### Task 1.1.A — Zapier Formspree → Airtable Sync · Zapier表单自动同步

**Completed · 完成日期:** April 8, 2026  
**Status · 状态:** ✅ Setup guide complete; requires founder to configure Zapier · 配置指南已完成；需创始人配置Zapier

**What was done · 已完成内容:**

A complete step-by-step Zapier configuration guide was written and saved as `admin/zapier-setup.md`. This document covers two Zaps with full field mapping, verification checklists, failure handling procedures, and task usage estimates.

完整的Zapier逐步配置指南已撰写并保存为 `admin/zapier-setup.md`。该文档涵盖两个Zap的完整字段映射、验证核查清单、失败处理程序及任务用量估算。

**File created · 新建文件:** `admin/zapier-setup.md`

**Zap 1: Custom Order Form → Airtable · Zap 1：定制订单表单 → Airtable**

Trigger: Formspree form `xlgopzqb` — New Submission  
触发器：Formspree表单`xlgopzqb` — 新提交

Action 1 — Create Customer record:

| Airtable Field · Airtable字段 | Zapier Value · Zapier值 |
|------------------------------|------------------------|
| Name | `{{name}}` from Formspree |
| Email | `{{email}}` from Formspree |
| Customer Type | *(static)* `B2C` |
| Source | *(static)* `Website Form` |
| First Contact Date | `{{zap_meta_human_now}}` |
| Story Notes | `{{message}}` from Formspree |
| Newsletter Status | *(static)* `Not Subscribed` |
| Brand Relationship Stage | *(static)* `Prospect` |

Action 2 — Create Commission record (linked to Action 1):

| Airtable Field · Airtable字段 | Zapier Value · Zapier值 |
|------------------------------|------------------------|
| Customer | Record ID from Action 1 (`{{1. Record ID}}`) |
| Status | *(static)* `Inquiry` |
| Payment Status | *(static)* `Unpaid` |
| Inquiry Date | `{{zap_meta_human_now}}` |
| Inquiry Source | *(static)* `Website Form` |
| Notes | `{{message}}` full content |

**Zap 2: Contact Form → Airtable (Customer only) · Zap 2：联系表单 → Airtable（仅客户记录）**

Same trigger. A Filter step separates contact inquiries from custom order submissions using `_subject` field. Contact submissions create only a Customer record — no Commission record, since they may not be order inquiries.

相同触发器。通过`_subject`字段的过滤步骤将联系询问与定制订单提交区分开。联系表单提交仅创建客户记录——不创建定制订单记录，因为可能不是订购询价。

**Zapier free tier capacity · Zapier免费套餐容量:**

| Scenario · 场景 | Tasks/month · 每月任务数 |
|----------------|------------------------|
| 5 custom orders + 5 contact messages | 20 tasks |
| 20 custom orders + 20 contact messages | 60 tasks |
| Free tier limit · 免费套餐上限 | 100 tasks |

**Founder activation required · 需创始人激活:**

1. Create Zapier account at zapier.com  
   在zapier.com创建Zapier账户
2. Follow `admin/zapier-setup.md` step-by-step to create both Zaps  
   按照`admin/zapier-setup.md`逐步创建两个Zap
3. Submit a test custom order on `custom.html` → verify record appears in Airtable within 15 minutes  
   在`custom.html`提交测试定制订单 → 验证15分钟内记录出现在Airtable中
4. Turn both Zaps to ON  
   将两个Zap开启

---

### Task 1.1.B — Cal.com Booking Embed · Cal.com预约嵌入

**Completed · 完成日期:** April 8, 2026  
**Status · 状态:** ✅ Code complete; requires founder activation · 代码已完成；需创始人激活

**What was done · 已完成内容:**

A full booking section was added to `custom.html` above the footer. The section includes a brand-styled header, explanatory text in both English and Chinese, a Cal.com inline embed container, and the Cal.com JavaScript SDK. A `booking_click` GA4 event fires when the Cal.com widget opens. The embed is guarded by a `CAL_USERNAME` check — if the username is still the placeholder `'YOUR_CAL_USERNAME'`, the script does nothing and a branded placeholder message is shown instead.

完整的预约区域已添加至 `custom.html` 页脚上方。该区域包含品牌风格的标题、英中双语说明文字、Cal.com内嵌容器及Cal.com JavaScript SDK。当Cal.com插件打开时，`booking_click` GA4事件将触发。嵌入受`CAL_USERNAME`检查保护——若用户名仍为占位符`'YOUR_CAL_USERNAME'`，脚本不执行任何操作，而是显示品牌风格的占位信息。

**File modified · 修改的文件:** `custom.html`

Booking section added above footer:

预约区域已添加至页脚上方：

```html
<!-- Booking Section · 预约区域 -->
<section class="booking-section" style="...">
  <div class="container">
    <p class="eyebrow">Schedule a conversation · 预约咨询</p>
    <h2>Begin with a conversation · 从一次对话开始</h2>
    <p>Every custom piece begins with a conversation — about your story, your memories,
       and the colors that feel like yours. Book a 45-minute consultation below.
       每件定制作品都始于一次对话——关于你的故事、你的记忆，以及那些属于你的色彩。
       在下方预约45分钟咨询。</p>
    <div id="cal-inline" style="min-height: 400px;"></div>
    <!-- Cal.com SDK script with YOUR_CAL_USERNAME guard -->
  </div>
</section>
```

**Cal.com script guard · Cal.com脚本保护:**

```javascript
const CAL_USERNAME = 'YOUR_CAL_USERNAME'; // Replace with real Cal.com username
if (CAL_USERNAME !== 'YOUR_CAL_USERNAME') {
  // Cal.com embed loads only when username is configured
  // Cal.com嵌入仅在用户名已配置时加载
}
```

**Founder activation required · 需创始人激活:**

1. Create account at cal.com (free tier is sufficient)  
   在cal.com创建账户（免费套餐即可）
2. Connect Google Calendar: Settings → Calendars  
   连接Google日历：设置 → 日历
3. Create event type: "Custom Jewelry Consultation · 定制珠宝咨询" — 45 minutes, 15-minute buffer, customize confirmation email with brand language  
   创建活动类型："Custom Jewelry Consultation · 定制珠宝咨询"——45分钟，15分钟缓冲时间，用品牌语言自定义确认邮件
4. Note your Cal.com username (visible in your profile URL: `cal.com/YOUR_USERNAME`)  
   记录你的Cal.com用户名（在个人资料URL中可见：`cal.com/YOUR_USERNAME`）
5. Open `custom.html`, find `const CAL_USERNAME = 'YOUR_CAL_USERNAME'`, replace with your actual username  
   打开`custom.html`，找到`const CAL_USERNAME = 'YOUR_CAL_USERNAME'`，替换为你的实际用户名
6. Deploy (git push)  
   部署（git push）

---

### Task 1.1.C — Stripe Payment Links · Stripe支付链接

**Completed · 完成日期:** April 8, 2026  
**Status · 状态:** ✅ Reference document complete; requires founder to create Stripe account and links · 参考文档已完成；需创始人创建Stripe账户及链接

**What was done · 已完成内容:**

A complete Stripe payment link management guide was written and saved as `admin/stripe-payment-links.md`. The document specifies all links to create, amounts, product names, email templates for sending links to customers, Airtable tracking steps, refund procedures, and a test mode checklist.

完整的Stripe支付链接管理指南已撰写并保存为 `admin/stripe-payment-links.md`。该文档详细说明了需创建的所有链接、金额、产品名称、向客户发送链接的邮件模板、Airtable追踪步骤、退款程序及测试模式核查清单。

**File created · 新建文件:** `admin/stripe-payment-links.md`

**Links to create in Stripe · 在Stripe中需创建的链接:**

| Type · 类型 | Amounts · 金额 | Stripe Product Name |
|-----------|--------------|---------------------|
| Commission Deposit · 定制定金 | $100, $150, $200, $250, $300, $400 | `Commission Deposit — Silora Orient` |
| Commission Balance · 定制尾款 | $100, $150, $200, $250, $300, $400 | `Commission Balance — Silora Orient` |
| Workshop Seat · 工作坊席位 | $65, $85, $120 | `Workshop — Silora Orient` |

**Commission deposit email template · 定制定金邮件模板:**

```
Subject: Your Silora Orient commission is confirmed

Dear [Name],

We're so pleased to confirm your custom [flower type] commission.

To begin your piece, a 50% deposit of $[amount] is required.
You can pay securely here: [STRIPE LINK]

Once received, we'll begin designing your piece within 3–5 days.

With care,
Silora Orient
```

**Commission balance email template · 定制尾款邮件模板:**

```
Subject: Your Silora Orient piece is ready

Dear [Name],

Your [flower type] piece is complete and we love how it has turned out.

To arrange shipping, the remaining balance of $[amount] is due here:
[STRIPE LINK]

Once confirmed, we'll ship within 2 business days with tracking.

With care,
Silora Orient
```

**Refund policy · 退款政策:** Deposits are non-refundable once production has begun (`In Production` status). Full refund available if customer cancels before `In Production`. All refunds processed by the Founder only via Stripe Dashboard.

定金一旦开始制作（`In Production`状态）即不可退款。若客户在`In Production`状态前取消，可全额退款。所有退款仅由创始人通过Stripe后台处理。

**Founder activation required · 需创始人激活:**

1. Create Stripe account at stripe.com, complete identity verification (requires government ID)  
   在stripe.com创建账户，完成身份验证（需政府颁发的身份证件）
2. Add bank account for payouts: Dashboard → Settings → Bank accounts  
   添加银行账户用于提款：后台 → 设置 → 银行账户
3. Test with Stripe test mode first using test card `4242 4242 4242 4242`  
   先使用测试卡`4242 4242 4242 4242`在Stripe测试模式下进行测试
4. Create all 15 payment links per `admin/stripe-payment-links.md`  
   按照`admin/stripe-payment-links.md`创建全部15条支付链接
5. Paste each link URL into the "Paste URL here" column in `admin/stripe-payment-links.md`  
   将每条链接URL粘贴至`admin/stripe-payment-links.md`中的"粘贴链接"列

---

### Summary: What Is Live vs. What Needs Activation · 摘要：已上线内容与待激活内容

**Already live in production (silora-orient.vercel.app) · 已在生产环境上线:**

| Item · 内容 | Details · 详情 |
|-----------|--------------|
| GA4 script on all 9 pages · 全部9页GA4脚本 | Tracking begins the moment GA4 Measurement ID is set · 设置GA4测量ID后立即开始追踪 |
| Newsletter form → Mailchimp API · 订阅表单→Mailchimp API | Working code deployed; activates when env vars are set in Vercel · 已部署工作代码；在Vercel中设置环境变量后激活 |
| Cal.com booking section on custom.html · custom.html上的Cal.com预约区域 | Placeholder visible now; activates when username is replaced · 当前显示占位信息；替换用户名后激活 |
| All 3 GA4 custom events · 全部3个GA4自定义事件 | Fires correctly once GA4 ID is real · GA4 ID设置为真实值后正常触发 |
| Deploy pipeline · 部署流水线 | Green; all 4 GitHub Secrets configured · 正常运行；全部4个GitHub Secrets已配置 |

**Requires founder action to activate · 需创始人操作才能激活:**

| Action Required · 所需操作 | Est. Time · 预计时间 |
|--------------------------|------------------|
| Replace `G-XXXXXXXXXX` in all 9 HTML files with real GA4 Measurement ID · 将全部9个HTML文件中的`G-XXXXXXXXXX`替换为真实GA4测量ID | 10 minutes · 10分钟 |
| Create Mailchimp account, get API key, set 3 Vercel env vars · 创建Mailchimp账户、获取API密钥、设置3个Vercel环境变量 | 30 minutes · 30分钟 |
| Build Airtable base per `admin/airtable-schema.md` · 按`admin/airtable-schema.md`构建Airtable数据库 | 2–3 hours · 2-3小时 |
| Configure Zapier Zaps per `admin/zapier-setup.md` · 按`admin/zapier-setup.md`配置Zapier Zap | 45–60 minutes · 45-60分钟 |
| Create Cal.com account, replace `YOUR_CAL_USERNAME` in `custom.html` · 创建Cal.com账户，替换`custom.html`中的`YOUR_CAL_USERNAME` | 30 minutes · 30分钟 |
| Create Stripe account, create 15 payment links · 创建Stripe账户，创建15条支付链接 | 30–45 minutes · 30-45分钟 |

---

### Next: P2 Tasks · 下一步：P2任务

**Task 1.2.A — Mailchimp Welcome Automation · Mailchimp欢迎自动化** — Not started · 未开始  
Depends on: Mailchimp account live and first subscriber received · 依赖：Mailchimp账户已上线且已收到第一位订阅者  
Effort: 2–3 hours to configure the 3-email sequence in Mailchimp Customer Journeys · 工作量：在Mailchimp客户旅程中配置3封邮件序列需2-3小时

**Task 1.2.B — B2B Partner Database (Initial 50) · B2B合作方数据库（初始50条）** — Not started · 未开始  
Depends on: Airtable base live (Task 1.0.C complete) · 依赖：Airtable数据库已上线（任务1.0.C已完成）  
Effort: 3–4 hours research + 1 hour data entry · 工作量：3-4小时调研 + 1小时数据录入

---

## Phase 1 Scope Summary · 第一阶段范围概述

**Timeline · 时间范围:** 1–2 weeks from start date · 启动后1-2周  
**Team · 执行团队:** Founder (lead) + Co-founder (support) · 创始人（主导）+ 联合创始人（协助）  
**External tools to set up · 需配置的外部工具:** GA4, Mailchimp, Airtable, Zapier, Cal.com, Stripe

**What Phase 1 delivers · 第一阶段交付内容:**

| Deliverable · 交付成果 | Module · 模块 | Impact · 影响 |
|----------------------|--------------|--------------|
| Analytics tracking on all pages · 全页面分析追踪 | M-6 | Traffic data begins immediately · 即刻获取流量数据 |
| Real newsletter subscriptions · 真实邮件订阅 | M-6 | Email list begins growing · 邮件列表开始增长 |
| Commission tracker in Airtable · Airtable定制订单追踪 | M-2 | No more lost orders · 不再遗漏订单 |
| Formspree → Airtable auto-sync · 表单自动同步 | M-1 + M-2 | All inquiries logged automatically · 所有询价自动记录 |
| Consultation booking on custom.html · 定制页面咨询预约 | M-5 | Consultations bookable online · 在线预约咨询 |
| Stripe payment links for commissions · 定制订单Stripe支付链接 | M-5 | Deposits can be collected · 可收取定金 |
| Welcome email automation · 欢迎邮件自动化 | M-6 | Every subscriber gets a response · 每位订阅者获得回复 |
| B2B partner database (initial 50) · B2B合作方数据库（初始50条） | M-4 | Outreach can begin systematically · 系统化外联可以开始 |

Phase 1 = "数据捕获层"，是整个 6 模块系统的输入管道：
Brand CMS：用GA4知道哪些内容受欢迎
Client CRM：用Airtable存客户记录
Product Studio：用Stripe收定制定金
Community Hub：用Cal.com收课程预约
B2B Pipeline：后续用Airtable存合作线索
Analytics & Ops：用GA4看全站数据

**What Phase 1 does NOT include · 第一阶段不包含:**
- Custom backend or database build · 自建后端或数据库
- Admin dashboard · 管理后台
- Workshop public page · 工作坊公开页面
- Automated proposal generator · 自动化提案生成
- Journal CMS or content workflow tool · 日记内容管理系统
- Quarterly email dispatch (dry run in Phase 2) · 季刊邮件发送（第二阶段进行演练）

---

## Development Sequence · 开发顺序

Tasks are sequenced by dependency and business impact. Tasks within the same priority tier can be executed in parallel if team capacity allows.

任务按依赖关系和业务影响优先级排序。同一优先级层内的任务，在团队资源允许时可并行推进。

---

## Priority 0 · 优先级0 — Fix the Silent Failures · 修复静默失败

*These three tasks must be completed before anything else. They cost almost nothing to implement and immediately stop real business loss.*

*以下三项任务必须最先完成。实施成本极低，且可立即阻止真实业务损失。*

---

### Task 1.0.A — Install Google Analytics 4
### 任务1.0.A — 安装Google Analytics 4

**Priority · 优先级:** P0 — Immediate · 立即  
**Module · 模块:** M-6 Growth & Analytics  
**Effort · 工作量:** 1–2 hours · 1-2小时  
**Depends on · 依赖:** GA4 account created · GA4账户已创建  
**Owner · 负责人:** Founder · 创始人

**What this fixes · 解决的问题:**  
Currently there is zero traffic data. No one knows how many people visit, where they come from, which pages they read, or which content drives inquiries. This is the single highest-leverage action available — one script tag unlocks all of it.

当前完全没有流量数据。无法得知访问人数、来源渠道、浏览页面及哪些内容推动询价。这是可用的单一最高杠杆行动——一行脚本标签即可解锁全部数据。

**Setup steps · 配置步骤:**

1. Go to analytics.google.com → Create new GA4 property for `silora-orient.vercel.app`  
   进入analytics.google.com → 为`silora-orient.vercel.app`创建新GA4属性
2. Copy the Measurement ID (format: `G-XXXXXXXXXX`)  
   复制测量ID（格式：`G-XXXXXXXXXX`）
3. Add the following block to the `<head>` of all 9 HTML files  
   将以下代码块添加至全部9个HTML文件的`<head>`标签内

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

4. Replace `G-XXXXXXXXXX` with the real Measurement ID in all files  
   将所有文件中的`G-XXXXXXXXXX`替换为真实测量ID
5. Deploy (git push → Vercel auto-deploys)  
   部署（git push → Vercel自动部署）
6. Verify: visit the site, open GA4 → Realtime → confirm active users appear  
   验证：访问网站，打开GA4 → 实时报告 → 确认活跃用户出现

**Files to edit · 需编辑的文件:**
```
index.html
about.html
collections.html
other-collections.html
custom.html
stories.html
journal.html
documentary.html
contact.html
```

**Deliverable · 交付成果:** GA4 live on all pages, data flowing within 24 hours · GA4在所有页面上线，24小时内数据开始流入

**Custom events to add in Phase 1.5 (after P0 complete) · 第一阶段1.5添加的自定义事件（P0完成后）:**

```javascript
// Add to main.js — fires on newsletter form submit
// 添加至main.js — 订阅表单提交时触发
gtag('event', 'newsletter_signup', { event_category: 'engagement' });

// Add to custom.html — fires on final form submission
// 添加至custom.html — 最终表单提交时触发
gtag('event', 'custom_form_submit', { event_category: 'conversion' });

// Add to contact.html — fires on contact form submission
// 添加至contact.html — 联系表单提交时触发
gtag('event', 'contact_form_submit', { event_category: 'engagement' });
```

---

### Task 1.0.B — Connect Newsletter Form to Mailchimp
### 任务1.0.B — 将订阅表单连接至Mailchimp

**Priority · 优先级:** P0 — Immediate · 立即  
**Module · 模块:** M-6 Growth & Analytics  
**Effort · 工作量:** 2–3 hours · 2-3小时  
**Depends on · 依赖:** Mailchimp account created and audience configured · Mailchimp账户已创建，受众列表已配置  
**Owner · 负责人:** Founder · 创始人

**What this fixes · 解决的问题:**  
The current newsletter form button changes color and says "Thank you" — but stores zero subscribers. Every person who has clicked that button is gone. This task replaces the fake UI with a real Mailchimp API call so every subscriber is captured from this point forward.

当前订阅表单按钮会变色并显示"谢谢"，但实际储存了零个订阅者。每一个点击过该按钮的人都已流失。本任务将虚假UI替换为真实的Mailchimp API调用，从此刻起留存每一位订阅者。

**Setup steps · 配置步骤:**

1. Create Mailchimp account at mailchimp.com (free tier: up to 500 subscribers)  
   在mailchimp.com创建账户（免费套餐：最多500位订阅者）
2. Create an Audience named "Silora Orient — Main List"  
   创建名为"Silora Orient — Main List"的受众列表
3. Get API key: Account → Extras → API Keys → Create A Key  
   获取API密钥：账户 → 扩展 → API密钥 → 创建密钥
4. Get Audience ID: Audience → Settings → Audience name and defaults → Audience ID  
   获取受众ID：受众 → 设置 → 受众名称与默认值 → 受众ID

**Implementation · 实施方案:**

Because the site is fully static (no server), use Mailchimp's hosted signup form endpoint or a serverless function via Vercel. The recommended zero-infrastructure approach is a Mailchimp embedded form action with AJAX:

由于网站完全静态（无服务器），可使用Mailchimp托管注册表单端点或通过Vercel的无服务器函数。推荐的零基础设施方案是通过AJAX使用Mailchimp嵌入式表单操作：

**Option A (simplest · 最简方案): Mailchimp embedded form action**

Replace the current newsletter button logic in `main.js` with a form that posts to Mailchimp's hosted endpoint. This requires no server but does cause a page redirect on submit.

将`main.js`中当前的订阅按钮逻辑替换为发布到Mailchimp托管端点的表单。无需服务器，但提交后会跳转页面。

**Option B (recommended · 推荐方案): Vercel serverless function**

Create a Vercel API route that accepts the email, calls the Mailchimp API server-side (keeping API key private), and returns success. No redirect. Works seamlessly with the existing UI.

创建一个Vercel API路由，接受邮件地址，在服务器端调用Mailchimp API（保持API密钥私密），返回成功状态。无页面跳转，与现有UI无缝配合。

**File to create: `/api/subscribe.js`**

```javascript
// /api/subscribe.js — Vercel serverless function
// /api/subscribe.js — Vercel无服务器函数
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const MAILCHIMP_DC = process.env.MAILCHIMP_DC; // e.g. 'us21'

  const data = {
    email_address: email,
    status: 'subscribed',
    tags: ['homepage_signup']
  };

  const response = await fetch(
    `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  const result = await response.json();

  if (response.status === 200 || response.status === 400 && result.title === 'Member Exists') {
    return res.status(200).json({ success: true });
  }

  return res.status(500).json({ error: 'Subscription failed' });
}
```

**Environment variables to set in Vercel · 需在Vercel中设置的环境变量:**
```
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_AUDIENCE_ID=your_audience_id_here
MAILCHIMP_DC=us21  (your datacenter prefix from your API key)
```

**Update `main.js` newsletter section · 更新`main.js`订阅区域:**

```javascript
// Replace existing newsletter button handler in main.js
// 替换main.js中现有的订阅按钮处理逻辑
if (newsletterForm && newsletterBtn) {
  newsletterBtn.addEventListener('click', async function () {
    const input = newsletterForm.querySelector('input[type="email"]');
    const email = input ? input.value.trim() : '';

    if (!email.includes('@')) {
      input.style.border = '1px solid var(--gold)';
      input.placeholder = 'Please enter a valid email · 请输入有效邮箱';
      return;
    }

    newsletterBtn.textContent = '...';
    newsletterBtn.disabled = true;

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        newsletterBtn.textContent = '✓ Thank you · 感谢订阅';
        newsletterBtn.style.background = '#A8B89C';
        input.value = '';
        input.placeholder = 'You\'re on the list · 已加入订阅列表';
        // Fire GA4 event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'newsletter_signup', { event_category: 'engagement' });
        }
      } else {
        throw new Error('failed');
      }
    } catch {
      newsletterBtn.textContent = 'Try again · 请重试';
      newsletterBtn.disabled = false;
    }
  });
}
```

**Deliverable · 交付成果:** Every email submitted is stored in Mailchimp. Welcome automation triggers automatically. List begins growing from day one · 每封提交的邮箱均储存在Mailchimp中，欢迎自动化即刻触发，列表从第一天开始增长

---

### Task 1.0.C — Set Up Airtable Commission Tracker
### 任务1.0.C — 建立Airtable定制订单追踪系统

**Priority · 优先级:** P0 — Immediate · 立即  
**Module · 模块:** M-2 Commission & Product, M-1 CRM  
**Effort · 工作量:** 2–3 hours · 2-3小时  
**Depends on · 依赖:** Airtable account created (free tier sufficient) · Airtable账户已创建（免费套餐即可）  
**Owner · 负责人:** Founder · 创始人

**What this fixes · 解决的问题:**  
Custom order inquiries currently arrive as emails and are tracked in no system. If an email is missed or archived, the order is lost. This task creates a structured Airtable base that serves as the operational record for all commissions.

定制订单询价目前以邮件形式到达，没有任何系统追踪。如果邮件被遗漏或归档，订单就会流失。本任务创建一个结构化Airtable数据库，作为所有定制订单的运营记录。

**Airtable base structure · Airtable数据库结构:**

**Base name · 数据库名称:** `SILORA ORIENT — Operations`

**Table 1: Customers · 表一：客户**

| Field Name · 字段名 | Field Type · 类型 | Notes · 说明 |
|--------------------|------------------|-------------|
| Name · 姓名 | Single line text | Primary field · 主字段 |
| Email · 邮箱 | Email | |
| Phone · 电话 | Phone | |
| Location · 所在地 | Single line text | City, country |
| Type · 类型 | Single select | B2C / B2B / Community |
| Source · 来源 | Single select | Website / Referral / Event / Social / Walk-in |
| Story Notes · 故事笔记 | Long text | |
| Color Preferences · 色彩偏好 | Long text | |
| Eye Color · 眼睛颜色 | Single line text | |
| Family Memory Notes · 家庭记忆笔记 | Long text | |
| Newsletter Status · 订阅状态 | Single select | Subscribed / Not subscribed / Unsubscribed |
| Consent Given · 已授权 | Checkbox | |
| Consent Date · 授权日期 | Date | |
| First Contact · 首次联系 | Date | |
| Last Contact · 最近联系 | Date | |
| Next Follow-up · 下次跟进 | Date | |
| Follow-up Notes · 跟进笔记 | Long text | |
| Commissions · 定制订单 | Link to Commissions table | |

**Table 2: Commissions · 表二：定制订单**

| Field Name · 字段名 | Field Type · 类型 | Notes · 说明 |
|--------------------|------------------|-------------|
| Commission ID · 订单编号 | Autonumber | Primary field |
| Customer · 客户 | Link to Customers | |
| Status · 状态 | Single select | See status values below |
| Inquiry Date · 询价日期 | Date | |
| Flower Type · 花型 | Single line text | |
| Colors · 颜色 | Multiple select | |
| Symbolism Notes · 象征含义 | Long text | |
| Quote Amount · 报价金额 | Currency | USD |
| Deposit Amount · 定金金额 | Currency | |
| Balance Due · 余款 | Currency | |
| Payment Status · 支付状态 | Single select | Unpaid / Deposit paid / Paid / Refunded |
| Production Notes · 生产笔记 | Long text | |
| Shipped Date · 发货日期 | Date | |
| Tracking Number · 追踪号 | Single line text | |
| Delivered Date · 收货日期 | Date | |
| Follow-up Sent · 已发送跟进 | Checkbox | |
| Story Invited · 已邀请故事 | Checkbox | |
| Notes · 备注 | Long text | |

**Commission status values · 定制订单状态值:**
```
Inquiry · 询价
Consultation Scheduled · 已预约咨询
Consultation Complete · 咨询完成
Proposal Sent · 已发送提案
Approved · 已审批
Deposit Paid · 已付定金
In Production · 生产中
Quality Review · 质检中
Shipped · 已发货
Delivered · 已收货
Follow-up Sent · 已发送跟进
Story Invited · 已邀请故事
Complete · 已完成
On Hold · 暂停
Cancelled · 已取消
```

**Airtable views to create · 需创建的视图:**

| View Name · 视图名 | Filter · 筛选 | Purpose · 用途 |
|-------------------|--------------|---------------|
| Active Commissions · 活跃订单 | Status not in [Complete, Cancelled] | Daily operations dashboard · 日常运营看板 |
| New Inquiries · 新询价 | Status = Inquiry | Review daily · 每日审查 |
| In Production · 生产中 | Status = In Production | Track current work · 追踪当前工作 |
| Awaiting Payment · 等待付款 | Payment Status = Unpaid, Status = Approved | Chase deposits · 催收定金 |
| Follow-up Queue · 跟进队列 | Next Follow-up = today · 今日跟进 | Daily action list · 每日行动清单 |
| All Customers · 所有客户 | None · 无 | Full CRM view · 完整CRM视图 |

**Deliverable · 交付成果:** Airtable base live with two linked tables, six operational views, and a clear status board for all commissions · Airtable数据库上线，含两个关联表格、六个运营视图及所有定制订单的清晰状态看板

---

## Priority 1 · 优先级1 — Connect the Channels · 连接各渠道

*Complete after all P0 tasks are done. These tasks connect the existing website touchpoints to the new data infrastructure.*

*所有P0任务完成后执行。这些任务将现有网站触点连接至新的数据基础设施。*

---

### Task 1.1.A — Formspree → Airtable Auto-Sync
### 任务1.1.A — Formspree到Airtable自动同步

**Priority · 优先级:** P1  
**Module · 模块:** M-1 CRM, M-2 Commission  
**Effort · 工作量:** 1–2 hours · 1-2小时  
**Depends on · 依赖:** Task 1.0.C (Airtable base live) · 任务1.0.C已完成  
**Tool · 工具:** Zapier (free tier: 100 tasks/month) or Make (free tier: 1000 ops/month)  
**Owner · 负责人:** Founder · 创始人

**What this does · 功能说明:**  
Every time someone submits the custom order form or contact form on the website, Formspree receives it and emails the founder. This task adds an automatic second action: a new record appears in Airtable the moment a form is submitted, with all form fields mapped to the correct columns. No manual entry required.

每当有人提交网站上的定制订单表单或联系表单时，Formspree接收并将其发送至创始人邮箱。本任务添加自动的第二步操作：表单提交后即刻在Airtable中生成新记录，所有表单字段自动映射至对应列。无需手动录入。

**Zapier zap configuration · Zapier工作流配置:**

```
Trigger: Formspree — New Submission (form ID: xlgopzqb)
触发器：Formspree — 新提交（表单ID：xlgopzqb）

Action 1: Airtable — Create Record in Customers table
行动1：Airtable — 在客户表中创建记录
  Map: Name → Name field
  Map: Email → Email field
  Map: Message → Story Notes field
  Set: Type = B2C
  Set: Source = Website
  Set: First Contact = Today

Action 2: Airtable — Create Record in Commissions table
行动2：Airtable — 在定制订单表中创建记录
  Map: Customer (link to record just created)
  Map: Inquiry Date = Today
  Set: Status = Inquiry
  Map: Notes → full message content
```

**Fields from current custom.html form · custom.html当前表单字段:**

The custom form currently sends via Formspree. Map these fields:
当前定制表单通过Formspree发送。需映射以下字段：

| Form Field · 表单字段 | Airtable Field · Airtable字段 |
|----------------------|------------------------------|
| Name · 姓名 | Customer: Name |
| Email · 邮箱 | Customer: Email |
| Eye color · 眼睛颜色 | Customer: Eye Color |
| Flower type · 花型 | Commission: Flower Type |
| Color preferences · 颜色偏好 | Customer: Color Preferences |
| Story / message · 故事/留言 | Commission: Symbolism Notes |

**Deliverable · 交付成果:** All future form submissions appear in Airtable within 60 seconds of submission, with no manual action required · 未来所有表单提交将在60秒内出现在Airtable中，无需任何手动操作

---

### Task 1.1.B — Embed Consultation Booking on custom.html
### 任务1.1.B — 在custom.html嵌入咨询预约系统

**Priority · 优先级:** P1  
**Module · 模块:** M-5 Booking & Payment  
**Effort · 工作量:** 2–3 hours (Cal.com setup + HTML embed) · 2-3小时（Cal.com配置+HTML嵌入）  
**Depends on · 依赖:** Cal.com account created, Google Calendar connected · Cal.com账户已创建，Google日历已连接  
**Owner · 负责人:** Founder · 创始人

**What this does · 功能说明:**  
Currently, consultation requests arrive as form submissions and are then manually scheduled by email. This task adds a real booking widget to `custom.html` so customers can select available time slots directly, triggering automatic confirmation emails and calendar events.

目前，咨询请求以表单提交形式到达，然后通过邮件手动安排时间。本任务在`custom.html`添加真实的预约插件，让客户直接选择可用时间段，自动触发确认邮件和日历事件。

**Cal.com setup · Cal.com配置:**

1. Create account at cal.com (free tier is sufficient)  
   在cal.com创建账户（免费套餐即可）
2. Connect Google Calendar (Settings → Calendars)  
   连接Google日历（设置 → 日历）
3. Create event type: "Custom Jewelry Consultation · 定制珠宝咨询"  
   创建活动类型："Custom Jewelry Consultation · 定制珠宝咨询"
   - Duration: 45 minutes · 时长：45分钟
   - Buffer: 15 minutes after · 缓冲：结束后15分钟
   - Availability: founder's available hours · 可用性：创始人的可用时间
   - Confirmation email: customize with brand language · 确认邮件：使用品牌语言自定义
4. Enable Zoom or Google Meet link generation (optional)  
   启用Zoom或Google Meet链接生成（可选）
5. Copy embed code from Cal.com → Event Type → Embed  
   从Cal.com → 活动类型 → 嵌入，复制嵌入代码

**HTML addition to `custom.html` · 在`custom.html`添加的HTML:**

Add the following section after the existing multi-step form, before the footer:
在现有多步表单之后、页脚之前添加以下区域：

```html
<!-- Booking Section · 预约区域 -->
<section class="booking-section" style="padding: var(--space-xl) 0; background: var(--cream);">
  <div class="container">
    <div style="text-align: center; margin-bottom: var(--space-lg);">
      <p class="eyebrow">Schedule a conversation · 预约咨询</p>
      <h2 style="font-family: var(--font-serif); font-size: 2rem; margin: 0.5rem 0;">
        Begin with a conversation
      </h2>
      <p style="color: var(--text-mid); max-width: 500px; margin: 1rem auto; line-height: 1.7;">
        Every custom piece begins with a conversation — about your story, your memories, and the colors that feel like yours. Book a 45-minute consultation below.
      </p>
    </div>
    <!-- Cal.com inline embed · Cal.com内嵌预约 -->
    <div style="max-width: 800px; margin: 0 auto;">
      <!-- Replace YOUR_CAL_USERNAME with actual Cal.com username -->
      <!-- 将YOUR_CAL_USERNAME替换为实际Cal.com用户名 -->
      <div id="cal-inline" style="min-height: 400px;"></div>
      <script type="text/javascript">
        (function (C, A, L) {
          let p = function (a, ar) { a.q.push(ar); };
          let d = C.document;
          C.Cal = C.Cal || function () {
            let cal = C.Cal; let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {}; cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () { p(api, arguments); };
              const namespace = ar[1];
              api.q = api.q || [];
              typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
              return;
            }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", {origin: "https://cal.com"});
        Cal("inline", {
          elementOrSelector: "#cal-inline",
          calLink: "YOUR_CAL_USERNAME/custom-consultation",
          layout: "month_view"
        });
      </script>
    </div>
  </div>
</section>
```

**Confirmation email template · 确认邮件模板** (to customize in Cal.com settings · 在Cal.com设置中自定义):

```
Subject: Your consultation is confirmed — Silora Orient

Thank you for reaching out. Your 45-minute consultation is confirmed.

[Date and time]
[Zoom / location link if applicable]

Before we meet, you're welcome to think about:
— The flower that speaks to you most
— A color that feels like yours
— A memory or story you'd like your piece to carry

We look forward to hearing you.

— Silora Orient
```

**Deliverable · 交付成果:** Consultation bookings managed online, automatic calendar blocking, confirmation emails sent, booking data trackable in Cal.com dashboard · 在线管理咨询预约，自动锁定日历，发送确认邮件，预约数据可在Cal.com后台追踪

---

### Task 1.1.C — Create Stripe Payment Links for Commissions
### 任务1.1.C — 为定制订单创建Stripe支付链接

**Priority · 优先级:** P1  
**Module · 模块:** M-5 Booking & Payment  
**Effort · 工作量:** 1–2 hours (account setup + first link) · 1-2小时（账户配置+首条链接）  
**Depends on · 依赖:** Stripe account verified with banking details · Stripe账户已通过银行信息验证  
**Owner · 负责人:** Founder · 创始人

**What this does · 功能说明:**  
Replaces informal payment arrangements (bank transfer, Venmo) with a professional, tracked, and receipt-generating Stripe flow. In Phase 1, these are pre-built payment links for common deposit amounts — no website checkout integration required.

将非正式的付款安排（银行转账、Venmo）替换为专业的、可追踪的、自动生成收据的Stripe流程。在第一阶段，这些是针对常见定金金额的预建支付链接——无需网站结账集成。

**Stripe setup · Stripe配置:**

1. Create Stripe account at stripe.com, complete identity verification  
   在stripe.com创建账户，完成身份验证
2. Add bank account for payouts  
   添加银行账户用于提款
3. Navigate to Payment Links → Create link  
   进入支付链接 → 创建链接

**Payment links to create · 需创建的支付链接:**

| Link Name · 链接名称 | Amount · 金额 | Description · 描述 |
|--------------------|--------------|-------------------|
| Commission Deposit — $150 · 定制定金150美元 | $150 USD | "Custom Commission Deposit — Silora Orient" |
| Commission Deposit — $200 · 定制定金200美元 | $200 USD | "Custom Commission Deposit — Silora Orient" |
| Commission Deposit — $300 · 定制定金300美元 | $300 USD | "Custom Commission Deposit — Silora Orient" |
| Commission Balance · 定制尾款 | Variable (enter at send) · 可变 | Use "custom amount" link type |

**How to use payment links · 支付链接使用方式:**

When a commission is approved and a deposit is due:
当定制订单获批且需收取定金时：

1. Open the relevant Stripe payment link  
   打开对应的Stripe支付链接
2. Add customer name in the "additional information" field if available  
   如有可用，在"附加信息"字段填写客户姓名
3. Copy the link and include it in the approval email to the customer  
   复制链接并在发送给客户的审批邮件中附上
4. Stripe sends automatic receipt to customer on payment  
   付款后Stripe自动发送收据给客户
5. Update Airtable commission record: Payment Status = Deposit Paid  
   更新Airtable定制订单记录：支付状态 = 已付定金

**Deliverable · 交付成果:** Three standard deposit links live in Stripe; first commission payment collected through the system · Stripe中三条标准定金链接上线；首笔定制款项通过系统收取

---

## Priority 2 · 优先级2 — Build Forward Momentum · 构建持续动力

*Complete after all P1 tasks are done. These tasks build the infrastructure needed for ongoing operations.*

*所有P1任务完成后执行。这些任务构建持续运营所需的基础设施。*

---

### Task 1.2.A — Configure Mailchimp Welcome Automation
### 任务1.2.A — 配置Mailchimp欢迎自动化序列

**Priority · 优先级:** P2  
**Module · 模块:** M-6 Growth & Analytics  
**Effort · 工作量:** 2–3 hours · 2-3小时  
**Depends on · 依赖:** Task 1.0.B (Mailchimp connected, subscribers flowing in) · 任务1.0.B已完成  
**Owner · 负责人:** Founder · 创始人

**What this does · 功能说明:**  
Every new subscriber automatically receives a 3-email welcome sequence. This runs without any manual action, nurturing new subscribers toward the brand, the collection, and a potential commission.

每位新订阅者自动收到3封欢迎序列邮件。无需任何手动操作即可运行，将新订阅者引导至品牌、系列作品及潜在定制。

**Automation setup in Mailchimp · Mailchimp自动化配置:**

Navigate to: Automations → Customer Journeys → Create Journey  
路径：自动化 → 客户旅程 → 创建旅程

Trigger: Subscribes to audience · 触发器：订阅受众列表

**Email 1 — Immediate (0 delay) · 邮件1 — 即刻（无延迟）**

```
Subject: Welcome to Silora Orient · 欢迎来到 Silora Orient

[Brand header image]

Thank you for joining us.

Silora Orient began in a Chinese silk flower workshop — five years of thread, wire, and patience. It arrived in New York in spring 2026, carrying the story of a Spanish pianist and the earrings we made for her eyes instead of the ones she asked for.

That is the kind of brand we are. Every piece is a story. Every commission is a conversation.

You will hear from us when there is something worth telling: a new collection, a new story, a workshop, a quarterly issue.

Until then — welcome.

[Explore the Collection] [Learn Our Story]
```

**Email 2 — Day 3 · 邮件2 — 第3天**

```
Subject: The story behind the Eye Color Collection · 眼色系列背后的故事

[Image: orchid earrings in blue and blush]

She came to order cherry blossom earrings.

We looked up and saw her eyes — Mediterranean blue with a hint of morning grey. She was a Spanish pianist, far from home, telling us about the sea she had left behind.

We put the cherry blossom earrings aside. We made something for her eyes instead.

That unplanned piece is why the Eye Color Collection exists.

Every piece in the collection is named for an eye color that exists in the world. Every piece begins with a question: what is the color of your eyes?

[See the Eye Color Collection]
```

**Email 3 — Day 7 · 邮件3 — 第7天**

```
Subject: If you've ever wanted a piece made just for you · 如果你曾想要一件专为你而作的珠宝

[Image: process photo — silk, wire, hands]

Every custom commission begins with a conversation.

We ask about your eyes. We ask about your memories. We ask what a flower means to you, and why. Then we disappear into the studio and come back with something we have never made before — and will never make again.

If there is a story you've been carrying — we would like to hear it.

[Begin Your Custom Order]
```

**Deliverable · 交付成果:** Three-email welcome sequence live; all new subscribers automatically receive the sequence; brand narrative delivered within one week of signup · 三封欢迎序列上线；所有新订阅者自动接收序列；注册后一周内完成品牌叙事传达

---

### Task 1.2.B — Build B2B Partner Database (Initial 50 Targets)
### 任务1.2.B — 建立B2B合作方数据库（初始50条目标记录）

**Priority · 优先级:** P2  
**Module · 模块:** M-4 B2B & Outreach  
**Effort · 工作量:** 3–4 hours research + 1 hour Airtable setup · 3-4小时调研 + 1小时Airtable配置  
**Depends on · 依赖:** Task 1.0.C (Airtable base live) · 任务1.0.C已完成  
**Owner · 负责人:** Founder or B2B Manager · 创始人或B2B负责人

**What this does · 功能说明:**  
Creates a structured database of the first 50 B2B outreach targets in New York. With this in place, outreach becomes systematic rather than ad hoc — every contact has a record, every action has a date, and nothing falls through.

创建纽约首批50个B2B外联目标的结构化数据库。有了这个基础，外联工作变得系统化而非临时性——每个联系人都有记录，每次行动都有日期，不再遗漏任何事项。

**Table to add to Airtable base · 添加至Airtable数据库的新表格:**

**Table 3: B2B Partners · 表三：B2B合作方**

| Field Name · 字段名 | Field Type · 类型 |
|--------------------|------------------|
| Business Name · 商业名称 | Single line text (primary · 主字段) |
| Website · 网站 | URL |
| Email · 邮箱 | Email |
| Phone · 电话 | Phone |
| Address · 地址 | Single line text |
| City · 城市 | Single line text |
| Category · 分类 | Single select (see values below) |
| Contact Person · 联系人 | Single line text |
| Contact Title · 联系人职位 | Single line text |
| Discovery Source · 发现来源 | Single select |
| Aesthetic Fit · 审美契合度 | Single select: Strong / Moderate / Weak / Unknown |
| Notes · 备注 | Long text |
| Status · 状态 | Single select (see values below) |
| Outreach Date · 外联日期 | Date |
| Last Follow-up · 最近跟进 | Date |
| Next Action Date · 下次行动日期 | Date |
| Reply Received · 已收到回复 | Checkbox |
| Reply Summary · 回复摘要 | Long text |
| Interest Level · 兴趣程度 | Single select: Low / Medium / High / Unknown |
| Proposal Sent · 已发提案 | Checkbox |
| Proposal Version · 提案版本 | Single line text |
| Sample Sent · 已寄样品 | Checkbox |
| Deal Status · 成交状态 | Single select: None / Negotiating / Closed / Declined / Paused |

**Status values · 状态值:**
```
Discovered · 已发现
Outreach Pending · 待外联
Outreached · 已外联
No Reply · 无回复
Replied · 已回复
Interested · 感兴趣
Proposal Sent · 已发提案
Sample Sent · 已寄样品
Negotiating · 谈判中
Deal Closed · 已成交
Declined · 已拒绝
Paused · 暂停
```

**Views to create · 需创建的视图:**

| View · 视图 | Filter · 筛选 | Purpose · 用途 |
|------------|--------------|---------------|
| All Partners · 所有合作方 | None | Full database |
| Outreach Queue · 外联队列 | Status = Outreach Pending | Priority daily list |
| Awaiting Reply · 等待回复 | Status = Outreached, Outreach Date < 14 days ago | Follow-up targets |
| Active Leads · 活跃线索 | Status = Interested or Negotiating | Warm pipeline |
| Follow Up Today · 今日跟进 | Next Action Date = Today | Daily action |
| Won · 已成交 | Status = Deal Closed | Wins tracker |

**Initial research targets · 初始调研目标方向:**

| Category · 分类 | NYC Search Terms · 纽约搜索关键词 |
|----------------|----------------------------------|
| Boutique jewelry stores · 精品珠宝店 | "handmade jewelry NYC", "artisan jewelry Brooklyn", "独立珠宝店纽约" |
| Concept stores · 概念店 | "concept store NYC", "multibrand boutique Manhattan" |
| Galleries · 画廊 | "craft gallery NYC", "contemporary jewelry gallery" |
| Cultural institutions · 文化机构 | Chinese cultural centers, Asian art museums, cultural gift shops |
| Stylists · 造型师 | NYC editorial stylists on Instagram with artisan aesthetic |

**Deliverable · 交付成果:** 50 records entered in Airtable B2B table with at minimum: business name, website, email, category, and status = Discovered. Outreach Queue view shows prioritized first-contact list · 50条记录录入Airtable B2B表格，至少包含：商业名称、网站、邮箱、分类、状态=已发现。外联队列视图显示优先级排序的首次联系清单

---

## Phase 1 Completion Checklist · 第一阶段完成核查清单

Use this checklist to confirm Phase 1 is complete before moving to Phase 2.  
在进入第二阶段之前，使用此核查清单确认第一阶段已完成。

### P0 — Critical Fixes · P0 — 关键修复

Legend · 图例: ✅ Complete · 已完成 | 🔧 Code done, needs founder action · 代码已完成，需创始人操作 | ⏳ Awaiting prerequisite · 等待前提条件

- 🔧 GA4 property created, Measurement ID retrieved — *Founder: create property at analytics.google.com*  
  GA4属性已创建，测量ID已获取——*创始人：在analytics.google.com创建属性*
- ✅ GA4 script added to all 9 HTML files (`index`, `about`, `collections`, `other-collections`, `custom`, `stories`, `journal`, `documentary`, `contact`) — *Completed April 7–8, 2026*  
  GA4脚本已添加至全部9个HTML文件——*完成于2026年4月7-8日*
- ⏳ GA4 verified: real-time report shows active users on site — *Pending: replace `G-XXXXXXXXXX` with real Measurement ID first*  
  GA4已验证：实时报告显示网站上的活跃用户——*待处理：先替换`G-XXXXXXXXXX`为真实测量ID*
- 🔧 Mailchimp account created, audience "Silora Orient — Main List" configured — *Founder: create at mailchimp.com*  
  Mailchimp账户已创建，受众列表"Silora Orient — Main List"已配置——*创始人：在mailchimp.com创建*
- ✅ `/api/subscribe.js` created and deployed to Vercel — *Completed April 8, 2026*  
  `/api/subscribe.js`已创建并部署至Vercel——*完成于2026年4月8日*
- 🔧 Environment variables set in Vercel: `MAILCHIMP_API_KEY`, `MAILCHIMP_AUDIENCE_ID`, `MAILCHIMP_DC` — *Founder: set in Vercel Dashboard → Project Settings → Environment Variables*  
  Vercel中已设置环境变量——*创始人：在Vercel后台 → 项目设置 → 环境变量中设置*
- ⏳ Newsletter form tested: submit email → appears in Mailchimp audience within 30 seconds — *Pending: Mailchimp env vars must be set first*  
  订阅表单已测试：提交邮箱 → 30秒内出现在Mailchimp受众列表中——*待处理：需先设置Mailchimp环境变量*
- 🔧 Airtable base created: `SILORA ORIENT — Operations` — *Founder: follow `admin/airtable-schema.md`*  
  Airtable数据库已创建——*创始人：按照`admin/airtable-schema.md`操作*
- 🔧 Customers table built with all 26 required fields — *Founder: schema defined in `admin/airtable-schema.md`*  
  客户表已建立，含全部26个必填字段——*创始人：架构已在`admin/airtable-schema.md`中定义*
- 🔧 Commissions table built with all 24 required fields and 14-state status flow — *Founder: schema defined in `admin/airtable-schema.md`*  
  定制订单表已建立，含全部24个必填字段和14状态流转——*创始人：架构已在`admin/airtable-schema.md`中定义*
- 🔧 Seven Airtable views created for Commissions (including Kanban) — *Founder: view specs in `admin/airtable-schema.md`*  
  已创建七个定制订单视图（含看板）——*创始人：视图规格在`admin/airtable-schema.md`中*

### P1 — Channel Connections · P1 — 渠道连接

- 🔧 Zapier account created at zapier.com — *Founder action required*  
  Zapier账户已在zapier.com创建——*需创始人操作*
- 🔧 Zap 1 created: Formspree `xlgopzqb` → Airtable Customer + Commission records — *Founder: follow `admin/zapier-setup.md`*  
  Zap 1已创建：Formspree `xlgopzqb` → Airtable客户+定制订单记录——*创始人：按`admin/zapier-setup.md`操作*
- 🔧 Zap 2 created: Formspree contact → Airtable Customer only (with subject filter) — *Founder: follow `admin/zapier-setup.md`*  
  Zap 2已创建：Formspree联系表单 → 仅Airtable客户记录（含主题过滤器）——*创始人：按`admin/zapier-setup.md`操作*
- ⏳ Zap tested: submit test form on `custom.html` → records appear in Airtable — *Pending: Airtable base and Zaps must be live first*  
  Zap已测试：在`custom.html`提交测试表单 → 记录出现在Airtable中——*待处理：需先完成Airtable数据库和Zap配置*
- 🔧 Cal.com account created, Google Calendar connected — *Founder: create at cal.com, connect via Settings → Calendars*  
  Cal.com账户已创建，Google日历已连接——*创始人：在cal.com创建，通过设置→日历连接*
- 🔧 Consultation event type configured: "Custom Jewelry Consultation · 定制珠宝咨询" (45 min, 15-min buffer) — *Founder action*  
  咨询活动类型已配置（45分钟、15分钟缓冲时间）——*需创始人操作*
- 🔧 Confirmation email copy customized in Cal.com with brand language — *Founder action*  
  Cal.com中确认邮件文案已用品牌语言自定义——*需创始人操作*
- ✅ Cal.com booking section added to `custom.html` with inline embed and `booking_click` GA4 event — *Completed April 8, 2026*  
  Cal.com预约区域已添加至`custom.html`，含内嵌插件及`booking_click` GA4事件——*完成于2026年4月8日*
- 🔧 Replace `YOUR_CAL_USERNAME` in `custom.html` with real Cal.com username — *Founder: edit `custom.html` line with `CAL_USERNAME`, then git push*  
  将`custom.html`中的`YOUR_CAL_USERNAME`替换为真实Cal.com用户名——*创始人：编辑`custom.html`中`CAL_USERNAME`一行，然后git push*
- 🔧 Stripe account created and verified (identity + bank account) — *Founder: create at stripe.com*  
  Stripe账户已创建并验证（身份+银行账户）——*创始人：在stripe.com创建*
- 🔧 All 15 payment links created (6 deposit × $100–$400, 6 balance × $100–$400, 3 workshop × $65/$85/$120) — *Founder: follow `admin/stripe-payment-links.md`*  
  全部15条支付链接已创建——*创始人：按`admin/stripe-payment-links.md`操作*
- 🔧 Test payment completed on Stripe using test card `4242 4242 4242 4242` — *Founder action*  
  使用测试卡`4242 4242 4242 4242`完成Stripe测试支付——*需创始人操作*

### P2 — Forward Momentum · P2 — 持续动力

- ⏳ Mailchimp Customer Journey created (3-email welcome sequence) — *Not started · 未开始*  
  Mailchimp客户旅程已创建（3封欢迎序列）——*未开始*
- ⏳ Three welcome emails written and configured in Customer Journey — *Email copy exists in roadmap; needs Mailchimp setup first*  
  三封欢迎邮件已撰写并在客户旅程中配置——*邮件文案已在路线图中；需先完成Mailchimp配置*
- ⏳ Welcome automation tested: subscribe test email → all three emails received within 7 days — *Not started · 未开始*  
  欢迎自动化已测试：订阅测试邮箱 → 7天内收到全部三封邮件——*未开始*
- ⏳ B2B Partners table added to Airtable (27 fields, 12 statuses, 7 views) — *Not started; depends on Airtable base being live · 未开始；依赖Airtable数据库上线*  
  B2B合作方表已添加至Airtable——*未开始；依赖Airtable数据库上线*
- ⏳ Seven B2B views created — *Not started · 未开始*  
  已创建七个B2B视图——*未开始*
- ⏳ 50 initial B2B target records entered (NYC boutiques, concept stores, galleries, cultural institutions, stylists) — *Not started · 未开始*  
  已录入50条初始B2B目标记录（纽约精品店、概念店、画廊、文化机构、造型师）——*未开始*

---

## Dependencies Map · 依赖关系图

```
GA4 account
    └─→ Task 1.0.A (install GA4)
            └─→ Custom events in main.js (1.5, after P0)

Mailchimp account
    └─→ Task 1.0.B (connect newsletter form)
            └─→ Task 1.2.A (welcome automation)

Airtable account
    └─→ Task 1.0.C (commission tracker)
            ├─→ Task 1.1.A (Formspree sync) — depends on Airtable base
            └─→ Task 1.2.B (B2B database) — adds table to same base

Zapier / Make account
    └─→ Task 1.1.A (Formspree sync) — depends on Airtable (1.0.C)

Cal.com account + Google Calendar
    └─→ Task 1.1.B (booking embed on custom.html)

Stripe account (verified)
    └─→ Task 1.1.C (payment links)
            └─→ Phase 2: Stripe deposit flow in commission workflow
```

---

## What Phase 1 Does Not Solve · 第一阶段未解决的问题

The following are intentionally deferred. They are important but do not need to be addressed before Phase 1 is complete.

以下内容已有意推迟。这些内容很重要，但不需要在第一阶段完成之前解决。

| Deferred Item · 推迟事项 | Why Deferred · 推迟原因 | Target Phase · 目标阶段 |
|-------------------------|------------------------|------------------------|
| Journal/content CMS · 日记/内容管理系统 | Git push is acceptable at current volume · 当前体量下git push可接受 | Phase 2 |
| Workshop public page · 工作坊公开页面 | Booking system must be stable first · 预约系统必须先稳定 | Phase 2 |
| Customer story second entry · 第二个客户故事 | Demonstrates Phase 2 intake process · 演示第二阶段采集流程 | Phase 2 |
| Quarterly issue dispatch · 季刊发送 | Mailchimp must be live and tested first · Mailchimp必须先上线并测试 | Phase 2 |
| B2B outreach begin · B2B外联启动 | Database must be built first · 数据库必须先建立 | After 1.2.B complete |
| Analytics review process · 分析审查流程 | Need 2–4 weeks of data first · 需要先积累2-4周数据 | Week 3 of Phase 1 |
| Custom admin dashboard · 自定义管理后台 | SaaS tools are sufficient now · 当前SaaS工具已足够 | Phase 3 |
| Unified backend database · 统一后端数据库 | Volume does not justify it yet · 体量尚未达到需要的程度 | Phase 3 |
| Privacy policy and consent management · 隐私政策与授权管理 | Should be reviewed alongside legal counsel · 应与法律顾问同步审查 | Phase 2 |

---

## Success Metrics for Phase 1 · 第一阶段成功指标

At the end of Phase 1, the following should be true:

第一阶段结束时，以下指标应达成：

| Metric · 指标 | Target · 目标 | How to Verify · 验证方式 |
|--------------|--------------|-------------------------|
| GA4 data flowing · GA4数据流入 | 100% of pages tracked · 100%页面已追踪 | GA4 realtime report · GA4实时报告 |
| Newsletter connected · 订阅表单已连接 | 0 fake subscribers; all new signups real · 0个假订阅者；所有新注册均为真实 | Mailchimp audience list · Mailchimp受众列表 |
| Commission tracker live · 定制订单追踪上线 | All active commissions logged · 所有活跃订单已记录 | Airtable view · Airtable视图 |
| Formspree sync working · Formspree同步运行 | Next inquiry appears in Airtable automatically · 下一条询价自动出现在Airtable | Submit test form · 提交测试表单 |
| Booking available · 预约可用 | Consultation slots visible and bookable · 咨询时间段可见且可预约 | Test booking on custom.html · 在custom.html测试预约 |
| Payment ready · 支付就绪 | At least one deposit collected via Stripe · 至少一笔定金通过Stripe收取 | Stripe dashboard · Stripe后台 |
| Welcome automation active · 欢迎自动化已激活 | Test subscriber receives 3 emails in 7 days · 测试订阅者在7天内收到3封邮件 | Test subscribe with personal email · 用个人邮箱测试订阅 |
| B2B database built · B2B数据库已建立 | 50 records, all with email and status · 50条记录，均含邮箱和状态 | Airtable B2B table count · Airtable B2B表格计数 |

---

## Handoff to Phase 2 · 移交至第二阶段

Phase 2 begins when all Phase 1 success metrics are met and the team has operated the new infrastructure for at least 2 weeks.

当所有第一阶段成功指标达成，且团队已运营新基础设施至少2周后，第二阶段启动。

**Phase 2 preview · 第二阶段预览:**

- Notion editorial workspace for journal draft → review → approve pipeline  
  Notion编辑工作区，用于日记草稿→审核→审批流程
- Airtable commission kanban as daily operational board  
  Airtable定制订单看板作为每日运营面板
- Customer story intake form with consent tracking  
  含授权追踪的客户故事采集表单
- Workshop public page (`workshops.html`) with Cal.com booking  
  工作坊公开页面（`workshops.html`），集成Cal.com预约
- First B2B outreach campaign using database built in Phase 1  
  使用第一阶段建立的数据库开展首次B2B外联活动
- Quarterly issue dry run: full end-to-end test of editorial pipeline + email dispatch  
  季刊演练：编辑流程+邮件发送的完整端到端测试

---

*Document maintained by · 文档维护方: SILORA ORIENT founding team · 创始团队*  
*Version · 版本: 1.0 · April 2026 · 2026年4月*  
*Status · 状态: Active — update as tasks are completed · 进行中 — 任务完成后请更新*
