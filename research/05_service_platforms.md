# 05 — Service Platform Connectors: Can We Plug Into Jobber, ServiceM8, Tradify and the Rest?

**Research date:** 26 September 2026
**Question tested:** on the retail side, shops connect Shopify or WooCommerce and the catalogue syncs itself. Can we do the same for service businesses — connect their job-management software and pull prices, services, customers and availability, then push work back in?
**Market:** UK and Ireland. **Trades:** pest control, cleaning (domestic and commercial), removals, EV charger installation.

Every significant claim is labelled **Confirmed**, **Likely** or **Unclear**.

---

## 1. Headline findings

1. **The connector idea works technically for two platforms and fails for the rest.** ServiceM8 and Jobber both have proper public APIs with self-serve developer signup, OAuth, webhooks and write access. Tradify — the most-used trade tool in the UK — has **no public API at all**. Powered Now has none. Commusoft's is sales-gated. That kills "connect your software" as a universal onboarding route. *(Confirmed)*

2. **Jobber's own terms of service appear to ban us from using the product.** Section 5.1(e): *"No employee, independent contractor, agent, or affiliate of any company providing job tracking and customer management software services for home service businesses is permitted to view, access, or use any portion of the Service without express written permission from Jobber."* Users must also represent they are *"not a competitor of Jobber."* Terms last updated 22 September 2026 — four days before this research. *(Confirmed)*

3. **ServiceM8's platform policy is narrower but points the same way:** *"You may not use ServiceM8 Platform to promote, or to export user data to, a product or service that replicates a core ServiceM8 product or service without our permission."* Their add-on store criteria ask whether an app adds value *"without replicating existing solutions."* Quoting is a core ServiceM8 product. *(Confirmed, policy dated 12 May 2025)*

4. **All three big platforms shipped their own AI receptionist before we got here.** Jobber launched one on 18 August 2025 (calls and texts, bundled into the Plus plan). ServiceM8 has a Phone Agent plus an **AI quoting assistant**. Housecall Pro sells CSR AI. We would be arriving late, into a slot the incumbent already fills and monetises. *(Confirmed)*

5. **Housecall Pro paywalls its API exactly the way the team feared.** API access and webhooks are MAX-plan only: MAX is $299/month against Essentials at $149/month — roughly **double the customer's bill** to let our connector work. Same pattern seen on the retail side. Housecall Pro is also thinly present in the UK. *(Confirmed)*

6. **A price book import would give you maybe a third of what you need, and none of the hard part.** All four platforms store a flat list of items with a name, a cost, a price and a markup. **None of them** hold minimum charges, callout fees, out-of-hours multipliers, travel bands or congestion charges as structured data — the exact rules that decide the final number. Jobber's item has seven fields and not one is a condition. *(Confirmed)*

7. **The one genuine exception is ServiceM8's Services object**, which does hold variable pricing driven by customer answers, minimum prices, a travel-distance surcharge, a service radius and a manual-approval threshold. That is the team's whole feasibility check, already built, by the platform that says you may not replicate it. *(Confirmed)*

8. **The pre-priced library is the strong play and the public data is abundant.** No licensable UK flat-rate book exists for these four trades — Profit Rhino's ~8,500 tasks are US plumbing/HVAC/electrical only. But Checkatrade, MyBuilder, MyJobQuote and a dozen trade sites publish current UK cost guides with regional spreads for all four trades. A usable library is a few weeks of desk work, not a licensing deal. *(Confirmed)*

**Bottom line: build the template library first. Treat connectors as a later, optional, one-platform bet on ServiceM8 — and get written permission before you write a line of code.**

---

## 2. Platform landscape for UK and Ireland

### Who is actually used

| Platform | Origin | UK/IE evidence | Read |
|---|---|---|---|
| **Tradify** | New Zealand | 152 Capterra UK reviews, 4.7/5. ~25,000 customers worldwide; 20,000 across UK/NZ/AU (Oct 2024); **16% of customers in the UK**. Acquired by **The Access Group** (UK enterprise software). | Strongest genuine UK trade brand |
| **Powered Now** | **UK** | 137 Capterra UK reviews, 4.7/5. £28–40/user/mo. Built for UK statutory forms, CIS, MTD. | UK-native, small but real |
| **Jobber** | Canada | 1,486 Capterra UK reviews (globally pooled), 4.6/5. 100,000 customers but *"across North America"*; **prices in USD**. | Big globally, shallow in UK |
| **ServiceM8** | Australia | **GBP pricing, UK VAT reverse-charge handling, dedicated UK pest-control page.** Capterra UK listed. | Genuinely committed to UK |
| **Commusoft** | **UK** | Enterprise-leaning, 5+ engineers, ~$60/user/mo, 3-user minimum. | Too big for our customer |
| **BigChange** | **UK** | *"over 2,000 businesses across the UK."* 270 Capterra reviews. | Mid-market fleet focus |
| **Joblogic** | **UK** | Capterra UK listed, enterprise/contractor focus. | Too big |
| **Housecall Pro** | US | Little UK evidence found; USD pricing. | Effectively US-only |
| **Payaca** | **UK** | Small but modern; self-serve API keys and webhooks. | Dark horse, see §3 |
| **SimPRO** | Australia | Enterprise/commercial contractor. | Too big |
| **Fergus** | New Zealand | Documented public OAuth2 API. UK presence unclear. | Worth watching |
| **Kickserv, Workiz** | US | No meaningful UK evidence found. | Ignore |
| **Klipboard/Okappy, Tradily, YourTradebase** | UK | Too small to verify; no API evidence found. | Ignore |
| **PestScan** | Netherlands/EU | Pest-control-specific, GDPR-built, UK-listed, also serves cleaning. | **Worth a look — see §9** |

*(All Confirmed except Fergus UK presence and the smallest UK tools, which are Unclear.)*

### Which 2–3 platforms cover the most likely customers

For the **four target trades in the UK and Ireland**, honestly: **no two platforms cover a large share**, because these trades are not the plumbing/electrical/HVAC core that these tools were built for. The best answer available:

1. **ServiceM8** — GBP pricing, explicit UK pest control and cleaning pages, best API of the lot.
2. **Tradify** — the biggest UK trade brand, but **no API**, so it cannot be connected.
3. **Jobber** — respectable review volume, strong API, but North-America-centric and the terms problem.

**Likely.** Review counts are a proxy, not market share, and Capterra pools reviews across countries.

### How many UK/Irish trades use no job-management software at all

**This is the number that decides the whole question, and no direct survey exists.** Here is what can be established:

