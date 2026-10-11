const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
p.author = "Rivon";
p.title = "Unified AI Customer Agent Platform - Product & System Overview";

const NAVY="21295C", DEEP="065A82", TEAL="1C7293", ACC="F2A104";
const OK="2E8B57", BAD="B23A48", WHITE="FFFFFF", LIGHT="F4F7FA";
const GREY="5A6B7B", DARK="1A2733", PANEL="2E3A6B", MUTE="8FA6C0";
const HEAD="Cambria", BODY="Calibri";
const SW=13.333, SH=7.5;

function dark(){ const s=p.addSlide(); s.background={color:NAVY}; return s; }
function slide(title, kicker){
  const s=p.addSlide(); s.background={color:WHITE};
  if(kicker) s.addText(kicker.toUpperCase(),{x:0.6,y:0.3,w:12.1,h:0.24,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:10.5,bold:true,color:TEAL,charSpacing:2});
  s.addText(title,{x:0.6,y:kicker?0.56:0.45,w:12.1,h:0.62,isTextBox:true,margin:0,
    fontFace:HEAD,fontSize:28,bold:true,color:NAVY});
  return s;
}
function card(s,x,y,w,h,fill,line){
  s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:0.07,fill:{color:fill},
    line: line?{color:line,width:1}:{type:"none"}});
}
function box(s,x,y,w,h,fill,txt,fs,txtC,bold){
  s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:0.07,fill:{color:fill},line:{type:"none"}});
  s.addText(txt,{x,y,w,h,isTextBox:true,margin:0,fontFace:BODY,fontSize:fs||11,
    bold:bold!==false,color:txtC||WHITE,align:"center",valign:"middle"});
}
function badge(s,x,y,d,n,fill,tc){
  s.addShape(p.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:fill},line:{type:"none"}});
  s.addText(String(n),{x,y,w:d,h:d,isTextBox:true,margin:0,fontFace:BODY,
    fontSize:d>0.4?13:10,bold:true,color:tc||WHITE,align:"center",valign:"middle"});
}
function aR(s,x,y,w,c){ s.addShape(p.ShapeType.rightArrow,{x,y,w,h:0.2,fill:{color:c||"AAB8C4"},line:{type:"none"}}); }
function aD(s,x,y,h,c){ s.addShape(p.ShapeType.downArrow,{x,y,w:0.26,h,fill:{color:c||"AAB8C4"},line:{type:"none"}}); }
// evidence footer band
function why(s,text,color){
  card(s,0.6,6.62,12.1,0.62,color||LIGHT, color?null:"DCE5EE");
  s.addText(text,{x:0.85,y:6.62,w:11.6,h:0.62,isTextBox:true,margin:0,fontFace:BODY,
    fontSize:10.5,color:color?WHITE:DARK,valign:"middle"});
}

/* 1 TITLE */
{
  const s=dark();
  s.addShape(p.ShapeType.ellipse,{x:9.9,y:-1.6,w:5.6,h:5.6,fill:{color:DEEP},line:{type:"none"}});
  s.addShape(p.ShapeType.ellipse,{x:11.4,y:4.7,w:3.2,h:3.2,fill:{color:TEAL},line:{type:"none"}});
  s.addText("PRODUCT & SYSTEM OVERVIEW",{x:0.8,y:1.45,w:9,h:0.3,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:12,bold:true,color:ACC,charSpacing:2});
  s.addText("Unified AI Customer\nAgent Platform",{x:0.8,y:1.85,w:9,h:1.8,isTextBox:true,margin:0,
    fontFace:HEAD,fontSize:40,bold:true,color:WHITE,lineSpacing:46});
  s.addText("What we are building, how it is put together, and why each decision was made",
    {x:0.8,y:3.75,w:8.8,h:0.4,isTextBox:true,margin:0,fontFace:BODY,fontSize:15,italic:true,color:"BFD3E6"});
  const t=[["13","modules"],["~25","tables"],["4","queues"],["2","tenant modes"]];
  t.forEach((v,i)=>{const x=0.8+i*2.15;
    s.addText(v[0],{x,y:4.6,w:2,h:0.6,isTextBox:true,margin:0,fontFace:HEAD,fontSize:32,bold:true,color:ACC});
    s.addText(v[1],{x,y:5.2,w:2,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:"BFD3E6"});});
  s.addText("Every design decision in this deck carries its evidence.  Sources: 4 research threads, ~340 sources.",
    {x:0.8,y:6.5,w:11,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,italic:true,color:MUTE});
  s.addNotes(`WHAT THIS DECK IS: a walkthrough of the system we are building - the modules, the data, the flows, the technology - with the justification for each decision attached to the decision itself.

HOW TO USE IT: sections are (1) what the product does, (2) architecture, (3) module by module, (4) the flows, (5) data, (6) stack and delivery. Each slide carries a WHY band at the bottom with the evidence behind the choice on that slide.

WHY EVIDENCE ON EVERY SLIDE: the original plan was built on untested assumptions. Four research threads tested them and contradicted four. So from here every structural decision states what it rests on. If the evidence changes, the decision is reopened.

HOW THIS SLIDE IS BUILT: dark bookend matching the closing slide. The four counts give the shape of the system before any detail - thirteen modules, twenty-five tables, four queues, two modes. If someone only sees this slide they still know the scale.`);
}

/* 2 WHAT IT DOES */
{
  const s=slide("What the product does","Overview");
  s.addText("A small business connects their messaging channels. From then on their customers are handled by an AI agent that is grounded in the business's real data - and a human stays in control of anything that matters.",
    {x:0.6,y:1.35,w:12.1,h:0.6,isTextBox:true,margin:0,fontFace:BODY,fontSize:14,color:DARK});

  const c=[["Customer messages","WhatsApp, Instagram,\nMessenger, web widget",TEAL],
           ["Agent understands","Intent, details, what is\nstill missing",TEAL],
           ["System checks reality","Parts, crew, area, stock -\nnot a guess",ACC],
           ["Owner approves","Nothing reaches a customer\nunapproved",ACC],
           ["Loop closes","Rating, ticket, repeat\nbusiness",DEEP]];
  c.forEach((v,i)=>{const x=0.6+i*2.48;
    card(s,x,2.15,2.28,1.85,LIGHT,"C9D6E2");
    badge(s,x+0.18,2.32,0.38,i+1,v[2],v[2]===ACC?DARK:WHITE);
    s.addText(v[0],{x:x+0.18,y:2.8,w:1.95,h:0.34,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,bold:true,color:NAVY});
    s.addText(v[1],{x:x+0.18,y:3.14,w:1.95,h:0.72,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,color:DARK});
    if(i<4) aR(s,x+2.3,2.98,0.14);});

  s.addText("TWO KINDS OF BUSINESS, ONE SYSTEM",{x:0.6,y:4.3,w:12.1,h:0.28,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:10.5,bold:true,color:TEAL,charSpacing:1.5});
  card(s,0.6,4.65,5.9,1.75,LIGHT,OK);
  s.addText("SERVICE BUSINESS",{x:0.85,y:4.8,w:4,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,bold:true,color:OK});
  s.addText("Pest control, cleaning, removals.\nThe agent qualifies the job, checks the business can do it, prices it from their rate card, and the owner approves before it is sent.",
    {x:0.85,y:5.12,w:5.4,h:1.15,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:DARK});
  card(s,6.8,4.65,5.9,1.75,WHITE,"DCE5EE");
  s.addText("PRODUCT BUSINESS",{x:7.05,y:4.8,w:4,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,bold:true,color:GREY});
  s.addText("Online and offline retail.\nThe agent searches their real catalogue, checks live stock, builds a cart, places orders and handles delivery, cancellation and refunds.",
    {x:7.05,y:5.12,w:5.4,h:1.15,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:DARK});

  why(s,"WHY SERVICE FIRST:  nothing in 20 products examined checks parts, crew and area before quoting (confirmed by absence, two independent threads).  Product mode's common case became free in June 2026 when Meta shipped an agent inside WhatsApp.");
  s.addNotes(`WHAT THE PRODUCT IS, IN ONE SENTENCE: an AI agent that talks to a small business's customers, grounded in that business's real data, with a human approving anything that commits the business.

WHY THE FIVE-STEP STRIP: it is the same shape for both kinds of business. Understand, check reality, get approval, close the loop. Only the middle step differs.

WHY "CHECKS REALITY" IS AMBER: that is the differentiator. Competitors answer questions or calculate prices. None of them checks whether the business can actually do the job.

WHY SERVICE MODE LEADS: four independent reasons. (1) The feasibility gap is unoccupied. (2) Meta launched a free AI agent inside WhatsApp in June 2026 covering product mode's common case. (3) Product mode faces dozens of funded competitors. (4) A quote is worth hundreds or thousands to an installer; a parcel enquiry is worth a few euros to a shop.

HOW THIS SLIDE IS BUILT: strip on top for the universal flow, then two boxes for the two modes. The service box is outlined green because it is what we build first; the product box is plain because it is phase two. Colour carries the sequencing so the words do not have to.`);
}

