# Team Scopes — What Each Team Owns, and What Nobody Builds

**Companion to** [`TEAM_SPLIT.md`](TEAM_SPLIT.md) (why the split is drawn this way).
This document is the detail: every deliverable, every boundary, every exclusion.

**Scope basis:** v1 as defined in [`SYSTEM_DESIGN.md`](SYSTEM_DESIGN.md) §16.2,
narrowed by the research in [`STRATEGY_FINDINGS.md`](STRATEGY_FINDINGS.md).

> **How to use this.** If a task is not listed in your team's scope and not in
> §5 (shared), it is either the other team's or nobody's. Check before building
> it. Adding something to scope is a conversation, not a commit.

---

## Contents

1. [Scope at a glance](#1-scope-at-a-glance)
2. [Team A — The Conversation](#2-team-a--the-conversation)
3. [Team B — The Platform](#3-team-b--the-platform)
4. [The boundary between them](#4-the-boundary-between-them)
5. [Shared work](#5-shared-work)
6. [Out of scope for v1 — deferred](#6-out-of-scope-for-v1--deferred)
7. [Out of scope permanently — killed by research](#7-out-of-scope-permanently--killed-by-research)
8. [Out of scope by positioning](#8-out-of-scope-by-positioning)
9. [Grey areas, decided](#9-grey-areas-decided)
10. [Definition of done](#10-definition-of-done)

---

## 1. Scope at a glance

| | **Team A — The Conversation** | **Team B — The Platform** |
|---|---|---|
| **Who** | **Ali · Maryam** | **Tehman · Noman** |
| **Owns** | Inbound message → structured decision | Structured decision → approved quote, and everything multi-tenant |
| **Modules** | `channels`, `conversations`, AI layer | `platform`, `business`, `feasibility`, `quotations`, `contacts`, dashboard |
| **The number** | Cost per conversation (~$0.07) | Time to first quote (15 min) |
| **Also owns** | Market research, competitor monitoring | The pre-priced trade library |
| **Emits** | `requirements.extracted` | `quotation.approved` |
| **Never touches** | Pricing arithmetic, feasibility rules, other modules' tables | Prompts, model selection, channel adapters |

**Market and vertical, now fixed:** UK + Ireland, English-only. Pest control,
cleaning, removals; EV charging as a cheap test.

---

## 2. Team A — The Conversation
### Ali · Maryam

### 2.1 In scope — channels

| Deliverable | Detail | Priority |
|---|---|---|
| WhatsApp Cloud API adapter | Official API only. Webhook verify → persist raw → enqueue → 200, under 200ms | v1 |
| Instagram DM adapter | Same normalised output shape | v1 |
| Messenger adapter | Same | v1 |
| Web widget | Embeddable, tenant-scoped embed key, no platform approval needed | v1 |
| Telegram (owner-side) | Bot token only, no OAuth. Approval-notification fallback | v1 |
| Inbound normalisation | All channels → one internal message model | v1 |
| `channels` table + routing | `provider_phone_number_id → tenant_id` lookup, first thing the gateway does | v1 |
| Token storage | Encrypted at rest, refresh handled in the adapter | v1 |
| Channel health checks | Alert on auth failure. A silently dead token means a tenant stops receiving leads | v1 |
| Outbound dispatcher | **One dispatcher for all channels.** Dedupe key, per-tenant per-channel rate limits, exponential backoff, DLQ with replay | v1 |
| Idempotency | Unique `(tenant_id, provider_message_id)`. Test by deliberately replaying a webhook | v1 |
| Message templates | Pre-approved WhatsApp templates for the approval card. **Submit early — approval takes weeks** | v1 |

### 2.2 In scope — conversations and the AI layer

| Deliverable | Detail | Priority |
|---|---|---|
| Turn router | Intent → handler dispatch | v1 |
| Intent classification | Haiku 4.5, bounded labels + confidence. Combined with sentiment in one call | v1 |
| Sentiment for routing | **Label only.** Never an emotional profile — see §7 of `AGENTIC_LAYER.md` | v1 |
| Requirement extraction | Sonnet 5, structured outputs, per-vertical schema. Runs on qualifying turns only, not every turn | v1 |
| Gap analysis | **Deterministic.** Set difference against required fields. No model call | v1 |
| Question generation | Templates first; model call only if templates read robotically | v1 |
| Conversation state | Redis hot window, Postgres source of truth | v1 |
| Human handoff | Staff takes over a live conversation and hands it back. Transition visible to the customer | v1 |
| Failure surfacing | Agent says it cannot help and flags the conversation, rather than guessing | v1 |
| Escalation paths | Every trigger in `AGENTIC_LAYER.md` §11 | v1 |
| Quotation narrative | Sonnet 5, **prose only**, plus the number validator that rejects any figure not in the input | v1 |
| Model routing | Per-task tier selection | v1 |
| Prompt caching | Tenant profile cached; hit-rate monitoring and alerting | v1 |
| `usage_events` metering | Every call, including failures. `cost_usd` computed at write time | **v1, step 1** |
| Eval sets | Intent (200+), extraction (50+ conversations), rate cards (20–30 real) | v1 |
| AI disclosure | First message of every conversation, per-tenant text, **not disableable**, logged as an event | v1 |
| Knowledge retrieval | Prose only — policies, FAQs, hours. **Never prices.** Pre-retrieval tenant filtering | v1.1 |

### 2.3 In scope — research

| Deliverable | Cadence |
|---|---|
| Competitor monitoring | Monthly. Incumbents shipped AI receptionists mid-research; expect more |
| Open questions in `STRATEGY_FINDINGS.md` §11 | As they close |
| Keeping `STRATEGY_FINDINGS.md` current | Ongoing |
| Questions arising from stakeholder calls | After each round |

### 2.4 Explicitly NOT Team A's

- **Pricing arithmetic of any kind.** Not the engine, not a helper, not "just a
  rough estimate for the prompt."
- **Feasibility rules.** You consume the verdict; you do not compute it.
- **Lead scoring.** Team B owns `contacts` and the scikit-learn model.
- **Writing to another module's tables.** Emit an event.
- **Schema design outside `channels` and `conversations`.**
- **The dashboard**, including the conversation viewer — Team B builds the UI,
  Team A provides the data.
- **Onboarding wizard.**
- **The pre-priced library.**

---

## 3. Team B — The Platform
### Tehman · Noman

### 3.1 In scope — platform foundation

| Deliverable | Detail | Priority |
|---|---|---|
| Tenant provisioning | **Invite-only for v1.** Removes signup abuse and payment automation from the critical path | v1 |
| Owner accounts | Email + password, JWT with tenant claim, refresh tokens | v1 |
| RBAC | owner / manager / agent | v1 |
| Shared schema + RLS | `tenant_id` on every table, every index leads with it, RLS as backstop | v1 |
| Plans and feature flags | Tier capabilities as data, not code branches | v1 |
| Quota enforcement | Soft warning before hard stop. **Never hard-stop a live customer conversation** | v1 |
| Audit log | Owner actions: approvals, edits, config changes | v1 |
| Region attribute | Tenant-level, set at provisioning, not changeable without migration | v1 |
| Transactional outbox | Postgres table + Celery consumers. Not Kafka | v1 |
| Four-queue split | `inbound` / `ai` / `outbound` / `scheduled` | v1 |
| Structured logging | JSON, request ID threaded through every layer | v1 |
| Sentry | Sampled in production | v1 |
| Backups + **tested restore** | Untested backups do not count | v1 |

### 3.2 In scope — business configuration and the decision layer

| Deliverable | Detail | Priority |
|---|---|---|
| Services, pricing rules | Rate cards, per-unit costs, labour, transport, margin targets | v1 |
| Service areas | Named regions and postcodes, **not polygons** | v1 |
| Inventory items | Parts stock, for feasibility | v1 |
| Workforce / crews | Availability windows | v1 |
| Min/max project size | Bounds checking | v1 |
| Business hours | Per tenant | v1 |
| Verticals config | Per-vertical requirement schemas. Solar dropped; pest control, cleaning, removals | v1 |
| **Feasibility engine** | Five checks, deterministic, **each returns a structured reason**. Zero LLM | v1 |
| **Pricing engine** | Deterministic, versioned rate cards, margin logic. **Any past quote must be re-derivable** | v1 |
| Lead scoring | scikit-learn, 0–100, **model version + input features recorded per score** | v1 |
| `contacts` table | Unified lead-and-customer record with `lifecycle_stage` | v1 |

### 3.3 In scope — quotations and approval

| Deliverable | Detail | Priority |
|---|---|---|
| Draft quotation | Line items, totals, status tracking | v1 |
| **Phone-first approval card** | Customer name, amount, lead score, feasibility verdict, Approve/Reject quick replies, URL button to a single-screen mobile edit view | v1 |
| Edit before approve | Changes sync back, totals recompute | v1 |
| Approval audit | Who, when, what changed, **what the owner was shown** | v1 |
| Anti-rubber-stamp surfacing | Service matched, rate applied, rules triggered, rate-card version. Flag quotes unusual against the tenant's own history | v1 |
| Quotation PDF | B2B buyers expect a document | v1 |
| Delivery | On the customer's original channel; email option | v1 |
| **No terminal auto-rejection** | Infeasible routes to the owner, or a non-final outcome with a route to a human | v1 |
| Good-Better-Best tiers | — | v1.1 |

### 3.4 In scope — onboarding and the library

| Deliverable | Detail | Priority |
|---|---|---|
| **Pre-priced trade library** | 150–300 items, UK first then Ireland. Structure separate from price — see `TEAM_SPLIT.md` §2 | **v1, starts week 1** |
| Guided onboarding wizard | Progress shown, partial save, skip-for-now with a clear incomplete indicator | v1 |
| Document upload + confirm | AI drafts a rate card, **owner confirms**, then pricing is deterministic. Contradicting rows flagged, never silently resolved | v1 |
| Go-live on 3–5 services | Escalate real gaps mid-conversation rather than requiring completeness | v1 |
| **Sandbox / test mode** | Owner chats with their own agent before going live | v1 |
| Import from existing software | CSV and accounting tools. **Not** Jobber/ServiceM8 connectors — see §7 | v1.1 |

### 3.5 In scope — dashboard and analytics

| Deliverable | Detail | Priority |
|---|---|---|
| Lead list | Score, status, source | v1 |
| **Conversation viewer** | The owner reads exactly what the agent said, word for word. **The single most important trust feature** | v1 |
| Approval queue + history | Pending and past quotations | v1 |
| Business profile editing | Same forms as onboarding | v1 |
| Basic analytics | Off precomputed rollups only. Lead volume, qualification rate, conversion, average value, response time | v1 |
| Usage / quota display | Against plan | v1 |
| New-lead notification | Not just approvals — a high-scoring lead should ping the owner | v1 |
| Nightly rollup job | `daily_rollups`. Dashboard reads nothing else | v1 |

### 3.6 In scope — compliance (platform side)

| Deliverable |
|---|
| Consent records with timestamp, source, `consent_text_version` |
| Opt-out keyword and link handling |
| Data subject rights **as working endpoints**: export, erase, rectify, object-to-profiling |
| Documented human-review path for any automated outcome |
| Erasure strategy decision: crypto-shredding or field redaction, **not row deletion** |

### 3.7 Explicitly NOT Team B's

- **Prompts, model selection, or anything token-billed.**
- **Channel adapters** or the webhook path.
- **Extraction schemas** — Team A owns the shape, Team B owns what the vertical
  requires.
- **Conversation state.**
- **The AI disclosure mechanism** (Team A implements; Team B stores the text).
- **Competitor monitoring.**

---

## 4. The boundary between them

### One contract

```
Team A                                          Team B
──────                                          ──────
message → intent → extraction → gap check
                                    │
                                    ▼
                     requirements.extracted  ← THE SEAM
                                    │
                                    ▼
                                         feasibility → scoring → pricing
                                                    → quotation
                                                    → owner approval
                                                            │
                                    ◄───────────────────────┘
                              quotation.approved
                                    │
                                    ▼
                          Team A dispatches to the customer
```

### Rules for the seam

1. **The payload shape is agreed before either side builds against it.**
   Currently TBD — first-week task.
2. **One contract owner.** Not a manager. The person who says what the payload
   contains and updates the spec when it changes. Half a day a week.
3. **Neither team reads the other's tables.** Events only.
4. **Breaking the contract is a conversation**, not a merge.

### Other shared events

`message.received` · `lead.captured` · `feasibility.checked` ·
`quotation.drafted` · `quotation.approved` · `job.completed`

---

## 5. Shared work

Belongs to nobody alone.

| Work | Who | When |
|---|---|---|
| **Stakeholder calls, 25–40** | **Tehman, Noman, Ali, Maryam** — one trade each, see `TEAM_SPLIT.md` §4 | Week 1 |
| Ongoing tenant contact | Each person keeps 2 pilot tenants | Continuous |
| Event payload contracts | Contract owner *(unassigned)* + all four | Week 1, then as needed |
| Repo, CI, environments | Whoever sets it up first | Week 1 |
| Keeping design docs current | Whoever caused the divergence | Continuous |
| The FYP report | All four | Ongoing |

⚠️ **Nobody gets more than a month away from a real customer.** The person who
has spoken to a pest control owner writes different software than the person who
has not.

---

## 6. Out of scope for v1 — deferred

Real features, deliberately later. Each is a "not yet", not a "never".

| Item | Why deferred | Returns |
|---|---|---|
| **Product mode entirely** — catalogue, cart, orders, delivery, refunds | Meta shipped a free agent inside WhatsApp in June 2026 covering the common case; dozens of funded competitors; the service differentiator is unoccupied | v2 |
| Shopify / WooCommerce adapters | Part of product mode | v1.1 / v2 |
| Jobs module | Needs accepted quotations to exist first | v2 |
| Coupons, loyalty, referrals | Expensive outbound, heaviest consent rules | v2 |
| Retention campaigns, win-back, segments | Same. Also the highest legal-risk surface | v2 |
| A/B experiments | Needs traffic to be worth running | v3 |
| Churn prediction, CLV, personas | Needs history that does not exist yet | v3 |
| Self-learning label loop | Needs labelled outcomes at volume | v3 |
| Ad generation | Lowest-value, least defensible. Thin version for the FYP report only | Thin, v1 |
| Multi-language | English-only is the market decision. Reopens if Sweden or NL is ever targeted | TBD |
| Self-serve billing | Invite-only provisioning removes it from the critical path | v2 |
| Embedded Signup / Tech Provider | Manual number registration for v1; design documented, not built | v2 |
| Good-Better-Best tiers | Nice, not necessary for the loop to close | v1.1 |
| Knowledge base retrieval | Useful, not load-bearing | v1.1 |

---

## 7. Out of scope permanently — killed by research

These were considered and ruled out on evidence. Reopening one means
contradicting a specific finding, which is allowed but must be deliberate.

| Item | Why it is dead |
|---|---|
| **Jobber / ServiceM8 / Housecall Pro connectors** | Jobber's terms (§5.1(e), updated 22 Sep 2026) appear to bar employees or affiliates of competing job-management software from using the service at all without express written permission. ServiceM8's platform policy bars replicating core services and bars apps whose purpose is redirecting users out of ServiceM8 — which is what moving to WhatsApp does. **Unless written permission is obtained** |
| **Tradify connector** | No public API. No developer portal, no self-serve keys, no webhooks. Only routes in are an unpublished partnership or session scraping |
| **Housecall Pro connector** | API and webhooks are MAX-plan only — $299/mo vs $149/mo Essentials. Connecting roughly doubles the customer's bill. Also barely present in the UK |
| **Odoo catalogue adapter** | 0.4% of the ecommerce market. API paywalled behind a plan upgrade. 1 call/second, no parallelism. RPC protocol removed ~winter 2027 |
| **Solar as first vertical** | EU market declined 0.7% in 2025, first fall since 2016. Dutch net metering ends Jan 2027. Dutch installer count fell 17% in a year. Most software-saturated trade on the list |
| **Heat pumps** | Certification mandates a room-by-room heat-loss survey before install. **No legal path to a remote quote** |
| **Roofing** | Price is set by batten and felt condition under the tiles. No image reveals it |
| **General building, renovation** | Bill of quantities from drawings plus a site visit. No rate card exists |
| **Emergency plumbing, HVAC repair, locksmiths** | 85–90% phone, urgently, and the customer cannot describe the fault. Wrong channel and unquotable |
| **Netherlands, Sweden as launch markets** | English-only. 67.6% of Dutch firms deal externally in Dutch only; Swedish product information is legally required in Swedish. **Sweden reopens if Swedish support is built** — its channel mix is fine |
| **Marketplaces — Amazon, Daraz, Noon** | The marketplace owns the customer conversation; our value is thin there |

---

## 8. Out of scope by positioning

Not build-order decisions. Things we choose not to be.

| Item | Why not |
|---|---|
| Scheduling, dispatch, calendars | Do not compete with job-management software on its core. That is what makes "front door" coherent |
| Payments, invoicing | Same |
| Route optimisation, GPS tracking | Not our problem |
| Payroll, timesheets | Not our problem |
| Accounting, ERP | Not our problem |
| Warehouse and procurement | v1 checks availability; it does not manage stock ordering |
| Multi-location enterprise reporting | Wrong segment |
| Mapping, property measurement | A competitor's strength |
| Native mobile app | WhatsApp plus desktop covers both jobs. A PWA covers any later gap |
| **A tenant being both service and product mode at once** | One conversation needing both paths is a routing problem we are not solving yet |
| **Pricing produced by a language model** | Never. Not in v1, not ever. See `AGENTIC_LAYER.md` §2 |

---

## 9. Grey areas, decided

Things that could reasonably sit either side. Decided here so they do not get
argued twice.

| Question | Decision | Reason |
|---|---|---|
| Who owns the extraction schema? | **Shared.** Team B defines what a vertical requires; Team A defines the JSON shape and prompt | Vertical knowledge is business config; schema shape is an AI-layer concern |
| Who owns lead scoring? | **Team B** | It is deterministic ML over structured features, not a conversation concern. Sits next to feasibility |
| Who owns the conversation viewer? | **Team B builds the UI, Team A supplies the data** | It is a dashboard screen |
| Who owns the AI disclosure text? | **Team B stores it** (tenant config), **Team A enforces it** | Config is data; enforcement is in the turn pipeline |
| Who owns `usage_events`? | **Team A writes, Team B reads** | Team A generates the spend; Team B surfaces quota in the dashboard |
| Who owns rate-card versioning? | **Team B** | It is the pricing engine's audit trail |
| Who owns the WhatsApp template submission? | **Team A** | Channel concern, and it blocks their approval-card work. **Submit in week 1** |
| Who talks to ServiceM8 about permission? | **Team A** | It is a research and partnership question |

---

## 10. Definition of done

V1 ships when a person not on the team can:

1. Be provisioned as a tenant (invite-only)
2. Complete onboarding in **under 15 minutes** using the trade library
3. Connect a WhatsApp number
4. Test the agent in sandbox mode
5. Go live on 3–5 services
6. Receive a real inbound enquiry, handled by conversation, with AI disclosure
   given at the start
7. See the extracted requirements, lead score, and **feasibility verdict with
   reasons**
8. Get an approval card on their phone and approve **in under a minute**
9. Have the customer receive the quotation on their original channel, with a PDF
10. Read the whole conversation back in the dashboard
11. See it counted in analytics and against quota
12. Export or erase that contact's data on request

**Failure conditions worth stating plainly:**

- Missing step 7 or 8 → it is a chatbot, not this product
- Missing step 10 → nobody will trust it
- Missing step 12 → no European tenant can be onboarded
- Onboarding over 15 minutes → the adoption risk the research identified

---

## Changing this document

Scope changes are fine. Silent scope changes are not.

If something moves in or out, edit this file in the same change that moves it,
and say why. The `Why` column is what makes this document useful in three
months, when nobody remembers the conversation.
