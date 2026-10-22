'use strict';
/* Fy2 interferens 2026-10-22: maximum/minimum, förstärkning/släckning och i fas/motfas rättas automatiskt. */
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace(/\r\n/g,'\n');
const kod=n=>{const m=new RegExp('function '+n+'\\(').exec(html);assert.ok(m,n);return html.slice(m.index,html.indexOf('\n}',m.index)+2);};
const lista=html.slice(html.indexOf('const TEXT_ORDKLASSER='),html.indexOf('\n];',html.indexOf('const TEXT_ORDKLASSER='))+3);
const c=vm.createContext({stadaSvar:x=>String(x??'')});
vm.runInContext(lista.replace('const TEXT_ORDKLASSER','var TEXT_ORDKLASSER'),c);
for(const n of ['textNyckel','textKarna','textSvarRatt'])vm.runInContext(kod(n),c);

test('Synonymer till maximum, minimum och fas godkänns',()=>{
  const fall={maximum:['maximum','Maximum.','ett maximum','max','förstärkning','förstärks','konstruktiv interferens','interferensmaximum','det blir ett maximum'],
    minimum:['minimum','ett minimum','min','försvagas','släckning','utsläckning','destruktiv interferens','destruktiv','tyst','det blir ett minimum'],
    förstärks:['maximum','förstärkning','förstärks'],förstärkning:['förstärks','maximum','konstruktiv'],konstruktiv:['konstruktiv','konstruktiv interferens','Konstruktiv.','förstärkning'],
    motfas:['motfas','i motfas','de är i motfas','motsatt fas'],'i fas':['i fas','de är i fas','samma fas']};
  for(const [f,svar] of Object.entries(fall))for(const a of svar)assert.equal(c.textSvarRatt(a,f),true,`${a} → ${f}`);
});

test('Motsatta begrepp underkänns',()=>{
  for(const [a,f] of [['minimum','maximum'],['släckning','förstärks'],['destruktiv','konstruktiv'],['förstärkning','minimum'],['i fas','motfas'],['motfas','i fas'],['maximum','motfas']])
    assert.equal(c.textSvarRatt(a,f),false,`${a} ≠ ${f}`);
});
