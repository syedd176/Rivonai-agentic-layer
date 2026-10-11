# Which Service Industries Should We Target First?

Market research for a multi-tenant AI quoting agent on WhatsApp, Instagram, Messenger and Telegram.
Target market: Europe, operating in English. Ireland, Netherlands, Nordics, possibly UK.

Research date: 26 September 2026
Evidence labels used throughout: **Confirmed** (official source, or three or more independent sources agreeing) / **Likely** (one reasonable source) / **Unclear** (could not establish).

---

## 1. Headline findings

- **Solar is the wrong place to start, and the evidence against it is strong.** The EU solar market shrank in 2025 for the first time since 2016, home solar fell from 28% of new installs in 2023 to 14% in 2025, and the official forecast says the decline continues through 2026 and 2027. In the Netherlands the number of solar installers fell 17% in one year through a wave of bankruptcies, with some firms losing 90% of their sales. Selling software to an industry that is going out of business is the hardest sale there is. **Confirmed.**

- **Solar is also the most crowded industry for quoting software of any on the list.** At least eight tools compete in Europe alone, including two Dutch ones. Solar Monkey starts at €85 a month plus €12 per project. Solargraf runs $2,799 to $12,999 a year. Every solar installer already has a quoting tool; nobody in pest control does. **Confirmed.**

- **Three industries can genuinely produce a real price without anyone visiting the property: pest control, cleaning (domestic and commercial), and removals.** All three price from a rate card using facts a customer can state in a chat: what pest, how many bedrooms, how many square metres, how many rooms of furniture and how far. These are the natural first markets. **Confirmed.**

- **Most of the team's current plan cannot produce a real quote at all.** Heat pumps legally cannot be quoted without a survey. Roofing cannot, because the damage is under the tiles where no camera can see it. General building and renovation cannot. For these industries the product can only book a visit or give a rough range, which is a much weaker thing to sell. **Confirmed.**

- **There is a real contradiction in the evidence about whether customers message or phone, and the team must take it seriously.** Industry sources claim 78 to 83% of home service bookings start with a phone call, rising to 85 to 90% for emergency trades like plumbing. Other sources claim WhatsApp is now the default channel for UK trade. Both cannot be fully true. The honest reading is that urgent work is phoned and planned work is increasingly messaged, which points the product away from emergency trades. **Unclear, and this is the biggest single risk.**

- **The Netherlands is the strongest first country and the Nordics are the weakest.** 98% of Dutch smartphone users are on WhatsApp, the highest in Europe. Ireland is around 90%. But Sweden is reported as a Signal-first market, and the product does not support Signal. Do not start in the Nordics. **Likely.**

- **Lead marketplaces are already moving into this product's territory, which is the most urgent competitive fact in this report.** Checkatrade has launched a job estimate calculator built on 1.5 million completed jobs, plus an AI photo-based home condition report. In the Netherlands, Zoofy already sells instant fixed-price bookings across more than 500 job types with no quotes to compare. These are not future competitors. They ship today. **Confirmed.**

- **Trades do buy software, but only self-serve, cheap and instantly useful.** Jobber starts around $19 to $39 a user, Tradify around $47, ServiceM8 around $77. The consistent reason trades abandon tools is setup effort: if the owner must spend three afternoons building a price list before seeing any value, the tool is already too expensive regardless of the monthly fee. This is a direct design warning, because this product needs a rate card loaded before it can do anything. **Likely.**

---

## 2. How each industry works today

This section is the heart of the report. For each industry: where enquiries come from, how a quote is produced, whether a site visit is unavoidable, who produces it, and what software exists.

### Solar installation

**Enquiries** come from web forms, lead marketplaces and door-to-door or outbound sales. Historically subsidy-driven, so enquiry volume tracks government policy rather than anything the installer does.

**Quoting** is genuinely remote and has been for years. Google's Solar API exists specifically to let installers qualify and design rooftop systems from overhead imagery without visiting. Remote assessment using satellite imagery and LIDAR produces roof geometry, shading losses, yield and a client proposal, typically in under an hour, and LIDAR measurements match hand measurements within about 3.5% for most sites. **Confirmed.** A physical visit is still needed for unknown roof conditions, dense obstructions, or sites outside LIDAR coverage; best practice is remote first, visit only for edge cases. **Likely.**

**So remote quoting works here.** The problem is that this is exactly why the industry is already saturated with tools, and why the team's edge would be nil.

**Software:** heavily served. PVSOL, EasySolar, Solargraf, Aurora, Solar Monkey, 2Solar, OpusFlow, plus SunNed and Bouwportaal. Solar Monkey from Delft is described as the fastest route from a Dutch address to a sendable quote. **Confirmed.**

**Market direction: contracting.** See section 5.

### Heat pumps

**This industry cannot be quoted remotely, and the barrier is legal, not technical.** Under the MCS Heat Pump Design Standard MIS 3005-D, a room-by-room heat loss calculation to BS EN 12831-1:2017 is mandatory before any certified heat pump install. The survey sets the heat pump capacity, the design flow temperature and the radiator sizing. It is also a requirement for certification, which in turn gates access to government grants. **Confirmed.**

You cannot compute a room-by-room heat loss calculation from a WhatsApp conversation. A homeowner does not know their wall construction, their window U-values or their floor build-up.

**What the product could do:** qualify the enquiry, capture property basics, and book the survey. Useful, but that is a booking tool, not a quoting tool, and it is worth far less money.

**Demand:** the Dutch ISDE subsidy has a €500 million budget for 2026 running the full year, and the 2026 update raised hybrid heat pump support to 30% of costs. So demand is supported, unlike solar. **Confirmed.** This is a good industry with a fatal product fit.

### HVAC / air conditioning

Similar to heat pumps but without the legal survey mandate. Pricing has many variables — number of indoor units, pipe runs, unit placement, electrical capacity, building layout — and most of them are things a customer cannot describe accurately. **Likely.** A rough range is achievable; a real quote generally is not.

**Enquiries:** emergency repair work is overwhelmingly phoned. Sources put emergency-driven trades like plumbing and HVAC at 85 to 90% of bookings originating from phone calls. **Likely, US-sourced.**

### Plumbing

**Two completely different businesses under one word, and they score oppositely.**

