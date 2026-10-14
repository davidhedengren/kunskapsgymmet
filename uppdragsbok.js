/* Bokvyn visar den befintliga veckologgen. Uppdrag, XP och pass hanteras
   fortfarande av index.html; bläddring ska aldrig belöna eller ändra mål. */
let uppdragBokDialog=null;
const UPPDRAG_BOK_BILD="assets/uppdragsbok.webp";

function uppdragOmslag(u){
  const klara=u.tak?0:u.lista.filter(x=>x.klar).length;
  return `<div class="pt-upp-yta ub-ingang"><button class="ub-omslag" onclick="oppnaDagensUppdrag()"
    aria-haspopup="dialog" title="Öppna uppdragsboken" aria-label="Öppna uppdragsboken${u.tak?"":`: ${klara} av ${u.lista.length} klara idag`}">
    <img src="${UPPDRAG_BOK_BILD}" alt="" width="480" height="720" decoding="async">
    ${u.tak?"":`<span class="ub-omslag-progress" aria-hidden="true">${klara}/${u.lista.length}</span>`}
  </button></div>`;
}
function uppdragBokUppgift(x,index,datum){
  const idag=datum===uppdragNyckel(),n=Math.min(x.mal,Math.max(0,x.n||0));
  const text=!idag&&x.typ==="dagsmal"?`Slutför dagsmålet: ${x.mal} uppgifter i kursen`:x.text;
  return `<article class="ub-uppgift${x.klar?" klar":""}${x.huvud?" huvud":""}">
    <div class="ub-uppgift-rad"><span class="ub-kategori">${x.huvud?"Huvuduppdrag":`Uppdrag ${index+1}`}</span>
      ${UPPDRAG_XP_PA?`<span class="pt-uppxp ub-xp">+${uppdragXp(x)/(idag?1:2)} XP</span>`:""}</div>
    <h3>${esc(text)}</h3>
    <div class="ub-framsteg"><span>${x.klar?"✓ Klart":`${n} av ${x.mal}`}</span>
      <div class="ub-progress" role="progressbar" aria-label="${esc(text)}" aria-valuemin="0" aria-valuemax="${x.mal}" aria-valuenow="${n}"><i style="width:${n/x.mal*100}%"></i></div></div>
    ${!x.klar?`<button class="ub-trana" onclick="uppdragStarta('${datum}',${index})" ${!idag&&!uppdragRetroTillatet()?"disabled":""}
      aria-label="Träna: ${esc(x.text)}">${n?"Fortsätt":"Börja"}<span aria-hidden="true"> →</span></button>`:""}
  </article>`;
}
function uppdragBokSidor(){
  const idag=dagensUppdrag(),datum=uppdragBokDatum(),arIdag=datum===uppdragNyckel();
  const u=arIdag?idag:profile.uppdragsVecka?.[datum]?.kurser?.[state.course];
  const dagar=uppdragVeckodagar(),i=dagar.indexOf(datum),d=new Date(datum+"T12:00:00");
  const veckodag=d.toLocaleDateString("sv-SE",{weekday:"long"});
  const datumtext=d.toLocaleDateString("sv-SE",{day:"numeric",month:"long",year:"numeric"});
  const lista=u?.lista||[],klara=lista.filter(x=>x.klar).length;
  const huvud=Math.max(0,lista.findIndex(x=>x.huvud));
  const bonus=u?.klar?"Alla uppdrag klara" : `Alla klara: +${UPPDRAG_DAG_XP/(arIdag?1:2)} XP`;
  const status=lista.length?`${klara} av ${lista.length} uppdrag klara`:"Inga sparade uppdrag";
  const info=u?.tak?`Du har redan uppdrag i ${UPPDRAG_MAX_KURSER} kurser idag. Nya uppdrag kommer i morgon.`
    :!u?"Det finns inga sparade uppdrag för den här dagen i den här kursen."
    :!arIdag?"Äldre uppdrag ger halva XP-belöningen.":"";
  return {datum,i,datumtext,status,html:`
    <section class="ub-page ub-vanster" aria-label="${esc(datumtext)}">
      <h2 class="ub-veckodag">${esc(veckodag)}</h2><p class="ub-dag">${esc(datumtext)}</p>
      <p class="ub-kurs">${esc(COURSES[state.course]?.name||"")}</p>
      <div class="ub-ornament" aria-hidden="true">✦</div>
      ${lista.length?uppdragBokUppgift(lista[huvud],huvud,datum):`<div class="ub-tom-vanster">${uppdragIkon()}<p>${u?.tak?"En ny sida i morgon":"En tom sida"}</p></div>`}
      <div class="ub-dagstatus"><b>${esc(status)}</b>${lista.length&&UPPDRAG_XP_PA?`<span class="ub-bonus${u.klar?" klar":""}">${esc(bonus)}</span>`:""}</div>
      ${info?`<p class="ub-info">${esc(info)}</p>`:""}<span class="ub-folio" aria-hidden="true">${i*2+1}</span>
    </section>
    <section class="ub-page ub-hoger" aria-label="Dina uppdrag">
      <h2 class="ub-sidrubrik">Dina uppdrag</h2>
      ${lista.length?lista.map((x,index)=>index===huvud?"":uppdragBokUppgift(x,index,datum)).join("")
        :`<div class="ub-tom"><span aria-hidden="true">✧</span><h3>${u?.tak?"Dagens uppdrag fördelade":"Inga uppdrag sparade"}</h3><p>${esc(info)}</p><p>Bläddra till en annan dag för att se fler uppdrag.</p></div>`}
      ${!arIdag&&lista.length&&!uppdragRetroTillatet()?`<p class="ub-info">Äldre uppdrag är inte aktiverade än. Du kan träna på dagens uppdrag under tiden.</p>`:""}
      <span class="ub-folio" aria-hidden="true">${i*2+2}</span>
    </section>`};
}
function uppdragVisaBok(){
  if(!state.course||!state.data)return;
  if(uppdragBokDialog){uppdragBokRita(0);return;}
  const el=document.createElement("dialog");el.id="uppdragsbok";el.className="ub-dialog";
  el.setAttribute("aria-labelledby","ub-titel");
  el.innerHTML=`<div class="ub-bar"><h2 id="ub-titel">Uppdragsboken</h2><button class="ub-stang" aria-label="Stäng uppdragsboken" onclick="stangUppdragsbok()">×</button></div>
    <div class="ub-volym"><div class="ub-spread" tabindex="0" aria-label="Uppdrag för vald dag"></div>
      <button class="ub-corner bak" data-ub-nav="bak" onclick="uppdragBladdra(-1)" aria-label="Föregående dag" title="Bläddra till föregående dag"></button>
      <button class="ub-corner fram" data-ub-nav="fram" onclick="uppdragBladdra(1)" aria-label="Nästa dag" title="Bläddra till nästa dag"></button>
    </div>
    <nav class="ub-nav" aria-label="Uppdragsbokens datum">
      <div class="ub-nav-mitt"><span class="ub-datum" aria-live="polite" aria-atomic="true"></span>
        <button class="ub-idag" onclick="uppdragBokIdag()" aria-label="Till dagens uppdrag">Till idag</button></div>
    </nav>`;
  uppdragBokDialog={el,agare:ggAgare(),kurs:state.course,view:state.view,focus:document.activeElement,animation:null};
  el.addEventListener("cancel",e=>{e.preventDefault();stangUppdragsbok();});
  el.addEventListener("click",e=>{if(e.target===el)stangUppdragsbok();});
  el.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft"||e.key==="ArrowRight"){
      e.preventDefault();e.stopPropagation();uppdragBladdra(e.key==="ArrowLeft"?-1:1);
    }
    if(e.key==="Tab"){
      const tabs=[...el.querySelectorAll('button:not(:disabled),[tabindex="0"]')];
      const first=tabs[0],last=tabs.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  let touch=null;
  el.addEventListener("pointerdown",e=>{
    touch=e.pointerType==="touch"&&!e.target.closest("button,a")?{x:e.clientX,y:e.clientY,at:Date.now()}:null;
  });
  el.addEventListener("pointerup",e=>{
    if(!touch)return;
    const dx=e.clientX-touch.x,dy=e.clientY-touch.y;
    if(Math.abs(dx)>60&&Math.abs(dy)<40&&Date.now()-touch.at<700)uppdragBladdra(dx<0?1:-1);
    touch=null;
  });
  el.addEventListener("pointercancel",()=>{touch=null;});
  document.body.append(el);uppdragBokRita(0);el.showModal();el.querySelector(".ub-stang").focus();
  if(!matchMedia("(prefers-reduced-motion:reduce)").matches){
    const cover=document.createElement("div");cover.className="ub-opening-cover";cover.setAttribute("aria-hidden","true");
    cover.innerHTML=`<img src="${UPPDRAG_BOK_BILD}" alt="">`;el.querySelector(".ub-volym").append(cover);
    const a=cover.animate([{transform:"rotateY(0deg)",opacity:1},{transform:"rotateY(-155deg)",opacity:0}],{duration:550,easing:"cubic-bezier(.2,.65,.25,1)",fill:"forwards"});
    a.finished.then(()=>cover.remove()).catch(()=>cover.remove());
  }
}
function uppdragBokRita(riktning=0){
  const bok=uppdragBokDialog;
  if(!bok)return uppdragVisaBok();
  if(bok.agare!==ggAgare()||bok.kurs!==state.course||bok.view!==state.view){stangUppdragsbok(false);return;}
  bok.animation?.cancel();bok.el.querySelectorAll(".ub-flip").forEach(el=>el.remove());
  const spread=bok.el.querySelector(".ub-spread"),mobil=matchMedia("(max-width:640px)").matches;
  const animerad=riktning&&!matchMedia("(prefers-reduced-motion:reduce)").matches;
  const gammal=animerad?(mobil?spread:spread.querySelector(riktning>0?".ub-hoger":".ub-vanster"))?.cloneNode(true):null;
  const scroll=mobil?spread.scrollTop:spread.querySelector(riktning>0?".ub-hoger":".ub-vanster")?.scrollTop||0;
  const {datum,i,datumtext,status,html}=uppdragBokSidor();spread.innerHTML=html;spread.scrollTop=0;
  const bak=bok.el.querySelector('[data-ub-nav="bak"]'),fram=bok.el.querySelector('[data-ub-nav="fram"]');
  bak.disabled=i===0;fram.disabled=i===6;
  bok.el.querySelector(".ub-idag").disabled=datum===uppdragNyckel();
  bok.el.querySelector(".ub-datum").textContent=datumtext+" · "+status;
  // Flytta fokus när ett gammalt uppdragskort ersatts av nästa sida.
  if(bok.el.open&&document.activeElement===document.body)bok.el.querySelector(".ub-stang").focus();
  if(!gammal)return;
  const ny=(mobil?spread:spread.querySelector(riktning>0?".ub-vanster":".ub-hoger")).cloneNode(true);
  const flip=document.createElement("div");flip.className="ub-flip"+(riktning<0?" bak":"")+(mobil?" mobil":"");
  flip.setAttribute("aria-hidden","true");flip.inert=true;
  for(const [klass,innehall] of [["ub-front",gammal],["ub-back",ny]]){
    const face=document.createElement("div");face.className="ub-face "+klass;face.append(innehall);flip.append(face);
  }
  bok.el.querySelector(".ub-volym").append(flip);gammal.scrollTop=scroll;
  const a=flip.animate([{transform:"rotateY(0deg)"},{transform:`rotateY(${riktning>0?-180:180}deg)`}],{duration:520,easing:"cubic-bezier(.3,.05,.2,1)",fill:"forwards"});
  bok.animation=a;a.finished.then(()=>{flip.remove();if(bok.animation===a)bok.animation=null;}).catch(()=>flip.remove());
}
function stangUppdragsbok(fokus=true){
  const bok=uppdragBokDialog;if(!bok)return;
  uppdragBokDialog=null;bok.animation?.cancel();bok.el.close();bok.el.remove();
  if(fokus&&bok.focus?.isConnected)bok.focus.focus();
}
function uppdragBokKontrollera(){
  if(uppdragBokDialog)uppdragBokRita(0);
}
