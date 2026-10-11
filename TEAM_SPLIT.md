# Work Split — Four People, Two Teams

**Status:** working agreement. Change it when it stops fitting.
**Team:** 4 people, two pairs.

---

## The principle

Each team owns **a layer with a number attached**. Not a discipline — a layer.
If you own the number, you own every lever that moves it, including the ones
that are inconvenient.

| | **Team A — The Conversation** | **Team B — The Platform** |
|---|---|---|
| **Who** | **Ali · Maryam** | **Tehman · Noman** |
| **Owns** | Everything from an inbound message to a structured decision | Everything that makes it multi-tenant, priced and operable |
| **The number** | **Cost per conversation** (target ~$0.07) | **Time to first quote** (target 15 minutes) |
| **Also owns** | Market research and competitor monitoring | The pre-priced trade library |

Both teams do stakeholder calls. See §4.

---

## 1. Team A — The Conversation
### Ali · Maryam

### Modules

`channels` · `conversations` · the AI layer

### What that means concretely

- Channel adapters: WhatsApp, Instagram, Messenger, web widget, Telegram
  (owner-side)
- The webhook path — verify, persist, enqueue, return 200 in under 200ms
- The outbound dispatcher: dedupe key, per-tenant rate limits, backoff, DLQ
- Intent classification and sentiment (one call, cheap model)
- Requirement extraction into the per-vertical schema
- Gap analysis and question generation
- Escalation and human handoff
- Knowledge retrieval over tenant documents — **prose only, never prices**
- The quotation narrative writer, plus the number validator
- **Model routing, prompt caching, `usage_events` metering**

### Why cost sits here

Every lever that moves LLM spend is in this layer. Extraction alone is ~57% of
per-conversation cost; caching the tenant profile is the single biggest saving
available. A team that does not own the AI layer cannot move that number, so
putting cost anywhere else makes it nobody's job.

### Market research and competitor monitoring

Team A owns this. It is smaller than it was — the four research threads are
finished (~340 sources, in [`research/`](research/)). What remains:

- **Competitor monitoring.** The incumbents shipped AI receptionists during our
  research. Expect that to keep happening. A monthly check, not a project.
- **The open questions** in [`STRATEGY_FINDINGS.md`](STRATEGY_FINDINGS.md) §11
- **Whatever the stakeholder calls throw up** — the calls will raise questions
  the desk research cannot answer
- Keeping [`STRATEGY_FINDINGS.md`](STRATEGY_FINDINGS.md) current as things change

⚠️ **The tension to manage honestly.** Team A now carries a build number *and*
a research remit. When a week is tight one of them slips. Decide which, out
loud, rather than letting code win by default because it has visible progress
and research does not.

### Reference

[`AGENTIC_LAYER.md`](AGENTIC_LAYER.md) is the design and cost guide for this
team's work. Read §1–2 before writing code.

---

## 2. Team B — The Platform
### Tehman · Noman

### Modules

`platform` · `business` · `feasibility` · `quotations` · dashboard

### What that means concretely

- Tenancy, auth, RBAC, plans, feature flags, audit log
- Shared schema with `tenant_id` everywhere, RLS as the backstop
- The transactional outbox and the four Celery queues
- Business configuration as data: services, pricing rules, service areas,
  parts, crews
- **The feasibility engine** — deterministic, returns structured reasons
- **The pricing engine** — deterministic, versioned rate cards
- Quotation assembly, the approval workflow, PDF generation
- The dashboard, including the conversation viewer
- Onboarding: the wizard, sandbox mode, document upload and confirm

### Why time-to-first-quote sits here

Onboarding is the biggest adoption risk in the product — 42% of users of a major
competing product still had no working price book after three months. The wizard,
the templates and the confirm flow are all here, so the number belongs here.

### The pre-priced trade library

**Team B owns this, and it starts in week one.**

150–300 items across pest control, cleaning, removals and EV charger
installation, for **the UK and Ireland**. Built from published cost guides,
broken down by the variables that actually drive price: access difficulty,
property size, region, frequency.

**Structure and price are separate concerns**, and the schema must reflect that:

| Reusable across countries | Per country |
|---|---|
| Service list, access tiers, size tiers, frequency bands | Prices, currency, regional multipliers, VAT, grant schemes |

Build the UK set first, then Ireland — same structure, different numbers
(euros, Dublin premium rather than London/South East, different VAT and a
different EV grant scheme). Roughly 30–40% extra work for Ireland, not double.

Done this way, adding a country later is data entry rather than a redesign.
That matters if the market decision reopens — see §8.

This is the long pole. It is the only onboarding mechanism that works for the
whole market and needs nobody's permission, and it is what makes the 15-minute
target achievable. If it starts in month three it delays launch on its own.

⚠️ Use published cost guides as reference. Do **not** bulk-scrape directory
listings — no official API, the terms govern, and reviewer names and phone
numbers are personal data.

### Reference

[`SYSTEM_DESIGN.md`](SYSTEM_DESIGN.md) is the architecture. §5 (the eight rules)
is not negotiable without a conversation.

---

## 3. The seam between the teams

One contract: **Team A emits `requirements.extracted`; Team B consumes it.**

