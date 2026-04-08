# SILORA ORIENT — Zapier Automation Setup
# Zapier 自动化配置指南

**Version · 版本:** 1.0 · April 2026  
**Purpose · 用途:** Auto-sync all Formspree form submissions into Airtable  
**Estimated setup time · 预计配置时间:** 45–60 minutes  
**Zapier plan required · 所需Zapier套餐:** Free tier (100 tasks/month) is sufficient for current volume

---

## Overview · 概览

When a customer submits the custom order form or contact form on the website, Formspree emails the founder. Without this Zapier automation, every inquiry only lives in an inbox — if it is missed or archived, it is gone.

This automation adds a second, automatic action: the moment any form is submitted, a record appears in Airtable. No manual entry. No missed inquiries.

当客户提交网站上的定制订单表单或联系表单时，Formspree会向创始人发送邮件。没有此Zapier自动化，每条询价只存在于收件箱中——一旦遗漏或归档，便永久丢失。

此自动化添加第二个自动操作：任何表单提交后，Airtable中即刻生成记录。无需手动录入，不再遗漏询价。

---

## Prerequisites · 前提条件

Before starting, confirm these are ready:

| Item · 项目 | Status · 状态 | Where to find · 获取位置 |
|------------|--------------|------------------------|
| Zapier account created | ☐ | zapier.com — free account |
| Airtable base created | ☐ | From `admin/airtable-schema.md` |
| Airtable API key | ☐ | Airtable → Account → Developer Hub → Personal access tokens |
| Airtable Base ID | ☐ | Open base in browser → URL: `airtable.com/[BASE_ID]/...` |
| Formspree form ID | ✅ | `xlgopzqb` (already in codebase) |

---

## Zap 1 — Custom Order Form → Airtable
## Zap 1 — 定制订单表单 → Airtable

This is the highest-priority automation. Every custom order inquiry must be captured.

这是最高优先级的自动化。每条定制订单询价必须被捕获。

### Step 1: Create a new Zap · 创建新Zap

1. Go to zapier.com → **Create** → **New Zap**
2. Name it: `Silora — Custom Order → Airtable`

---

### Step 2: Set the Trigger · 设置触发器

- **App:** Formspree
- **Event:** New Submission
- **Account:** Connect your Formspree account (login with same email)
- **Form:** Select `xlgopzqb` (or the form named "Custom Order")

**Test trigger · 测试触发器:**
Submit a test entry on `custom.html` with:
- Name: `Test User`
- Email: `test@test.com`
- Any selections through the steps

Zapier should detect this submission. If it does not appear, wait 2 minutes and click "Refresh".

---

### Step 3: Action 1 — Create Customer in Airtable · 操作1 — 在Airtable创建客户

- **App:** Airtable
- **Event:** Create Record
- **Account:** Connect Airtable (authorize via OAuth)
- **Base:** `SILORA ORIENT — Operations`
- **Table:** `Customers`

**Field mapping · 字段映射:**

| Airtable Field · Airtable字段 | Zapier Value · Zapier值 |
|------------------------------|------------------------|
| Name | `{{name}}` from Formspree |
| Email | `{{email}}` from Formspree |
| Customer Type | *(static)* `B2C` |
| Source | *(static)* `Website Form` |
| First Contact Date | `{{zap_meta_human_now}}` |
| Last Contact Date | `{{zap_meta_human_now}}` |
| Story Notes | `{{message}}` from Formspree |
| Newsletter Status | *(static)* `Not Subscribed` |
| Consent Given | *(static)* `false` |
| Brand Relationship Stage | *(static)* `Prospect` |

> **Note · 说明:** Leave all other fields blank for now. The founder fills in story notes, color preferences, and eye color after the consultation.

---

### Step 4: Action 2 — Create Commission in Airtable · 操作2 — 在Airtable创建定制订单

- **App:** Airtable
- **Event:** Create Record
- **Base:** `SILORA ORIENT — Operations`
- **Table:** `Commissions`

**Field mapping · 字段映射:**

| Airtable Field · Airtable字段 | Zapier Value · Zapier值 |
|------------------------------|------------------------|
| Customer | ID from Action 1 (the record just created) |
| Status | *(static)* `Inquiry` |
| Payment Status | *(static)* `Unpaid` |
| Inquiry Date | `{{zap_meta_human_now}}` |
| Inquiry Source | *(static)* `Website Form` |
| Notes | Full message body from Formspree `{{message}}` |