/* 3 ARCHITECTURE */
{
  const s=slide("System architecture","Architecture");

  // people
  box(s,0.6,1.3,2.4,0.48,DEEP,"Customer",11);
  box(s,3.2,1.3,2.4,0.48,DEEP,"Business owner",11);
  box(s,5.8,1.3,2.4,0.48,DEEP,"Staff",11);

  // edge
  card(s,0.6,2.0,12.1,0.92,LIGHT,"C9D6E2");
  s.addText("EDGE",{x:0.8,y:2.08,w:1,h:0.22,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,bold:true,color:GREY,charSpacing:1});
  box(s,0.85,2.32,3.4,0.48,TEAL,"Channel webhooks   verify \u00B7 persist \u00B7 enqueue \u00B7 200",9.5);
  box(s,4.45,2.32,3.4,0.48,TEAL,"REST API   FastAPI",9.5);
  box(s,8.05,2.32,4.4,0.48,TEAL,"Dashboard   Next.js on Vercel",9.5);

  aD(s,6.5,2.98,0.26);

  // queues
  card(s,0.6,3.32,12.1,0.82,LIGHT,"C9D6E2");
  s.addText("QUEUES \u2014 Celery, split by workload class",{x:0.8,y:3.38,w:5,h:0.22,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:9,bold:true,color:GREY,charSpacing:1});
  const q=[["inbound","customer waiting"],["ai","slow, rate-limited"],["outbound","per-tenant limits"],["scheduled","rollups, triggers"]];
  q.forEach((v,i)=>{const x=0.85+i*2.95;
    box(s,x,3.62,2.8,0.42,DEEP,v[0]+"   \u00B7   "+v[1],9);});

  aD(s,6.5,4.2,0.26);

  // core
  card(s,0.6,4.54,12.1,1.35,NAVY,null);
  s.addText("APPLICATION CORE \u2014 one FastAPI deployable, hard module boundaries",
    {x:0.85,y:4.62,w:8,h:0.24,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,bold:true,color:ACC,charSpacing:1});
  const mods=["platform","channels","conversations","business","catalog","contacts","feasibility",
              "quotations","orders","jobs","feedback","engagement","analytics"];
  mods.forEach((m,i)=>{
    const col=i%7, row=Math.floor(i/7);
    const x=0.85+col*1.72, y=4.92+row*0.45;
    box(s,x,y,1.62,0.37,row===0&&(i===4||i===6)?ACC:PANEL,m,8.5,row===0&&(i===4||i===6)?DARK:WHITE);
  });

  aD(s,6.5,5.95,0.24);
  // data
  box(s,2.6,6.25,3.9,0.42,TEAL,"PostgreSQL  +  row-level security",10);
  box(s,6.8,6.25,3.9,0.42,TEAL,"Redis  \u2014  cache \u00B7 broker",10);

  why(s,"WHY A MODULAR MONOLITH:  peak load is ~20 requests/second. Microservices buy scaling we do not need and charge network failures, tracing and cross-service consistency. Any module can be extracted later - the interface already exists.",NAVY);
  s.addNotes(`THE STRUCTURE: people at the top, edge, queues, core, data. Reading down the slide is reading a request through the system.

DECISION 1 - CHANNELS ARE ADAPTERS, NOT THE APPLICATION. The webhook's only job is verify, persist, enqueue, return 200. No LLM call, no database join on that path. WHY: WhatsApp retries if you do not respond within seconds, and a slowly-processed webhook becomes a duplicate reply to a real customer. Consequence: the whole system must be demonstrable with no live WhatsApp connection.

DECISION 2 - FOUR QUEUES, SPLIT BY WORKLOAD CLASS, not one shared queue. WHY: a nightly analytics job must never sit in front of a customer's reply. Inbound is latency-sensitive, ai is slow and externally rate-limited, outbound is rate-limited per tenant, scheduled is batch.

DECISION 3 - ONE DEPLOYABLE, NOT MICROSERVICES. WHY: arithmetic. 200 tenants x 300 leads/month x ~12 messages is roughly 24,000 messages/day - well under 1 request/second average, ~20 peak. FastAPI on one modest instance handles that. Microservices would charge distributed-systems complexity for scaling we do not need.

DECISION 4 - STATE IN POSTGRES, NEVER IN WORKER MEMORY. Redis caches the last N conversation turns only. WHY: any worker must be able to pick up any turn of any conversation, which makes horizontal scaling a config change rather than a rewrite.

HOW THIS SLIDE IS BUILT: catalog and feasibility are amber in the module grid because they are the two modules that carry the differentiator. Everything else is uniform, so the eye lands on those two.`);
}

/* 4 THE 8 RULES */
{
  const s=slide("Eight architectural rules","Architecture");
  s.addText("These exist because breaking each one causes specific, known damage.",
    {x:0.6,y:1.25,w:12.1,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:13,italic:true,color:GREY});

  const r=[["1","Channels are adapters","Webhook does 4 things then returns 200. No LLM on that path.","A slow webhook becomes a duplicate reply to a real customer"],
    ["2","Not everything is AI","Pricing, feasibility, stock arithmetic, state transitions are all deterministic.","8 of 13 modules involve no AI at all - the answer to \u201Cisn't this a wrapper?\u201D"],
    ["3","Shared schema, never forks","tenant_id on every table. RLS as backstop. Config, not code.","A fork means two products and half the engineering time"],
    ["4","Modular monolith","One deployable, hard module boundaries by interface contract.","~20 req/s peak. Extraction path exists if ever needed"],
    ["5","Events via outbox","Postgres outbox + Celery. Not Kafka.","Keeps the merged halves from tangling"],
    ["6","State in Postgres","Redis caches hot turns only. Any worker picks up any turn.","Horizontal scaling becomes a config change"],
    ["7","Idempotency everywhere","Unique (tenant_id, provider_message_id). Dedupe key on every send.","A double-sent quotation is an account-losing bug"],
    ["8","Analytics off rollups","Dashboard reads precomputed tables only.","Analytics must never slow live operations"]];
  r.forEach((v,i)=>{
    const col=i%2, row=Math.floor(i/2);
    const x=0.6+col*6.2, y=1.68+row*1.22;
    card(s,x,y,5.95,1.1,row%2?LIGHT:WHITE,"DCE5EE");
    badge(s,x+0.16,y+0.15,0.34,v[0],TEAL);
    s.addText(v[1],{x:x+0.6,y:y+0.13,w:5.2,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,bold:true,color:NAVY});
    s.addText(v[2],{x:x+0.6,y:y+0.42,w:5.2,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,color:DARK});
    s.addText("\u2192 "+v[3],{x:x+0.6,y:y+0.72,w:5.2,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,italic:true,color:BAD});
  });
  s.addNotes(`WHY THESE ARE WRITTEN DOWN AS RULES: each one has a specific failure attached. The red line under each is the damage from breaking it. A rule without a named consequence gets negotiated away under deadline pressure.

RULE 2 IS THE MOST IMPORTANT COMMERCIALLY. Pricing must never be produced by a language model. The model writes prose around a number that deterministic code computed. Eight of thirteen modules involve no AI at all. Stating that explicitly is the best available answer to "isn't this just a wrapper around ChatGPT?"

RULE 3 IS THE MOST IMPORTANT ECONOMICALLY. The competitors we displace are the custom-build model - agencies charging per client. Building custom per client means inheriting their economics. Customisation happens through configuration stored as data, never through forked code.

RULE 7 IS THE MOST IMPORTANT OPERATIONALLY. Test it by deliberately replaying a webhook. A double-placed order or double-sent quotation loses the account.

HOW THIS SLIDE IS BUILT: two columns of four. Each card has three layers - the rule, how it works, and in red what breaks without it. The red line is the reason the rule survives review.`);
}

/* 5 MODULE MAP */
{
  const s=slide("Thirteen modules","Modules");
  const rows=[
    ["1","platform","Tenancy, auth, roles, plans, usage metering, audit log","Both",DEEP],
    ["2","channels","Provider adapters, inbound normalisation, outbound dispatcher with dedupe + DLQ","Both",DEEP],
    ["3","conversations","Turn router, intent, extraction, sentiment for routing, human handoff","Both",DEEP],
    ["4","business","Services, pricing rules, areas, parts, crews - tenant config as data","Service",TEAL],
    ["5","catalog","Catalogue ingestion behind one port; sync, reconciliation, search index","Product",ACC],
    ["6","contacts","The unified lead-and-customer record, scoring, derived metrics","Both",DEEP],
    ["7","feasibility","Service \u00B7 area \u00B7 parts \u00B7 crew \u00B7 size. Deterministic. ZERO LLM.","Service",ACC],
    ["8","quotations","Deterministic pricing, LLM narrative, approval workflow, PDF","Service",TEAL],
    ["9","orders","Cart, order placement, fulfilment, delivery, cancellation, refunds","Product",TEAL],
    ["10","jobs","Accepted quotation becomes a job. Parts reserved, crew allocated","Service",TEAL],
    ["11","feedback","Rating trigger, 1-5 capture, branching actions, tickets","Both",DEEP],
    ["12","engagement","Campaigns, coupons, loyalty, referrals, suppression guardrails","Both",GREY],
    ["13","analytics","Precomputed daily rollups - the only thing the dashboard reads","Both",DEEP]];
  rows.forEach((v,i)=>{
    const y=1.28+i*0.42;
    card(s,0.6,y,12.1,0.37,i%2?LIGHT:WHITE,null);
    badge(s,0.72,y+0.05,0.27,v[0],v[4],v[4]===ACC?DARK:WHITE);
    s.addText(v[1],{x:1.1,y:y+0.03,w:1.9,h:0.31,isTextBox:true,margin:0,fontFace:BODY,fontSize:11.5,bold:true,color:NAVY,valign:"middle"});
    s.addText(v[2],{x:3.05,y:y+0.03,w:8.0,h:0.31,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,color:DARK,valign:"middle"});
    s.addText(v[3],{x:11.2,y:y+0.03,w:1.4,h:0.31,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,bold:true,
      color:v[3]==="Both"?GREY:(v[3]==="Service"?OK:TEAL),align:"right",valign:"middle"});
  });
  s.addText("Amber = carries the differentiator.   Each module owns its tables; nothing reaches into another module's tables.",
    {x:0.6,y:6.85,w:12.1,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:10.5,italic:true,color:DEEP});
  s.addNotes(`WHY MODULES OWN THEIR TABLES: the boundary is enforced by interface contract, not convention. Nothing reaches into another module's tables. That is what makes the monolith modular rather than merely large, and it is what gives us an extraction path later if load ever justifies it.

WHY THIRTEEN AND NOT FIVE OR FIFTY: modules follow the natural seams of the domain. Each owns one concern and a small set of tables. Two of them - catalog and feasibility - carry the commercial differentiator, which is why they are amber.

THE MODE COLUMN MATTERS: six modules are shared by both kinds of business, four are service-only, two are product-only. That is the evidence for one platform rather than two products - roughly half the system is common.

BUT AN HONEST CAVEAT the research raised: the shared modules are the CHEAP ones. The expensive, valuable ones - feasibility and quotations on one side, catalog and orders on the other - share almost nothing. That is why product mode is phase two rather than a co-equal half.

MODULE 12, ENGAGEMENT, IS GREY: it is designed but deliberately last. Outbound marketing is the expensive traffic and carries the heaviest consent rules in every target market.`);
}

