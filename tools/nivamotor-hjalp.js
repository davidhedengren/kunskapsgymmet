'use strict';
/* Laddar nivåmotorns riktiga funktioner ur index.html i en egen vm-kontext.
   Används av niva-hall.test.js och nivamotor-2026-11-05.test.js. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace(/\r\n/g,'\n');
const kod=n=>{const m=new RegExp('function '+n+'\\(').exec(html);assert.ok(m,n);return html.slice(m.index,html.indexOf('\n}\n',m.index)+2);};
const rad=n=>{const i=html.indexOf('const '+n+'=');assert.ok(i>=0,n);return html.slice(i,html.indexOf(';\n',i)+1).replace(/^const /,'var ');};

function nivamotor({cp,uppgifter=[],state={}}={}){
  const c=vm.createContext({Math,Object,Number,Array,Set,Map,Date,JSON});
  vm.runInContext(`var NIVAER=["1","2","3","4","5"];`,c);
  c.cp=cp||{areas:{},families:{},history:[],levels:{}};
  c.state=Object.assign({passTyp:null,formFel:0,formFelNiva:null},state);
  c.uppgifter=uppgifter;
  vm.runInContext(`function ensureCourseProfile(){return cp;}
    function availableTasks(){return uppgifter;}
    function levelOf(t){return String(t.traningsniva);}
    function arAlt(t){return Array.isArray(t.alternativ)&&t.alternativ.length>0;}
    function altRader(t){return t.alternativ.map(a=>({ratt:!!a.ratt}));}
    function nivaForId(id){const t=uppgifter.find(x=>x.id===id);return t?String(t.traningsniva):String(id).split("-")[0];}
    function uppgiftsAlder(h,id){const s=h.ids[id];return s==null?Infinity:h.seq-s;}
    var traningsNytt=null;function traningsOmraden(){return {nytt:traningsNytt};}
    function senastTranad(a){let t=null;for(const h of cp.history)if(h.area===a)t=h.at;return t;}
    function omradesNivaer(){const m={};uppgifter.forEach(t=>(m[t.omr||"ovrigt"] ||= new Set()).add(String(t.traningsniva)));return m;}
    var _omrNivaer={lista:null,karta:null};`,c);
  vm.runInContext(rad('LEDTRAD_VIKT'),c);
  vm.runInContext(html.slice(html.indexOf('const FORM_B='),html.indexOf('const FARSK_SKALA=')).replace(/const /g,'var '),c);
  vm.runInContext(rad('FARSK_SKALA'),c);
  for(const n of ['OMRADE_NIVAER','STEG_MIN','STEG_GRANS','LAGEN','LAGE_GRANS'])vm.runInContext(rad(n),c);
  for(const n of ['legacyLevelStat','storedLevelStat','formPkt','formForvantad','formBayes','formKursPrior','formFranHistorik',
    'formagaLas','formGissning','formagaUppdatera','formMal','formNivaVikter','formValjNiva','formFarskhet','tranarNivaLage',
    'omradeHar','omradeM','stegVarde','chooseArea','formRatt','formRattFranHistorik','omradetsNivaer','hogaNivaer','mycketGrad','lageFor'])
    vm.runInContext(kod(n),c);
  return c;
}
/* Andel per nivå som nivåmotorn skulle välja i området, när alla nivåer har färskt innehåll. */
function nivaAndelar(c,area,opt={}){
  const finns=opt.finns||{1:1,2:1,3:1,4:1,5:1};
  const w=c.formNivaVikter(area,finns,c.formMal(area,c.state.passTyp,{passStart:!!opt.passStart}));
  const tot=Object.values(w).reduce((a,b)=>a+b,0);
  return Object.fromEntries(Object.entries(w).map(([L,v])=>[L,v/tot]));
}
module.exports={nivamotor,nivaAndelar,html};