*Emergency and repair plumbing* — leaks, blockages, no hot water. The customer does not know what is wrong; that is why they are calling. Pricing is an hourly rate plus a call-out charge, and the real cost is only known once the plumber is there. Dutch rates: €55 to €100 per hour including VAT, with call-out charges of €20 to €40 per visit. **Confirmed.** Some fixed prices do exist for standard jobs — a blockage clearance at a fixed €109 is common in NL. **Likely.** But this work is phoned, urgent, and unquotable in advance. **Poor fit.**

*Planned plumbing* — bathroom installation, boiler replacement, radiator work. Quotable from a rate card, usually after a visit, but see the BOXT example below.

**The BOXT lesson is the single most useful thing in this report.** BOXT and Heatable sell boiler installations at a genuinely fixed price, quoted online in about 90 seconds from a short questionnaire, with no home visit, and next-day fitting. Heatable combi installs start from £2,195. **Confirmed.** They achieved this not by clever software but by narrowing the product: a defined set of boilers, defined install scenarios, and a price that holds. The lesson is that remote quoting becomes possible when the *offering* is standardised, not when the software is smarter. A plumber with a genuinely fixed price list can be automated. One who quotes bespoke cannot.

**Enquiry loss:** contractors are reported to miss 40 to 60% of incoming calls, with an industry-wide miss rate cited at 58%, and 73% of home service calls arrive outside 9-to-5. **Likely — widely repeated in marketing material but no primary study was traceable.** If even roughly true, this is the clearest statement of the problem the product solves.

### Electrical

Mostly small, varied jobs. Standard items — extra socket, fuse board replacement, EV charger — have repeatable prices. Fault-finding does not. Dutch rewiring runs €30 to €65 per hour. **Likely.** Moderate fit: rule-based for the standard catalogue, not for diagnosis.

### EV charger installation

**A genuine bright spot, and the team has not prioritised it.** Remote quoting from photos is becoming the norm, not the exception. For many straightforward home installations, a set of photographs and a short video gives an experienced installer enough to quote without a survey visit. Home Depot quotes from a questionnaire plus photos, at $899 to $1,999. Treehouse quotes from a photo of the electrical panel and a video of the charger location, within 48 hours. Lowe's and Qmerit give a preliminary estimate from a form and send someone in person only for complex jobs, noting that for most jobs this step is not necessary. **Confirmed.**

**What the installer needs to see:** the electrical supply, consumer unit, meter position, main fuse rating, earthing and bonding, proposed charger position, and the cable route. **Confirmed.** Every one of those is a photograph a customer can take. This is exactly what a conversational agent that asks for photos in a defined order is good at.

Weakness: enquiry volume per installer is probably modest, and job values are mid-range. Worth testing.

### Roofing

**Cannot be quoted properly without a visit, and the reason is instructive.** Satellite roof measurement is real — Roofr and Hover offer it, and Hover charges $29 per scan or $99 a month. Satellite gives you the roof's shape and area accurately.

But shape is not the price. A roofer put it plainly: when customers show screenshots from online calculators, the thing they are missing is the condition of what is under the tiles — the battens and the felt. You cannot see that from the ground, and no calculator can either. On an older roof the felt is often brittle and the battens past their best, and an honest quote has to include replacing them. **Confirmed.** Scaffolding is the other swing factor and needs a site assessment to price. **Likely.**

So: the measurement is remote, the price is not. Roofing is a **weak fit** despite appearances.

### Insulation and retrofit

Cavity wall insulation requires a cavity survey first, using a borescope camera pushed into the wall from outside, to establish whether the wall is even suitable. **Confirmed.** Grant-funded retrofit in Ireland runs through SEAI schemes and One Stop Shops, which assess the home — measuring attic joists, identifying wall types — then issue an itemised contract quote. **Confirmed.** Attic insulation priced per square metre is the closest thing to remotely quotable here, but the grant paperwork and eligibility checking dominate the workflow. **Weak to moderate fit**, and heavily intermediated by grant administrators rather than by the installer.

### Painting and decorating

**Better than the team probably assumes.** Dutch painting is priced per square metre on a public, stable basis: interior painting €30 to €35 per m² including paint, materials and VAT; wall and ceiling painting from €14 per m²; spray work €5 to €9 per m². Painter hourly rates sit around €35 to €40 interior and €40 to €50 exterior. Plasterers charge €40 to €55 per hour. **Confirmed.** Public online calculators exist for both plastering and painting where a customer enters dimensions and gets a price in one to two minutes. **Confirmed.**

The caveat is honest and comes from the vendors themselves: the final price depends on the condition of the surface, accessibility, number of coats, paint choice and any repair work. **Confirmed.** So a remote quote is a solid range with stated assumptions, not a firm number.

Painting and decorating is also less software-saturated than solar and quotes are more often scheduled than emergency — which fits the messaging channel better. **Moderate to strong fit.**

### Cleaning — domestic

**Strong fit, and almost certainly underrated by the team.** Instant online quoting is already normal practice, which proves the pricing is rule-based. Easy Clean in the Netherlands gives an instant quote from a booking form with confirmation in 30 seconds, at €33 to €45 per hour per cleaner. Dutch domestic cleaning generally runs €15 to €30 per hour, with €12 to €18 for private clients and €15 to €25 for business. **Confirmed.**

The price drivers are all things a customer can state in a chat: type of clean, number of rooms, frequency, whether supplies are needed. No site visit. High enquiry volume. Recurring revenue for the business, which makes a lost enquiry genuinely costly. Low job value is the weakness — a €40 clean does not obviously justify a subscription unless the volume is high.

**Crew availability is the real binding constraint in cleaning**, which means the team's feasibility check earns its keep here more than in most industries.

### Cleaning — commercial

Priced per square metre or square foot, then converted to a flat monthly contract. Standard offices sit at the low end of the rate band and specialised facilities like medical, restaurant and industrial at the high end. Recommended practice is to price per square foot for the bid and then lock a flat monthly rate. **Confirmed.**

But: most providers combine standard rates with an in-person walkthrough before finalising. **Likely.** Contract values are much higher than domestic and the sales cycle is longer, involving tenders. Enquiry volume is lower. **Moderate fit** — the agent qualifies and produces an indicative contract price, with a walkthrough to confirm.

### Pest control

**The single best technical fit found in this research.** Prices are genuinely fixed per treatment and published openly. Ireland: €80 to €250 for a domestic call-out, with most Dublin providers offering a fixed price confirmed before work begins; a common one-off treatment lands near €150 to €200. UK: £75 to £250, averaging around £150. **Confirmed.**