```
Team A                                           Team B
──────                                           ──────
message → intent → extraction → gap check
                                     │
                                     ▼
                        requirements.extracted
                                     │
                                     ▼
                                              feasibility → pricing
                                                      → quotation
                                                      → owner approval
```

### The integration risk, and the fix

With two pairs and one contract between them, the classic failure is that both
sides build to their own reading of it and discover the mismatch in week six.

**One person is the contract owner.** Not a manager — the person who says what
`requirements.extracted` contains and updates the spec when it changes. Half a
day a week.

> ⚠️ **Contract owner: _______________ — still to be assigned.**
> One of the four, named. Works either way: someone on Team A knows what the
> extraction can realistically produce; someone on Team B knows what feasibility
> and pricing actually need. Pick one and write the name here.

**Agree the payload shape in week one.** It is currently marked TBD in the
system design. Until it exists, both teams are guessing.

Other shared contracts, same rule: `message.received`, `quotation.drafted`,
`quotation.approved`, `job.completed`.

---

## 4. Stakeholder contact — all four people

**Not a team's job. Everyone's.**

The person who has spoken to a real pest control owner writes different software
than the person who has not. If contact belongs to one pair, the other pair
never hears a customer — and on a four-person team that is how you build
something elegant that nobody wants.

### The first round: 25–40 calls, split four ways

Six to ten each, over one week. Pest control, cleaning and removals firms in the
UK and Ireland.

| | Trade | Roughly |
|---|---|---|
| **Tehman** | Pest control | 6–10 calls |
| **Noman** | Domestic cleaning | 6–10 calls |
| **Ali** | Commercial cleaning | 6–10 calls |
| **Maryam** | Removals | 6–10 calls |

One trade each keeps the questioning consistent within a trade and gives four
independent readings across them. Swap if someone has a contact in another
trade — the split matters less than everyone making calls.

**The two questions that decide the product:**

1. *Of your last twenty enquiries, how many came by phone, WhatsApp, Instagram
   DM, web form or email?* — decides whether the product is viable at all. Every
   published figure on both sides of this is vendor marketing.
2. *How often do you turn down or delay a job because a crew or the parts were
   not available?* — tests whether the feasibility gap is real demand or just an
   empty column nobody wanted filled.

**Also worth asking:** what software do you pay for, what did you use before,
how long did setup take, what made you stop using something.

### Afterwards

Everyone writes up their own calls — raw notes, not summaries. Then all four
read all of them. The disagreements between what people heard are the valuable
part.

### Ongoing

Not a one-off. Once there are pilot tenants, each person keeps contact with a
couple of them. Nobody gets more than a month from a real customer.

---

## 5. Before anyone opens an editor

From the research, in order of cost-to-answer:

| # | Task | Effort | Owner |
|---|---|---|---|
| 1 | Verify the messaging service-window pricing change | 1 hour | **Ali** |
| 2 | **The 25–40 customer calls** | 2 days | **All four** — see §4 for the split |
| 3 | Permission emails to ServiceM8 and Housecall Pro developer contacts | 1 hour | **Maryam** |
| 4 | Confirm whether a ServiceM8 Services API endpoint exists (trial account) | 1 hour | **Maryam** |
| 5 | **Start the pre-priced library** | Weeks | **Noman · Tehman**, now |
| 6 | Submit the WhatsApp approval-card template | 1 hour | **Ali** |
| 7 | Agree the `requirements.extracted` payload shape | Half a day | Contract owner + all four |

Items 1, 3, 4 and 6 are an hour each. Item 2 can invalidate the product thesis.
Do them first.

⚠️ **Item 6 blocks Team B's approval card and template approval takes weeks.**
It is an hour of work that stops being an hour of work if it slips.

---

## 6. First month, roughly

**Week 1** — Calls (all four). Payload contract agreed. Library started. Repo,
CI, schema skeleton.

**Week 2** — Team A: webhook path and metering. Team B: tenancy, RLS, business
config tables. Library continues.

**Week 3** — Team A: intent classification against a real eval set. Team B:
feasibility rules with structured reasons. Library continues.

**Week 4** — Team A: extraction with structured outputs. Team B: pricing engine
and the approval card. First end-to-end trace through both halves.

Metering is Team A's step one for a reason — retrofitting it means
re-instrumenting every call site.

---

## 7. Things that are nobody's job unless named

Listed because they get dropped on small teams:

| Thing | Owner |
|---|---|
| The event payload contracts | The contract owner (§3) |
| Compliance items that live in the AI layer — disclosure, no terminal auto-rejection, explainability | Team A |
| Compliance items that live in the platform — consent records, region attribute, data-subject-rights endpoints | Team B |
| Backups, and a **tested restore** | Team B |
| The eval sets (intent, extraction, rate cards) | Team A |
| Keeping the design docs current when reality diverges | Whoever caused the divergence |

---

## 8. What would make me change this split

Written down so it can be revisited honestly rather than defended:

- **If the calls say customers phone rather than message**, Team A's work changes
  shape entirely and the split needs redrawing.
- **If ServiceM8 grants written permission**, a connector becomes worth building
  and someone has to own it.
- **If the library turns out to be a month rather than weeks**, Team B needs help
  and Team A takes a share.
- **If integration friction between the teams exceeds about a day a week**, the
  seam is in the wrong place — most likely the extraction schema is doing too
  much, or too little.
