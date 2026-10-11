# Where European Shops Keep Their Products — And Whether We Can Plug Into It

Research date: 26 September 2026
Question: which product platforms should we connect to, and can a self-serve SaaS actually connect to them without a consultant in the loop?

Every claim below is labelled **Confirmed** (official docs, or three or more independent sources agreeing), **Likely** (one reasonable source), or **Unclear** (could not establish).

---

## 1. Headline findings

1. **The named list is wrong in one important way. Shopify and WooCommerce are right; Odoo is not.** Across every European country with data, Shopify and WooCommerce together are 60–77% of shops. Odoo's shop product is about **0.4%** of the ecommerce market — roughly 18,000–45,000 stores worldwide, against Shopify's ~3.1m and WooCommerce's ~4.1m. *(Confirmed)*

2. **Odoo is a trap, and the reason is commercial, not technical.** Odoo's own documentation says: *"Access to data via the external API is only available on Custom Odoo pricing plans. Access to the external API is not available on One App Free or Standard plans."* A small shop on the Standard plan (~$31/user/month) **cannot connect at all** until it upgrades to Custom (~$61/user/month) — roughly double the bill, for every user, forever. We would be asking a shop owner to double their software cost to use our product. *(Confirmed — official Odoo docs)*

3. **Odoo also has a rate limit that is fatal for a chat agent.** Odoo's Acceptable Use Policy: *"Throttled calls are typically acceptable for unsustained usage at a rate of 1 call/second, with no parallel calls."* One call per second, no parallel calls, shared across our entire tenant's traffic to that shop. A conversational agent that must answer in 2–3 seconds cannot rely on live Odoo reads. *(Confirmed — official policy)*

4. **The third platform should be "custom/none", not a third platform.** After Shopify and WooCommerce, the next biggest category in most European countries is not a competitor — it is **custom-built or undetectable**, at 8–21% of shops. In the Netherlands it is 21.4%, larger than every platform except Shopify and WooCommerce. Building a good fallback beats building a third connector. *(Confirmed)*

5. **Shopify is genuinely self-serve; WooCommerce is nearly so; everything else needs hand-holding.** Shopify is one-click OAuth from an app listing. WooCommerce has a little-known endpoint (`/wc-auth/v1/authorize`) that gives a near-OAuth experience — the shop owner clicks approve and keys are posted to us. This is the single most useful technical finding in this report: **WooCommerce onboarding does not have to mean "email us your API keys."** *(Confirmed)*

6. **Shopify will make us pass a privacy review before we can see a customer's name, and we should plan 4–8 weeks.** Shopify's "protected customer data" process gates name, email, phone and address. Level 2 (which is what we need to place orders) requires encrypted backups, separated test and production environments, staff access restrictions, an access log for protected data, and a written incident response policy. This is real engineering and paperwork, not a checkbox. *(Confirmed — official docs; timing is Likely)*

7. **Webhooks alone will lose us data, and one specific gap will bite hardest.** Shopify retries a failed webhook only 8 times over about 4 hours, and then **deletes the subscription** — the shop goes silently stale forever. Separately, developers report product webhooks not firing on bulk admin edits and CSV imports, which is exactly when a catalogue changes most. Every serious connector must poll as well as listen. *(Confirmed for retry policy; Likely for the bulk-edit gap)*

8. **Almost nobody does multi-platform well, which is the opening.** Gorgias's AI agent is Shopify-only. Tidio's AI reportedly does not read the product catalogue at all. Zipchat covers Shopify, WooCommerce and Wix. Multi-platform with genuinely live stock is rare — and reviews of products that claim it show recurring "sold something we didn't have" failures. *(Likely)*

---

## 2. Platform market share in Europe

### Per-country: share of active shops

Two independent datasets, different methods, same conclusion.

**ShopRank, June 2026** — verified active stores shipping physical products:

| Platform | Ireland | UK | Netherlands | Sweden | Denmark |
|---|---|---|---|---|---|
| Shopify | 36.2% | **46.9%** | 30.3% | **36.1%** | 35.5% |
| WooCommerce | **35.7%** | 24.6% | **36.0%** | 30.8% | **35.9%** |
| Custom / unknown | 14.7% | 13.6% | 21.4% | 18.9% | 17.0% |
| Wix | 4.5% | 6.7% | 1.7% | 2.2% | 1.3% |
| Squarespace | 4.3% | 3.6% | – | 1.0% | 1.1% |
| Magento/Adobe | 1.6% | 1.9% | 3.7% | 2.0% | 2.0% |
| PrestaShop | 0.9% | 0.6% | 1.7% | 2.0% | 2.3% |
| BigCommerce | 0.8% | 0.7% | – | – | – |
| Local platform | – | – | Lightspeed 2.0%, CCV 1.2%, Mijnwebwinkel ~1.9% | Quickbutik 4.9%, Wikinggruppen 1.2% | DanDomain 2.8%, HostedShop 1.0% |
| **Shopify + Woo** | **71.9%** | **71.5%** | **66.3%** | **66.9%** | **71.4%** |

Base sizes: Ireland 27.8k, UK 386.5k, Netherlands 173.3k, Sweden ~52k, Denmark ~39k. *(Confirmed)*

**Tembi, June 2025** — 600,000+ active webshops, 17 markets. Cross-check:

| Country | WooCommerce | Shopify | Next largest | Shopify + Woo |
|---|---|---|---|---|
| Netherlands | 46% | 26% | Optimizely 7%, Magento 5.5%, Lightspeed 3.4% | 72% |
| Denmark | 39% | 37% | DanDomain 6% | 76% |
| Sweden | 39% | 34% | Quickbutik 7.2% | 73% |
| Germany | 24% | 42–43% | **Shopware 7%**, JTL-Shop 3% | 66% |
| Norway | 39% | 36% | MyStore 6% | 75% |
| Finland | 44% | ~26% | MyCashFlow 9% | 70% |
| Belgium | 25% | 50% | PrestaShop 8%, Lightspeed 4% | 75% |
| Italy | 55% | 24–25% | PrestaShop 9% | 79% |

Tembi puts WooCommerce higher and Shopify lower than ShopRank; the two differ on how they count "active." The combined Shopify+Woo figure is stable at **66–79%** either way, which is the number that matters for us. *(Confirmed)*

Note the two datasets **disagree on Germany**: Tembi says Shopify 42% / Woo 24%; other June 2026 detection data says Woo 38% / Shopify 22%, with active-store counts near-tied (~121k each). Germany is a genuinely split market and the most uncertain in this table. *(Unclear — flagged)*

### Platforms we were asked about, and where they land

| Platform | Verdict for us |
|---|---|
| **Shopify** | Tier 1. Top or joint-top everywhere. UK especially (46.9%). |
| **WooCommerce** | Tier 1. Top or joint-top everywhere. Strongest in NL, IE, DK, IT. |
| **Custom / none** | Tier 1 by size (8–21%), even though it is not a platform. |
| **Odoo** | **Drop from the launch list.** ~0.4% of ecommerce; heaviest in Belgium/France, not our target countries. |
| Wix | Tier 2. Matters in IE (4.5%) and UK (6.7%); negligible in NL/Nordics. Good API, easy OAuth. |
| Squarespace | Tier 2. IE 4.3%, UK 3.6%. Paywalled APIs. |
| Magento/Adobe | Skip. 1.6–3.7%, and those are larger merchants who buy custom work. |
| PrestaShop | Skip for our countries. 0.6–2.3% in our five; real only in France (~7k stores), Italy, Belgium, Lithuania. |
| Shopware | Skip unless Germany becomes a priority. ~7% of German shops, ~100k merchants worldwide, near-zero outside DACH. |
| BigCommerce | Skip. Under 1% everywhere in Europe. |
| Lightspeed | Skip, but note it. 2–3.4% in the Netherlands, its home market. Only a Netherlands-specific play. |
| Ecwid | Skip. Appears in some Germany datasets but not in active-store rankings for our countries. |
| Visma / Fortnox | **Not ecommerce platforms.** Nordic accounting/ERP. A shop's stock may live there, but they are not where a shop's storefront is. Not a catalogue source for v1. *(Likely)* |
| Quickbutik (SE), DanDomain (DK), CCV/Mijnwebwinkel (NL) | Skip individually — each 1–5% of one country. Collectively they are part of the reason the fallback matters. |