Crucially, the industry itself treats fixed pricing as the mark of competence. One guide states that if a company insists on hourly billing for a routine treatment, treat it as a yellow flag, because established pest controllers can estimate job times accurately enough to offer a fixed rate. **Confirmed.** That is an industry telling you its own pricing is rule-based.

The price depends on the pest type, infestation size, access difficulty, and whether follow-up visits are needed — all four are answerable in a conversation. Some firms do offer a free initial survey, but it is a sales tool rather than a pricing necessity. **Likely.**

Weaknesses: job values are modest, businesses are often small, and the software market is thin — which is opportunity but also means no proven willingness to pay.

### Locksmiths

Emergency, phone-driven, and often urgent enough that the customer is standing outside in the rain. Pricing is a flat service fee plus labour plus hardware. **Likely.** Nobody opens WhatsApp and waits for a quote when locked out. **Weak fit** on channel, despite simple pricing.

### Appliance repair

Interesting middle case. The industry has moved to flat-rate pricing for common repairs — a flat price for, say, a washer drain pump replacement, covering the service call, labour, parts, overhead, warranty risk and profit. **Confirmed.** Diagnostic or call-out fees are charged upfront and separately.

But this reveals the structural problem: the business model is *sell the diagnostic visit*, because until the technician opens the machine nobody knows which repair is needed. So the agent can sell the call-out and quote the standard repair menu, but cannot quote the actual job. Moderate fit. Software here is thin and cheap — QuoteIQ from about $29.99 a month, Housecall Pro around $79. **Likely.**

### General building and renovation

**The worst fit on the list.** A quote rests on a bill of quantities — an itemised measurement of materials, parts and labour — built from drawings and a site visit. For renovation specifically, the site visit is described as the step that separates an accurate estimate from an optimistic one. **Confirmed.** Quotes are produced by an estimator or the owner, take days, and change once walls are opened. Job values are high, which is tempting, but there is no rate card to compute from. **Avoid.**

### Moving and removals

**Strong and genuinely overlooked.** Dutch removals price from volume in cubic metres plus distance, and the industry has standardised on online self-service calculators: Sirelo estimates from your current address, destination and home type; multiple firms run m³ calculators that a customer completes in one to three minutes. Average Dutch move: €600 to €1,500 depending on volume and distance. **Confirmed.** Price factors are volume, distance, whether a moving lift is needed, and extras like packing and storage — all stated by the customer.

This is a real rate card, a real remote quote, a decent job value, and a crew-and-vehicle availability constraint that makes the feasibility check meaningful. The software market is thinner than field service generally. The weakness is that moving is a once-every-several-years purchase, so there is no repeat customer relationship, and demand is seasonal.

### Landscaping and gardening

Regular maintenance — mowing, hedge work — is priced per visit or per square metre and is remotely quotable. Design and construction work is not. **Likely.** Notably, landscaping is one of the few trades where Instagram and Facebook genuinely generate enquiries, driven by before-and-after photo posts, with Facebook at around 64% of social-sourced leads for local home services and Instagram at 22%. **Likely.** Practitioner advice includes responding to every DM within 60 minutes. **Likely.** That maps directly onto the product's channel strategy. Moderate fit, and the best fit for the Instagram channel specifically.

---

## 3. Industry fit scoring table

Factors: **Remote quote** (can a useful quote be produced without a visit) · **Rule-based price** · **Feasibility check matters** (stock, crew, area, job size) · **Volume** · **Customers message** · **Software gap** (is the space unserved — Strong means a gap to exploit) · **Job value**

| Industry | Remote quote | Rule-based price | Feasibility check | Volume | Customers message | Software gap | Job value |
|---|---|---|---|---|---|---|---|
| **Pest control** | **Strong** — fixed price per treatment, confirmed before work | **Strong** — pest type, size, access, follow-ups | Moderate — area and crew matter, stock rarely | Moderate — reactive, seasonal peaks | Moderate — not usually a 3am emergency | **Strong** — very thin software market | Weak — €80–250 |
| **Cleaning, domestic** | **Strong** — instant online quotes already normal | **Strong** — rooms, frequency, hours | **Strong** — crew availability is the binding constraint | **Strong** — high, recurring | **Strong** — planned, non-urgent, chat-friendly | Moderate — some booking tools exist | Weak per job, strong recurring |
| **Removals** | **Strong** — m³ + distance calculators are standard | **Strong** — volume, distance, lift, extras | **Strong** — crew and van availability, date | Moderate — seasonal, no repeat | Moderate–Strong — planned weeks ahead | Moderate–Strong | **Strong** — €600–1,500+ |
| **EV charger install** | **Strong** — photo-based quoting already mainstream | Moderate–Strong — standard install plus known extras | Moderate — stock of units, area coverage | Weak–Moderate per installer | Moderate — photos suit messaging well | Moderate | Moderate |
| **Painting / decorating** | Moderate–Strong — per-m² calculators exist; surface condition caveat | **Strong** — published per-m² rates | Moderate — crew and scheduling | Moderate | Moderate — planned work, 60–70% still phone | Moderate | Moderate |
| **Cleaning, commercial** | Moderate — per-m² bid, but walkthrough usually precedes signing | **Strong** — per m² then flat monthly | **Strong** — crew and contract capacity | Weak–Moderate | Weak–Moderate — B2B, email and tender | Moderate | **Strong** — recurring contracts |
| **Landscaping, maintenance** | Moderate — per visit or per m² for routine work only | Moderate | Moderate | Moderate | **Strong** for Instagram-sourced DM enquiries | Moderate | Weak–Moderate |
| **Solar install** | **Strong** — satellite/LIDAR remote design is standard | **Strong** — panels, inverter, yield | Moderate — panel stock, roof suitability | **Weak — market contracting** | Moderate | **Weak — most saturated on this list** | Strong |
| **Appliance repair** | Weak — must diagnose first; flat-rate menu after | Moderate — flat rates for known repairs | Moderate — parts in stock genuinely matters | **Strong** — high volume | Moderate | **Strong** — thin, cheap software | Weak |
| **Electrical** | Moderate for catalogue items, Weak for fault-finding | Moderate | Moderate | Moderate | Weak–Moderate — much is urgent | Moderate | Weak–Moderate |
| **Plumbing, planned** | Moderate — possible if the offer is standardised (see BOXT) | Moderate | Moderate | Moderate | Moderate | Weak — crowded FSM market | Moderate–Strong |
| **Plumbing, emergency** | **Weak** — customer does not know what is wrong | **Weak** — hourly plus call-out | Weak | **Strong** | **Weak — 85–90% phone** | Weak | Weak |
| **HVAC / air con** | Weak — too many unknown variables | Weak–Moderate | Moderate | Moderate | Weak — largely phoned | Weak–Moderate | Strong |
| **Roofing** | **Weak** — satellite gives shape, not the condition under the tiles | Weak | Moderate — scaffolding needs assessment | Moderate | Moderate | Moderate | Strong |
| **Insulation / retrofit** | **Weak** — cavity borescope survey required | Weak–Moderate | Moderate | Moderate | Weak — grant-administrator led | Moderate | Moderate–Strong |
| **Heat pumps** | **Weak — legally prohibited without survey (MIS 3005-D)** | Weak | Moderate | Moderate — subsidy supported | Weak | Weak–Moderate | **Strong** |
| **Locksmiths** | Moderate — simple price list | **Strong** — flat fee plus labour plus hardware | Weak | Moderate | **Weak — urgent, always phoned** | Moderate | Weak |
| **General building / renovation** | **Weak — bill of quantities from drawings and visit** | **Weak** | Weak | Weak–Moderate | Weak | Moderate | **Strong** |