/* 6 SERVICE FLOW */
{
  const s=slide("Service mode: enquiry to approved quote","Core flow");

  const st=[["Customer\nmessages",TEAL],["AI disclosure\nlogged",DEEP],["Qualify -\nask only what\nis missing",TEAL],
            ["Extract to\nstructured\nschema",TEAL],["Score\nthe lead",DEEP]];
  st.forEach((v,i)=>{const x=0.6+i*2.48;
    box(s,x,1.3,2.25,0.85,v[1],v[0],10);
    if(i<4) aR(s,x+2.28,1.66,0.16);});

  aD(s,6.5,2.22,0.28);

  // feasibility fan
  card(s,0.6,2.58,12.1,1.3,LIGHT,ACC);
  s.addText("FEASIBILITY \u2014 deterministic rules, zero LLM, each returns a REASON",
    {x:0.85,y:2.66,w:8,h:0.26,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,bold:true,color:DARK,charSpacing:1});
  const f=["service\nmatch","area\nmatch","parts\nsufficient","crew\navailable","size in\nbounds"];
  f.forEach((v,i)=>{const x=0.9+i*2.38;
    box(s,x,2.98,2.2,0.76,ACC,v,10,DARK);});

  // two outcomes
  s.addShape(p.ShapeType.downArrow,{x:3.3,y:3.94,w:0.26,h:0.28,fill:{color:OK},line:{type:"none"}});
  s.addShape(p.ShapeType.downArrow,{x:9.6,y:3.94,w:0.26,h:0.28,fill:{color:BAD},line:{type:"none"}});

  card(s,0.6,4.3,5.9,2.1,LIGHT,OK);
  s.addText("PASSES",{x:0.85,y:4.4,w:2,h:0.26,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,bold:true,color:OK,charSpacing:1});
  const pass=["Price computed from rate card \u2014 CODE, not the model",
    "LLM writes the covering narrative only",
    "Draft quotation + PDF built",
    "OWNER APPROVES on their phone \u2014 mandatory gate",
    "Sent to customer \u2192 accepted \u2192 becomes a job"];
  pass.forEach((t,i)=>{
    s.addShape(p.ShapeType.ellipse,{x:0.9,y:4.78+i*0.31,w:0.14,h:0.14,fill:{color:i===3?ACC:OK},line:{type:"none"}});
    s.addText(t,{x:1.15,y:4.72+i*0.31,w:5.2,h:0.28,isTextBox:true,margin:0,fontFace:BODY,
      fontSize:10,bold:i===3,color:i===3?NAVY:DARK,valign:"middle"});});

  card(s,6.8,4.3,5.9,2.1,"F7EDEE",BAD);
  s.addText("FAILS",{x:7.05,y:4.4,w:2,h:0.26,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,bold:true,color:BAD,charSpacing:1});
  const fail=["Structured reasons returned, never a bare no",
    "ROUTED TO THE OWNER \u2014 never auto-closed",
    "Owner may override and quote anyway",
    "If declined: a non-final outcome, not a closed door",
    "Documented route to a human review"];
  fail.forEach((t,i)=>{
    s.addShape(p.ShapeType.ellipse,{x:7.1,y:4.78+i*0.31,w:0.14,h:0.14,fill:{color:i===1?BAD:GREY},line:{type:"none"}});
    s.addText(t,{x:7.35,y:4.72+i*0.31,w:5.2,h:0.28,isTextBox:true,margin:0,fontFace:BODY,
      fontSize:10,bold:i===1,color:i===1?NAVY:DARK,valign:"middle"});});

  why(s,"WHY NO TERMINAL AUTO-REJECTION:  an automated decision that rejects a person with no human involved is the shape the law catches. The original design had \u201Cnot feasible \u2192 lead closed\u201D. That path is removed.");
  s.addNotes(`THIS IS THE CORE OF THE PRODUCT. Everything else supports this flow.

DECISION - FEASIBILITY IS DETERMINISTIC AND RETURNS REASONS, not a boolean. WHY, two reasons: the owner needs to know why a job was flagged, and the law requires that an automated adverse outcome be explainable and reviewable.

DECISION - THE PRICE IS COMPUTED BY CODE. The model writes prose around it. WHY: whole-document extraction accuracy is 28-77%, and 46.89% of table-reading errors still produce a plausible-looking answer, so the failure is silent. And a quoted price binds - Sweden caps overrun at 15% by statute, a Toronto dealership paid roughly 27,000 dollars on an AI-quoted price in 2026, and Moffatt v Air Canada rejected the defence that the chatbot was a separate agent.

DECISION - OWNER APPROVAL IS MANDATORY. WHY, from three directions: competitively, the closest European competitor appears to send quotes automatically with no gate. Legally, a human approver means the decision is not "solely automated". Practically, it is the only defence against a silent wrong number.

DECISION - THE FAILURE BRANCH ROUTES TO THE OWNER. WHY: the original activity diagram had not-feasible leading to lead-closed. That is a terminal automated rejection of a person, which is exactly the shape the law catches. It is now either an owner decision or a non-final outcome with a route to a human.

HOW THIS SLIDE IS BUILT: linear across the top, then the feasibility fan in amber because it is the differentiator, then the flow splits into two outcome columns. Green and red columns are the same size deliberately - the failure path got as much design attention as the success path, which is unusual and worth pointing out.`);
}

/* 7 FEASIBILITY DETAIL */
{
  const s=slide("The feasibility engine","Differentiator");
  s.addText("The single thing no examined competitor does: checking whether the business can actually do the job, before pricing it.",
    {x:0.6,y:1.22,w:12.1,h:0.32,isTextBox:true,margin:0,fontFace:BODY,fontSize:13,italic:true,color:GREY});

  const chk=[["Service match","Do they offer this work at all?","services table"],
    ["Area match","Is the customer inside the area covered?","service_areas"],
    ["Parts sufficient","Are the parts in stock for this job?","inventory_items"],
    ["Crew available","Is there a team free in the window?","workforce"],
    ["Size in bounds","Is the job within min and max they handle?","businesses"]];
  chk.forEach((v,i)=>{const y=1.68+i*0.72;
    card(s,0.6,y,7.6,0.64,i%2?LIGHT:WHITE,"DCE5EE");
    badge(s,0.78,y+0.14,0.36,i+1,ACC,DARK);
    s.addText(v[0],{x:1.28,y:y+0.05,w:2.2,h:0.54,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,bold:true,color:NAVY,valign:"middle"});
    s.addText(v[1],{x:3.5,y:y+0.05,w:3.3,h:0.54,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,color:DARK,valign:"middle"});
    s.addText(v[2],{x:6.85,y:y+0.05,w:1.25,h:0.54,isTextBox:true,margin:0,fontFace:BODY,fontSize:8.5,italic:true,color:TEAL,align:"right",valign:"middle"});});

  card(s,8.45,1.68,4.25,3.56,NAVY,null);
  s.addText("WHY THIS CANNOT BE FAKED",{x:8.7,y:1.82,w:3.8,h:0.28,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:10,bold:true,color:ACC,charSpacing:1});
  s.addText("A language model can write a convincing quote. It cannot know that Team B is booked on Thursday, or that there are 12 units left in the van.\n\nThat requires the business's live operational state - modelled, stored and queried.\n\nThat is why it is the differentiator, and why it is deterministic code rather than a prompt.",
    {x:8.7,y:2.2,w:3.8,h:2.9,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:WHITE});

  card(s,0.6,5.38,12.1,1.06,LIGHT,ACC);
  s.addText("THE OPERATIONAL WARNING",{x:0.85,y:5.46,w:4,h:0.26,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:9.5,bold:true,color:BAD,charSpacing:1});
  s.addText("The most likely source of a bad customer experience is not a slightly wrong price - it is a booked crew that does not exist or a promised part that is not on the van.  Volatile data is never asserted without a live source; the agent degrades to \u201Clet me confirm\u201D and escalates.",
    {x:0.85,y:5.72,w:11.6,h:0.62,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:DARK});

  why(s,"EVIDENCE:  confirmed by absence across every product examined, in two independent research threads.  Caveat carried honestly - an empty column can mean nobody thought of it, or that customers did not care. Validation calls will tell us which.");
  s.addNotes(`WHY THIS MODULE EXISTS AT ALL: it is the reason to build this rather than buy an existing chatbot. Two independent research threads examined roughly twenty products between them and found nothing that checks parts, crew and area before producing a price. The quoting tools produce prices but hold no conversation. The conversation tools hold conversations but produce no prices. Nothing bridges it.

WHY DETERMINISTIC AND NOT AI: the check must be reproducible and auditable. When a customer disputes an outcome six weeks later, "the rules said no because Team B was booked" is defensible. "The model decided" is not.

WHY EACH CHECK RETURNS A REASON: the owner needs to act on it, and the law requires an automated adverse outcome to be explainable. A bare false is useless to both.

WHY CLEANING IS THE BEST FIRST VERTICAL FOR THIS: crew availability is the genuine binding constraint in cleaning, which means the feasibility check is load-bearing rather than decorative. In some trades the check would be a nice-to-have. There it decides whether the job can be taken.

THE HONEST CAVEAT, and it should be said out loud: absence of a feature in competitors is not proof of demand. Nobody may have thought of it, or everybody may have tried it and found customers did not care. Desk research cannot distinguish those. That is what the validation calls are for.

HOW THIS SLIDE IS BUILT: five checks listed on the left with the table each reads from, and the "cannot be faked" argument in a dark panel on the right. The dark panel is the sales pitch; the list is the engineering. The amber warning band at the bottom is deliberately the last thing read, because over-promising on stock and crew is how this feature would damage trust rather than build it.`);
}