### Recommendation

**Support three things, not four platforms:**

1. **Shopify** — deep, first-class, with the app store listing.
2. **WooCommerce** — deep, using the `/wc-auth/v1/authorize` flow so it stays self-serve.
3. **A fallback that is actually good** — file or feed import plus a freshness policy (section 5).

Then, only if a specific country becomes a priority: **Wix** (cheap to add, good OAuth, helps Ireland and the UK) before anything else.

**Coverage this gives us:** roughly **66–72% of shops directly**, rising to about **80–90%** once the fallback catches custom-built and small-platform shops. **Left out entirely:** shops on Magento, PrestaShop, Shopware, Lightspeed and the various national platforms — about **10–15%** of the market — plus any shop that refuses to import a file.

**Odoo: keep as a paid, sales-led option for later.** There is a real business in Odoo integration, but it is a consulting business, which is exactly what the team said they do not want. Odoo shops need mapping work per client (industry connectors quote 4–6 weeks for a standard setup, 10–16 weeks with anything unusual). *(Likely)*

---

## 3. Per-platform integration assessment

### 3.1 Shopify — the easy one, with one real hurdle

**API.** GraphQL Admin API is the present and future. REST went "legacy" on 1 October 2024, and since **1 April 2025 all new public apps must use GraphQL** — so we have no choice, and should not follow any REST tutorial. Products, inventory levels and orders are all fully covered. There is also a **Storefront API** for carts. *(Confirmed)*

**How a shop authorises us.** Standard OAuth from our App Store listing. The merchant clicks Install, sees a permission screen, clicks Approve. **Two clicks.** Best-in-class. *(Confirmed)*

**App store, review, money.** Listing on the Shopify App Store requires review: typically **7–14 business days**, 2–4 weeks end to end, longer if changes are requested, and each resubmission adds 1–2 weeks. Revenue share: **0% on the first $1m of app revenue per year, then 15%**, after a one-time **$19** registration fee per Partner account. Payment processing is charged separately (~2.9%). *(Confirmed for revenue share and fee; Likely for timings)*

**Webhooks.** Rich and exactly what we need: `products/create|update|delete`, `inventory_levels/update`, `inventory_items/update`, `orders/create|updated|paid|cancelled|fulfilled`, and `bulk_operations/finish`. Deduplication via the `X-Shopify-Webhook-Id` header. *(Confirmed)*

**The webhook trap.** Shopify retries a failed webhook **up to 8 times over roughly 4 hours** (changed around September 2024 — the widely-quoted "19 retries over 48 hours" is out of date and still all over the internet). If failures continue, **Shopify removes the subscription** and stops sending anything. Shopify's own guidance is explicit that delivery is not guaranteed and that apps should run reconciliation jobs that poll using created/updated filters. *(Confirmed)*

**Rate limits.** Cost-based leaky bucket, not requests per second. Commonly cited: standard plans ~1,000-point bucket restoring ~50 points/second; Plus roughly double. Sources disagree on the exact numbers per tier, so treat the specifics as **Likely** and read the live headers (`maximumAvailable`, `restoreRate`) at runtime rather than hardcoding. **Practically: not a problem for us**, because a conversational agent should answer from our own synced copy, not by calling Shopify mid-conversation. *(Likely)*

**Personal data.** This is the real hurdle. Shopify's **protected customer data** process gates four field groups: name, address (including line 1, line 2, geolocation, zip), email, and phone. Public apps need review. Requirements:

- **Level 1** (non-identifying): data minimisation, transparency, purpose limitation, honour customer consent and opt-out, data protection agreements with merchants, **encryption at rest and in transit**, and enforced retention periods.
- **Level 2** (name, address, email, phone — *what we need*): all of the above **plus** encrypted backups, separated test and production environments, data loss prevention, restricted staff access, strong staff passwords, **an access log for protected customer data**, and a security incident response policy.

Custom apps and development stores get automatic access, so building and testing is unblocked — the review only gates public distribution. Community reports on timing range from a few days to a few weeks; combined with app review, **budget 4–8 weeks**. *(Confirmed on requirements; Likely on timing)*

**Cost to the merchant.** No API fee, and no plan tier requirement for Admin API access. A shop on Basic Shopify can use us. *(Confirmed)*

**Read versus write — good news.** We can genuinely transact:
- `draftOrderCreate` builds an order with line items, customer, addresses; each draft order carries an `invoice_url` that is a working checkout link we can send in chat.
- Storefront API `cart` creates a cart and returns a `checkoutUrl`. As of API version 2026-01, Cart has fully replaced the legacy Checkout object.
- Orders and refunds are writable with the right scopes.

**The important design choice:** sending a `checkoutUrl` or `invoice_url` into the chat means **the customer pays Shopify directly**. We never touch card details, and we may not even need Level 2 protected data approval for a basic "browse, ask, get a checkout link" flow — the customer types their own details into Shopify's checkout. Worth confirming with Shopify, because it could remove weeks from our launch. *(Confirmed on capability; the scope-avoidance idea is Unclear and should be verified)*

**Verdict: build here first.** Best API, best auth, best webhooks, no merchant cost, and real write capability.

---

### 3.2 WooCommerce — better than its reputation, if we use the right endpoint

**What it actually is.** A free WordPress plugin. There is no vendor gatekeeper, no approval, and no revenue share — but also no vendor guaranteeing the shop is reachable. Every WooCommerce shop is a different server with different plugins and different performance.

**API.** REST API v3, current and stable, at `/wp-json/wc/v3/`. Products (including variations), orders, customers, coupons, refunds. *(Confirmed)*

**Authentication — two paths, and the difference decides our business model.**

- **The path everyone uses (bad):** the merchant goes to WooCommerce → Settings → Advanced → REST API → Add Key, picks Read/Write, copies a Consumer Key and Consumer Secret, and pastes them into our app. The secret is shown **once only**. That is roughly **7 fiddly steps in an admin area most shop owners have never opened**, with a one-shot copy-paste that will generate support tickets forever.

- **The path we should use (good):** WooCommerce ships an authorisation endpoint at **`/wc-auth/v1/authorize`**. We send the merchant there with `app_name`, `scope` (`read_write`), `user_id`, `return_url` and `callback_url`. The merchant sees an approve screen, clicks it, and WooCommerce **POSTs the consumer key and secret to our `callback_url` as JSON**, then redirects them back to us. This is an OAuth-shaped flow: **two clicks, no copy-paste**. *(Confirmed — official WooCommerce docs)*

This changes the onboarding story completely and the team should not miss it.