---

## 4. Ranked recommendation

### Start with these

**1. Pest control.** The best pure technical fit. Pricing is fixed per treatment and the industry publicly treats fixed pricing as the professional standard. Everything that drives the price — pest type, infestation size, access, number of visits — can be established in a conversation. No site visit needed. Almost no competing software. The catch is job value (€80 to €250), so the subscription must be modest and the volume real. Prove the product works here, because if it does not work in pest control it will not work anywhere.

**2. Cleaning, domestic first then commercial.** Instant online quoting is already normal, which is the strongest possible proof the pricing is computable. Highest enquiry volume of any industry studied, genuinely non-urgent so customers will message rather than phone, and crew availability is the real constraint — meaning the team's feasibility check is load-bearing here rather than decorative. Low per-job value is offset by recurring contracts. Commercial cleaning then gives a higher-value upsell path once the domestic product works.

**3. Removals, as the high-value third.** Real rate card (m³ plus distance), online calculators already standard so customers expect a remote price, job values of €600 to €1,500 upwards, and crew-plus-van-plus-date availability that makes the feasibility check genuinely valuable. The weakness is no repeat business and seasonality — so treat it as the revenue-per-account play, not the volume play.

**Also worth a cheap test: EV charger installation.** Photo-based remote quoting is already mainstream at Home Depot, Treehouse and Qmerit, and the exact photos an installer needs — consumer unit, meter, main fuse, charger position, cable route — are precisely what a conversational agent can collect in order. Low cost to test, and a growing rather than shrinking market.

### Avoid for now

- **Heat pumps.** A mandatory room-by-room heat loss survey means there is no legal path to a remote quote. Good market, impossible product.
- **General building and renovation.** No rate card exists. Quotes come from a bill of quantities built on drawings and a site visit.
- **Roofing.** The price is set by the condition of the battens and felt beneath the tiles, which no image can reveal.
- **Emergency plumbing, HVAC repair, locksmiths.** Customers phone, they phone urgently, and they cannot describe the fault. Wrong channel and unquotable.
- **Solar.** Attractive on paper, fatal in practice: shrinking market, installer bankruptcies, and the most crowded software field on the list. See below.

### Attractive but actually a poor fit — the trap list

**Heat pumps, roofing, HVAC and general building all look ideal and are not.** They share high job values, obvious pain, and plenty of enquiries. That combination is seductive. But in every one of them the price is determined by something nobody can see without being there — the heat loss, the battens, the pipe runs, what is behind the wall. High job value is precisely *why* they cannot be quoted remotely: the money is in the uncertainty, and the uncertainty is physical.

---

## 5. The solar verdict

**Switch. Do not start with solar.** Four independent reasons, all documented.

**The market is contracting, from the industry's own body.** SolarPower Europe reported on 11 December 2025 that the EU installed 65.1 GW in 2025, a 0.7% decline on 2024 — the first year-on-year annual decline since 2016. Home solar fell from 28% of newly installed EU capacity in 2023 to 14% in 2025. The forecast is that the slowdown continues through both 2026 and 2027, with growth returning only in 2028 and 2029 and the EU not returning to 2025 levels until 2030. **Confirmed, primary source.** Germany's small-system segment under 30 kW fell about 25% in 2025. **Likely.**

**The subsidy shock is specifically in the team's best target country.** The Dutch net metering scheme, the salderingsregeling, ends on 1 January 2027 — the law has passed. After that, households can no longer offset exported electricity against consumption. **Confirmed, official Dutch government source.** That scheme has underpinned household solar payback since the 1990s, and 2.6 million Dutch homes already have panels, so the easy market is largely taken. **Likely.**

**Installers are already failing, which destroys the customer base.** Between 2024 and 2025 the number of Dutch solar installers fell 17%, driven by a wave of bankruptcies after a sudden market dip. Named failures include the Helios group (Solar Europa, VDH Solar, Navetto, Sunshine Deals), Koolen Industries Solar, Soly Energy and Dutch Solar Projects. Koolen Industries Solar's revenue fell 90% in a matter of months. The cited cause is the reduction and abolition of the net metering scheme. **Confirmed.** A prospect list that is shrinking 17% a year is not a market to launch into.

**Yes, solar can be quoted remotely — and that is exactly the problem.** Google's Solar API exists to eliminate on-site visits. Remote assessment from satellite imagery and LIDAR delivers geometry, shading, yield and a proposal in under an hour, with LIDAR matching hand measurement within about 3.5%. **Confirmed.** Remote quoting in solar is not an unmet need; it is solved, productised and sold. The competitors are real and priced: Solar Monkey from €85 a month plus €12 per project, with a published package at €525 a month for 50 projects and API access at €95 more; Solargraf at $2,799 to $12,999 a year; plus PVSOL, EasySolar, Aurora, 2Solar and OpusFlow. **Confirmed.**

**Is solar better served than plumbing or appliance repair? Yes, decisively.** Solar has at least eight dedicated quoting tools in Europe, two of them Dutch. Appliance repair has generic field service tools at $29 to $79 a month and no dedicated quoting product. Pest control has essentially nothing. **Confirmed.**

**One qualification in solar's favour, for later.** Dutch installers are pivoting to battery storage to keep project economics working after net metering ends, and battery retrofit quoting is a newer, less-served problem. If the team ever returns to the energy sector, batteries are the live question, not panels. **Likely.**

---

## 6. Site visits — the fundamental constraint

