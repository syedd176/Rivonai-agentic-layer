# Strategy Findings — Market Research Synthesis and Verification of Proposed Approaches

**Date:** 26 September 2026
**Basis:** four independent research threads, ~190 searches, ~340 sources. Full
reports in [`research/`](research/).
**Purpose:** verify two proposed approaches against real data, name the gaps and
risks, propose mitigations, and state what changes in
[`SYSTEM_DESIGN.md`](SYSTEM_DESIGN.md).

> **How to read the confidence labels.** **Confirmed** = official/primary source,
> or consistent across three or more independent sources. **Likely** = one
> reasonable source. **Unclear** = could not be established; the gap is named.
> These are carried through from the underlying reports, not re-derived.

---

## Contents

1. [The eight findings that change the plan](#1-the-eight-findings-that-change-the-plan)
2. [Verification: the catalogue connector proposal](#2-verification-the-catalogue-connector-proposal)
3. [Verification: the document-upload and RAG onboarding proposal](#3-verification-the-document-upload-and-rag-onboarding-proposal)
4. [Where to launch](#4-where-to-launch)
5. [Which industries to serve](#5-which-industries-to-serve)
6. [Competitors, and what is actually defensible](#6-competitors-and-what-is-actually-defensible)
7. [Cost and pricing](#7-cost-and-pricing)
8. [Risk register](#8-risk-register)
9. [Contradictions between the research threads, resolved](#9-contradictions-between-the-research-threads-resolved)
10. [What changes in SYSTEM_DESIGN.md](#10-what-changes-in-system_designmd)
11. [Gaps that desk research cannot close](#11-gaps-that-desk-research-cannot-close)
12. [Decisions now on the table](#12-decisions-now-on-the-table)

---

## 1. The eight findings that change the plan

**1. English-only is a market-defining constraint, not a technical preference.**
67.6% of Dutch companies communicate with the outside world exclusively in Dutch;
61.3% speak only Dutch with customers (Confirmed — Taalunie/Meertens). That is the
buyer's own revealed choice, not a survey of opinions. 60% of even the most
confident English readers still want customer care in their own language
(Confirmed — CSA Research). Finland's consumer authority states English-only
service "may otherwise be misleading" unless disclosed in both marketing and
ordering (Confirmed — KKV).

**Consequence:** English-only leaves the British Isles, Malta, and two countries
where the product would be working against the grain. That is an English-speaking
strategy, not a European one. It is a legitimate choice, but it should be made
knowingly.

**2. Solar is the wrong first vertical.** Four independent reasons, all Confirmed:
the EU market declined 0.7% in 2025 — the first fall since 2016, with home solar
dropping from 28% of new capacity in 2023 to 14% in 2025 and decline forecast
through 2026 and 2027 (SolarPower Europe, 11 Dec 2025); Dutch net metering ends
1 January 2027; Dutch installer numbers fell 17% in one year with named
bankruptcies; and it is the most software-saturated trade on the list, with eight
or more European quoting tools and remote design already solved via satellite and
LIDAR.

**3. Several planned verticals cannot produce a remote quote at all.** Not
"difficult" — structurally impossible (all Confirmed):

| Vertical | Blocker |
|---|---|
| Heat pumps | **Legally barred.** MCS MIS 3005-D mandates a room-by-room heat-loss calculation to BS EN 12831-1:2017 before certified install; it also gates grant access |
| Roofing | Satellite shows roof *shape*; price is set by batten and felt condition *under* the tiles |
| General building | Bill of quantities from drawings, plus a visit |
| Insulation | Cavity borescope survey needed just to assess suitability |
| Emergency plumbing / HVAC / locksmiths | Customer cannot describe the fault, and 85–90% phone rather than message |

**4. Odoo should come off the platform list.** ~0.4% of the ecommerce market
(~18k–45k stores worldwide versus Shopify ~3.1m, WooCommerce ~4.1m). The API is
paywalled — Odoo's own docs state external API access "is not available on One App
Free or Standard plans," so a merchant must roughly double their per-user bill
before connecting. Rate limit is 1 call/second with no parallel calls. No real
webhooks. And the RPC protocol is removed from Odoo Online around winter 2027 — a
~15-month shelf life. (All Confirmed from official Odoo documentation.)

**5. Document extraction is good enough to draft and nowhere near good enough to
decide.** Field accuracy 83–96%, but **whole-document accuracy 28–77%** — and a
rate card is only useful if all of it arrived. Worse, LLM table reading shows
5.7%–46.5% data-referencing errors, and **46.89% of erroneous responses still
produced a correct-looking final answer.** The failure mode is silent.

**6. A quoted price binds, and businesses have already been made to pay.** Sweden
caps overrun on an approximate price at **15% by statute**; Denmark applies a ~15%
norm through its complaints board; UK quotations bind on acceptance; Dutch
*offertes* bind on acceptance, no signature needed. *Moffatt v Air Canada* (2024
BCCRT 149) forced an airline to honour a policy its chatbot invented and rejected
the "the chatbot is a separate agent" defence. In 2026 a Toronto BMW dealership
paid ~$27,000 on an AI-generated price. Chevrolet Watsonville was prompt-injected
into "$1 Tahoe… no takesies backsies" and pulled its chatbot entirely.

**7. The pricing rule was right; the stated reason was wrong.**
`SYSTEM_DESIGN.md` §5.2 and §17 justify the never-LLM-pricing rule partly via EU
AI Act risk classification. **That justification does not hold.** Annex III point
5(c) covers pricing only for *life and health insurance*; nothing in Annex III
reaches ordinary commercial service pricing (Confirmed — read from the Act text).
The real exposure is contract and consumer law, which is **larger**, not smaller.
A correct rule resting on a bad argument gets relaxed the first time someone
checks it.

**8. Rate-card onboarding is the thing that kills trade software adoption.** In a
poll of ServiceTitan users, **42% still had no working pricebook after three
months**; implementations run 6–12 months and contractors report $5,000–$15,000
on pricebook setup alone. Meanwhile ServiceM8 and Tradify are live in a day and
Sameday in 30 minutes. The consistently cited abandonment reason: three
afternoons building price books is selling time gone.

---

## 2. Verification: the catalogue connector proposal

### The proposal

> Tenants authorise a connection to wherever their products already live —
> Shopify, Odoo, WooCommerce — and the agent stays synchronised automatically via
> APIs, so clients never add products manually.

### Verdict: **correct in principle, and correct on two of three named platforms.**

**Confirmed right.** Shopify and WooCommerce together are **66–72% of shops** in
every target country (ShopRank, verified active stores, June 2026):

| Platform | Ireland | UK | Netherlands | Sweden | Denmark |
|---|---|---|---|---|---|
| Shopify | 36.2% | **46.9%** | 30.3% | **36.1%** | 35.5% |
| WooCommerce | **35.7%** | 24.6% | **36.0%** | 30.8% | **35.9%** |
| Custom / unknown | 14.7% | 13.6% | **21.4%** | 18.9% | 17.0% |
| **Shopify + Woo** | **71.9%** | **71.5%** | **66.3%** | **66.9%** | **71.4%** |

A cross-check across 600k+ webshops in 17 markets (Tembi, June 2025) puts
WooCommerce higher and Shopify lower, but the **combined figure stays 66–79%**.
Note WooCommerce *beats* Shopify in Ireland, the Netherlands and Denmark — it is
not the junior partner in this market.

Independent convergence: Zipchat supports Shopify, WooCommerce and Wix — the same
three this research recommends, arrived at separately.

**Confirmed wrong: Odoo.** See finding 4. The decisive framing: *Odoo is not
merely more onboarding steps — it contains a purchase decision*, and no
engineering removes that. Also, Odoo is an ERP, so the storefront is usually
elsewhere; the same catalogue is often better reached through the merchant's
actual Shopify or Woo store.

**Recommended:** support **three things, not four platforms** — Shopify,
WooCommerce, and a genuinely good no-platform fallback. Add Wix only if a target
country needs it (cheapest addition; helps Ireland and the UK). Coverage ~66–72%
directly, ~80–90% with the fallback, leaving 10–15% out (Magento, PrestaShop,
Shopware, Lightspeed, national platforms).

### The single highest-leverage engineering finding

WooCommerce ships `/wc-auth/v1/authorize` — a near-OAuth flow where the merchant
clicks approve and keys are POSTed to you. **Two clicks instead of ~7 fiddly admin
steps with a one-time-only secret** (Confirmed).

This is what keeps a third of the market self-serve rather than support-heavy —
the difference between SaaS and consulting for those tenants.

⚠️ Caveats: callback must be HTTPS; merchant must be logged in as WP admin;
does not work on local or hidden sites; and a long-standing bug (WooCommerce
issues #8898, #31959) returns *"A valid URL was not provided"* from URL-encoding,
permalink and subpath problems. Expect a meaningful minority to fail — keep the
manual key path as a visible fallback.

### Onboarding effort, ranked

This table is the SaaS-versus-consulting answer:

| Rank | Platform | Merchant steps | Self-serve? |
|---|---|---|---|
| 1 | **Shopify** | **2** | Yes — ideal |
| 2 | Wix | 2–3 | Yes |
| 3 | **WooCommerce** (auth endpoint) | **2–4** | Yes, mostly |
| 4 | Shopware | 3–5 | Borderline |
| 5 | Squarespace | 3–6 | Borderline — plan check kills some |
| 6 | WooCommerce (manual keys) | ~7 | No — support tickets |
| 7 | PrestaShop | ~8 | No |
| 8 | **Odoo** | **6–10+, plus a purchase** | **No — this is consulting** |

### Two design insights worth acting on

**Checkout links may remove the privacy-review blocker.** Shopify gates customer
names behind a Level 2 protected-customer-data review requiring encrypted
backups, separated test/prod, restricted staff access, an access log and a written
incident-response policy — plan **4–8 weeks** (Confirmed on requirements, Likely
on timing). But a Storefront `cart` returns a `checkoutUrl`, and `draftOrderCreate`
returns an `invoice_url`: the customer pays Shopify directly. You never touch
cards *or*, potentially, their personal data. Whether this avoids Level 2 is
**Unclear** — ask Shopify Partner support before building. It could cut weeks off
launch.

**The bar for "real-time" is lower than it looks.** Vendors advertise live sync
while other vendor docs quietly say "hourly intervals." Hourly polling marketed as
real-time is the industry norm, and reviews show the cost: purchases of
out-of-stock items, quantities wrong for months, stock added back instead of
deducted. **Genuine webhooks plus reconciliation beats most "real-time" products
shipping today.**

### The gap that is actually the beachhead

Website-but-no-platform is 8–21% of shops (Netherlands 21.4% — larger than every
platform except the big two). But the bigger group is invisible to that table:
Eurostat 2025 finds **76.7% of small EU enterprises have a website**, so ~23% do
not, and ~58% use social media.

**Every platform share table has a denominator of shops with detectable
websites.** An Instagram shop with stock in a spreadsheet is the ideal customer —
WhatsApp and Instagram *are* its storefront — and it is structurally invisible to
every app-store competitor. How others handle this group: refuse them (Gorgias),
ignore the catalogue entirely (Tidio's AI reportedly does not read it), CSV/Sheets
import, or Meta Commerce Manager (limited to 500 products per WhatsApp account,
one catalogue, fetches no faster than hourly).

⚠️ The size of the "sells but has no website" segment could not be quantified.
It is named as a real gap and it is the proposed beachhead — see §11.

### Staleness: manage the promise, not the data

No engineering makes a spreadsheet fresh. The rules that follow:

- **Age changes the agent's wording.** Under 24h → "in stock". Two weeks → "let me
  confirm that for you". 60 days → stop asserting stock at all.
- **Never let stale data close a sale.** Fresh data can take payment; stale data
  can only reserve. This single rule prevents the worst outcome.
- Show merchants their own data decay as an upgrade prompt.
- Prefer a re-read Google Sheet over a remembered CSV upload.
- **Let the agent ask the owner on WhatsApp and write the answer back.** The
  conversation becomes the sync mechanism — an advantage connector-only products
  structurally cannot have.

---

## 3. Verification: the document-upload and RAG onboarding proposal

### The proposal

> Service businesses upload their existing documents — service sheets, price
> lists, rate cards — into the dashboard, and a retrieval model uses them to
> respond to customers.

### Verdict: **right problem, wrong mechanism for pricing — and the fix keeps most of the benefit.**

**The problem being solved is real and urgent.** See finding 8. Rate-card setup is
the single biggest cause of trade software abandonment, and the proposal aims
directly at it. That instinct is correct and should not be abandoned.

**Using retrieval as the price source is unsafe.** Six reasons, in order of force:

1. **The failure mode is silent.** 46.89% of table-reading errors still produce
   plausible-looking answers. Reviewing outputs cannot catch it.
2. **Wrong numbers land in the legally unescapable band.** The obvious-error
   escape hatch (Dutch clear-mistake rule and Art 6:228 DCC *dwaling*, Swedish
   *förklaringsmisstag* s.32, English *Hartog v Colin & Shields*) only covers
   absurd figures. **€1 for a boiler is escapable. €340 for a €480 job is not** —
   plausible, accepted in good faith, binding. Wrong-row retrieval produces
   exactly that.
3. **It is adversarially steerable** via prompt injection (Chevrolet).
4. **A chunk cannot express a rule.** Minimums, callout fees, out-of-hours
   multipliers, travel bands, tiering — retrieval can only surface a number that
   appeared near some words.
5. **No versioning or effective dates**, so it rots silently.
6. **Non-reproducible.** When a customer disputes a quote six weeks later, "the
   retriever returned this chunk" is not an audit trail.

**Model confidence cannot be the gate.** Under formal risk control at a <10%
error target, native model confidence auto-approves only **0.1%–7.0%** of fields
(AUROC 0.54–0.74 — barely better than a coin flip). A purpose-built calibrated
stack reaches 49–72%, so even a good flow hands roughly a third of fields to a
human.

### The resolution — and it keeps the speed

> The rule bans the model from *producing the number*. It does not ban documents
> from *onboarding*.

Extraction → owner-confirmed structured rate card → deterministic computation
**fully honours the architecture rule**, because the number is still computed by
code from structured data a human approved. This is not a compromise; it is what
mature products do. BuildFolio ships exactly this join: *"AI is your starting
point, not the final word."*

Measured performance of extract-then-confirm, from AP automation (the closest
instrumented analogue): 99–99.5% field accuracy with a human in the loop, 60–75%
straight-through after three months of tuning, ~45 seconds per flagged item. On a
40-line rate card that is **10–15 minutes of careful review**.

⚠️ So promise "ten minutes of review", not "done in seconds". Over-promising here
is its own abandonment risk.

### The recommended sequence

Not one mechanism — four, in order, because each solves what the previous cannot:

| Order | Mechanism | Why it comes here |
|---|---|---|
| **1** | **Per-industry template with pre-priced defaults** | The highest-leverage finding in the study. Profit Rhino ships ~8,500 expert-maintained tasks covering >90% of common repairs and gets a contractor live **in a day with a full price book**, at $199/mo. The owner *corrects* rather than *creates*. Critically, this is the only mechanism that works when the owner has **no document** — a callout fee often lives in their head |
| **2** | **Import from software they already use** | Best data quality, narrowest reach. CSV, Xero, QuickBooks. A business already on Jobber has largely solved its pricing problem |
| **3** | **Document upload as an accelerant** | The proposal, in its correct place: drafts the rate card, owner confirms, then pricing is deterministic |
| **4** | **Start on 3–5 services, escalate real gaps mid-conversation** | **This is the genuine invention** — no product was found doing it. Best-motivated too: a real gap encountered in a live conversation beats an empty form field |

And underneath all four: **retrieval for prose, structured data for money.** RAG
over policies, service descriptions and FAQs is a genuinely good fit and low risk.
Anything that becomes a number is not.

OWASP's line is the one to put in the architecture doc: **"The model generates
text — it does not enforce policy."** And: *"RAG does not reduce risk — it
redistributes it across the data pipeline."*

⚠️ Two RAG implementation requirements that are not optional: **source attribution
on every answer**, and **tenant isolation enforced at the index with pre-retrieval
filtering** (post-filtering exposes other tenants' data during the search itself),
with tenant ID in cache keys.

### What can be extracted, and what cannot

Sort by rate of change and the design writes itself:

| Rate of change | Information | How it must get in |
|---|---|---|
| Static, **written down** | Services, prices, rate cards | Extract → confirm |
| Static, **unwritten** | Pricing rules, job-size limits, service area | **Wizard with defaults** — extraction cannot help because no document exists |
| **Volatile** | Parts stock, crew availability | **Live connection, or the agent stays silent and escalates** |

Pricing rules are the hard part and are essentially never extractable. And the
warning that matters most operationally:

> **The most likely source of a bad customer experience isn't a slightly wrong
> price — it's a booked crew that doesn't exist or a promised part that isn't on
> the van.**

Real field-service products source availability from a dispatch board and capacity
rules, never documents. Small operators often do not track van stock in software
at all — which is a genuine constraint on the feasibility check, and it is
discussed again in §8.

### Targets

**First quote inside 15 minutes, on 3–5 services.** Market range for context:
Sameday 30 min · Reception.ai <10 min · ServiceM8 and Tradify 1–2 days · Profit
Rhino 1 day *with* a full price book · Jobber 1 week · ServiceTitan 6–12 months.

Supporting evidence quality is mixed and worth knowing: ChartMogul's primary
survey (n=200, Jan 2026) gives median free-to-paid conversion of **8%** with a 10×
spread, and card-at-signup 44% versus 14% median. Progressive onboarding is the
best-supported intervention; partial save is table stakes (a tradesperson setting
up between jobs *will* be interrupted); sandbox mode has **no measured activation
lift** but a specific argument — an owner will not point an AI at real customers
on partial pricing, and test mode is the cheapest way for them to find their own
pricing gaps.

⚠️ Several widely-circulated onboarding statistics have **no traceable primary
study** and should not be cited: "75% week-one churn", "72% abandon on too many
steps", and the "53% onboarding completion / Chameleon" figure, which could not be
reproduced.

---

## 4. Where to launch

### The ranking

| # | Country | Strongest reason for | Strongest reason against |
|---|---|---|---|
| **1** | **United Kingdom** | ~883k construction SMEs (16% of all UK SMEs); WhatsApp 90% and Instagram 94% of adults (Ofcom, May 2025); heat pump applications +112% YoY; **no AI Act obligation** | Whoza.ai (from £59/mo), TalkTrade (£49–69), Grip (£49–149) sell the same product. Late follower against local incumbents, and the entry price is capped |
| **2** | **Ireland** | The sharpest demand signal found anywhere: retrofit applications **+96% in 2026**, individual grants **+186%**, 12–24 month waits (Warmer Homes 24–26 months). Highest EU share of e-commerce turnover via own site (24.36%) | Small — 81,043 construction firms, 12,326 Shopify stores. AI Receptionist Ireland already sells this at €69–297/mo with GDPR and AI Act compliance as its pitch |
| **3** | Malta | Only other genuinely English-co-official country. Tourism ~15% of GDP means many small firms habitually serving English speakers | Tiny — 60,856 enterprises total, 5,869 construction. Ranks on *suitability*, not *opportunity* |
| **4** | Netherlands | Best raw numbers after the UK: 273,508 construction firms (267,891 micro), ~100–103k webshops, WhatsApp ~92.9%, Messenger #2 | **The language finding.** Plus Blueprint already ships the described product in Dutch (AI prices from your rates, generates a PDF, sends by WhatsApp) at €249–699/mo. Heaviest rules burden: Article 50 plus a live ACM/AP chatbot guideline |
| **5** | Sweden | Included largely to correct the prior report. Lowest marketplace reliance in the EU (24.78%); 99,266 micro construction firms already paying 150–800 kr/mo for quoting apps | Language, and only language. Swedish product information is also legally required |

**Denmark just missed**, and for a specific reason worth knowing: its channel
position is arguably better than Sweden's (Messenger is the #1 messaging app;
Facebook reaches 84% of 16–74s), but **section 10 of the Danish Marketing
Practices Act bans unsolicited electronic marketing without prior consent and
applies to B2B as well as consumers** (Confirmed). For a small company needing
cheap outbound to find its first customers, that closes the most affordable door.

### The practical read

**UK and Ireland as one English-language go-to-market** is the coherent move. It
makes Ireland a cheap add-on rather than a separate bet, combines the largest pool
with the sharpest demand signal, and both need zero language work.

Two consequences to accept:
- **You enter the UK as a late follower.** The incumbents are cheap and local.
  What you have that they may not: see §6.
- **The AI Act asymmetry is real but temporary thinking.** The UK has no Article 50
  duty. Ireland does, from 2 August 2026. Build for the stricter case, since
  Ireland is in the plan.

### Marketing-consent constraints, by target

- **UK:** corporate addresses are contactable, but **sole traders count as
  individuals** for marketing consent — which catches much of the target market.
- **Ireland:** business email is workable; calls need consent.
- **Denmark:** B2B included in the anti-spam ban.

All three constrain the retention half further, on top of what
`SYSTEM_DESIGN.md` §17.4 already documents.

---

## 5. Which industries to serve

### Start with these three

| Industry | Why | Weakness |
|---|---|---|
| **Pest control** | Best pure technical fit. Fixed price per treatment, published openly (IE €80–250, UK £75–250). The industry itself treats hourly billing for routine treatment as a red flag. Everything that sets the price — pest type, infestation size, access, visit count — is establishable in conversation. Almost no competing software | Low job value, so the subscription must be modest and volume real |
| **Cleaning** (domestic → commercial) | Instant online quoting is **already normal practice** — a Dutch firm quotes in 30 seconds at €33–45/hr — which is the strongest possible proof the pricing is computable. Highest enquiry volume studied. Non-urgent, so customers will message. **Crew availability is the genuine binding constraint, so the feasibility check is load-bearing here rather than decorative** | Low per-job value, offset by recurring contracts |
| **Removals** | Real rate card (m³ + distance); online calculators already standard so customers *expect* a remote price; jobs €600–1,500+; crew, van and date availability make feasibility genuinely valuable | No repeat business, seasonal. Treat as the revenue-per-account play, not volume |

**Also worth a cheap test: EV charger installation.** Photo-based remote quoting
is already mainstream (Home Depot, Treehouse, Qmerit — "for most jobs this step
isn't necessary"), and the exact photos needed — consumer unit, meter, main fuse,
charger position, cable route — are precisely what a conversational agent can
collect in order. Growing market, unlike solar.

### The trap list

**Heat pumps, roofing, HVAC and general building all look ideal and are not.**
They share high job values, obvious pain and plenty of enquiries — a seductive
combination. But in each, the price is determined by something nobody can see
without being there: the heat loss, the battens, the pipe runs, what is behind the
wall.

> **High job value is precisely *why* they cannot be quoted remotely: the money is
> in the uncertainty, and the uncertainty is physical.**

Also avoid emergency plumbing, HVAC repair and locksmiths — customers phone,
urgently, and cannot describe the fault. Wrong channel and unquotable.

### The strategic insight that outranks the vertical pick

**The BOXT lesson.** Boilers were considered unquotable remotely until BOXT and
Heatable narrowed the *offer*: defined boiler set, defined install scenarios,
fixed price quoted in 90 seconds from a questionnaire, next-day fitting (Heatable
combis from £2,195).

**Remote quoting was unlocked by standardising the offering, not by smarter
software.** That gives two strategic options:

1. **Sell to businesses that already have a fixed price list.** The
   recommendation — and it explains why pest control and cleaning work: short rate
   cards, already fixed.
2. **Build a tool that helps businesses standardise their offer.** A bigger
   company, and much harder.

This also resolves a tension in the onboarding findings: the industries with
short, already-fixed rate cards are exactly the ones where the 15-minute
onboarding target is achievable. Vertical choice and onboarding feasibility are
the same decision.

---

## 6. Competitors, and what is actually defensible

### The market is more crowded than the design document assumes

| Where | Who | Price |
|---|---|---|
| UK trades | Whoza.ai, TalkTrade, Grip, Trades AI | £49–149/mo |
| Ireland | AI Receptionist Ireland | €69–297/mo |
| Netherlands | **Blueprint** — AI prices from your rates, generates PDF, sends by WhatsApp | €249–699/mo |
| NL, established | Watermelon (EU-hosted, ISO 27001), Trengo | — |
| Shops | Zipchat (Shopify/Woo/Wix), Gorgias (Shopify only), Tidio (AI reportedly does not read catalogue) | $49–249/mo |
| Instant fixed-price booking | **Zoofy** (NL, since 2015, 500+ job types) — *"no quotes to compare"* | — |
| Marketplace pricing | **Checkatrade** Job Estimate Calculator, built on **1.5 million completed jobs** | — |

Two of these deserve particular attention. **Blueprint is doing the described
product**, in Dutch, today. And **a single trade's rate card cannot compete with
1.5 million completed jobs as a pricing basis** — which is an argument for
competing on *capacity awareness* rather than on price accuracy.

### What survived all four research threads

**The owner-approval gate.** Three independent threads landed on it:

- **Competitive:** Blueprint appears to send quotes automatically, with no
  approval gate (Likely). No product found lets an AI send a priced quote to a
  customer unseen.
- **Legal:** it disposes of GDPR Article 22 — with a human approving, the decision
  is not "solely automated" (Likely).
- **Practical:** it is the only defence against the silent-wrong-number failure
  mode.

**The feasibility check.** Confirmed by absence across every product examined in
two separate threads. Nothing checks parts in stock, crew free, and area covered
before producing a price.

⚠️ **But an empty column has two possible meanings** — nobody thought of it, or
everybody tried and customers did not care. Desk research cannot distinguish them.
See §11.

**Multi-channel breadth.** Gorgias is Shopify-only and channel-narrow; most
competitors are WhatsApp-first. Genuine WhatsApp + Instagram + Messenger coverage
is uncommon.

**Compliance as a feature nobody markets.** Article 50 has been enforceable since
2 August 2026 with penalties to €15m or 3% of turnover, and the earlier research
found very little evidence of vendors doing disclosure visibly. `SYSTEM_DESIGN.md`
§17.1 already specifies it. It is built and not marketed.

### The marketplace economics are the best sales pitch available

Trades pay **£16–£37.50 per lead** (Checkatrade) or €10–40 (Werkspot) — **and pay
even when the customer never replies**. Each lead goes to 10–20+ competing
members; Tradesmen.ie gives contact details to the top four bidders within 15
minutes. Irish cost per lead: €30–75.

> *You already paid for this lead, and you are racing three other trades. The
> agent answers in seconds, at midnight, with a real price.*

That attaches to budget they already spend rather than arguing for new budget.

⚠️ But marketplaces are a **competitor, not a channel.** They monetise by owning
the customer and will not distribute a tool that reduces that dependence.

---

## 7. Cost and pricing

### Two unit-economics facts that need verifying before pricing

⚠️ **Sources conflict directly on whether Meta begins charging for service replies
inside the 24-hour window from 1 October 2026** — vendor analyses say yes, Meta's
own documentation says the model is not changing (Unclear). **That is five days
from this report's date and it hits unit economics directly.** Earlier reasoning
in this project relied on "inbound is free"; that may not hold.

⚠️ **The Dutch ACM/AP joint chatbot guideline was due autumn 2026 — i.e. now.**
They have already warned that chatbots should not fully replace humans and called
chatbot reliance "one of the biggest annoyances" for consumers.

### What the market will bear

| Segment | Realistic monthly | Anchor |
|---|---|---|
| UK trades | £49–99 | Already normal; incumbents at £49–59 cap the entry |
| Ireland trades | €69–297 | AI Receptionist Ireland's range |
| Small shop | €50–150 all-in | Or **€0** if they accept Meta Business Agent |
| Service, general | €30–120 | Irish trades already pay OnlineTradesmen from €43.33/mo |

**Price is not a weapon.** ServiceM8 is ~£25/mo with unlimited users. The category
is affordable; the one-van plumber is not priced out of anything.

**But predictability is.** The loudest complaint in the category, by a wide
margin, is confusing and surprising billing — Tidio runs three separate meters,
Gorgias charges each AI interaction twice. Flat pricing in local currency
addresses the loudest complaint and costs nothing to implement.

This connects back to architecture: flat pricing is only safe if per-tenant cost
is predictable, which is exactly what the `usage_events` metering in
`SYSTEM_DESIGN.md` §1.1 exists for. **Metering is what lets you offer flat
pricing without losing money on a heavy tenant.**

**Free trial, not freemium** — 18–30% versus 2–5% conversion.

---

## 8. Risk register

Ordered by severity. Each risk has the evidence behind it and a concrete
mitigation.

| # | Risk | Evidence | Mitigation |
|---|---|---|---|
| **1** | **Customers phone rather than message, making the whole product moot** | Industry sources claim 78–83% of home-service bookings start with a call (85–90% for emergencies) — but these trace to vendor marketing with no verifiable primary study, and are US-based. Counter-claims are equally self-interested. **Unclear** | **Do not settle this with more desk research.** Phone 25–40 target businesses and ask: of your last twenty enquiries, how many arrived by phone, WhatsApp, Instagram DM, web form, email? Two days of work. It decides viability |
| **2** | **A wrong extracted price becomes a binding quote** | Whole-document extraction accuracy 28–77%; 46.89% of table errors produce plausible answers; plausible-but-wrong is legally unescapable; *Moffatt*, BMW ~$27k | Never price from retrieval. Extract → owner confirms → deterministic computation. Version the rate card so any past quote is re-derivable |
| **3** | **The approval gate becomes a rubber stamp** | Case law is explicit that nominal human sign-off does not establish meaningful intervention | Surface the service matched, rate applied, rules triggered, and rate-card version. **Flag quotes that look unusual against the owner's own history** |
| **4** | **Promised crew or parts do not exist** | *"The most likely source of a bad customer experience isn't a slightly wrong price."* Small operators often do not track van stock in software at all | Never assert stock or crew without a live source. Degrade to "let me confirm and come back to you" and escalate. Make this the default, not the exception |
| **5** | **Rate-card onboarding kills adoption** | ServiceTitan: 42% had no working pricebook after 3 months; $5k–15k setup cost | Template-first (per-industry pre-priced defaults), 15-minute target, go live on 3–5 services, escalate gaps mid-conversation |
| **6** | **Meta starts charging for inbound service replies** | Sources conflict; possible 1 Oct 2026. **Unclear** | Verify against Meta's own policy this week. Model pricing both ways before committing to a tier |
| **7** | **Building two modes at once means neither is good** | The earlier report's §10.2: the shared layer is the cheap part; the valuable parts share almost nothing | Sequence rather than abandon. Service mode first; product mode stays designed |
| **8** | **Meta Business Agent removes the floor of product mode** | Free, global, inside WhatsApp since June 2026; answers product questions from the Meta catalogue | Build only above that line: order placement in-conversation, cancellation, refunds with limits, review requests. Test Meta's agent directly rather than assuming it is good |
| **9** | **Webhooks silently stop and a tenant goes stale forever** | Shopify retries 8× over ~4h then **deletes the subscription**. (The widely-quoted "19 retries / 48 hours" is dead as of ~Sept 2024 and still all over the internet) | Health-check your own subscriptions and re-register. Reconciliation polling as a designed mechanism, not a safety net. Alert on per-tenant staleness |
| **10** | **WooCommerce polling degrades a merchant's shop** | No default rate limiting; documented case of 5-second polling with ~1MB responses degrading a store | Self-throttle hard. **You can take a merchant's shop down and they will blame you** |
| **11** | **Variant handling ruins shopping conversations** | *"Do you have this in medium?"* is the commonest question. Woo variations are slow (150–300 → 4–5s) and core has no plans for variation pagination | Variant as a first-class entity from day one — retrofitting means rewriting the agent's reasoning. Never aggregate stock to product level |
| **12** | **Language creep** | 67.6% of Dutch firms operate in Dutch only; Finnish regulator flags English-only as potentially misleading | Decide English-only knowingly and target accordingly (§4). Do not launch into NL/SE/DK on English |
| **13** | **Tenant data leaks through the retrieval index** | Post-retrieval filtering exposes data during the search itself | Pre-retrieval filtering at the index; tenant ID in cache keys |
| **14** | **Trades will not adopt software at all** | **Contradicted.** Jobber, Tradify, ServiceM8, Housecall Pro are substantial self-serve businesses selling to exactly this customer; Verdane paid NOK 550m for Nordic trades marketplaces in Dec 2025 | Downgraded. Acquisition is not the problem — **retention is**, and retention fails on onboarding (risk 5) |

---

## 9. Contradictions between the research threads, resolved

**The Nordics.** Three sources disagreed. Resolved: the earlier report's
disqualification was **right by accident, wrong by reasoning**. WhatsApp figures
were roughly correct (Sweden ~49%, Denmark ~30%) but the conclusion did not
follow — **Messenger is the #1 messaging app in Denmark and #2 in Sweden, used by
65% of Swedes, alongside Instagram 65% and Facebook 71%** (Confirmed — Svenskarna
och internet 2025). There is a viable channel mix without WhatsApp. The catalogue
thread independently found Sweden and Denmark healthy on platforms (66.9% and
71.4%).

**They fail on language, not channels.** Practical lesson: stop scoring countries
on WhatsApp penetration. The multi-channel point was correct — it just does not
rescue the Nordics, because the blocker is elsewhere. (Telegram is 4% in Sweden —
drop it there.)

**"Signal-first Sweden."** One thread reported this. The country thread's primary
Swedish source does not support it; Messenger, Instagram and Facebook dominate.
**Treat the Signal claim as unreliable.**

**Solar.** Both the service-industry thread and the earlier competitor report
independently concluded solar is over-served. They agree.

**The AI Act and pricing.** The onboarding thread's direct read of the Act
contradicts `SYSTEM_DESIGN.md` §17. **The onboarding thread is right** — it read
Annex III itself. See finding 7 and §10.

---

## 10. What changes in SYSTEM_DESIGN.md

Nothing here is written yet. Listed so the edits are deliberate.

| § | Change | Driver |
|---|---|---|
| **5.2, 17** | **Re-found the never-LLM-pricing rule on contract and consumer law, not the AI Act.** Cite *Moffatt v Air Canada*, the BMW case, the Swedish 15% statutory cap, and auditability. Keep the rule; fix the argument | Finding 7 |
| **5.2** | Add OWASP's line: *"The model generates text — it does not enforce policy"* | §3 |
| **9.2, 9.3** | **Remove Odoo.** Replace the third adapter slot with the no-platform fallback, promoted to first-class | Finding 4 |
| **9.3** | Add the WooCommerce `/wc-auth/v1/authorize` flow as the primary Woo onboarding path, manual keys as visible fallback | §2 |
| **9.4** | Add the staleness rules: age-banded agent wording; **never let stale data close a sale**; agent-asks-owner write-back | §2 |
| **9.7** | Strengthen reconciliation: subscription health-checking and re-registration; Shopify's 8-retry-then-delete behaviour; WooCommerce self-throttling | Risks 9, 10 |
| **10** | Variants as a first-class entity from day one; never aggregate stock to product level; per-market pricing for Shopify Markets | Risk 11 |
| **16.2** | **Onboarding sequence:** template-first → import → document upload → live on 3–5 services. 15-minute first-quote target | Finding 8, §3 |
| **16.5** | **Close two open decisions:** first vertical is **not solar**; target market is **UK + Ireland** if English-only holds | Findings 2, 1 |
| **16.5** | Add: verify the Meta 1 Oct 2026 service-message change; verify Shopify checkout-link versus Level 2 approval | Risk 6, §2 |
| **17.4** | Add UK sole-trader consent treatment and Denmark's B2B anti-spam ban | §4 |
| **17.5** | Add pre-retrieval tenant filtering and tenant ID in cache keys for the RAG path | Risk 13 |
| **New** | **A "volatile data" section:** what the agent may assert, what it must hedge, what it must escalate — driven by data age | Risk 4 |
| **4.2** | Keep the feasibility differentiator but add the honest caveat that absence of a feature is not proof of demand | §6 |
| **16.4** | Add the BOXT insight: standardising the offer is what unlocks remote quoting. Note that vertical choice and onboarding feasibility are one decision | §5 |

---

## 11. Gaps that desk research cannot close

Ranked by value. The first three are worth more than any further searching.

**1. Do target customers receive enquiries by message or by phone?** The single
most important unknown, and the published evidence on both sides is vendor
marketing. **Method:** phone 25–40 businesses across pest control, cleaning and
removals in the target market. Ask how their last twenty enquiries arrived. Ask
what software they pay for. **Two days.** If the answer is consistently "phone"
and "nothing", the thin software market in these industries is a warning, not a
green field.

**2. Is the feasibility gap unoccupied because nobody thought of it, or because
customers do not care?** An empty column cannot distinguish these. **Method:** the
same calls. Ask how often they turn down or delay a job because parts or crew were
not available, and whether they would pay to stop quoting jobs they cannot staff.

**3. Instrument your own beta for rate-card review time.** Time-to-confirm, fields
edited, fields wrong, mid-review abandonment. **Two weeks of work, and the single
most valuable number the team could generate** — it validates or kills the
15-minute target.

**4. Verify the Meta service-message pricing change** against Meta's own policy
text. Five days away. Affects every pricing decision.

**5. Ask Shopify Partner support whether a checkout-link flow avoids Level 2
protected-data approval.** Could remove 4–8 weeks from launch.

**6. Do Shopify product webhooks fire on admin bulk edits and CSV imports?** Half
a day on a dev store. Determines whether reconciliation polling is a safety net or
the primary mechanism.

**7. Get a written legal opinion on whether owner approval changes the legal
character of an automated quote.** No source found answers this, and it is load-
bearing for the whole design.

**8. Test Meta Business Agent directly** — is it actually good? Set up a test
business account. Decides whether product mode has a floor left.

**9. Build a 20–30 real-rate-card internal evaluation set**, including prose-
embedded rules. **No public benchmark measures prose-embedded pricing rules at
all** — the "callout €80, waived if work proceeds" case is untested and untooled.

**10. Quantify the no-website shop segment.** It is the proposed beachhead and it
is currently unmeasured.

---

## 12. Decisions now on the table

Framed as decisions, not recommendations. Each names what the evidence supports.

**1. English-only, or add a language?** English-only means UK + Ireland + Malta.
Adding Dutch opens 267,891 micro construction firms and ~100k webshops but means
competing with Blueprint on its home ground. *Evidence leans: start English-only,
UK + Ireland as one market, and treat language as the first expansion lever rather
than a launch requirement.*

**2. Which three verticals?** Evidence supports pest control, cleaning, removals,
with EV charging as a cheap test. It does not support solar, heat pumps, roofing,
HVAC or general building.

**3. Service mode first, or both modes?** Four independent arguments favour service
first: Meta made product mode's floor free, product mode is crowded, the
feasibility differentiator is unoccupied, and a quote is worth more than a parcel
enquiry. *This is a sequencing change, not an abandonment — the ports-and-adapters
design stays.*

**4. Onboarding: template-first or upload-first?** Evidence favours template-first
with upload as an accelerant. The pre-priced industry library is the only
mechanism found that collapses pricing setup from months to a day without bespoke
human work.

**5. Do the customer calls before or after building?** Gaps 1 and 2 are cheap, fast
and decide viability. *Evidence strongly suggests before.*