/* 8 PRICING BOUNDARY */
{
  const s=slide("How pricing works","Core rule");
  card(s,0.6,1.25,12.1,0.6,NAVY,null);
  s.addText("The language model never produces a number. Code computes it from structured data a human approved.",
    {x:0.85,y:1.25,w:11.6,h:0.6,isTextBox:true,margin:0,fontFace:BODY,fontSize:13.5,bold:true,color:WHITE,valign:"middle"});

  const st=[["Documents\nuploaded",GREY],["AI drafts\nrate card",TEAL],["OWNER\nCONFIRMS",ACC],
            ["Code computes\nthe price",DEEP],["LLM writes\nprose only",TEAL],["OWNER\nAPPROVES",ACC]];
  st.forEach((v,i)=>{const x=0.6+i*2.1;
    box(s,x,2.05,1.8,0.92,v[1],v[0],10.5,v[1]===ACC?DARK:WHITE);
    if(i<5) aR(s,x+1.85,2.42,0.18);});
  s.addText("SETUP  \u2014  once, ~15 minutes",{x:0.6,y:3.04,w:4,h:0.24,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:9,bold:true,color:GREY,charSpacing:1});
  s.addText("EVERY QUOTE  \u2014  deterministic, versioned, auditable",{x:6.9,y:3.04,w:5.6,h:0.24,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:9,bold:true,color:GREY,charSpacing:1});

  s.addText("WHAT RETRIEVAL IS AND IS NOT ALLOWED TO DO",{x:0.6,y:3.5,w:12.1,h:0.26,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:10,bold:true,color:TEAL,charSpacing:1.5});
  card(s,0.6,3.82,5.9,1.5,LIGHT,OK);
  s.addText("ALLOWED",{x:0.85,y:3.92,w:2,h:0.24,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,bold:true,color:OK,charSpacing:1});
  s.addText("Service descriptions \u00B7 policies \u00B7 FAQs \u00B7 opening hours \u00B7 what is included \u00B7 guarantees\n\nAnything that is prose and does not become a number.",
    {x:0.85,y:4.18,w:5.4,h:1.05,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:DARK});
  card(s,6.8,3.82,5.9,1.5,"F7EDEE",BAD);
  s.addText("NEVER",{x:7.05,y:3.92,w:2,h:0.24,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,bold:true,color:BAD,charSpacing:1});
  s.addText("Prices \u00B7 rates \u00B7 minimums \u00B7 callout fees \u00B7 multipliers \u00B7 stock levels \u00B7 availability\n\nAnything that commits the business to a number.",
    {x:7.05,y:4.18,w:5.4,h:1.05,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:DARK});

  const ev=[["28-77%","whole-document\nextraction accuracy",BAD],["46.89%","of table errors still\nlook correct",BAD],
            ["15%","Swedish statutory cap\non quote overrun",DEEP],["~$27k","paid by a dealership on\nan AI-quoted price",BAD]];
  ev.forEach((v,i)=>{const x=0.6+i*3.1;
    card(s,x,5.5,2.9,1.0,WHITE,"DCE5EE");
    s.addText(v[0],{x:x+0.18,y:5.58,w:2.5,h:0.45,isTextBox:true,margin:0,fontFace:HEAD,fontSize:22,bold:true,color:v[2]});
    s.addText(v[1],{x:x+0.18,y:6.02,w:2.5,h:0.42,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,color:DARK});});

  why(s,"\u201CThe model generates text \u2014 it does not enforce policy.\u201D   OWASP RAG guidance.  A retrieved chunk cannot express a rule: minimums, callout fees, out-of-hours multipliers, travel bands.");
  s.addNotes(`THE DECISION: retrieval may read documents during SETUP. It may never produce a price at RUNTIME.

WHY THE RULE EXISTS - six reasons in order of force.
1. The failure mode is SILENT. 46.89% of table-reading errors still produce plausible answers, so reviewing outputs cannot catch it.
2. Wrong numbers land in the legally UNESCAPABLE band. The obvious-error escape only covers absurd figures. A 1 euro boiler is escapable; 340 euros for a 480 euro job is not - plausible, accepted in good faith, binding.
3. It is adversarially steerable. A dealership chatbot was prompt-injected into selling a vehicle for a dollar.
4. A retrieved chunk cannot express a RULE - minimums, callout fees, out-of-hours multipliers, travel bands.
5. No versioning or effective dates, so it rots silently.
6. Non-reproducible. Six weeks later, "the retriever returned this chunk" is not an audit trail.

WHY WE DID NOT OVER-CORRECT: the rule bans the model from producing the number. It does not ban documents from onboarding. Extraction into an owner-confirmed rate card fully honours the rule - a human approved the structured data the code computes from.

AN IMPORTANT CORRECTION TO AN EARLIER VERSION OF THIS ARGUMENT: we originally justified this rule by pointing at AI regulation. That was wrong - the relevant annex covers pricing only for life and health insurance. The real exposure is ordinary contract and consumer law, which is LARGER. The rule stands; the justification is replaced. A correct rule resting on a bad argument gets relaxed the first time somebody checks it.

HOW THIS SLIDE IS BUILT: rule at the top, pipeline in the middle with the two human steps in amber, then an explicit allowed-versus-never split, then the evidence. The allowed column matters as much as the never column - it stops the rule being read as "no AI anywhere".`);
}

/* 9 ONBOARDING */
{
  const s=slide("Onboarding: the biggest adoption risk","Setup");
  card(s,0.6,1.25,5.85,1.15,BAD,null);
  s.addText("42%",{x:0.85,y:1.32,w:1.6,h:0.6,isTextBox:true,margin:0,fontFace:HEAD,fontSize:32,bold:true,color:WHITE});
  s.addText("of surveyed users of a major field-service product still had NO working price book after three months.",
    {x:2.5,y:1.35,w:3.75,h:0.95,isTextBox:true,margin:0,fontFace:BODY,fontSize:10.5,color:WHITE,valign:"middle"});
  card(s,6.85,1.25,5.85,1.15,OK,null);
  s.addText("15 min",{x:7.1,y:1.34,w:2.1,h:0.55,isTextBox:true,margin:0,fontFace:HEAD,fontSize:28,bold:true,color:WHITE});
  s.addText("our target to first quote, live on 3-5 services. Achievable only where rate cards are short.",
    {x:9.25,y:1.35,w:3.25,h:0.95,isTextBox:true,margin:0,fontFace:BODY,fontSize:10.5,color:WHITE,valign:"middle"});

  const q=[["1","Industry template","Pre-priced defaults for the trade. Owner CORRECTS rather than creates.","Works when there is no document at all - a callout fee often lives in the owner's head"],
    ["2","Import existing","CSV, accounting tools, another product.","Best data quality, narrowest reach"],
    ["3","Document upload","AI drafts the rate card from their PDF. Owner confirms.","~10-15 min of review on a 40-line card. Promise that, not \u201Cseconds\u201D"],
    ["4","Go live on 3-5","Escalate real gaps mid-conversation instead of waiting for completeness.","No product found does this. A real gap beats an empty form field"]];
  q.forEach((v,i)=>{const y=2.6+i*1.02;
    card(s,0.6,y,12.1,0.9,i===0?LIGHT:WHITE,i===0?ACC:"DCE5EE");
    badge(s,0.78,y+0.26,0.38,v[0],i===0?ACC:TEAL,i===0?DARK:WHITE);
    s.addText(v[1],{x:1.3,y:y+0.08,w:2.3,h:0.74,isTextBox:true,margin:0,fontFace:BODY,fontSize:12.5,bold:true,color:NAVY,valign:"middle"});
    s.addText(v[2],{x:3.65,y:y+0.08,w:4.3,h:0.74,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,color:DARK,valign:"middle"});
    s.addText(v[3],{x:8.1,y:y+0.08,w:4.4,h:0.74,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,italic:true,color:DEEP,valign:"middle"});});

  why(s,"WHY TEMPLATE FIRST:  a pre-priced industry library is the only mechanism found that collapses pricing setup from months to a day without bespoke human labour. One product ships ~8,500 maintained tasks covering >90% of common repairs.");
  s.addNotes(`WHY THIS IS THE BIGGEST RISK TO THE WHOLE PRODUCT: the agent cannot compute a price without a rate card loaded, and loading a rate card is precisely the task that makes tradespeople abandon software. The consistently cited reason is that three afternoons building price books is selling time gone, and the software is already too expensive before the monthly fee hits the card.

THE RESEARCH CORRECTED AN ASSUMPTION WE HELD: we assumed trades do not buy software. Wrong. Jobber, Tradify, ServiceM8 and Housecall Pro are substantial self-serve businesses selling to exactly this customer, and a Nordic investor paid 550 million NOK for trades marketplaces in December 2025. Acquisition is not the problem. RETENTION is, and retention fails at onboarding.

WHY TEMPLATE BEFORE UPLOAD, which is the opposite of the intuitive order: extraction cannot help when there is no document. An owner's callout fee often lives in their head, not on paper. A pre-filled form captures that; a parser cannot.

WHY STEP 4 IS OUR INVENTION: no product was found that goes live on a partial rate card and escalates gaps inside a live conversation. It is also the best-motivated - a real gap encountered while a customer is waiting beats an empty form field on a setup screen.

PROMISE HONESTLY: 10 to 15 minutes of careful review, not "done in seconds". Over-promising here is its own abandonment risk.

THE LINK TO VERTICALS: pest control and cleaning have short, already-fixed rate cards. HVAC and general building have enormous ones. Vertical choice and onboarding feasibility are the same decision.`);
}

