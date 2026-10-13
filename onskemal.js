/* Önskemål och allmänna problem är fristående från uppgiftsrapporter och XP. */
'use strict';
const KG_ONSKEMAL_TYP={fler_uppgifter:'Fler uppgifter',funktion:'Förslag på förbättring',problem:'Problem med appen'};
const KG_ONSKEMAL_STATUS={oppen:'Öppen',pagar:'Pågår',atgardad:'Åtgärdad',avslutad:'Avslutad'};
let kgOnskemalRequest=null,kgOnskemalAvsandare=null,kgOnskemalFokus=null,kgOnskemalLista=[],kgOnskemalFilter='oppen';
const kgOnskemalUtkast=new Map();
async function kgOnskemalRpc(name,body={}){
  const uid=session?.user?.id;
  if(!uid||!await giltigSession()||session?.user?.id!==uid) throw new Error('Logga in för att skicka eller läsa önskemål.');
  const r=await fetch(SUPABASE_URL+'/rest/v1/rpc/'+name,{method:'POST',headers:sbHeaders(true),body:JSON.stringify(body)});
  let data;try{data=await r.json();}catch(_){data=null;}
  if(session?.user?.id!==uid) throw new Error('Kontot har ändrats. Öppna önskemålet igen.');
  if(!r.ok){
    if(r.status===404||data?.code==='PGRST202') throw new Error(arAdmin?'Önskemålsfunktionen behöver aktiveras med sql/2026-10-13-onskemal.sql i Supabase.':'Önskemålsfunktionen är inte tillgänglig just nu. Försök igen senare.');
    if(String(data?.message).includes('for_manga_onskemal'))throw new Error('Du har skickat många önskemål. Försök igen om en stund.');
    if(r.status===401||r.status===403)throw new Error('Du saknar behörighet eller behöver logga in igen.');
    throw new Error('Det gick inte att spara eller hämta önskemålet. Försök igen.');
  }
  return data;
}
function kgOnskemalModal(title){
  document.getElementById('kontomeny')?.remove();document.getElementById('kg-onskemal-ruta')?.remove();
  kgOnskemalFokus=document.querySelector('.konto')||document.activeElement;
  const el=document.createElement('div');el.id='kg-onskemal-ruta';el.className='modal';
  el.innerHTML=`<div class="modal-kort" role="dialog" aria-modal="true" aria-labelledby="kg-onskemal-titel" style="width:min(650px,100%)"><div class="modal-topp"><h2 id="kg-onskemal-titel">${esc(title)}</h2><button class="iconbtn" type="button" onclick="kgOnskemalStang()" aria-label="Stäng">✕</button></div><div id="kg-onskemal-kropp" class="kg-onskemal-kropp"></div></div>`;
  document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target===el)kgOnskemalStang();});
  el.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();e.stopPropagation();kgOnskemalStang();return;}
    if(e.key==='Tab'){const a=[...el.querySelectorAll('button:not(:disabled),input,select,textarea,a[href]')].filter(x=>x.getClientRects().length);const first=a[0],last=a.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}
  });requestAnimationFrame(()=>{el.classList.add('visa');el.querySelector('select,button')?.focus();});return document.getElementById('kg-onskemal-kropp');
}
function kgOnskemalStang(){document.getElementById('kg-onskemal-ruta')?.remove();kgOnskemalFokus?.focus();kgOnskemalRequest=null;kgOnskemalAvsandare=null;}
function kgOnskemalRensa(){kgOnskemalStang();kgOnskemalLista=[];kgOnskemalUtkast.clear();kgOnskemalFilter='oppen';}
function kgOnskemalVal(values,current){return Object.entries(values).map(([v,t])=>`<option value="${esc(v)}"${v===current?' selected':''}>${esc(t)}</option>`).join('');}
function kgOnskemalOppna(){
  if(!session){loggaIn();return;}
  kgOnskemalRequest=crypto.randomUUID();kgOnskemalAvsandare=session.user?.id;
  const host=kgOnskemalModal('Skicka in önskemål');
  host.innerHTML=`<p class="modal-text">Saknar du uppgifter eller har du ett förslag? Här kan du också berätta om problem med appen.</p>
    <form id="kg-onskemal-form" onsubmit="event.preventDefault();kgOnskemalSkicka()">
      <label for="kg-onskemal-typ">Vad vill du skicka?</label><select id="kg-onskemal-typ" onchange="kgOnskemalTypByt()">${kgOnskemalVal(KG_ONSKEMAL_TYP,'funktion')}</select>
      <label for="kg-onskemal-kurs">Kurs <span id="kg-onskemal-kurs-hjalp">(valfri för förslag och problem)</span></label><select id="kg-onskemal-kurs"><option value="">Ingen särskild kurs</option>${kgOnskemalVal(Object.fromEntries(Object.entries(COURSES).map(([k,v])=>[k,v.name])),state.course||'')}</select>
      <div id="kg-onskemal-uppgifter" hidden><label for="kg-onskemal-omrade">Område</label><input id="kg-onskemal-omrade" maxlength="160" placeholder="Till exempel rörelse eller kombinatorik">
      <label for="kg-onskemal-niva">Träningsnivå</label><select id="kg-onskemal-niva">${kgOnskemalVal({'1':'Nivå 1','2':'Nivå 2','3':'Nivå 3','4':'Nivå 4','5':'Nivå 5',blandad:'Blandade nivåer'},'blandad')}</select></div>
      <label for="kg-onskemal-text">Beskriv ditt önskemål eller problem</label><textarea id="kg-onskemal-text" maxlength="2000" rows="5" required placeholder="Berätta vad du saknar eller vad som inte fungerar."></textarea>
      <p class="kg-onskemal-fel" id="kg-onskemal-fel" role="alert"></p><div class="modal-fot"><button class="btn" type="button" onclick="kgOnskemalStang()">Avbryt</button><button class="btn primary" id="kg-onskemal-skicka" type="submit">Skicka</button></div>
    </form>`;host.querySelector('form').addEventListener('input',()=>{document.getElementById('kg-onskemal-fel').textContent='';});kgOnskemalTypByt();
}
function kgOnskemalTypByt(){const fler=document.getElementById('kg-onskemal-typ')?.value==='fler_uppgifter';document.getElementById('kg-onskemal-uppgifter').hidden=!fler;document.getElementById('kg-onskemal-kurs-hjalp').hidden=fler;document.getElementById('kg-onskemal-omrade').required=fler;document.getElementById('kg-onskemal-kurs').required=fler;}
async function kgOnskemalSkicka(){
  const form=document.getElementById('kg-onskemal-form'),button=document.getElementById('kg-onskemal-skicka'),error=document.getElementById('kg-onskemal-fel');if(!form||!button||button.disabled)return;
  const text=document.getElementById('kg-onskemal-text').value.trim(),type=document.getElementById('kg-onskemal-typ').value,area=document.getElementById('kg-onskemal-omrade').value.trim(),course=document.getElementById('kg-onskemal-kurs').value;
  if(!text){error.textContent='Beskriv ditt önskemål eller problem.';return;}
  if(text.length>2000||area.length>160){error.textContent='Förkorta texten innan du skickar.';return;}
  if(type==='fler_uppgifter'&&(!course||!area)){error.textContent='Välj kurs och ange ett område.';return;}
  if(session?.user?.id!==kgOnskemalAvsandare){error.textContent='Kontot har ändrats. Öppna formuläret igen.';return;}
  const request=kgOnskemalRequest;button.disabled=true;button.textContent='Skickar…';error.textContent='';
  try{
    const reply=await kgOnskemalRpc('kg_skicka_onskemal',{p_request:request,p_typ:type,p_kurs:course||null,p_omrade:type==='fler_uppgifter'?area:null,p_niva:type==='fler_uppgifter'?document.getElementById('kg-onskemal-niva').value:null,p_beskrivning:text});
    if(reply?.ok!==true)throw new Error('Önskemålet kunde inte sparas. Försök igen.');
    if(!form.isConnected||kgOnskemalRequest!==request)return;
    document.getElementById('kg-onskemal-kropp').innerHTML='<p class="modal-text" role="status"><strong>Tack! Ditt inskick har sparats.</strong></p><p class="modal-text">Du kan följa statusen under Mina önskemål.</p><div class="modal-fot"><button class="btn" onclick="kgOnskemalMina()">Mina önskemål</button><button class="btn primary" onclick="kgOnskemalStang()">Stäng</button></div>';document.querySelector('#kg-onskemal-kropp button')?.focus();
  }catch(e){if(form.isConnected){error.textContent=e.message;button.disabled=false;button.textContent='Skicka';}}
}
function kgOnskemalKort(r,admin=false){
  const draft=kgOnskemalUtkast.get(String(r.id))||r;
  return `<article class="kg-onskemal-post"><div class="kg-onskemal-rad"><strong>${esc(KG_ONSKEMAL_TYP[r.typ]||r.typ)}</strong><span>${esc(KG_ONSKEMAL_STATUS[r.status]||r.status)}</span></div><p class="modal-text">${esc([r.kurs?(COURSES[r.kurs]?.name||r.kurs):null,r.omrade,r.niva?(r.niva==='blandad'?'Blandade nivåer':'Nivå '+r.niva):null,kgAdminTid(r.skapad)].filter(Boolean).join(' · '))}</p>
    ${admin?`<p class="modal-text">${esc(r.rapportor_namn)}${r.rapportor_epost?' · '+esc(r.rapportor_epost):''}</p>`:''}<p class="kg-onskemal-text">${esc(r.beskrivning)}</p>
    ${admin?`<div class="kg-onskemal-edit" data-onskemal-id="${esc(r.id)}"><label>Status<select data-onskemal-status>${kgOnskemalVal(KG_ONSKEMAL_STATUS,draft.status)}</select></label><label>Kommentar till den som skickat (valfri)<textarea data-onskemal-kommentar maxlength="1000" rows="2">${esc(draft.kommentar||'')}</textarea></label><button class="btn sm primary" type="button" onclick="kgOnskemalAdminSpara(this)">Spara</button><p class="kg-onskemal-fel" role="alert"></p></div>`:r.kommentar?`<div class="fel-svar"><b>Kommentar från admin</b><p>${esc(r.kommentar)}</p></div>`:''}</article>`;
}
async function kgOnskemalMina(){
  if(!session){loggaIn();return;}
  const host=kgOnskemalModal('Mina önskemål');host.innerHTML='<p class="modal-text">Hämtar dina inskick…</p>';
  try{const rows=await kgOnskemalRpc('kg_mina_onskemal');if(host.isConnected)host.innerHTML=(rows.length?rows.map(r=>kgOnskemalKort(r)).join(''):'<p class="modal-text">Du har inga inskickade önskemål ännu.</p>')+'<div class="modal-fot"><button class="btn primary" onclick="kgOnskemalOppna()">Skicka in önskemål</button><button class="btn" onclick="kgOnskemalStang()">Stäng</button></div>';}
  catch(e){if(host.isConnected)host.innerHTML=`<p class="kg-onskemal-fel" role="alert">${esc(e.message)}</p><button class="btn" onclick="kgOnskemalMina()">Försök igen</button>`;}
}
async function kgOnskemalAdminRita(host){
  if(!host)return;
  if(!arAdmin){host.textContent='Endast admin kan läsa alla önskemål.';return;}
  host.innerHTML='<p class="modal-text">Hämtar önskemål…</p>';
  try{const rows=await kgOnskemalRpc('kg_admin_onskemal');if(!host.isConnected||kgAdminFlik!=='onskemal'||!arAdmin)return;kgOnskemalLista=rows;kgOnskemalAdminLista(host);}
  catch(e){if(host.isConnected&&kgAdminFlik==='onskemal')host.innerHTML=`<p class="kg-onskemal-fel" role="alert">${esc(e.message)}</p><button class="btn" onclick="kgOnskemalAdminRita(document.getElementById('adminlista'))">Försök igen</button>`;}
}
function kgOnskemalAdminLista(host=document.getElementById('adminlista')){
  if(!host||!arAdmin)return;
  const rows=kgOnskemalLista.filter(r=>kgOnskemalFilter==='alla'||r.status===kgOnskemalFilter);
  host.innerHTML=`<div class="kg-onskemal-toolbar"><label>Visa<select onchange="kgOnskemalFilter=this.value;kgOnskemalAdminLista()">${kgOnskemalVal({...KG_ONSKEMAL_STATUS,alla:'Alla'},kgOnskemalFilter)}</select></label><button class="btn sm" onclick="kgOnskemalKopiera(this)">Kopiera logg</button></div><p class="modal-text">${rows.length} inskick i detta urval.</p>`+(rows.length?rows.map(r=>kgOnskemalKort(r,true)).join(''):'<p class="modal-text">Inga önskemål i detta urval.</p>');
  host.querySelectorAll('.kg-onskemal-edit').forEach(row=>row.addEventListener('input',()=>kgOnskemalUtkast.set(row.dataset.onskemalId,{status:row.querySelector('select').value,kommentar:row.querySelector('textarea').value})));
}
async function kgOnskemalAdminSpara(button){
  if(!arAdmin||button.disabled)return;const row=button.closest('[data-onskemal-id]'),id=row.dataset.onskemalId,error=row.querySelector('.kg-onskemal-fel');button.disabled=true;error.textContent='';
  try{const reply=await kgOnskemalRpc('kg_admin_onskemal_status',{p_id:Number(id),p_status:row.querySelector('select').value,p_kommentar:row.querySelector('textarea').value.trim()||null});if(reply?.ok!==true)throw new Error('Granskningen kunde inte sparas.');kgOnskemalUtkast.delete(id);await kgOnskemalAdminRita(document.getElementById('adminlista'));}
  catch(e){if(row.isConnected){error.textContent=e.message;button.disabled=false;}}
}
function kgOnskemalLoggText(rows){return `Inskickade önskemål · Kunskapsgymmet · ${new Date().toLocaleDateString('sv-SE')}\n\n`+rows.map(r=>`${KG_ONSKEMAL_TYP[r.typ]||r.typ}${r.kurs?' · '+r.kurs:''}${r.omrade?' · '+r.omrade:''}${r.niva?' · nivå '+r.niva:''}\n  status: ${KG_ONSKEMAL_STATUS[r.status]||r.status}\n  kommentar: ${r.beskrivning}\n  från: ${r.rapportor_namn||'Okänd'} · ${kgAdminTid(r.skapad)}${r.kommentar?'\n  admins kommentar: '+r.kommentar:''}\n`).join('\n');}
async function kgOnskemalKopiera(button){
  if(!arAdmin)return;const rows=kgOnskemalLista.filter(r=>kgOnskemalFilter==='alla'||r.status===kgOnskemalFilter),text=kgOnskemalLoggText(rows);
  try{await navigator.clipboard.writeText(text);button.textContent='Kopierat';}catch(_){const file=new Blob([text],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download='onskemal-kunskapsgymmet.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);button.textContent='Loggen nedladdad';}
}