- **Confirmed:** the UK field-service-management software market is worth roughly **$262m in 2026** — and that figure includes large enterprise fleet operators who consume most of it.
- **Confirmed:** there are about **822 pest control**, **75,565 cleaning** and **3,149 removals** businesses in the UK. Around **89% of cleaning firms are micro-businesses with under ten staff.** That is roughly **80,000 target businesses** before EV installers.
- **Confirmed (March 2026, HeyBRB *UK Admin Drain Report*, 167 UK small business owners):** **54% spend under £50 a month on all business software combined.** 77% of trades do admin after hours. Over a third take more than 20 minutes to write a single quote by hand. 83% have never worked out what admin costs them.
- **Likely:** ToolTime research put **150,000 UK finishing-trade companies** on pen and paper or Word/Excel.

**My read, labelled Likely, not Confirmed:** somewhere between **60% and 80% of the team's target customers run no job-management software at all.** The £50-a-month software ceiling is the strongest single signal — most of these tools cost £28–34 per user per month, so a large majority of this market is priced out or has chosen not to buy. Cleaning and removals in particular are dominated by micro-firms whose "system" is a phone and a notebook.

**What this means, bluntly: connectors are a feature for a minority. The template is the product.** If two thirds of your customers have nothing to connect, an import path cannot be your primary onboarding mechanism — it can only ever be a nice surprise for the minority who happen to be on a supported platform.

---

## 3. Per-platform API assessment

### Jobber — excellent API, hostile terms

- **Public API:** Yes. GraphQL only, single endpoint `https://api.getjobber.com/api/graphql`, POST only, date-based version header `X-JOBBER-GRAPHQL-VERSION`. *(Confirmed)*
- **Access:** Self-serve Developer Center signup. Public marketplace listing needs review: two-factor authentication on the developer account and an app logo are hard requirements. Jobber will not approve an app built for a single client. *(Confirmed)*
- **Read:** Clients, Requests, Quotes, Jobs, Invoices, Visits, Assessments, Properties, **Products and Services**, Expenses, TimeSheetEntries, Users, Accounts, CustomFieldConfigurations. `scheduledItems` returns visits, tasks, assessments, events and reminders for a property. *(Confirmed)*
- **Write:** `clientCreate`, `clientUpdate`, `quoteCreate`, `jobCreate`, `invoiceCreate`, `requestCreate`. `quoteCreate` needs a clientId, a propertyId and a non-empty line-item list, each item carrying `saveToProductsAndServices`. **This is genuinely good for a front-door product.** Note: `clientCreate` stamps your app name into Jobber's Lead Source field permanently and the user cannot edit it — free attribution, and a permanent record that the lead came from you. *(Confirmed)*
- **Auth:** OAuth 2.0, scoped bearer tokens. Two clicks for the owner. *(Confirmed)*
- **Webhooks:** Yes, per-app in the Developer Center, HMAC-SHA256 signed. Events include CLIENT_CREATE, JOB_COMPLETE, QUOTE_CREATE, QUOTE_APPROVAL, REQUEST_CREATE, INVOICE_CREATE, APP_CONNECT. Requires the matching read scope. *(Confirmed)*
- **Rate limits:** 2,500 requests per 5 minutes, plus a query-cost bucket of 10,000 points restoring at 500/second. Cost returned in `extensions.cost`; over-budget queries return `THROTTLED`. Generous. *(Confirmed)*
- **Cost:** No API fee found. No evidence of a plan-tier gate on API access. *(Likely — absence of evidence)*
- **Marketplace:** Yes. Existing apps include CompanyCam, Zapier, Broadly, Thumbtack and **Ply (inventory)** — so third parties can and do list, including in categories Jobber does not cover itself. *(Confirmed)*
- **Verdict:** the best-engineered API here, wrapped in the worst legal position. See §5.

### ServiceM8 — the best fit on capability, and the closest competitor

- **Public API:** Yes. Plain JSON REST over HTTPS, GET/POST/DELETE. Docs are genuinely good and machine-readable (append `.md` to any docs URL; full index at `/llms.txt`). *(Confirmed)*
- **Access:** Two routes. **Private app** — the owner generates an API key under Settings → API Keys, no developer account needed. **Public app** — register as a Development Partner, get App ID and secret, use OAuth 2.0; this unlocks webhooks, SMS/email sending and directory listing. You can build a public app and choose **not** to list it publicly. *(Confirmed)*
- **Read:** Clients, Company Contacts, Jobs, Job Materials, **Materials (the price book, with stock levels)**, Bundles, Job Material Bundles, Job Queues, **Availabilities**, **Allocation Windows**, **Job Allocations**, Locations, Asset Types, Badges. *(Confirmed)*
- **Write:** Create/update/delete on clients, jobs, materials, job materials, bundles, queues, badges, availabilities. `POST /job.json` needs only `status` (Quote, Work Order, Unsuccessful or Completed); useful fields include `job_address` (auto-geocoded to lat/lng), `queue_uuid`, `company_uuid`, `quote_sent`, `quote_date`, `category_uuid`. **Scope `create_jobs` carries an explicit warning: "creating jobs may incur account charges."** *(Confirmed)*
- **Auth:** OAuth 2.0. Authorize at `go.servicem8.com/oauth/authorize`, tokens last 3,600 seconds with refresh tokens. Granular scopes. Add-on store requirement: the ideal experience is a **single "Connect" click**. HTTP Basic Auth is prohibited for store apps. Can impersonate a staff member via `x-impersonate-uuid`, inheriting their permissions. *(Confirmed)*
- **Webhooks:** Yes, two kinds — **object** subscriptions (changes to specific fields of an object type) and **event** subscriptions (business events like `job.created`, `job.completed`). Public apps only. *(Confirmed)*
- **Rate limits:** 180 requests/minute, then HTTP 429. Tighter than Jobber. Notably: *"Limit your API scopes to the essentials and unlock a higher rate limit as your reward"* — asking for less gets you more throughput. *(Confirmed)*
- **Cost — the real catch:** ServiceM8 bills **per job dispatched**, not per user. UK plans from £25/month; Growing £59 (150 jobs); Premium £119 (500 jobs); Premium Plus £269 (1,500 jobs). **Every job counts against the cap, including estimates and revisits.** So an AI agent creating jobs and quotes **eats the customer's quota** and can push them into a higher plan. Not an API fee, but a real and awkward cost our product would impose. *(Confirmed)*
- **Store requirements:** must add value *"without replicating existing solutions"*; name max 30 characters and may not contain "ServiceM8", "M8", "Mate" or "SM8"; **may not accept, request, manage, facilitate or process payments**; may not collect card details in ServiceM8 interfaces; may not appear ServiceM8-built; help documentation required before approval. Billing can run through ServiceM8 or independently, with external charges disclosed. *(Confirmed)*
- **Verdict:** technically the best fit by a wide margin — the only platform that can actually feed the feasibility check. Also the platform whose own Services feature most closely duplicates our product.

### Tradify — no public API. Full stop.

