// Nivåfördelning per kurs/område i Kunskapsgymmets banker, som spelet ser dem (expanderade delkort).
const fs=require('fs'),vm=require('vm'),path=require('path');
const KG=require('path').join(__dirname,'../../')+'/';
const banker={fy1:'uppgifter.js',fy2:'uppgifter2.js',ma1:'uppgifterma1.js',ma2:'uppgifterma2.js',mato1:'uppgiftermato1.js',mato2:'uppgiftermato2.js',matf1:'uppgiftermatf1.js'};
const fb=t=>{const n=String(t.niva||'E').toUpperCase();return n==='G'?1:n==='E'||!'ACG'.includes(n)?2:n==='C'?3:5;};
const lvl=(t,del)=>{const v=del&&del.traningsniva!=null?del.traningsniva:t.traningsniva;const n=Number(v);return Number.isInteger(n)&&n>=1&&n<=5?n:fb(t);};
const ut={};
for(const [k,f] of Object.entries(banker)){
  const c={window:{}};vm.runInNewContext(fs.readFileSync(KG+f,'utf8'),c);
  const B=Object.values(c.window).find(Array.isArray);const bank=B.filter(t=>t.spel!==false);
  const kort=[];let kedjor=0,kedjaDelar=0,kedjaSpann=[];
  for(const t of bank){
    if(t.spelDelning==='deluppgifter'&&Array.isArray(t.spelDelar)){
      const syn=t.spelDelar.filter(d=>d&&d.spel!==false);
      if(syn.length>=2){kedjor++;kedjaDelar+=syn.length;const L=syn.map(d=>lvl(t,d));kedjaSpann.push(L);}
      syn.forEach(d=>kort.push({omr:t.omr,L:lvl(t,d),kedja:syn.length>=2}));
    }else kort.push({omr:t.omr,L:lvl(t),kedja:false});
  }
  const per={};for(const x of kort){(per[x.omr]||=[0,0,0,0,0])[x.L-1]++;}
  const tot=[0,0,0,0,0];kort.forEach(x=>tot[x.L-1]++);
  const omr=Object.entries(per);
  const utan=L=>omr.filter(([,v])=>v[L-1]===0).length;
  const fa=L=>omr.filter(([,v])=>v[L-1]>0&&v[L-1]<8).length;
  // Kedjor: hur ofta börjar kedjan på lägre nivå än den högsta delen?
  const spannStor=kedjaSpann.filter(L=>Math.max(...L)-Math.min(...L)>=2).length;
  ut[k]={kort:kort.length,omraden:omr.length,niva:tot,andelKedja:+(kort.filter(x=>x.kedja).length/kort.length).toFixed(2),kedjor,
    omrUtanNiva:[1,2,3,4,5].map(utan),omrMed1till7:[1,2,3,4,5].map(fa),kedjorMedSpann2plus:spannStor};
}
console.log(JSON.stringify(ut,null,1));
