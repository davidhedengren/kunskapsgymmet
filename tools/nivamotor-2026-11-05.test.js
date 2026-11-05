'use strict';
/* Nivåmotorn (användarbeslut 2026-11-05, docs/ADAPTIVITET_ANALYS_2026-11-05.md).
   Simulerade elever med känd förmåga tränar i ett typiskt Fy1-område med nivåmotorns
   riktiga funktioner ur index.html. Gränserna ligger strax under simuleringens utfall;
   den gamla motorn klarade dem inte (placering 14–27 uppgifter, zon 18–40 %). */
const test=require('node:test'),assert=require('node:assert/strict');
const {nivamotor}=require('./nivamotor-hjalp.js');

let seed=7; const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;};
const gauss=()=>{let u=0,v=0;while(!u)u=rnd();while(!v)v=rnd();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);};
const B={1:-1.5,2:-.75,3:0,4:.75,5:1.5};
const sannP=(th,k)=>k.c+(1-k.c)/(1+Math.exp(-1.7*(th-k.b)));

function omrade(antal=[27,49,28,6,0]){
  const k=[];antal.forEach((n,i)=>{for(let j=0;j<n;j++){const fl=rnd()<.15;
    k.push({id:`A${i+1}-${j}`,omr:'A',traningsniva:i+1,b:B[i+1]+gauss()*.45,c:fl?.25:0,
      ...(fl?{alternativ:[{ratt:true},{},{},{}]}:{})});}});
  return k;
}
/* En elev tränar N uppgifter i området, i pass om 8, med chooseTasks nivå- och kortval. */
function korning(th,N,{prior}={}){
  const kort=omrade();
  const cp={areas:{},families:{},history:[],levels:{},formaga:{}};
  if(prior){ cp.formaga.B={mu:th+gauss()*.5,sd:.4,n:12}; cp.formaga.C={mu:th+gauss()*.5,sd:.4,n:12}; }
  const c=nivamotor({cp,uppgifter:kort,state:{passTyp:'grund'}});
  const sedda={seq:0,ids:{}}; let pass=[]; const ut=[];
  for(let i=0;i<N;i++){
    if(i%8===0){ pass=[]; c.state.formFel=0; }
    let fria=kort.filter(t=>!pass.includes(t.id) && c.formFarskhet(sedda,t.id)>0);
    if(!fria.length) fria=kort.filter(t=>!pass.includes(t.id));
    const farsk={};
    for(const L of ['1','2','3','4','5']){ const b=fria.filter(t=>String(t.traningsniva)===L);
      farsk[L]=b.length?Math.max(...b.map(t=>c.formFarskhet(sedda,t.id))):0; }
    const mal=c.formMal('A','grund',{passStart:i%8===0});
    const L=c.formValjNiva(c.formNivaVikter('A',farsk,mal),rnd);
    const kand=fria.filter(t=>String(t.traningsniva)===L)
      .map(t=>({t,k:rnd()*.9+(1-c.formFarskhet(sedda,t.id))*1.2-(sedda.ids[t.id]==null?.35:0)})).sort((a,b)=>a.k-b.k);
    const top=kand.slice(0,Math.max(1,Math.ceil(kand.length*.4)));
    const t=top[Math.floor(rnd()*top.length)].t;
    pass.push(t.id); sedda.seq++; sedda.ids[t.id]=sedda.seq;
    const p=sannP(th,t), ok=rnd()<p;
    ut.push({p,ok});
    c.formagaUppdatera(t,ok?1:0);
    if(ok) c.state.formFel=0; else { c.state.formFel++; c.state.formFelNiva=L; }
    th+=.008;
  }
  return ut;
}
const iZon=r=>r.p>=.6&&r.p<=.9;
function placering(rader){ for(let i=0;i+3<rader.length;i++) if(rader.slice(i,i+4).filter(iZon).length>=3) return i+1; return rader.length; }
function mat(th,N,opt,fran=0,R=60){
  let zon=0,plac=0;
  for(let r=0;r<R;r++){ const rad=korning(th,N,opt); const del=rad.slice(fran);
    zon+=del.filter(iZon).length/del.length; plac+=placering(rad); }
  return {zon:zon/R,plac:plac/R};
}

test('En medelstark elev hamnar på rätt nivå inom några uppgifter',()=>{
  const m=mat(.2,40);
  assert.ok(m.plac<=8,`placering ${m.plac.toFixed(1)}`);
  assert.ok(m.zon>=.45,`i zonen ${m.zon.toFixed(2)}`);
});

test('En stark elev med förkunskap från andra områden placeras direkt och får inte mest lätta uppgifter',()=>{
  const m=mat(.9,40,{prior:true});
  assert.ok(m.plac<=8,`placering ${m.plac.toFixed(1)}`);
  assert.ok(m.zon>=.4,`i zonen ${m.zon.toFixed(2)}`);
});

test('En svag elev får fortfarande uppgifter på sin nivå när de färska korten tagit slut',()=>{
  const m=mat(-1.3,100,{},40,40);
  assert.ok(m.zon>=.55,`i zonen uppgift 41–100: ${m.zon.toFixed(2)}`);
});

test('Gamla profiler räknas om från historiken, även nivå 3',()=>{
  const history=[];for(const L of ['1','2','3'])for(let i=0;i<5;i++)history.push({id:`${L}-${i}`,ok:true,area:'A'});
  const c=nivamotor({cp:{areas:{},families:{},history,levels:{}}});
  const st=c.formagaLas('A');
  assert.equal(st.n,15);
  assert.ok(c.formForvantad(st,B[3])>.75,'nivå 3 sitter');
  assert.ok(c.cp.formaga.A,'omräkningen sparas');
});

test('Ett nytt område startar på förmågan i kursens andra områden',()=>{
  const c=nivamotor({cp:{areas:{},families:{},history:[],levels:{},formaga:{X:{mu:1.2,sd:.4,n:20},Y:{mu:1,sd:.4,n:20}}}});
  const st=c.formagaLas('NY');
  assert.ok(st.mu>.5 && st.sd<1,JSON.stringify(st));
  assert.equal(c.cp.formaga.NY,undefined,'startvärdet sparas inte förrän eleven svarat');
});

test('Rätt med ledtråd, flerval och delkort väger mindre än ett rent rätt svar',()=>{
  const c=nivamotor();const st0=c.formagaLas('A');
  const steg=(t,y)=>{c.cp.formaga={};c.formagaUppdatera(t,y);return c.cp.formaga.A.mu-st0.mu;};
  const rent=steg({omr:'A',traningsniva:3},1);
  assert.ok(steg({omr:'A',traningsniva:3},.5)<rent,'ledtråd');
  assert.ok(steg({omr:'A',traningsniva:3,alternativ:[{ratt:true},{},{},{}]},1)<rent,'flerval');
  assert.ok(steg({omr:'A',traningsniva:3,ursprungsId:'3.1'},1)<rent,'delkort');
});