- **Public API:** **No.** No public developer portal, no self-service API keys, no documented webhooks. A backend host `api.tradifyhq.com` exists and responds, but it is undocumented, session-authenticated and reserved for Tradify's own apps. *(Confirmed, assessed 12 July 2026)*
- **Integrations:** pre-built accounting and payment partners only — Xero, MYOB Business, QuickBooks Online, Sage, Stripe. *(Confirmed)*
- **The only routes in** are an official partnership (no public programme exists) or scraping an authenticated user session — which is fragile, near-certainly against their terms, and unshippable in a multi-tenant SaaS product.
- **This is the single most damaging finding for the connector thesis**, because Tradify is the strongest genuinely-UK trade brand on the list. The platform with the best UK coverage is the one you cannot connect to.
- **One hope:** the acquisition by **The Access Group**, a large UK software group with API-led products elsewhere, could eventually produce a public API. Speculative, no evidence of a roadmap. *(Unclear)*

### Housecall Pro — works, but paywalled and barely in the UK

- **Public API:** Yes, REST, documented publicly on Stoplight at `docs.housecallpro.com`. Independently graded **C** for API access. *(Confirmed)*
- **Access:** Two routes. Pros build custom integrations with an **API key** (Admin users only, full-access or read-only). **Verified Integration Partners get OAuth 2.0** — apply by emailing `apideveloper@housecallpro.com` with a company overview and proposed integration. *(Confirmed)*
- **Read and write:** Customers, Jobs (details, status, scheduling), Estimates, Leads, Employees, Vendors/Companies — most support both. There is a **dedicated Pricebook API** covering Materials, Material Categories and Price Book Services, explicitly letting *"third-party partners create a catalog of their materials directly in a Pro's account"* — so the price book is both readable and writable. Best price-book surface of the four. *(Confirmed)*
- **Auth:** headers `API-Version`, `Client-Id`, `Client-Secret`, `Account-Token`. OAuth for verified partners only. *(Confirmed)*
- **Webhooks:** Yes — customer created/updated/deleted; job created/scheduled/started/completed/canceled/paid/on-my-way; estimate created/sent/scheduled/completed/option-approved; lead created/converted/lost/updated; pro created. Signed. **MAX plan only.** *(Confirmed)*
- **Rate limits:** not published. Terms state Housecall Pro *"may set and enforce limits on API use (e.g. limiting the number of API requests or the number of users served), in their sole discretion."* *(Confirmed)*
- **Cost — the paywall:** **API and webhooks are MAX-plan only.** MAX is **$299/month annual, $329 monthly**, against Essentials at **$149/$189**. Connecting roughly **doubles the customer's bill**. This is the same trap flagged from the retail side, and it is worse here because the delta is $150/month. *(Confirmed)*
- **Verdict:** technically fine, commercially poisonous, and largely irrelevant for UK/Ireland. **Deprioritise.**

### Shorter notes on the others

- **Payaca (UK)** — *the quiet surprise.* Self-serve API keys generated by the owner under My Company → Integrations, public documentation, **webhooks**, and coverage of customers, projects, invoices, proposals and **scheduled events**. UK-native, modern, small. If you want a UK connector that is technically easy and commercially unthreatening, this is the one nobody is looking at. *(Likely — docs confirmed, adoption unverified)*
- **Fergus (NZ)** — documented public API at `api.fergus.com/docs`, OpenAPI 3.1, Personal Access Token **and OAuth2**. Technically the cleanest after ServiceM8. UK presence unverified. *(Likely)*
- **Commusoft (UK)** — public API exists at `developer.commusoft.com`, but private apps need *"an appropriate subscription"* and the **Partners programme is listed as "Coming soon."** Documentation not openly browsable; access requires talking to sales. Too enterprise for our customer anyway. *(Confirmed)*
- **Joblogic (UK)** — REST API with access tokens expiring hourly, but **secured behind their firewall requiring whitelisted public IP addresses.** That is workable for one corporate customer and **unworkable for multi-tenant SaaS**, where you would need every customer to whitelist you. *(Confirmed)* **Rule out.**
- **SimPRO** — real developer centre, API docs, forum, code examples. Enterprise contractor market, not our customer. *(Confirmed)*
- **Powered Now (UK)** — **no API found.** No developer portal or documentation located. For a UK-native tool with 137 Capterra UK reviews, this is a real gap in our coverage. *(Likely — searched their site, integrations page 404s, no developer docs anywhere)*
- **BigChange (UK)** — 2,000+ UK businesses, mid-market fleet. API existence not established. *(Unclear)*
- **Kickserv** — API token per employee plus account slug. US. *(Likely)*
- **Workiz** — API exists, US-focused. *(Likely)*
- **Klipboard/Okappy, Tradily, YourTradebase** — no API evidence found. *(Unclear)*

---

## 4. Comparison table

| Platform | Public API | Read price book | Write quote/job | OAuth self-serve | Webhooks | API cost | Competitive restriction |
|---|---|---|---|---|---|---|---|
| **Jobber** | Yes (GraphQL) | Yes (Products & Services) | **Yes** (quoteCreate, jobCreate, requestCreate) | Yes, self-serve | Yes, signed | No fee found | **Severe — ToS bars competitors from using the Service at all** |
| **ServiceM8** | Yes (REST) | Yes (Materials + stock) | **Yes** (jobs; quote = job with status Quote) | Yes, Dev Partner reg. | Yes, object + event | No fee, **but per-job billing — our jobs eat their quota** | **Moderate/severe — may not "replicate a core ServiceM8 product"** |
| **Tradify** | **No** | No | No | No | No | n/a | n/a — nothing to restrict |
| **Housecall Pro** | Yes (REST) | **Yes (dedicated Pricebook API, read+write)** | Yes (jobs, estimates, leads) | Partners only; API key otherwise | Yes, **MAX only** | **MAX plan: $299 vs $149 — roughly doubles the bill** | **Low — explicitly non-exclusive; non-solicitation only** |
| **Payaca** | Yes | Could not tell | Likely (proposals, invoices, events) | API keys, self-serve | Yes | No fee found | Could not tell |
| **Fergus** | Yes (OpenAPI 3.1) | Could not tell | Could not tell | Yes (PAT + OAuth2) | Could not tell | Could not tell | Could not tell |
| **Commusoft** | Yes, gated | Could not tell | Could not tell | No — sales contact | Could not tell | Requires "appropriate subscription" | Could not tell; partners "coming soon" |
| **Joblogic** | Yes | Could not tell | Likely (CRUD) | No — **IP whitelisting** | Could not tell | Could not tell | Could not tell |
| **SimPRO** | Yes | Likely | Likely | Could not tell | Could not tell | Could not tell | Could not tell |
| **Powered Now** | **None found** | No | No | No | No | n/a | n/a |
| **BigChange** | Could not tell | Could not tell | Could not tell | Could not tell | Could not tell | Could not tell | Could not tell |
| **Kickserv** | Yes (token) | Could not tell | Likely | No — API token | Could not tell | Could not tell | Could not tell |
| **Workiz** | Yes | Could not tell | Likely | Could not tell | Could not tell | Could not tell | Could not tell |

---