/* 10 CATALOGUE PORTS */
{
  const s=slide("Product mode: connecting the catalogue","Product mode");
  box(s,4.6,1.22,4.1,0.46,NAVY,"Agent tools",11.5);
  aD(s,6.5,1.73,0.26);
  box(s,3.4,2.05,6.5,0.52,DEEP,"CatalogPort  \u00B7  OrdersPort      the standardised contract",11.5);
  aD(s,6.5,2.62,0.24);
  box(s,4.0,2.9,5.3,0.46,TEAL,"Read model \u2014 ALWAYS queried here",10.5);

  const ad=[["No platform","sheet / CSV upload","BUILD 1st",OK,"~23% of small EU firms have no website at all"],
    ["Shopify","OAuth, 2 clicks","BUILD 2nd",OK,"30-47% of shops per target country"],
    ["WooCommerce","wc-auth endpoint, 2-4 clicks","BUILD 3rd",OK,"25-36%, beats Shopify in IE, NL, DK"],
    ["Odoo","paywalled API","DROPPED",BAD,"0.4% of market, 1 call/sec, expires 2027"]];
  ad.forEach((v,i)=>{const x=0.6+i*3.1;
    const dr=v[3]===BAD;
    card(s,x,3.6,2.9,2.15,dr?"F7EDEE":LIGHT,dr?BAD:"C9D6E2");
    s.addText(v[0],{x:x+0.18,y:3.74,w:2.55,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:13,
      bold:true,color:dr?BAD:NAVY,strike:dr});
    s.addText(v[1],{x:x+0.18,y:4.06,w:2.55,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,color:GREY});
    box(s,x+0.18,4.4,1.35,0.28,v[3],v[2],8.5);
    s.addText(v[4],{x:x+0.18,y:4.78,w:2.55,h:0.85,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,color:DARK});});

  card(s,0.6,5.9,12.1,0.6,LIGHT,"DCE5EE");
  s.addText("Shopify + WooCommerce = 66-72% of shops in every target country.   The no-platform fallback reaches the businesses nobody else can serve.",
    {x:0.85,y:5.9,w:11.6,h:0.6,isTextBox:true,margin:0,fontFace:BODY,fontSize:11.5,bold:true,color:DEEP,valign:"middle"});

  why(s,"WHY ODOO WAS DROPPED:  its own docs state external API access is unavailable on Free and Standard plans - the merchant must roughly double their per-user bill to connect. Odoo is not more steps; it contains a purchase decision.");
  s.addNotes(`THE DECISION: ports and adapters. The same rule that makes WhatsApp an adapter makes Shopify one.

WHY: the agent calls search_products(tenant, query). It never knows Shopify exists. Adding a platform becomes contained work rather than a redesign. THE INTERFACE IS THE PRODUCT; THE ADAPTERS ARE INVENTORY. That is what makes this SaaS rather than consulting.

WHY THE NO-PLATFORM ADAPTER IS BUILT FIRST, which surprises people: it is the universal fallback so no tenant is ever un-onboardable; it forces the canonical product model to be defined before any external API shapes it; roughly 23% of small EU enterprises have no website at all, and an Instagram shop with stock in a spreadsheet is our ideal customer - structurally invisible to every app-store competitor; and it is the cheapest to build.

WHY THE READ MODEL IS ALWAYS THE QUERY PATH: consistent latency, identical behaviour across every source, and distance from third-party rate limits. Never call the platform mid-conversation - only at transaction time, plus one live stock check on the variant about to be bought.

THE HIGHEST-LEVERAGE ENGINEERING DETAIL ON THIS SLIDE: WooCommerce ships an authorise endpoint giving a near-OAuth flow - two clicks instead of seven fiddly admin steps with a one-time-only secret. That is what keeps a third of the market self-serve instead of support-heavy.

WHY ODOO STAYS VISIBLE THOUGH DROPPED: somebody will ask. A struck-out box answers before the question is asked.`);
}

/* 11 FRESHNESS */
{
  const s=slide("What the agent is allowed to promise","Data freshness");
  s.addText("No engineering makes a spreadsheet fresh. So the promise is managed instead of the data.",
    {x:0.6,y:1.22,w:12.1,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:13,italic:true,color:GREY});

  const b=[["< 24 hours","\u201CYes, that's in stock.\u201D","Can take payment",OK],
           ["< 2 weeks","\u201CLet me confirm that for you.\u201D","Reserve only",ACC],
           ["> 60 days","Stops asserting stock entirely","Escalate to owner",BAD]];
  b.forEach((v,i)=>{const y=1.68+i*1.12;
    card(s,0.6,y,12.1,0.98,WHITE,"DCE5EE");
    box(s,0.85,y+0.22,1.9,0.54,v[3],v[0],11);
    s.addText(v[1],{x:3.05,y:y+0.22,w:5.3,h:0.54,isTextBox:true,margin:0,fontFace:HEAD,fontSize:15,color:NAVY,valign:"middle"});
    s.addText(v[2],{x:8.6,y:y+0.22,w:3.9,h:0.54,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,bold:true,color:v[3],valign:"middle"});});

  const src=[["Shopify","webhooks + reconciliation","seconds"],["WooCommerce","webhooks + poll","minutes"],
             ["Custom API","scheduled poll","min\u2013hours"],["Sheet upload","owner re-uploads","DAYS"]];
  s.addText("HOW FRESH EACH SOURCE ACTUALLY IS",{x:0.6,y:5.1,w:12.1,h:0.26,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:10,bold:true,color:TEAL,charSpacing:1.5});
  src.forEach((v,i)=>{const x=0.6+i*3.1;
    card(s,x,5.42,2.9,0.95,i===3?"FDF3E3":LIGHT,i===3?ACC:"DCE5EE");
    s.addText(v[0],{x:x+0.18,y:5.5,w:2.5,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:11.5,bold:true,color:NAVY});
    s.addText(v[1],{x:x+0.18,y:5.78,w:2.5,h:0.26,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,color:GREY});
    s.addText(v[2],{x:x+0.18,y:6.04,w:2.5,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,bold:true,color:i===3?BAD:DEEP});});

  why(s,"NEVER let stale data close a sale. Fresh data can take payment; stale data can only reserve.  One rule, and it prevents the worst outcome the product can produce.",NAVY);
  s.addNotes(`THE DECISION: data age changes what the agent is allowed to say.

WHY: an agent that promises something sold out weeks ago damages the tenant's relationship with their own customer. That is worse than being unhelpful - it actively costs them.

WHY THIS IS ALSO A COMPETITIVE POINT: vendors advertise real-time sync while their own documentation says hourly intervals. Hourly polling marketed as real-time is the industry norm, and reviews show the cost - purchases of out-of-stock items, quantities wrong for months, stock added back instead of deducted. Genuine webhooks plus reconciliation beats most products shipping today. The bar is lower than it looks.

THE MECHANISM COMPETITORS CANNOT COPY: let the agent ask the owner on WhatsApp and write the answer back. The conversation becomes the sync mechanism. A connector-only product has no channel to the owner, so it cannot do this.

WHY RECONCILIATION IS DESIGNED IN, not bolted on: webhook delivery is not guaranteed. One platform retries eight times over about four hours and then DELETES the subscription - the shop then goes silently stale forever with no error anywhere. So we health-check our own subscriptions and re-register them, and we reconcile on a schedule regardless.

HOW THIS SLIDE IS BUILT: traffic-light bands top to bottom, then the per-source reality underneath. The sheet-upload card is amber because it is the one that will bite, and it is also the adapter we build first - so the risk and the beachhead are the same thing.`);
}

/* 12 DATA MODEL */
{
  const s=slide("Data model","Data");
  s.addText("~25 core tables. Not 60. jsonb carries the flexible parts - extracted requirements, raw payloads, per-vertical fields.",
    {x:0.6,y:1.22,w:12.1,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:12.5,italic:true,color:GREY});

  const g=[["platform",["tenants","users","plans","usage_events","audit_log"],DEEP],
    ["channels",["channels","messages","outbound_queue","consents","templates"],DEEP],
    ["conversations",["conversations","conversation_state","extracted_requirements"],DEEP],
    ["business",["services","pricing_rules","service_areas","inventory_items","workforce"],TEAL],
    ["catalog",["catalog_sources","products","product_variants","stock_levels"],ACC],
    ["contacts",["contacts","lead_scores","contact_metrics"],DEEP],
    ["feasibility",["feasibility_results"],ACC],
    ["quotations",["quotations","quotation_items","approvals"],TEAL],
    ["orders",["carts","orders","order_items","order_events","deliveries"],TEAL],
    ["jobs",["jobs","job_events"],TEAL],
    ["feedback",["feedback","tickets"],DEEP],
    ["engagement",["campaigns","coupons","loyalty","referrals","suppression_rules"],GREY]];
  g.forEach((v,i)=>{
    const col=i%4, row=Math.floor(i/4);
    const x=0.6+col*3.1, y=1.62+row*1.42;
    card(s,x,y,2.9,1.3,LIGHT,v[2]===ACC?ACC:"DCE5EE");
    s.addText(v[0],{x:x+0.16,y:y+0.1,w:2.6,h:0.26,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,bold:true,color:v[2]===ACC?DARK:NAVY});
    s.addText(v[1].map(t=>"\u00B7 "+t).join("\n"),{x:x+0.16,y:y+0.38,w:2.6,h:0.85,isTextBox:true,margin:0,
      fontFace:BODY,fontSize:8.5,color:DARK,lineSpacing:11});
  });

  card(s,0.6,6.0,12.1,0.5,NAVY,null);
  s.addText("Two decisions define the merge:   ONE contacts table with a lifecycle_stage  \u00B7  an accepted quotation BECOMES a job",
    {x:0.85,y:6.0,w:11.6,h:0.5,isTextBox:true,margin:0,fontFace:BODY,fontSize:11.5,bold:true,color:WHITE,valign:"middle"});

  why(s,"WHY ~25 AND NOT 58:  the inherited retail design had 58 tables because it was built on spreadsheets, which have no jsonb and no useful joins, so every derived metric became its own tab. Lifted literally into Postgres that is table sprawl.");
  s.addNotes(`THE TWO MODELLING DECISIONS THAT MAKE THIS ONE SYSTEM RATHER THAN TWO APPS SHARING A DATABASE:

1. A LEAD AND A CUSTOMER ARE THE SAME ENTITY at different stages. One contacts table with a lifecycle_stage field, running new_inquiry, qualified, quoted, customer, repeat, dormant, churned. WHY it matters practically: the same inbound message means different things depending on who sent it. Unknown number means new enquiry. Open job means a service question. Recently completed means feedback or a warranty issue. Dormant customer means repeat business. That is cheap to implement and makes the agent feel markedly more competent.

2. AN ACCEPTED QUOTATION BECOMES A JOB. Same commitment, different name either side of the hinge. That transition is where the pre-sale half joins the post-sale half.

WHY tenant_id LEADS EVERY INDEX: every query is tenant-scoped, so the index must be too. Row-level security sits behind it as a backstop that catches the query which forgot to filter - application code filters first, RLS is the safety net, not the mechanism.

WHY THE MESSAGES TABLE IS APPEND-ONLY AND NOT PARTITIONED YET: it is the only unbounded-growth table, roughly nine million rows a year at 200 tenants, which Postgres handles comfortably. Design append-only now, plan monthly partitioning as a later migration, do not build partitioning yet.

WHY WE COLLAPSED THE INHERITED SCHEMA: the retail design we merged from specified 58 tables because it was built for spreadsheets. Customers alone had around fifty analytics columns. In Postgres those collapse into a contacts table plus a metrics table with jsonb.`);
}

