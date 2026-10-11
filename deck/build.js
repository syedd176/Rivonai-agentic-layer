const pptxgen = require("pptxgenjs");
const p = new pptxgen();

p.layout = "LAYOUT_WIDE";           // 13.3 x 7.5
p.author = "Rivon";
p.title  = "Unified AI Customer Agent - System Design & Market Findings";

// ---- Palette: Ocean Gradient (deep blue dominant) ----
const NAVY  = "21295C";  // midnight - dark slides
const DEEP  = "065A82";  // deep blue - primary
const TEAL  = "1C7293";  // teal - secondary
const ACC   = "F2A104";  // amber accent
const OK    = "2E8B57";  // green - keep/confirmed
const BAD   = "B23A48";  // red - drop/risk
const WHITE = "FFFFFF";
const LIGHT = "F4F7FA";
const GREY  = "5A6B7B";
const DARKT = "1A2733";

const HEAD = "Cambria";
const BODY = "Calibri";

const W = 13.3, H = 7.5;

// ---------- helpers ----------
function darkSlide() {
  const s = p.addSlide();
  s.background = { color: NAVY };
  return s;
}
function lightSlide(title, kicker) {
  const s = p.addSlide();
  s.background = { color: WHITE };
  if (kicker) {
    s.addText(kicker.toUpperCase(), {
      x: 0.6, y: 0.34, w: 12.1, h: 0.26, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11, bold: true, color: TEAL, charSpacing: 2
    });
  }
  s.addText(title, {
    x: 0.6, y: kicker ? 0.62 : 0.5, w: 12.1, h: 0.72, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 32, bold: true, color: NAVY
  });
  return s;
}
// rounded card
function card(s, x, y, w, h, fill, opts) {
  opts = opts || {};
  s.addShape(p.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: fill },
    line: opts.line ? { color: opts.line, width: 1 } : { type: "none" },
    shadow: opts.shadow === false ? undefined
      : { type: "outer", blur: 8, offset: 2, angle: 90, color: "9FB0C0", opacity: 0.3 }
  });
}
// numbered circle badge
function badge(s, x, y, d, n, fillC, txtC) {
  s.addShape(p.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fillC }, line: { type: "none" } });
  s.addText(String(n), {
    x, y, w: d, h: d, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 13, bold: true, color: txtC,
    align: "center", valign: "middle"
  });
}
function arrowR(s, x, y, w, color) {
  s.addShape(p.ShapeType.rightArrow, {
    x, y, w, h: 0.22, fill: { color }, line: { type: "none" }
  });
}

/* =========================================================
   1. TITLE
   ========================================================= */
{
  const s = darkSlide();
  s.addShape(p.ShapeType.ellipse, {
    x: 9.7, y: -1.5, w: 5.4, h: 5.4, fill: { color: DEEP }, line: { type: "none" }
  });
  s.addShape(p.ShapeType.ellipse, {
    x: 11.2, y: 4.6, w: 3.2, h: 3.2, fill: { color: TEAL }, line: { type: "none" }
  });
  s.addText("SYSTEM DESIGN REVIEW  ·  26 SEPT 2026", {
    x: 0.8, y: 1.5, w: 8.6, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: ACC, charSpacing: 2
  });
  s.addText("Unified AI Customer\nAgent Platform", {
    x: 0.8, y: 2.0, w: 8.8, h: 1.9, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, lineSpacing: 46
  });
  s.addText("Revised design after four independent market research threads", {
    x: 0.8, y: 4.0, w: 8.4, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 16, color: "BFD3E6", italic: true
  });
  // stat strip
  const stats = [["190", "searches"], ["340", "sources"], ["4", "threads"], ["14", "risks"]];
  stats.forEach((st, i) => {
    const x = 0.8 + i * 2.1;
    s.addText(st[0], { x, y: 4.85, w: 1.8, h: 0.6, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 34, bold: true, color: ACC });
    s.addText(st[1], { x, y: 5.45, w: 1.8, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11, color: "BFD3E6" });
  });
  s.addNotes(
`WHY THIS DECK EXISTS
The system design was built on assumptions that had not been tested. Four parallel research threads tested them. Three of the original assumptions turned out to be wrong, and one of my own stated justifications was wrong too.

This deck presents the revised design plus the evidence that changed it. Every design decision has a reason attached - that is what the notes on each slide carry.

THE HONEST FRAME: research that only confirms your plan is not worth commissioning. This research contradicted the plan in four places. That is the value.

HOW THIS SLIDE IS BUILT, AND WHY
Dark background. The deck uses dark slides only for the opening and the closing, so the middle feels like one continuous section and these two act as bookends.
The two big circles run off the right edge on purpose. They give the slide some depth without adding anything you have to read.
The four numbers along the bottom are there so the audience knows the scale of the work before any claim is made. It buys credibility for everything that follows.
The title is split over two lines so the words stay large. A single long line would have forced a smaller font.`);
}

