# Project Context — Read This First

**Written:** 13 October 2026. **Updated:** 19 October 2026 — all three channels
now connect, send and receive; §3, §4 and §7 rewritten.
**Purpose:** everything a new session needs before touching anything. Read the
files in §2 before making changes; they carry the reasoning this file only
summarises.

---

## 1. What the product is

An AI agent that answers a small service business's customers on WhatsApp,
Instagram and Facebook Messenger. It qualifies the job by conversation, checks
whether the business can actually do it — parts in stock, crew free, customer
inside the area covered — prices it from the business's own rate card, and the
**owner approves from their phone before anything reaches the customer**.

| | |
|---|---|
| **Market** | UK and Ireland. **English-only** — this is a decided constraint, not a default |
| **Industries** | Pest control, cleaning, removals. EV charging as a cheap test |
| **Not** | Solar, heat pumps, roofing, general building, emergency trades — all ruled out on evidence, see §5 |
| **Model** | Multi-tenant SaaS, one FastAPI deployable, Next.js dashboard on Vercel |

### The one rule that governs everything

> **The language model never produces a number that commits the business.**
> Deterministic code computes the price from structured data a human approved.
> The model writes the prose around it.

This is not stylistic. Whole-document extraction accuracy is 28–77%, and
**46.89% of table-reading errors still produce a correct-looking answer** — the
failure is silent. A quoted price binds: Sweden caps overrun at 15% by statute,
a Toronto dealership paid ~$27k on an AI-quoted price in 2026, and *Moffatt v
Air Canada* (2024) rejected the "the chatbot is a separate agent" defence.

⚠️ The rule is often mis-justified by pointing at AI regulation. **That is
wrong** — the relevant annex covers pricing only for life and health insurance.
The real exposure is contract law, which is larger. Do not let anyone relax the
rule on the grounds that "the AI Act doesn't apply."

---

## 2. Files that matter, in reading order

### In this repo (`C:\Users\hussn\Documents\rivon`)

| File | What it is | Read when |
|---|---|---|
| [`SYSTEM_DESIGN.md`](SYSTEM_DESIGN.md) | **The architecture.** 13 modules, data model, event contracts, every diagram. ~83KB | Touching any part of the system |
| [`AGENTIC_LAYER.md`](AGENTIC_LAYER.md) | AI layer: model routing, cost per task, prompt caching, escalation. §1–2 before any AI code | Working on Team A |
| [`TEAM_SPLIT.md`](TEAM_SPLIT.md) | Who owns what and why the line is there | Assigning work |
| [`TEAM_SCOPES.md`](TEAM_SCOPES.md) | Every deliverable, boundary and deliberate exclusion | Starting a task |
| [`STRATEGY_FINDINGS.md`](STRATEGY_FINDINGS.md) | What the research concluded and what it changed | Questioning a decision |
| [`research/`](research/) | Six raw reports, ~400 sources | Checking a specific claim |

### In the dashboard repo (`C:\Users\hussn\Documents\rivon-dashboard`)