The team must confront this directly, because it determines what the product actually is.

**Cannot quote remotely, full stop:**

| Industry | Why | Evidence |
|---|---|---|
| Heat pumps | Room-by-room heat loss survey to BS EN 12831-1:2017 is mandatory under MCS MIS 3005-D before any certified install; it sets capacity, flow temperature and emitter sizing, and gates grant access | Confirmed |
| Roofing | Satellite gives roof shape, but the price is set by batten and felt condition under the tiles, invisible from the ground and to any calculator; scaffolding also needs assessment | Confirmed |
| General building / renovation | Quote rests on a bill of quantities measured from drawings; for renovation the site visit is what separates accurate from optimistic | Confirmed |
| Cavity wall insulation | A borescope camera survey through the wall is needed just to establish whether the wall is suitable at all | Confirmed |
| Emergency plumbing, appliance repair | The customer does not know what is broken. The diagnostic visit *is* the product | Confirmed |

**Can quote remotely:** pest control, domestic cleaning, removals, solar, EV chargers (from photos), painting (as a range), landscaping maintenance, standard electrical catalogue items, locksmith price list.

**What the product can honestly offer the visit-required industries — and why it is worth less.** Three things: qualify and structure the enquiry so the owner is not retyping it; give a credible price *range* with stated assumptions; and book the survey into a free slot. That is real value — the missed-call evidence suggests trades lose a great deal at exactly this stage. But it is a lead-qualification and booking tool, and it should be priced and pitched as one. Calling it quoting in these industries will produce churn, because the owner will discover within a month that they still have to visit every job.

**The BOXT insight, restated because it is the strategic core.** Boilers were considered unquotable remotely until BOXT and Heatable narrowed what they sold: a defined set of boilers, defined install scenarios, a fixed price, quoted in 90 seconds from a questionnaire, fitted next day. **Confirmed.** Remote quoting was unlocked by standardising the *offer*, not by better software.

This gives the team a real strategic choice. Either sell to businesses that already have a fixed price list — which is what makes pest control, cleaning and removals the right answer — or sell a tool that helps a business *standardise its offer* so it becomes quotable. The second is a much bigger and more defensible product, and much harder, because it requires changing how the business operates rather than automating what it already does.

---

## 7. How these businesses buy software

**They buy self-serve, and the price points are established. Confirmed.** Jobber from around $19 to $39 per user per month up to $149; Tradify around $47 to $61 per user; ServiceM8 around $77 with all modules; Housecall Pro around $59 to $329; QuoteIQ from $29.99. Free trials of about 14 days are standard, including in solar — Solar Monkey offers one. **Confirmed.** Enterprise tools like ServiceTitan are quote-only and sales-led at roughly $245 to $500 per technician, but that is a different customer.

**Implication for pricing:** the realistic band is roughly €30 to €120 a month for a small trade business. A product priced above that needs a salesperson, which the team has said it does not want. For pest control at €150 a job, €50 a month must be justified by winning one extra job a month — that is a clean, provable pitch. Worth noting: in Ireland, OnlineTradesmen charges from €43.33 a month for leads, so trades there already pay roughly that for lead flow. That is the anchor price in the owner's head.

**Who decides: the owner, alone.** Small trade businesses have no IT function — SMBs with 50 to 99 staff average 2.4 full-time IT people, and trade businesses of one to twenty are far below that. 56% of SMBs name lack of internal expertise as their main barrier to adopting new technology. **Likely.** So the buyer is the owner, on their phone, between jobs. The team's design of owner-approves-from-phone is correctly aimed.

**Why they abandon tools — and this is a direct warning about this product.** The most important finding: a small firm feels setup time more sharply than a large one, and if the owner spends three afternoons building forms and price books, that is selling time gone, making the software already too expensive before the monthly fee hits the card. **Likely.** Other consistent reasons: too many steps added rather than removed; too much training needed; too expensive for features not wanted; inflexible for businesses running more than one type of work. **Likely.** Up to 75% of SaaS users drop off in the first week when onboarding is unclear. **Likely.**

**This is the product's central design risk.** The agent cannot compute a price without the business's rate card loaded. Loading a rate card is exactly the "three afternoons building price books" that the evidence says kills adoption in trades. **The team must solve rate-card onboarding in under fifteen minutes** — pre-built industry templates the owner edits, or importing from an existing price list or a few past quotes. If onboarding takes an afternoon, the churn evidence says the product fails regardless of how good the agent is. This is a stronger argument for pest control and cleaning, where a rate card is short and simple, over HVAC or building where it would be enormous.

**Are trades hard to sell software to? The honest answer: it is a real risk, but not the one the team fears.** Trades clearly do buy software — Jobber, Tradify, ServiceM8, Simpro and Housecall Pro are all substantial businesses selling to exactly this customer at self-serve prices. So the market is not closed. But two things are genuinely hard. First, trades abandon quickly when setup or complexity bites, so acquisition is not the problem, retention is. Second, and more encouragingly, a private equity buyer paying NOK 550 million for the Nordic trades marketplaces in December 2025 described the home improvement market as "large and under-digitalised." **Confirmed.** Sophisticated money thinks there is room. **Verdict: the assumption that trades cannot be sold software is wrong. The assumption that they will tolerate a slow setup is the dangerous one.**

**Conversion expectations:** SMB SaaS at $1,000 to $10,000 annual contract value converts trials to paid at roughly 18 to 30%, and this is the band where product-led self-serve growth genuinely works. Freemium converts at only 2 to 5%. **Likely.** So: free trial, not freemium.

---

## 8. Lead marketplaces — competitor, channel or partner

### The main platforms per country

| Country | Platforms | Cost to the trade |
|---|---|---|
| Netherlands | **Werkspot** (dominant), Zoofy, Klussendirect (free alternative), Homedeal, Solvari | Werkspot €10–€40 per lead; small jobs like a leaking tap €4–€15, bathroom renovation €15–€40; also cited as €15–€45 **charged even if the customer never replies** |
| Ireland | **OnlineTradesmen.ie** (since 2006), **Tradesmen.ie**, Bark, MyBuilder, Airtasker | OnlineTradesmen from €43.33/month, no job commission; Tradesmen.ie credits ~€5 each, leads €10–€125+, top four bidders within 15 minutes get the contact; Bark credits €1.50, leads €7.50–€42+; MyBuilder shortlist fees €2–€10+. Irish cost per lead overall roughly €30–€75 — roofers €30–70, plumbers €35–75, electricians €30–70 |
| UK / NI | **Checkatrade**, **MyBuilder**, **Rated People**, Bark | Checkatrade advertised at £0 free / £30 Approved / £59+ Growth, but real bills reported at £80–£500 a month, with a typical plumber or electrician paying around £400 all-in; £16–£37.50 per lead before quoting, each shared with 10 to 20+ other members |
| Nordics | **Mittanbud** (NO), **Servicefinder** (SE), **3byggetilbud.dk** (DK), **Remppatori** (FI) — one portfolio, sold by Vend Marketplaces to Verdane in Dec 2025 for NOK 550m | Specific per-lead pricing not established |

