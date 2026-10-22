'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({});
vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
const names=['stadaSvar','enhetMedOrd','skrivetMattal','fysikVardesiffror','fysikVardesiffrorRatt','formelTokens','arEnhetsord','delaEnhet','formelLatex'];
for(const name of ['ENHETSBASER','ENHETSORD']){const i=html.indexOf('const '+name+'=');vm.runInContext(html.slice(i,html.indexOf('\n',i)),c);}
vm.runInContext(html.slice(html.indexOf('const FORMEL_FN='),html.indexOf(';',html.indexOf('const FORMEL_FN='))+1),c);
for(const name of names){const s=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(s,html.indexOf('\n}',s)+2),c);}
const grade=(s,f=9427.2,u='J',n=2)=>c.fysikVardesiffrorRatt(s,f,u,{t:'Beräkna energin.',svarVardesiffror:n},0,'numeriskt');
test('Två rekommenderade värdesiffror: korrekt avrundade 1–4 godtas, 5 nekas',()=>{
 for(const s of ['9000','9400','9430','9427','9e3','9.4*10^3 J','9,427e3 J','9.427 kJ','0.009427 MJ','9.4·10³ J','9.4 X 10^(3) J','9 400 J'])assert.equal(grade(s),true,s);
 for(const s of ['9427.2','9.4272 kJ','9.4000e3 J','0.0094272 MJ','9401','9300','9.3e3 J','-9400','9.4e3 W','9.4e3 kJ','0','NaN','Infinity','9400+100','sqrt(9427.2)'])assert.equal(grade(s),false,s);
});
test('±2 gäller även nedåt; noll och negativa tal kan inte kringgå avrundningen',()=>{
 assert.equal(grade('1.01',1.005),true);
 assert.equal(grade('1.00',1.005),false);
 assert.equal(grade('-1.01',-1.005),true);
 assert.equal(grade('9e3',9427.2,'J',4),false);
 assert.equal(grade('9.4e3',9427.2,'J',4),true);
 assert.equal(grade('-9.4e3',-9427.2),true);
 assert.equal(grade('0',1e-20),false);
 assert.equal(grade('0',0),true);
 assert.equal(grade('1e-20',0),false);
 assert.equal(grade('4.142e-16',1.5*1.3806e-23*2e7),true);
 assert.equal(grade('4.1418e-16',1.5*1.3806e-23*2e7),false);
});
test('Uttryckliga krav och äldre kort lämnas till befintlig rättning',()=>{
 for(const t of ['Svara med två decimaler.','Svara med tre värdesiffror.','Svara exakt.','Svara med ett heltal.'])
  assert.equal(c.fysikVardesiffrorRatt('9.4',9.427,'J',{t,svarVardesiffror:2},0,'numeriskt'),null,t);
 assert.equal(c.fysikVardesiffrorRatt('9.4',9.427,'J',{t:''},0,'numeriskt'),null);
 assert.equal(c.fysikVardesiffrorRatt('9.4',9.427,'J',{t:'',svarVardesiffror:2},0,'uttryck'),null);
});
test('Precision räknas på mantissan, med avslutande decimalnollor',()=>{
 for(const [s,n] of [['0.004200',4],['4.200e-3',4],['4,20·10⁻³ kg',3],['4200',2],['4200.0',5],['4200e0',4],['1e10',1]])assert.equal(c.skrivetMattal(s).digits,n,s);
});
test('Sammansatta enheter är upprätta och avskilda från talet i förhandsvisningen',()=>{
 for(const [s,unit] of [['24 kg m/s','\\frac{\\mathrm{kg}\\cdot \\mathrm{m}}{\\mathrm{s}}'],['24 kg·m/s','\\frac{\\mathrm{kg}\\cdot \\mathrm{m}}{\\mathrm{s}}'],['3 m/s','\\frac{\\mathrm{m}}{\\mathrm{s}}'],['9.82 m/s²','\\frac{\\mathrm{m}}{\\mathrm{s}^{2}}'],['4 J/(kg K)','\\frac{\\mathrm{J}}{\\mathrm{kg}\\cdot \\mathrm{K}}'],['2 N·s','\\mathrm{N}\\cdot \\mathrm{s}']]){
  const r=c.formelLatex(s);assert.equal(r.ok,true);assert.ok(r.latex.endsWith('\\,'+unit),s+' '+r.latex);
 }
 assert.equal(c.formelLatex('1,5x').latex,'1{,}5 x');
 assert.equal(c.formelLatex('(x+1)/(x-1)').latex,'\\frac{x + 1}{x - 1}');
});

test('Samma enhetstext som facit godtas även när enheten saknas i enhetstabellen (ljusår)',()=>{
 const ly=(s)=>c.fysikVardesiffrorRatt(s,1.8307,'ljusår',{t:'Hur långt är avståndet?',svarVardesiffror:2},0,'numeriskt');
 for(const s of ['1,8 ljusår','1.83 ljusår','1,8','1,8 Ljusår'])assert.equal(ly(s),true,s);
 for(const s of ['1,9 ljusår','1,8 km','2 ljusår x'])assert.equal(ly(s),false,s);
});