/* 13 EVENTS */
{
  const s=slide("How modules talk to each other","Events");
  s.addText("Modules publish events to a Postgres outbox table. Celery consumers deliver them. No module reaches into another's tables.",
    {x:0.6,y:1.22,w:12.1,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:12.5,italic:true,color:GREY});

  // producers
  s.addText("PUBLISHERS",{x:0.6,y:1.7,w:3,h:0.24,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,bold:true,color:GREY,charSpacing:1});
  const pub=["channels","conversations","contacts","feasibility","quotations","orders","jobs","feedback"];
  pub.forEach((m,i)=>{ box(s,0.6,2.0+i*0.52,2.5,0.42,DEEP,m,10); });

  // events
  s.addText("EVENTS",{x:4.0,y:1.7,w:3,h:0.24,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,bold:true,color:GREY,charSpacing:1});
  const evs=["message.received","requirements.extracted","lead.scored","feasibility.checked",
             "quotation.approved","order.delivered","job.completed","feedback.received"];
  evs.forEach((m,i)=>{
    const hot=(m==="job.completed"||m==="order.delivered");
    box(s,3.95,2.0+i*0.52,3.6,0.42,hot?ACC:TEAL,m,10,hot?DARK:WHITE);
    aR(s,3.16,2.11+i*0.52,0.7);
  });

  // consumers
  s.addText("SUBSCRIBERS",{x:8.5,y:1.7,w:3,h:0.24,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,bold:true,color:GREY,charSpacing:1});
  const sub=[["feedback","job.completed + order.delivered\n\u2014 the shared seam",ACC],
    ["engagement","feedback.received \u2192 suppress\npromos after a complaint",TEAL],
    ["jobs","quotation.approved\n+ customer acceptance",TEAL],
    ["analytics","all events \u2192\nnightly rollups",DEEP]];
  sub.forEach((v,i)=>{const y=2.0+i*1.05;
    card(s,8.45,y,4.25,0.92,v[2]===ACC?"FDF3E3":LIGHT,v[2]===ACC?ACC:"DCE5EE");
    s.addText(v[0],{x:8.65,y:y+0.08,w:3.9,h:0.26,isTextBox:true,margin:0,fontFace:BODY,fontSize:11.5,bold:true,color:NAVY});
    s.addText(v[1],{x:8.65,y:y+0.34,w:3.9,h:0.52,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,color:DARK});
    aR(s,7.62,y+0.36,0.72,v[2]===ACC?ACC:"AAB8C4");});

  why(s,"THE SHARED SEAM:  feedback listens for BOTH job.completed and order.delivered. One rating mechanism, two entry points. That convergence is the merge of the two halves working correctly.");
  s.addNotes(`WHY AN OUTBOX TABLE AND NOT KAFKA: the outbox is a Postgres table written inside the same transaction as the data change, so an event can never be published for a change that rolled back. Celery consumers deliver from it. Kafka would add an entire distributed system to operate for a workload of roughly twenty requests per second.

WHY EVENTS AND NOT DIRECT CALLS: the feedback module listens for job.completed and knows nothing whatsoever about the jobs module's internals. That decoupling is what keeps the two merged halves from tangling into one another, and it is what lets us add a subscriber later without touching the publisher.

THE AMBER PAIR IS THE POINT OF THE SLIDE: feedback subscribes to job.completed AND order.delivered. A service job finishing and a retail order arriving trigger the same rating loop through the same code. One mechanism, two entry points. If someone asks what "merged platform" actually means in engineering terms, this is the concrete answer.

WHY ANALYTICS SUBSCRIBES TO EVERYTHING: rollups are computed nightly from the event stream rather than by querying live operational tables. The dashboard then reads only the rollups, so analytics can never slow down a customer conversation.

WHAT IS STILL OPEN: the event payload shapes are not yet specified. That is flagged in the design document and remains outstanding work.`);
}

/* 14 CHANNELS */
{
  const s=slide("Channels and the outbound dispatcher","Channels");

  card(s,0.6,1.25,5.9,2.6,LIGHT,"C9D6E2");
  s.addText("INBOUND \u2014 the critical path",{x:0.85,y:1.35,w:5,h:0.26,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:10,bold:true,color:TEAL,charSpacing:1});
  const inb=["Verify the signature","Look up tenant by phone_number_id","Insert raw payload (idempotent)",
             "Enqueue to inbound","Return 200"];
  inb.forEach((t,i)=>{
    badge(s,0.9,1.72+i*0.4,0.28,i+1,DEEP);
    s.addText(t,{x:1.3,y:1.7+i*0.4,w:5.0,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:DARK,valign:"middle"});});
  s.addText("Target: under 200ms.  No LLM call, no database join.",
    {x:0.9,y:3.5,w:5.4,h:0.26,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,bold:true,italic:true,color:BAD});

  card(s,6.8,1.25,5.9,2.6,LIGHT,"C9D6E2");
  s.addText("OUTBOUND \u2014 one dispatcher, always",{x:7.05,y:1.35,w:5,h:0.26,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:10,bold:true,color:TEAL,charSpacing:1});
  const outb=["Dedupe key on every send","Per-tenant, per-channel rate limits","Exponential backoff",
              "Dead-letter queue with replay","Provider adapter formats it"];
  outb.forEach((t,i)=>{
    badge(s,7.1,1.72+i*0.4,0.28,i+1,DEEP);
    s.addText(t,{x:7.5,y:1.7+i*0.4,w:5.0,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,color:DARK,valign:"middle"});});
  s.addText("A double-sent quotation is an account-losing bug.",
    {x:7.1,y:3.5,w:5.4,h:0.26,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,bold:true,italic:true,color:BAD});

  s.addText("CHANNELS SUPPORTED",{x:0.6,y:4.05,w:12.1,h:0.26,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:10,bold:true,color:TEAL,charSpacing:1.5});
  const ch=[["WhatsApp","Primary. Official Cloud API only.","v1",OK],
    ["Instagram DM","Meta adapter, same interface.","v1",OK],
    ["Messenger","#1 messaging app in Denmark, #2 Sweden.","v1",OK],
    ["Web widget","No platform approval needed.","v1",OK],
    ["Telegram","Owner-side. Bot token, no OAuth.","v1",ACC]];
  ch.forEach((v,i)=>{const x=0.6+i*2.48;
    card(s,x,4.38,2.28,1.5,WHITE,"DCE5EE");
    s.addText(v[0],{x:x+0.16,y:4.5,w:2.0,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,bold:true,color:NAVY});
    s.addText(v[1],{x:x+0.16,y:4.8,w:2.0,h:0.72,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,color:DARK});
    box(s,x+0.16,5.54,0.7,0.24,v[3],v[2],8);});

  why(s,"WHY MULTI-CHANNEL MATTERS:  an earlier analysis disqualified Sweden and Denmark on WhatsApp reach. That reasoning was wrong - Messenger is #1 in Denmark and #2 in Sweden at 65%. Stop scoring markets on WhatsApp alone.");
  s.addNotes(`DECISION - THE WEBHOOK DOES FOUR THINGS AND RETURNS 200. WHY: WhatsApp retries if you do not respond within seconds. A slowly-processed webhook becomes a DUPLICATE REPLY to a real customer. So no LLM call and no database join sits on that path. The consequence worth stating: the entire system must be testable and demonstrable with no live WhatsApp connection at all.

DECISION - ONE OUTBOUND DISPATCHER FOR EVERY CHANNEL, never per-module sending. WHY: dedupe, rate limiting, backoff and dead-lettering have to be enforced in exactly one place or they are not enforced. A double-sent quotation or a double-placed order loses the account.

DECISION - OFFICIAL CLOUD API ONLY, never WhatsApp Web automation providers. WHY: they automate WhatsApp Web and get numbers banned on exactly the outbound traffic the retention half depends on. The inherited retail design listed one of these as a provider option; it was removed.

WHY MULTI-CHANNEL IS A DESIGN REQUIREMENT AND NOT A FEATURE: an earlier report disqualified Sweden and Denmark because WhatsApp reaches only about 49% and 30% of internet users there. The conclusion did not follow. Messenger is the number one messaging app in Denmark and number two in Sweden at 65%, alongside Instagram at 65%. There is a viable channel mix without WhatsApp in both. They fail on language, not channels.

WHY TELEGRAM IS AMBER: it is owner-side only - a bot token, no OAuth, hours of work - and it is the fallback for approval notifications if template approval is slow.

ONE THING TO VERIFY BEFORE PRICING: sources conflict on whether inbound service replies remain free inside the 24-hour window. It affects unit economics directly.`);
}

/* 15 COMPLIANCE */
{
  const s=slide("Compliance, built into the flow","Compliance");
  s.addText("Six engineering requirements. Cheap designed in now, expensive to retrofit - and largely unmarketed by competitors.",
    {x:0.6,y:1.22,w:12.1,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:12.5,italic:true,color:GREY});

  const c=[["AI disclosure at first contact","Per-tenant wording, NOT disableable, logged as an event. Repeated on resume after a gap and on handback from a human."],
    ["No terminal auto-rejection","Infeasible routes to the owner or produces a non-final outcome with a route to a human. Never a closed door."],
    ["Explainability per score","Score, model version, input features and the human decision recorded for every contact."],
    ["Consent with versioned text","Timestamp, source and consent_text_version. Opt-out in every marketing message."],
    ["Tenant-level region","Decided at provisioning, not changeable later without a migration. EU data stays in the EU."],
    ["Data subject rights as endpoints","Export, erase, rectify, object-to-profiling, and request human review. Working functionality, not policy text."]];
  c.forEach((v,i)=>{
    const col=i%2, row=Math.floor(i/2);
    const x=0.6+col*6.2, y=1.66+row*1.35;
    card(s,x,y,5.95,1.22,row%2?LIGHT:WHITE,"DCE5EE");
    badge(s,x+0.16,y+0.16,0.34,i+1,OK);
    s.addText(v[0],{x:x+0.6,y:y+0.13,w:5.2,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:12,bold:true,color:NAVY});
    s.addText(v[1],{x:x+0.6,y:y+0.44,w:5.2,h:0.7,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,color:DARK});});

  why(s,"AN OPPORTUNITY WE ARE NOT USING:  AI disclosure has been enforceable since 2 Aug 2026 with penalties to \u20AC15m or 3% of turnover, and research found very little evidence of vendors doing it visibly. We built it and did not market it.",NAVY);
  s.addNotes(`WHY COMPLIANCE IS IN THE PRODUCT DECK AND NOT AN APPENDIX: two of these six change the flow itself, so they are design decisions, not paperwork.

ITEM 2 IS A CHANGE TO THE ORIGINAL DESIGN. The first activity diagram had "not feasible, notify customer, lead closed". That is a terminal automated rejection of a person with no human involved, which is the shape the law catches. It is now either an owner decision or a non-final outcome with a documented route to a human. This is why the failure column on the service flow slide exists at all.

ITEM 1 IS NOT OPTIONAL AND NOT DISABLEABLE. Disclosure must come at first contact, be clearly noticeable, and be logged - because "we disclosed" is a claim you must be able to evidence.

THE OWNER-APPROVAL GATE DOES DOUBLE DUTY. Beyond trust and accuracy, a human approver means the decision is not "solely automated", which disposes of the automated-decision question entirely. That is an independent reason to keep the gate.

A CORRECTION WORTH STATING: we originally justified the pricing rule by pointing at AI regulation. Reading the actual text, the relevant annex covers pricing only for life and health insurance - ordinary commercial service pricing is not there. The real exposure is contract and consumer law, which is larger. Same rule, better reason.

THE COMMERCIAL POINT: for a trade choosing between us and a local agency, "this is the one that keeps you legal" is a real reason to pick us, and an agency cannot easily retrofit it. We should market what we already built.`);
}

