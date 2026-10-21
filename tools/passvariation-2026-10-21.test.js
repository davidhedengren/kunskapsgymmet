'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/../index.html','utf8');
function setup(){const c=vm.createContext({state:{lastIds:[],passHistory:[]},SEDDA_KARENS_MAX:250});for(const name of ['uppgiftsAlder','farskaUppgifter']){const i=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(i,html.indexOf('\n}',i)+2),c);}return c;}
test('Två åttapass använder alla 16 kort före återbesök',()=>{
 const c=setup(),pool=Array.from({length:16},(_,i)=>({id:String(i)})),history={seq:0,ids:{}},seen=[];
 for(let pass=0;pass<2;pass++){c.state.passHistory=[];c.state.lastIds=[];for(let i=0;i<8;i++){const t=c.farskaUppgifter(pool,history)[0];seen.push(t.id);history.ids[t.id]=++history.seq;c.state.lastIds.push(t.id);c.state.passHistory.push({task:t});}}
 assert.equal(new Set(seen).size,16);
});
test('Små uttömda urval går vidare utan direkt repetition eller tomt urval',()=>{
 for(const size of [1,2,6,8]){const c=setup(),pool=Array.from({length:size},(_,i)=>({id:String(i)})),history={seq:0,ids:{}},counts={};let last;
 for(let i=0;i<size*4;i++){const t=c.farskaUppgifter(pool,history)[0];assert.ok(t);if(size>1)assert.notEqual(t.id,last);last=t.id;counts[t.id]=(counts[t.id]||0)+1;history.ids[t.id]=++history.seq;c.state.passHistory.push({task:t});}
 assert.deepEqual(Object.values(counts),Array(size).fill(4));}
});
