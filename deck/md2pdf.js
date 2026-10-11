// Markdown -> styled HTML (Mermaid rendered) -> print to PDF via headless Chrome.
const fs = require("fs");
const path = require("path");

const SRC = process.argv[2];
const OUT = process.argv[3];
if (!SRC || !OUT) { console.error("usage: node md2pdf.js in.md out.html"); process.exit(1); }

let md = fs.readFileSync(SRC, "utf8");

// ---- pull mermaid blocks out before markdown processing ----
const blocks = [];
md = md.replace(/```mermaid\n([\s\S]*?)```/g, (_, code) => {
  blocks.push(code.trim());
  return `\n@@MERMAID${blocks.length - 1}@@\n`;
});

// ---- fenced code blocks ----
const codes = [];
md = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
  codes.push({ lang, code });
  return `\n@@CODE${codes.length - 1}@@\n`;
});

const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function inline(s) {
  return s
    .replace(/`([^`]+)`/g, (_, c) => `<code>${esc(c)}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

const lines = md.split("\n");
let html = "", i = 0;

while (i < lines.length) {
  const L = lines[i];

  // placeholders
  let m = L.match(/^@@MERMAID(\d+)@@$/);
  if (m) { html += `<div class="mermaid">${esc(blocks[+m[1]])}</div>\n`; i++; continue; }
  m = L.match(/^@@CODE(\d+)@@$/);
  if (m) { const c = codes[+m[1]]; html += `<pre class="code"><code>${esc(c.code)}</code></pre>\n`; i++; continue; }

  // headings
  m = L.match(/^(#{1,6})\s+(.*)$/);
  if (m) {
    const lv = m[1].length;
    const id = m[2].toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
    html += `<h${lv} id="${id}">${inline(m[2])}</h${lv}>\n`;
    i++; continue;
  }

  // horizontal rule
  if (/^---+$/.test(L.trim())) { html += "<hr/>\n"; i++; continue; }

  // tables
  if (L.trim().startsWith("|") && lines[i + 1] && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
    const head = L.split("|").slice(1, -1).map(c => c.trim());
    i += 2;
    let rows = [];
    while (i < lines.length && lines[i].trim().startsWith("|")) {
      rows.push(lines[i].split("|").slice(1, -1).map(c => c.trim()));
      i++;
    }
    html += "<table><thead><tr>" + head.map(h => `<th>${inline(h)}</th>`).join("") +
      "</tr></thead><tbody>" +
      rows.map(r => "<tr>" + r.map(c => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") +
      "</tbody></table>\n";
    continue;
  }

  // blockquote
  if (L.startsWith(">")) {
    let buf = [];
    while (i < lines.length && lines[i].startsWith(">")) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
    html += `<blockquote>${inline(buf.join(" ").trim())}</blockquote>\n`;
    continue;
  }

  // lists
  if (/^\s*[-*]\s+/.test(L) || /^\s*\d+\.\s+/.test(L)) {
    const ordered = /^\s*\d+\.\s+/.test(L);
    const tag = ordered ? "ol" : "ul";
    let items = [];
    while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || /^\s*\d+\.\s+/.test(lines[i]) || /^\s{2,}\S/.test(lines[i]))) {
      if (/^\s*[-*]\s+/.test(lines[i]) || /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*(?:[-*]|\d+\.)\s+/, ""));
      } else if (items.length) {
        items[items.length - 1] += " " + lines[i].trim();
      }
      i++;
    }
    html += `<${tag}>` + items.map(t => `<li>${inline(t)}</li>`).join("") + `</${tag}>\n`;
    continue;
  }

  // paragraph
  if (L.trim() === "") { i++; continue; }
  let buf = [];
  while (i < lines.length && lines[i].trim() !== "" && !/^[#>|-]/.test(lines[i]) &&
         !/^@@(MERMAID|CODE)\d+@@$/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i])) {
    buf.push(lines[i]); i++;
  }
  if (buf.length) html += `<p>${inline(buf.join(" "))}</p>\n`;
}