**Caveats on that flow, all real:**
- The `callback_url` must be **HTTPS**.
- The merchant must be **logged into WordPress as an admin**; if not, they are asked to log in first, which is an extra step.
- It does **not work on local or hidden sites** — the shop must be live and publicly reachable, not behind an "under construction" plugin.
- There is a long-standing bug thread where the endpoint returns *"A valid URL was not provided"* (WooCommerce issues #8898 and #31959), typically traced to URL encoding, "Plain" permalink settings, `.htaccess` problems, or WooCommerce living on a subpath. **Expect a meaningful minority of merchants to fail this flow and need the manual key path as a backup.** *(Confirmed the bug exists; the failure rate is Unclear)*

Also note: on a site without HTTPS, the API itself requires OAuth 1.0a request signing rather than simple Basic auth — more work, and a signal the shop is poorly maintained. *(Confirmed)*

**Webhooks.** Available but thinner than Shopify's. Topics are `product.created|updated|deleted`, `order.created|updated|deleted`, `customer.*`, `coupon.*`, plus custom topics mapped to WordPress hooks. Signed with HMAC-SHA256 using a shared secret. *(Confirmed)*

**Webhook traps — worse than Shopify's:**
- **There is no separate stock event.** Stock changes arrive as `product.updated`, so we cannot subscribe narrowly to inventory. Every price tweak and description edit wakes us up.
- After **5 consecutive failed deliveries, the webhook is disabled** — and unlike Shopify there is no vendor to tell us. The shop goes quiet and we will not know.
- Only the **25 most recent delivery logs** are retained, so debugging a merchant's sync problem after the fact is close to impossible.
- Webhooks fire from the WordPress process. On cheap shared hosting they can be delayed or dropped under load. *(Confirmed)*

**Rate limits.** The core REST API has **no rate limiting by default** — which sounds good and is actually a hazard. There is a documented real-world case of an external system polling a WooCommerce site every 5 seconds with ~1MB responses and causing serious performance degradation. **We can take a merchant's shop down by syncing too hard, and they will blame us.** Optional rate limiting exists for the Store API (default 25 requests per 10 seconds) but is off by default and does not cover the main REST API. Self-throttling is our responsibility. *(Confirmed)*

**Performance — the real WooCommerce problem.** Variable products with many variations are slow. WooCommerce instantiates all variation objects, and there are open core issues about 150–300 variation products taking 4–5 seconds to load; the bottleneck is in `read_variation_attributes()`. There are **no plans in core to add pagination or lazy loading for variation data**. To build a full catalogue we must fetch every product and then every product's variations — described by WooCommerce's own developers as "a huge performance hit." WooCommerce 10.5 (2026) added variation price caching and experimental REST/product-object caching, which helps but does not fix it. *(Confirmed)*

**Personal data.** No platform-level gate — no equivalent of Shopify's protected customer data review. That is not a relief: **it means GDPR compliance is entirely ours**, with no vendor checklist to lean on and no vendor to share responsibility with. For our target market (Ireland, Netherlands, Nordics, UK) we need our own data protection agreement with each merchant, since Shopify's merchant-facing DPA machinery will not be there to help. *(Confirmed there is no review; the GDPR conclusion is our own reasoning)*

**Cost.** WooCommerce and its REST API are free. No plan tier. Best-case for the merchant. *(Confirmed)*

**Read versus write — fully capable.** `POST /wp-json/wc/v3/orders` creates orders (use status `pending` or `on-hold` for unpaid), and `POST /orders/<id>/refunds` issues refunds — optionally through the real payment gateway via the `api_refund` flag. Stock is writable on the product and variation resources. *(Confirmed)*

**Verdict: build second, and budget more engineering than Shopify despite the simpler API.** The API is easy; the *environment* is hard. Thousands of different hosting setups, no vendor support line, slow variation reads, silently disabled webhooks, and no rate limiting to protect us from ourselves.

---

### 3.3 Odoo — much harder than the team thinks

This deserves plain language because the team may be about to spend months on 0.4% of the market.

**It is not a shop platform.** Odoo is an ERP. A shop running Odoo usually runs its *business* in Odoo — accounting, stock, purchasing — and its *storefront* somewhere else, often Shopify or WooCommerce. That is why there is a healthy market in Shopify↔Odoo connectors. So even when we find an Odoo shop, **the catalogue we want may be better reached through their actual storefront**, and Odoo is the second integration, not the first.

**Blocker 1 — the API is paywalled, and the price is brutal.** Odoo's own documentation: *"Access to data via the external API is only available on Custom Odoo pricing plans. Access to the external API is not available on One App Free or Standard plans."*

In 2026 pricing that is roughly **$31/user/month (Standard, no API) versus ~$61/user/month (Custom, API included)**. For a five-person shop that is about **$150/month extra, forever**, purely to permit our integration. Odoo does clarify that calls *initiated by Odoo* (payment providers, carriers, bank sync) are not "External API" and are included — which is relevant, because it means **Odoo's outbound webhooks may be usable on cheaper plans while our inbound reads are not**. Worth verifying, but it does not solve the problem: we still need to read the catalogue. *(Confirmed on the docs quote and the restriction; the webhook-only workaround is Unclear)*

**Blocker 2 — one call per second, no parallel calls.** From Odoo's Acceptable Use Policy: *"Throttled calls are typically acceptable for unsustained usage at a rate of 1 call/second, with no parallel calls."* Exceeding it risks being flagged for service abuse. For an agent that must answer in seconds — and where an initial catalogue sync might need thousands of calls — this is severe. A 5,000-product first sync at one call per second with no parallelism is over an hour of continuous calling, right at the edge of what the policy permits. Batch APIs exist and must be used. Odoo.sh or self-hosted lifts this; **Odoo Online does not**. *(Confirmed)*

**Blocker 3 — no real webhooks, and we cannot set them up ourselves.** Odoo's external API does not push events. Change notifications require **Automation Rules / Studio webhooks**, configured **inside each individual Odoo database**, per model, by someone with admin access. That means:
- Someone must log into the shop's Odoo and configure outbound webhooks for products, stock and orders **by hand, per client**. That is the consulting business the team wants to avoid.
- **Studio is a Custom-plan feature**, the same tier as the API paywall.
- **Odoo Online will not let us install a custom module**, so we cannot ship code that sets this up automatically. No custom fields on existing models, no custom cron jobs, no module-based webhook triggers.
- If we skip webhooks and poll instead, we are polling at one call per second. *(Confirmed on the module restriction and Studio requirement; Likely on the precise plan gating of Studio)*

We could not confirm whether outbound Studio webhooks are signed or authenticated, or whether they can be created remotely via the API. Odoo's documentation page on webhooks covers *inbound* webhooks in detail and only mentions outbound in a passing note. *(Unclear)*

**Blocker 4 — the protocol is being removed.** XML-RPC and JSON-RPC (`/xmlrpc`, `/xmlrpc/2`, `/jsonrpc`) are scheduled for removal in **Odoo 22 (~autumn 2028)** for self-hosted and **Odoo Online 21.1 (~winter 2027)** for SaaS. The replacement is the **External JSON-2 API**. So anything built on XML-RPC today has a **~15-month shelf life on Odoo Online**. Any tutorial showing username/password XML-RPC is already the wrong thing to copy — use JSON-2 with API keys. *(Confirmed on deprecation; specific dates Likely)*

**Blocker 5 — no transactions.** Every JSON-2 call runs in its own SQL transaction and calls cannot be chained. Industry commentary flags this as *"especially dangerous for operations related to reservations and payments."* Placing an order is not one atomic call — it is create-order, add-lines, confirm. If we fail halfway we leave a broken order in the shop's real ERP. We must build our own compensation logic. *(Likely)*

**Blocker 6 — upgrades break us, per client.** Odoo renames fields between versions (`res.users.groups_id` became `group_ids` in 19.0). Any client that hardcodes field names breaks on upgrade. Because every Odoo instance can be on a different version with different custom modules, **we would be maintaining per-client, per-version field mappings** — the definition of consulting. *(Likely)*

**What connecting actually involves.** API key from Settings → Users → API Keys, then calls against Odoo's data model rather than a shop-shaped API: `product.template` and `product.product` for products (template versus variant — a distinction that does not map cleanly to Shopify's product/variant model), `stock.quant` for stock, `sale.order` for orders, `res.partner` for customers. No "get me the catalogue" endpoint; we compose `search_read` calls and understand Odoo's model graph. Commercial connectors say plainly that **none work out of the box** and all need customisation per business. *(Confirmed on models; Likely on the customisation claim)*

