'use strict';
/* Kursringens tal visar ett steg i taget (användarbeslut 2026-11-17, felrapport 2026-11-17 09:09).
   Standard är Grunderna; eleven kan klicka fram Tillämpning (nivå 3) och Utmaning (nivå 4–5).
   Den gamla sammanvägningen 90/7/3 (STEG_VIKT/kursRing) ska inte komma tillbaka.
   Webbläsarkontroll gjord i Claude-förhandsvisningen: talet byter, valet sparas och mobilbredd utan sidledsrullning. */
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');

test('ingen sammanvägd kursprocent',()=>{
 assert.doesNotMatch(html,/STEG_VIKT|kursRing\(/);
 assert.doesNotMatch(html,/klara grunder i hela kursen ger 90/);
});

test('kursvyn väljer steg, med Grunderna som standard',()=>{
 const start=html.indexOf('const KURSVY='),slut=html.indexOf('const STEG_GRANS');
 assert.ok(start>0&&slut>start);
 const lagring={};let kastar=false;
 const ctx={localStorage:{getItem:k=>{if(kastar)throw new Error('blockerad');return k in lagring?lagring[k]:null},setItem:(k,v)=>{if(kastar)throw new Error('blockerad');lagring[k]=String(v)}},document:{querySelector:()=>null}};
 vm.runInNewContext(html.slice(start,slut)+';this.kursvyLas=kursvyLas;this.valjKursvy=valjKursvy;',ctx);
 assert.equal(ctx.kursvyLas(),'grund');
 ctx.valjKursvy('utm');assert.equal(ctx.kursvyLas(),'utm');
 ctx.valjKursvy('x');assert.equal(ctx.kursvyLas(),'utm');
 lagring.kg_kursvy='skräp';assert.equal(ctx.kursvyLas(),'grund');
 kastar=true;assert.equal(ctx.kursvyLas(),'grund');assert.doesNotThrow(()=>ctx.valjKursvy('till'));
});

test('ringens tal och knapparna hör ihop',()=>{
 assert.match(html,/vy=kursvyLas\(\), vald=lage\.find\(x=>x\.id===vy\)\|\|lage\[0\]/);
 assert.match(html,/<b>\$\{vald\.pct\}<\/b><span>%<\/span><small class="mu-pct-namn">\$\{vald\.namn\}<\/small>/);
 assert.match(html,/class="mu-val\$\{x===vald\?" vald":""\}" data-steg="\$\{x\.id\}" data-pct="\$\{x\.pct\}"/);
 assert.match(html,/onclick="valjKursvy\('\$\{x\.id\}'\)"/);
 assert.match(html,/Tryck på <b>Tillämpning<\/b> eller <b>Utmaning<\/b>/);
});
