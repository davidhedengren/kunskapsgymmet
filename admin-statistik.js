/* Global statistik: enbart admin. Tid från befintliga synliga heartbeat-signaler,
   aldrig en påstådd exakt sessionslängd. Kalenderdagar följer Europe/Stockholm. */
let kgOversikt=null, kgOversiktFel='', kgStatDagar=14, kgStatDagA='', kgStatDagB='';
function kgStatDatumOffset(dag,n){
  const d=new Date(dag+'T12:00:00Z'); d.setUTCDate(d.getUTCDate()+n);
  return d.toISOString().slice(0,10);
}
function kgStatIdag(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Stockholm',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
function kgStatDelta(n,bas,enhet=""){
  if(n==null||bas==null)return 'Underlag saknas';
  const diff=n-bas, sign=diff>0?'+':diff<0?'−':'';
  const antal=kgAdminTal(Math.abs(Math.round(diff*10)/10));
  const procent=bas>0?' ('+sign+Math.round(Math.abs(diff/bas)*100)+' %)':'';
  return sign+antal+(enhet?" "+enhet:"")+procent;
}
function kgStatNormalisera(data){
  const totals=new Map((data.global?.dagar||[]).map(d=>[String(d.dag).slice(0,10),Number(d.uppgifter)||0]));
  return (data.dagar||[]).map(d=>({...d,dag:String(d.dag).slice(0,10),uppgifter:Number(d.uppgifter)||0,
    alla_uppgifter:totals.has(String(d.dag).slice(0,10))?totals.get(String(d.dag).slice(0,10)):null,
    nya:Number(d.nya)||0,aktiva:Number(d.aktiva)||0,aktiv_minuter:Number(d.aktiv_minuter)||0,
    snitt_minuter:Number(d.aktiva)>0?(Number(d.aktiv_minuter)||0)/Number(d.aktiva):null}));
}
function kgStatPeriod(dagar,slut,langd){
  const start=kgStatDatumOffset(slut,1-langd),rows=dagar.filter(d=>d.dag>=start&&d.dag<=slut);
  const aktiva=new Set(rows.flatMap(d=>d.aktiva_ids||[]));
  const sum=k=>rows.reduce((s,d)=>s+(Number(d[k])||0),0);
  return {start,slut,rows,aktiva,uppgifter:sum('uppgifter'),nya:sum('nya'),minuter:sum('aktiv_minuter'),
    aktiva_dagar:sum('aktiva'),snitt:sum('aktiva')?sum('aktiv_minuter')/sum('aktiva'):null,
    komplett:rows.length===langd};
}
async function kgAdminHamtaOversikt(){
  kgOversikt=null;kgOversiktFel='';
  try{kgOversikt=await kgAdminRpc('kg_admin_oversikt');}
  catch(e){kgOversiktFel=e.message;}
}
function kgStatKort(v,label,sub=''){
  return `<div class="kgstat-kort"><span>${esc(label)}</span><strong>${esc(v)}</strong>${sub?`<small>${sub}</small>`:''}</div>`;
}
function kgStatValDagar(n){kgStatDagar=Number(n)===30?30:14;kgAdminRitaOversikt(document.getElementById('adminlista'));}
function kgStatValDag(which,value){
  if(which==='a')kgStatDagA=value;else kgStatDagB=value;
  kgAdminRitaOversikt(document.getElementById('adminlista'));
}
function kgStatGraf(dagar,nyckel,titel,color='uppgifter'){
  const shown=dagar.slice(-kgStatDagar);const max=Math.max(1,...shown.map(d=>Number(d[nyckel])||0));
  const tick=Math.ceil(max);
  return `<section class="kgstat-panel"><h3>${esc(titel)}</h3><div class="kgstat-chart-wrap">
    <div class="kgstat-axel" aria-hidden="true"><span>${kgAdminTal(tick)}</span><span>${kgAdminTal(Math.round(tick/2))}</span><span>0</span></div>
    <div class="kgstat-chart" style="--kolumner:${shown.length}" role="group" aria-label="${esc(titel)}. Klicka på en dag för jämförelse.">${shown.map((d,i)=>{
      const value=Math.round((Number(d[nyckel])||0)*10)/10,label=d[nyckel]==null?"–":kgAdminTal(value),height=value===0?0:Math.max(1,value/tick*100);
      return `<button class="kgstat-bar ${color} ${d.dag===kgStatDagA?'vald':''}" onclick="kgStatValDag('a','${d.dag}')" aria-label="${esc(kgAdminDag(d.dag))}: ${label}" title="${esc(kgAdminDag(d.dag))}: ${label}">
        <span class="kgstat-value">${label}</span><span class="kgstat-track"><i style="height:${height}%"></i></span><span class="kgstat-date">${i%Math.ceil(shown.length/7)===0||i===shown.length-1?esc(d.dag.slice(5)):''}</span></button>`;
    }).join('')}</div></div><p class="kgstat-caption">Klicka på en stapel för att välja jämförelsedag. Idag är ännu inte en hel dag.</p></section>`;
}
function kgStatTimGraf(timmar){
  if(!Array.isArray(timmar)||!timmar.length)return '';
  const values=Array.from({length:24},(_,h)=>({h,n:Number(timmar.find(t=>Number(t.timme)===h)?.antal)||0}));
  const max=Math.max(1,...values.map(t=>t.n));
  return `<section class="kgstat-panel"><h3>När tränar användarna? · senaste 14 dagarna</h3><div class="kgstat-chart" style="--kolumner:24;height:155px;margin-top:22px" role="img" aria-label="Uppgifter per timme, svensk tid">${values.map(t=>`<div class="kgstat-bar" title="${t.h}:00 · ${kgAdminTal(t.n)} uppgifter"><span class="kgstat-track"><i style="height:${t.n/max*100}%"></i></span><span class="kgstat-date">${t.h%3===0?t.h:''}</span></div>`).join('')}</div><p class="kgstat-caption">Antal besvarade uppgifter per timme, svensk tid. Både inloggad och anonym träning.</p></section>`;
}
function kgAdminRitaOversikt(host){
  if(!host||!arAdmin)return;
  if(!kgOversikt){host.innerHTML=`<div class="kgstat-panel"><h3>Aktivera den nya statistiköversikten</h3><p>${esc(kgOversiktFel||'Dagsdata saknas.')}</p><p>Kör <code>sql/2026-10-11-admin-statistik.sql</code> i Supabase och klicka på Uppdatera. Befintliga användare och klassvyer fungerar under tiden.</p></div>`;return;}
  const data=kgOversikt,dagar=kgStatNormalisera(data),idag=String(data.idag||kgStatIdag()).slice(0,10);
  if(!dagar.some(d=>d.dag===kgStatDagA))kgStatDagA=idag;
  if(!dagar.some(d=>d.dag===kgStatDagB))kgStatDagB=kgStatDatumOffset(idag,-1);
  const current=dagar.find(d=>d.dag===idag)||{},yesterday=dagar.find(d=>d.dag===kgStatDatumOffset(idag,-1));
  const lastWeek=dagar.find(d=>d.dag===kgStatDatumOffset(idag,-7));
  const week=kgStatPeriod(dagar,kgStatDatumOffset(idag,-1),7),before=kgStatPeriod(dagar,kgStatDatumOffset(idag,-8),7);
  const enough=before.komplett && data.forsta_aktivitet && before.start>=data.forsta_aktivitet;
  const returned=[...week.aktiva].filter(id=>before.aktiva.has(id)).length;
  const users=kgAdminData.anvandare||[], total=users.length;
  const avg=current.snitt_minuter==null?'–':kgAdminMin(current.snitt_minuter);
  const allAvailable=current.alla_uppgifter!=null;
  const allWeek=allAvailable&&week.rows.every(d=>d.alla_uppgifter!=null)&&before.rows.every(d=>d.alla_uppgifter!=null);
  const weekTasks=allWeek?week.rows.reduce((s,d)=>s+d.alla_uppgifter,0):week.uppgifter;
  const previousTasks=allWeek?before.rows.reduce((s,d)=>s+d.alla_uppgifter,0):before.uppgifter;
  const taskKey=allAvailable?'alla_uppgifter':'uppgifter';
  const first=data.forsta_aktivitet;
  const diff=(day,key)=>day&&(!first||day.dag>=first)?kgStatDelta(current[key],day[key]):'Underlag saknas';
  const a=dagar.find(d=>d.dag===kgStatDagA),b=dagar.find(d=>d.dag===kgStatDagB);
  const format=(v,time=false)=>v==null?'–':time?kgAdminMin(v):kgAdminTal(v);
  const metrics=[['Alla uppgifter','alla_uppgifter',false],['Uppgifter inloggade','uppgifter',false],['Aktiva konton','aktiva',false],['Nya konton','nya',false],['Inloggningar','inloggningar',false],['Uppskattad aktiv tid','aktiv_minuter',true],['Aktiv tid per aktivt konto','snitt_minuter',true]];
  host.innerHTML=`<div class="kgstat-heading"><div><h3>Användning av Kunskapsgymmet</h3><p>Uppdaterad ${esc(kgAdminTid(data.hamtad))} · svensk kalenderdag</p></div><div class="kgstat-range"><button class="btn sm" onclick="kgStatExport()">Exportera dagsdata</button><button class="btn sm" onclick="kgStatExportAnalys()" title="Spara en analysfil som kan bifogas i chatten. Inga namn eller e-postadresser ingår.">Exportera för analys</button></div></div>
    <div class="kgstat-grid">
      ${kgStatKort(kgAdminTal(total),'Registrerade konton',`+${kgAdminTal(current.nya)} idag · +${kgAdminTal(kgStatPeriod(dagar,idag,7).nya)} senaste 7 dagarna`)}
      ${kgStatKort(format(current[taskKey]),allAvailable?'Uppgifter idag · alla':'Uppgifter idag · inloggade',`${diff(yesterday,taskKey)} mot igår<br>${diff(lastWeek,taskKey)} mot samma veckodag förra veckan`)}
      ${kgStatKort(format(current.aktiva),'Aktiva konton idag',`${diff(yesterday,'aktiva')} mot igår<br>${kgAdminTal(users.filter(u=>u.online).length)} online nu`)}
      ${kgStatKort(avg,'Aktiv tid per aktivt konto idag','Uppskattning från synliga heartbeat-signaler')}
      ${kgStatKort(kgAdminTal(weekTasks),allWeek?'Uppgifter · 7 hela dagar · alla':'Uppgifter inloggade · 7 hela dagar',`${enough?kgStatDelta(weekTasks,previousTasks):'Underlag saknas'} mot föregående 7 dagar`)}
      ${kgStatKort(kgAdminTal(week.aktiva.size),'Aktiva konton · 7 hela dagar',`${enough?kgStatDelta(week.aktiva.size,before.aktiva.size):'Underlag saknas'} mot föregående 7 dagar`)}
    </div>
    <p class="kgstat-notice">Dagens siffror pågår och jämförs med hela tidigare dagar. Veckokorten jämför två avslutade sjudagarsperioder. Aktiva konton räknas en gång per period, även om de tränar flera dagar. Anonyma webbläsare räknas inte som konton.</p>
    <div class="kgstat-heading"><h3>Utveckling över tid</h3><div class="kgstat-range" aria-label="Diagramperiod"><button class="btn sm ${kgStatDagar===14?'primary':''}" onclick="kgStatValDagar(14)">14 dagar</button><button class="btn sm ${kgStatDagar===30?'primary':''}" onclick="kgStatValDagar(30)">30 dagar</button></div></div>
    <div class="kgstat-grafer">${kgStatGraf(dagar,taskKey,allAvailable?'Besvarade uppgifter · inloggade och anonyma':'Besvarade uppgifter · inloggade')}${kgStatGraf(dagar,'aktiva','Aktiva konton per dag','anvandare')}${kgStatGraf(dagar,'nya','Nya konton per dag','nya')}${kgStatGraf(dagar,'snitt_minuter','Aktiv tid per aktivt konto · minuter','tid')}</div>
    <section class="kgstat-panel"><div class="kgstat-heading"><h3>Jämför två dagar</h3><div class="kgstat-datum"><label>Dag A <input type="date" min="${dagar[0]?.dag||idag}" max="${idag}" value="${kgStatDagA}" onchange="kgStatValDag('a',this.value)"></label><label>Dag B <input type="date" min="${dagar[0]?.dag||idag}" max="${idag}" value="${kgStatDagB}" onchange="kgStatValDag('b',this.value)"></label></div></div>
      <div class="kgstat-tabellwrap"><table class="kgstat-tabell"><thead><tr><th>Mått</th><th>${esc(kgAdminDag(kgStatDagA))}${kgStatDagA===idag?' · pågår':''}</th><th>${esc(kgAdminDag(kgStatDagB))}${kgStatDagB===idag?' · pågår':''}</th><th>Skillnad A − B</th></tr></thead><tbody>${metrics.map(([label,key,time])=>`<tr><th scope="row">${label}</th><td>${format(a?.[key],time)}</td><td>${format(b?.[key],time)}</td><td>${time?((a?.[key]==null||b?.[key]==null)?'Underlag saknas':kgStatDelta(a[key],b[key],'min')):kgStatDelta(a?.[key],b?.[key])}</td></tr>`).join('')}</tbody></table></div>
    </section>
    <div class="kgstat-grid">
      ${kgStatKort(enough?`${kgAdminTal(returned)} av ${kgAdminTal(before.aktiva.size)}`:'–','Återkommande konton',enough?'Aktiva både föregående och senaste hela sjudagarsperioden':'Mer historik behövs för jämförelsen')}
      ${kgStatKort(week.aktiva.size?kgAdminTal(Math.round(week.uppgifter/week.aktiva.size*10)/10):'–','Uppgifter per aktivt konto','Senaste 7 hela dagarna · inloggad träning')}
      ${kgStatKort(kgAdminPct(week.rows.reduce((s,d)=>s+(Number(d.ratt)||0),0),week.uppgifter),'Andel rätt','Senaste 7 hela dagarna · inloggad träning')}
      ${kgStatKort(kgAdminTal(kgAdminData.rapporter.filter(r=>r.status==='oppen').length),'Öppna identifierade felrapporter','Rapporterna i adminlistan · högst 1 000 hämtade')}
    </div>
    <section class="kgstat-panel"><h3>Kurser · inloggad träning senaste 30 dagarna</h3><div class="kgstat-kurser">${(data.kurser||[]).map(k=>`<div><b>${esc(COURSES[k.kurs]?.name||k.kurs)}</b><span>${kgAdminTal(k.uppgifter)} uppgifter · ${kgAdminPct(k.ratt,k.uppgifter)} rätt</span></div>`).join('')||'<p>Ingen kursaktivitet registrerad.</p>'}</div></section>
    ${kgStatTimGraf(data.global?.timmar)}
    ${data.global?.inlogg?`<section class="kgstat-panel"><h3>Inloggad och anonym träning</h3>${statDelning(data.global.inlogg)}<p>Anonyma webbläsare är enhetsnycklar, inte identifierade personer.</p></section>`:''}
    <details class="kgstat-panel"><summary>Vad mäter siffrorna?</summary><p>Aktiv tid uppskattas från närvaro i ett synligt fönster. Den är inte exakt skärmtid eller längden på en inloggningssession. Snittet är tid per aktivt konto och dag. Inloggningar är nya inloggningstillfällen, inte varje besök med en sparad inloggning.</p><p>Första registrerade inloggade aktivitet i detta underlag: ${esc(first?kgAdminDag(first):'saknas')}. Äldre dagsdata kan inte återskapas. Totalt antal konton omfattar de användare som adminlistan identifierar som Kunskapsgymmet-användare.</p><p>Inloggningsdatan innehåller ingen tillförlitlig geografisk position. Skolanknytning visar vald skola, inte var personen befinner sig. Ingen IP-positionering eller platsinsamling har lagts till.</p></details>`;
}
function kgStatExport(){
  if(!arAdmin||!kgOversikt)return;
  const rows=kgStatNormalisera(kgOversikt),keys=['dag','alla_uppgifter','uppgifter','aktiva','nya','inloggningar','aktiv_minuter','snitt_minuter'];
  const csv='\uFEFF'+[keys.join(';'),...rows.map(d=>keys.map(k=>d[k]==null?'':String(d[k]).replace('.',',')).join(';'))].join('\r\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='kunskapsgymmet-dagsstatistik-'+kgOversikt.idag+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
/* Ett uttryckligt urval av aggregerade fält: interna konto-ID:n och profiler
   får inte följa med bara för att backend lägger till ett nytt fält. */
function kgStatAnalysData(data,users=[],rapporter=[],dagA='',dagB=''){
  const dagar=kgStatNormalisera(data),idag=String(data.idag||kgStatIdag()).slice(0,10);
  const keys=['dag','alla_uppgifter','uppgifter','ratt','aktiva','nya','inloggningar','aktiv_minuter','snitt_minuter'];
  const day=d=>d?Object.fromEntries(keys.map(k=>[k,d[k]==null?null:k==='dag'?d[k]:Number(d[k])])):null;
  const vecka=kgStatPeriod(dagar,kgStatDatumOffset(idag,-1),7);
  const forra=kgStatPeriod(dagar,kgStatDatumOffset(idag,-8),7);
  const giltig=p=>!!(p.komplett&&data.forsta_aktivitet&&p.start>=data.forsta_aktivitet);
  const period=p=>({fran:p.start,till:p.slut,hela_dagar:true,tillracklig_historik:giltig(p),
    alla_uppgifter:giltig(p)&&p.rows.every(d=>d.alla_uppgifter!=null)?p.rows.reduce((n,d)=>n+d.alla_uppgifter,0):null,
    uppgifter:giltig(p)?p.uppgifter:null,unika_aktiva_konton:giltig(p)?p.aktiva.size:null,
    nya:giltig(p)?p.nya:null,aktiv_minuter:giltig(p)?p.minuter:null,snitt_minuter:giltig(p)?p.snitt:null,
    ratt:giltig(p)?p.rows.reduce((n,d)=>n+(Number(d.ratt)||0),0):null});
  const a=day(dagar.find(d=>d.dag===(dagA||idag))),b=day(dagar.find(d=>d.dag===(dagB||kgStatDatumOffset(idag,-1))));
  const diff=(x,y)=>Object.fromEntries(keys.filter(k=>k!=='dag').map(k=>[k,x?.[k]==null||y?.[k]==null?null:x[k]-y[k]]));
  const curr=period(vecka),prev=period(forra);
  const delning=Object.fromEntries(['idag','vecka','totalt'].filter(k=>data.global?.inlogg?.[k]).map(k=>[k,
    Object.fromEntries(['inloggade','anonyma','uppg_inloggade','uppg_anonyma'].map(f=>[f,Number(data.global.inlogg[k][f])||0]))]));
  return {format:'kunskapsgymmet-statistikanalys',version:1,exporterad:new Date().toISOString(),
    data_hamtad:data.hamtad||null,tidszon:'Europe/Stockholm',idag,
    period:{fran:dagar[0]?.dag||null,till:dagar.at(-1)?.dag||null,antal_dagar:dagar.length},
    forsta_registrerade_aktivitet:data.forsta_aktivitet||null,
    konton:{registrerade:users.length,online_vid_hamtning:users.filter(u=>u.online).length},
    dagsdata:dagar.map(day),
    vald_dagsjamforelse:{a,b,skillnad_a_minus_b:diff(a,b)},
    sjudagarsjamforelse:{senaste:curr,foregaende:prev,
      skillnad:Object.fromEntries(['alla_uppgifter','uppgifter','unika_aktiva_konton','nya','aktiv_minuter','snitt_minuter','ratt'].map(k=>[k,curr[k]==null||prev[k]==null?null:curr[k]-prev[k]])),
      aterkommande_konton:giltig(vecka)&&giltig(forra)?[...vecka.aktiva].filter(id=>forra.aktiva.has(id)).length:null},
    kurser:(data.kurser||[]).map(k=>({kurs:k.kurs,uppgifter:Number(k.uppgifter)||0,ratt:Number(k.ratt)||0})),
    uppgifter_per_timme_senaste_14_dagarna:(data.global?.timmar||[]).map(t=>({timme:Number(t.timme),antal:Number(t.antal)||0})),
    inloggad_och_anonym_traning:delning,
    felrapporter:{oppna_i_adminlistan:rapporter.filter(r=>r.status==='oppen').length,max_hamtade:1000},
    definitioner:{alla_uppgifter:'Besvarade uppgifter från inloggad och anonym träning. Null om underlag saknas.',
      uppgifter:'Besvarade uppgifter från inloggade konton.',ratt:'Antal rätt bland inloggade uppgifter.',
      aktiva:'Unika konton med uppgifter, inloggning eller synlig närvarosignal under kalenderdagen.',
      nya:'Nya registrerade konton enligt svensk kalenderdag.',
      inloggningar:'Nya inloggningstillfällen. Besök med sparad inloggning behöver inte räknas.',
      aktiv_minuter:'Uppskattad tid från synliga heartbeat-signaler, inte exakt sessionstid eller aktiv problemlösning.',
      snitt_minuter:'Uppskattade minuter per aktivt konto och dag. Periodsnitt vägs med antal aktiva kontodagar.',
      aterkommande_konton:'Konton aktiva i båda de avslutade sjudagarsperioderna.',
      kurser:'Inloggad träning under dagsdatans 30-dagarsperiod.',
      anonym:'Anonyma webbläsare är enhetsnycklar, inte identifierade personer.'},
    begransningar:['Idag är en pågående dag och ska inte jämföras som en avslutad dag.',
      'Null betyder att jämförelseunderlag saknas. Äldre dagsdata kan inte återskapas.',
      'Kontolista och kursstatistik omfattar användare som de befintliga adminfunktionerna identifierar.',
      'Aktiv tid är uppskattad närvaro och visar inte hur länge någon faktiskt arbetar eller är inloggad.',
      'Geografisk position saknas. Exporten innehåller inga namn, e-postadresser, konto-ID:n eller rapporttexter.']};
}
function kgStatExportAnalys(){
  if(!arAdmin||!kgOversikt)return;
  const data=kgStatAnalysData(kgOversikt,kgAdminData.anvandare||[],kgAdminData.rapporter||[],kgStatDagA,kgStatDagB);
  const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='kunskapsgymmet-analys-'+kgOversikt.idag+'.json';a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
