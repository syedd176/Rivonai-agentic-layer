# Onboarding a Service Business: Document Upload, RAG, and Pricing

Research report — 26 September 2026

Every significant claim is labelled **Confirmed** (official source, or consistent across 3+ independent sources), **Likely** (one reasonable source), or **Unclear** (could not establish; what was looked for is stated).

---

## 1. Headline findings

- **The team's rule is right, and the industry agrees with it more strongly than the team seems to realise.** The established pattern in commercial AI agents is "the model proposes, the system disposes": the language model interprets what the customer wants, then calls typed tools that return the price from structured data. OWASP's own RAG guidance states it plainly: "The model generates text — it does not enforce policy." A retrieval system reading a PDF and stating a number is not a variant of this pattern. It is the thing the pattern exists to prevent. **(Confirmed)**

- **But the team appears to have the legal reasoning wrong.** Quoting for a plumbing job is **not** a high-risk AI system under the EU AI Act. Annex III point 5(c) covers pricing only for *life and health insurance*. Nothing in Annex III reaches ordinary commercial service pricing. The real legal exposure is not the AI Act — it is ordinary contract and consumer law, which is a **bigger** risk, not a smaller one. **(Confirmed)**

- **A quoted price does bind the business across the target markets, and courts have already held companies to what their bots said.** Sweden caps overrun on an approximate price at 15% by statute. Denmark applies an ~15% norm via its complaints board. UK fixed quotes bind on acceptance; estimates may rise to a "reasonable" figure. Dutch *offertes* bind on acceptance. In *Moffatt v Air Canada* (2024) a tribunal made an airline honour a policy its chatbot invented. In 2026 a Toronto BMW dealership paid out roughly $27,000 on a price its AI chatbot generated after a mistake. **(Confirmed)**

- **Document extraction is good enough to draft, nowhere near good enough to decide.** Best document parsers score ~74/100 on a clean benchmark that resists contamination. Field-level accuracy runs 83–96%, but *whole-document* accuracy runs 28–77%. When LLMs read tables, data-referencing error rates run 5.7%–46.5% depending on model — and in 46.89% of erroneous cases the final answer still looked right. For a rate card, a silent wrong-row read is exactly the failure that produces a confident, wrong, binding price. **(Confirmed)**

- **Confidence scores from the model itself do not save you.** Under formal risk control at a <10% error target, native model confidence could auto-approve only 0.1%–7.0% of fields. A purpose-built calibrated confidence stack raised that to 49–72%. So even a well-engineered extract-then-confirm flow still hands roughly a third of fields to a human. **(Confirmed)**

- **Setup abandonment is real and the team is right to fear it — but pricing setup is where it bites, not forms in general.** In a poll of ServiceTitan users, **42% still did not have their pricebook set up after three months of trying.** ServiceTitan implementations run 6–12 months; contractors report spending $5,000–$15,000 on pricebook setup alone. **(Confirmed)** Meanwhile products that made setup fast — ServiceM8, Tradify, Sameday — are live in a day or under an hour, without document-upload magic. **(Likely)**

- **Extract-then-confirm is a mature, boringly well-understood pattern, and it is what every AI quoting product actually does.** BuildFolio, Sleepless Tradesman, Field Ascend and others all generate a draft from the owner's own price book and keep the owner as approver before anything reaches a customer. None lets the model invent a number. Flatfile, CSVBox and SAP Document AI implement the same extract → map → validate → confirm loop for data import. **(Confirmed)**

- **Most of what the system needs cannot come from a document at all.** Prices and service lists are static enough to extract. Parts stock and crew availability change hourly and must be live connections or in-app state — real field-service products drive availability from a dispatch board and capacity rules, never from uploaded files. Service areas are a map/postcode object, not prose. **(Confirmed)**

---

## 2. How comparable products onboard today

| Product | Category | How prices/rules get in | Setup time (whose words) | Done-for-you? | Self-serve? |
|---|---|---|---|---|---|
| **ServiceTitan** | Enterprise FSM | Manual pricebook build; import assistance; Profit Rhino library | 6–12 months, often longer; "almost 8 months before we were fully operational"; **42% of polled users had no working pricebook after 3 months** | Yes, paid — pricebook setup alone reported at $5,000–$15,000 | No |
| **Housecall Pro** | SMB FSM | Price Book CSV import/export; Profit Rhino prebuilt books ($199/mo); MAX-plan data import team | Not published as a single figure; price book called an "advanced task that takes real time to master" | Yes — basic transfer free, complex formatting chargeable; implementation $300–$2,500 | Partly |
| **Jobber** | SMB FSM | Guided in-app onboarding sequenced by business type, with per-step time estimates; manual products & services entry | "Most teams fully onboarded within a week" | Yes — onboarding specialists; third-party estimates $200–$2,500 | Mostly |
| **ServiceM8** | SMB FSM (AU) | Supplier CSV price files auto-imported via a dedicated email address the supplier sends to | "Live within a day or two" | Light — guides and in-app help | Yes |
| **Tradify** | SMB FSM | Supplier price list CSV import (30,000+ items takes minutes) | "Live within a day or two" | Hands-on onboarding, free phone support | Yes |
| **Simpro / AroFlo** | Mid-market FSM | CSV import plus formal onboarding project | Onboarding required; "several thousand" in fees | Yes, paid | No |
| **FieldPulse** | SMB FSM | Manual + import | "A few weeks from demo to full rollout"; ranked #1 for Ease of Implementation on G2 | Dedicated Customer Success Specialists | Mostly |
| **Profit Rhino** | Price book library | ~8,500 pre-priced tasks, expert-maintained, quarterly updates; covers >90% of common repairs | "Up and running in as little as a single day" | It *is* the done-for-you layer | Yes |
| **Sameday** | AI phone agent | Structured configuration; native ServiceTitan job booking | "Most people can start taking calls in just 30 minutes" | Included | Yes |
| **Avoca** | AI phone agent (enterprise) | Deep ServiceTitan integration, call-playbook training | **4–12 weeks** | Yes, implied in ~$1,000–$3,000/mo | No |
| **Reception.ai (ElevenLabs)** | AI receptionist | **Website scan** extracts services, pricing, durations, staff, hours, location | Scan 1–5 min; full automated setup "under 10 minutes" | No | Yes |
| **Rosie / Upfirst / MyAIFrontDesk** | AI receptionist | Website scrape + **uploaded documents including pricing spreadsheets** into a knowledge base; or manual "Custom Knowledge" entries | Minutes | No | Yes |
| **BuildFolio / Sleepless Tradesman / Field Ascend** | AI quoting | Owner's price book is the source; AI drafts line items; PDFs/spreadsheets used as *context* | Minutes per quote | No | Yes |

### Commentary

**The shape of the market is unambiguous.** Setup time correlates almost perfectly with how much structured pricing data the product insists on before it will work. Products that demand a complete, correct pricebook (ServiceTitan, Simpro) take months and cost thousands. Products that accept a supplier CSV or a prebuilt library (Tradify, ServiceM8, Profit Rhino) are live in a day. Products that accept a website scrape and an uploaded PDF (Rosie, Reception.ai) are live in minutes — **and are also the products that do not compute binding prices.** **(Confirmed)**

That last point is the one the team should sit with. Fast document-based onboarding exists, it works, and it is used — but consistently for a lighter job than the one the team is proposing. The AI receptionists that ingest a pricing spreadsheet are answering "roughly what do you charge?", not producing an approved quote the business will be held to.