All **Confirmed** except the Nordic pricing, which is **Unclear**.

### Do they already qualify or quote? Yes, and increasingly so.

This is the most important competitive finding in the report. **Checkatrade has launched a Job Estimate Calculator using real data from over 1.5 million completed jobs to instantly generate price estimates**, plus a **Home Health Report** where consumers upload photos of their home exterior for an AI assessment and tailored trade recommendations. It also gives members a quoting and invoicing tool, explicitly justified by the 2.5 hours a week trades spend on quoting and invoicing. **Confirmed.**

In the Netherlands, **Zoofy is further ahead and is the closest thing to a direct competitor found anywhere in this research.** Started in Amsterdam in 2015, now nationwide, covering more than 500 job types. Its pitch: book online for a fixed price, prices including VAT shown upfront before booking, no call-out charges, often an appointment within four hours, and — in its own words — **"no quotes to compare."** Pricing is per job at a fixed rate, an hourly rate, or per square metre depending on the job. **Confirmed.**

Zoofy has already done what this product proposes: converted trade work into computable, instantly quotable, rule-based prices across hundreds of job types in the team's best target country. The difference is the business model — Zoofy owns the customer and takes the payment, whereas this product would serve the trade's own customers on the trade's own channels. That difference is the team's entire defensible position and they should be clear-eyed about it.

### The verdict: competitor first, channel never, partner unlikely

**Competitor — yes, and sooner than the team expects.** Both Checkatrade and Zoofy are building exactly this capability. They have two advantages the team cannot match: aggregate pricing data across millions of jobs, and an existing paying relationship with the trade. A single trade's rate card cannot compete with 1.5 million completed jobs as a pricing basis.

**Channel — no, and do not plan on it.** Marketplaces monetise by owning the customer relationship and selling the lead repeatedly. A tool that lets a trade convert enquiries directly on their own WhatsApp reduces their dependence on the marketplace. No marketplace will distribute that. **Likely.**

**Partner — improbable but not impossible.** The only plausible shape is supplying quoting technology to a marketplace as a white-label service. That is a consulting and enterprise sale, which the team has explicitly ruled out, and it makes them a supplier to a competitor.

### What this product adds when a trade already pays for leads — and it is a strong argument

The marketplace economics are the sales pitch, and they are better than they first appear.

A trade pays £16 to £37.50 per Checkatrade lead, or €10 to €40 on Werkspot, **and pays even when the customer never replies**. Each lead is shared with 10 to 20+ competing members. One electrician was quoted £150 a month for an estimated four leads, each of which would also go to three other contractors. **Confirmed.** In Ireland, Tradesmen.ie gives contact details to the top four bidders within 15 minutes of the job being posted. **Confirmed.**

So the trade has already paid for the lead, and the lead is a race. Whoever responds first with a credible price wins. Meanwhile contractors reportedly miss 40 to 60% of calls, and 73% of enquiries arrive outside 9-to-5. **Likely.**

**The pitch writes itself: you have already paid for this lead and you are racing three other trades for it. The agent answers in seconds, at midnight, with a real price, while your competitors are still asleep.** That framing sidesteps the marketplaces rather than fighting them, and it attaches the product to money the trade is already spending — which is far easier than arguing for new budget.

---

## 9. What could not be established, and how to close each gap

**1. Whether European trade customers will actually message instead of phoning. This is the largest gap and the biggest risk in the whole plan.** The phone-dominance figures (78 to 83% prefer to call; 85 to 90% for emergency trades; 40 to 60% of calls missed) trace back to marketing content citing ServiceTitan reports, PHCC surveys and vendors' own internal data, with no directly verifiable primary study, and they are US-based. The counter-claim that WhatsApp is the default UK trade channel comes from vendor blogs with an obvious interest. Both sides are marketing material. **Unclear.**
*How to close it:* do not resolve this by more searching, because the published evidence is contaminated. Instead, phone 25 to 40 target businesses in Dublin and Amsterdam across pest control, cleaning and removals and ask one question: of your last twenty enquiries, how many arrived by phone, WhatsApp, Instagram DM, web form or email? Two days of work, and it decides whether the product is viable at all.

**2. Real enquiry volumes per business.** No reliable figures were found for how many enquiries a typical European pest control firm, cleaning company or removals business receives monthly. Volume determines whether automation is worth paying for. **Unclear.**
*How to close it:* same calls as above — ask for enquiries per week and how many go unanswered.

**3. Nordic messaging reality.** One source reports Signal as the most popular messaging app in both Sweden and the Netherlands, which sits oddly against the strong evidence for 98% Dutch WhatsApp penetration, so at least one of those readings is wrong or measuring something different (downloads versus usage, most likely). **Unclear.**
*How to close it:* deprioritise the Nordics for now; the decision does not need to be made yet. If revisited, check Sinch and Infobip country data directly, which are published by messaging providers with real traffic.

**4. Nordic lead marketplace pricing.** Mittanbud, Servicefinder, 3byggetilbud and Remppatori are confirmed as the dominant portfolio, but per-lead costs were not found. **Unclear.**
*How to close it:* the Verdane acquisition materials and Vend Marketplaces' investor reporting will contain take rates, since it was a listed company.

**5. Whether pest control and removals firms will pay for software at all.** The thin software market in these industries is read in this report as opportunity, but it could equally mean nobody has ever successfully sold them software. **Unclear, and it is the counter-argument to the main recommendation.**
*How to close it:* ask in the same calls what software they currently pay for and what it costs. If the answer is consistently "nothing," treat that as a warning rather than a green field.

**6. How long it actually takes between enquiry and quote in Europe.** Only fragments were found — 2.5 hours a week on quoting and invoicing per Checkatrade, 1 to 3 days for a written roofing estimate after a visit. No solid European figures per industry. **Unclear.**

