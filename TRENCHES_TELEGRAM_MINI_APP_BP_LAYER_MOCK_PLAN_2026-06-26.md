# Trenches Telegram Mini App BP Layer Mock Plan

**Date:** 2026-06-26  
**Owner:** Timi  
**Review:** TBO, Kimi  
**Product Decision:** Ize  
**Reference App:** `/Users/tbo/Downloads/MiniApp/`  
**Status:** Approved direction for mock planning. Not yet implemented.

---

## 1. Product Direction

The Telegram Mini App is the **BP economy and distribution layer** of Trenches.

It is not the Finance app.
It is not the Social app.
It is not a Spray companion app only.

The Mini App should help users:

- Earn BP through missions, raids, content, and referrals.
- Track BP balance.
- Send BP to other users.
- Receive BP from other users.
- Track submissions and approvals.
- Receive urgent alerts, campaign notices, or account warnings.

The Finance PWA may consume/check BP for products such as Spray, but the Telegram Mini App should not be framed mainly around Spray eligibility.

---

## 2. What Stays In Each Product

### Telegram Mini App

- BP balance.
- BP earning missions.
- Daily tasks.
- Raid-style tasks.
- Pinned content submission.
- Submissions history.
- Referrals.
- BP send and receive wallet.
- Urgent notice card.

### Finance PWA

- Deposit.
- Withdraw.
- Wallet.
- Spray capital.
- Daily interest.
- Rewards.
- Unlocks.
- P2P.
- Transaction history.

### Social App

- Communities.
- Feed.
- Posts.
- Replies.
- Media.
- Social discussion.

---

## 3. Reference App Assessment

The local MiniApp already has a usable skeleton:

- Splash screen.
- X connection flow.
- External action screens.
- Missions screen.
- Daily and General tabs.
- Earnings screen.
- Submissions screen.
- Bottom navigation.
- Verification states: open, verifying, done.
- Telegram WebApp initialization.

We should evolve the existing skeleton instead of rebuilding from scratch.

---

## 4. Required V1 Screen Structure

Keep the mock minimal and close to the supplied screenshots.

### 4.1 Main Screen

This is the primary screen.

It should include:

- User name.
- User avatar.
- BP amount, e.g. `14P`.
- Top links:
  - `Earnings`
  - `Submissions`
  - `Referrals`
- Referral link copy field.
- Urgent notice card.
- Daily / General tabs.
- Mission list.

The BP amount must be clickable and should open the BP Wallet.

### 4.2 Urgent Notice Card

The card currently represented by `AIRDROP ACCOUNT REGISTRATION` in the reference screenshots becomes the single flexible announcement slot.

It can show:

- Airdrop registration.
- Urgent campaign news.
- BP low warning.
- Account action required.
- New raid live.
- Partner campaign update.
- Product maintenance notice.

Do not add multiple alert banners across the app. Use this one slot.

Example states:

- `AIRDROP ACCOUNT REGISTRATION`
  - `Register for airdrop`
  - `Deadline Jun 29, 2026, 2:00 PM`
- `URGENT: BP LOW`
  - `Add BP soon to avoid interruptions across active products.`
- `NEW RAID LIVE`
  - `Support the Arbitrum campaign before 6PM.`
- `CAMPAIGN UPDATE`
  - `New partner tasks are available.`

### 4.3 Daily Tab

Daily should contain recurring and time-sensitive actions.

This includes:

- Daily check-in.
- Like/repost/comment missions.
- Raid tasks.
- Visit campaign dashboard.
- Join short-term campaign push.
- Read campaign update.
- Poll/vote tasks.

The Daily tab should include all task/raid items that refresh frequently.

Daily card pattern:

- Project/platform icon.
- Title.
- Short description.
- Reward amount in BP/points.
- CTA: `GO`, `Join`, `Visit`, or `Verify`.

Example:

```text
Comment on Trenches Post (3P)
Comment on today's campaign post
GO
```

### 4.4 General Tab

General should contain evergreen tasks and the pinned content submission task.

Pinned item:

```text
Pinned Content Submission
Submit campaign content and earn BP after approval
Submit
```

Other General missions:

- Follow Trenches X account.
- Join Telegram channel.
- Join Discord.
- Connect X.
- Complete profile.
- Invite friends.
- Follow partner accounts.
- Join partner channels.

General is not for urgent raids. Those belong in Daily if active/time-sensitive.

### 4.5 Submissions Screen

Use the simple list style from the screenshots.

Each submission row should show:

- Submission/task title.
- Date/time.
- Awarded amount if approved.
- Status badge.

Statuses:

- `Approved`
- `Verifying`
- `Rejected`
- `Awarded`

Example:

```text
Comment on Trenches Post (3P)
Jun 26, 2026 at 12:40 PM · Awarded +3P
Approved
```

### 4.6 Referrals Screen

Keep it simple.

It should show:

- Total referrals.
- Invite link.
- Copy action.
- Direct referral list.
- Joined date.

Future versions may add referral BP earned per user, but it is not required for this mock.

### 4.7 BP Wallet

Rename the earlier "BP marketplace" idea to **BP Wallet**.

The BP Wallet opens when the user taps the BP balance, e.g. `14P`.

V1 wallet actions:

- Send BP.
- Receive BP.
- BP activity/history.

Do not include:

- Buy BP.
- Sell BP.
- Order book.
- Marketplace offers.
- Trading UI.

BP Wallet should feel lightweight, like a utility sheet or simple screen.

Suggested BP Wallet layout:

```text
BP Wallet
14P available

[Send BP]
[Receive BP]

Recent activity
- Earned +3P from Daily Check-in
- Sent -2P to @john
- Received +5P from @mary
```

Send BP flow:

- Recipient Telegram username or referral/user ID.
- Amount.
- Review.
- Confirm.
- Success.

Receive BP flow:

- User BP receive code/link.
- Copy button.
- Optional QR placeholder.

---

## 5. Navigation Model

Do not overbuild navigation.

Preferred V1:

- Main screen is the default.
- Top text links:
  - `Earnings`
  - `Submissions`
  - `Referrals`
- Daily / General tabs inside Main.
- BP Wallet opens from BP balance tap.

Avoid adding a heavy bottom navigation unless the existing MiniApp shell needs it for continuity.

If bottom navigation is retained from the reference app, reduce it to:

- `Missions`
- `Submissions`
- `Referrals`

Do not add `Market`.
Do not add `Finance`.
Do not add `Spray`.

---

## 6. Copy Rules

Use:

- `BP`
- `Earn BP`
- `Send BP`
- `Receive BP`
- `Submissions`
- `Referrals`
- `Daily Mission`
- `General Mission`
- `Approved`
- `Verifying`
- `Rejected`

Avoid:

- `Spray eligibility app`
- `Keep Spray active`
- `Buy BP`
- `Sell BP`
- `Trade BP`
- `Marketplace`
- `Finance`
- `Deposit`
- `Withdraw`
- `Capital`
- `Interest`
- `APY`

Exception:

If a user is actively spraying and their BP is low, the alert card may show a generic warning such as:

```text
BP LOW
Add BP soon to avoid interruptions across active products.
```

It should not make Spray the main identity of the Telegram app.

---

## 7. Visual Direction

Use the reference screenshots as the visual baseline:

- White / warm off-white canvas.
- Large rounded cards.
- Minimal chrome.
- Big BP number.
- Simple mission cards.
- Soft gray borders.
- Clear status pills.
- Telegram-native top controls.

Do not make it look like the Finance PWA.
Do not make it look like the Social app.
Do not add heavy dashboards, charts, or financial widgets.

The Telegram Mini App should feel fast, simple, and campaign-driven.

---

## 8. Required Mock Data

Use sample data close to the reference:

User:

- Name: `IzeCube`
- BP: `14P`
- Avatar initial or image.
- Referral link: `https://t.me/Trenches_Bot?start=ref_679483716`

Daily missions:

- `Daily Check-in`
- `Comment on Trenches Post (3P)`
- `Like on Trenches Post (3P)`
- `Retweet Trenches Post (3P)`
- `Visit Partner Dashboard`

General missions:

- `Pinned Content Submission`
- `Follow Trenches X Account (5P)`
- `Join Trenches Telegram (5P)`
- `Join Trenches Discord (5P)`
- `Follow Partner X Account`
- `Invite Friends`

Submissions:

- Approved daily check-in.
- Approved comment.
- Verifying content submission.
- Rejected proof example.

Referrals:

- 3 example users.

BP Wallet activity:

- Earned BP from task.
- Sent BP to another user.
- Received BP from another user.

---

## 9. Team Assignment

### Timi

Build the mock update from `/Users/tbo/Downloads/MiniApp/`.

Scope:

- Convert points to BP.
- Preserve the simple reference style.
- Add main screen with BP balance, alert card, Daily/General tabs.
- Make BP balance open BP Wallet.
- Add BP Wallet with Send and Receive only.
- Keep Submissions and Referrals simple.
- Add pinned content submission under General.
- Put raids inside Daily as mission cards.

Do not build buy/sell marketplace.
Do not build Finance screens.
Do not build Spray screens.

### Didi

Review copy and visual tone.

Ensure:

- BP feels like a participation asset.
- Missions feel simple and motivating.
- Copy does not overexplain Spray.
- Alert card copy is concise.

### Dev2

Create/extend smoke checks for:

- Main screen renders.
- BP balance opens BP Wallet.
- Send BP flow opens and confirms.
- Receive BP screen shows copyable link/code.
- Daily and General tabs switch.
- Pinned content submission exists in General.
- Submissions page renders statuses.
- Referrals page renders invite list.

### Kimi

Review that the Telegram Mini App remains product-bounded:

- No Finance flows.
- No Spray-specific positioning.
- No buy/sell BP market.
- No accidental backend assumptions in mock.

---

## 10. Acceptance Criteria

- Main screen matches the simplicity of the supplied screenshots.
- `AIRDROP ACCOUNT REGISTRATION` slot is replaced with a reusable urgent notice card.
- BP amount is clickable.
- BP Wallet opens from BP amount.
- BP Wallet includes only Send and Receive.
- Daily contains tasks and raids.
- General contains pinned content submission plus evergreen tasks.
- Submissions page shows latest submissions with status.
- Referrals page shows direct referrals.
- No Buy BP, Sell BP, or BP marketplace language.
- No Finance/PWA capital actions.
- No Spray-first framing.

---

## 11. Open Questions

These can be resolved during mock review:

- Should BP be displayed as `14P` or `14 BP`?
- Should Send BP require username only or user ID/referral link too?
- Should Receive BP show QR placeholder in V1?
- Should Earnings remain as a link label, or should it become `BP History`?

Default recommendation:

- Keep `14P` for visual continuity with the reference screenshots.
- Use `BP Wallet` internally for the screen title.
- Use `Earnings` link if matching the screenshots, but make it open BP history.