**Authorisation step count for the merchant:** upgrade plan (billing decision, possibly a sales call) → enable developer mode → create API key → find database name → give us the URL → and for change notifications, hand-configure automation rules per model. **Nothing like self-serve.**

**App store.** Odoo Apps Store exists; developers receive **70% of module revenue**, paid out once unredeemed sales reach €400. But it distributes **Odoo modules** — installable code — and **Odoo Online users cannot install third-party modules**. So the Odoo app store is largely irrelevant to a SaaS connector aimed at Odoo Online shops. *(Likely)*

**Cost.** ~$30/user/month uplift to Custom, indefinitely, paid by the merchant. *(Confirmed)*

**Read versus write.** Technically full read and write — `sale.order` creation, stock updates, everything. Undermined in practice by the rate limit and the lack of transactions. *(Confirmed on capability)*

**Odoo Online versus self-hosted — the summary that matters:**

| | Odoo Online (SaaS) | Odoo.sh / self-hosted |
|---|---|---|
| External API | **Custom plan only** | Included |
| Rate limit | **~1 call/sec, no parallel** | Our own infrastructure limits |
| Custom modules | **Not allowed** | Allowed |
| Studio webhooks | Custom plan | Available |
| RPC removal | **~winter 2027** (21.1) | ~autumn 2028 (v22) |
| Realistic for self-serve SaaS? | **No** | Only with per-client setup |

**Verdict: do not build this for v1.** The market is ~0.4%, the merchant must double their Odoo bill, the rate limit is hostile to conversational use, change notification requires manual per-client configuration we are technically barred from automating on Odoo Online, and the protocol expires in about 15 months. If a large Odoo prospect appears, price it as a paid integration project.

---

### 3.4 Shorter notes on the others

**Wix** — *the best Tier 2 candidate.* REST API covering products, inventory, orders and collections. **OAuth 2.0** with self-serve app registration in the Wix App Dashboard. Real app market with a large installed base. Matters most in Ireland (4.5%) and the UK (6.7%). If we add a third connector, this is it — low effort, decent share in our two English-speaking markets. *(Likely)*

**Squarespace** — *good API, awkward commercially.* Orders, Inventory, Products, Transactions, and a proper **Webhook Subscriptions API** (including order created). But: the APIs are gated to higher **Commerce Advanced / Premium plans**, and there are **two incompatible credential models** — a per-site Developer API key can read orders, but **only an OAuth Developer Platform token can create a webhook subscription**. So the easy credential cannot give us live updates, and the credential that can requires becoming an approved Extension. Rate limits reported around 300 requests/minute per site. Order *creation* appears limited to "importing orders from third-party sales channels" rather than true order placement. Worth ~4% in Ireland and the UK. *(Likely; the order-creation limit is Unclear)*

**PrestaShop** — *skip for our countries.* The legacy webservice uses per-key API keys with a resource/method permission grid that **the merchant configures by hand** — many steps, no OAuth. A new OAuth 2.0 Admin API exists in PrestaShop 9 but was **not production-stable** as of the sources reviewed, and most integrations still target the legacy webservice. Webhooks appear focused on billing events rather than product/order changes, and PrestaShop Billing was deprecated in January 2026 with a new webhook system still rolling out. Real share only in France, Italy, Belgium, Lithuania. *(Likely)*

**Shopware** — *technically the nicest of the also-rans.* Full REST **and** GraphQL, a Store API for storefronts, and an Admin API using **OAuth 2.0** (password grant or client credentials), plus an app system. ~7% of German shops, ~100k merchants worldwide, €12bn combined GMV. **Only worth it if Germany becomes a named target market.** *(Likely)*

**Magento / Adobe Commerce** — skip. 1.6–3.7% share, and those merchants are large enough to commission bespoke integration. Wrong customer for self-serve SaaS.

**BigCommerce** — skip. Good API and OAuth, but under 1% of European shops.

**Lightspeed** — Dutch-origin, OAuth 2.0, real app market (stated 150,000+ paying merchants), and a partner programme requiring an application with a dedicated partner manager. 2.0–3.4% in the Netherlands and ~4% in Belgium, near-zero elsewhere. A Netherlands-only play. *(Likely)*

**Visma / Fortnox** — **a category error we should flag.** These are Nordic accounting and business software, not storefronts. A Swedish shop's *stock* may live in Fortnox, but its *catalogue for customers* does not. Not a catalogue source for v1. *(Likely)*

**Ecwid** — appears in some Germany-focused datasets but not in active-store rankings for any of our five countries. Skip. *(Unclear)*

---

## 4. The onboarding-effort comparison

This is the SaaS-versus-consulting question, so it deserves the sharpest table in the report. "Steps" means things a non-technical shop owner must personally do.

| Rank | Platform | Merchant steps | What they are | Self-serve? |
|---|---|---|---|---|
| 1 | **Shopify** | **2** | Click Install from app listing → Approve permissions | **Yes — ideal** |
| 2 | **Wix** | **2–3** | Install from App Market → Approve OAuth scopes | **Yes** |
| 3 | **WooCommerce** *(auth endpoint)* | **2–4** | Enter store URL → (log into WP if needed) → Approve on WooCommerce screen → redirected back | **Yes, mostly** — some sites fail and fall back to rank 6 |
| 4 | **Shopware** | **3–5** | Install app / create integration → copy client ID + secret | Borderline |
| 5 | **Squarespace** | **3–6** | Confirm plan is Advanced+ → OAuth as approved Extension (or generate API key, which loses webhooks) | Borderline — plan check kills some |
| 6 | **WooCommerce** *(manual keys)* | **~7** | Log in → WooCommerce → Settings → Advanced → REST API → Add Key → set Read/Write → copy key **and one-time-only secret** → paste into us | **No — support tickets** |
| 7 | **PrestaShop** | **~8** | Log in → Advanced Parameters → Webservice → enable → add key → **tick each resource/method in a permission grid** → copy key | **No** |
| 8 | **Odoo** | **6–10+, plus a purchase** | **Upgrade Standard → Custom (billing decision, likely a sales call)** → enable developer mode → Settings → Users → API Keys → create → find database name → send us URL + db + key → **then hand-configure automation rules per model for change notifications** | **No — this is consulting** |

**The conclusion the team should take from this table:** Shopify and WooCommerce-via-auth-endpoint are the only two paths that are genuinely self-serve at scale. Everything below rank 5 needs a human on a call. **Odoo is not merely more steps — it contains a purchase decision**, and no amount of clever engineering removes that.

