// Trogen kopia av Kunskapsgymmets nuvarande nivåval för ETT område (index.html 2026-11-05):
// levelStats/updateLevelStat, behärskar, oppnaNivaer/nivaKlarad, kamparPa, naddNiva,
// levelWeights, levelMix (golv), uppvärmning. Område- och familjeval ingår inte.
const NIVAER=["1","2","3","4","5"];
const NIVA_KRAV=3, KAMPAR_VIKT=.12, TILLBAKA_RATT=2, NADD_RATT=2, NADD_GATE=.8, NIVA_GOLV=.10, UPPVARMNING=2;
const NIVA_TYNGD={"-1":1.4,"0":2.2,"1":1.2,"2":.7,"3":.45,"4":.3};

function skapa(){ return {levels:{}, history:[], sessionDone:0}; }
function levelStats(st,L){ return st.levels[L] ||= {s:.5,n:0}; }
function behärskar(x){ return Math.max(0,Math.min(1,(x.s-.55)/.25))*Math.max(0,Math.min(1,x.n/6)); }
function nivaKlarad(st,L){
  if((st.levels[L]?.n||0)>=8) return true;
  let n=0; for(const h of st.history) if(h.ok && !h.hint && h.L===L && ++n>=NIVA_KRAV) return true;
  return false;
}
function oppnaNivaer(st,finns){
  const oppen={}; let forra=null, las=false;
  for(const L of NIVAER){
    if(!finns[L]){ oppen[L]=!las; continue; }
    if(forra!==null && !nivaKlarad(st,forra)) las=true;
    oppen[L]=!las; forra=L;
  }
  return oppen;
}
function kamparPa(st,L){
  const h=st.history; let n=0, fel=0, rattEfter=0, efterFel=true;
  for(let i=h.length-1;i>=0 && n<3;i--){
    const x=h[i];
    if(x.L===L){ n++; if(!x.ok){ fel++; efterFel=false; } }
    if(efterFel && x.ok && !x.hint && x.L<=L) rattEfter++;
  }
  return fel>=2 && rattEfter<TILLBAKA_RATT;
}
function naddNiva(st,L){
  const s=st.levels[L];
  if(s && s.n>=8 && s.s>=.6) return true;
  let n=0; for(const h of st.history) if(h.ok && !h.hint && h.L===L && ++n>=NADD_RATT) return true;
  return false;
}
function levelWeights(st,finns,vikt){
  const m=Object.fromEntries(NIVAER.map(L=>[L,behärskar(levelStats(st,L))]));
  const w={}, oppen=oppnaNivaer(st,finns); let kamparUnder=false;
  NIVAER.forEach((L,i)=>{ if(i===0||!finns[L]) return; if(kamparUnder) oppen[L]=false; else if(kamparPa(st,L)) kamparUnder=L; });
  const nadd=Object.fromEntries(NIVAER.map(L=>[L,!!(finns[L]&&oppen[L]&&naddNiva(st,L))]));
  let topp=null; NIVAER.forEach(L=>{ if(nadd[L]) topp=L; });
  if(kamparUnder && topp && topp>kamparUnder) topp=kamparUnder;
  NIVAER.forEach((L,i)=>{
    const lagre=NIVAER.slice(0,i).filter(K=>finns[K]);
    const redo=lagre.length?Math.min(...lagre.map(K=>m[K])):1;
    let gate=i===0?1:!oppen[L]?0:Math.max(.04,redo);
    if(gate && nadd[L]) gate=Math.max(gate,NADD_GATE);
    w[L]=gate*(1-.65*m[L]);
  });
  if(topp) NIVAER.forEach(L=>{ const d=Number(topp)-Number(L); w[L]*=d<-1?1:NIVA_TYNGD[String(Math.min(4,d))]; });
  if(kamparUnder) w[kamparUnder]*=KAMPAR_VIKT;
  if(vikt) NIVAER.forEach(L=>w[L]*=(vikt[L]??1));
  return w;
}
function levelMix(st,finns,vikt,tungt){
  const w=levelWeights(st,finns,vikt), golv=tungt?.04:NIVA_GOLV;
  NIVAER.forEach(L=>{ if(!finns[L]) w[L]=0; });
  const tot=NIVAER.reduce((x,L)=>x+(w[L]||0),0); if(!tot) return null;
  const mix={}; NIVAER.forEach(L=>mix[L]=(w[L]||0)/tot);
  const lagst=NIVAER.find(L=>finns[L]);
  if(lagst && mix[lagst]<golv){
    const ovrigt=NIVAER.filter(L=>L!==lagst).reduce((s,L)=>s+mix[L],0);
    mix[lagst]=golv; if(ovrigt>0) NIVAER.filter(L=>L!==lagst).forEach(L=>mix[L]=mix[L]/ovrigt*(1-golv));
  }
  return mix;
}
/* Välj nivå som chooseTask gör (finns = nivåer med osedda/färska kort). */
function valjNiva(st,finns,rnd,opt={}){
  const mix=levelMix(st,finns,opt.vikt,opt.tungt); let level=null;
  if(mix){ let x=rnd(); for(const L of NIVAER){ x-=mix[L]; if(x<=0 && finns[L]){ level=L; break; } } }
  if(!level || !finns[level]) level=NIVAER.find(L=>finns[L])||"1";
  if(st.sessionDone<UPPVARMNING && level>"1"){ const lagre=NIVAER.filter(L=>L<level && finns[L]); if(lagre.length) level=lagre[lagre.length-1]; }
  return level;
}
function registrera(st,L,ok,hint=false){
  const s=levelStats(st,L), v=hint?.5:1;
  s.s = ok ? s.s+.16*v*(1-s.s) : s.s-.22*s.s; s.s=Math.max(.06,Math.min(.97,s.s)); s.n++;
  st.history.push({L,ok,hint}); if(st.history.length>300) st.history.shift();
  st.sessionDone++;
}
function nyttPass(st){ st.sessionDone=0; }
module.exports={skapa,valjNiva,registrera,nyttPass,namn:"Nuvarande motor"};