/* =========================================================
   2. WHAT THE SYSTEM IS  (two-mode diagram)
   ========================================================= */
{
  const s = lightSlide("One platform, two tenant modes", "The product");

  // shared foundation band
  card(s, 0.6, 1.6, 12.1, 1.15, DEEP, { shadow: false });
  s.addText("SHARED FOUNDATION", {
    x: 0.85, y: 1.72, w: 3.2, h: 0.26, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 10, bold: true, color: ACC, charSpacing: 1.5
  });
  const shared = ["Channels", "Conversations", "Contacts", "Tickets", "Ratings", "Retention", "Analytics"];
  shared.forEach((t, i) => {
    const x = 0.85 + i * 1.69;
    s.addShape(p.ShapeType.roundRect, { x, y: 2.05, w: 1.55, h: 0.5, rectRadius: 0.06,
      fill: { color: TEAL }, line: { type: "none" } });
    s.addText(t, { x, y: 2.05, w: 1.55, h: 0.5, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10, bold: true, color: WHITE, align: "center", valign: "middle" });
  });

  // split arrows
  s.addShape(p.ShapeType.downArrow, { x: 3.2, y: 2.85, w: 0.28, h: 0.4, fill: { color: GREY }, line: { type: "none" } });
  s.addShape(p.ShapeType.downArrow, { x: 9.8, y: 2.85, w: 0.28, h: 0.4, fill: { color: GREY }, line: { type: "none" } });

  // SERVICE column
  card(s, 0.6, 3.35, 5.9, 3.5, LIGHT, { line: "C9D6E2", shadow: false });
  s.addText("SERVICE MODE", { x: 0.85, y: 3.5, w: 3, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, color: DEEP, charSpacing: 1.5 });
  s.addText("BUILD FIRST", { x: 4.7, y: 3.5, w: 1.6, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9, bold: true, color: WHITE, align: "center" });
  s.addShape(p.ShapeType.roundRect, { x: 4.72, y: 3.48, w: 1.55, h: 0.32, rectRadius: 0.1,
    fill: { color: OK }, line: { type: "none" } });
  s.addText("BUILD FIRST", { x: 4.72, y: 3.48, w: 1.55, h: 0.32, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle" });

  const svc = ["Qualify by conversation", "Score the lead",
    "FEASIBILITY: parts · crew · area", "Price deterministically",
    "OWNER APPROVES", "Job created"];
  svc.forEach((t, i) => {
    const y = 4.0 + i * 0.47;
    const hot = (i === 2 || i === 4);
    badge(s, 0.9, y, 0.3, i + 1, hot ? ACC : TEAL, hot ? DARKT : WHITE);
    s.addText(t, { x: 1.32, y: y - 0.02, w: 5.0, h: 0.34, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12, bold: hot, color: hot ? NAVY : DARKT, valign: "middle" });
  });

  // PRODUCT column
  card(s, 6.8, 3.35, 5.9, 3.5, LIGHT, { line: "C9D6E2", shadow: false });
  s.addText("PRODUCT MODE", { x: 7.05, y: 3.5, w: 3, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, color: DEEP, charSpacing: 1.5 });
  s.addShape(p.ShapeType.roundRect, { x: 10.9, y: 3.48, w: 1.55, h: 0.32, rectRadius: 0.1,
    fill: { color: GREY }, line: { type: "none" } });
  s.addText("PHASE 2", { x: 10.9, y: 3.48, w: 1.55, h: 0.32, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle" });

  const prd = ["Search real catalogue", "Check live stock", "Build cart",
    "Place order", "Delivery · cancel · refund", "Review request"];
  prd.forEach((t, i) => {
    const y = 4.0 + i * 0.47;
    badge(s, 7.1, y, 0.3, i + 1, TEAL, WHITE);
    s.addText(t, { x: 7.52, y: y - 0.02, w: 5.0, h: 0.34, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12, color: DARKT, valign: "middle" });
  });

  s.addNotes(
`DECISION: one platform, tenant picks a mode at signup - NOT two products.

WHY: the shared foundation (channels, conversations, contact record, tickets, ratings, retention) is identical in both modes. Building it twice would be the classic fork failure - two products and half the engineering time.

BUT THE RESEARCH PUSHED BACK, and it was right: the shared layer is the CHEAP part. The valuable parts - feasibility and quoting on one side, catalogue and orders on the other - share almost nothing. So my earlier "60% is shared" figure was too comfortable.

REVISED DECISION: sequence rather than abandon. Service mode is v1. Product mode stays fully designed - ports, adapters, all diagrams - but moves to phase 2.

FOUR INDEPENDENT REASONS for service-first:
1. Meta launched a free AI agent inside WhatsApp in June 2026 that covers product mode's common case
2. Product mode faces dozens of funded competitors
3. The feasibility differentiator is unoccupied by every product examined
4. A quote is worth hundreds or thousands to an installer; "where is my parcel" is worth a few euros to a shop. Better revenue, lower churn.

WHAT IS NOT SUPPORTED IN V1: a tenant being both modes at once. A solar firm selling panels online AND quoting installations is a real shape, but one conversation needing both paths is a routing problem we are not solving yet.

HOW THIS SLIDE IS BUILT, AND WHY
The shared foundation sits in one wide blue band across the top, and the two modes sit underneath it. The shape of the picture makes the argument on its own: one thing on top, two things below, both fed by it. Nobody has to be told the foundation is shared.
Two downward arrows from the band into the columns show the split visually rather than in words.
The two columns are identical in size and layout so they can be compared at a glance. Same number of steps, same positions, so the eye reads the difference in content, not in shape.
The green BUILD FIRST tag and the grey PHASE 2 tag do the sequencing argument in two words each. Colour carries the meaning, so the labels stay short.
Two steps in the left column are amber instead of teal and set in bold - the feasibility check and the owner approval. Those are the two differentiators, so they are the only things on the slide that break the pattern. If someone remembers one thing from this slide, it should be those two boxes.`);
}

/* =========================================================
   3. WHAT CHANGED  (4 reversals)
   ========================================================= */
{
  const s = lightSlide("Four things the research changed", "Findings");

  const rows = [
    ["Solar first", "Pest control, cleaning, removals",
     "EU market fell 0.7% in 2025 - first decline since 2016. Dutch installers down 17% in a year. Most software-saturated trade on the list."],
    ["Odoo as a connector", "Shopify + WooCommerce + no-platform fallback",
     "Odoo is 0.4% of the market, API is paywalled, 1 call/second, protocol expires winter 2027."],
    ["RAG reads the price list", "Extract, owner confirms, code computes",
     "Whole-document extraction accuracy 28-77%. 46.89% of table errors still look correct."],
    ["Pricing rule justified by AI Act", "Justified by contract law",
     "Annex III covers pricing only for life and health insurance. The real exposure is bigger, not smaller."]
  ];

  rows.forEach((r, i) => {
    const y = 1.62 + i * 1.35;
    card(s, 0.6, y, 12.1, 1.18, i % 2 ? LIGHT : WHITE, { line: "DCE5EE", shadow: false });

    // was
    s.addText("WAS", { x: 0.85, y: y + 0.13, w: 0.6, h: 0.22, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 8, bold: true, color: BAD, charSpacing: 1 });
    s.addText(r[0], { x: 0.85, y: y + 0.33, w: 3.0, h: 0.4, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 13, color: GREY, strike: true });

    arrowR(s, 4.05, y + 0.42, 0.5, ACC);

    // now
    s.addText("NOW", { x: 4.75, y: y + 0.13, w: 0.6, h: 0.22, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 8, bold: true, color: OK, charSpacing: 1 });
    s.addText(r[1], { x: 4.75, y: y + 0.31, w: 3.6, h: 0.46, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 13, bold: true, color: NAVY });

    // why
    s.addText(r[2], { x: 8.6, y: y + 0.2, w: 3.95, h: 0.8, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: DARKT, valign: "middle" });
  });

  s.addNotes(
`THE REASONING BEHIND EACH REVERSAL.

1. SOLAR. Four independent Confirmed reasons: SolarPower Europe (11 Dec 2025) reported the first annual EU decline since 2016, with home solar down from 28% of new capacity in 2023 to 14% in 2025 and decline forecast through 2026 AND 2027. Dutch net metering ends 1 Jan 2027. Dutch installer count fell 17% in one year with named bankruptcies. And eight-plus European solar quoting tools already exist. When four independent lines of evidence point the same way, act on it.

2. ODOO. The decisive framing: Odoo is not merely more onboarding steps - it contains a PURCHASE DECISION. The merchant must upgrade from Standard to Custom, roughly doubling their per-user bill forever, before they can connect at all. No engineering removes that.

3. RAG FOR PRICING. The number that settles it: 46.89% of table-reading errors still produce a correct-LOOKING answer. The failure is silent. You cannot catch it by reviewing outputs.

4. MY OWN ERROR. I justified the never-LLM-pricing rule via EU AI Act risk classification. Wrong - Annex III point 5(c) covers pricing only for life and health insurance. A correct rule resting on a bad argument gets relaxed the first time someone checks it. So the rule stays, the reasoning is replaced.

HOW THIS SLIDE IS BUILT, AND WHY
Three columns per row: what we thought, an arrow, what we now think, then the reason. The reason is on the same line as the change, so nobody can read a reversal without also reading why.
The old position is struck through in grey and the new one is bold navy. Struck-through text is understood instantly - no legend needed.
Rows alternate white and pale grey. With four dense rows stacked up, the banding stops the eye losing its place.
Small WAS and NOW labels sit above each side in red and green. They are tiny on purpose: they orient you once, then get out of the way.
Four rows is the maximum that fits at a readable size. A fifth reversal would have needed a second slide rather than smaller text.`);
}

/* =========================================================
   4. THE PRICING BOUNDARY  (flow diagram)
   ========================================================= */
{
  const s = lightSlide("The pricing boundary - kept, re-justified", "Architecture rule");

  // top: the rule
  card(s, 0.6, 1.55, 12.1, 0.62, NAVY, { shadow: false });
  s.addText("The language model never produces a number. Code computes it from structured data a human approved.", {
    x: 0.85, y: 1.55, w: 11.6, h: 0.62, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: WHITE, valign: "middle"
  });

  // pipeline
  const steps = [
    ["Documents\nuploaded", GREY],
    ["AI drafts\nrate card", TEAL],
    ["OWNER\nCONFIRMS", ACC],
    ["Code computes\nthe price", DEEP],
    ["LLM writes\nprose only", TEAL],
    ["OWNER\nAPPROVES", ACC]
  ];
  steps.forEach((st, i) => {
    const x = 0.6 + i * 2.1;
    const dark = (st[1] === ACC);
    s.addShape(p.ShapeType.roundRect, { x, y: 2.45, w: 1.8, h: 1.0, rectRadius: 0.08,
      fill: { color: st[1] }, line: { type: "none" } });
    s.addText(st[0], { x, y: 2.45, w: 1.8, h: 1.0, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11.5, bold: true, color: dark ? DARKT : WHITE,
      align: "center", valign: "middle" });
    if (i < 5) arrowR(s, x + 1.86, 2.84, 0.2, "AAB8C4");
  });
  s.addText("SETUP  (once, ~15 min)", { x: 0.6, y: 3.52, w: 4.0, h: 0.26, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9.5, bold: true, color: GREY, charSpacing: 1 });
  s.addText("EVERY QUOTE  (deterministic, auditable)", { x: 6.9, y: 3.52, w: 5.5, h: 0.26, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9.5, bold: true, color: GREY, charSpacing: 1 });

  // evidence cards
  const ev = [
    ["28-77%", "whole-document\nextraction accuracy", BAD],
    ["46.89%", "of table errors look\ncorrect anyway", BAD],
    ["15%", "Swedish statutory cap\non quote overrun", DEEP],
    ["~$27k", "paid by a dealership on\nan AI-quoted price", BAD]
  ];
  ev.forEach((e, i) => {
    const x = 0.6 + i * 3.1;
    card(s, x, 4.15, 2.9, 1.5, WHITE, { line: "DCE5EE", shadow: false });
    s.addText(e[0], { x: x + 0.2, y: 4.3, w: 2.5, h: 0.6, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 30, bold: true, color: e[2] });
    s.addText(e[1], { x: x + 0.2, y: 4.92, w: 2.5, h: 0.62, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: DARKT });
  });

  s.addText("\u201CThe model generates text \u2014 it does not enforce policy.\u201D   OWASP RAG guidance", {
    x: 0.6, y: 5.95, w: 12.1, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 13, italic: true, color: DEEP
  });

  s.addNotes(
`DECISION: retrieval may read documents during SETUP. It may never produce a price at RUNTIME.

WHY THE RULE STAYS - six reasons in order of force:
1. The failure mode is SILENT. 46.89% of table-reading errors still produce plausible answers, so reviewing outputs cannot catch it.
2. Wrong numbers land in the legally UNESCAPABLE band. The obvious-error escape hatch only covers absurd figures. A 1 euro boiler is escapable. 340 euros for a 480 euro job is not - plausible, accepted in good faith, binding.
3. It is adversarially steerable. Chevrolet Watsonville was prompt-injected into "1 dollar Tahoe, no takesies backsies" and pulled its chatbot.
4. A retrieved chunk cannot express a RULE - minimums, callout fees, out-of-hours multipliers, travel bands.
5. No versioning or effective dates, so it rots silently.
6. Non-reproducible. Six weeks later, "the retriever returned this chunk" is not an audit trail.

WHY THE REASONING CHANGED: I originally justified this via the EU AI Act. That was wrong. Annex III covers pricing only for life and health insurance. The real exposure is ordinary contract law - which is LARGER. Sweden caps overrun at 15% by statute. Moffatt v Air Canada (2024) forced an airline to honour a policy its chatbot invented. A Toronto BMW dealership paid roughly 27,000 dollars in 2026.

WHY NOT OVER-CORRECT: the rule bans the model from producing the number. It does not ban documents from onboarding. Extraction into an owner-confirmed rate card fully honours the rule - a human approved the structured data the code computes from.

HOW THIS SLIDE IS BUILT, AND WHY
The rule is stated once, in a dark band across the top, in a single sentence. It is the most important sentence in the deck, so it gets its own space and nothing competes with it.
Below it, six boxes in a row with arrows between them. A left-to-right chain is the clearest way to show that something happens in a fixed order and that a step cannot be skipped.
The two amber boxes are the human steps - owner confirms, owner approves. Everything automatic is blue or teal. So the slide shows at a glance that a person sits at both of the points where it matters.
Two labels under the chain split it into SETUP, which happens once, and EVERY QUOTE, which happens always. That distinction is the whole argument: documents are allowed in the first half and banned from the second.
The four number cards give the evidence. Big figures with small captions, because a number read at 30pt lands harder than the same number in a sentence. Three are red and one is blue - red for the accuracy and liability problems, blue for the legal cap, so the colour tells you which are warnings.
The OWASP quote closes the slide in italics. A borrowed line from an outside authority is more persuasive than us restating our own rule a second time.`);
}

/* =========================================================
   5. ONBOARDING  (the 15-minute problem)
   ========================================================= */
{
  const s = lightSlide("Onboarding is the adoption risk", "Setup");

  // problem stat band
  card(s, 0.6, 1.55, 5.85, 1.5, BAD, { shadow: false });
  s.addText("42%", { x: 0.85, y: 1.66, w: 1.8, h: 0.72, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 40, bold: true, color: WHITE });
  s.addText("of surveyed users of a major field-service product still had NO working price book after three months.",
    { x: 2.6, y: 1.72, w: 3.7, h: 1.1, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12, color: WHITE, valign: "middle" });

  card(s, 6.85, 1.55, 5.85, 1.5, OK, { shadow: false });
  s.addText("15 min", { x: 7.1, y: 1.66, w: 2.3, h: 0.72, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 34, bold: true, color: WHITE });
  s.addText("target to first quote, live on 3-5 services. Achievable only with short rate cards.",
    { x: 9.3, y: 1.72, w: 3.2, h: 1.1, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12, color: WHITE, valign: "middle" });

  // the 4-step sequence
  s.addText("THE SEQUENCE - each step solves what the previous cannot", {
    x: 0.6, y: 3.3, w: 12.1, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, color: TEAL, charSpacing: 1.2
  });

  const seq = [
    ["1", "Industry template", "Pre-priced defaults. Owner CORRECTS rather than creates. Works when there is no document at all."],
    ["2", "Import existing", "CSV, accounting tools. Best data quality, narrowest reach."],
    ["3", "Document upload", "Drafts the rate card. Owner confirms. ~10-15 min review."],
    ["4", "Go live on 3-5", "Escalate real gaps mid-conversation. Nobody else does this."]
  ];
  seq.forEach((q, i) => {
    const x = 0.6 + i * 3.1;
    card(s, x, 3.7, 2.9, 2.35, i === 0 ? LIGHT : WHITE, { line: i === 0 ? ACC : "DCE5EE", shadow: false });
    badge(s, x + 0.22, 3.92, 0.42, q[0], i === 0 ? ACC : TEAL, i === 0 ? DARKT : WHITE);
    s.addText(q[1], { x: x + 0.22, y: 4.45, w: 2.5, h: 0.34, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 13, bold: true, color: NAVY });
    s.addText(q[2], { x: x + 0.22, y: 4.82, w: 2.5, h: 1.1, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: DARKT });
    if (i < 3) arrowR(s, x + 2.96, 4.8, 0.12, "AAB8C4");
  });

  s.addText("Vertical choice and onboarding feasibility are ONE decision - short rate cards make 15 minutes possible.", {
    x: 0.6, y: 6.25, w: 12.1, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12.5, bold: true, italic: true, color: DEEP
  });

  s.addNotes(
`DECISION: template-first, not upload-first.

WHY: the highest-leverage finding in the whole study. A pre-priced industry library gets a contractor live in ONE DAY with a full price book. One such product ships around 8,500 expert-maintained tasks covering over 90% of common repairs. It is the only mechanism found that collapses pricing setup from months to a day without bespoke human labour.

WHY TEMPLATE BEFORE UPLOAD: extraction cannot help when there is no document. An owner's callout fee often lives in their head, not on paper. A pre-filled form can capture that; a document parser cannot.

WHY THIS IS THE BIGGEST ADOPTION RISK: the consistently cited abandonment reason for trade software is that three afternoons building price books is selling time gone - and the software is already too expensive before the monthly fee hits the card. Acquisition is not the problem. Retention is, and retention fails at onboarding.

WHAT WE INVENTED: step 4 - going live on 3-5 services and escalating real gaps mid-conversation. No product was found doing this. It is also the best-motivated: a real gap encountered in a live conversation beats an empty form field.

PROMISE HONESTLY: 10-15 minutes of careful review on a 40-line rate card, not "done in seconds". Over-promising here is its own abandonment risk.

THE LINK TO VERTICALS: pest control and cleaning have SHORT, already-fixed rate cards. HVAC and general building have enormous ones. That is why vertical choice and onboarding feasibility are the same decision.

HOW THIS SLIDE IS BUILT, AND WHY
Two big coloured blocks at the top, red then green: the problem, then the target. Putting the failure figure next to the goal figure makes the goal feel earned rather than arbitrary. 42% against 15 minutes is an argument in two numbers.
Both blocks use a large figure on the left and the explanation on the right, so the numbers line up vertically and the eye compares them directly.
Below that, four cards in order with arrows between them. Numbered badges make the sequence explicit, because the order is the point - template before upload, not instead of it.
Card one is outlined in amber and tinted. It is the recommendation, and it is first for a reason, so it is the only card that looks different.
The closing line in bold italic ties this slide to the verticals slide. It is the one sentence that connects two decisions people usually treat separately, so it sits alone at the bottom with space around it.`);
}

/* =========================================================
   6. CATALOGUE PORTS  (adapter diagram)
   ========================================================= */
{
  const s = lightSlide("Catalogue connection: the interface is the product", "Product mode");

  // agent
  card(s, 4.3, 1.5, 4.7, 0.55, NAVY, { shadow: false });
  s.addText("Agent tools", { x: 4.3, y: 1.5, w: 4.7, h: 0.55, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 13, bold: true, color: WHITE, align: "center", valign: "middle" });
  s.addShape(p.ShapeType.downArrow, { x: 6.5, y: 2.12, w: 0.3, h: 0.32, fill: { color: GREY }, line: { type: "none" } });

  // port
  card(s, 3.2, 2.5, 6.9, 0.62, DEEP, { shadow: false });
  s.addText("CatalogPort  ·  OrdersPort      the standardised contract", {
    x: 3.2, y: 2.5, w: 6.9, h: 0.62, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12.5, bold: true, color: WHITE, align: "center", valign: "middle" });
  s.addShape(p.ShapeType.downArrow, { x: 6.5, y: 3.19, w: 0.3, h: 0.32, fill: { color: GREY }, line: { type: "none" } });

  // read model
  card(s, 3.9, 3.57, 5.5, 0.55, TEAL, { shadow: false });
  s.addText("Read model  \u2014  ALWAYS queried here", { x: 3.9, y: 3.57, w: 5.5, h: 0.55, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle" });

  // adapters
  const ad = [
    ["No platform", "sheet / CSV", "BUILD 1st", OK],
    ["Shopify", "2 clicks, OAuth", "BUILD 2nd", OK],
    ["WooCommerce", "wc-auth endpoint", "BUILD 3rd", OK],
    ["Odoo", "paywalled API", "DROPPED", BAD]
  ];
  ad.forEach((a, i) => {
    const x = 0.6 + i * 3.1;
    const dropped = a[3] === BAD;
    card(s, x, 4.6, 2.9, 1.55, dropped ? "F7EDEE" : LIGHT,
      { line: dropped ? BAD : "C9D6E2", shadow: false });
    s.addText(a[0], { x: x + 0.2, y: 4.76, w: 2.5, h: 0.32, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 13.5, bold: true, color: dropped ? BAD : NAVY,
      strike: dropped });
    s.addText(a[1], { x: x + 0.2, y: 5.1, w: 2.5, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: GREY });
    s.addShape(p.ShapeType.roundRect, { x: x + 0.2, y: 5.5, w: 1.3, h: 0.3, rectRadius: 0.1,
      fill: { color: a[3] }, line: { type: "none" } });
    s.addText(a[2], { x: x + 0.2, y: 5.5, w: 1.3, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 8.5, bold: true, color: WHITE, align: "center", valign: "middle" });
  });

  s.addText("Shopify + WooCommerce = 66-72% of shops in every target country.   No-platform fallback reaches the rest.", {
    x: 0.6, y: 6.35, w: 12.1, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: DEEP
  });

  s.addNotes(
`DECISION: ports and adapters - the same rule that makes WhatsApp an adapter makes Shopify one.

WHY: the agent calls search_products(tenant, query). It never knows Shopify exists. A new platform becomes contained work rather than a redesign. THE INTERFACE IS THE PRODUCT; THE ADAPTERS ARE INVENTORY. That is what makes this SaaS rather than consulting.

WHY THE NO-PLATFORM ADAPTER IS BUILT FIRST - four reasons:
1. Universal fallback - no tenant is ever un-onboardable
2. It forces the canonical product model to be defined before any external API shapes it
3. Eurostat 2025: 76.7% of small EU enterprises have a website, so roughly 23% do not. An Instagram shop with stock in a spreadsheet is our IDEAL customer and is structurally invisible to every app-store competitor
4. Cheapest to build

WHY ODOO IS DROPPED: 0.4% of the ecommerce market. Its own docs state external API access is unavailable on Free and Standard plans, so the merchant must roughly double their per-user bill forever. One API call per second, no parallelism. No real webhooks - they need hand-configuring inside each customer's database using a tier-gated feature we are barred from installing on Odoo Online. And the protocol is removed around winter 2027: a 15-month shelf life.

WHY THE READ MODEL IS ALWAYS THE QUERY PATH: consistent latency, identical behaviour across every source, and distance from third-party rate limits. Never call the platform mid-conversation - only at transaction time.

THE HIGHEST-LEVERAGE ENGINEERING DETAIL: WooCommerce ships /wc-auth/v1/authorize, giving a near-OAuth flow - two clicks instead of seven fiddly admin steps. That is what keeps a third of the market self-serve instead of support-heavy.

HOW THIS SLIDE IS BUILT, AND WHY
Top to bottom, narrowing then widening: agent, then the port, then the read model, then four adapters spread across the bottom. The shape is the architecture. Everything funnels through one narrow contract in the middle, which is exactly the point being made.
The port band is the widest dark element and sits in the centre of the slide, because it is the thing that matters. The adapters are small boxes at the bottom because they are interchangeable.
Downward arrows between the layers show direction of flow, so nobody has to guess whether the agent calls the port or the other way round.
The read model row says ALWAYS queried here in capitals. That is a rule, not a description, so it is stated on the diagram itself rather than left to the notes.
Odoo is styled differently from the other three: pink tint, red outline, name struck through, red DROPPED tag. It stays on the slide instead of being deleted because someone will ask about Odoo, and a struck-out box answers the question before it is asked.
The three green tags read BUILD 1st, 2nd, 3rd. Build order is a decision, so it belongs on the slide.`);
}

/* =========================================================
   7. STALENESS RULE
   ========================================================= */
{
  const s = lightSlide("What the agent may promise", "Data freshness");

  s.addText("No engineering makes a spreadsheet fresh. So manage the promise instead.", {
    x: 0.6, y: 1.5, w: 12.1, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 14, italic: true, color: GREY
  });

  const bands = [
    ["< 24 hours", "\u201CYes, in stock.\u201D", "Can take payment", OK],
    ["< 2 weeks", "\u201CLet me confirm that.\u201D", "Reserve only", ACC],
    ["> 60 days", "Stops asserting stock", "Escalate to owner", BAD]
  ];
  bands.forEach((b, i) => {
    const y = 2.1 + i * 1.32;
    card(s, 0.6, y, 12.1, 1.15, WHITE, { line: "DCE5EE", shadow: false });
    s.addShape(p.ShapeType.roundRect, { x: 0.85, y: y + 0.28, w: 1.9, h: 0.58, rectRadius: 0.08,
      fill: { color: b[3] }, line: { type: "none" } });
    s.addText(b[0], { x: 0.85, y: y + 0.28, w: 1.9, h: 0.58, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle" });
    s.addText(b[1], { x: 3.1, y: y + 0.3, w: 5.2, h: 0.55, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 17, color: NAVY, valign: "middle" });
    s.addText(b[2], { x: 8.6, y: y + 0.3, w: 3.9, h: 0.55, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12.5, bold: true, color: b[3], valign: "middle" });
  });

  card(s, 0.6, 6.05, 12.1, 0.72, NAVY, { shadow: false });
  s.addText("NEVER let stale data close a sale.  Fresh data can take payment; stale data can only reserve.", {
    x: 0.85, y: 6.05, w: 11.6, h: 0.72, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 14, bold: true, color: WHITE, valign: "middle" });

  s.addNotes(
`DECISION: data age changes what the agent is allowed to say.

WHY: an agent that promises something sold out weeks ago damages the tenant's relationship with their own customer. That is worse than being unhelpful. And the freshness gap between sources is enormous - Shopify webhooks give seconds, a re-uploaded spreadsheet gives days.

WHY THIS IS ALSO A COMPETITIVE POINT: vendors advertise "real-time sync" while their own documentation says hourly intervals. Hourly polling marketed as real-time is the industry norm, and reviews show the cost - purchases of out-of-stock items, quantities wrong for months. Genuine webhooks plus reconciliation beats most products shipping today. THE BAR IS LOWER THAN IT LOOKS.

THE ONE RULE THAT PREVENTS THE WORST OUTCOME: never let stale data close a sale. Fresh data can take payment. Stale data can only reserve.

A CLEVER MECHANISM WE GET AND CONNECTOR-ONLY PRODUCTS CANNOT: let the agent ask the owner on WhatsApp and write the answer back. The conversation becomes the sync mechanism.

AND THE BIGGER OPERATIONAL WARNING FROM THE RESEARCH: the most likely source of a bad customer experience is not a slightly wrong price - it is a booked crew that does not exist or a promised part that is not on the van. Volatile data must never be asserted without a live source.

HOW THIS SLIDE IS BUILT, AND WHY
Three rows, one per freshness band, reading green then amber then red down the page. Traffic-light order is understood without a legend, and going top to bottom matches getting worse as data gets older.
Each row has the same three parts in the same places: the age on the left in a coloured pill, what the agent actually says in the middle, and what it is allowed to do on the right. Because the columns line up, you can read down any one of them and get a complete picture.
The middle column is in the serif font and quoted. Those are the agent's real words, so they are set apart from the labels around them.
The rule at the bottom is in a dark band, on its own, in one sentence. It is the single rule that prevents the worst outcome, so it is separated from the table rather than being a fourth row.
The slide has only three rows on purpose. Three bands are memorable; six would be a lookup table nobody retains.`);
}

/* =========================================================
   8. WHERE TO LAUNCH  (country ranking)
   ========================================================= */
{
  const s = lightSlide("Where to launch", "Market");

  // English constraint callout
  card(s, 0.6, 1.5, 12.1, 0.95, BAD, { shadow: false });
  s.addText("67.6%", { x: 0.85, y: 1.6, w: 1.5, h: 0.75, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 32, bold: true, color: WHITE });
  s.addText("of Dutch companies communicate with the outside world in Dutch ONLY. English-only is a market-defining constraint, not a technical preference.",
    { x: 2.35, y: 1.62, w: 10.1, h: 0.72, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 13, color: WHITE, valign: "middle" });

  const c = [
    ["1", "United Kingdom", "~883k construction SMEs · WhatsApp 90%, Instagram 94% · heat pumps +112% · no AI Act", "Whoza, TalkTrade, Grip already at \u00A349-59", OK],
    ["2", "Ireland", "Retrofit applications +96%, grants +186% · 12-24 month waits · highest EU own-site share", "Small - 81k construction firms", OK],
    ["3", "Malta", "Only other English co-official country", "Tiny - 5,869 construction firms", ACC],
    ["4", "Netherlands", "Best raw numbers: 268k micro firms, ~103k webshops", "The language finding. Blueprint ships this in Dutch", BAD],
    ["5", "Sweden", "Messenger #2 at 65%, Instagram 65% - channels are FINE", "Fails on language only", BAD]
  ];
  c.forEach((r, i) => {
    const y = 2.68 + i * 0.83;
    card(s, 0.6, y, 12.1, 0.72, i < 2 ? LIGHT : WHITE, { line: i < 2 ? OK : "DCE5EE", shadow: false });
    badge(s, 0.8, y + 0.18, 0.36, r[0], r[4], r[4] === ACC ? DARKT : WHITE);
    s.addText(r[1], { x: 1.3, y: y + 0.19, w: 2.3, h: 0.34, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 13.5, bold: true, color: NAVY, valign: "middle" });
    s.addText(r[2], { x: 3.65, y: y + 0.08, w: 5.5, h: 0.56, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10, color: DARKT, valign: "middle" });
    s.addText(r[3], { x: 9.35, y: y + 0.08, w: 3.15, h: 0.56, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10, italic: true, color: BAD, valign: "middle" });
  });

  s.addText("Recommended: UK + Ireland as ONE English-language market.  Language is the first expansion lever, not a launch requirement.", {
    x: 0.6, y: 6.9, w: 12.1, h: 0.35, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: DEEP
  });

  s.addNotes(
`DECISION: UK plus Ireland as one go-to-market.

WHY THE ENGLISH CONSTRAINT DOMINATES: the killer evidence is not a consumer survey - it is businesses' own revealed behaviour. 67.6% of Dutch companies deal with the outside world exclusively in Dutch; 61.3% speak only Dutch with customers. The buyer has ALREADY MADE THIS CHOICE. We would be selling them a tool that does the thing they decided not to do. Supporting: 60% of even the most confident English readers still want customer care in their own language. Finland's consumer authority states English-only service may be misleading unless disclosed.

HONEST CONCLUSION: English-only leaves the British Isles, a small island, and two countries where we would be swimming against the current. That is an English-speaking strategy, not a European one. Legitimate - but make it knowingly.

WHY UK AND IRELAND TOGETHER: it makes Ireland a cheap add-on rather than a separate bet. Largest pool plus sharpest demand signal, and zero language work for either.

IRELAND'S SIGNAL IS THE BEST FOUND ANYWHERE: retrofit applications up 96% in 2026, individual grants up 186%, against 12-24 month waits. That is precisely the ideal customer - a trade getting more enquiries than it can answer.

ACCEPT THIS COST: we enter the UK as a LATE FOLLOWER. Whoza, TalkTrade and Grip sell the same product from 49-59 pounds. That caps entry pricing.

CORRECTING AN EARLIER ERROR: a previous report disqualified Sweden and Denmark on WhatsApp penetration. That reasoning was WRONG. Messenger is the number one messaging app in Denmark and number two in Sweden, used by 65% of Swedes. There is a viable channel mix without WhatsApp. They fail on LANGUAGE, not channels. Lesson: stop scoring countries on WhatsApp penetration.

HOW THIS SLIDE IS BUILT, AND WHY
The red band with 67.6% sits above the country list, not below it. The constraint has to be understood before the ranking makes any sense, otherwise the audience spends the whole slide wondering why the Netherlands is fourth with the best numbers.
Five rows, one per country, numbered. Ranking is the output of this slide, so the numbers are literal badges rather than implied by position alone.
Each row has three zones: the country, the case for it, and the case against it in red italic. Every country gets its objection printed next to it. That stops the ranking looking like a sales pitch.
The top two rows are tinted and outlined green, the rest plain. That is the recommendation, visible without reading a word.
Badge colours encode the verdict: green for the two recommendations, amber for the viable-but-tiny one, red for the two that fail. So the shape of the decision is legible from the back of the room.
The Sweden row deliberately says channels are FINE. It is there to correct an earlier mistake in front of the same audience, rather than quietly dropping the country.`);
}

/* =========================================================
   9. WHICH INDUSTRIES
   ========================================================= */
{
  const s = lightSlide("Which industries can actually be served", "Verticals");

  // GO column
  card(s, 0.6, 1.55, 5.9, 4.0, LIGHT, { line: OK, shadow: false });
  s.addText("START HERE", { x: 0.85, y: 1.7, w: 3, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, color: OK, charSpacing: 1.5 });
  const go = [
    ["Pest control", "Fixed price per treatment, published openly. Industry treats hourly billing as a red flag."],
    ["Cleaning", "Instant online quoting ALREADY normal - proof the pricing is computable. Crew availability is the binding constraint."],
    ["Removals", "m\u00B3 + distance calculators standard. Jobs \u20AC600-1,500+."],
    ["EV charging  (test)", "Photo-based quoting already mainstream. Growing, unlike solar."]
  ];
  go.forEach((g, i) => {
    const y = 2.1 + i * 0.85;
    s.addShape(p.ShapeType.ellipse, { x: 0.9, y: y + 0.06, w: 0.2, h: 0.2, fill: { color: OK }, line: { type: "none" } });
    s.addText(g[0], { x: 1.25, y: y, w: 5.0, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 13, bold: true, color: NAVY });
    s.addText(g[1], { x: 1.25, y: y + 0.29, w: 5.05, h: 0.52, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10, color: DARKT });
  });

  // NO column
  card(s, 6.8, 1.55, 5.9, 4.0, "F7EDEE", { line: BAD, shadow: false });
  s.addText("CANNOT QUOTE REMOTELY", { x: 7.05, y: 1.7, w: 4.5, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, color: BAD, charSpacing: 1.5 });
  const no = [
    ["Heat pumps", "LEGALLY BARRED - mandatory room-by-room heat-loss survey gates certified install and grants"],
    ["Roofing", "Satellite shows roof shape; price is set by batten and felt condition UNDER the tiles"],
    ["General building", "Bill of quantities from drawings, plus a visit"],
    ["Emergency plumbing, HVAC, locksmiths", "85-90% phone, urgently, and cannot describe the fault"]
  ];
  no.forEach((g, i) => {
    const y = 2.1 + i * 0.85;
    s.addShape(p.ShapeType.ellipse, { x: 7.1, y: y + 0.06, w: 0.2, h: 0.2, fill: { color: BAD }, line: { type: "none" } });
    s.addText(g[0], { x: 7.45, y: y, w: 5.0, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 13, bold: true, color: NAVY });
    s.addText(g[1], { x: 7.45, y: y + 0.29, w: 5.05, h: 0.52, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10, color: DARKT });
  });

  card(s, 0.6, 5.75, 12.1, 1.05, NAVY, { shadow: false });
  s.addText("High job value is precisely WHY they cannot be quoted remotely \u2014 the money is in the uncertainty, and the uncertainty is physical.", {
    x: 0.9, y: 5.85, w: 11.5, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 13, bold: true, color: WHITE });
  s.addText("The BOXT lesson: remote quoting was unlocked by STANDARDISING THE OFFER, not by smarter software.", {
    x: 0.9, y: 6.28, w: 11.5, h: 0.4, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12, italic: true, color: "BFD3E6" });

  s.addNotes(
`DECISION: pest control, cleaning and removals. Not solar, heat pumps, roofing, HVAC or general building.

WHY THE TRAP LIST IS A TRAP: heat pumps, roofing, HVAC and general building all look ideal - high job values, obvious pain, plenty of enquiries. That combination is seductive. But in every one, the price is set by something nobody can see without being there: the heat loss, the battens, the pipe runs, what is behind the wall. High job value is precisely WHY they cannot be quoted remotely.

WHY CLEANING IS THE STRONGEST FIT: instant online quoting is ALREADY normal practice there - one Dutch firm quotes in 30 seconds. That is the strongest possible proof the pricing is computable. Highest enquiry volume studied. Non-urgent, so customers will message rather than phone. AND crew availability is the genuine binding constraint, which means our feasibility check is load-bearing here rather than decorative.

WHY PEST CONTROL FIRST: best pure technical fit. Fixed price per treatment, published openly. The industry itself treats hourly billing for routine work as a red flag. Almost no competing software. If the product does not work in pest control, it will not work anywhere.

THE STRATEGIC INSIGHT THAT OUTRANKS THE VERTICAL PICK - THE BOXT LESSON: boilers were considered unquotable remotely until BOXT and Heatable narrowed the OFFER - defined boiler set, defined install scenarios, fixed price in 90 seconds, next-day fitting. Remote quoting was unlocked by standardising the offering, not by smarter software.

That gives two strategic options: sell to businesses that already have a fixed price list (the recommendation), or build a tool that helps businesses standardise their offer (a bigger company, much harder).

HOW THIS SLIDE IS BUILT, AND WHY
Two columns side by side, green on the left and red on the right. A go and a no-go list next to each other is faster to absorb than two separate slides, and it makes the contrast the message.
The right-hand column is headed CANNOT QUOTE REMOTELY rather than avoid. The heading states the reason, not the verdict, which is the part people need to remember.
Every entry has a one-line reason underneath it. Without those, the right-hand column looks like opinion. With them, roofing and heat pumps are obviously ruled out by physics and by law, not by preference.
Small coloured dots instead of bullets, matching each column's colour. It keeps the two lists visually distinct when the eye jumps between them.
The dark band at the bottom holds the insight that outranks the whole list - that high job value is the reason these jobs cannot be quoted remotely, and the BOXT lesson underneath it in lighter italic. Putting it in a band signals it is a conclusion, not another list item.
EV charging is labelled test in its own entry, so it is clear it is a cheap experiment rather than a fourth commitment.`);
}

/* =========================================================
   10. WHAT IS DEFENSIBLE
   ========================================================= */
{
  const s = lightSlide("What is actually defensible", "Positioning");

  const d = [
    ["Feasibility before price", "Confirmed by ABSENCE across every product examined, in two separate research threads. Nothing checks parts, crew and area before quoting.", OK],
    ["Owner approves before sending", "Survived all four threads. Competitive: the closest Dutch competitor sends automatically. Legal: it disposes of GDPR Article 22. Practical: only defence against a silent wrong number.", OK],
    ["Multi-channel breadth", "Most competitors are WhatsApp-first; the closest shop competitor is Shopify-only and channel-narrow.", ACC],
    ["Compliance as a feature", "AI disclosure enforceable since 2 Aug 2026, penalties to \u20AC15m or 3% of turnover. Very little evidence vendors do it visibly. Built and not marketed.", ACC]
  ];
  d.forEach((r, i) => {
    const y = 1.55 + i * 1.12;
    card(s, 0.6, y, 12.1, 0.98, i < 2 ? LIGHT : WHITE, { line: i < 2 ? OK : "DCE5EE", shadow: false });
    s.addShape(p.ShapeType.roundRect, { x: 0.8, y: y + 0.19, w: 0.14, h: 0.6, rectRadius: 0.05,
      fill: { color: r[2] }, line: { type: "none" } });
    s.addText(r[0], { x: 1.15, y: y + 0.13, w: 3.4, h: 0.72, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 14, bold: true, color: NAVY, valign: "middle" });
    s.addText(r[1], { x: 4.7, y: y + 0.1, w: 7.8, h: 0.78, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: DARKT, valign: "middle" });
  });

  card(s, 0.6, 6.12, 12.1, 0.72, ACC, { shadow: false });
  s.addText("CAUTION: an empty column has two meanings \u2014 nobody thought of it, or everybody tried and customers did not care. Desk research cannot tell them apart.", {
    x: 0.9, y: 6.12, w: 11.5, h: 0.72, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12.5, bold: true, color: DARKT, valign: "middle" });

  s.addNotes(
`WHY THESE FOUR AND NOT "AI-POWERED": price is not a weapon in this market. ServiceM8 is about 25 pounds a month with unlimited users. The category is affordable - the one-van plumber is not priced out of anything. We must be BETTER, not cheaper.

THE APPROVAL GATE IS THE STRONGEST ITEM, and it earned that from three independent directions:
- Competitive: Blueprint, the closest Dutch competitor, appears to send quotes automatically with no approval gate. No product found lets an AI send a priced quote to a customer unseen.
- Legal: it disposes of GDPR Article 22 - with a human approving, the decision is not "solely automated".
- Practical: it is the only defence against the silent-wrong-number failure mode.

When three separate lines of reasoning converge on one design element, that is the thing to build the marketing around.

THE HONEST CAVEAT, and it must be said out loud: the feasibility gap is confirmed by ABSENCE. An empty column can mean nobody thought of it, or it can mean everybody tried and customers did not care. Desk research cannot distinguish those. That is why the validation calls on the next slide matter more than any further searching.

WHAT WE SHOULD DO DIFFERENTLY: we BUILT the compliance features and did not MARKET them. For a trade choosing between us and a local agency, "this is the one that keeps you legal" is a real reason to pick us - and an agency cannot easily retrofit it.

HOW THIS SLIDE IS BUILT, AND WHY
Four rows, strongest first. The claim goes on the left and the evidence for it on the right, so no claim appears without its support on the same line.
A small vertical coloured tab marks each row - green for the two that are strongly evidenced, amber for the two that are weaker. It grades our own confidence on the slide instead of presenting all four as equal.
The top two rows are tinted and outlined to separate them from the merely-good ones. If time runs short, those two are the slide.
The amber band at the bottom is the caveat, and it is deliberately the last thing on the slide. Ending a positioning slide on a warning rather than a boast is what makes the rest of it credible. It also sets up the next slide, where the validation calls answer exactly this doubt.`);
}

/* =========================================================
   11. TOP RISKS
   ========================================================= */
{
  const s = lightSlide("The risks that matter", "Risk register");

  const r = [
    ["1", "Customers phone, not message", "Every published figure on both sides is vendor marketing. UNRESOLVED.", "25-40 calls. Two days.", BAD],
    ["2", "A wrong extracted price binds", "28-77% document accuracy; plausible-but-wrong is legally unescapable.", "Never price from retrieval. Version the rate card.", BAD],
    ["3", "Approval becomes a rubber stamp", "Case law: nominal sign-off is not meaningful intervention.", "Show rate applied, rules fired, version. Flag outliers.", ACC],
    ["4", "Promised crew or part does not exist", "Small operators often do not track van stock at all.", "Never assert without a live source. Degrade and escalate.", ACC],
    ["5", "Meta starts charging for inbound", "Sources conflict. Possible 1 Oct 2026.", "Verify against Meta's own policy this week.", BAD]
  ];
  r.forEach((row, i) => {
    const y = 1.55 + i * 1.0;
    card(s, 0.6, y, 12.1, 0.88, i % 2 ? LIGHT : WHITE, { line: "DCE5EE", shadow: false });
    badge(s, 0.8, y + 0.24, 0.4, row[0], row[4], row[4] === ACC ? DARKT : WHITE);
    s.addText(row[1], { x: 1.35, y: y + 0.08, w: 3.3, h: 0.72, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12.5, bold: true, color: NAVY, valign: "middle" });
    s.addText(row[2], { x: 4.75, y: y + 0.08, w: 4.3, h: 0.72, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10, color: DARKT, valign: "middle" });
    s.addText(row[3], { x: 9.25, y: y + 0.08, w: 3.25, h: 0.72, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10, bold: true, color: DEEP, valign: "middle" });
  });

  card(s, 0.6, 6.65, 12.1, 0.62, OK, { shadow: false });
  s.addText("DOWNGRADED: \u201Ctrades will not buy software\u201D. Contradicted - Jobber, Tradify, ServiceM8 are substantial self-serve businesses. Retention is the problem, not acquisition.", {
    x: 0.9, y: 6.65, w: 11.5, h: 0.62, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11.5, bold: true, color: WHITE, valign: "middle" });

  s.addNotes(
`WHY RISK 1 IS RANKED FIRST: if customers phone rather than message, the entire product is moot. And the evidence is genuinely contaminated - industry sources claim 78-83% of home-service bookings start with a call, but these trace to vendor marketing with no verifiable primary study, and they are US-based. The counter-claims come from vendor blogs with equal self-interest. Labelled UNCLEAR by the research, honestly.

DO NOT settle this with more desk research. Phone 25-40 target businesses and ask one question: of your last twenty enquiries, how many came by phone, WhatsApp, Instagram DM, web form or email? Two days of work, and it decides whether the product is viable at all.

WHY RISK 2 CANNOT BE MITIGATED BY REVIEW: the failure is silent. Reviewing outputs does not catch a plausible wrong number. The mitigation has to be structural - never price from retrieval.

WHY RISK 3 EXISTS EVEN THOUGH APPROVAL IS OUR STRONGEST FEATURE: case law is explicit that nominal human sign-off does not establish meaningful intervention. If the owner taps Approve without seeing what drove the number, the gate is decorative and the legal protection evaporates. So surface the service matched, the rate applied, the rules triggered, and the rate-card version - and flag quotes that look unusual against the owner's OWN history.

WHY RISK 5 IS URGENT: it is five days away and it changes unit economics. Earlier reasoning in this project relied on inbound messages being free. That may not hold.

ONE ASSUMPTION WE CARRIED THAT WAS WRONG: we assumed trades do not buy software. Contradicted - a Nordic investor paid 550m NOK for trades marketplaces in Dec 2025, calling home improvement large and under-digitalised. Acquisition is not the problem. Retention is, and retention fails at onboarding.

HOW THIS SLIDE IS BUILT, AND WHY
Three columns: the risk, the evidence, and the mitigation. Every risk on this slide has an answer printed beside it. A risk slide without mitigations reads as a list of reasons not to proceed, which is not what this is.
The mitigation column is in bold blue, so the eye lands on the answers rather than on the problems.
Numbered badges, coloured red or amber by severity. Five rows is enough to be honest and few enough to stay readable.
Rows alternate white and grey for the same reason as the reversals slide - it stops the eye drifting across columns.
The green band at the bottom is the one risk that got DOWNGRADED. Including something the research disproved shows the register is maintained honestly rather than only ever growing. It is green because it is good news, and it is the last thing read.`);
}

/* =========================================================
   12. NEXT STEPS
   ========================================================= */
{
  const s = darkSlide();
  s.addShape(p.ShapeType.ellipse, { x: -1.8, y: 4.4, w: 4.6, h: 4.6, fill: { color: DEEP }, line: { type: "none" } });

  s.addText("BEFORE WRITING MORE CODE", {
    x: 0.8, y: 0.8, w: 8, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, color: ACC, charSpacing: 2 });
  s.addText("Five things, in order", {
    x: 0.8, y: 1.15, w: 10, h: 0.7, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 34, bold: true, color: WHITE });

  const n = [
    ["Verify the Meta pricing change", "5 days away. Hits every pricing decision.", "This week"],
    ["Make 25-40 customer calls", "Phone or message? Decides viability. Also tests the feasibility gap.", "2 days"],
    ["Ask Shopify about checkout links", "May avoid a 4-8 week privacy review.", "1 email"],
    ["Instrument rate-card review time", "The single most valuable number we could generate.", "2 weeks"],
    ["Legal opinion on owner approval", "Does approval change the legal character of an automated quote?", "External"]
  ];
  n.forEach((x, i) => {
    const y = 2.15 + i * 0.92;
    s.addShape(p.ShapeType.roundRect, { x: 0.8, y, w: 11.7, h: 0.78, rectRadius: 0.08,
      fill: { color: "2E3A6B" }, line: { type: "none" } });
    badge(s, 1.0, y + 0.19, 0.4, i + 1, ACC, DARKT);
    s.addText(x[0], { x: 1.55, y: y + 0.06, w: 4.3, h: 0.66, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 14, bold: true, color: WHITE, valign: "middle" });
    s.addText(x[1], { x: 5.95, y: y + 0.06, w: 4.9, h: 0.66, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: "BFD3E6", valign: "middle" });
    s.addText(x[2], { x: 11.0, y: y + 0.06, w: 1.35, h: 0.66, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, bold: true, color: ACC, align: "right", valign: "middle" });
  });

  s.addText("Full detail: SYSTEM_DESIGN.md  ·  STRATEGY_FINDINGS.md  ·  research/", {
    x: 0.8, y: 6.85, w: 11.7, h: 0.3, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, italic: true, color: "8FA6C0" });

  s.addNotes(
`WHY THESE FIVE, AND WHY IN THIS ORDER.

Items 1 and 2 are ordered by DEADLINE and by DECISIVENESS respectively.

1. THE META CHANGE is first purely because it is five days away. Sources conflict on whether service replies inside the 24-hour window start costing money on 1 October 2026. Vendor analyses say yes; Meta's own documentation says the model is not changing. We cannot price a tier without knowing.

2. THE CUSTOMER CALLS are the most decisive thing on the list. They answer two questions at once: do enquiries arrive by message or by phone (which decides viability), and is the feasibility gap unoccupied because nobody thought of it or because customers do not care (which decides whether our main differentiator is real). Two days of work against months of building the wrong thing.

3. THE SHOPIFY QUESTION is one email and could remove 4-8 weeks from launch. Best return on effort on the list.

4. INSTRUMENTING RATE-CARD REVIEW TIME validates or kills the 15-minute onboarding target, which the research identifies as the biggest adoption risk. Two weeks of work for the single most valuable number we could generate.

5. THE LEGAL OPINION is last because it is external and slow, but it is load-bearing: no source found answers whether owner approval changes the legal character of an automated quote. The whole design leans on that gate.

THE META-POINT TO CLOSE ON: the research contradicted the plan in four places and corrected one of my own stated justifications. Research that only confirms your plan is not worth commissioning. These five items are cheap, and every one of them can still change the design.

HOW THIS SLIDE IS BUILT, AND WHY
Dark again, closing the bookend that the title slide opened. The audience registers that the deck has ended without being told.
Five rows, each a slightly lighter panel on the dark background, numbered in amber. Panels rather than plain bullets because these are commitments, and they should look like items that can be assigned and ticked off.
The right-hand column gives a duration for each - this week, 2 days, 1 email, 2 weeks, external. Putting the cost next to the action is what makes the list feel actionable rather than aspirational. Four of the five are trivially cheap, and that is the argument for doing them before building.
The heading says BEFORE WRITING MORE CODE. It is the instruction, so it goes at the top in the accent colour rather than being buried in a bullet.
The file names sit at the bottom in small italic. Anyone who wants the detail knows where to go, and it keeps the slide from being a dead end.`);
}

p.writeFile({ fileName: "C:/Users/hussn/Documents/rivon/deck/Rivon_System_Design_Review_v2.pptx" })
  .then(f => console.log("WROTE", f));