## 5. The competitive question — will they even allow this?

**Straight answer: Jobber almost certainly will not. ServiceM8 probably will not without a conversation. Housecall Pro probably will, and barely matters.**

### Jobber — the clause is explicit and it is aimed at us

Terms of Service, Section 5.1(e) *"Restrictions Generally"*, last updated **22 September 2026**:

> "No employee, independent contractor, agent, or affiliate of any company providing job tracking and customer management software services for home service businesses is permitted to view, access, or use any portion of the Service without express written permission from Jobber."

And users must represent they:

> "are not a competitor of Jobber or any of its affiliates, or acting on behalf of a competitor."

Also present:

> "data mining, robots, scraping, or similar data gathering or extraction methods" — prohibited.

Read this plainly. The team is building software that talks to home-service customers, qualifies them, prices the job and manages the lead. Whether or not you call it "job tracking and customer management," **Jobber's lawyers wrote that clause broadly on purpose**, and the bar is *express written permission*. There is a separate developer agreement for marketplace App Providers, which may carve out a path — but the base terms mean you cannot even sign up for a trial account to test your own integration without arguably breaching them. *(Confirmed for the quoted language; the interaction with the developer agreement is **Unclear** because the Developer Center returns HTTP 403 to automated fetches and its terms could not be read.)*

### ServiceM8 — narrower clause, but quoting is core

Platform Policy, dated **12 May 2025**:

> "You may not use ServiceM8 Platform to promote, or to export user data to, a product or service that replicates a core ServiceM8 product or service without our permission."

Plus:

> "You must not circumvent our intended limitations on core ServiceM8 features"
> "The primary purpose of your app must not be to simply redirect users out of the ServiceM8 experience"

And enforcement is at will:

> "We can take enforcement action...disabling your application, restricting access...terminating our agreements with you, or any other action as we in our sole discretion deem appropriate."

Add-on store criteria ask whether the app adds value *"without replicating existing solutions."*

**Why this bites:** ServiceM8's own **Services and Online Booking** feature already does fixed and variable pricing, minimum prices, travel surcharges beyond a perimeter, a service radius that diverts out-of-area customers to an enquiry, and dollar thresholds requiring manual approval. Their **AI quoting assistant** builds quotes from job history and material costs. Their **Phone Agent** answers inbound calls, qualifies, and books. *Our product is a near-exact overlap with three shipped ServiceM8 features.* The "front door" framing does not help here — ServiceM8 already owns the front door, and pulling the conversation onto WhatsApp is precisely "redirecting users out of the ServiceM8 experience." *(Confirmed)*

### Housecall Pro — the honest one

API Terms of Service say the arrangement is explicitly non-exclusive:

> "You acknowledge that Housecall Pro may develop products or services that may compete with you or your Integration or any other products or services."

The only real restriction found is non-solicitation — developers must not *"solicit or encourage any Pros to terminate or otherwise change their relationship with Housecall Pro."* Plus discretionary limits on API use.

**That is a workable agreement.** It says "we may out-compete you, and you may not poach our customers" — which is fair and normal. Unfortunately Housecall Pro is the platform with the least UK relevance and the worst paywall. *(Confirmed for the quoted clauses; full terms could not be rendered, so other clauses are **Unclear**.)*

### What already exists in their marketplaces

Not just accounting and payments. Jobber's marketplace carries CompanyCam (photos), Zapier, **Broadly** (lead consolidation from Google, Facebook, Instagram and web chat), Thumbtack (lead marketplace) and **Ply** (inventory and RFQ — filling a gap Jobber does not cover natively). So third-party apps in adjacent and even overlapping categories do get listed. *(Confirmed)*

**And AI receptionists integrate with Jobber today.** As of 2 June 2026, native Jobber integrations exist for **ServiceAgent, Smith.ai, Goodcall, Numa and Phonely**. ServiceAgent *"writes Client, Property, Request, Quote, Job, and Visit records natively."* *(Confirmed)*

This cuts both ways, and the team should sit with the discomfort:

- **The encouraging read:** products doing substantially what we propose are live on Jobber's API right now, writing quotes into Jobber, and have not been shut off. The competitor clause is evidently not enforced against every AI answering product.
- **The discouraging read:** these are all **voice** products. They answer the phone — a channel Jobber does not own — and hand off. **None of them read the price book to generate a price.** Across every source checked, no third party is doing the thing that makes our product distinctive. That silence is information: either nobody has tried, or the ones who tried stopped. And enforcement is discretionary, so "others are doing it" is not protection. A clause that goes unenforced for five products can be enforced against the sixth the week it starts winning deals.

### Is "we are the front door, you keep scheduling and invoicing" a positioning they would accept?

**My honest read: Housecall Pro yes; ServiceM8 unlikely; Jobber no.**

What that rests on:

- **It rests on who owns the conversation.** Every one of these platforms has decided that answering the inbound customer *is* their product now — that is what the 2025–26 AI receptionist launches mean. "Front door" was an available position in 2023. In September 2026 it is occupied, by the incumbents, as a paid upgrade. Jobber bundles its receptionist into the Plus plan; ServiceM8 sells the Phone Agent on Connect Plus and Unlimited; Housecall Pro sells CSR AI separately. We would be asking them to let a third party supply, for free, the thing they just built a revenue line around.
- **It rests on the price book being the crown jewel.** Reading their price book to produce a customer-facing price is a materially more intrusive act than writing a lead into their database. The marketplace apps that survive are ones that *add* data (photos, inventory, leads). Ours *extracts the pricing logic* and uses it to hold the customer conversation elsewhere. That is the definition of "exporting user data to a product that replicates a core product."
- **It rests on discretion, not rules.** ServiceM8 reserves the right to disable an app for any reason it sees fit. Jobber requires express written permission. Neither gives us a rule we can comply with and then rely on — both give us a decision-maker we must persuade. Building a core onboarding mechanism on a permission that can be revoked at will is a business risk, not just a technical one.
- **What would change my mind:** written confirmation from a named person at ServiceM8 or Jobber that they are comfortable with the specific design. That is cheap to obtain and should be obtained **before** any engineering. It is the single highest-value hour in this whole programme.

---

## 6. What a price book import would actually give you

**Honest answer: roughly a third of what you need, and specifically not the part that is hard.**

### How pricing is structured in these tools

A **Jobber** product or service has exactly seven fields: item type (product or service), name, description, **unit cost**, **markup %**, **unit price**, photo. No category. No unit of measure. No conditions. *(Confirmed)*

A **Housecall Pro** material has: name, description, part number, item cost, item price, unit of measure, taxable toggle, image, favourite flag — organised into categories and sub-categories, with a material markup toggle. Slightly richer. *(Confirmed)*

A **ServiceM8** material has: name, item_number, price, cost, quantity_in_stock, price_includes_taxes, barcode, item_is_inventoried, item_description, tax_rate_uuid — plus **Bundles** for kits and assemblies. *(Confirmed)*

