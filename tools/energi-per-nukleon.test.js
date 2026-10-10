'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({stadaSvar:x=>String(x).trim(),hogerled:x=>x,enhetMedOrd:x=>x});
let start=html.indexOf('const SI_PREFIX=');vm.runInContext(html.slice(start,html.indexOf('\nfunction numerisktSvar(',start)),c);start=html.indexOf('function formatRatt(');vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);
const grade=x=>c.formatRatt(x,7.68,{format:'energi_per_nukleon',enhet:'MeV',tolerans:.01});
test('Energi per nukleon: MeV och utskrivet /nukleon rättas med riktig energiomvandling',()=>{for(const x of ['7,68 MeV','7.68 MeV/nukleon','7680 keV/nukleon','0.00768 GeV/nukleon','1.230471654912e-12 J/nukleon'])assert.equal(grade(x),true,x);});
test('Energi per nukleon: fel dimension, prefix eller tecken godtas inte',()=>{for(const x of ['7.68 MeV/s','7.68 kg','7.68 J/nukleon','-7.68 MeV/nukleon','7680 MeV/nukleon'])assert.equal(grade(x),false,x);assert.equal(c.formatRatt('7.68 MeV/nukleon',7.68,{format:'energi_per_nukleon',enhet:'kg'}),false);});