**Two "done for you" models exist, and they are priced differently.** The expensive one is human implementation labour ($300–$2,500 at Housecall Pro; $5,000–$15,000 for a ServiceTitan pricebook). The cheap one is a **pre-priced industry library** — Profit Rhino sells ~8,500 expert-maintained tasks covering >90% of common repairs for $199/month, and claims same-day readiness. The library model is the only thing found that genuinely collapses pricing setup from months to a day without a human doing bespoke work. **(Confirmed)**

**Genuine self-serve setup was achieved by narrowing scope, not by smarter extraction.** ServiceM8's supplier-email auto-import is the neatest example: instead of parsing whatever the owner has, it makes the *supplier* send a clean CSV to a dedicated address on a recurring basis. The hard problem was moved rather than solved.

**Abandonment evidence.** The strongest single datum is the ServiceTitan pricebook poll (42% incomplete at three months). **(Likely** — reported via a specialist consultancy summarising a user poll; the underlying poll was not located.) BBB complaints describe contractors paying a full year's subscription while still not onboarded. **(Likely)** Broader review-site complaints about *setup specifically* were harder to isolate: Jobber and Housecall Pro reviews cluster on support, reporting and payments rather than setup. Note also the survivorship bias — people who abandoned during setup mostly do not write reviews, which means review sites systematically understate this problem.

---

## 3. Document extraction assessment

**Short answer: reliable enough to produce a draft a human then checks. Not reliable enough to produce a price.**

### What the measurements say

| Measure | Finding | Source quality |
|---|---|---|
| Best document parser, contamination-resistant benchmark | **~74 out of 100**; 44.6-point spread between best and worst of 40 models tested | PureDocBench, arXiv 2605.07492 — **Confirmed** |
| Older benchmark saturation | OmniDocBench top scores >90%, **but an audit found 12.08% of its annotation blocks were wrong** (2,580 confirmed errors), plus contamination risk | Same paper — **Confirmed** |
| Field-level vs document-level | Field accuracy **0.829–0.964**; **document accuracy 0.280–0.770** | arXiv 2603.18014 (via search summary; PDF body not parseable) — **Likely** |
| LLM table reading errors | Data-referencing errors in **5.71%** (gpt-oss-20b) to **46.48%** (Llama4-Scout) of responses; **46.89% of erroneous responses still gave the correct final answer** | arXiv 2606.32029 — **Confirmed** |
| Model's own confidence, under risk control | Native VLM confidence auto-approves only **0.1%–7.0%** of fields at a <10% error target; AUROC 0.54–0.74 | arXiv 2609.20110 — **Confirmed** |
| Engineered calibrated confidence | Raises auto-approval to **49–72%** of fields while holding error at target; AUROC 0.90–0.99 | Same — **Confirmed** |
| Degradation robustness | General VLMs lose 0.99/8.52 points under digital/real degradation; pipeline OCR specialists lose 4.90/14.21 | PureDocBench — **Confirmed** |
| Scan quality threshold | Below 300 DPI causes measurable accuracy drop, "20% or more for degraded scans" | **Likely** (vendor/secondary summary) |
| Handwriting | 3–5% character error rate is considered *good*; human-in-the-loop still needed for low-confidence extractions | **Likely** |

### The three findings that matter most

**First, document-level accuracy is the number that applies here, and it is bad.** A rate card is only useful if the *whole thing* came across correctly. Field accuracy of 96% sounds excellent until you note that a 40-line price list at 96% per line has an expected 1.6 wrong lines, and document-level accuracy figures (28–77%) reflect exactly this compounding.

**Second, the 46.89% figure is the genuinely alarming one.** Nearly half of table-reading errors still produced a plausible final answer. This means **the error class is silent**. A wrong-row read does not fail loudly; it returns a real price from the wrong service. No amount of output-plausibility checking catches that, because the output is plausible. This is the single strongest technical argument against letting retrieval over a price document determine a number.

**Third, you cannot use the model's confidence as your gate.** The measured AUROC of 0.54 is barely better than a coin flip. Building "if confident, auto-approve; else ask the owner" on native model confidence would auto-approve almost nothing safely (0.1–7%) or, if tuned to approve more, would approve wrong values. Getting to 49–72% auto-approval required a purpose-built three-channel confidence stack with conformal risk control — a substantial research-grade engineering effort, not a prompt.

### What goes wrong on real documents

Ordered by how likely a small service business is to hit it:

1. **Multiple contradicting price lists.** The owner uploads last year's rate card and this year's; or a trade-customer list and a retail list. Retrieval has no principled way to choose — and worse, no way to *know* it is choosing. The dedicated commercial price-list parsers examined all explicitly "flag ambiguous or conflicting rows for review" rather than resolving them. **(Confirmed)**
2. **Prices in prose, not tables.** "Standard callout is €80, or €120 outside normal hours, waived if the work goes ahead." Extracting this needs the *rule*, not just the number. Table-extraction benchmarks do not measure this at all — it is a gap in the evidence, and a gap in the tooling.
3. **Scanned and photographed documents.** Phone photos of a laminated price sheet are the realistic worst case: skew, shadow, sub-300-DPI. **(Likely)**
4. **Merged cells and multi-level headers.** Pipeline parsers handle these better than general VLMs; general VLMs handle degradation better. There is no single tool that is best at both. **(Confirmed)**
5. **Handwritten annotations.** "+15% since March" pencilled in a margin. Documented to confuse layout detectors. **(Likely)**

### Extract-then-confirm: how well does it work?

This is a real, mature pattern with measured performance — from accounts-payable automation, which is the closest well-instrumented analogue.

- Well-configured human-in-the-loop pipelines reach **99–99.5% field accuracy**, versus 95–99% for AI-only. **(Likely)**
- Straight-through rates: **60–75% after three months of tuning** is the recommended target; AP industry average touchless rate is **32.6%**, best-in-class **49.2%**. **(Likely)**
- Review effort: roughly **45 seconds per flagged document**, against ~120 seconds fully manual. **(Likely)**

The pattern that makes it work is consistent across sources: extract everything, score confidence per field, route only low-confidence fields to a human, show the source document side by side with the extracted value so the reviewer verifies without switching screens. SAP Document AI's onboarding flow is a clean production example — extract from the uploaded ID document, then "prompt the user to review the information and correct any mistakes before submitting." **(Confirmed)**

**Realistic review time for a rate card.** No source measured this specific task — see section 9. Extrapolating from 45 seconds per flagged item: a 40-line price list with a 60% straight-through rate leaves ~16 lines to check, i.e. **10–15 minutes of review**. That is a good outcome and far better than typing 40 lines from scratch. But it is *minutes of careful work*, not "done in seconds", and the team's onboarding copy should promise the former.

---

## 4. The RAG-for-pricing question — the honest answer

### Does anyone let a model read a price document and state a price to a customer?

**Yes — and specifically the lightweight AI receptionists.** Rosie, MyAIFrontDesk and Upfirst all let a business upload pricing spreadsheets or scrape a website into a knowledge base, from which the agent answers pricing questions. Upfirst's own help page gives "Our basic plans start at $24.95 per month for 30 calls" as a worked example, and contains **no warning at all** about price accuracy, staleness, or quoting risk. **(Confirmed)**

So the team's proposal is not unheard of. It is, however, the practice of the least-regulated, lowest-stakes tier of the market, and it is done for *informational* answers, not approved quotes.

