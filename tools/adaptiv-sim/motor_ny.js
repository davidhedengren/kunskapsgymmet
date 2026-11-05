// Förslag: förmågeskattning per område (θ med osäkerhet) + val mot en målträffsäkerhet.
// Lagring per område: {mu, sd, n}. Uppdatering: Bayes på rutnät, sedan Gaussisk approximation
// (som Glicko), plus litet processbrus så att skattningen kan följa elevens inlärning.
// Placering: när osäkerheten är stor siktar motorn lägre (P ≈ 0,6), eftersom sådana frågor ger
// mest information. När skattningen är säker siktar den på passtypens mål (grund 0,75).
const NIVAER=["1","2","3","4","5"];
const B={"1":-1.5,"2":-.75,"3":0,"4":.75,"5":1.5}, D=1.7;
const GRID=Array.from({length:61},(_,i)=>-4+i*8/60);
const sig=x=>1/(1+Math.exp(-x));
const Pk=(th,b,c=0)=>c+(1-c)*sig(D*(th-b));
const MAL={grund:.75,teknik:.85,mangd:.82,tungt:.62,repetition:.8};

function skapa(prior={mu:-.6,sd:1.1}){ return {mu:prior.mu,sd:prior.sd,n:0,sessionDone:0,senaste:[]}; }
function vikter(st){ return GRID.map(t=>Math.exp(-.5*((t-st.mu)/st.sd)**2)); }
function forvantat(st,b,c=0){
  const w=vikter(st); let s=0,p=0;
  GRID.forEach((t,i)=>{ s+=w[i]; p+=w[i]*Pk(t,b,c); });
  return p/s;
}
function malFor(st,typ){
  const bas=MAL[typ]||MAL.grund;
  const osaker=Math.max(0,Math.min(1,(st.sd-.45)/.6));
  let m=bas-(bas-.6)*osaker;                 // placering: sikta på 0,6 när osäkerheten är stor
  if(st.sessionDone===0 && st.n>=6) m=Math.max(m,.85);   // lugn start på passet när nivån är känd
  const s=st.senaste.slice(-2);
  if(s.length===2 && !s[0] && !s[1]) m=Math.max(m,.88);  // två fel i rad: en uppgift att lyckas med
  return m;
}
/* fria: [{L, b?, c}] osedda kort. Utan kalibrering används nivåns b; med kalibrering kortets b. */
function valj(st,fria,rnd,opt={}){
  const mal=malFor(st,opt.typ), tau=.1;
  if(opt.kalibrerad){
    const w=fria.map(k=>Math.exp(-(((forvantat(st,k.b,k.c)-mal)/tau)**2))*(opt.mjuk?k.farsk:1));
    let x=rnd()*w.reduce((a,b)=>a+b,0);
    for(let i=0;i<fria.length;i++){ x-=w[i]; if(x<=0) return fria[i]; }
    return fria.at(-1);
  }
  const f=k=>opt.mjuk?k.farsk:1;
  const finns=NIVAER.filter(L=>fria.some(k=>k.L===L));
  // Nivåns vikt = passform × hur mycket färskt innehåll som finns kvar på nivån
  const w=finns.map(L=>Math.exp(-(((forvantat(st,B[L])-mal)/tau)**2))*Math.max(...fria.filter(k=>k.L===L).map(f)));
  let x=rnd()*w.reduce((a,b)=>a+b,0), L=finns.at(-1);
  for(let i=0;i<finns.length;i++){ x-=w[i]; if(x<=0){ L=finns[i]; break; } }
  const kand=fria.filter(k=>k.L===L), kw=kand.map(f);
  let y=rnd()*kw.reduce((a,b)=>a+b,0);
  for(let i=0;i<kand.length;i++){ y-=kw[i]; if(y<=0) return kand[i]; }
  return kand.at(-1);
}
/* y = 1 rätt, 0 fel, 0,5 rätt med ledtråd. vikt < 1 för korrelerade delkort i samma kedja. */
function registrera(st,b,ok,hint=false,c=0,vikt=1){
  const y=ok?(hint?.5:1):0;
  const w=vikter(st);
  const post=GRID.map((t,i)=>{ const p=Pk(t,b,c); return w[i]*Math.pow(p,y*vikt)*Math.pow(1-p,(1-y)*vikt); });
  const s=post.reduce((a,x)=>a+x,0);
  const mu=post.reduce((a,x,i)=>a+x*GRID[i],0)/s;
  const v=post.reduce((a,x,i)=>a+x*(GRID[i]-mu)**2,0)/s;
  st.mu=mu; st.sd=Math.max(.3,Math.min(1.4,Math.sqrt(v+.012)));
  st.n++; st.sessionDone++; st.senaste.push(ok&&!hint); if(st.senaste.length>6) st.senaste.shift();
}
function nyttPass(st){ st.sessionDone=0; st.senaste=[]; }
/* Migrering: skatta mu ur gamla nivåstatistiken {L:{s,n}} (n begränsas till 6 per nivå). */
function franGammal(levels,prior={mu:-.6,sd:1.1}){
  const st=skapa(prior);
  for(const L of NIVAER){ const x=levels?.[L]; if(!x||!x.n) continue;
    const n=Math.min(6,x.n), r=Math.round(x.s*n);
    for(let i=0;i<n;i++) registrera(st,B[L],i<r); }
  st.sessionDone=0; st.senaste=[]; st.n=0;
  return st;
}
module.exports={skapa,valj,registrera,nyttPass,franGammal,forvantat,malFor,B,D,namn:"Förslag"};
