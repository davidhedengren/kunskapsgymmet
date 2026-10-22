'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),vm=require('vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({});
for(const name of ['stadaSvar','hogerled']){const start=html.indexOf(`function ${name}(`);assert.ok(start>=0);vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);}
test('Funktionsetiketter med signerade tal och primtecken',()=>{
 for(const s of ["f'(-2)=12",'f′(−2)=12',"f''(-1) = 12",'f″(-1)=12','f(-0,5)≈12','A( +2.5 ) = 12','f(-.5)=12','12'])assert.equal(c.hogerled(s),'12',s);
});
test('Ekvationsled och felaktig syntax blir inte svarsetiketter',()=>{
 for(const s of ['x-2=12','x+1=12',"f'(-2)=12=0","f'(-2=12","f'(-2))=12","f'(-2+1)=12"])assert.equal(c.hogerled(s),s,s);
});
test('Tidigare enkla etiketter fungerar fortfarande',()=>{
 for(const s of ['a=12','y = 12','f(x)=12',"f'(x)=12",'Svar: k ≈ 12','≈ 12'])assert.equal(c.hogerled(s),'12',s);
});