So the shared model is a **flat list of items with a cost, a price and a markup**. Assemblies exist only in ServiceM8 (Bundles). Labour is generally just another line item with an hourly price, not a distinct rate structure.

### What you would actually get from a Jobber import

You would get: **a list of service names with indicative unit prices and markups.** That is it.

You would **not** get:
- minimum charges
- callout or first-hour fees
- out-of-hours, weekend or bank-holiday multipliers
- travel bands or mileage rates
- London congestion charge or ULEZ handling
- access-difficulty loadings (the difference between a ground-floor wasp nest at £80 and a chimney nest at £180)
- property-size tiers (the single biggest price driver in cleaning and removals)
- volume or frequency discounts for recurring contracts
- which services need a survey before a price can be given

**None of these are fields in any of these systems.** Where they exist at all, they live in free-text descriptions, in quote templates, or in the owner's head.

### The proportion estimate

My assessment, labelled **Likely**:

- **~30%** of what the agent needs is structured and importable: service names, indicative prices, unit costs, tax flags, and in ServiceM8's case stock levels and kits.
- **~20%** is present but unreliable — buried in free-text descriptions and line-item notes that an AI could attempt to parse, with a real error rate and no way to validate.
- **~50%** does not exist in the system at all. It is conditional logic the owner applies by judgement, job by job.

**The uncomfortable implication: even a perfect import still leaves the owner confirming the pricing rules by hand.** The import saves typing a list of service names — genuinely useful, and the least valuable part of the job. It does not save the conversation about minimum charges and travel, which is the part that determines whether the agent quotes correctly and the part owners abandon.

**One exception worth restating.** ServiceM8's **Services** object (distinct from Materials) is the only place in this whole landscape where the conditional logic *is* structured: variable pricing driven by customer answers, minimum prices, travel-distance surcharge per kilometre beyond a perimeter, service radius with out-of-area diversion to enquiry, and manual approval thresholds. If ServiceM8 exposes Services through the REST API, an import there could reach perhaps 60–70%. **I could not confirm a Services endpoint** — `listservices.md` returned 404 and the index did not clearly show one. **This is the single most valuable unresolved technical question in the report.** *(Unclear — see §10.)*

---

## 7. Availability, crew and stock

This is where the platforms diverge sharply, and where the team's differentiator lives or dies.

### Schedule and availability

- **ServiceM8 — yes, genuinely.** `Availabilities` (start_timestamp, end_timestamp, availability_type, regarding_object) under `read_schedule`; **`JobAllocations`** linking staff_uuid to jobs with allocation_date and allocated_timestamp; and **`AllocationWindows`**. A `manage_schedule` scope exists for writes. So you can read who is booked when and reason about gaps. Their own booking form already *"analyses staff schedules...taking into account other bookings and travel time"* — proving the data supports it. **Caveat:** the docs do not define what `availability_type` means, so interpreting records requires testing against a real account. *(Confirmed that the data exists; **Unclear** exactly how to interpret it.)*
- **Jobber — partially, by inference only.** `scheduledItems` and `Visits` tell you what *is* booked. There is **no availability or free-slot endpoint**. You would have to read every visit, reconstruct each worker's calendar, and infer the gaps — without knowing working hours, holidays or travel time. Answering "is anyone free Thursday afternoon" is a guess dressed as an answer. *(Likely — no availability endpoint found in any source.)*
- **Housecall Pro — job scheduling is readable/writable; no free-slot query found.** *(Likely)*
- **Tradify, Powered Now — no API, so no.** *(Confirmed)*

### Parts and van stock

- **ServiceM8 — yes.** `Material.quantity_in_stock` is *"the current inventory quantity of this material available in stock,"* decimal, *"updated automatically when materials are used in jobs or when inventory is manually adjusted,"* plus `item_is_inventoried`. This is a real stock check. **The only platform of the four that can answer "are the parts in stock."** *(Confirmed)*
- **Jobber — no.** Jobber *"lacks...detailed inventory management"*; users complain about it; the gap is filled by the third-party **Ply** app. Nothing to import. *(Confirmed)*
- **Housecall Pro — materials catalogue with cost and price, but no stock-on-hand field found.** *(Likely)*

### Service area

- **ServiceM8 — yes, as product configuration.** Service Radius from office locations, with out-of-area customers diverted to an enquiry, plus a travel-distance perimeter with a per-kilometre surcharge. Whether this is API-readable is **Unclear**; `Locations` is readable under `manage_locations`. *(Confirmed the feature; Unclear the API.)*
- **Jobber — a territory limit exists in the product** ("setting a limit on what area you service and how far you'll drive"), but no service-area object appears in the API surface. *(Unclear, leaning no.)*
- **Housecall Pro — nothing found.** *(Unclear)*

### The blunt conclusion

**For every platform except ServiceM8, the feasibility check cannot be fed from the connector and must come from the team's own data entry.** Availability is inferable-at-best from Jobber, stock is absent, and service area is absent. Since ServiceM8 is also the platform most likely to refuse permission, **the team should plan on owning crew, stock and service-area data themselves regardless of whether any connector ships.** Treat this as settled and design accordingly — it removes the connector from the critical path of the differentiator.

---

## 8. The pre-priced industry library

### Does anything licensable exist for UK/Ireland in these four trades?

**No. Confirmed, and worth stating flatly.**

The ~8,500-task library the team heard about is **Profit Rhino** (powered by Callahan Roach), covering **plumbing, HVAC and electrical** for the **US** market. It integrates with Housecall Pro, ServiceTitan, FieldEdge, Service Fusion, SimPRO and Wintac, and costs **$39–59 per user per month** (Starter/Plus/Pro). **ServiceTitan Pricebook Pro** is the enterprise equivalent, again US, plumbing/HVAC/electrical, at $245–398 per technician per month. *(Confirmed)*

Neither covers **pest control, cleaning, removals or EV charging**, and neither is priced for UK labour rates, VAT or regional variation. No UK or Irish equivalent was found for any of the four target trades. No platform in this research ships a pre-built price book for these trades — every business builds its own from scratch. **That is precisely why 42% still have no working price book after three months.**

### Trade associations

- **BPCA (British Pest Control Association)** — 750+ member organisations, 3,500+ individuals. Membership requires insurance, qualifications, CPD and Codes of Practice adherence. **No pricing guidance or rate card found** — and trade bodies generally avoid publishing price guidance for competition-law reasons. Useful secondary finding: BPCA-registered firms reportedly charge **15–25% more** than unregistered local operators — a usable premium multiplier. *(Confirmed for membership; **Unclear**/likely-no for pricing guidance.)*
- **British Cleaning Council** — publishes sector value and size research, not rates. *(Likely)*
- **BICSc, BAR (removals)** — no published member rate guides found. *(Unclear)*

**Expect no association rate cards. This is normal and not a research failure — price-fixing exposure means they will not publish them.**

### How to build one, realistically

