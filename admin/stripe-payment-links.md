# SILORA ORIENT — Stripe Payment Links
# Stripe 支付链接管理

**Version · 版本:** 1.0 · April 2026  
**Purpose · 用途:** Track all Stripe payment links — paste links into commission approval emails  
**Estimated setup time · 预计配置时间:** 30–45 minutes

---

## Stripe Account Setup · Stripe账户配置

If not yet done:
1. Create account at stripe.com
2. Complete identity verification (requires government ID)
3. Add bank account for payouts: Dashboard → Settings → Bank accounts
4. Activate your account — required before any real payments can be collected

---

## Payment Links to Create · 需创建的支付链接

Create each of these in Stripe: **Dashboard → Payment Links → + New**

For each link:
- Product name: use exactly the name in the table
- Price: set the amount
- Currency: USD
- Quantity: 1, not adjustable
- After payment: show confirmation page (default)

### Commission Deposit Links · 定制订单定金链接

| Link Name (internal) · 链接名称 | Amount · 金额 | Stripe Product Name · Stripe产品名称 | Paste URL here · 粘贴链接 |
|--------------------------------|:------------:|-------------------------------------|--------------------------|
| Deposit — $100 | $100 | Commission Deposit — Silora Orient | |
| Deposit — $150 | $150 | Commission Deposit — Silora Orient | |
| Deposit — $200 | $200 | Commission Deposit — Silora Orient | |
| Deposit — $250 | $250 | Commission Deposit — Silora Orient | |
| Deposit — $300 | $300 | Commission Deposit — Silora Orient | |
| Deposit — $400 | $400 | Commission Deposit — Silora Orient | |

### Commission Balance Links · 定制订单尾款链接

| Link Name · 链接名称 | Amount · 金额 | Stripe Product Name | Paste URL here |
|--------------------|:------------:|---------------------|---------------|
| Balance — $100 | $100 | Commission Balance — Silora Orient | |
| Balance — $150 | $150 | Commission Balance — Silora Orient | |
| Balance — $200 | $200 | Commission Balance — Silora Orient | |
| Balance — $250 | $250 | Commission Balance — Silora Orient | |
| Balance — $300 | $300 | Commission Balance — Silora Orient | |
| Balance — $400 | $400 | Commission Balance — Silora Orient | |

### Workshop / Event Links · 工作坊/活动链接

| Link Name · 链接名称 | Amount · 金额 | Stripe Product Name | Paste URL here |
|--------------------|:------------:|---------------------|---------------|
| Workshop Seat — $65 | $65 | Workshop — Silora Orient | |
| Workshop Seat — $85 | $85 | Workshop — Silora Orient | |
| Workshop Seat — $120 | $120 | Workshop — Silora Orient | |

---

## How to Use Payment Links · 支付链接使用方式

### For a custom commission deposit · 定制订单定金

1. Commission approved by customer → Airtable: status = `Approved`
2. Calculate 50% deposit amount
3. Find the matching link from the table above
4. Copy the Stripe link
5. Paste into approval email to customer:

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

6. After customer pays → Stripe sends automatic receipt
7. Update Airtable: Payment Status = `Deposit Paid`, Status = `In Production`
8. Copy Stripe Payment ID from Stripe Dashboard → paste into Airtable commission record

### For commission balance · 定制订单尾款

Same flow — use Balance links instead of Deposit links. Send the balance link when the piece is complete and ready to ship.

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

---

## Custom Amount (for non-standard quotes) · 自定义金额

For commissions that don't match a pre-built link amount:

**Option A — Create a new link on the spot:**
Stripe Dashboard → Payment Links → + New → set exact amount → copy link immediately

**Option B — Use Stripe Invoice:**
Dashboard → Customers → find or create customer → New Invoice → add line item with exact amount → Send

Invoices are better for B2B orders as they provide a formal record with payment terms.

---

## Tracking Payments in Airtable · 在Airtable中追踪支付

After any payment is received:

| Step · 步骤 | Action · 操作 |
|------------|-------------|
| 1 | Open Stripe Dashboard → Payments → find the payment |
| 2 | Copy the Payment ID (format: `pi_xxxxxxxxxx`) |
| 3 | Open Airtable → Commissions → find the relevant commission |
| 4 | Update: Payment Status, amount received, paste Stripe Payment ID in Notes |
| 5 | Update: Commission Status to next stage |

---

## Refunds · 退款

All refunds must be processed by the Founder only.

1. Stripe Dashboard → Payments → find the payment → Refund
2. Choose: Full refund or partial amount
3. Reason: select from dropdown (duplicate, fraudulent, requested by customer)
4. Update Airtable: Payment Status = `Refunded`
5. Email customer confirmation

**Policy reminder · 政策提醒:** Deposits are non-refundable once production has begun. Full refund available if customer cancels before `In Production` status.

---

## Test Mode Checklist · 测试模式核查清单

Before going live with real payments, test in Stripe test mode:

- [ ] Stripe account in test mode (orange "Test mode" banner visible)
- [ ] Create one test payment link
- [ ] Use Stripe test card: `4242 4242 4242 4242` · Any future expiry · Any CVV
- [ ] Payment appears in Stripe test dashboard
- [ ] Switch to Live mode when ready for real transactions
- [ ] Re-create payment links in Live mode (test links don't carry over)

---

## Stripe Dashboard Quick Reference · Stripe后台快速参考

| Task · 任务 | Path · 路径 |
|------------|------------|
| View all payments · 查看所有支付 | Dashboard → Payments |
| Create payment link · 创建支付链接 | Dashboard → Payment Links → + New |
| Issue refund · 退款 | Dashboard → Payments → [payment] → Refund |
| Send invoice · 发送发票 | Dashboard → Invoices → + New |
| View payouts · 查看提款 | Dashboard → Balances → Payouts |
| Download tax report · 下载税务报告 | Dashboard → Reports |

---

*Document version: 1.0 · April 2026*  
*Fill in the Paste URL column as you create each link in Stripe*  
*Next: Task 1.2.A — Mailchimp welcome automation*