**7. Churn rates for trade-focused SaaS.** Reasons for abandonment are well documented; actual churn percentages are not published by Jobber, Tradify or ServiceM8. **Unclear.**

---

## 10. Sources

All accessed 26 September 2026.

**Solar market and subsidies**
- SolarPower Europe, EU market contraction press release (report dated 11 Dec 2025) — https://www.solarpowereurope.org/press-releases/new-report-eu-hits-2025-solar-target-but-market-contraction-puts-2030-goal-at-risk
- SolarPower Europe, Global Solar Market Outlook 2026–2030 — https://www.solarpowereurope.org/insights/outlooks/global-solar-market-outlook-2026-2030/detail
- Business.gov.nl, Netting scheme solar panels ends per 2027 (official) — https://business.gov.nl/amendments/netting-scheme-solar-panels-ends/
- gridX, Salderingsregeling explained — https://www.gridx.ai/knowledge/what-is-net-metering-in-the-netherlands-salderingsregeling
- Zonnepanelen Servicepunt, installer bankruptcy overview — https://www.zonnepanelenservicepunt.nl/zonnepanelen-installateur-failliet/
- Installatie.nl, VDH solar bankruptcy — https://www.installatie.nl/nieuws/zonnepaneelbedrijf-vdh-failliet/
- SGZE, decline in Dutch solar panel demand — https://www.sgze.nl/artikelen/de-vraag-naar-zonnepanelen-is-sterk-afgenomen-sinds-de-zomer/
- SurgePV, European solar market country analysis — https://www.surgepv.com/blog/european-solar-market-growth-country-analysis
- NL Times, Dutch net metering end — https://nltimes.nl/2026/04/09/dutch-net-metering-end-solarvault-3-energy-solutions-land-netherlands

**Solar and roofing remote quoting**
- Google Maps Platform, Solar API — https://mapsplatform.google.com/maps-products/solar/
- SurgePV, Remote solar site assessment workflow — https://www.surgepv.com/blog/remote-solar-site-assessment
- SurgePV, Remote site survey definition — https://www.surgepv.com/glossary/remote-site-survey
- Roofr, Satellite roof measurements — https://roofr.com/blog/satellite-roof-measurements-for-roofing-businesses
- Jan Roofer, Pitched roof calculator — the honest truth — https://jan-roofer.com/roofing-services-cost/pitched-roof-calculator-how-i-get-you-from-guesswork-to-a-solid-fixed-price/
- MyBuilder, Do roofers need scaffold to quote — https://www.mybuilder.com/questions/v/82412/do-roofers-need-a-scaffold-to-provide-a-quote

**Solar software and pricing**
- Solar Monkey — https://solarmonkey.io/
- Heaven Green Energy, Best solar software Netherlands 2026 — https://www.heavengreenenergy.com/blog/best-solar-software-netherlands
- OpusFlow, Top Dutch solar software solutions 2026 — https://opusflow.io/blog/solar/dutch-solar-software-solutions/
- SpotSaas, Solargraf pricing — https://www.spotsaas.com/product/solargraf/pricing

**Heat pumps and insulation**
- Reonic, Heat loss survey installer guide (MIS 3005-D) — https://reonic.com/en-gb/blog/heat-loss-survey/
- Energy Saving Trust, Heat loss calculations guidance — https://greenheattoolkit.energysavingtrust.org.uk/t/heat-pump-installers-toolkit/heat-pump-system-design/heat-loss-calculations-detailed-guidance/
- Business.gov.nl, ISDE subsidy (official) — https://business.gov.nl/subsidies-and-schemes/sustainable-energy-investment-subsidy-isde/
- Warmtepompkiezen, ISDE heat pump subsidy guide 2026 — https://warmtepompkiezen.nl/en/gids/heat-pump-subsidy
- SEAI, Wall insulation grants (official) — https://www.seai.ie/grants/home-energy-grants/individual-grants/wall-insulation
- Electric Ireland Superhomes, insulation and One Stop Shop — https://electricirelandsuperhomes.ie/our-services/insulation/

**Plumbing, electrical, boilers, EV**
- Werkspot, Kosten van een loodgieter 2026 — https://www.werkspot.nl/loodgieterswerk/prijzen-kosten/kosten-loodgieter
- Zoofy, Costs of a plumber — https://zoofy.nl/en/price-guides/costs-of-a-plumber/
- Klussendirect, Wat kost een loodgieter 2026 — https://klussendirect.nl/kosten-loodgieter/
- BOXT, fixed-price boiler installation — https://www.boxt.co.uk/boilers
- Heatable, new boiler quote online — https://heatable.co.uk/new-boilers/quote
- Faithful Spark Electricians, Can an EV charger survey be done remotely — https://faithfulsparkelectricians.co.uk/remote-ev-charger-survey/
- Treehouse, home charging — https://treehouse.pro/services/home-charging
- Home Depot, EV charger installation — https://www.homedepot.com/services/c/ev-charger-installation/602dbf444

**Cleaning, pest control, painting, removals, landscaping**
- Easy Clean NL — https://easyclean.nl/en/
- Schoonmaaktotaal, cleaning costs per hour — https://schoonmaaktotaal.nl/en/Private/cleaning-costs-per-hour-private/
- Housecall Pro, commercial cleaning price guide 2026 — https://www.housecallpro.com/resources/how-to-price-commercial-cleaning-jobs/
- Central Pest Control, Pest control cost Ireland 2026 — https://centralpestcontrol.ie/pest-control-cost-ireland/
- MyJobQuote, Pest control prices list 2026 — https://www.myjobquote.co.uk/costs/pest-control
- PestPro Index, UK pest control costs 2026 — https://pestproindex.com/guides/pest-control-costs
- Homedeal, schilderwerken prijs per m2 2026 — https://www.homedeal.be/nl/schilder/schilder-prijzen/
- Meester Stukadoors, stucwerk offerte calculator — https://meesterstukadoors.nl/stucwerk-offerte-calculator/
- Kosten Stukadoor 2026 — https://www.kosten-stukadoor.nl/
- Sirelo, verhuiskosten berekenen — https://sirelo.nl/verhuizen/verhuisbedrijf-kosten/verhuiskosten-berekenen/
- Verhuisbedrijf ACN, m3 calculator — https://verhuisbedrijfacn.nl/m3-calculator/
- National Association of Landscape Professionals, social media strategies — https://blog.landscapeprofessionals.org/social-media-strategies-for-landscape-businesses-turning-followers-into-clients/