The good news: **public UK price data for these four trades is abundant, current and structured by the variables that actually matter.** Found in this research alone:

**Pest control (wasp nest treatment)**
- £80–200 typical, often ~£119; £100–220 in London and the South East (inc VAT)
- Council £45–95; private same-day £55–120; hard-to-reach (chimney, eaves, loft) £120–180
- Access difficulty is the main driver; only 12% of English councils still treat free in 2026
- Sources: Fantastic Services, PestPro Index, QuickPestControl, Uninvited Visitors, Checkatrade

**Cleaning (deep clean, 3-bed)**
- £186 (MyBuilder) to £280 (typical 2–3 bed), working range £150–700
- London £250–380; Birmingham £260–360
- Bedroom count and region are the main drivers
- Sources: Checkatrade, MyBuilder, Taskino, TidySpaces, St Anne's London Cleaning Price Index

**Removals**
- 2-person team and van £50–80/hour, some sources £90–140/hour
- Local move £500–700; 3-bed move ~£900
- Central London £40–55 per porter per hour, outer £30–35
- Sources: MyJobQuote, Checkatrade, Konnectyou, regional operators

**EV charger installation**
- £800–1,200 in 2026; 7kW ~£1,110 before grant
- 7kW single-phase simple install £800–1,200
- **OZEV grant from 1 April 2026: up to £500 or 75% of cost, whichever is lower** — the agent must know this
- Extras: consumer-unit upgrades, long cable runs, trenching
- Sources: Checkatrade, Voltimum, Elec-Mate, EcoFlow, loveelectric

### Recommended build method

1. **Harvest the cost-guide publishers.** Checkatrade, MyBuilder, MyJobQuote and Fantastic Services publish systematic guides broken down by exactly the variables you need — property size, region, access difficulty, urgency. Three to five sources per task gives a defensible median and range.
2. **Mind the legal line.** There is **no official Checkatrade API for directory data**, and their Terms of Service govern extraction; third-party scrapers exist but push compliance risk onto you, and review-author names and phone numbers are personal data under UK GDPR. **Use published cost guides as reference for building your own figures — do not bulk-scrape the directory, and do not republish their numbers as yours.** Better still, ask for a licence. *(Confirmed)*
3. **Structure it around the conditions, not the names.** The library's value is not "wasp nest treatment." It is: base price, **minimum charge**, access-difficulty tiers, regional multiplier (London/South East ~+20–25%), out-of-hours multiplier, travel band, VAT treatment. This is exactly what no platform stores and no import can give you — **so it is your moat, not a stopgap.**
4. **Ship regional multipliers from day one.** The London premium is 20–25% across all four trades and is the difference between a credible quote and an insulting one.
5. **Seed from your own customers.** Every owner correction is training data. After a few hundred businesses, your library beats anything licensable, in a market where nothing is licensable. Sequence it so corrections flow back into the template.
6. **Validate with practitioners.** A day each with one pest controller, one cleaner, one remover and one EV installer will catch errors no desk research will.

**Scale check:** four trades at roughly 30–80 priced tasks each is **150–300 items**, not 8,500. These trades have far narrower service catalogues than plumbing and HVAC. This is achievable in weeks by one person with a spreadsheet and a phone — which makes it a far better use of the first engineering quarter than a connector to a platform that may revoke permission.

---

## 9. Recommendation

### Do not build connectors as your onboarding strategy. Build the library.

**Reasoning, in order of weight:**

1. **Most of your market has nothing to connect.** Likely 60–80% of target customers run no job-management software. A connector cannot be the primary onboarding path for a product whose customers mostly have no source system. The template is not mechanism #1 of four — **it is the product's onboarding story, and the other three are edge cases.**
2. **The platform with the best UK coverage has no API.** Tradify cannot be connected at any price. That alone caps connector reach well below half of the software-using minority.
3. **The two platforms with good APIs have terms pointing against you.** Jobber's is close to explicit. ServiceM8's turns on "replicating a core product," and quoting, booking and travel-surcharge logic are all core ServiceM8 products.
4. **Even a perfect import yields ~30% of what the agent needs**, and none of the conditional logic that makes quotes correct.
5. **The differentiator cannot be fed from connectors anyway.** Only ServiceM8 exposes stock and real availability. You must own that data regardless. *Accepting this early is liberating: it takes connectors off the critical path.*
6. **The retail analogy does not hold.** Shopify wants third-party apps because apps make merchants stickier and Shopify does not sell a competing storefront assistant. Jobber, ServiceM8 and Housecall Pro **all launched AI receptionists in 2025–26 and charge for them.** You are not an ecosystem complement; you are a substitute for a product they just shipped. That difference is the whole answer.

### What to do instead, in order

1. **Build the UK/Ireland pre-priced library for the four trades.** 150–300 items, structured around conditions and regional multipliers. This is your moat precisely because nothing licensable exists. *(§8)*
2. **Make document upload excellent.** Owners have their prices in a Word quote template, a spreadsheet or a PDF. Parsing that is more valuable than any API, works for 100% of the market, and carries no platform permission risk. **Promote this to mechanism #2, above import.**
3. **Own crew, stock and service area yourself.** Settled by §7. Design the feasibility check assuming no external source.
4. **Spend one hour on the highest-value question in this report: ask permission.** Email ServiceM8's developer contact and `apideveloper@housecallpro.com`, describe the design honestly, and ask directly whether it is acceptable. A "no" saves a quarter of engineering. A written "yes" from ServiceM8 changes the recommendation. **Do this before any connector code.**

### If you build exactly one connector

**ServiceM8 first — conditional on written permission.**

- Only platform exposing **availability, real stock levels and travel/service-radius logic** — the feasibility check, which is your differentiator
- **GBP pricing, UK VAT handling, and dedicated UK pest control and cleaning pages** — the only platform demonstrably committed to your market *and* your trades
- Good REST docs, `.md` and `llms.txt` endpoints, OAuth, both object and event webhooks, private-app route for pilots without store approval
- Richest price book: cost, price, stock, tax, plus Bundles for assemblies

**Manage two things honestly.** First, get permission in writing — their policy bars replicating a core product and their Services feature overlaps ours substantially. Second, **their per-job billing means every job and quote your agent creates consumes the owner's monthly allowance**; at £59 for 150 jobs, a busy agent can push a customer into the next tier. Disclose this to customers plainly and consider creating jobs only on owner approval, not on every qualified enquiry.

**Second, if a second is ever justified: Payaca.** UK-native, self-serve API keys, webhooks, no competing AI receptionist found, and no one is courting them. Low effort, low risk, genuinely differentiated. Verify adoption first.

**Do not build:** Jobber (terms), Housecall Pro (paywall plus no UK presence), Tradify or Powered Now (no API), Joblogic (IP whitelisting is incompatible with multi-tenant SaaS).

### Position the connector as a nicety, never as onboarding

