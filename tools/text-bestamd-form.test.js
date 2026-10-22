'use strict';
/* Felrapport ma2 3.190 b (2026-10-22): "medelpunktsvinkeln" underkändes när facit var "medelpunktsvinkel". */
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace(/\r\n/g,'\n');
const kod=n=>{const m=new RegExp('function '+n+'\\(').exec(html);assert.ok(m,n);return html.slice(m.index,html.indexOf('\n}',m.index)+2);};
const lista=html.slice(html.indexOf('const TEXT_ORDKLASSER='),html.indexOf('\n];',html.indexOf('const TEXT_ORDKLASSER='))+3);
const c=vm.createContext({stadaSvar:x=>String(x??'')});
vm.runInContext(lista.replace('const TEXT_ORDKLASSER','var TEXT_ORDKLASSER'),c);
for(const n of ['textNyckel','textKarna','textSvarRatt'])vm.runInContext(kod(n),c);

test('Ett ordsvar i bestämd form godkänns',()=>{
  for(const [a,f] of [['medelpunktsvinkeln','medelpunktsvinkel'],['Randvinkeln','randvinkel'],['diametern','diameter'],['kordan','korda'],['tangenten','tangent']])
    assert.equal(c.textSvarRatt(a,f),true,a);
});

test('Andra ord och fel begrepp underkänns fortfarande',()=>{
  for(const [a,f] of [['randvinkeln','medelpunktsvinkel'],['medelpunktsvinklar','medelpunktsvinkel'],['medelpunktsvinkelns','medelpunktsvinkel'],['jan','ja'],['nejt','nej'],['diametrar','diameter']])
    assert.equal(c.textSvarRatt(a,f),false,a);
});