**Nobody found does it for a binding quote.** Every AI quoting product examined — BuildFolio, Sleepless Tradesman, Field Ascend, Buildxact, QuoteIQ — drafts from the owner's structured price book and keeps the owner as approver before the customer sees anything. BuildFolio is explicit: "AI is your starting point, not the final word." **(Confirmed)**

Most tellingly, the specialist AI-voice guidance for service businesses independently arrived at the team's own rule, and goes further:

> "Don't let it quote firm prices — 'we don't lock in prices over the phone, someone will confirm on site' is safer and truer for most trades."

And the products that do handle pricing properly expose it as **structured configuration with an explicit pricing strategy per service** — Fixed ("AI quotes the exact price you entered"), Range, or Estimate-Based ("AI explains a quote is needed"). That is a typed field on a structured Offerings record. It is not a document. **(Confirmed)**

### What goes wrong — the documented cases

| Case | What happened | Consequence |
|---|---|---|
| **Moffatt v Air Canada, 2024 BCCRT 149** | Chatbot invented a retroactive bereavement-fare refund policy contradicting the real policy on another page of the same site | Tribunal found **negligent misrepresentation**; rejected Air Canada's argument that the chatbot was a separate agent; held Air Canada responsible for all information on its website "whether from a static page or a chatbot" and found it "did not take reasonable care to ensure that the chatbot was accurate". Damages CAD $812.02 (partial refund $650.88 + fees). Global reputational coverage. **(Confirmed)** |
| **BMW Toronto dealership, 2026** | AI chatbot "Quinn" offered $27,162 for a customer's car; a salesperson said it was an AI mistake and offered ~$7,000 less | After CBC contacted the dealership, it **paid the original ~$27,000**. **(Likely** — one media account) |
| **Chevrolet of Watsonville, Nov 2023** | Prompt injection made a ChatGPT-powered bot "agree" to sell a $76,000 Tahoe for $1, saying "that's a legally binding offer – no takesies backsies" | 20M+ views; bot also recommended Fords, wrote Python, gave wrong inventory and pricing; **dealership pulled the chatbot entirely**. **(Confirmed)** |
| **Cursor / Anysphere, April 2025** | AI support bot "Sam" invented a single-device subscription policy that did not exist, unlabelled as AI | Users **cancelled subscriptions**; company apologised, issued refunds, moved to label AI replies. **(Confirmed)** |

Two patterns are worth naming. First, in all four cases the business ended up honouring or paying — not because a court ordered it in three of them, but because refusing looks worse. **The practical exposure is not the litigation risk; it is that you will simply have to eat it.** Second, the Chevrolet case shows prompt injection can drive the number, which means a document-plus-RAG pricing path is not only accidentally wrong sometimes but *adversarially steerable* by the customer the agent is talking to.

### Is a quoted price legally binding in Europe?

**Materially, yes — and more so for services than for mispriced goods on a website.** The familiar "shop window is only an invitation to treat, so a mispriced item need not be sold" reasoning is about *goods displayed for sale*. A quote given to a specific customer for a specific job is a different legal animal: it is an offer, and it binds on acceptance.

| Jurisdiction | Position | Label |
|---|---|---|
| **UK** | An **estimate** is a guide and may rise to a "reasonable" figure under CRA 2015 s.51 with timely written notice (commonly framed as +10–15%). A **quotation** is a fixed, binding price: once accepted in writing, by text, or by authorising work to start, "a court will hold you to it even if the job turns out harder than expected, unless you included a variation clause the customer agreed to." | **Confirmed** |
| **Sweden** | Statutory: under *konsumenttjänstlagen*, an approximate price (*ungefärlig prisuppgift*) **may not be exceeded by more than 15%** unless another limit was agreed or a s.38 supplement applies. Consumer may refuse the excess. | **Confirmed** |
| **Denmark** | *Tilbud* (offer) is binding and cannot as a rule be changed. *Overslag* (estimate) may be exceeded only to a limited extent; under AB Forbruger the trader must notify as soon as it is clear the price will exceed the estimate by more than 15%, or the consumer may refuse the excess. No fixed statutory percentage, but the complaints board commonly applies ~15% as a rule of thumb. | **Confirmed** |
| **Netherlands** | An *offerte* is an offer; binding once accepted, and acceptance needs no signature (oral, written or implicit). Revocable before acceptance under Art 6:219 DCC. A *manifestly* wrong price (exorbitant discount, extremely low price) need not be honoured, but the seller must correct it promptly. Art 6:228 DCC *dwaling* may void a contract formed under mistake — notably where the non-mistaken party knew or should have known of the mistake. | **Confirmed** |
| **Ireland** | Misleading commercial practices, including as to price, are prohibited under the Consumer Protection Act 2007 (transposing the Unfair Commercial Practices Directive); false or misleading claims about price can be a **criminal offence**. Whether a *displayed* price must be honoured turns on invitation-to-treat reasoning; online terms commonly reserve a right to cancel on genuine or obvious pricing error. | **Confirmed** on the CPA 2007 prohibition; **Unclear** on the specific invitation-to-treat position for service quotes — see section 9 |
| **General escape hatch** | Across these systems, an *obvious* error is escapable (Dutch clear-mistake rule, Art 6:228 DCC, Swedish *förklaringsmisstag* under s.32 Avtalslagen where the recipient knew or should have known of the mistake, English *Hartog v Colin & Shields*). If the recipient was in good faith, **the sender is bound by their mistake.** | **Confirmed** |

**The practical reading for this product.** The escape hatch only helps for absurd numbers. A €1 boiler replacement is escapable; **€340 for a job that should be €480 is not** — it is plausible, the customer accepted in good faith, and the business is bound. And a plausible-but-wrong number is precisely what wrong-row retrieval produces. The error mode of the proposed architecture sits exactly in the legally unescapable band.

**Two further points the team should note:**

- **AI Act.** Not high-risk. Annex III point 5 covers essential public benefits, creditworthiness, *life and health insurance* pricing, and emergency dispatch. Quoting a plumbing job is none of these. **(Confirmed)** What *does* apply is **Article 50 transparency**, enforceable from **2 August 2026** — already in force today: the customer must be informed they are interacting with AI at the latest at first interaction, clearly and accessibly. Generative outputs must be machine-readable-marked, with a 2 December 2026 deadline for systems already on the market. **(Confirmed)**
- **GDPR Article 22.** The right not to be subject to a decision based solely on automated processing applies where the decision produces legal effects or similarly significantly affects the person. A quote for a service is a weaker case than credit scoring, but the team's owner-approval step disposes of the question entirely — with a human approving, it is not "solely automated." **This is an additional reason to keep owner approval, independent of accuracy.** **(Likely)**

### The established separation pattern

The industry pattern is named, consistent, and exactly what the team already wrote down:

> **"Model proposes, system disposes."** The AI handles the language task. Typed tools handle every factual retrieval and computation: `resolve_product(description)` → real SKUs; `get_price(sku, account)` → the pricing tier from the system of record; `check_stock(sku, branch)` → live availability. **"The model never computes this."**

Experlogix frames the same split for CPQ: "The AI handles the interaction. The engine handles the truth" — because "a language model treats rules as context to weigh, not constraints it's bound by," and pricing "must be enforced, not generated." **(Confirmed across 3+ independent sources)**

OWASP's RAG Security Cheat Sheet adds the governance layer: return source attribution with every response (which documents, which chunks, what provenance); require explicit user confirmation for high-risk actions; enforce tenant isolation at the index with pre-retrieval filtering, never post-filtering. Its summary line is the one to put in the architecture doc: **"RAG does not reduce risk — it redistributes it across the data pipeline."** **(Confirmed)**