const page = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${path.basename(SRC, ".md")}</title>
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<style>
  @page { size: A4; margin: 14mm 12mm; }
  :root{--navy:#21295C;--deep:#065A82;--teal:#1C7293;--acc:#B8860B;--bad:#B23A48;--ink:#1A2733;--mute:#5A6B7B;--line:#DCE5EE;--soft:#F4F7FA;}
  *{box-sizing:border-box}
  body{font-family:Calibri,Carlito,"Segoe UI",sans-serif;font-size:10.5pt;line-height:1.5;color:var(--ink);margin:0;padding:0;}
  h1{font-family:Cambria,Georgia,serif;font-size:24pt;color:var(--navy);margin:0 0 4pt;border-bottom:2px solid var(--deep);padding-bottom:6pt;}
  h2{font-family:Cambria,Georgia,serif;font-size:15pt;color:var(--navy);margin:20pt 0 6pt;padding-top:4pt;border-top:1px solid var(--line);page-break-after:avoid;}
  h3{font-family:Cambria,Georgia,serif;font-size:12.5pt;color:var(--deep);margin:14pt 0 4pt;page-break-after:avoid;}
  h4{font-size:11pt;color:var(--teal);margin:10pt 0 3pt;page-break-after:avoid;}
  p{margin:5pt 0;}
  a{color:var(--deep);text-decoration:none;}
  code{font-family:Consolas,"Courier New",monospace;font-size:9pt;background:var(--soft);padding:1px 4px;border-radius:3px;color:#8a1f3d;}
  pre.code{background:#1e2733;color:#e6edf3;padding:8pt 10pt;border-radius:4px;overflow:hidden;page-break-inside:avoid;margin:7pt 0;}
  pre.code code{background:none;color:#e6edf3;font-size:8.5pt;padding:0;line-height:1.45;}
  table{border-collapse:collapse;width:100%;margin:7pt 0;font-size:9pt;page-break-inside:avoid;}
  th{background:var(--navy);color:#fff;text-align:left;padding:5pt 6pt;font-weight:600;font-size:8.5pt;}
  td{border-bottom:1px solid var(--line);padding:4pt 6pt;vertical-align:top;}
  tr:nth-child(even) td{background:var(--soft);}
  blockquote{border-left:3px solid var(--acc);background:#FDF8EC;margin:8pt 0;padding:6pt 10pt;font-style:italic;color:#4a3d1f;page-break-inside:avoid;}
  hr{border:none;border-top:1px solid var(--line);margin:14pt 0;}
  ul,ol{margin:5pt 0 5pt 0;padding-left:18pt;}
  li{margin:2pt 0;}
  .mermaid{text-align:center;margin:10pt 0;page-break-inside:avoid;break-inside:avoid;background:#fff;display:block;}
  .mermaid svg{max-width:100%!important;max-height:215mm!important;height:auto!important;}
  strong{color:var(--navy);}
</style></head>
<body>
${html}
<script>
mermaid.initialize({startOnLoad:true,theme:"base",securityLevel:"loose",
 flowchart:{useMaxWidth:false,nodeSpacing:34,rankSpacing:38,padding:8},
 sequence:{useMaxWidth:false},
 themeVariables:{primaryColor:"#F4F7FA",primaryTextColor:"#1A2733",primaryBorderColor:"#1C7293",
 lineColor:"#5A6B7B",fontFamily:"Calibri,sans-serif",fontSize:"16px",
 secondaryColor:"#E8EEF5",tertiaryColor:"#FDF8EC"}});

// Scale each rendered diagram up to fill the printable width.
window.addEventListener("load",()=>{setTimeout(()=>{
  document.querySelectorAll(".mermaid svg").forEach(svg=>{
    const w=svg.getBoundingClientRect().width||svg.viewBox.baseVal.width;
    const h=svg.getBoundingClientRect().height||svg.viewBox.baseVal.height;
    if(!w||!h) return;
    const availW=document.body.clientWidth, availH=790;      // ~215mm at 96dpi
    const k=Math.min(availW/w, availH/h, 2.4);               // never upscale past 2.4x
    if(k>1.02){ svg.style.width=(w*k)+"px"; svg.style.height=(h*k)+"px"; }
    svg.style.maxWidth="100%";
  });
},400);});
</script>
</body></html>`;

fs.writeFileSync(OUT, page, "utf8");
console.log("HTML written:", OUT, "| mermaid blocks:", blocks.length, "| code blocks:", codes.length);
