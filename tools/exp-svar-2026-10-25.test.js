const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),ctx=vm.createContext({hjalp:{grader:false},rk:{ans:0}});
const i=src.indexOf('function raknTolka(');vm.runInContext(src.slice(i,src.indexOf('\n}',i)+2),ctx);
const calc=s=>ctx.raknTolka(s,{grader:false,strict:true});
test('exp stöds som funktion även i sammansatta exakta svar',()=>{
 for(const [input,want] of [['exp(3)',Math.exp(3)],['exp(-2)',Math.exp(-2)],['(exp(1)+2)/3',(Math.E+2)/3],['2+exp(-4)',2+Math.exp(-4)],['ln(exp(2))',2],['exp(ln(3))',3],['exp(0)',1]])assert.ok(Math.abs(calc(input)-want)<1e-12,input);
});
test('Ingen ändring av potenser, logaritmer, parenteskrav och räknarens vinkelinställning',()=>{
 for(const [s,v]of [['e^3',Math.E**3],['ln(e)',1],['log(100)',2],['2e^2',2*Math.E**2]])assert.ok(Math.abs(calc(s)-v)<1e-12);
 assert.equal(ctx.raknTolka('exp(1)',{grader:true,strict:true}),Math.E);
 for(const s of ['exp(','exp(1','exp(x)','exp(2))','expression(2)'])assert.throws(()=>calc(s));
});