There is also a specific warning about the naive RAG topology for prices: a nightly-rebuilt vector index becomes "a second source of truth you now have to keep synchronised with the first," and prices rot between update cycles. Prices should be typed fields with effective dates, expiry, currency and region — not text chunks. **(Likely)**

### Verdict

**Document-upload-plus-RAG as the price source is unsafe, and the team's instinct is correct.** The reasons, in order of force:

1. The dominant failure mode is **silent** (46.89% of table-reading errors still produce plausible answers), so it cannot be caught by reviewing outputs.
2. The wrong numbers land in the **plausible band**, which is exactly where consumer law gives no relief.
3. It is **adversarially steerable** via prompt injection (Chevrolet).
4. A retrieved chunk cannot express a **pricing rule** — minimums, callout fees, out-of-hours multipliers, travel bands, tiering. It can only express a number that appeared near some words.
5. It has **no versioning or effective dates**, so it goes stale silently.
6. **Non-reproducibility.** When a customer disputes a quote six weeks later, "the retriever returned this chunk" is not an audit trail. A deterministic computation over versioned structured data is.

**But the team should not over-correct.** The architecture rule bans the model from *producing the number*. It does not ban documents from onboarding. Using extraction to draft a structured rate card that the owner confirms, after which deterministic code computes from the confirmed data, **fully honours the rule** — the number is still computed by code from structured data that a human approved. The team should not let a correct principle about the runtime path talk them out of a good idea about the setup path.

---

## 5. The hybrid options

### Option A — Upload, AI extracts a draft rate card, owner confirms, pricing then runs deterministically

**Does anyone do it?** Yes, in two halves, both mature. The extraction-and-confirm half is standard practice: Flatfile, CSVBox and SAP Document AI all implement file → map → validate → confirm with auto-suggested mappings the user can override and a preview before commit. The deterministic-pricing-from-structured-data half is standard in CPQ and in the `get_price(sku, account)` tool pattern. The AI quoting products (BuildFolio, Field Ascend) already join draft-generation to owner approval. **(Confirmed)**

**How well?** Extraction reaches 99–99.5% field accuracy with human-in-the-loop, 60–75% straight-through after tuning, ~45 s per flagged item. **(Likely)** The load-bearing engineering is the confidence layer: naive model confidence auto-approves 0.1–7% safely; a purpose-built calibrated stack reaches 49–72%. **(Confirmed)** Budget for that, or accept that the owner reviews most fields.

**Assessment: this is the right answer.** It converts the document from an authority into a *data-entry accelerant*. Crucially it also converts a passive, unverifiable risk into an active, timestamped one: the owner clicked Confirm on this rate card at this time, and you can show them the source page next to each value. That artefact is worth as much legally as it is operationally.

**Design notes from the evidence:** show source document and extracted value side by side; flag low-confidence fields rather than all fields; **refuse to auto-resolve contradictions** between uploads — surface them (the commercial parsers all do exactly this); store each price as a typed field with effective date, currency and region, not a text chunk; version the confirmed rate card so any past quote can be re-derived.

### Option B — Guided wizard with per-industry smart defaults, so the owner corrects rather than creates

**Does anyone do it?** Yes, and it is the highest-leverage thing found in the whole study. Profit Rhino ships ~8,500 expert-maintained, pre-priced tasks covering >90% of common repairs across HVAC, plumbing, electrical and pool/spa, with images, descriptions and structured upsells, quarterly updates, and "up and running in as little as a single day." Housecall Pro resells it at $199/month with onboarding included. Jobber sequences its onboarding guide by business type with per-step time estimates. Stripe prefills business type and defaults country, and credits **progressive disclosure** — asking for information only when needed — for its activation lead, with LLMs auto-clearing over 80% of supportable merchants instantly. **(Confirmed)**

**Assessment: pair this with Option A; do not choose between them.** A pre-priced industry template plus "adjust your rates" is a fundamentally easier cognitive task than either filling forms or auditing an extraction. It also solves what extraction cannot: the owner may have *no document* for their callout fee or minimum charge because it lives in their head. A default gives them something to react to. Evidence supports the mechanism generally — personalised paths lift completion 35–41%, adaptive flows cut abandonment 31.8% **(Likely)** — though the trade-specific numbers are Profit Rhino's own.

### Option C — Import from software they already use

**Does anyone do it?** Yes, universally. Every FSM examined accepts CSV. Jobber, FieldPulse and ServiceTitan all integrate Xero; QuickBooks/Xero two-way sync moves customers, service items and pricing. Field Promax reports most customers connected to QuickBooks "within an hour of signing up." ServiceM8's supplier-email auto-import is the most elegant variant found. **(Confirmed)**

**Assessment: highest quality data available, but narrowest reach.** Data from Jobber or Xero is already structured, typed and current — no extraction risk at all. But a business already running Jobber has largely solved its own pricing problem, and the segment most at risk of setup abandonment is precisely the one with a laminated sheet and a phone. Build it for the segment that has it; do not let it be the primary path.

### Option D — Start minimal, let the system ask for more as it hits gaps

**Does anyone do it?** The principle is well established as **minimum viable onboarding** and **progressive disclosure** — "enough guidance to reach first value, then add more only when evidence shows it is needed"; Stripe's just-in-time asking is the canonical example. **(Confirmed)** A product that specifically starts with two or three priced services and then asks the owner mid-conversation when the agent hits an unpriced job was **not found**. **(Unclear)**

**Assessment: strongest single lever on abandonment, and the closest thing to genuinely new here.** The evidence on why is strong: 72% abandon onboarding requiring too many steps; cutting a signup form from 7 fields to 3 cut funnel abandonment 44.7%; adding a progress bar cut stage-1→2 drop-off from 38.4% to 24.1%. **(Likely)** It also fits the domain: a real gap ("someone just asked about a bathroom install and you haven't priced that") is far more motivating than an empty form field, and it arrives with the owner's attention already on the problem.

The design risk is the gap-handling path. When the agent meets an unpriced service it must degrade gracefully — capture the lead, tell the customer a human will confirm, notify the owner — not guess. That escalation path is the feature, and it is the same mechanism as the recommended "we don't lock in prices over the phone" posture. Build it once; it serves both.

### Option E — RAG for general questions, structured data for anything involving money

**Does anyone do it?** Yes, and it is the settled division of labour. Soft guardrails (prompting and RAG over policy documents) versus hard guardrails at the action layer, where "every payment-like action is ultimately a function call." Experlogix's split: AI interprets and explains, engine validates and prices. OWASP: the model generates text, it does not enforce policy. **(Confirmed)**

**Assessment: not optional — this is the architecture.** It is the correct reading of the team's own rule and it is what the evidence supports. RAG over service descriptions, policies, guarantees, FAQs, parking and access notes is genuinely valuable and comparatively low-risk. RAG over anything that becomes a number is not.

Two conditions from OWASP: return source attribution with every retrieved answer, and enforce **tenant isolation at the index** with namespaces and pre-retrieval filtering — including tenant ID in cache keys, since a shared cache leaks across tenants silently. For a multi-tenant product this is not a refinement; cross-tenant retrieval of a competitor's prices would be a reportable breach. **(Confirmed)**

### What the team is inventing

