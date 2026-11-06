/* Formatet största_faktor (2026-11-06) med appens riktiga rättning i headless Chrome.
   Kör: node tools/storsta-faktor-2026-11-06.browser.cjs
   Kräver Uppgiftslabbets CDP-hjälp (GEOGEBRA_CDP, standard ../../Uppgiftslabbet/tools/geogebra-cdp.js) och nätåtkomst till nerdamer.
   Prövar självtestet KG_TEST_STORSTA_FAKTOR och varje Ma1-kort med formatet (#1.1685–1.1704 och 35 omgjorda äldre): facit godtas,
   faktorer i annan ordning godtas, men den oförändrade frågan och en ofullständigt utbruten faktor underkänns. */
const path = require('path'), fs = require('fs'), vm = require('vm'), assert = require('node:assert/strict');
const {starta, vila} = require(process.env.GEOGEBRA_CDP || path.join(__dirname, '../../Uppgiftslabbet/tools/geogebra-cdp.js'));
const c = {window: {}}; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../uppgifterma1.js'), 'utf8'), c);
const nr = id => Number(id.split('.')[1]);
// Nya uppgifter #1.1685–1.1704 och 35 äldre uppgifter som samma dag fick ett svarsfält i stället för två.
const uppg = c.window.BANKMA1.filter(t => [].concat(t.svarFormat).includes('största_faktor'));
(async () => {
  assert.equal(uppg.length, 55);
  const b = await starta({port: 9447, profil: path.join(require('os').tmpdir(), 'kg-storsta-faktor'), bredd: 420, hojd: 860, skala: 1});
  try {
    await b.ga('file:///' + path.join(__dirname, '../index.html').replace(/\\/g, '/'));
    for (let i = 0; i < 40 && !(await b.evaluate('typeof nerdamer==="function" && typeof delSvarRatt==="function"')); i++) await vila(500);
    assert.equal(await b.evaluate('KG_TEST_STORSTA_FAKTOR()'), true, 'självtest');
    const r = JSON.parse(await b.evaluate(`(()=>{
      const T=${JSON.stringify(uppg)}, fel=[]; let kort=0;
      for(const t of T) for(const q of expandGameTask(t)){
        kort++;
        const info=expectedAnswersForTask(q), facit=info.answers[0], fmt=[].concat(q.svarFormat)[0];
        const g=a=>delSvarRatt(a,facit,null,q.tolerans,q,0,fmt);
        const fraga=q.t.match(/\\\\((.+?)\\\\)/)[1].replace(/\\^\\{(\\d+)\\}/g,'^$1');
        const m=facit.match(/^(-?[^(]*)\\((.+)\\)$/), M=m[1], inre=m[2];
        const prov=[[facit,true],[fraga,false],['('+inre+')'+(M==='-'?'*(-1)':M?'*'+M:''),true],[facit.replace(/\\d+/,d=>String(+d+1)),false]];
        // ofullständig utbrytning: bara talet eller bara bokstaven
        const tal=(M.match(/^-?\\d+/)||[''])[0], bokst=M.replace(/^-?\\d*/,'');
        if(tal && bokst && Math.abs(+tal)>1) prov.push([tal+'('+nerdamer('expand(('+bokst+')*('+inre+'))').text()+')',false]);
        if(tal && bokst) prov.push([bokst+'('+nerdamer('expand(('+tal+')*('+inre+'))').text()+')',false]);
        for(const [a,v] of prov){ let ok; try{ ok=g(a); }catch(e){ ok='FEL '+e.message; } if(ok!==v) fel.push(q.id+': '+a+' gav '+ok); }
      }
      return JSON.stringify({kort,fel});})()`));
    console.log('kort', r.kort, 'fel', r.fel.length);
    for (const f of r.fel) console.log('  ', f);
    assert.equal(r.kort, 77);
    assert.deepEqual(r.fel, []);
  } finally { await b.stang(); }
})().catch(e => { console.error(e); process.exit(1); });
