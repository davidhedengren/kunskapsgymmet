/* "Få feedback på din lösning" – AI-feedback på elevens egen handskrivna lösning.
   Fristående vy. Använder index.html:s globala hjälpfunktioner (app, topbar, esc, toast,
   renderMath, afterRender, navRecord, session, giltigSession, SUPABASE_URL, SUPABASE_KEY,
   MOLN_PA, loggaIn, arAdmin). Ingen hemlig nyckel finns här: allt AI-arbete sker i
   Supabase Edge Function `ai-feedback`, som kontrollerar inloggning, gränser och budget.
   Bilder skickas bara till servern för granskningen och sparas inte. */
(function(){
  "use strict";
  const MAX_UPPGIFT=1, MAX_LOSNING=4, MAX_SIDA=1600, KVALITET=0.85, MAX_BYTES=1_300_000, MAX_TEXT=2000, MAX_FRAGA=400;
  const FUNKTION="/functions/v1/ai-feedback";
  const BUDGETTEXT="AI-feedback är tillfälligt pausad eftersom månadens budget är förbrukad. Funktionen blir tillgänglig igen nästa månad.";
  const FELTYPNAMN={metodfel:"Metodfel",raknefel:"Räknefel",teckenfel:"Teckenfel",enhetsfel:"Enhetsfel",missuppfattning:"Missuppfattning",ofullstandigt:"Ofullständigt",inget:""};
  const FORSLAG=["Varför är det steget fel?","Kan du förklara det enklare?","Hur ska redovisningen se ut för full poäng?"];

  const tom=()=>({fran:null,uppgiftLage:"bild",uppgiftBild:null,uppgiftText:"",losning:[],laddar:false,fel:"",resultat:null,
    granskningId:null,samtal:[],foljdKvar:0,fragar:false,status:null,statusFel:false});
  let S=tom();

  /* ---------------------------------------------------------------- bildhantering */
  function lasBild(fil){
    return new Promise((ok,nej)=>{
      if(!fil || !/^image\//.test(fil.type||"image/")) return nej(new Error("format"));
      const url=URL.createObjectURL(fil), img=new Image();
      img.onload=()=>{ URL.revokeObjectURL(url); ok(img); };
      img.onerror=()=>{ URL.revokeObjectURL(url); nej(new Error("format")); };
      img.src=url;
    });
  }
  /* Komprimerar på klienten: längsta sida högst 1600 px (räcker för handskriven matematik och
     ryms inom modellens bildgräns), JPEG. Kvaliteten sänks bara om filen ändå blir för stor. */
  async function komprimera(fil){
    const img=await lasBild(fil);
    const skala=Math.min(1,MAX_SIDA/Math.max(img.naturalWidth,img.naturalHeight));
    const w=Math.max(1,Math.round(img.naturalWidth*skala)), h=Math.max(1,Math.round(img.naturalHeight*skala));
    const c=document.createElement("canvas"); c.width=w; c.height=h;
    const g=c.getContext("2d"); g.fillStyle="#fff"; g.fillRect(0,0,w,h); g.drawImage(img,0,0,w,h);
    let q=KVALITET, url=c.toDataURL("image/jpeg",q);
    while(url.length*0.75>MAX_BYTES && q>0.55){ q-=0.1; url=c.toDataURL("image/jpeg",q); }
    if(url.length*0.75>MAX_BYTES) throw new Error("storlek");
    return url;
  }
  async function laggTillBilder(filer,mal,ersattIndex){
    S.fel="";
    const lista=[...filer];
    for(const f of lista){
      if(mal==="losning" && ersattIndex==null && S.losning.length>=MAX_LOSNING){ S.fel=`Du kan lägga till högst ${MAX_LOSNING} bilder av lösningen.`; break; }
      try{
        const d=await komprimera(f);
        if(mal==="uppgift") S.uppgiftBild=d;
        else if(ersattIndex!=null) S.losning[ersattIndex]=d;
        else S.losning.push(d);
      }catch(e){
        S.fel=e.message==="storlek"?"Bilden blev för stor även efter komprimering. Försök med en närmare bild.":"Bilden kunde inte läsas. Använd JPG, PNG eller WebP (på iPhone: välj \"Mest kompatibel\" eller ta bilden direkt här).";
      }
    }
    rita();
  }
  function valjFil(mal,flera,ersattIndex,kamera){
    const inp=document.createElement("input");
    inp.type="file"; inp.accept="image/*"; if(flera) inp.multiple=true;
    if(kamera) inp.setAttribute("capture","environment");   // mobil: öppnar kameran direkt
    inp.onchange=()=>laggTillBilder(inp.files,mal,ersattIndex);
    inp.click();
  }

  /* Ta foto: på mobil/surfplatta öppnas telefonens egen kamera (bäst bildkvalitet). På dator
     öppnas webbkameran i en ruta på sidan. Saknas kamera eller nekas åtkomst visas ett meddelande. */
  /* Telefonens egen kamera används bara på mobiler och surfplattor. En dator med pekskärm
     (vanligt på skoldatorer) räknas som dator och får webbkameran i en ruta. */
  const pekskarm=()=>/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent||"")
    || (/Macintosh/.test(navigator.userAgent||"") && navigator.maxTouchPoints>1);
  function fota(mal,ersattIndex){
    if(pekskarm() || !navigator.mediaDevices?.getUserMedia) return valjFil(mal,false,ersattIndex,true);
    kameraruta(mal,ersattIndex);
  }
  let kam=null;   // {strom, el, enheter, index}
  function stangKamera(){
    if(!kam) return;
    kam.strom?.getTracks().forEach(t=>t.stop());
    kam.el.remove(); document.removeEventListener("keydown",kam.tangent); kam=null;
  }
  async function startaStrom(){
    kam.strom?.getTracks().forEach(t=>t.stop());
    const enhet=kam.enheter[kam.index];
    kam.strom=await navigator.mediaDevices.getUserMedia({audio:false,video:enhet
      ?{deviceId:{exact:enhet.deviceId},width:{ideal:1920},height:{ideal:1080}}
      :{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1080}}});
    const v=kam.el.querySelector("video"); v.srcObject=kam.strom; await v.play().catch(()=>{});
  }
  async function kameraruta(mal,ersattIndex){
    stangKamera();
    const el=document.createElement("div");
    el.className="aif-kamera"; el.setAttribute("role","dialog"); el.setAttribute("aria-modal","true"); el.setAttribute("aria-label","Ta foto");
    el.innerHTML=`<div class="aif-kamera-ruta">
      <video playsinline muted autoplay></video>
      <p class="aif-kamera-tips">Håll papperet rakt framför kameran i bra ljus.</p>
      <div class="aif-knapprad">
        <button type="button" class="btn primary" data-k="ta" disabled>Ta bild</button>
        <button type="button" class="btn soft" data-k="byt" hidden>Byt kamera</button>
        <button type="button" class="btn quiet" data-k="avbryt">Avbryt</button>
      </div></div>`;
    document.body.appendChild(el);
    kam={el,strom:null,enheter:[],index:0,tangent:e=>{ if(e.key==="Escape") stangKamera(); }};
    document.addEventListener("keydown",kam.tangent);
    el.addEventListener("click",e=>{ if(e.target===el) stangKamera(); });
    el.querySelector('[data-k="avbryt"]').onclick=stangKamera;
    el.querySelector('[data-k="byt"]').onclick=async()=>{
      if(!kam) return; kam.index=(kam.index+1)%kam.enheter.length;
      try{ await startaStrom(); }catch(_){}
    };
    el.querySelector('[data-k="ta"]').onclick=()=>{
      const v=el.querySelector("video"); if(!v.videoWidth) return;
      const c=document.createElement("canvas"); c.width=v.videoWidth; c.height=v.videoHeight;
      c.getContext("2d").drawImage(v,0,0);
      c.toBlob(b=>{ stangKamera(); if(b) laggTillBilder([b],mal,ersattIndex); },"image/jpeg",0.92);
    };
    try{
      await startaStrom();
      if(!kam) return;   // stängd medan kameran startade
      kam.enheter=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==="videoinput");
      const aktiv=kam.strom.getVideoTracks()[0]?.getSettings?.().deviceId;
      kam.index=Math.max(0,kam.enheter.findIndex(d=>d.deviceId===aktiv));
      el.querySelector('[data-k="byt"]').hidden=kam.enheter.length<2;
      el.querySelector('[data-k="ta"]').disabled=false;
      el.querySelector('[data-k="ta"]').focus();
    }catch(e){
      stangKamera();
      S.fel=e&&e.name==="NotAllowedError"
        ?"Kunde inte använda kameran eftersom åtkomst nekades. Tillåt kameran i webbläsaren eller välj en bild i stället."
        :"Ingen kamera hittades. Välj en bild i stället.";
      rita();
    }
  }

  /* ---------------------------------------------------------------- server */
  async function status(){
    try{
      const r=await fetch(SUPABASE_URL+"/rest/v1/rpc/kg_ai_status",{method:"POST",headers:sbHeaders(!!session),body:"{}"});
      if(!r.ok) throw new Error(r.status);
      S.status=await r.json(); S.statusFel=false;
    }catch(_){ S.status=null; S.statusFel=true; }
  }
  async function anropa(kropp){
    if(!session || !await giltigSession()) return {ok:false,fel:"ej_inloggad",meddelande:"Du behöver logga in för att få AI-feedback."};
    try{
      const r=await fetch(SUPABASE_URL+FUNKTION,{method:"POST",
        headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+session.access_token,"Content-Type":"application/json"},
        body:JSON.stringify(kropp)});
      let d=null; try{ d=await r.json(); }catch(_){}
      if(d && typeof d==="object") return d;
      return {ok:false,fel:"serverfel",meddelande:r.status===404?"AI-feedback är inte installerad på servern ännu.":"Något gick fel. Försök igen senare."};
    }catch(_){
      return {ok:false,fel:"natverk",meddelande:"Ingen kontakt med servern. Kontrollera internetanslutningen och försök igen."};
    }
  }
  async function granska(){
    if(S.laddar) return;
    if(!S.losning.length){ S.fel="Lägg till minst en bild av din lösning."; return rita(); }
    if(S.uppgiftLage==="bild" && !S.uppgiftBild){ S.fel="Lägg till en bild av uppgiften, eller välj att skriva uppgiften."; return rita(); }
    if(S.uppgiftLage==="text" && !S.uppgiftText.trim()){ S.fel="Skriv eller klistra in uppgiften."; return rita(); }
    S.laddar=true; S.fel=""; rita();
    const d=await anropa({typ:"granska",
      uppgiftText:S.uppgiftLage==="text"?S.uppgiftText.trim():"",
      uppgiftBilder:S.uppgiftLage==="bild"&&S.uppgiftBild?[S.uppgiftBild]:[],
      losningsbilder:S.losning,
      // Bara för adminstatistiken: var granskningen startades och vilken uppgift (ingen elevtext).
      kalla:S.fran?"traning":"egen", kurs:S.fran?.kurs||null, uppgiftId:S.fran?.id||null});
    S.laddar=false;
    if(d.ok){
      S.resultat=d.feedback; S.granskningId=d.granskningId; S.foljdKvar=0; S.samtal=[];
      if(S.status) S.status.kvar_idag=Math.max(0,(S.status.kvar_idag||1)-1);
      // Medaljen "Granskad" (index.html) räknar granskningar som gav återkoppling.
      if(d.feedback?.status==="granskad" && typeof profile==="object" && profile){
        profile.aiFeedback=(profile.aiFeedback||0)+1;
        try{ saveProfile(); checkBadges(700); }catch(_){}
      }
    }else{
      S.fel=d.meddelande||"Något gick fel."; if(d.fel==="budget_slut" && S.status) S.status.budget_slut=true;
    }
    rita();
    if(d.ok) document.getElementById("aif-resultat")?.scrollIntoView({behavior:"smooth",block:"start"});
  }
  async function fraga(text){
    text=String(text||"").trim().slice(0,MAX_FRAGA);
    if(!text || S.fragar || !S.granskningId || S.foljdKvar<=0) return;
    S.fragar=true; S.samtal.push({roll:"elev",text}); S.fel=""; rita();
    const d=await anropa({typ:"foljd",granskningId:S.granskningId,fraga:text});
    S.fragar=false;
    if(d.ok){ S.samtal.push({roll:"ai",text:d.svar}); S.foljdKvar=d.foljdfragorKvar; }
    else{ S.samtal.pop(); S.fel=d.meddelande||"Något gick fel."; if(d.fel==="foljdgrans") S.foljdKvar=0; }
    rita();
  }

  /* ---------------------------------------------------------------- rendering */
  // Modellens text: escapas och radbryts; KaTeX renderas efteråt med renderMath.
  const txt=s=>esc(String(s||"")).replace(/\n/g,"<br>");
  const KAMERA='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';

  function bildruta(src,etikett,mal,i){
    return `<div class="aif-bild"><img src="${src}" alt="${esc(etikett)}">
      <div class="aif-bildrad"><span>${esc(etikett)}</span><span>
        <button type="button" onclick="kgAi.fota('${mal}',${i})">Fota om</button>
        <button type="button" onclick="kgAi.ersatt('${mal}',${i})">Byt</button>
        <button type="button" class="ta-bort" onclick="kgAi.taBort('${mal}',${i})" aria-label="Ta bort ${esc(etikett)}">Ta bort</button>
      </span></div></div>`;
  }

  // Uppladdningsyta: Ta foto (kameran) eller Välj bild (galleri/filer). Dra och släpp fungerar på dator.
  function uppladdning(mal,rubrik,tips){
    return `<div class="aif-uppladd" data-mal="${mal}"${mal==="losning"&&S.losning.length?' style="margin-top:10px"':""}>
      ${KAMERA}<b>${esc(rubrik)}</b><span>${esc(tips)}</span>
      <span class="aif-uppladd-knappar">
        <button type="button" class="btn primary" onclick="kgAi.fota('${mal}')">Ta foto</button>
        <button type="button" class="btn soft" onclick="kgAi.valj('${mal}')">Välj bild</button>
      </span></div>`;
  }

  function stegHtml(){
    const st=S.status, lasa=S.laddar;
    const uppgift=S.uppgiftLage==="bild"
      ? (S.uppgiftBild?`<div class="aif-bilder">${bildruta(S.uppgiftBild,"Uppgiften","uppgift",0)}</div>`
        :uppladdning("uppgift","Fotografera uppgiften","En bild av uppgiften ur boken, bladet eller provet"))
      : `<textarea id="aif-uppgifttext" maxlength="${MAX_TEXT}" placeholder="Skriv eller klistra in uppgiften här" oninput="kgAi.text(this.value)">${esc(S.uppgiftText)}</textarea>
         <div class="aif-raknare">${S.uppgiftText.length}/${MAX_TEXT}</div>`;
    const losning=`${S.losning.length?`<div class="aif-bilder">${S.losning.map((b,i)=>bildruta(b,`Sida ${i+1}`,"losning",i)).join("")}</div>`:""}
      ${S.losning.length<MAX_LOSNING?uppladdning("losning",S.losning.length?"Lägg till en sida till":"Fotografera din lösning",`Högst ${MAX_LOSNING} bilder, i ordning. Fota rakt ovanifrån i bra ljus.`):""}`;
    const kvar=st&&st.kvar_idag!=null?`Du har ${st.kvar_idag} av ${st.per_dag} granskningar kvar i dag.`:"";
    const steg1=S.fran
      ? `<section class="aif-steg"><h2><span class="nr">1</span>Uppgiften</h2>
          <div class="aif-franuppgift">${S.fran.html}</div>
          ${S.fran.figur?`<p class="aif-info">Uppgiften har en figur som inte skickas till AI:n. Skriv gärna in värdena från figuren i din lösning.</p>`:""}</section>`
      : `<section class="aif-steg"><h2><span class="nr">1</span>Visa uppgiften</h2>
      <div class="aif-val" role="group" aria-label="Hur vill du visa uppgiften?">
        <button type="button" class="btn sm" aria-pressed="${S.uppgiftLage==="bild"}" onclick="kgAi.lage('bild')">Bild</button>
        <button type="button" class="btn sm" aria-pressed="${S.uppgiftLage==="text"}" onclick="kgAi.lage('text')">Text</button>
      </div>${uppgift}</section>`;
    return `${steg1}
    <section class="aif-steg"><h2><span class="nr">2</span>Visa din lösning</h2>${losning}</section>
    <section class="aif-steg"><h2><span class="nr">3</span>Få feedback</h2>
      ${lasa?`<div class="aif-laddar" role="status" aria-live="polite"><span class="aif-snurra" aria-hidden="true"></span><div><b>AI:n läser din lösning …</b><br><span class="aif-info">Det brukar ta 15–60 sekunder.</span></div></div>`
        :`<div class="aif-knapprad"><button type="button" class="btn primary" onclick="kgAi.granska()" ${st&&st.kvar_idag===0?"disabled":""}>Granska min lösning</button>
          <span class="aif-info">${esc(kvar)}</span></div>`}
      <p class="aif-info">Bilderna skickas bara för granskningen och sparas inte. Skriv inte ditt namn på bilderna. AI kan göra fel – tänk själv och fråga din lärare om du är osäker.</p>
    </section>`;
  }

  function resultatHtml(){
    const g=S.resultat; if(!g) return "";
    const varning=g.lasbarhet!=="tydlig"||g.osakerheter.length
      ? `<div class="aif-varning"><b>${g.lasbarhet==="svarlast"?"Svårläst bild.":"Osäker tolkning."}</b> ${g.osakerheter.length?txt(g.osakerheter.join(" ")):"Kontrollera att AI:n har läst din lösning rätt (se nedan)."}</div>`:"";
    const tolkning=`<details><summary>Så tolkade AI:n uppgiften och din lösning</summary>
      <div class="aif-tolkning"><p><b>Uppgiften:</b> ${txt(g.tolkning_uppgift)}</p><p><b>Din lösning:</b><br>${txt(g.tolkning_losning)}</p></div></details>`;
    if(g.status==="behover_fortydligande"){
      return `<div class="aif-resultat" id="aif-resultat">
        <div class="aif-del oklar"><h3>AI:n behöver mer information</h3>${txt(g.fortydligande_fraga||"Bilden eller uppgiften gick inte att tolka.")}
        <p class="aif-info">Den här granskningen räknas mot dagens gräns. Ta en tydligare bild eller skriv uppgiften som text och försök igen.</p></div>${tolkning}</div>`;
    }
    const ratt=g.ratt.length?`<ul>${g.ratt.map(r=>`<li><span class="aif-steg-citat">${txt(r.steg)}</span>${txt(r.kommentar)}</li>`).join("")}</ul>`
      :`<p>${g.helt_korrekt?"Lösningen är korrekt.":"AI:n hittade inget steg som säkert är rätt. Det kan bero på att lösningen är kort eller svårläst."}</p>`;
    const fel=(g.fel||[]).length
      ? `<div class="aif-del titta"><h3>Här tänkte du fel</h3><ul>${g.fel.map(f=>`<li>${FELTYPNAMN[f.feltyp]?`<span class="aif-feltyp">${FELTYPNAMN[f.feltyp]}</span>`:""}
          ${f.steg?`<span class="aif-steg-citat">${txt(f.steg)}</span>`:""}${txt(f.forklaring)}</li>`).join("")}</ul></div>`:"";
    const redov=(g.redovisning||[]).length
      ? `<div class="aif-del vidare"><h3>För att få full poäng behöver du</h3><ul>${g.redovisning.map(r=>`<li>${txt(r)}</li>`).join("")}</ul></div>`:"";
    const SVARETIKETT={ja:"Rätt svar",delvis:"Delvis rätt svar",nej:"Fel svar",saknas:"Svar saknas"};
    const sammanf=`<div class="aif-del sammanf ${g.helt_korrekt?"ratt":g.svar_korrekt==="ja"?"vidare":"titta"}"><h3>${g.helt_korrekt?"Helt rätt!":esc(SVARETIKETT[g.svar_korrekt]||"Bedömning")}</h3>${txt(g.sammanfattning)}</div>`;
    const samtal=S.samtal.map(m=>`<div class="aif-bubbla ${m.roll}">${m.roll==="elev"?"<b>Du:</b> ":""}${txt(m.text)}</div>`).join("");
    const foljd=S.foljdKvar>0||S.fragar
      ? `<div class="aif-steg"><h2><span class="nr">4</span>Fråga vidare</h2>
         <div class="aif-samtal">${samtal}${S.fragar?`<div class="aif-laddar" role="status"><span class="aif-snurra" aria-hidden="true"></span>AI:n svarar …</div>`:""}</div>
         ${S.fragar?"":`<div class="aif-forslag">${FORSLAG.map(f=>`<button type="button" class="btn sm soft" onclick="kgAi.fraga(${esc(JSON.stringify(f))})">${esc(f)}</button>`).join("")}</div>
         <textarea id="aif-fraga" maxlength="${MAX_FRAGA}" placeholder="Skriv en egen följdfråga" style="min-height:70px"></textarea>
         <div class="aif-knapprad"><button type="button" class="btn" onclick="kgAi.fraga(document.getElementById('aif-fraga').value)">Skicka fråga</button>
         <span class="aif-info">${S.foljdKvar} ${S.foljdKvar===1?"följdfråga":"följdfrågor"} kvar för den här granskningen.</span></div>`}</div>`
      : (samtal?`<div class="aif-steg"><h2><span class="nr">4</span>Fråga vidare</h2><div class="aif-samtal">${samtal}</div><p class="aif-info">Du har använt alla följdfrågor för den här granskningen.</p></div>`:"");
    return `<div class="aif-resultat" id="aif-resultat">${varning}
      ${sammanf}
      <div class="aif-del ratt"><h3>Det här har du gjort rätt</h3>${ratt}</div>
      ${fel}${redov}
      ${tolkning}
      <div class="aif-knapprad"><button type="button" class="btn soft" onclick="kgAi.nytt()">Ny granskning</button></div></div>`;
  }

  function rita(){
    if(!ov && state.view!=="aifeedback") return;
    const st=S.status;
    let kropp;
    if(!MOLN_PA()) kropp=`<div class="aif-ruta info">AI-feedback finns bara i den inloggade versionen av Kunskapsgymmet.</div>`;
    else if(!session) kropp=`<div class="aif-ruta info"><b>Logga in för att få AI-feedback.</b><br>Du kan fortsätta träna i Kunskapsgymmet utan konto, men AI-granskningen kräver inloggning.</div>
      <div class="aif-knapprad"><button type="button" class="btn primary" onclick="kgAi.stang();loggaIn()">Logga in</button></div>`;
    else if(S.statusFel) kropp=`<div class="aif-ruta fel">AI-feedback kunde inte nås just nu. Försök igen senare.</div>`;
    else if(!st) kropp=`<div class="aif-laddar"><span class="aif-snurra"></span>Laddar …</div>`;
    else if(!st.aktiv) kropp=`<div class="aif-ruta info">AI-feedback är inte påslagen ännu. Den öppnas när skolan har godkänt funktionen.</div>`;
    else if(st.budget_slut && !S.resultat) kropp=`<div class="aif-ruta paus">${BUDGETTEXT}</div>`;
    else kropp=(S.resultat?"":stegHtml())+(S.fel?`<div class="aif-ruta fel" role="alert">${esc(S.fel)}</div>`:"")+resultatHtml();
    let rot;
    if(ov){
      // Ovanpå träningsuppgiften: eleven kommer tillbaka till samma uppgift när rutan stängs.
      rot=ov.querySelector(".aif-ov-kropp");
      rot.innerHTML=`<div class="aif">${kropp}</div>`;
    }else{
      const admin=typeof arAdmin!=="undefined"&&arAdmin?`<p class="aif-info"><button type="button" class="btn sm quiet" onclick="kgAi.admin()">Adminöversikt för AI-feedback</button></p>`:"";
      app.innerHTML=topbar()+`<main class="shell view"><div class="aif">
        <h1>Få feedback på din lösning</h1>
        <p class="aif-ingress">Fotografera en uppgift och din egen lösning. Du får återkoppling som när en lärare rättar: vad som är rätt, var du tänkte fel och vad som saknas i redovisningen för full poäng.</p>
        ${kropp}${admin}</div></main>`;
      afterRender();
      rot=app;
    }
    renderMath(rot);
    // Dra och släpp bilder på uppladdningsytorna (dator).
    rot.querySelectorAll(".aif-uppladd").forEach(el=>{
      const mal=el.dataset.mal;
      el.addEventListener("dragover",e=>{ e.preventDefault(); el.style.borderColor="var(--acc)"; });
      el.addEventListener("dragleave",()=>{ el.style.borderColor=""; });
      el.addEventListener("drop",e=>{ e.preventDefault(); el.style.borderColor="";
        const f=[...(e.dataTransfer?.files||[])].filter(x=>/^image\//.test(x.type));
        if(f.length) laggTillBilder(mal==="uppgift"?f.slice(0,1):f,mal); });
    });
    const ta=document.getElementById("aif-uppgifttext");
    if(ta && kgAi._fokusText){ ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length); kgAi._fokusText=false; }
  }

  /* ---------------------------------------------------------------- från en träningsuppgift
     Uppgiftstexten hämtas från den visade uppgiften. KaTeX ersätts med sin LaTeX-källa så att
     AI:n får exakt uppgift; figurer (SVG/bilder) skickas inte. */
  let ov=null;
  function uppgiftFranSidan(){
    const kalla=document.querySelector(".task .tbody");
    if(!kalla) return null;
    const k=kalla.cloneNode(true);
    k.querySelectorAll(".kedja-extra,button,.kedja-sammanhang").forEach(x=>x.remove());
    const html=k.innerHTML;
    const figur=!!k.querySelector("svg:not(.katex svg),img,canvas");
    k.querySelectorAll(".katex-display,.katex").forEach(x=>{
      if(!x.isConnected && !k.contains(x)) return;
      const tex=x.querySelector('annotation[encoding="application/x-tex"]')?.textContent;
      const disp=x.classList.contains("katex-display");
      x.replaceWith(document.createTextNode(tex!=null?(disp?`\\[${tex}\\]`:`\\(${tex}\\)`):x.textContent));
    });
    k.querySelectorAll("svg,img,canvas,style,script").forEach(x=>x.remove());
    k.querySelectorAll("br,p,div,li,tr,h1,h2,h3,h4").forEach(x=>x.after(document.createTextNode("\n")));
    const text=k.textContent.replace(/[ \t ]+/g," ").replace(/\n\s*\n+/g,"\n").trim().slice(0,MAX_TEXT);
    const id=typeof state==="object"&&state.currentTask?.id!=null?String(state.currentTask.id):null;
    const kurs=typeof state==="object"&&state.course?String(state.course):null;
    return text?{text,html,figur,id,kurs}:null;
  }
  async function oppnaForUppgift(){
    const u=uppgiftFranSidan();
    if(!u){ toast("Uppgiften kunde inte läsas."); return; }
    stangOverlay();
    S=tom(); S.uppgiftLage="text"; S.uppgiftText=u.text; S.fran=u;
    ov=document.createElement("div");
    ov.className="aif-overlay"; ov.setAttribute("role","dialog"); ov.setAttribute("aria-modal","true"); ov.setAttribute("aria-label","Få feedback på din lösning");
    ov.innerHTML=`<div class="aif-ov-ruta"><div class="aif-ov-topp"><b>Få feedback på din lösning</b>
      <button type="button" class="btn sm" onclick="kgAi.stang()">Tillbaka till uppgiften</button></div>
      <p class="aif-ingress">Fotografera din lösning på papper. Du får återkoppling som när en lärare rättar: vad som är rätt, var du tänkte fel och vad som saknas för full poäng.</p>
      <div class="aif-ov-kropp"></div></div>`;
    document.body.appendChild(ov);
    document.body.classList.add("aif-las");
    ov.addEventListener("keydown",e=>{ if(e.key==="Escape" && !kam) stangOverlay(); });
    rita();
    ov.querySelector(".aif-ov-topp button").focus();
    await status();
    rita();
  }
  function stangOverlay(){
    if(!ov) return;
    stangKamera();
    ov.remove(); ov=null; document.body.classList.remove("aif-las");
    S=tom();
    document.getElementById("kollaknapp")?.focus({preventScroll:true});
  }

  async function oppna(record=true){
    stangOverlay();
    state.view="aifeedback"; document.title="Få feedback på din lösning · Kunskapsgymmet";
    if(record) navRecord("aifeedback");
    rita();
    await status();
    rita();
  }

  /* ---------------------------------------------------------------- adminöversikt */
  let adminNamn={};   // user_id → namn, från befintliga kg_admin_anvandare()
  async function admin(){
    state.view="aifeedback-admin";
    app.innerHTML=topbar()+`<main class="shell view"><div class="aif aif-admin"><h1>AI-feedback – översikt</h1><div class="aif-laddar"><span class="aif-snurra"></span>Laddar …</div></div></main>`;
    afterRender();
    let d=null, f="";
    try{
      if(!await giltigSession()) throw new Error("inloggning");
      const [r,anv]=await Promise.all([
        fetch(SUPABASE_URL+"/rest/v1/rpc/kg_ai_oversikt",{method:"POST",headers:sbHeaders(true),body:"{}"}),
        (typeof kgAdminRpc==="function"?Promise.resolve().then(()=>kgAdminRpc("kg_admin_anvandare")):Promise.resolve([])).catch(()=>[])]);
      if(!r.ok) throw new Error(r.status===404?"Databasfunktionen saknas. Kör sql/2026-11-13-ai-feedback.sql.":"Ingen behörighet eller serverfel.");
      d=await r.json();
      adminNamn={}; (Array.isArray(anv)?anv:[]).forEach(u=>{ if(u&&u.user_id) adminNamn[u.user_id]=u.namn||u.epost||""; });
    }catch(e){ f=e.message; }
    ritaAdmin(d,f);
  }
  function ritaAdmin(d,f){
    const kr=x=>(Math.round((Number(x)||0)*100)/100).toLocaleString("sv-SE",{minimumFractionDigits:2,maximumFractionDigits:2})+" kr";
    const tal=x=>(Number(x)||0).toLocaleString("sv-SE");
    const datum=x=>{ if(!x) return "–"; const t=new Date(x); return isNaN(t)?String(x):t.toLocaleDateString("sv-SE",{day:"numeric",month:"short"})+" "+t.toLocaleTimeString("sv-SE",{hour:"2-digit",minute:"2-digit"}); };
    // Stapellista: [[etikett, antal, klass], …]
    const staplar=(rader,tom)=>{
      const synliga=rader.filter(r=>Number(r[1])>0);
      const summa=synliga.reduce((a,r)=>a+Number(r[1]),0);
      if(!summa) return `<p class="aif-info">${tom}</p>`;
      const max=Math.max(...synliga.map(r=>Number(r[1])));
      return `<div class="aif-staplar">${synliga.map(([t,n,kl])=>`<div class="aif-stapel ${kl||""}">
        <span class="t">${esc(t)}</span><span class="b"><i style="width:${(100*n/max).toFixed(1)}%"></i></span>
        <span class="n">${tal(n)} <small>(${Math.round(100*n/summa)} %)</small></span></div>`).join("")}</div>`;
    };
    let inner;
    if(!d) inner=`<div class="aif-ruta fel">${esc(f||"Kunde inte hämta översikten.")}</div>`;
    else{
      const k=d.konfig||{}, m=d.manad||{reserverat:0,forbrukat:0,granskningar:0,foljdfragor:0,nekade:0,anrop:0};
      const tot=d.totalt||{}, idag=d.idag||{}, u=d.utfall||{}, ft=d.feltyper||{}, kl=d.kalla||{};
      const anv=(Number(m.forbrukat)||0)+(Number(m.reserverat)||0), pct=Math.min(100,100*anv/(Number(k.manadsbudget_sek)||1));
      const snitt=(Number(m.granskningar)||0)?Number(m.forbrukat)/Number(m.granskningar):0;
      const hk=Number(d.helt_korrekt_manad)||0;
      const kursNamn=id=>(typeof COURSES==="object"&&COURSES[id]?.name)||id||"";
      const elevNamn=id=>adminNamn[id]||"Okänd elev";
      const dagMax=Math.max(1,...(d.dagar||[]).map(x=>Number(x.granskningar)||0));
      inner=`<div class="aif-siffror">
        <div><span>Idag</span><b>${tal(idag.granskningar)}</b><small>${tal(idag.elever)} elever</small></div>
        <div><span>Denna månad</span><b>${tal(m.granskningar)}</b><small>${tal(d.elever_manad)} elever</small></div>
        <div><span>Totalt sedan start</span><b>${tal(tot.granskningar)}</b><small>${tal(tot.elever)} elever</small></div>
        <div><span>Förbrukat denna månad</span><b>${kr(m.forbrukat)}</b><small>av ${kr(k.manadsbudget_sek)}</small></div>
        <div><span>Snitt per granskning</span><b>${kr(snitt)}</b><small>denna månad</small></div>
        <div><span>Kostnad totalt</span><b>${kr(tot.kostnad_sek)}</b><small>sedan start</small></div>
        <div><span>Misslyckade</span><b>${tal(d.misslyckade_manad)}</b><small>denna månad</small></div>
        <div><span>Nekade (budget)</span><b>${tal(m.nekade)}</b><small>denna månad</small></div></div>
        <div class="aif-mätare" aria-label="Använd andel av budgeten"><i style="width:${pct.toFixed(1)}%"></i></div>
        <p class="aif-info">Reserverat just nu: ${kr(m.reserverat)}. Uppskattad kostnad enligt modellens listpris och växelkursen ${esc(String(k.usd_sek))} kr/USD (${esc(k.modell||"")}). Den faktiska fakturan från OpenAI kan avvika något.</p>

        <div class="aif-admin-grid">
        <section class="aif-steg"><h2>AI:ns bedömning denna månad</h2>
          ${staplar([["Helt rätt",hk,"bra"],["Rätt svar, redovisningen kan bli bättre",Math.max(0,(Number(u.ja)||0)-hk),"bra2"],["Delvis rätt",u.delvis,"mellan"],["Fel svar",u.nej,"fel"],["Svar saknas",u.saknas,"fel"],["Gick inte att tolka",u.oklar,"gra"],["Okänt (före statistiken)",u.okant,"gra"]],"Inga granskningar denna månad.")}</section>
        <section class="aif-steg"><h2>Vanligaste feltyper</h2>
          ${staplar(Object.entries(ft).sort((a,b)=>b[1]-a[1]).map(([t,n])=>[FELTYPNAMN[t]||t,n,"fel"]),"Inga fel registrerade denna månad.")}</section>
        <section class="aif-steg"><h2>Var startas granskningen?</h2>
          ${staplar([["Från en uppgift i träningen",kl.traning,"bra"],["Egen uppgift (fotad eller skriven)",kl.egen,"mellan"],["Okänt (före statistiken)",kl.okant,"gra"]],"Inga granskningar denna månad.")}</section>
        </div>

        <section class="aif-steg"><h2>Elever</h2>
          ${(d.elever||[]).length?`<div class="aif-tabell"><table><thead><tr><th>Elev</th><th>Denna månad</th><th>Totalt</th><th>Senast</th><th>Kostnad</th></tr></thead><tbody>
          ${d.elever.map(x=>`<tr><td>${esc(elevNamn(x.user_id))}</td><td>${tal(x.manad)}</td><td>${tal(x.totalt)}</td><td>${esc(datum(x.senast))}</td><td>${kr(x.kostnad_sek)}</td></tr>`).join("")}
          </tbody></table></div>`:`<p class="aif-info">Ingen elev har fått feedback ännu.</p>`}</section>

        <section class="aif-steg"><h2>Uppgifter som får mest feedback</h2><p class="aif-info">Från träningen, senaste 90 dagarna.</p>
          ${(d.uppgifter||[]).length?`<div class="aif-tabell"><table><thead><tr><th>Kurs</th><th>Uppgift</th><th>Granskningar</th><th>Elever</th></tr></thead><tbody>
          ${d.uppgifter.map(x=>`<tr><td>${esc(kursNamn(x.kurs))}</td><td>${esc(x.uppgift||"")}</td><td>${tal(x.n)}</td><td>${tal(x.elever)}</td></tr>`).join("")}
          </tbody></table></div>`:`<p class="aif-info">Inga granskningar från träningen ännu.</p>`}</section>

        <section class="aif-steg"><h2>Senaste 30 dagarna</h2>
          ${(d.dagar||[]).length?`<div class="aif-tabell"><table><thead><tr><th>Dag</th><th>Granskningar</th><th></th><th>Elever</th><th>Kostnad</th></tr></thead><tbody>
          ${d.dagar.map(x=>`<tr><td>${esc(String(x.dag))}</td><td>${tal(x.granskningar)}</td><td class="aif-minibar"><i style="width:${(100*x.granskningar/dagMax).toFixed(0)}%"></i></td><td>${tal(x.elever)}</td><td>${kr(x.kostnad_sek)}</td></tr>`).join("")}
          </tbody></table></div>`:`<p class="aif-info">Inga granskningar de senaste 30 dagarna.</p>`}</section>

        ${(d.tidigare||[]).length?`<section class="aif-steg"><h2>Tidigare månader</h2><div class="aif-tabell"><table><thead><tr><th>Månad</th><th>Granskningar</th><th>Nekade</th><th>Kostnad</th></tr></thead><tbody>${d.tidigare.map(x=>`<tr><td>${esc(String(x.manad).slice(0,7))}</td><td>${tal(x.granskningar)}</td><td>${tal(x.nekade)}</td><td>${kr(x.forbrukat)}</td></tr>`).join("")}</tbody></table></div></section>`:""}

        <section class="aif-steg"><h2>Inställningar</h2>
          <label><input type="checkbox" id="aifa-aktiv" ${k.aktiv?"checked":""}> Funktionen är påslagen för elever</label>
          <label>Månadsbudget (kr, under 200) <input type="number" id="aifa-budget" min="0" max="199" step="1" value="${esc(String(k.manadsbudget_sek))}"></label>
          <label>Granskningar per elev och dag <input type="number" id="aifa-dag" min="0" max="50" value="${esc(String(k.granskningar_per_dag))}"></label>
          <label>Följdfrågor per granskning <input type="number" id="aifa-foljd" min="0" max="10" value="${esc(String(k.foljdfragor_per_gransk))}"></label>
          <div class="aif-knapprad"><button type="button" class="btn primary" onclick="kgAi.sparaAdmin()">Spara</button></div>
          <p class="aif-info">Edge Function måste också ha hemligheten AI_FEEDBACK_AKTIV=true. Se docs/AI_FEEDBACK.md.</p></section>`;
    }
    app.innerHTML=topbar()+`<main class="shell view"><div class="aif aif-admin"><h1>AI-feedback – översikt</h1>${inner}
      <div class="aif-knapprad"><button type="button" class="btn soft" onclick="kgAi.admin()">Uppdatera</button><button type="button" class="btn soft" onclick="kgAi.oppna()">Till Få feedback på din lösning</button></div></div></main>`;
    afterRender();
  }
  async function sparaAdmin(){
    const v=id=>document.getElementById(id);
    const kropp={p_aktiv:v("aifa-aktiv").checked,p_budget:Number(v("aifa-budget").value),
      p_per_dag:Number(v("aifa-dag").value),p_foljd:Number(v("aifa-foljd").value)};
    if(!(kropp.p_budget>=0 && kropp.p_budget<200)){ toast("Budgeten måste vara under 200 kr."); return; }
    try{
      if(!await giltigSession()) throw new Error();
      const r=await fetch(SUPABASE_URL+"/rest/v1/rpc/kg_ai_satt_konfig",{method:"POST",headers:sbHeaders(true),body:JSON.stringify(kropp)});
      if(!r.ok) throw new Error();
      ritaAdmin(await r.json(),""); toast("Sparat.");
    }catch(_){ toast("Kunde inte spara."); }
  }

  /* ---------------------------------------------------------------- startsidans kort */
  function hemkort(){
    if(!MOLN_PA()) return "";
    return `<button type="button" class="aif-hemkort" onclick="kgAi.oppna()">
      <span class="aif-ikon">${KAMERA}</span>
      <span><b>Få feedback på din lösning</b><span class="aif-sub">Fota en uppgift och din lösning och få återkoppling</span></span>
      <span class="aif-pil" aria-hidden="true">→</span></button>`;
  }

  window.kgAi={
    oppna, hemkort, admin, sparaAdmin, granska, fraga, _fokusText:false,
    valj:(mal)=>valjFil(mal,mal==="losning"),
    fota:(mal,i)=>fota(mal,mal==="losning"&&i!=null?i:null),
    ersatt:(mal,i)=>valjFil(mal,false,mal==="losning"?i:null),
    taBort:(mal,i)=>{ if(mal==="uppgift") S.uppgiftBild=null; else S.losning.splice(i,1); rita(); },
    lage:(l)=>{ S.uppgiftLage=l; S.fel=""; rita(); },
    text:(t)=>{ S.uppgiftText=String(t).slice(0,MAX_TEXT); const r=document.querySelector(".aif-raknare"); if(r) r.textContent=`${S.uppgiftText.length}/${MAX_TEXT}`; },
    nytt:()=>{ const st=S.status, fran=S.fran; S=tom(); S.status=st;
      if(fran){ S.fran=fran; S.uppgiftLage="text"; S.uppgiftText=fran.text; }
      rita(); (ov||window).scrollTo({top:0,behavior:"smooth"}); },
    oppnaForUppgift, stang:stangOverlay,
    knapp:()=>(typeof MOLN_PA==="function"&&MOLN_PA())
      ?`<button type="button" class="btn aif-traningsknapp" onclick="kgAi.oppnaForUppgift()">${KAMERA.replace('width="26" height="26"','width="18" height="18"')} Få feedback på din lösning</button>`:"",
    rita, _state:()=>S, _laggTill:laggTillBilder,
  };
})();
