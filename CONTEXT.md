# Project Context — Read This First

**Written:** 13 October 2026, as a handover into a fresh session.
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
| [`docs/META_APP_SETUP.md`](https://github.com/syedd176/rivon-dashboard/blob/main/docs/META_APP_SETUP.md) | **The Meta app process, researched from Meta's docs.** Claims labelled Confirmed / Likely / Check |
| `src/components/WhatsAppConnect.tsx` | Embedded Signup popup flow — the ManyChat-style connect |
| `src/app/api/oauth/whatsapp/exchange/route.ts` | Server-side token exchange, four calls to Meta |
| `src/lib/channels.ts` | Channel model and mock data |

---

## 3. Where things stand

### Repos

| Repo | URL | State |
|---|---|---|
| `Rivonai-agentic-layer` | github.com/syedd176/Rivonai-agentic-layer | Docs and research only. 1 commit. **Public** |
| `rivon-dashboard` | github.com/syedd176/rivon-dashboard | Next.js app, 5 commits. **Public** |

Live: **https://rivon-dashboard.vercel.app/channels**

### Accounts and tooling

| | Status |
|---|---|
| GitHub | `syedd176` active. Commits as `syedd176 <syedkarawan@gmail.com>` |
| Vercel | Authenticated, dashboard deployed |
| AWS | Profile `rivon`, IAM user `hussnain-dev-rivon`, account `640012952997`, region `ap-southeast-2` |
| Meta app | Created, named **Rivon**, App ID `2208094983924664`. **Unpublished** |

🔴 **Unresolved security issue.** The AWS access key `AKIAZKA56UWSXVSG3PDL` was
pasted into chat with its secret visible, three times. The IAM user holds
**`AdministratorAccess`**. The key has not been rotated. Deactivate it, delete
it, create a new one, re-run `aws configure --profile rivon`, and narrow the
policy to `AmazonS3FullAccess`.

### What is built

**Channels page** — four rows (WhatsApp, Instagram, Messenger, web widget),
three states each: connected, **needs attention**, not connected. The middle one
matters most: a dead token means the tenant silently stops receiving leads.

**WhatsApp Embedded Signup** — the real Meta flow, same as ManyChat. The owner
sees Meta's eight-screen popup. Two things come back from two places in no
guaranteed order: an exchangeable `code` from the `FB.login` callback (expires
in **30 seconds**) and `waba_id` + `phone_number_id` from a window message.
Both are needed, so the payload is held in a ref until the code arrives.

Server side does four calls: exchange code → business token, register the
number for Cloud API, subscribe to webhooks on the WABA, read the display
number back. The app secret never leaves the server.

**Not built:** everything else. No backend, no database, no agent. Channel data
is mocked in `src/lib/channels.ts`.

---

## 4. The Meta app — where it is blocked

Created as **Rivon**, App ID `2208094983924664`, currently unpublished.

### The structure, because it confuses people

**One Meta app, ours, reviewed once. Many tenants connect their own numbers
through it.** A business owner clicking Connect is authorising *our* app to
reach *their* WhatsApp account. They never create an app. Same as ManyChat,
Twilio, Zapier.

### Remaining steps

| # | Step | State |
|---|---|---|
| 1 | Create app with the WhatsApp use case | ✅ Done |
| 2 | App icon, Privacy Policy URL, Category | ⚠️ **Blocking submission.** Category: pick "Business and pages" |
| 3 | **Become a Tech Provider** | ❌ Not started. **This gates App Review itself** — the dashboard says so explicitly. Includes access verification |
| 4 | Business Verification | ❌ Not started. Days–weeks |
| 5 | App Review for `whatsapp_business_management` + `whatsapp_business_messaging` | ❌ Not started. Weeks |
| 6 | Login for Business **configuration** with the WhatsApp Embedded Signup variation | ❌ **This was the live task when the session ended** |
| 7 | Allowlist domains in Client OAuth settings | ❌ Not started |
| 8 | Add teammates as app roles | ❌ Not started — but see below |

**Step 6 was in progress.** Facebook Login for Business → Configurations →
Create configuration → name it → **login variation: WhatsApp Embedded Signup**
→ User access token → permissions `whatsapp_business_management` and
`whatsapp_business_messaging` → Create → copy the Configuration ID into
`NEXT_PUBLIC_META_CONFIG_ID`.

⚠️ **Embedded Signup v2 was deprecated 15 October 2026.** Make sure the
configuration is v4.

### The unblock nobody should miss

**Add the four teammates as app roles.** In development mode, permissions work
for anyone with an admin/developer/tester role on the app — so the whole
Embedded Signup flow is testable **today**, against your own WhatsApp numbers,
without waiting weeks for review.

### Two constraints that bite later

- **Onboarding is capped at 10 new customers per rolling 7 days** until
  Business Verification, App Review *and* Access Verification are all complete.
  Then 200.
- Under **Tech Provider** status (which is what we want — Solution Partner
  means fronting every tenant's messaging costs), **the tenant must add their
  own payment method to their WABA before they can send anything.** The
  Embedded Signup popup does not cover that step. The channels UI needs to
  detect and explain that state.

### Vercel environment variables, still unset

| Name | Visibility |
|---|---|
| `NEXT_PUBLIC_META_APP_ID` | 🌐 Public — `2208094983924664` |
| `NEXT_PUBLIC_META_CONFIG_ID` | 🌐 Public — from step 6 |
| `META_APP_ID` | 🔒 Server |
| `META_APP_SECRET` | 🔒 **Server only, never `NEXT_PUBLIC_`** |
| `WHATSAPP_REGISTER_PIN` | 🔒 Server — six digits you invent |
| `APP_URL` | 🔒 `https://rivon-dashboard.vercel.app` |

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

In cost-to-answer order, from `TEAM_SPLIT.md` §5:

| # | Task | Effort | Owner |
|---|---|---|---|
| 0 | 🔴 **Rotate the exposed AWS key** | 5 min | Whoever reads this first |
| 1 | Finish the Login for Business configuration (§4 step 6) | 15 min | Ali |
| 2 | Add teammates as Meta app roles — unblocks testing without review | 10 min | Ali |
| 3 | Start Tech Provider + Business Verification — longest lead time | Hours, then weeks of waiting | Ali |
| 4 | Verify the messaging service-window pricing change | 1 hour | Ali |
| 5 | **The 25–40 customer calls** | 2 days | **All four**, one trade each |
| 6 | Permission emails to ServiceM8 and Housecall Pro | 1 hour | Maryam |
| 7 | **Start the pre-priced library** | Weeks | Noman · Tehman |
| 8 | Agree the `requirements.extracted` payload | Half a day | Contract owner + all four |

**Task 5 can invalidate the product thesis.** Whether customers message or
phone is unresolved, and every published figure on both sides is vendor
marketing.

### The recommendation that keeps being deferred

**Build the web widget.** It needs no Meta app, no App Review, no Business
Verification, no payment method — and it exercises the *identical* inbound
path: webhook → normalise → classify → extract → reply. Only the adapter
differs.

It is how Team A tests the whole agent while Meta takes weeks. The design calls
for exactly this in `SYSTEM_DESIGN.md` §5.1: *"the whole system must be testable
and demoable with no live WhatsApp connection."*

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
