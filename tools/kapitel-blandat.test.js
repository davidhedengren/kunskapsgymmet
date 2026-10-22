'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(__dirname+'/../index.html','utf8');
function load(c,names){for(const name of names){const i=html.indexOf(`function ${name}(`);assert.ok(i>=0,name);vm.runInContext(html.slice(i,html.indexOf('\n}',i)+2),c);}}
test('Blandat växlar mellan områden oberoende av hur många uppgifter de innehåller',()=>{
 const c=vm.createContext({state:{passHistory:[]},chooseArea:p=>p[0]?.omr});load(c,['chooseChapterArea']);
 const pool=[...Array.from({length:100},(_,i)=>({id:'a'+i,omr:'a'})),{id:'b1',omr:'b'},{id:'c1',omr:'c'}],areas=[];
 for(let i=0;i<9;i++){const a=c.chooseChapterArea(pool);areas.push(a);c.state.passHistory.push({task:{omr:a}});}
 assert.deepEqual(areas,['a','b','c','a','b','c','a','b','c']);
 // Ett uttömt område ska inte ge tomma urval när andra har uppgifter kvar.
 assert.equal(c.chooseChapterArea(pool.filter(x=>x.omr==='a')),'a');
});
test('Kapitelstart rensar familje-/nivåfilter och vanliga pass rensar blandatläget',()=>{
 const state={focusFamily:'gammal',focusNiva:['5'],mixChapter:'fel'};
 const c=vm.createContext({state,PASS:{},profile:{goal:8},availableTasks:()=>[{kap:1,omr:'a'},{kap:2,omr:'a'},{kap:2,omr:'b'},{kap:3,omr:'c'}],chapterName:()=> 'Algebra',rensaPagaendePass:()=>{},navRecord:()=>{},nextTask:()=>{},startArea:()=>{}});
 load(c,['beginSession','startChapter','startAdaptive']);c.startChapter(2);
 assert.equal(state.mixChapter,'2');assert.deepEqual(Array.from(state.focusOmr),['a','b']);assert.equal(state.focusFamily,null);assert.equal(state.focusNiva,null);assert.equal(state.focusNamn,'Blandat · Algebra');
 c.startAdaptive();assert.equal(state.mixChapter,null);assert.equal(state.focusOmr,null);
});
test('Blandat-kortet är en riktig tangentbordsknapp med tydligt kapitelnamn',()=>{
 const c=vm.createContext({esc:s=>s,chapterName:()=> 'Energi'});load(c,['chapterMixedCard']);const output=c.chapterMixedCard(5);
 assert.match(output,/^<button/);assert.match(output,/aria-label="Blandat: Energi"/);assert.match(output,/startChapter\('5'\)/);
 assert.doesNotMatch(output,/meter|level|XP/);
});
