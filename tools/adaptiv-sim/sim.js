// Simulerar elever med känd förmåga θ i ett område och jämför hur motorerna väljer uppgift.
// Sanning: P(rätt) = c + (1-c)·σ(1,7(θ − b_L − δ)), δ ~ N(0; 0,45) per kort (författarens nivå är grov),
// c = 0,25 för 15 % flervalskort. Eleven lär sig långsamt (θ += 0,008 per uppgift). Pass om 8 uppgifter.
const nu=require('./motor_nu.js'), ny=require('./motor_ny.js');
const NIV=["1","2","3","4","5"], B={"1":-1.5,"2":-.75,"3":0,"4":.75,"5":1.5};
let seed=12345; const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;};
const gauss=()=>{let u=0,v=0;while(!u)u=rnd();while(!v)v=rnd();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);};
const sig=x=>1/(1+Math.exp(-x));
const DELTA=+process.env.DELTA||.45;

function bank(antal){ const k=[]; NIV.forEach((L,i)=>{ for(let j=0;j<antal[i];j++){ const d=gauss()*DELTA; k.push({L,d,b:B[L]+d,c:rnd()<.15?.25:0,sedd:false}); } }); return k; }
const sannP=(th,k)=>k.c+(1-k.c)*sig(1.7*(th-k.b));

function korning(variant,th0,antal,N){
  const b=bank(antal); let th=th0;
  const st=variant.motor===nu?nu.skapa():ny.skapa(variant.prior?variant.prior(th0):undefined);
  const ut=[];
  for(let i=0;i<N;i++){
    if(i%8===0) variant.motor.nyttPass(st);
    let fria=b.filter(k=>!k.sedd); if(!fria.length){ b.forEach(k=>k.sedd=false); fria=b.slice(); }
    if(variant.mjuk){ // mjuk färskhet: allt utom passets egna kort; nyligen sedda straffas
      fria=b.filter(k=>k.sagsVid==null || i-k.sagsVid>=8).map(k=>{ k.farsk=k.sagsVid==null?1:Math.min(1,((i-k.sagsVid)/80)**2)*.8; return k; });
    }
    let kort;
    if(variant.motor===nu){
      const finns=Object.fromEntries(NIV.map(L=>[L,fria.some(k=>k.L===L)]));
      const L=nu.valjNiva(st,finns,rnd); const kand=fria.filter(k=>k.L===L); kort=kand[Math.floor(rnd()*kand.length)];
    }else kort=ny.valj(st,fria,rnd,{kalibrerad:variant.kalibrerad,mjuk:variant.mjuk});
    kort.sedd=true; kort.sagsVid=i;
    const p=sannP(th,kort), ok=rnd()<p;
    ut.push({L:kort.L,p,ok});
    if(variant.motor===nu) nu.registrera(st,kort.L,ok); else ny.registrera(st,variant.kalibrerad?kort.b:B[kort.L],ok,false,kort.c);
    th+=.008;
  }
  return ut;
}
function matt(rader){
  const n=rader.length;
  const z=rader.filter(r=>r.p>=.6&&r.p<=.9).length/n, latt=rader.filter(r=>r.p>.9).length/n, svar=rader.filter(r=>r.p<.6).length/n;
  const ratt=rader.filter(r=>r.ok).length/n;
  // Första uppgiften från vilken minst 3 av 4 hamnar i zonen
  let forst=n; for(let i=0;i+3<n;i++){ if(rader.slice(i,i+4).filter(r=>r.p>=.6&&r.p<=.9).length>=3){forst=i;break;} }
  return {ratt,z,latt,svar,forst};
}
const snitt=l=>Object.fromEntries(Object.keys(l[0]).map(x=>[x,l.reduce((s,o)=>s+o[x],0)/l.length]));
const pct=x=>(100*x).toFixed(0).padStart(3)+' %';

const ELEVER=[["svag",-1.3],["under medel",-.5],["medel",.2],["stark",.9],["mycket stark",1.7]];
const OMR={"typiskt Fy1-område":[27,49,28,6,0], "område med full nivå 4–5":[25,35,30,15,8]};
const VARIANTER=[
  {namn:"Nuvarande motor",motor:nu},
  {namn:"Fas 1: förmåga+förkunskap+mjuk färskh.",motor:ny,prior:th=>({mu:th+gauss()*.5,sd:.6}),mjuk:true},
  {namn:"Fas 1 + kalibrerade kort (fas 3)",motor:ny,prior:th=>({mu:th+gauss()*.5,sd:.6}),kalibrerad:true,mjuk:true},
];
const R=+process.argv[2]||300, N=+process.argv[3]||40, fran=+process.argv[4]||0;
for(const [omrNamn,antal] of Object.entries(OMR)){
  console.log(`\n=== ${omrNamn} (kort per nivå ${antal.join('/')}) · uppgift ${fran+1}–${N} · ${R} elever per typ ===`);
  console.log('elev          variant                          rätt   i zonen  för lätt  för svår  i zonen från uppgift');
  for(const [namn,th] of ELEVER){ for(const v of VARIANTER){
    const res=[]; for(let r=0;r<R;r++){ const rad=korning(v,th,antal,N); res.push({...matt(rad.slice(fran)),forst:matt(rad).forst}); }
    const s=snitt(res);
    console.log(`${namn.padEnd(13)} ${v.namn.padEnd(32)} ${pct(s.ratt)}  ${pct(s.z)}    ${pct(s.latt)}    ${pct(s.svar)}      ${(s.forst+1).toFixed(1)}`);
  } console.log(''); }
}