/* 16 STACK */
{
  const s=slide("Technology stack","Stack");
  const st=[["Frontend","Next.js + Tailwind on Vercel","Mobile web is first-class; owner's slow job is desktop"],
    ["Backend","Python 3.12 + FastAPI","Stateless, one deployable"],
    ["ORM / migrations","SQLAlchemy 2.0 + Alembic","Non-negotiable for an evolving multi-tenant schema"],
    ["Database","PostgreSQL + row-level security","jsonb for flexible fields; RLS as the backstop"],
    ["Cache / broker","Redis","Hot conversation window, rate-limit counters, Celery broker"],
    ["Async","Celery + Celery Beat","Four queues split by workload class"],
    ["LLM","Direct SDK calls + typed structured output","NO LangChain in the core path - see why below"],
    ["ML","scikit-learn","Lead scoring, later propensity"],
    ["Search","Postgres full-text, then pgvector","Avoids running a separate search service"],
    ["Channels","WhatsApp Cloud API (official)","Never WhatsApp Web automation providers"],
    ["Files","S3","Media and generated quotation PDFs"],
    ["Deploy","Docker Compose on one instance","Resist Kubernetes; path to managed containers is config"]];
  st.forEach((v,i)=>{const y=1.28+i*0.44;
    card(s,0.6,y,12.1,0.39,i%2?LIGHT:WHITE,null);
    s.addText(v[0],{x:0.8,y:y+0.04,w:2.3,h:0.31,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,bold:true,color:NAVY,valign:"middle"});
    s.addText(v[1],{x:3.2,y:y+0.04,w:4.3,h:0.31,isTextBox:true,margin:0,fontFace:BODY,fontSize:10.5,color:DEEP,valign:"middle"});
    s.addText(v[2],{x:7.6,y:y+0.04,w:4.9,h:0.31,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,italic:true,color:GREY,valign:"middle"});});

  why(s,"WHY NO LANGCHAIN IN THE CORE PATH:  the pipeline is deterministic - classify, extract, decide, generate. Direct SDK calls with typed models are simpler, cheaper, faster to debug and easier to defend. Those frameworks earn their keep for open-ended agent loops with dynamic tool selection, which this is not.");
  s.addNotes(`WHY THIS STACK AND NOT SOMETHING MORE FASHIONABLE: every choice here is justified by the actual load and the actual team size. Roughly twenty requests per second at peak, three people, an academic deadline in the background.

THE LANGCHAIN DECISION is the one most likely to be questioned, so state the reasoning. Our pipeline is deterministic - classify, extract, decide, generate. There is no open-ended agent loop with dynamic tool selection, which is where those frameworks earn their keep. Direct SDK calls with typed structured output are simpler, cheaper, faster, and far easier to debug when a single extraction goes wrong. If a named framework is required for external reasons, keep one for retrieval over business documents only, never on the core path.

WHY POSTGRES FULL-TEXT BEFORE pgvector BEFORE A SEARCH SERVICE: every additional system is another thing to run, monitor and pay for. Start with what the database already does. That said, search quality for conversational catalogue search is the highest technical risk in product mode and should be prototyped against a real catalogue early.

WHY DOCKER COMPOSE ON ONE INSTANCE: the governing principle is build for one instance, code so that N instances requires no rewrite. Stateless services, external state, queued work, no in-process caching of anything mutable. The path to managed containers is then a configuration change rather than a rebuild.

WHY COST CONTROL IS ARCHITECTURE, NOT AN OPTIMISATION: tiered model routing, prompt caching, rules over inference, structured outputs and per-tenant token budgets. The business profile is large, static per tenant and repeated on every call - that is the highest-leverage cache in the system.`);
}

/* 17 WHAT WE BUILD FIRST */
{
  const s=slide("What we build, and in what order","Delivery");

  const ph=[["V1","Service mode, end to end",
    ["Tenancy, auth, roles, usage metering","Guided onboarding + sandbox mode","WhatsApp, Instagram, Messenger, web",
     "Qualification, extraction, handoff","Feasibility with reasons","Deterministic pricing + approval + PDF",
     "Rating loop and tickets","Dashboard with conversation viewer","The six compliance items"],OK],
    ["V1.1","Prove the catalogue port",
    ["Manual sheet / CSV adapter","Product search and stock","Shopify adapter","Good-Better-Best quote tiers","Knowledge base retrieval"],TEAL],
    ["V2","Product mode and retention",
    ["WooCommerce adapter","Cart, orders, delivery, refunds","Coupons, loyalty, referrals","Retention campaigns and segments","Generic REST adapter"],DEEP],
    ["V3","Learning",
    ["A/B experiments","Churn and reorder propensity","Personas and CLV","Self-learning label loop"],GREY]];
  ph.forEach((v,i)=>{const x=0.6+i*3.1;
    card(s,x,1.28,2.9,4.9,i===0?LIGHT:WHITE,i===0?OK:"DCE5EE");
    box(s,x+0.18,1.42,0.8,0.32,v[3],v[0],10);
    s.addText(v[1],{x:x+0.18,y:1.85,w:2.55,h:0.5,isTextBox:true,margin:0,fontFace:BODY,fontSize:11.5,bold:true,color:NAVY});
    v[2].forEach((t,j)=>{
      s.addShape(p.ShapeType.ellipse,{x:x+0.2,y:2.46+j*0.42,w:0.11,h:0.11,fill:{color:v[3]},line:{type:"none"}});
      s.addText(t,{x:x+0.42,y:2.36+j*0.42,w:2.35,h:0.4,isTextBox:true,margin:0,fontFace:BODY,fontSize:9,color:DARK,valign:"middle"});});
  });

  why(s,"THE V1 TEST:  a person not on the team can be provisioned, onboard in 15 minutes, go live, receive a real enquiry, see the feasibility verdict with reasons, approve a quote on their phone in under a minute, and read the whole conversation back.");
  s.addNotes(`WHY THIS ORDER: each phase is a coherent product on its own, not a slice of an unfinished one. V1 is the complete service loop - if it stopped there it would still be sellable.

WHY PRODUCT MODE IS V2 RATHER THAN A CO-EQUAL HALF: four independent reasons. Meta made product mode's common case free inside WhatsApp in June 2026. The shop space has dozens of funded competitors. The feasibility differentiator is unoccupied. And a quote is worth far more per transaction than a parcel enquiry, so revenue per tenant and churn both favour service.

WHY THE MANUAL ADAPTER IS IN V1.1 AND NOT V2: it is the cheapest way to prove the catalogue port design is right, and it serves the businesses with no website at all - roughly 23% of small EU enterprises - who are invisible to every app-store competitor.

WHY ENGAGEMENT IS LAST: outbound marketing is the expensive traffic and carries the heaviest consent rules in every target market. Inbound replies are largely free; marketing messages cost money AND carry legal risk. Cost and compliance point the same direction - keep the product inbound for as long as possible.

THE DEFINITION OF DONE is on the slide as the test. Note the specific failure conditions: if the feasibility verdict or the phone approval is missing, it is just a chatbot. If the conversation viewer is missing, nobody will trust it. If data export is missing, no European tenant can be onboarded.`);
}