**One product decision follows directly:** build the WooCommerce `/wc-auth/v1/authorize` flow properly, with the manual-key path as a visible fallback for the sites where it breaks. If we ship only manual keys, WooCommerce — a third of our market — becomes a support-heavy, high-churn segment.

---

## 5. Shops on no platform

### How big is the gap, honestly

**Shops with a website but no detectable platform: 8–21% of active shops** in our target countries — 14.7% Ireland, 13.6% UK, 21.4% Netherlands, 18.9% Sweden, 17.0% Denmark (ShopRank, June 2026). Store Leads counts **1,697,737** "Custom Cart" stores globally. *(Confirmed)*

**Important caveat that cuts both ways.** Store Leads states plainly: *"New ecommerce platforms are introduced regularly and though we support over 200 platforms, some newer (or smaller) platforms are not yet supported. Stores on these platforms are often classified as Custom Cart."* So this bucket **overstates** truly bespoke sites — some are small platforms with real APIs. It also **understates** our opportunity, because a shop on an unsupported small platform is, for our purposes, equally unreachable by a connector. Either way, the fallback is what serves them. *(Confirmed)*

**Shops with no website at all — larger, and mostly invisible to these datasets.** Eurostat (2025) says **76.7% of small EU enterprises have a website**, meaning roughly **23% do not**. Eurostat also reports about **58% of small enterprises use social media**. So there is a substantial population of small shops selling through Instagram, Facebook and WhatsApp with no website — and **they are absent from every platform-share table in this report**, because those tables count websites.

This is the strategically interesting part. Every platform-share number above is a denominator of *shops with detectable websites*. A shop selling from Instagram with stock in a spreadsheet **is our ideal customer** — it has no website to chat on, so WhatsApp and Instagram *are* its storefront — and it is invisible to competitors doing app-store distribution. We could not find a clean figure for "European small shops that sell but have no website," and that is a real gap. *(Confirmed on the Eurostat figures; the size of the sells-but-no-website population is **Unclear**)*

### How existing products serve them

Badly, or not at all. The observed patterns:

- **Refuse them.** Most AI agent products are app-store distributed and simply require Shopify. Gorgias's AI agent is Shopify-only.
- **Ignore the catalogue entirely.** Tidio's Lyro reportedly does not read the product catalogue and is trained manually on FAQ and knowledge-base content. It answers questions about the *shop* but not about *products* — no stock, no price. Easy to build, and useless for our purpose.
- **Spreadsheet and CSV import.** Product-data tools accept Google Sheets, CSV and Excel imports. This is the honest fallback.
- **Meta's own catalogue.** The merchant keeps a catalogue in Meta Commerce Manager and Instagram/WhatsApp serve it. Two hard limits worth knowing: **500 products per WhatsApp Business Account, one catalogue per account**, and **scheduled feed fetches cannot run more often than hourly**. Meta's Feed API can push updates immediately instead of waiting for the scheduled fetch. *(Likely)*

### The staleness problem, and what to do about it

The failure is specific and reputationally expensive: **the agent confidently promises something that sold out weeks ago.** This is a documented, recurring complaint — chatbots giving confident answers about stock and pricing that are out of date, customers quoted prices that changed weeks ago or offered discontinued products. Manual catalogues are described as becoming "an operational liability at scale because every price or availability change requires a re-upload."

For a shop with no system of record, **no amount of engineering makes a spreadsheet fresh.** So the design must manage the promise rather than pretend to solve the sync. Concretely:

1. **Track age per record and let it change the agent's language.** Under 24 hours: "we have it in stock." Two weeks old: "that should be available — let me confirm with the owner before you pay." Sixty days: stop asserting availability entirely.
2. **Never let a stale record close a sale.** Fresh data can take payment; stale data can only take a reservation or hand off to the owner. This one rule prevents the worst outcome.
3. **Show the merchant their own decay.** A dashboard line saying "your catalogue was last updated 34 days ago — 12 customers asked about stock this week" converts staleness from our problem into their prompt to act.
4. **Make re-upload trivial and habitual.** A Google Sheet we re-read on a schedule beats a CSV the owner must remember to re-upload. Same effort for them, continuously fresh for us.
5. **Let the agent close the loop.** When a customer asks about something we are unsure of, ask the owner in WhatsApp — "Do you still have the blue size M?" — and write the answer back to the catalogue. The conversation becomes the sync mechanism. This is the one advantage we have over a connector-only product, and it only works for merchants with no platform.
6. **Be explicit in the interface that this tier is degraded**, so merchants have a reason to connect a real platform later. Staleness becomes an upgrade prompt.

---

## 6. What existing products connect to

| Product | Platforms | Notes |
|---|---|---|
| **Gorgias** | **Shopify only** (for AI Agent) | Large, well-funded, and still Shopify-only. On WooCommerce the integration is **read-only**. Tells us multi-platform is genuinely hard. *(Likely)* |
| **Zipchat** | **Shopify, WooCommerce, Wix** | The closest to our intended shape, and notably **exactly the three-platform list we recommend**. Independent convergence on the same answer. *(Likely)* |
| **Tidio (Lyro)** | Shopify, WooCommerce (live chat) | AI reportedly **does not read the product catalogue** — trained manually on FAQs. Not a real catalogue competitor. *(Likely)* |
| **Wati** | Shopify, WooCommerce, Google Sheets, Zapier | WhatsApp-first, closest channel overlap with us. "One-click plugin syncs catalogues instantly." **Google Sheets support is the no-platform fallback in practice.** *(Likely)* |
| **ManyChat** | Shopify (basic product data); WhatsApp, Instagram, SMS | Strong on channels, weak on catalogue. **WooCommerce reportedly needs a workaround via Make.com** rather than native integration. *(Likely)* |
| **Chatfuel** | Shopify, WooCommerce, Magento | Broadest platform list among the messaging-first tools. *(Likely)* |
| **BotSailor** | Shopify, WooCommerce, Salla | Multi-platform, lower profile. *(Likely)* |

### What this tells us

- **Nobody has locked down the multi-platform position.** The best-resourced player (Gorgias) is Shopify-only. That is our opening, and it confirms the team's instinct.
- **Shopify + WooCommerce is the industry-standard pair**, and the one product closest to our shape adds exactly Wix. Our recommendation matches what the market has independently converged on.
- **No product we found integrates Odoo as a catalogue source for a chat agent.** Odoo connectors exist in volume — but they are **Shopify↔Odoo data-sync tools sold as configured projects**, not self-serve AI agents. The absence is evidence, not an opportunity.
- **On real-time claims:** vendors say "products, variants, prices, and stock sync automatically and stay synced" and describe being "connected to your live Shopify catalog." But other vendor documentation quietly says sync "can be set to hourly intervals." **Hourly polling described as real-time is the industry norm.** Reviews bear out the gap: apps allowing purchases of out-of-stock items, inventory quantities wrong for months, stock added back instead of deducted after a sale, support offering only temporary re-syncs. *(Likely)*

**The bar is lower than it looks.** If we genuinely deliver webhook-driven updates with reconciliation polling, we will be better than most products claiming real-time today. That is a defensible, honest marketing claim.

---

## 7. Known failure modes and how to design against them

### 7.1 Missed webhooks — assume it, do not hope

**What goes wrong.** Shopify retries 8 times over ~4 hours then **deletes the subscription**; the shop goes silently stale forever. WooCommerce **disables the webhook after 5 consecutive failures** and keeps only 25 delivery logs, so we cannot even reconstruct what happened. Neither platform tells us it has stopped. Shopify's own documentation states delivery is not guaranteed.