Almost nothing, which is good news. A, B, C and E are all established patterns with named products behind them. The genuinely novel combination is **D applied to pricing** — a conversational agent that runs on deliberately partial pricing data and drives its own completion by escalating real gaps. No product doing this was found. That is the interesting product bet, and it is a defensible one because it is the direct answer to the failure mode the team is most worried about.

### Recommended combination

1. **Ask the trade, load a pre-priced industry template** (Option B) — owner starts with something to correct, not a blank form.
2. **Offer import if they have it** (Option C) — Jobber, Xero, CSV. Structured, current, zero extraction risk.
3. **Offer document upload as an accelerant** (Option A) — extract a draft, show source beside value, flag low confidence, surface contradictions rather than resolving them, require explicit confirmation, version the result.
4. **Require only a handful of services priced before going live** (Option D) — with a designed escalation path for gaps.
5. **Never compute a price from retrieval** (Option E) — deterministic computation over the confirmed structured rate card, always; RAG only for prose.

---

## 6. What must be structured versus what can be extracted

| Information | How it should get in | Can a document supply it? | How often it changes | Notes |
|---|---|---|---|---|
| **Service list** (what they do) | Industry template → owner ticks/edits; or website scan; or document extraction | **Yes, well.** Reception.ai extracts services from a website in 1–5 min; AI receptionists routinely scrape service lists | Rarely — a few times a year | Lowest-risk extraction target. Wrong service = a fixable conversation, not a binding number. Good first win. |
| **Prices per service** | Extract → **owner confirms** → stored as typed fields with effective date, currency, region | **As a draft only.** Field accuracy 83–96%, document 28–77%; silent wrong-row errors | Quarterly to annually; more often with material costs | Never the live authority. Version it so any past quote is re-derivable. |
| **Pricing rules** (minimum charge, callout fee, out-of-hours multiplier, travel bands, tiering, discounts) | **Structured form or wizard. Essentially never extraction.** | **Largely no.** Rules live in prose, or in the owner's head with no document at all | Rarely | The hard part. Real products expose a typed **pricing strategy per service** — Fixed / Range / Estimate-Based. Rules must be *enforced, not generated*; a retrieved chunk cannot express "minimum 1 hour, 50–100% of hourly rate for travel, 1.5–2× on holidays". Defaults per trade are the best lever here. |
| **Service area** | **Map/postcode object.** Postcode list, radius, drive-time or drawn polygon | **Weakly.** A website may say "Dublin and surrounds" — not resolvable to a boundary | Rarely | FSM standard: ZIPs, radius, drive-time, or hand-drawn polygons, with hierarchies; a postcode cannot be assigned to two territories. Needs to be a geo object because the agent must answer yes/no, not "probably". |
| **Job size limits** (min/max they handle) | **Short structured form**, with per-trade defaults | **Rarely.** Almost never written down | Rarely | Cheap to ask (two numbers), impossible to infer. Classic case for a wizard with defaults. |
| **Parts stock** | **Live connection** (FSM/inventory API) or explicit in-app state; otherwise **do not claim it** | **No.** A document is stale the moment it is uploaded | **Daily to hourly** | Smaller operators often do not track van stock in software at all — inventory is "not a native workflow in many systems," forcing contractors to manage it outside the system. Sound default: **do not assert parts availability.** Quote the job; let the owner confirm parts at approval. |
| **Crew availability** | **Live from the calendar / dispatch board / capacity rules** | **No.** | **Continuously** | ServiceTitan drives booking from real-time availability, job types, zones and capacity rules, with Reserve-with-Google surfacing it publicly. Jobber uses a drag-and-drop calendar. The pattern is unambiguous: availability comes from live scheduling state. Specialist guidance also warns the agent must not promise arrival times it cannot verify against the calendar. |

### The through-line

Sort by rate of change and the design writes itself. **Static and written down** (services, prices) → extraction with confirmation. **Static but unwritten** (pricing rules, job size limits, service area) → wizard with per-trade defaults; extraction will not help because no document exists. **Volatile** (stock, crew) → live connection, or the agent must stay silent and escalate.

The last row is the most likely source of a bad customer experience in this product. An agent that gets a price slightly wrong causes an argument. An agent that books a crew that does not exist, or promises a part that is not on the van, causes a missed appointment — and small service businesses live or die on that. The honest, defensible default is for the agent to qualify and quote, and for scheduling and parts confirmation to sit behind the owner's approval step until there is a live connection worth trusting.

---

## 7. Onboarding evidence — what actually makes setup succeed

**Health warning on this section.** Nearly all of it is vendor-published or aggregator-compiled. Several widely repeated figures (75% churn in week one; 90% churn without engagement in three days; 72% abandon if too many steps) circulate without a traceable primary study. Treat them as directional. The academic paper located on onboarding friction (*Statistics, Optimization & Information Computing*) is explicitly built on **50 synthetically generated interview records** and its authors state the patterns are "hypotheses for validation with authentic users rather than population estimates" — it is not evidence of what real users do. **(Confirmed** that it is synthetic**)**

### What holds up best

