const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({stadaSvar:x=>String(x).trim()});
const start=html.indexOf('const SI_PREFIX=');vm.runInContext(html.slice(start,html.indexOf('\nfunction numerisktSvar(',start)),c);
for(const name of ['enhetMedOrd','friAvrundningRatt']){const i=html.indexOf('function '+name+'(');vm.runInContext(html.slice(i,html.indexOf('\n}',i)+2),c);}
const check=(input,value,unit='%',text='',format='numeriskt')=>c.friAvrundningRatt(input,value,unit,{t:text},format);
test('190 och 200 kan vara rätt avrundade svar utan dolt precisionskrav',()=>{
 for(const input of ['186','190','200','190 %','200 procent','185.7','185.71','185.714','1.9e2','1.9·10^2'])assert.equal(check(input,1300/7),true,input);
 for(const input of ['185','180','185.6','190.0','200.0','190e0','1.90e2','190 kr','0'])assert.equal(check(input,1300/7),false,input);
});
test('Fem andra storlekar och negativa tal följer faktiska avrundningssteg',()=>{
 for(const [value,valid,invalid]of [[1234.56,'1200','1300'],[9876.54,'9900','9800'],[249.99,'250','240'],[-185.714,'-190','-180'],[27.2727,'30','20']]){
  assert.equal(check(valid,value),true,valid);assert.equal(check(invalid,value),false,invalid);
 }
 assert.equal(check('200 cm',1.85714,'m'),true);assert.equal(check('190 cm',1.85714,'m'),true);assert.equal(check('190 s',1.85714,'m'),false);
});
test('Uttalad precision, heltalsfacit och formkrav får ingen ny tolerans',()=>{
 for(const text of ['Svara exakt.','Svara med tre värdesiffror.','Avrunda till en decimal.','Svara i hela kronor.'])assert.equal(check('190',1300/7,'%',text),false,text);
 assert.equal(check('200',186),false);assert.equal(check('190',1300/7,'%','','decimalform'),false);
 assert.equal(check('0',.00185),false);
});