**Design against it:**
- **Reconciliation polling is mandatory, not a nice-to-have.** Shopify explicitly recommends periodic jobs using created/updated filters. Nightly full reconciliation, plus a lighter sweep every few hours for stock.
- **Health-check our own subscriptions.** Query the shop's registered webhooks on a schedule and re-register anything missing. This catches the silent-deletion failure, which is otherwise invisible.
- **Acknowledge in under 5 seconds, then queue.** Do the work asynchronously. Slow processing is what triggers the retry-then-delete death spiral.
- **Dead letter queue plus replay.** Nothing is lost; everything is re-runnable.
- **Deduplicate** on `X-Shopify-Webhook-Id` / `X-Shopify-Event-Id`. Retries mean we will see duplicates.
- **Track "last successful sync" per shop and alert on staleness** — ours and the merchant's. A shop silent for 48 hours is a bug, not quiet trading.

### 7.2 Bulk catalogue changes — the worst case, and it is common

**What goes wrong.** Two distinct problems.

First, developers report that **Shopify product webhooks do not fire on bulk admin edits and CSV imports** — precisely when catalogues change most. Community discussion notes this forces developers to poll, potentially "hundreds of thousands of extra API calls for a single app." There *is* a `bulk_operations/finish` topic, but it covers **API-initiated** bulk operations, not a merchant hand-editing in the admin or importing a CSV. We could not find an authoritative current Shopify statement resolving whether admin bulk edits now emit per-product webhooks — the complaint threads are several years old and behaviour may have changed. **Flagged as Unclear and worth testing directly before we design around it.**

Second, the opposite failure: a 5,000-product price update **does** fire 5,000 webhooks in minutes, and naive processing means 5,000 API reads, blowing the rate limit and possibly taking a WooCommerce shop down.

**Design against it:**
- **Debounce and coalesce.** Buffer product events for 30–60 seconds; collapse repeats for the same product; fetch changed products in batches rather than one call each.
- **Detect burst mode and switch strategy.** Above a threshold of events per minute, stop processing individually and trigger a bulk re-sync instead. Shopify's Bulk Operations API is built for this (API 2026-01 and later allows up to five concurrent bulk mutations per shop).
- **Test the bulk-edit gap on a real store before designing around webhooks.** If per-product webhooks genuinely do not fire on CSV import, nightly reconciliation is not a safety net — it is the primary mechanism, and our "real-time" claim needs qualifying.
- **Self-throttle hard on WooCommerce.** No default rate limiting means we can take a merchant's shop down. Cap concurrency per shop, back off on slow responses, and prefer off-peak for big syncs.

### 7.3 Variants — the thing that quietly ruins a shopping conversation

**Why it matters more for us than for a normal connector.** "Do you have this in medium?" is the single most common question a shop customer asks. A connector that flattens variants cannot answer it, and an agent that says "yes, in stock" when only XXL remains is worse than no agent.

**What goes wrong.**
- **Flattening.** Storing one stock number per product loses per-variant availability entirely. This is the defining failure.
- **WooCommerce performance.** Variations are slow — 150–300 variation products take 4–5 seconds; the bottleneck is in `read_variation_attributes()`; WooCommerce instantiates all variation objects. **Core has no plans for pagination or lazy loading of variation data.** Building a full catalogue means fetching every product then every product's variations — "a huge performance hit" in WooCommerce's own words. WooCommerce 10.5 added variation price caching and experimental REST caching, which helps.
- **Model mismatch across platforms.** Shopify has clean product→variant with per-variant inventory at locations. WooCommerce has variable products with variations. Odoo has `product.template` versus `product.product`, which maps onto neither cleanly. A single internal model has to absorb all three.

**Design against it:**
- **Variant as a first-class entity from day one**, with its own SKU, price and stock. Retrofitting this later means rewriting the agent's reasoning layer.
- **Store option dimensions as structured data** (size = M, colour = blue), not as a concatenated title string. The agent needs to reason over dimensions to say "we have blue in S and L, not M."
- **Never aggregate stock to product level** for an availability answer.
- **Cache WooCommerce variations aggressively and sync them off-peak**, accepting slightly staler variant data as the price of not degrading the merchant's site.
- **Multi-location stock:** decide early whether "in stock" means any location or a specific one. Shopify exposes inventory per location, and getting this wrong means promising stock in the wrong warehouse.

### 7.4 Multi-currency and multi-language

**What goes wrong.** Shopify Markets means a product does not have *a* price — it has a price per market, with automatic conversion or fixed per-market price lists. Query the wrong context and the agent quotes the wrong currency, or a converted price that differs from what the customer sees at checkout. Products can also be **published or unpublished per market**, so the agent can offer something unbuyable in the customer's country. On WooCommerce, multi-currency and multi-language are **third-party plugins** (WPML and similar) with no standard REST representation, so there is no reliable general way to read translated or localised data.

**Design against it:**
- **Use Shopify's contextual pricing properly.** `ProductContextualPricing` and the variant-level `contextualPricing` field return market-specific prices, and the Admin API can query multiple presentment prices per variant in one request. Store price *per market*, not one price.
- **Respect per-market publication.** Check catalogue publication before offering a product to a customer in a given country.
- **Tie currency to the conversation.** Infer market from phone country code or ask, then hold it for the whole conversation. Never mix currencies in one chat.
- **On WooCommerce, detect the multi-currency plugin or degrade honestly.** If we cannot read reliable localised prices, quote the base currency and say so rather than guessing.
- **Language is separable, and we are lucky here.** The product operates in English, so the agent's language is fixed. But product *names and descriptions* will be Dutch, Swedish, Danish. The agent must handle a Dutch product title inside an English conversation, and match a customer's Dutch product name against Dutch catalogue text. That is a search and matching problem, not a translation problem, and it argues for multilingual embeddings in product search from the start.

### 7.5 Cross-cutting: never call the platform mid-conversation

Every rate limit in this report points the same way. Shopify's cost-based budget is generous but finite; WooCommerce has no limit and so we can damage the shop; Odoo allows one call per second with no parallelism.

**Therefore: the agent answers from our own synchronised copy, always.** Live platform calls happen only at the moment of transaction — creating a cart, a draft order, or an order — where latency is acceptable and the customer expects a brief wait. Apart from one possible exception: a **single** live stock check on the specific variant a customer is about to buy is worth the latency, because it prevents the most damaging failure. Even then, budget for it and degrade gracefully if the platform is slow.

---

## 8. What we could not find out, and how to close each gap