/* 18 RISKS */
{
  const s=slide("What could go wrong","Risks");
  const r=[["Customers phone rather than message","Every published figure on both sides is vendor marketing. UNRESOLVED.","25-40 customer calls. Two days. Decides viability.",BAD],
    ["A wrong extracted price binds the business","28-77% document accuracy; plausible-but-wrong is legally unescapable.","Never price from retrieval. Version every rate card.",BAD],
    ["Owner approval becomes a rubber stamp","Nominal sign-off is not meaningful human intervention.","Show rate applied, rules fired, version. Flag outliers against their own history.",ACC],
    ["Promised crew or part does not exist","Small operators often do not track van stock in software at all.","Never assert volatile data without a live source. Degrade and escalate.",ACC],
    ["Rate-card onboarding kills adoption","42% had no working price book after three months.","Template-first, 15-minute target, go live on 3-5 services.",ACC],
    ["Search quality in product mode","Untested at catalogue scale. Highest technical risk in V2.","Prototype against a real catalogue before committing to Postgres-only.",TEAL]];
  r.forEach((v,i)=>{const y=1.28+i*0.9;
    card(s,0.6,y,12.1,0.8,i%2?LIGHT:WHITE,"DCE5EE");
    s.addShape(p.ShapeType.roundRect,{x:0.78,y:y+0.14,w:0.12,h:0.52,rectRadius:0.04,fill:{color:v[3]},line:{type:"none"}});
    s.addText(v[0],{x:1.08,y:y+0.06,w:3.5,h:0.68,isTextBox:true,margin:0,fontFace:BODY,fontSize:11.5,bold:true,color:NAVY,valign:"middle"});
    s.addText(v[1],{x:4.65,y:y+0.06,w:4.0,h:0.68,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,color:DARK,valign:"middle"});
    s.addText(v[2],{x:8.75,y:y+0.06,w:3.75,h:0.68,isTextBox:true,margin:0,fontFace:BODY,fontSize:9.5,bold:true,color:DEEP,valign:"middle"});});

  why(s,"DOWNGRADED:  \u201Ctrades will not buy software\u201D. Contradicted - Jobber, Tradify and ServiceM8 are substantial self-serve businesses selling to exactly this customer. Acquisition is not the problem; retention is.",OK);
  s.addNotes(`WHY EVERY RISK HAS A MITIGATION PRINTED NEXT TO IT: a risk list without answers reads as a list of reasons not to proceed. That is not what this is.

RISK 1 IS RANKED FIRST because if customers phone rather than message, the entire product is moot - and the evidence is genuinely contaminated. Industry sources claim 78-83% of home-service bookings start with a call, but these trace to vendor marketing with no verifiable primary study, and they are US-based. The counter-claims come from vendor blogs with equal self-interest. Do not settle this with more desk research. Twenty-five to forty calls, two days.

RISK 2 CANNOT BE MITIGATED BY REVIEW because the failure is silent. The mitigation has to be structural.

RISK 3 EXISTS EVEN THOUGH APPROVAL IS OUR STRONGEST FEATURE: if the owner taps Approve without seeing what drove the number, the gate is decorative and the legal protection evaporates with it.

THE COLOUR CODING: red is existential, amber is serious but designed for, teal is a technical unknown scheduled for later.

THE DOWNGRADED RISK IS INCLUDED DELIBERATELY. We assumed trades do not buy software and the research contradicted it. Showing something that came OFF the register is what makes the rest of the register credible - it demonstrates the list is maintained honestly rather than only ever growing.`);
}

/* 19 DIFFERENTIATION */
{
  const s=slide("Why this wins, and where it does not","Positioning");

  card(s,0.6,1.25,5.9,4.0,LIGHT,OK);
  s.addText("DEFENSIBLE",{x:0.85,y:1.38,w:3,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:10.5,bold:true,color:OK,charSpacing:1.5});
  const d=[["Feasibility before price","Confirmed by absence across every product examined, in two independent threads"],
    ["Owner approves before sending","Survived all four threads: competitive, legal and practical"],
    ["Multi-channel breadth","Most competitors are WhatsApp-first or single-platform"],
    ["Compliance shipped by default","Enforceable since Aug 2026; few vendors do it visibly"],
    ["Flat, predictable pricing","Billing confusion is the loudest complaint in the category"]];
  d.forEach((v,i)=>{const y=1.78+i*0.68;
    s.addShape(p.ShapeType.ellipse,{x:0.92,y:y+0.08,w:0.16,h:0.16,fill:{color:OK},line:{type:"none"}});
    s.addText(v[0],{x:1.22,y:y,w:5.1,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:11.5,bold:true,color:NAVY});
    s.addText(v[1],{x:1.22,y:y+0.27,w:5.1,h:0.36,isTextBox:true,margin:0,fontFace:BODY,fontSize:8.5,color:DARK});});

  card(s,6.8,1.25,5.9,4.0,"F7EDEE",BAD);
  s.addText("HONEST WEAKNESSES",{x:7.05,y:1.38,w:4,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:10.5,bold:true,color:BAD,charSpacing:1.5});
  const wk=[["Price is not a weapon","The category is already affordable - one competitor is ~\u00A325/mo with unlimited users"],
    ["We enter as a late follower","UK incumbents already sell AI quoting to trades from \u00A349-59/month"],
    ["Product mode's floor is now free","Meta shipped an agent inside WhatsApp in June 2026"],
    ["Absence is not proof of demand","Nobody may have thought of feasibility - or customers may not care"],
    ["Two modes, one small team","The shared layer is the cheap part; the valuable parts share little"]];
  wk.forEach((v,i)=>{const y=1.78+i*0.68;
    s.addShape(p.ShapeType.ellipse,{x:7.12,y:y+0.08,w:0.16,h:0.16,fill:{color:BAD},line:{type:"none"}});
    s.addText(v[0],{x:7.42,y:y,w:5.1,h:0.28,isTextBox:true,margin:0,fontFace:BODY,fontSize:11.5,bold:true,color:NAVY});
    s.addText(v[1],{x:7.42,y:y+0.27,w:5.1,h:0.36,isTextBox:true,margin:0,fontFace:BODY,fontSize:8.5,color:DARK});});

  card(s,0.6,5.42,12.1,1.0,NAVY,null);
  s.addText("THE POSITIONING IN ONE LINE",{x:0.9,y:5.5,w:5,h:0.24,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:9,bold:true,color:ACC,charSpacing:1.5});
  s.addText("The only agent that knows whether the business can actually do the job \u2014 and never sends a price the owner has not seen.",
    {x:0.9,y:5.76,w:11.5,h:0.5,isTextBox:true,margin:0,fontFace:BODY,fontSize:14,bold:true,color:WHITE});

  why(s,"The marketplace pitch:  trades pay \u00A316-37.50 per lead and pay even when the customer never replies, with each lead going to 10-20 competitors. \u201CYou already paid for this lead - the agent answers in seconds, at midnight, with a real price.\u201D");
  s.addNotes(`WHY BOTH COLUMNS ARE THE SAME SIZE: a positioning slide that only lists strengths is a sales pitch. This one is a design document. The weaknesses column is what makes the strengths column believable, and every item in it came out of the research rather than from us.

THE APPROVAL GATE IS THE STRONGEST SINGLE ITEM because three independent lines of reasoning converge on it. Competitively, the closest European competitor appears to send quotes automatically with no gate. Legally, a human approver means the decision is not solely automated. Practically, it is the only defence against a silent wrong number. When three separate arguments land on one design element, build the marketing around it.

WHY PRICE IS NOT A WEAPON: the category is affordable already. One competitor is roughly 25 pounds a month with unlimited users. The one-van operator is not priced out of anything. We have to be better, not cheaper. But note what the research found the loudest complaint to be - confusing, surprising billing, with one product running three separate meters. Flat predictable pricing in local currency costs nothing to implement and addresses that directly.

THE SALES PITCH WORTH MEMORISING is the one in the band at the bottom. It attaches to budget the trade ALREADY spends on leads rather than asking for new budget, which is a materially easier conversation.

THE CAVEAT IN THE RIGHT COLUMN that matters most: absence of a feature in competitors is not proof of demand. Validation calls settle it, and they are cheap.`);
}

/* 20 NEXT */
{
  const s=dark();
  s.addShape(p.ShapeType.ellipse,{x:-1.9,y:4.3,w:4.8,h:4.8,fill:{color:DEEP},line:{type:"none"}});
  s.addText("BEFORE WRITING MORE CODE",{x:0.8,y:0.75,w:8,h:0.3,isTextBox:true,margin:0,
    fontFace:BODY,fontSize:11,bold:true,color:ACC,charSpacing:2});
  s.addText("Five cheap things that can still change the design",{x:0.8,y:1.1,w:11,h:0.66,isTextBox:true,margin:0,
    fontFace:HEAD,fontSize:30,bold:true,color:WHITE});
  const n=[["Verify the channel pricing change","Affects unit economics and therefore every tier","This week"],
    ["25-40 customer calls","Phone or message? Also tests whether the feasibility gap is real demand","2 days"],
    ["Ask the platform about checkout links","May avoid a 4-8 week privacy review before launch","1 email"],
    ["Instrument rate-card review time","Validates or kills the 15-minute onboarding target","2 weeks"],
    ["Legal opinion on owner approval","Does approval change the legal character of an automated quote?","External"]];
  n.forEach((v,i)=>{const y=2.05+i*0.93;
    s.addShape(p.ShapeType.roundRect,{x:0.8,y,w:11.7,h:0.79,rectRadius:0.07,fill:{color:PANEL},line:{type:"none"}});
    badge(s,1.0,y+0.2,0.4,i+1,ACC,DARK);
    s.addText(v[0],{x:1.55,y:y+0.06,w:4.4,h:0.67,isTextBox:true,margin:0,fontFace:BODY,fontSize:13.5,bold:true,color:WHITE,valign:"middle"});
    s.addText(v[1],{x:6.05,y:y+0.06,w:4.85,h:0.67,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,color:"BFD3E6",valign:"middle"});
    s.addText(v[2],{x:11.0,y:y+0.06,w:1.35,h:0.67,isTextBox:true,margin:0,fontFace:BODY,fontSize:10,bold:true,color:ACC,align:"right",valign:"middle"});});
  s.addText("Full detail: SYSTEM_DESIGN.md  \u00B7  STRATEGY_FINDINGS.md  \u00B7  research/",
    {x:0.8,y:6.85,w:11.7,h:0.3,isTextBox:true,margin:0,fontFace:BODY,fontSize:11,italic:true,color:MUTE});
  s.addNotes(`WHY THESE FIVE AND IN THIS ORDER: items are ranked by deadline and by decisiveness.

1. THE CHANNEL PRICING CHANGE is first purely because it is imminent. Sources conflict on whether inbound service replies remain free. We cannot price a tier without knowing.

2. THE CUSTOMER CALLS are the most decisive item on the list. They answer two questions at once: do enquiries arrive by message or by phone, which decides viability; and is the feasibility gap unoccupied because nobody thought of it or because customers did not care, which decides whether our main differentiator is real. Two days against months of building the wrong thing.

3. THE PLATFORM QUESTION is one email and could remove four to eight weeks from launch. Best return on effort here.

4. INSTRUMENTING RATE-CARD REVIEW TIME validates or kills the 15-minute onboarding target, which is the biggest adoption risk in the product.

5. THE LEGAL OPINION is last because it is external and slow, but it is load-bearing - no source found answers whether owner approval changes the legal character of an automated quote, and the whole design leans on that gate.

THE CLOSING POINT: four of these five cost days, not weeks. The research already contradicted the plan in four places. These five can still change it again, and that is cheaper now than after the code exists.`);
}

p.writeFile({fileName:"C:/Users/hussn/Documents/rivon/deck/Rivon_Product_System_Overview.pptx"})
 .then(f=>console.log("WROTE",f));