If a connector ships, sell it as *"already on ServiceM8? We'll pull your services in to save you typing"* — a convenience for a minority. The onboarding promise that works for the whole market is: **"pick your trade, we'll show you typical UK prices, you correct them, you're live in ten minutes."** That promise needs no permission from anyone.

---

## 10. What I could not find out, and how to close each gap

| Gap | Why it matters | How to close it |
|---|---|---|
| **Jobber Developer Center terms** — `developer.getjobber.com` returns HTTP 403 to automated fetches; could not read the developer agreement that governs App Providers | It may carve out a path through the competitor clause, or restate it more harshly. **Highest-value legal unknown.** | Open it in an ordinary browser and read the sections on permitted use. Or register a developer account and read the agreement at signup. 30 minutes. |
| **ServiceM8 `Services` endpoint** — `listservices.md` 404s; the index did not clearly list one | **Highest-value technical unknown.** Services holds variable pricing, minimum prices, travel surcharge and service radius. If API-readable, import value jumps from ~30% to ~60–70% and the feasibility check becomes feedable. | Fetch `developer.servicem8.com/llms.txt` and search for "service"; or create a free trial and enumerate endpoints with an API key. One hour. |
| **Housecall Pro API Terms full text** — page rendered as title only | Determines whether the permissive reading holds across all clauses | Open `docs.housecallpro.com/docs/terms/api-terms` in a browser. 15 minutes. |
| **A hard "no software" percentage for UK/Irish trades** | The single number that decides connector priority. My 60–80% is Likely, not Confirmed | Commission a small survey (n=200) via a trade body or lead-gen platform; or buy IBISWorld's UK reports for these SIC codes. Or simply ask your first 50 sign-ups what they used before. **The last option is free and answers it fastest.** |
| **Powered Now API** — none found, but absence of evidence | UK-native with real adoption; if an API exists it is a good target | Email their support and ask directly. 10 minutes. |
| **Payaca adoption in UK/Ireland** | It is the best technical/commercial fit among UK-native tools, but may be too small to matter | Ask Payaca for customer numbers; check Capterra UK review count and listing age. |
| **Fergus UK availability**; **BigChange API**; **Klipboard/Okappy, Tradily, YourTradebase APIs** | Completeness; none likely to change the recommendation | Direct enquiry if a connector strategy is revived |
| **Commusoft partner terms** — "coming soon," docs not open | Could become relevant for larger customers later | Contact their sales team |
| **Whether Jobber has ever enforced the competitor clause against an AI product** | Five AI receptionists integrate today. Whether any were refused or shut off is the real signal | Ask ServiceAgent, Goodcall or Numa directly how their Jobber approval went. Founders usually answer. **Cheap and unusually informative.** |
| **Marketplace commercial terms / revenue share** for Jobber and ServiceM8 | Affects unit economics if a connector ships | Only worth chasing after a permission conversation succeeds |
| **PestScan** — pest-control-specific, EU-built, GDPR-native, UK-listed, also serves cleaning | A vertical tool in your exact trade may be a better connector target than any generalist. Not in the original brief | Check for a public API and UK customer count. Worth 30 minutes given the trade fit. |
| **BPCA / BICSc / BAR member pricing guidance** | Would strengthen the library if it exists | Ask each body directly. Expect no, for competition-law reasons. |

---

## 11. Sources

All accessed **26 September 2026** unless noted.

**Jobber**
- Terms of Service (last updated 22 Sep 2026) — https://www.getjobber.com/terms-of-service/
- Developer Center (HTTP 403 to automated fetch) — https://developer.getjobber.com/docs/
- API Rate Limits — https://developer.getjobber.com/docs/using_jobbers_api/api_rate_limits/
- Queries and Mutations — https://developer.getjobber.com/docs/using_jobbers_api/api_queries_and_mutations/
- App Authorization (OAuth 2.0) — https://developer.getjobber.com/docs/building_your_app/app_authorization/
- Limitations for Custom Integrations — https://developer.getjobber.com/docs/custom_integrations/
- Setting up Webhooks — https://developer.getjobber.com/docs/using_jobbers_api/setting_up_webhooks/
- API Evangelist third-party API profile — https://github.com/api-evangelist/jobber
- Maton API gateway Jobber reference — https://github.com/maton-ai/api-gateway-skill/blob/main/references/jobber/README.md
- Products & Services List (help) — https://help.getjobber.com/en/articles/products-services-list/
- Markups on Quotes — https://help.getjobber.com/hc/en-us/articles/1500012369781-Markups-on-Quotes
- App Marketplace — https://secure.getjobber.com/app_marketplace
- Ply inventory app listing — https://secure.getjobber.com/app_marketplace/ply_inventory
- AI Receptionist launch, PR Newswire, 18 Aug 2025 — https://www.prnewswire.com/news-releases/jobber-launches-ai-powered-receptionist-to-answer-calls-and-texts-for-busy-home-service-businesses-302531125.html
- Jobber AI Receptionist feature page — https://www.getjobber.com/features/ai-receptionist/
- 100,000 customers milestone, May 2026 — https://www.prnewswire.com/news-releases/jobber-surpasses-100-000-customers-cementing-its-position-as-the-market-leading-platform-for-home-and-commercial-service-businesses-302768759.html
- Capterra UK listing — https://www.capterra.co.uk/software/127994/jobber
- Partners programme — https://www.getjobber.com/partners/
- Rollout API essentials — https://rollout.com/integration-guides/jobber/api-essentials
- Building an App in Jobber Platform (dev.to) — https://dev.to/jobber/building-an-app-in-jobber-platform-5259

**ServiceM8**
- Platform Policy (dated 12 May 2025) — https://developer.servicem8.com/page/platform-policy
- Developer docs index — https://developer.servicem8.com/llms.txt
- Authentication — https://developer.servicem8.com/docs/authentication.md
- Add-on Types — https://developer.servicem8.com/docs/add-on-types.md
- Add-on Capabilities — https://developer.servicem8.com/docs/add-on-capabilities.md
- Add-on Store Requirements — https://developer.servicem8.com/docs/addon-store-requirements.md
- REST Overview — https://developer.servicem8.com/docs/rest-overview
- List Materials — https://developer.servicem8.com/reference/listmaterials.md
- Create Job — https://developer.servicem8.com/reference/createjobs.md
- List Availabilities — https://developer.servicem8.com/reference/listavailabilities.md
- List Job Allocations — https://developer.servicem8.com/reference/listjoballocations.md
- List Job Materials — https://developer.servicem8.com/reference/listjobmaterials.md
- Online Booking Forms & Services — https://support.servicem8.com/help-center/servicem8-add-ons/services-online-booking/how-to-create-online-booking-forms-services
- Phone Agent introduction — https://support.servicem8.com/help-center/servicem8-add-ons/servicem8-phone-agent/introducing-the-servicem8-phone-agent
- UK pricing — https://www.servicem8.com/uk/pricing
- UK pest control page — https://www.servicem8.com/uk/industries/pest-control-software
- ServiceM8 AI in 2026 (Carly, 19 Jul 2026) — https://www.usecarly.com/blog/servicem8-ai/
- Per-job pricing breakdown — https://tooleduppro.com/guides/servicem8-pricing/
- Capterra UK listing — https://www.capterra.co.uk/software/110711/servicem8

