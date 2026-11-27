'use strict';
/* Felrapport Ma3c 1.150 (2026-11-27): "svarade rätt bara annan formulering". Facit är "ingen lösning", och svar som
   "lösning saknas", "det finns ingen lösning" och "ekvationen har inga lösningar" underkändes. */
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace(/\r\n/g,'\n');
const kod=n=>{const m=new RegExp('function '+n+'\\(').exec(html);assert.ok(m,n);return html.slice(m.index,html.indexOf('\n}',m.index)+2);};
const lista=html.slice(html.indexOf('const TEXT_ORDKLASSER='),html.indexOf('\n];',html.indexOf('const TEXT_ORDKLASSER='))+3);
const c=vm.createContext({stadaSvar:x=>String(x??'')});
vm.runInContext(lista.replace('const TEXT_ORDKLASSER','var TEXT_ORDKLASSER'),c);
for(const n of ['textNyckel','textKarna','textSvarRatt'])vm.runInContext(kod(n),c);

test('Naturliga formuleringar av "ingen lösning" godkänns',()=>{
  for(const a of ['ingen lösning','Ingen lösning.','saknar lösning','Ekvationen saknar lösning','lösning saknas',
    'Lösningar saknas','det finns ingen lösning','Det finns inga lösningar','Ingen lösning finns','Saknar lösningar',
    'ekvationen har ingen lösning','Ekvationen har inga lösningar','saknar reell lösning','inga lösningar','∅'])
    assert.equal(c.textSvarRatt(a,'ingen lösning'),true,a);
});

test('Fel svar och andra facit påverkas inte',()=>{
  for(const a of ['x=1','en lösning','alla x','lösning','det finns en lösning','ekvationen har två lösningar'])
    assert.equal(c.textSvarRatt(a,'ingen lösning'),false,a);
  assert.equal(c.textSvarRatt('det finns ingen lösning','ingen korrelation'),false);
  assert.equal(c.textSvarRatt('lösning saknas','en lösning'),false);
});