> **How to link Customer field · 如何关联客户字段:** In the Customer field, select "Custom" and paste the Airtable Record ID returned by Action 1. Zapier shows this as `{{1. Record ID}}` in the dropdown.

---

### Step 5: Turn on the Zap · 开启Zap

Toggle the Zap to **ON**. Zapier will check Formspree every 15 minutes (free plan) or near-instantly (paid plan).

---

## Zap 2 — Contact Form → Airtable
## Zap 2 — 联系表单 → Airtable

Same structure as Zap 1, but for general contact form submissions. These become Customer records only (no Commission record, since it may not be an order inquiry).

与Zap 1结构相同，但适用于一般联系表单提交。这些仅创建客户记录（不创建定制订单记录，因为可能不是订购询价）。

### Trigger · 触发器
Same as Zap 1 — Formspree, same form ID `xlgopzqb`.

> **Note · 说明:** Formspree routes all forms with the same endpoint to the same Zap. To differentiate custom order vs contact, add a **Filter** step:
>
> Add a **Filter by Zapier** step between Trigger and Action:  
> Condition: `_subject` **Contains** `Custom Order`  
> This lets custom order Zap only fire on custom orders; a separate Zap for contact-only submissions can filter for `_subject` **Does not contain** `Custom Order`.

### Action — Create Customer record only · 操作 — 仅创建客户记录

| Airtable Field | Zapier Value |
|---------------|-------------|
| Name | `{{name}}` |
| Email | `{{email}}` |
| Customer Type | *(static)* `B2C` |
| Source | *(static)* `Website Form` |
| First Contact Date | `{{zap_meta_human_now}}` |
| Last Contact Date | `{{zap_meta_human_now}}` |
| Follow-up Notes | `{{message}}` |
| Brand Relationship Stage | *(static)* `Prospect` |

---

## Verification Checklist · 验证核查清单

Complete these checks after both Zaps are live:

- [ ] Submit a test custom order on `custom.html` → record appears in Airtable **Customers** table within 15 minutes
- [ ] Same test → record also appears in **Commissions** table, linked to the customer
- [ ] Commission record shows: Status = `Inquiry`, Payment Status = `Unpaid`
- [ ] Customer record shows: Source = `Website Form`, Type = `B2C`
- [ ] Submit a test message on `contact.html` → record appears in **Customers** only (no Commission)
- [ ] Both Zaps show green "Success" in Zapier task history
- [ ] Zapier task count is within free tier limits (check: zapier.com → Usage)

---

## Ongoing Operations · 日常运维

### What happens after the Zap runs · Zap运行后的操作

After each new Airtable record appears:

1. **Founder reviews** Airtable "New Inquiries" view daily
2. **Respond to customer** within 24 hours of inquiry
3. **Update Commission status** from `Inquiry` → `Consultation Scheduled`
4. **Fill in story notes** after the consultation call

### If a Zap fails · 如果Zap失败

- Zapier sends an email notification on task failure
- The original Formspree email to the founder still arrives — no inquiry is lost
- Check zapier.com → Zap history → find failed task → "Replay" to retry

### Task usage estimate · 任务用量估算

| Scenario · 场景 | Tasks/month · 每月任务数 |
|----------------|------------------------|
| 5 custom orders + 5 contact messages | 20 tasks (2 per submission for custom, 1 for contact) |
| 20 custom orders + 20 contact messages | 60 tasks |
| Free tier limit | 100 tasks |

Free tier is sufficient until approximately 30 form submissions per month. Upgrade to Zapier Starter ($20/month) if volume exceeds that.

---

## Alternative: Make (formerly Integromat) · 替代方案：Make

If Zapier free tier is too limiting, Make offers 1,000 operations/month on its free plan — 10× more than Zapier. The setup is nearly identical:

- Trigger: Webhooks → Custom webhook (paste URL into Formspree webhook settings)
- Action 1: Airtable → Create a record (Customers)
- Action 2: Airtable → Create a record (Commissions)

Make webhook URL is set in Formspree: Form Settings → Integrations → Webhook → paste Make URL.

---

*Document version: 1.0 · April 2026*  
*Next: Task 1.1.B — Cal.com booking embed on custom.html*