**Tradify**
- API Evangelist profile (assessed 12 Jul 2026) — https://github.com/api-evangelist/tradify
- Supergood API assessment — https://supergood.ai/docs/tradify-api
- Capterra UK (152 reviews, 4.7) — https://www.capterra.co.uk/software/152413/tradify
- Capterra Ireland — https://www.capterra.ie/software/152413/tradify
- Access Group acquisition — https://leadiq.com/c/tradify/5a1d9d8f23000053008d6ad1
- UK launch via QBO marketplace — https://www.accountingweb.co.uk/tech/tech-pulse/new-job-management-app-tradify-reaches-the-uk-via-qbo-app-marketplace

**Housecall Pro**
- API Terms of Service — https://docs.housecallpro.com/docs/terms/api-terms
- Public API docs (Stoplight) — https://docs.housecallpro.com/
- Pricebook API — https://docs.housecallpro.com/docs/housecall-public-api/p5zsg5n9sbiij-pricebook-api
- API Overview (MAX plan only) — https://help.housecallpro.com/en/articles/8505035-api-overview
- Price Book: Materials Guide — https://help.housecallpro.com/en/articles/5456326-price-book-materials-guide
- Line Items on Jobs and Estimates — https://help.housecallpro.com/en/articles/7119803-line-items-on-jobs-and-estimates
- Rollout API essentials — https://rollout.com/integration-guides/housecall-pro/api-essentials
- Supergood API Report Card (Grade C) — https://supergood.ai/api-report-card/housecall-pro
- Pricing 2026 (MAX $299 vs Essentials $149) — https://projul.com/blog/housecall-pro-pricing-analysis-2026/
- CSR AI — https://www.housecallpro.com/features/ai-team/csr-ai/

**Other platforms**
- Payaca API guide — https://help.payaca.com/en/articles/11405867-using-payaca-s-api-a-step-by-step-guide
- Fergus API (OpenAPI 3.1) — https://api.fergus.com/docs
- Commusoft developer intro — https://developer.commusoft.com/introduction-1985208m0
- Commusoft public API status — https://status.commusoft.com/public-api
- Joblogic API (IP whitelisting) — https://support.joblogic.com/docs/integration
- Simpro Developer Center — https://developer.simprogroup.com/apidoc/
- Kickserv Developer API — https://help.kickserv.com/article/4-developer-api
- Powered Now Capterra UK (137 reviews) — https://www.capterra.co.uk/software/1030239/powered-now
- PestScan UK listing — https://www.capterra.co.uk/software/156974/pestscan

**Competing AI products**
- AI Receptionist for Jobber (2 Jun 2026) — https://serviceagent.ai/blogs/ai-receptionist-jobber/
- Goodcall Jobber integration — https://www.goodcall.com/business-productivity-ai/jobber
- Best AI Receptionist for UK Trades 2026 — https://www.softomatesolutions.com/blog/best-ai-receptionist-trades-uk-2026/
- Best AI Call Handler UK Trades 2026 — https://whoza.ai/blog/best-ai-call-answering-service-uk-trades-2026
- AI answering services for UK tradespeople — https://heyitsclara.com/gb/blog/best-ai-phone-answering-service-uk-tradespeople/

**Market and adoption**
- UK Admin Drain Report 2026 (HeyBRB, Mar 2026, n=167) — https://www.electricaltimes.co.uk/uk-tradespeople-losing-ten-working-weeks-a-year-to-admin-they-could-automate-survey-finds/
- ToolTime UK (150,000 companies on pen and paper) — https://www.tooltime.app/uk
- UK FSM market size — https://www.marketresearchfuture.com/reports/uk-field-service-management-market-45934
- IBISWorld pest control businesses (822) — https://www.ibisworld.com/united-kingdom/number-of-businesses/pest-control/4285/
- IBISWorld removal services (3,149) — https://www.ibisworld.com/united-kingdom/number-of-businesses/removal-services/3200
- IBISWorld cleaning businesses (75,565) — https://www.ibisworld.com/united-kingdom/number-of-businesses/dry-cleaning-other-services/4895/
- British Cleaning Council sector research — https://britishcleaningcouncil.org/2025/03/18/value-of-the-cleaning-hygiene-and-waste-sector-sets-new-record-says-research/
- UK cleaning industry statistics — https://www.policybee.co.uk/blog/uk-cleaning-industry-statistics
- BigChange 2,000+ UK businesses — https://www.viewpointanalysis.com/post/uk-field-service-management-options-2026

**Price book libraries**
- Profit Rhino (~8,500 tasks, US, $39–59/user/mo) — https://profitrhino.com/
- Profit Rhino Capterra — https://www.capterra.com/p/159314/Profit-Rhino/
- ServiceTitan Pricebook Pro — https://www.servicetitan.com/features/pro/pricebook
- ServiceTitan Pricebook help — https://help.servicetitan.com/docs/pricebook

**UK price data for the library**
- Wasp nest removal cost (Fantastic Services) — https://www.fantasticservices.com/cost-guides/pest-control/wasp-control/
- Wasp nest removal £45–180 by type/access — https://uninvitedvisitors.com/guides/wasp-nest-removal-cost-uk
- Pest control costs complete guide — https://pestproindex.com/guides/pest-control-costs
- Pest control cost UK 2026 — https://www.quickpestcontrol.co.uk/article/pest-control-cost-uk
- House deep cleaning prices — https://www.checkatrade.com/blog/cost-guides/house-deep-cleaning-prices/
- Cost to deep clean a house — https://www.mybuilder.com/cleaning-services/price-guides/cost-to-deep-clean-a-house
- London Cleaning Price Index 2026 — https://stanneshousekeeping.com/blog/london-cleaning-price-index-2026
- House removal cost guide — https://www.myjobquote.co.uk/costs/removals-cost
- House removal costs — https://www.checkatrade.com/blog/cost-guides/house-removal-costs/
- EV charger installation cost — https://www.checkatrade.com/blog/cost-guides/electric-car-charger-installation-cost/
- EV charger cost guide (Voltimum) — https://www.voltimum.co.uk/news/voltimum/ev-charger-installation-cost-how-much-does-it-cost-to-install-an-ev-charger-in-the-uk
- EV charger cost (Elec-Mate) — https://www.elec-mate.com/guides/ev-charger-installation-cost

**Trade associations**
- BPCA membership — https://bpca.org.uk/membership
- BPCA about — https://bpca.org.uk/about/

**Data-licensing caution**
- Checkatrade scraping/compliance notes — https://apify.com/parsebird/checkatrade-scraper