| Finding | Number | Label |
|---|---|---|
| Median free-to-paid conversion, 200 B2B products surveyed Jan 2026 | **8%**, highly skewed; **10× spread** between top and bottom quintile | **Confirmed** (ChartMogul, primary survey, n=200) |
| Credit card at signup | opt-in trial 8–22% (median 14%) vs opt-out 35–55% (median 44%) | **Confirmed** (same) |
| Average SaaS activation rate | **37.5%** — about two-thirds of signups never reach core value; top quartile 55–75% | **Likely** |
| Human touch in trials | 80% of free-trial products include human touchpoints for enterprise users; effect on conversion **not isolated** | **Confirmed** (ChartMogul explicitly did not isolate it) |
| Dedicated trial success manager | 22.4% conversion vs 10–15% category average | **Likely** (single secondary source) |
| Personalised onboarding paths | +35–41% completion | **Likely** |
| Adaptive flows keyed to role/stated goal | −31.8% total abandonment | **Likely** |
| Fewer fields (7 → 3) | −44.7% funnel abandonment | **Likely** |
| Visible progress bar | stage-1→2 drop-off 38.4% → 24.1% | **Likely** |
| Reaching value within 10 days | 85% continue long-term (attributed to Bain) | **Likely** — Bain original not located |
| Average time-to-value | ~1 day 12 hours | **Likely** |
| Stripe LLM-assisted onboarding | auto-clears **>80%** of supportable merchants instantly | **Likely** (Stripe's own) |

### Realistic time-to-value target

**Minutes to first meaningful output; under an hour to live on a narrow slice; days only if a human is doing it for them.** This is where the market is. Sameday: taking calls in 30 minutes. Reception.ai: automated setup under 10 minutes. ServiceM8 and Tradify: live in a day or two. Profit Rhino: running in a single day *with* a full price book. Jobber: fully onboarded within a week. **(Confirmed)** At the other end, ServiceTitan's 6–12 months and 42% incomplete pricebooks show what happens when completeness is required before value.

Concretely for this product: **first realistic quote inside 15 minutes, on 3–5 services.** Anything that requires the whole rate card before the first quote inherits ServiceTitan's problem.

### Do progressive onboarding, partial save, and sandbox mode help?

- **Progressive onboarding / progressive disclosure: yes, best-supported of the three.** Converging evidence: contextual onboarding with progressive disclosure reported at 75% completion and +30% paid conversions; personalised paths +35–41%; adaptive flows −31.8% abandonment; Stripe credits progressive disclosure for its activation lead and auto-clears >80% of merchants with LLM assistance; minimum-viable-onboarding is a named, widely-adopted pattern. **(Likely, converging)** A widely-quoted "53% average completion from Chameleon's 15-million-interaction dataset" **could not be verified** — Chameleon's published figures are 30–40% average tour completion, 60%+ for user-triggered modular tours, and a 54% *microsurvey* completion rate. Do not cite the 53% figure.
- **Partial save / resume: yes, and treat it as table stakes rather than an optimisation.** The mechanism is obvious and the guidance consistent — without saved progress every interruption forces a restart. A tradesperson setting up between jobs *will* be interrupted. No controlled measurement of the isolated effect was found. **(Likely** on effect, **Confirmed** on it being standard recommended practice**)**
- **Sandbox / test mode: yes, but for a different reason than the team may expect.** The documented value is risk reduction, training, demos and evaluation — Stripe makes sandboxes the default testing method for new businesses. **(Confirmed)** No measurement of sandbox mode lifting activation or conversion was found. **(Unclear)** For this product the argument is nonetheless strong and specific: an owner will not point an AI agent at real customers on partly-configured pricing. A test mode where they watch it handle a fake enquiry is how they earn the confidence to go live — and it doubles as the cheapest way for them to *discover* their own pricing gaps before a real customer does.

### Free trial with incomplete setup vs guided setup

**Directionally yes, incomplete setup converts worse — but the causal evidence is weaker than it is usually presented.** Activation at 37.5% average against 55–75% top quartile, and the 10× spread between best and worst self-serve products, both point the right way. The trial-success-manager figure (22.4% vs 10–15%) is the most direct datum and rests on a single secondary source. ChartMogul, the best primary survey found, **explicitly did not isolate** the effect of human touchpoints on conversion. **(Likely, not Confirmed)**

The most robust lever in the primary data is not guided setup at all — it is **requiring a card at signup** (median 44% vs 14%). Worth weighing separately from the setup question.

---

## 8. Gaps and risks in the team's proposed approach

**Risk 1 — Using retrieval over documents as the live price source.**
Silent wrong-row errors (5.7–46.5% data-referencing error rate; 46.89% of errors still yield plausible answers), plausible-but-wrong numbers landing in the legally unescapable band, prompt-injection steerability, no rule expressiveness, no versioning, no audit trail.
**Mitigation:** Keep the existing rule, unchanged. Documents feed *setup*, never runtime pricing. Runtime uses `get_price`-style typed tools over the confirmed rate card. Deterministic code computes; the model writes prose around the number.

**Risk 2 — The team's legal justification is wrong, which makes the rule fragile.**
The rule is currently defended by reference to EU rules on automated decisions. Service quoting is not in AI Act Annex III; if someone checks, the stated rationale collapses and the rule looks like over-engineering — and gets relaxed.
**Mitigation:** Re-found the rule on the reasons that actually hold: (a) accepted quotes bind under UK/NL/IE/SE/DK consumer and contract law, with Sweden's statutory 15% cap and Denmark's ~15% board norm; (b) *Moffatt v Air Canada* and the 2026 BMW Toronto case show businesses being held to bot-stated prices; (c) auditability and reproducibility for disputes. Keep the automated-decision point as a secondary argument — GDPR Art 22 does not bite once a human approves, which is itself a reason to keep approval. Add the obligation that *does* apply: **AI Act Article 50 transparency, enforceable 2 August 2026** — disclose AI at first interaction, mark generative outputs machine-readably (2 December 2026 for systems already on market).

**Risk 3 — Auto-approving extracted prices on model confidence.**
Native model confidence has AUROC 0.54–0.74 and clears only 0.1–7.0% of fields under a <10% error target. A naive "confident → auto-approve" gate silently ships wrong prices.
**Mitigation:** Require explicit owner confirmation on the first rate card regardless of confidence. Use confidence only to *order* the review queue, not to skip it. If auto-approval is later wanted, budget for a real calibrated stack (perception/layout/validation channels with conformal risk control gets to 49–72%) and treat it as a research project.

**Risk 4 — Contradicting uploads resolved silently.**
Two price lists, or last year's and this year's, is the *normal* case. Retrieval picks one without knowing it chose.
**Mitigation:** Detect and surface conflicts; make the owner choose. Every commercial price-list parser examined does exactly this ("flag ambiguous or conflicting rows for review"). Store effective dates so supersession is explicit rather than inferred.

**Risk 5 — Pricing rules cannot be extracted, and they are most of the complexity.**
Minimum charges, callout fees, travel bands, out-of-hours and holiday multipliers (commonly 1.5–2×), tiering. Often written nowhere.
**Mitigation:** Per-trade wizard with defaults; owner corrects. Adopt the Fixed / Range / Estimate-Based strategy field per service that real AI-voice products use. Accept that this is a form — and make it a *short, pre-filled* form rather than trying to make it disappear.

**Risk 6 — Asserting stock or crew availability from static data.**
Stock and availability change daily to hourly. Small operators frequently do not track van stock in software at all.
**Mitigation:** Do not assert either unless there is a live connection. Default the agent to qualify-and-quote, with parts and scheduling confirmed at the owner's approval step. Never let the agent promise an arrival time it cannot verify against a calendar.

**Risk 7 — Cross-tenant retrieval leaking one business's prices to another's customers.**
This is a multi-tenant product. The documented failure is plausible-looking answers drawn from another tenant, unnoticed for days.
**Mitigation:** Per-tenant namespaces with **pre-retrieval** filtering, not post-filtering (post-filtering exposes data during the search phase). Include tenant ID as a hard component of every cache key. Return source attribution on every retrieved answer so provenance is checkable.

**Risk 8 — Promising "done in minutes" when review is minutes of careful work.**
Overselling extraction produces a worse abandonment problem than forms, because the owner arrives expecting magic and instead audits a table.
**Mitigation:** Frame the upload as "we'll fill this in for you — you check it", with a visible count of items needing attention and a progress indicator (progress bars cut stage drop-off 38.4% → 24.1%). Promise **first quote in 15 minutes on a few services**, not a complete configured business.

**Risk 9 — Requiring completeness before first value.**
The ServiceTitan lesson: 42% of polled users had no working pricebook after three months. Requiring the full rate card before the agent runs imports that failure directly.
**Mitigation:** Go live on 3–5 priced services. Build the gap-escalation path as a first-class feature. Partial save throughout — owners set this up between jobs.

**Risk 10 — No "prices as of" versioning, making disputes unwinnable.**
Six weeks after a quote, "the retriever returned this chunk" is not a defence.
**Mitigation:** Version the confirmed rate card; stamp every quote with the rate-card version and inputs used, so any past quote can be re-derived exactly. This is cheap now and very expensive to retrofit.

**Risk 11 — Owner approval becoming a rubber stamp.**
The approval step carries the legal and quality load (it is also what keeps this outside GDPR Art 22). If it becomes one-tap on a phone notification, the protection is nominal.
**Mitigation:** Surface *why* a quote came out as it did — service matched, rate applied, rules triggered, rate-card version. Flag quotes that are unusual against the owner's own history. Make the approval a decision with visible inputs, not a confirmation dialog.

---

## 9. What could not be established

1. **Review time for a rate card specifically.** Found: ~45 s per flagged document in AP automation; 60–75% straight-through after tuning. Not found: any measurement of an owner reviewing an extracted price list. *To close:* instrument your own beta — time-to-confirm, fields edited, fields wrong, abandonment mid-review. This is a two-week experiment and it is the single most valuable number the team could generate.
2. **Whether any AI agent quotes from RAG over documents *and* treats it as binding.** Searched AI receptionists, AI quoting tools, CPQ, voice agents for trades. The uploads exist (Rosie, MyAIFrontDesk, Upfirst); binding quotes from them were not found. Absence of evidence, not evidence of absence. *To close:* trial two or three AI receptionists with a deliberately ambiguous price list and see what the agent says on a call. A day's work.
3. **Hard abandonment rates for pricing setup.** The ServiceTitan 42% figure is reported via a specialist consultancy summarising a user poll; the poll itself was not located. *To close:* ask the consultancy for the source; run your own survey of owners who signed up and never went live.
4. **The Irish invitation-to-treat position for service quotes.** Confirmed: CPA 2007 prohibits misleading price claims, criminally. Not confirmed: whether an Irish court treats a *displayed* price as an invitation to treat, and how that maps to an automated quote. The Citizens Information pricing page returned HTTP 403. *To close:* one hour of Irish legal advice, or read the CCPC business guidance directly.
5. **Whether a quote generated by an unsupervised automated agent is treated differently from one a human sent.** All the sources found address quotes generally, or chatbot *statements* (Moffatt). The specific question — does owner approval change the legal character of the quote — was not answered. *To close:* this is the highest-value legal question the team has. Worth a short written opinion covering one common-law and one civil-law target market.
6. **Sandbox/test mode effect on activation or conversion.** Documented value is risk reduction and training. No measured activation lift found. *To close:* A/B it yourselves.
7. **Extraction accuracy on prose-embedded pricing rules.** All benchmarks found measure tables, forms and key-value fields. Nothing measures "callout €80, waived if work proceeds." *To close:* build a small internal eval set — 20–30 real rate cards from target trades, hand-labelled including rules — and measure. This is also the asset that tells you whether Option A is viable per trade.
8. **The Chameleon "53% completion" figure.** Could not be reproduced; Chameleon's published numbers are 30–40% tour completion, 60%+ modular, 54% microsurvey. Do not cite 53%.
9. **Bain's "85% reaching value within 10 days" original.** Widely quoted, primary not located. Treat as directional.
10. **Sameday's pricing configuration specifics.** Their 30-minute setup claim is published; how pricing is configured, and whether the agent quotes, is not. The marketing page did not answer it. *To close:* book their demo.

---

## 10. Sources

All accessed 26 September 2026.

**Comparable product onboarding**
- ServiceTitan onboarding checklist — https://www.bluecollarnerd.com/servicetitan-onboarding-checklist/
- ServiceTitan reviews, pros/cons/criticisms — https://www.getonecrew.com/post/servicetitan-reviews
- ServiceTitan pricebook mistakes — https://winktoolbox.com/blog/how-to-avoid-painful-pricebook-mistakes-in-servicetitan
- ServiceTitan pricing analysis 2026 — https://projul.com/blog/servicetitan-pricing-analysis-2026/
- Housecall Pro — Price Book import/export — https://help.housecallpro.com/en/articles/7173129-price-book-import-or-export-services-and-materials
- Housecall Pro — Price Book services guide — https://help.housecallpro.com/en/articles/5090568-price-book-services-guide
- Housecall Pro — Profit Rhino guide — https://help.housecallpro.com/en/articles/8754493-profit-rhino-with-housecall-pro-a-complete-guide
- Profit Rhino — prebuilt price book rationale — https://profitrhino.com/profit-rhino-prebuilt-price-book/
- Jobber pricing and onboarding — https://www.getjobber.com/pricing/
- Jobber scheduling — https://www.getjobber.com/features/scheduling/
- Tradify — import a supplier price list — https://help.tradifyhq.com/hc/en-us/articles/360016148714-How-To-Import-a-Supplier-Price-List
- ServiceM8 — automated supplier import add-on — https://support.servicem8.com/hc/en-us/articles/360001174576-How-to-use-the-Automated-Supplier-Import-Add-on
- ServiceM8 alternatives / setup timelines — https://tradiescaler.com/job-management/servicem8-alternatives/
- Simpro pricing — https://www.simprogroup.com/pricing
- FieldPulse review and implementation — https://contractortoolstack.com/software/fieldpulse/
- QuickBooks/Xero field service integration — https://www.fieldpromax.com/blog/integrate-quickbooks-and-xero-for-field-service
- Avoca AI pricing and onboarding — https://getdriive.com/blog/avoca-ai-pricing
- Sameday pricing — https://sameday.ai/pricing
- Reception.ai quickstart (ElevenLabs) — https://elevenlabs.io/docs/reception-ai/quickstart
- Upfirst — customise AI receptionist with knowledge base — https://help.upfirst.ai/en/articles/11574454-how-to-customize-your-ai-receptionist-with-the-knowledge-base
- BuildFolio AI quote — https://build-folio.com/features/ai-quote/
- Field Ascend AI quote generation — https://field-ascend.com/en-us/ai-quote-generation
- Dynamics 365 Field Service — set up postal codes — https://learn.microsoft.com/en-us/dynamics365/field-service/set-up-postal-codes
- ServiceTitan Scheduling Pro — https://www.servicetitan.com/features/pro/scheduling
- ServiceTitan crew scheduling — https://help.servicetitan.com/v1/docs/use-crew-scheduling-2
- BuildOps field inventory management — https://buildops.com/resources/field-inventory-management-software
- Trip charge / minimum fee practice — https://www.smartservice.com/blog/trip-charge-minimum-fee

**Document extraction**
- PureDocBench: How Far Is Document Parsing from Solved? — https://arxiv.org/abs/2605.07492
- OmniDocBench — https://arxiv.org/pdf/2412.07626
- When LLMs Read Tables Carelessly: Measuring and Reducing Data Referencing Errors — https://arxiv.org/html/2606.32029v1
- Calibrated Confidence for Reliable Straight-Through Processing of Financial Documents — https://arxiv.org/abs/2609.20110
- Real-Time Trustworthiness Scoring for LLM Structured Outputs — https://arxiv.org/pdf/2603.18014
- Beyond String Matching: Semantic Evaluation of PDF Table Extraction — https://arxiv.org/pdf/2603.18652
- Parseur — human-in-the-loop best practices — https://parseur.com/blog/hitl-best-practices
- Parseur — AI invoice processing benchmarks 2026 — https://parseur.com/blog/ai-invoice-processing-benchmarks
- Docsumo — human-in-the-loop systems — https://www.docsumo.com/blog/human-in-the-loop-systems
- LlamaIndex — OCR accuracy explained — https://www.llamaindex.ai/blog/ocr-accuracy
- Docparser — PDF price list processing — https://docparser.com/solutions/price-list-pdf-processing/
- Apify — supplier price list parser — https://apify.com/invincible_nova/supplier-price-list-parser
- CSVBox — AI-assisted data onboarding — https://blog.csvbox.io/ai-assisted-data-onboarding-saas/
- SAP Document AI in Onboarding — https://help.sap.com/docs/successfactors-onboarding/implementing-onboarding/enabling-sap-doc-ai-in-onboarding
- Flatfile — https://flatfile.com/

**RAG, guardrails, architecture**
- OWASP RAG Security Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html
- Experlogix — prevent AI quoting errors with rules-based CPQ — https://experlogix.com/prevent-ai-quoting-errors-with-rules-based-cpq/
- How we let an AI agent quote from live stock without ever letting it invent a price — https://dev.to/christopher_fagan_0a6dfa5/how-we-let-an-ai-agent-quote-from-live-stock-without-ever-letting-it-invent-a-price-3e0l
- How to stop AI agents from quoting stale prices — https://www.agent-context.org/guides/how-to-stop-ai-agents-from-quoting-stale-prices
- Local Business Pro — AI giving wrong pricing / offering configuration — https://localbusiness.pro/help/ai-voice/ai-wrong-pricing
- How to build and sell an AI receptionist (pricing cautions) — https://www.seldonframe.com/guides/how-to-build-and-sell-an-ai-receptionist
- O'Reilly — AI agents need guardrails — https://www.oreilly.com/radar/ai-agents-need-guardrails/
- Multi-tenant RAG data isolation — https://truto.one/blog/how-to-architect-strict-data-isolation-in-multi-tenant-rag-pipelines/
- Multi-tenant RAG isolation patterns — https://dev.to/gabrielanhaia/multi-tenant-rag-4-isolation-patterns-and-the-one-regulators-actually-ask-about-1hne

**Incidents**
- Moffatt v Air Canada — McCarthy Tétrault analysis — https://www.mccarthy.ca/en/insights/blogs/techlex/moffatt-v-air-canada-misrepresentation-ai-chatbot
- Moffatt v Air Canada — ABA Business Law Today — https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/
- Moffatt v Air Canada — CanLII case comment — https://www.canlii.org/en/commentary/doc/2025CanLIIDocs1963
- Manatt — airline must honour chatbot-fabricated refund policy — https://www.manatt.com/insights/newsletters/advertising-law/ai-gone-wild-airline-has-to-honor-a-refund-policy
- BMW Toronto AI chatbot car offer (2026) — https://www.firstalert4.com/2026/06/22/negotiating-car-prices-with-chatbot-are-offers-legally-binding/
- Chevrolet Watsonville $1 Tahoe — AI Incident Database #622 — https://incidentdatabase.ai/cite/622/
- Chevrolet dealership chatbot case study — https://www.envive.ai/post/case-study-chevy-dealerships-ai-chatbot
- Cursor/Anysphere invented login policy — AI Incident Database #1039 — https://incidentdatabase.ai/cite/1039/

**Legal**
- EU AI Act Annex III (high-risk systems) — https://artificialintelligenceact.eu/annex/3/
- EU AI Act Article 50 transparency rules — https://artificialintelligenceact.eu/transparency-rules-article-50/
- Stibbe — AI Act transparency obligations, scope and timeline — https://www.stibbe.com/publications-and-insights/the-ai-acts-transparency-obligations-rules-scope-and-timeline
- GDPR Article 22 and AI automated decision-making — https://gdpr-law.eu/blog/gdpr-and-ai-automated-decision-making-profiling-and-compliance-in-2026/
- UK — quote vs estimate, CRA 2015 s.51 — https://www.tradedoc.co.uk/resources/quote-vs-estimate-uk-legal-difference
- UK Consumer Rights Act 2015, Part 1 Ch 4 — https://www.legislation.gov.uk/ukpga/2015/15/part/1/chapter/4/crossheading/can-a-trader-contract-out-of-statutory-rights-and-remedies-under-a-services-contract/enacted
- UK — contractor exceeds original quote — https://hegarty.co.uk/news/contractor-exceeds-original-quote-what-are-your-rights
- Sweden — Konsumenttjänstlag (1985:716) — https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/konsumenttjanstlag-1985716_sfs-1985-716/
- Sweden — ungefärlig prisuppgift, 15% rule — https://lagen.nu/begrepp/Ungef%C3%A4rlig_prisuppgift
- Sweden — how much may an offert deviate — https://bygglet.com/faq/hur-mycket-far-en-offert-avvika/
- Sweden — förklaringsmisstag, s.32 Avtalslagen — https://avtalslagen.iuste.se/ogiltighet/forklaringsmisstag-forvanskning/
- Denmark — tilbud eller overslag — https://smvdanmark.dk/seneste-nyt/nyheder/guides-tips-og-tricks/jura-tilbud-eller-overslag-hvad-er-forskellen
- Denmark — craftsman price exceeding estimate — https://www.xn--nvn-yla.dk/guide/haandvaerker-pris-stiger
- Denmark — Forbrug.dk, craftsmen: agreements, offers, complaints — https://forbrug.dk/emner/bolig-og-byggeri/haandvaerkere-aftaler-tilbud-og-klager
- Netherlands — legal binding of the offerte — https://clairfort.nl/de-juridische-binding-van-de-offerte-en-de-daarop-vermelde-algemene-voorwaarden/
- Netherlands — contract formation, acceptance, Art 6:219 DCC — https://dutch-law.com/acceptance-dutch-law.html
- Netherlands — mistake/dwaling, Art 6:228 DCC — https://www.stibbe.com/publications-and-insights/annulment-of-contract-mistake-and-fraud
- Netherlands — incorrect price indication in a webshop (ECC NL) — https://www.eccnederland.nl/en/news/incorrect-price-indication-in-webshop-just-a-mistake
- Ireland — Consumer Protection Act 2007 — https://www.irishstatutebook.ie/eli/2007/act/19/enacted/en/html
- Ireland — CCPC business obligations under consumer protection law — https://www.ccpc.ie/business/help-for-business/consumer-protection-law-how-does-it-apply-to-my-business/
- EU — unfair pricing (Your Europe) — https://europa.eu/youreurope/citizens/consumers/unfair-treatment/unfair-pricing/index_en.htm
- Hartog v Colin & Shields (obvious mistake) — https://en.wikipedia.org/wiki/Hartog_v_Colin_%26_Shields

**Onboarding evidence**
- ChartMogul SaaS Conversion Report (n=200, Jan 2026) — https://chartmogul.com/reports/saas-conversion-report/
- Chameleon User Onboarding Benchmark Report — https://www.chameleon.io/benchmark-report
- Chameleon product benchmarking — https://www.chameleon.io/blog/product-benchmarking
- Onboarding friction in SaaS platforms (synthetic-data study) — https://iapress.org/index.php/soic/article/view/3738
- SaaS onboarding statistics 2026 — https://www.shno.co/marketing-statistics/saas-onboarding-statistics
- App onboarding flow benchmarks — where users drop off — https://semnexus.com/app-onboarding-flow-benchmarks-where-users-drop-off-2026
- Time to value: 2026 SaaS onboarding metrics framework — https://www.digitalapplied.com/blog/customer-onboarding-time-to-value-2026-saas-metrics-framework
- Userpilot — minimum viable onboarding — https://userpilot.com/blog/minimum-viable-onboarding/
- Statsig — implementing progressive onboarding — https://www.statsig.com/perspectives/step-by-step-implementing-progressive-onboarding
- Stripe — API onboarding and prefill — https://docs.stripe.com/connect/api-onboarding
- Stripe — sandboxes — https://docs.stripe.com/sandboxes
- Stripe AI onboarding philosophy (>80% auto-clear) — https://getperspective.ai/blog/stripe-ai-customer-onboarding-philosophy-lessons-from-a-conversion-obsessed-company
- Shopify personalised onboarding — https://www.candu.ai/blog/shopify-onboarding-flow
- White glove vs self-serve onboarding — https://www.command.ai/blog/white-glove-vs-self-serve-onboarding-in-saas/
- LLM hallucination statistics 2026 — https://sqmagazine.co.uk/llm-hallucination-statistics/