| Gap | What we looked for | How to close it |
|---|---|---|
| **Do Shopify product webhooks fire on admin bulk edits and CSV imports?** | Changelog and current docs; found only complaint threads from ~2019–2021 and a `bulk_operations/finish` topic covering API-initiated operations | **Test it.** Development store, 500 products, bulk-edit prices in admin and import a CSV, count webhooks. Half a day, and it determines whether reconciliation polling is a safety net or the primary mechanism. **Highest-value gap in this report.** |
| **Protected customer data review duration** | Official docs give requirements but no timeline; community reports range from days to weeks | Submit early with a minimal scope request. Also ask Shopify Partner support directly. |
| **Can we avoid Level 2 protected data entirely** by sending checkout links so the customer enters their own details? | Not addressed in the docs we found | Ask Shopify Partner support before building. **Could remove weeks from launch.** |
| **Exact Shopify rate limits per plan tier** | Sources disagree (50 vs 100 points/sec restore; 1,000 vs 2,000 bucket) | Read `maximumAvailable` and `restoreRate` from live response headers; never hardcode. |
| **Are Odoo outbound Studio webhooks signed, and can a third party create them via API?** | Odoo's webhook docs cover inbound in detail, outbound only in a passing note | Trial Odoo Online Custom instance. Low priority given the recommendation to defer Odoo. |
| **Does the Odoo "calls initiated by Odoo are not External API" carve-out let webhooks work on Standard plans?** | Inferred from pricing FAQ language, not confirmed | Ask Odoo sales in writing. Would slightly soften the Odoo verdict but not reverse it. |
| **Share of European small shops that sell but have no website** | Eurostat gives 76.7% of small enterprises have a website and ~58% use social media, but not the sells-with-no-website intersection | Eurostat microdata, or a national body (Enterprise Ireland, CBS Netherlands). Or field research: 20 Instagram-only shops in Dublin and Amsterdam. **This is our beachhead market — worth the effort.** |
| **Germany platform split** | Two credible datasets disagree materially (Tembi: Shopify 42/Woo 24; ShopRank-family: Woo 38/Shopify 22) | Only matters if Germany becomes a target. Buy one month of a store-detection tool. |
| **WooCommerce `/wc-auth/v1/authorize` real-world failure rate** | Confirmed the flow and confirmed open bugs, but no data on how often it fails | Instrument it from day one: log attempts, successes, failures by cause. Determines how much the manual fallback matters. |
| **Ireland and Nordic detail beyond ShopRank** | Tembi did not cover Ireland; no Statista access for Denmark/Sweden | ShopRank's Ireland figures are consistent with neighbours; treat as sufficient. Statista reports exist behind a paywall if precision is needed. |
| **Squarespace true order creation** | Docs say "import orders from third-party sales channels," ambiguous on real order placement | Only matters if Squarespace is prioritised. Free developer account and a test call. |
| **Freshness of everything here** | — | Platform APIs and approval rules change often. **Re-verify Shopify's protected-data requirements, rate limits and REST sunset dates before implementation**, and re-check Odoo's RPC removal dates (Odoo Online ~winter 2027 is close enough to matter). |

---

## 9. Sources

All accessed 26 September 2026.

**Market share**
- ShopRank Ireland — https://shoprank.com/countries/ireland (data June 2026)
- ShopRank United Kingdom — https://shoprank.com/countries/united-kingdom (data June 2026)
- ShopRank Netherlands — https://shoprank.com/countries/netherlands (data June 2026)
- ShopRank Sweden — https://shoprank.com/countries/sweden (data June 2026)
- ShopRank Denmark — https://shoprank.com/countries/denmark (data June 2026)
- Tembi, "Commerce platforms in European e-commerce: 17 countries analysed" — https://www.tembi.io/blog/commerce-platforms-in-european-e-commerce (June 2025, 600k+ webshops)
- GravityKit, "Ecommerce platform market share 2026" — https://www.gravitykit.com/ecommerce-platform-market-share-2026/ (HTTP Archive, May 2026 crawl)
- Store Leads, "The State of Ecommerce in 2026" — https://storeleads.app/reports
- Store Leads, "The State of Shopify in 2026" — https://storeleads.app/reports/shopify
- Store Leads, "The State of Custom Cart in 2026" — https://storeleads.app/reports/custom
- Enlyft, Odoo eCommerce market share — https://enlyft.com/tech/products/odoo-ecommerce
- 6sense, Odoo eCommerce market share — https://6sense.com/tech/ecommerce-platform/odoo-ecommerce-market-share
- Eightx, "Germany Shopify Landscape 2026" — https://eightx.co/blog/germany-shopify-landscape
- Eurostat, Digitalisation in Europe 2025 — https://ec.europa.eu/eurostat/web/interactive-publications/digitalisation-2025
- Eurostat, "Two-thirds of EU enterprises use social media" (12 June 2026) — https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260612-2

**Shopify (official)**
- Work with protected customer data — https://shopify.dev/docs/apps/launch/protected-customer-data
- API limits — https://shopify.dev/docs/api/usage/limits
- GraphQL Admin API reference — https://shopify.dev/docs/api/admin-graphql
- Webhooks overview — https://shopify.dev/docs/api/webhooks
- Webhook best practices — https://shopify.dev/docs/apps/build/webhooks/best-practices
- Troubleshoot webhooks — https://shopify.dev/docs/apps/build/webhooks/troubleshooting-webhooks
- New public apps must use GraphQL from April 2025 — https://shopify.dev/changelog/starting-april-2025-new-public-apps-submitted-to-shopify-app-store-must-use-graphql
- Revenue share — https://shopify.dev/docs/apps/launch/distribution/revenue-share
- Access scopes — https://shopify.dev/docs/api/usage/access-scopes
- draftOrderCreate — https://shopify.dev/docs/api/admin-graphql/latest/mutations/draftordercreate
- Create and update a cart (Storefront API) — https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage
- Bulk import with GraphQL Admin API — https://shopify.dev/docs/api/usage/bulk-operations/imports
- Bulk operations (queries) — https://shopify.dev/docs/api/usage/bulk-operations/queries
- `bulk_operations/finish` changelog — https://shopify.dev/changelog/new-webhook-topic-notifies-when-a-bulk-operation-has-finished
- About Shopify Markets — https://shopify.dev/docs/apps/build/markets
- New requirements for apps using customer personal data — https://www.shopify.com/partners/blog/data-protection

**Shopify (community / secondary)**
- Products/update webhooks not firing on bulk edit — https://community.shopify.com/c/Shopify-APIs-SDKs/Products-Update-Webhooks-not-firing-when-user-does-a-bulk/td-p/340505
- Reconciling orders after missed webhooks — https://community.shopify.com/t/how-to-reconcile-orders-in-case-of-missed-webhooks/274830
- Importing and bulk updating products, best practice — https://community.shopify.com/t/importing-and-bulk-updating-products-best-practice/1925 (2019–2021)
- Protected customer data, submitting existing app for review — https://community.shopify.com/t/protected-customer-data-how-to-send-for-review-existing-app/194061
- HookRescue, Shopify webhook retry policy (2024+ rules) — https://hookrescue.com/shopify-webhook-retry-policy
- EventDock, "Shopify Webhook Reliability: Why Orders Go Missing" — https://eventdock.app/blog/shopify-webhook-reliability-orders-missing
- Let's Talk Shop, Admin GraphQL rate limits 2026 — https://www.letstalkshop.com/blog/shopify-admin-graphql-rate-limits-2026
- Growave, How long does Shopify app review take — https://www.growave.io/blog/how-long-does-shopify-app-review-take
- Digital Heroes, Shopify App Submission Checklist 2026 — https://digitalheroesco.com/journal/shopify-app-submission-checklist/
- Kahunam, Shopify's new protected customer data rules — https://kahunam.com/articles/shopify/shopifys-new-protected-customer-data-rules-what-app-developers-need-to-change/

