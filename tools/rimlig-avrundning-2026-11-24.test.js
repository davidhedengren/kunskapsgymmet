'use strict';
/* Användarbeslut 2026-11-24: ”det är viktigt att man får rätt i kunskapsgymmet även om man använder fler eller
   färre decimaler (så länge det är inom rimliga gränser)”.
   - Värdesifferrättningen (svarVardesiffror): ett värde exakt mitt emellan får avrundas åt båda hållen från två
     värdesiffror (7,545 → 7,54 eller 7,55), avslutande heltalsnollor prövas i alla tolkningar (200 för 199,7).
   - rimligAvrundningRatt: närmevärden utan aktiv värdesifferrättning godtas korrekt avrundade med en värdesiffra
     färre till tre fler (minst två), eller en decimal färre till tre fler när antalet decimaler anges.
   - Strikt som förut: exakta svar, avrundning av ett givet tal, enhetsomvandlingar, antal och kronbelopp. */
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({state:{course:'fy1'}});
vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
const names=['stadaSvar','enhetMedOrd','skrivetMattal','fysikVardesiffror','fysikVardesiffrorRatt','rimligAvrundningRatt','formelTokens','arEnhetsord','delaEnhet','formelLatex'];
for(const name of ['ENHETSBASER','ENHETSORD']){const i=html.indexOf('const '+name+'=');vm.runInContext(html.slice(i,html.indexOf('\n',i)),c);}
vm.runInContext(html.slice(html.indexOf('const FORMEL_FN='),html.indexOf(';',html.indexOf('const FORMEL_FN='))+1),c);
for(const name of names){const s=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(s,html.indexOf('\n}',s)+2),c);}
const vs=(s,f,n,u='m/s²')=>c.fysikVardesiffrorRatt(s,f,u,{t:'Bestäm accelerationen.',svarVardesiffror:n},0,'numeriskt');
const rim=(s,f,t,kurs,u=null,omr='konstacc')=>{c.state.course=kurs;return c.rimligAvrundningRatt(s,f,u,{t,omr},0,'numeriskt');};

test('värdesiffror: halvsteg åt båda hållen från två siffror, uppåt med en siffra',()=>{
 for(const s of ['7,54','7,55','7,5','7,545'])assert.equal(vs(s,7.545,3),true,s);
 for(const s of ['7,6','7,53','7,56'])assert.equal(vs(s,7.545,3),false,s);
 assert.equal(vs('9',8.5,2,'Ω'),true);assert.equal(vs('8',8.5,2,'Ω'),false);
 assert.equal(vs('61,37',61.375,3,'N'),true);assert.equal(vs('61,38',61.375,3,'N'),true);
});

test('värdesiffror: avslutande nollor prövas i alla tolkningar',()=>{
 assert.equal(vs('200',199.7,4,'N'),true);   // 200 med tre värdesiffror
 assert.equal(vs('199',199.7,4,'N'),false);
 assert.equal(vs('1000',990,4,'N'),false);   // med två eller fler värdesiffror är 990 inte 1000
 assert.equal(vs('97',100,2,'N'),false);
 assert.equal(vs('10,0',9.996,3,'N'),true);
});

test('rimlig avrundning i fysik utan svarVardesiffror',()=>{
 const t='Hur stor vinkel bildar strålen med normalen?';
 for(const s of ['17','17,5','17,46','17,458'])assert.equal(rim(s,17.457603,t,'fy2','°','straloptik'),true,s);
 for(const s of ['17,4','18','17,45','20'])assert.equal(rim(s,17.457603,t,'fy2','°','straloptik'),false,s);
 assert.equal(rim('8,37·10^6',8368000,'Hur mycket energi är det?','fy1','J','energi'),true);
 assert.equal(rim('8,3·10^6',8368000,'Hur mycket energi är det?','fy1','J','energi'),false);
 assert.equal(rim('10440',10444,'Hur många hela steg räcker energin till?','fy1','st','effekt'),false);
});

test('rimlig avrundning i matte: närmevärden ja, exakta svar nej',()=>{
 const t='Bestäm arean. Svara exakt eller med tre decimaler.';
 for(const s of ['2,618','2,62','2,6180'])assert.equal(rim(s,2.6179938779914944,t,'mato2',null,'radianbegreppet'),true,s);
 for(const s of ['2,6','2,617','3'])assert.equal(rim(s,2.6179938779914944,t,'mato2',null,'radianbegreppet'),false,s);
 assert.equal(rim('0,15',0.148,'Skriv talet i decimalform.','ma1',null,'decimaltal_positionssystem'),false);
 assert.equal(rim('0,15',0.148,'Beräkna 0,2 · 0,74.','ma1',null,'multiplikation'),false);   // exakt decimaltal
 assert.equal(rim('160000',162000,'Hur mycket betalas totalt?','ma1',null,'ranta'),false);   // kronbelopp
 assert.equal(rim('1,7',1.6666666666666667,'Bestäm x. Svara exakt.','mato1',null,'deriverbarhet'),false);
 assert.equal(rim('7,8',7.85,'Avrunda 7,8463 till tre värdesiffror.','fy1',null,'matnogg'),false);
 assert.equal(rim('14000',13600,'Omvandla 13,6 g/cm³ till kg/m³.','fy1','kg/m³','enheter'),false);
});