| File | What it is |
|---|---|
| [`docs/CHANNEL_SETUP_RECORD.md`](https://github.com/syedd176/rivon-dashboard/blob/main/docs/CHANNEL_SETUP_RECORD.md) | **Read this before touching any channel.** Every Meta setting, every environment variable, the database shape, the traps, the known gaps |
| [`docs/META_APP_SETUP.md`](https://github.com/syedd176/rivon-dashboard/blob/main/docs/META_APP_SETUP.md) | The *plan*, written before the build. Superseded where the two disagree |
| `src/app/api/webhooks/whatsapp/route.ts` | One endpoint for all three channels; routes on `body.object` |
| `src/lib/channels-store.ts` | Both channel tables and credential lookup |
| `src/app/api/oauth/*/` | Four connect flows — WhatsApp, Instagram ×2, Messenger |

---

## 3. Where things stand

### Repos

| Repo | URL | State |
|---|---|---|
| `Rivonai-agentic-layer` | github.com/syedd176/Rivonai-agentic-layer | Docs and research only. **Public** |
| `rivon-dashboard` | github.com/syedd176/rivon-dashboard | Next.js app, three channels live. **Public** |

Live: **https://rivon-dashboard.vercel.app/channels** and `/inbox`

### Accounts and tooling

| | Status |
|---|---|
| GitHub | `syedd176` active. Commits as `syedd176 <syedkarawan@gmail.com>` |
| Vercel | Authenticated, dashboard deployed |
| AWS | Profile `rivon`, IAM user `hussnain-dev-rivon`, account `640012952997`, region `ap-southeast-2` |
| Meta app | **Rivon**, App ID `2208094983924664`. **Published.** Business portfolio: Aylestone Taxis Uk |
| Neon Postgres | Live. Channels, inbound messages and statuses all persisted |

🔴 **Unresolved security issues, all three declined or deferred by the user.**

1. AWS key `AKIAZKA56UWSXVSG3PDL` was pasted in chat with its secret, three
   times. The IAM user holds **`AdministratorAccess`**. Not rotated. Deactivate,
   delete, recreate, re-run `aws configure --profile rivon`, narrow to
   `AmazonS3FullAccess`.
2. `META_APP_SECRET` was pasted in chat and is still in use.
3. Two Facebook **Page access tokens** and an Instagram test-user token were
   pasted in chat. The Page tokens can send messages as Aylestone until
   revoked — bin icon on Messenger API Setup. The database holds its own token
   from OAuth, so revoking costs nothing.

### What is built

**All three channels connect, receive and reply.** Verified end to end on real
accounts, not mocks.

| Channel | Receive | Reply |
|---|---|---|
| WhatsApp | ✅ | ✅ |
| Instagram DMs | ✅ | ✅ |
| Instagram comments | ✅ | ✅ |
| Facebook Messenger | ✅ | ✅ |

**One webhook** at `/api/webhooks/whatsapp` serves all three, routing on
`body.object`. Every parser normalises to one `NormalisedMessage`, so one inbox
and one send path cover everything. A fourth channel is a start route, a
callback and a parser.

**Four connect flows:** WhatsApp Embedded Signup, Instagram Login (primary),
Instagram via Facebook Login (alternative), and Messenger via Facebook Login
for Business.

**Persisted in Neon Postgres** — channels, tokens, inbound messages, delivery
statuses. A daily cron refreshes 60-day Instagram tokens.

**Not built:** the agent. Everything between "message stored" and "reply sent"
is a human typing in `/inbox`. That is what the Human Agent permission was
submitted on, and it is honest today. Also no tenant resolution — the
`providerPhoneNumberId` → `tenant_id` lookup is still a TODO, and getting it
wrong sends one business's customers to another's agent.

⚠️ **Access tokens are stored in plain text.** Fine for our own accounts; must
be encrypted before a second tenant's credentials live in that table.

⚠️ **Facebook Page comments are silently dropped.** The parser matches
Instagram's `field: "comments"`; Pages send `field: "feed"`. The webhook
arrives, matches nothing, and is discarded with no log.

---

## 4. The Meta app — where it stands

**Rivon**, App ID `2208094983924664`, published, under the Aylestone Taxis Uk
business portfolio.

Full configuration detail is in
[`docs/CHANNEL_SETUP_RECORD.md`](https://github.com/syedd176/rivon-dashboard/blob/main/docs/CHANNEL_SETUP_RECORD.md).
This is the summary.

### The structure, because it confuses people

**One Meta app, ours, reviewed once. Many tenants connect their own numbers
through it.** A business owner clicking Connect is authorising *our* app to
reach *their* WhatsApp account. They never create an app. Same as ManyChat,
Twilio, Zapier.

### Steps, as at 19 October

| # | Step | State |
|---|---|---|
| 1 | App with three use cases (WhatsApp, Instagram Login, Messenger) | ✅ |
| 2 | Icon, Privacy Policy, Data Deletion URL, Category | ✅ |
| 3 | Tech Provider status | ✅ |
| 4 | Business Verification | ✅ |
| 5 | App Review — WhatsApp (`whatsapp_business_messaging` + `_management`) | ✅ **Approved first time** |
| 6 | Login for Business configurations — WhatsApp *and* Messenger | ✅ Both created |
| 7 | Redirect URIs allowlisted, Strict Mode on | ✅ Three URIs |
| 8 | Webhooks configured and **fields subscribed** on all three objects | ✅ |
| 9 | Real second account added as Tester | ✅ Haseeb Naqvi |
| 10 | App Review — Instagram ×3 + Messenger ×4 + Human Agent | ⏳ **Filled in, awaiting Meta's API-call counter** |

**Step 10 is the only open one.** Descriptions, screencasts, reproduction
instructions and the compliance boxes are all complete. Three cards still show
a grey tick for "required API test calls" — the calls were made and returned
200, but Meta's counter takes up to 24 hours. Check Review → App Review, and
submit once they go green.

⚠️ **Do not submit with a grey tick.** Meta rejects on unmet requirements and
it costs a round trip.

### Two constraints that bite later

- **Onboarding is capped at 10 new customers per rolling 7 days** until
  Business Verification, App Review *and* Access Verification are all complete.
  Then 200.
- Under **Tech Provider** status (which is what we want — Solution Partner
  means fronting every tenant's messaging costs), **the tenant must add their
  own payment method to their WABA before they can send anything.** The
  Embedded Signup popup does not cover that step. The channels UI needs to
  detect and explain that state.

### Vercel environment variables

All 14 are set in Production. `CHANNEL_SETUP_RECORD.md` §3 lists each one and
where its value came from. The ones that cause trouble:

- **`INSTAGRAM_APP_ID` / `INSTAGRAM_APP_SECRET`** are *not* the Meta app's.
  Instagram Login has its own pair, on the "API setup with Instagram login"
  page. Copy the secret with the **button** — the UI truncates the display, and
  a 19-character secret fails in ways that look like something else entirely.
- **`MESSENGER_CONFIG_ID`** — Facebook Login for Business rejects a plain
  `scope` list. Without a config id the dialog refuses with "this app needs at
  least one supported permission".
- ⚠️ Vercel applies variables **at build time**. Adding one without
  redeploying changes nothing.

---

## 5. Decisions already made — do not relitigate without new evidence

Each was tested by research and contradicted an earlier assumption. Reopening
one is allowed; doing it accidentally is not.

| Decision | Because |
|---|---|
| **Not solar** | EU market fell 0.7% in 2025, first decline since 2016. Dutch net metering ends Jan 2027. Dutch installer count down 17% in a year. Most software-saturated trade on the list |
| **Not heat pumps, roofing, general building** | Cannot be quoted without a site visit. Heat pumps are **legally barred** — certification mandates a room-by-room heat-loss survey |
| **No Jobber / ServiceM8 / Tradify connectors** | 60–80% of small UK trades use no such software; Jobber's terms appear to bar us outright; Tradify has no public API; an import yields ~30% of what we need and none of the conditional logic |
| **Build our own pre-priced library instead** | 150–300 items across the four trades, from published UK cost guides. The only onboarding mechanism that works for the whole market and needs nobody's permission |
| **UK + Ireland, English-only** | 67.6% of Dutch firms deal externally in Dutch only; Swedish product information is legally required in Swedish. **Sweden reopens if Swedish support is ever built** — its channel mix is fine |
| **Service mode before product mode** | Meta shipped a free agent inside WhatsApp in June 2026 covering product mode's common case; the feasibility differentiator is unoccupied |
| **Template-first onboarding, not upload-first** | Extraction cannot help when there is no document — a callout fee often lives in the owner's head |

---

## 6. Teams

| | **Team A — The Conversation** | **Team B — The Platform** |
|---|---|---|
| **Who** | Ali · Maryam | Noman · Tehman |
| **Owns** | Inbound message → structured decision | Structured decision → approved quote, and everything multi-tenant |
| **Modules** | `channels`, `conversations`, AI layer | `platform`, `business`, `feasibility`, `quotations`, dashboard |
| **The number** | Cost per conversation (~$0.07) | Time to first quote (15 min) |
| **Also** | Market research, competitor monitoring | **The pre-priced trade library** |

**The seam:** Team A emits `requirements.extracted`; Team B consumes it.

⚠️ **The payload shape is still TBD** and both teams are guessing until it
exists. A **contract owner** was called for in `TEAM_SPLIT.md` §3 and is still
unassigned.

Note: the user has chosen to run Team A on separate infrastructure for now,
connected by REST, moving to shared infra once the system works end to end.
That diverges from the outbox design in `SYSTEM_DESIGN.md` §5.5 — accepted
knowingly, flagged here so nobody treats the REST layer as permanent.

---

## 7. What to do next

Channel plumbing is done. What remains is the product.

| # | Task | Effort | Owner |
|---|---|---|---|
| 0 | 🔴 **Rotate the exposed AWS key and the Page tokens** | 10 min | Whoever reads this first |
| 1 | Submit App Review once the API counters go green (§4 step 10) | 10 min | Ali |
| 2 | **The 25–40 customer calls** | 2 days | **All four**, one trade each |
| 3 | Agree the `requirements.extracted` payload | Half a day | Contract owner + all four |
| 4 | **Start the pre-priced library** | Weeks | Noman · Tehman |
| 5 | Encrypt stored access tokens before a second tenant exists | Half a day | Noman · Tehman |
| 6 | Tenant resolution — `providerPhoneNumberId` → `tenant_id` | A day | Noman · Tehman |
| 7 | The agent itself — see `AGENTIC_LAYER.md` build order | Weeks | Ali · Maryam |
| 8 | Facebook Page comments (`field: "feed"`), + 2 permissions | A day | Ali · Maryam |
| 9 | Permission emails to ServiceM8 and Housecall Pro | 1 hour | Maryam |

**Task 2 can invalidate the product thesis** and is now the long pole. The
channels no longer block anything.

Whether customers message or phone is still unresolved, and every published
figure on both sides is vendor marketing.

### The web widget is no longer the critical path

It was the recommended unblock while Meta review loomed. Three live channels
now exercise the same inbound path — webhook → normalise → store — so Team A
can build the agent against real messages today. The widget remains worth
building as a fourth adapter, but it unblocks nothing.

What Team A actually needs now is the gap between "message stored" and "reply
sent". `AGENTIC_LAYER.md` has the build order; metering is step one.

---

## 8. Working notes for a new session

- **Dashboard is Next.js 16 / React 19 / Tailwind 4 / TypeScript.** Builds with
  `npm run build`; deploy with `npx vercel --prod`.
- **Both repos are public.** No secrets are committed; `.env*` is gitignored.
  But `research/05_service_platforms.md` quotes competitors' terms of service
  and analyses whether they would permit this product — publicly attributable.
- Commit attribution: `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`
- `handover/` in the rivon repo is a point-in-time copy for sharing and is
  **gitignored deliberately** — it duplicates the root and would drift.
- The AWS region is `ap-southeast-2` (Sydney) because the account assigned it.
  Fine for development. **EU tenant data must live in the EU** for production —
  `SYSTEM_DESIGN.md` §17.6.