**Appliance repair and general building**
- Service.Works, Appliance repair flat rate pricing guide 2026 — https://blog.service.works/service-business/appliance-repair/flat-rate-pricing-model-for-appliance-repair/
- Homebuilding, What is a bill of quantities — https://www.homebuilding.co.uk/self-build/what-is-a-bill-of-quantities
- Buildxact, Bill of quantities for residential builders — https://www.buildxact.com/us/blog/bill-of-quantities/
- Skilled Trades College of Canada, How to quote construction jobs — https://www.skilledtradescollege.ca/blog/quoting-for-new-tradespeople
- WorkBuddy, Guide to quoting and estimating for tradesmen — https://workbuddy.com/blog/guide-to-quoting-and-estimating/
- Electrician Talk forum, Quoting without seeing — https://www.electriciantalk.com/threads/quoting-without-seeing.179386/

**Lead marketplaces**
- Adaptoo, Werkspot kosten rekensom — https://adaptoo.nl/blog/werkspot-kosten
- Klussendirect, Alternatief voor Werkspot 2026 — https://klussendirect.nl/alternatief-werkspot-vakman/
- LocalAdder, UK trade lead cost tracker — https://localadder.co.uk/uk-trade-lead-cost-tracker/
- LocalAdder, Checkatrade cost 2026 — https://localadder.co.uk/blog/checkatrade-cost/
- NobleLeads, Checkatrade cost 2026 — https://nobleleads.uk/blog/how-much-does-checkatrade-cost
- Constructors.ie, MyBuilder fees explained 2026 — https://constructors.ie/blog/how-much-does-mybuilder-charge
- ShamFix, How to get more leads as a tradesman in Ireland 2026 — https://www.shamfix.ie/blog/how-to-get-more-leads-as-a-tradesman-in-ireland-2026
- OnlineTradesmen.ie, job leads for trades — https://www.onlinetradesmen.ie/Tradesmen/JobLeadsForTradePros.aspx
- Up The Walls, Best lead generation platforms for tradespeople in Ireland — https://upthewalls.ie/best-lead-generation-platforms-tradespeople-ireland/
- Verdane, agreement to buy Mittanbud portfolio from Vend — https://verdane.com/verdane-signs-agreement-to-buy-the-mittanbud-skilled-trades-marketplace-portfolio-from-vend/
- Vend Marketplaces ASA (Euronext disclosure) — https://live.euronext.com/en/products/equities/company-news/2025-12-10-vend-marketplaces-asa-vend-signs-agreement-sell-its

**Marketplaces moving into quoting / direct competitors**
- Zoofy — https://zoofy.nl/en/ and FAQ — https://zoofy.nl/en/faq/
- Checkatrade, quoting and invoicing tool — https://www.checkatrade.com/blog/news/checkatrade-quoting-and-invoicing-tool/
- GGP Magazine, Checkatrade launches data-driven price estimation tool — https://www.ggpmag.com/it-software/checkatrade-launches-data-driven-price-estimation-tool
- Electrical Times, Checkatrade data-driven tools — https://www.electricaltimes.co.uk/checkatrade-unveils-data-driven-tools-to-help-consumers-understand-trade-price-estimates/
- Checkatrade, What's New Summer 2026 — https://join.checkatrade.com/whats-new-summer-2026/
- Service Business Academy, Best photo-to-quote software for contractors 2026 — https://servicebusinessacademy.org/best-photo-to-quote-software-contractors-2026/

**Software buying, pricing and adoption**
- SelectHub, Jobber vs Tradify 2026 — https://www.selecthub.com/field-service-software/jobber-vs-tradify/
- Contractor ToolStack, Tradify review 2026 pricing — https://contractortoolstack.com/software/tradify/
- Exequtech, Tradify vs ServiceM8 2026 — https://exequtech.com/blog/tradify-vs-servicem8-vs-exequtechos
- Tradesflow, Small trades businesses and the technology struggle — https://tradesflow.com/small-trades-businesses-and-the-technology-struggle/
- Business Matters, Why small service firms are moving away from heavyweight software — https://bmmagazine.co.uk/business/why-small-service-firms-are-moving-away-from-heavyweight-software/
- SignalFire, Vertical AI in trades and construction — https://www.signalfire.com/blog/vertical-ai-in-trades-and-construction
- ADV.me, SaaS free trial conversion benchmarks 2026 — https://adv.me/articles/conversion-optimization/saas-free-trial-conversion-rate-benchmarks-2025/
- GrowLeads, B2B SaaS trials vs demo conversion — https://growleads.io/blog/b2b-saas-trials-vs-demo-sales-conversion/

**Messaging channels and enquiry behaviour**
- Searchlab, WhatsApp Business statistics 2026 — https://searchlab.nl/en/statistics/whatsapp-business-statistics-2026
- LINK Mobility, WhatsApp use in Europe — https://www.linkmobility.com/blog/whatsapp-use-in-europe-and-adoption-across-countries
- Infobip, Most popular messaging apps by country — https://www.infobip.com/blog/most-popular-messaging-apps-by-country
- Sinch, Most popular messaging apps by country — https://sinch.com/blog/most-popular-messaging-apps-by-country/
- CallJolt, Home service phone statistics 2026 — https://calljolt.com/blog/hvac/home-service-industry-phone-statistics
- AgentZap, Home services phone statistics 2026 — https://agentzap.ai/blog/home-services-phone-statistics
- Hicira, Missed call statistics 2026 — https://www.hicira.com/missed-call-statistics
- Roofing Contractor, The homeowner's roofing journey in 2026 — https://digital.roofingcontractor.com/articles/the-homeowners-roofing-journey-in-2026
- Manano, How to send quotes and invoices on WhatsApp for tradespeople — https://www.manano.ai/blog/how-to-send-quotes-invoices-whatsapp-complete-guide-tradespeople
- TechCrunch, Meta's AI agent for WhatsApp Business now global — https://techcrunch.com/2026/06/03/metas-ai-agent-for-whatsapp-business-is-now-available-globally/

**Ireland market context**
- Irish Times, Wanted: 70,000 builders — https://www.irishtimes.com/special-reports/2026/03/26/wanted-70000-builders-but-can-we-remedy-this-construction-skills-crisis/
- The Journal, Builders tell minister skills shortage delaying projects — https://www.thejournal.ie/construction-roundtable-7052551-May2026/
- Necto Selection, Ireland's construction skills shortage 2026 — https://nectoselection.com/blog/irelands-construction-skills-shortage-what-2026-looks-like