**WooCommerce (official)**
- REST API v3 documentation — https://woocommerce.github.io/woocommerce-rest-api-docs/v3.html
- Authentication endpoint (`/wc-auth/v1/authorize`) — https://github.com/woocommerce/woocommerce-rest-api-docs/blob/trunk/source/includes/v3/_authentication-endpoint.md
- Authentication — https://developer.woocommerce.com/docs/apis/rest-api/authentication/
- Order refunds — https://developer.woocommerce.com/docs/apis/rest-api/v3/order-refunds/
- Store API rate limiting — https://developer.woocommerce.com/docs/apis/store-api/rate-limiting/
- Store API now supports rate limiting — https://developer.woocommerce.com/2022/11/22/store-api-now-supports-rate-limiting/
- Submitting your product to the Woo Marketplace — https://woocommerce.com/document/submitting-your-product-to-the-woo-marketplace/
- WordPress.org detailed plugin guidelines — https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/

**WooCommerce (issues / community)**
- Issue #8898, `/wc-auth/v1/authorize` "A valid URL was not provided" — https://github.com/woocommerce/woocommerce/issues/8898
- Issue #31959, same error — https://github.com/woocommerce/woocommerce/issues/31959
- Issue #6995, large numbers of variations handling — https://github.com/woocommerce/woocommerce/issues/6995
- Issue #62634, product blocks load all variations — https://github.com/woocommerce/woocommerce/issues/62634
- Performance: 150+ variations takes 4–5 seconds — https://wordpress.org/support/topic/performance-issue-product-page-with-150-variations-takes-4-5-seconds-to-load/
- Stack Harbor, WooCommerce variations performance at scale — https://stackharbor.com/en/knowledge-base/wp-woocommerce-variations-performance/
- WooCommerce 10.5 analytics and admin performance — https://alternativeto.net/news/2026/2/woocommerce-10-5-boosts-analytics-scalability-and-admin-performance

**Odoo (official)**
- External API, Odoo 17.0 (contains the plan-restriction quote) — https://www.odoo.com/documentation/17.0/developer/reference/external_api.html
- External JSON-2 API, Odoo 19.0 — https://www.odoo.com/documentation/19.0/developer/reference/external_api.html
- External RPC API, Odoo 19.0 — https://www.odoo.com/documentation/19.0/developer/reference/external_rpc_api.html
- Acceptable Use Policy (1 call/second) — https://www.odoo.com/acceptable-use
- Studio webhooks — https://www.odoo.com/documentation/19.0/applications/studio/automated_actions/webhooks.html
- Automation rules — https://www.odoo.com/documentation/19.0/applications/studio/automated_actions.html
- Pricing — https://www.odoo.com/pricing
- Apps Store submission — https://apps.odoo.com/apps/upload

**Odoo (secondary)**
- Wavect, Odoo API integration limits 2026 — https://wavect.io/blog/odoo-erp-api-integration-limits-2026/
- Odin, Odoo API access requires the Custom plan — https://www.odin.ist/blog/odoo-external-api-cost.html
- Octura, Odoo Online vs Odoo.sh vs self-hosted 2026 — https://octurasolutions.com/resources/odoo-deployment-on-premise-vs-cloud-vs-odoo-sh
- Synco, Odoo hosting choice for Shopify integration — https://syncoconnector.com/blog/odoo-online-vs-odoo-sh-vs-self-hosted-for-shopify
- Ecosire, Shopify-Odoo connector comparison 2026 — https://ecosire.com/blog/shopify-odoo-connector-comparison-2026
- Octura, Odoo + Shopify integration guide 2026 — https://octurasolutions.com/resources/odoo-for-ecommerce-shopify-integration-guide
- Knit, Odoo API integration guide — https://getknit.dev/blog/odoo-api-integration-guide-in-depth/
- Medium, "Why should you not publish Apps on Odoo Apps Store?" — https://medium.com/@ludovicisidore/why-should-you-not-publish-apps-on-odoo-apps-store-30d7571a8dee

**Other platforms**
- Squarespace Commerce APIs overview — https://developers.squarespace.com/commerce-apis/overview
- Squarespace Orders API overview — https://developers.squarespace.com/commerce-apis/orders-overview
- Squarespace webhooks overview — https://developers.squarespace.com/webhooks/overview
- Squarespace API keys — https://support.squarespace.com/hc/en-us/articles/236297987-Squarespace-API-keys
- Wix API reference — https://dev.wix.com/docs/api-reference
- PrestaShop webservice developer docs — https://devdocs.prestashop-project.org/9/webservice/
- PrestaShop Admin API and OAuth2 — https://deepwiki.com/PrestaShop/PrestaShop/7.6-admin-api-and-oauth2
- PrestaShop billing webhooks — https://docs.cloud.prestashop.com/9-prestashop-integration-framework/5-prestashop-billing/6-references/1-webhook/
- Shopware Admin API — https://shopware.stoplight.io/docs/admin-api/8d53c59b2e6bc-shopware-admin-api
- Lightspeed eCom App Market partners — https://www.lightspeedhq.com/ecom/app-market-partners/
- Apideck, top 20 ecommerce APIs 2026 — https://www.apideck.com/blog/top-20-ecommerce-apis-to-integrate-with-2026

**Competitor products and failure modes**
- Zipchat, ecommerce customer service software compared 2026 — https://www.zipchat.ai/blog/customer-service-software-comparison
- Zipchat, best Gorgias alternative — https://www.zipchat.ai/alternatives/gorgias
- StoreAgent, best Gorgias alternatives for WooCommerce — https://storeagent.ai/best-gorgias-alternatives-woocommerce/
- Textyess, 8 best WhatsApp chatbots for ecommerce 2026 — https://www.textyess.com/blog/8-best-whatsapp-chatbots-for-ecommerce-complete-2026-comparison-guide
- Zipchat, best ManyChat alternatives — https://www.zipchat.ai/blog/best-manychat-alternatives
- Aerochat, 7 common AI chatbot issues hurting Shopify stores — https://aerochat.ai/blog/ai-chatbot-problems
- StoreFlowAI, AI chatbot giving wrong product information — https://storeflowai.net/ai-chatbot-giving-wrong-product-information-fix/
- Chatarmin, WhatsApp catalog setup limits and sync 2026 — https://chatarmin.com/en/blog/whatsapp-business-catalog
- Meta, about scheduled data feed uploads for catalogs — https://www.facebook.com/business/help/2284463181837648
- IMRG, "Your product catalogue is invisible to AI" — https://www.imrg.org/blog/your-product-catalogue-is-invisible-to-ai-heres-what-to-do-about-it/

---

## Appendix: the one-paragraph version

Support **Shopify** and **WooCommerce** — together they are 66–72% of shops in Ireland, the UK, the Netherlands, Sweden and Denmark — and make the third pillar a **genuinely good no-platform fallback** (spreadsheet or feed import with an explicit data-freshness policy), because "custom or undetectable" is 8–21% of shops and bigger than any third platform. **Drop Odoo from v1:** it is ~0.4% of the ecommerce market, its API is locked behind a plan upgrade that roughly doubles the merchant's bill, it permits one API call per second with no parallel calls, change notifications must be hand-configured inside each customer's database using a feature we are technically barred from installing on Odoo Online, and the current protocol is removed from Odoo Online around winter 2027. Build the WooCommerce `/wc-auth/v1/authorize` flow so WooCommerce onboarding stays two clicks rather than a seven-step key hunt — that single decision is what keeps a third of the market self-serve. Budget 4–8 weeks for Shopify's app review plus protected customer data approval, and first check whether sending Shopify checkout links lets us skip Level 2 approval entirely. Finally, never let the agent call a shop's platform mid-conversation: answer from our own synced copy, poll to reconcile because webhooks provably go missing and get silently deleted, and treat variants as first-class from day one — "do you have it in medium?" is the question the whole product lives or dies on.
