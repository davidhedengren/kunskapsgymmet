const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifter.js'),'utf8'),c);
const q=id=>c.window.BANK.find(q=>q.id===id);
function figures(id){const seen=[];function scan(o){if(typeof o==='string'){for(const m of o.matchAll(/<svg\b[\s\S]*?<\/svg>/g))if(!seen.includes(m[0]))seen.push(m[0]);}else if(o&&typeof o==='object')Object.values(o).forEach(scan);}scan(q(id));return seen;}
function forces(id,index=0){return [...figures(id)[index].matchAll(/data-force-origin="([^"]+)" data-force-vector="([^"]+)"/g)].map(m=>({p:m[1].split(',').map(Number),v:m[2].split(',').map(Number)}));}
const near=(a,b=0,eps=1e-7)=>assert.ok(Math.abs(a-b)<eps,`${a} != ${b}`);
function moment(fs,p){return fs.reduce((s,f)=>s+(f.p[0]-p[0])*f.v[1]-(f.p[1]-p[1])*f.v[0],0);}
function equilibrium(id,index,p){const f=forces(id,index);assert.ok(f.length>=2,id);near(f.reduce((s,f)=>s+f.v[0],0));near(f.reduce((s,f)=>s+f.v[1],0));near(moment(f,p),0,1e-5);}
test('Kroppar i vila har både kraft- och momentjämvikt i de ritade krafterna',()=>{
 for(const[id,index,p]of [['4.800',0,[240,150]],['4.810',0,[246,150]],['4.814',0,[240,150]],['4.223',1,[240,150]],['4.98',0,[240,150]],['4.144',1,[250,151]],['4.222',1,[250,151]],['4.179',0,[250,175]],['4.264',1,[250,175]],['4.146',1,[175,165]],['4.262',1,[175,165]],['4.145',1,[250,165]],['4.171',0,[250,128]],['4.260',1,[250,200]],['4.258',1,[250,170]],['4.137',1,[250,175]]])equilibrium(id,index,p);
});
test('Kontaktkrafter börjar på stödytan och rätt kropp',()=>{
 const box=forces('4.179');assert.equal(box[0].p[1],220);assert.equal(box[2].p[1],220);assert.deepEqual(box[1].p,[250,175]);assert.equal(box[3].p[0],320);
 for(const id of ['4.146','4.262']){const f=forces(id,1);assert.equal(f[0].p[0],225);assert.equal(f[1].p[0],125);assert.equal(f[2].p[0],125);assert.deepEqual(f[3].p,[175,165]);}
 const cat=forces('4.810');assert.deepEqual(cat.slice(0,2).map(f=>f.p),[[215,190],[277,190]]);
 const pair=forces('4.92');assert.deepEqual(pair[0].p,pair[1].p);near(pair[0].v[0],-pair[1].v[0]);
 for(const id of ['4.754','4.755','4.756','4.757']){const f=forces(id);assert.deepEqual(f.map(f=>f.p),[[190,174],[310,174]]);assert.ok(f[0].v[0]<0&&f[1].v[0]>0);}
});
test('Lutande plan: N är vinkelrät och friktionen parallell, även i delvis frilagda bilder',()=>{
 const a=25*Math.PI/180,c=Math.cos(a),s=Math.sin(a),f=forces('4.144',1);near(f[0].v[0]*c-f[0].v[1]*s);near(f[1].v[0]*s+f[1].v[1]*c);
 for(const[id,theta]of [['4.846',25],['4.851',18],['4.852',28]]){const r=forces(id),a=theta*Math.PI/180;for(const f of r)near(f.v[0]*Math.sin(a)+f.v[1]*Math.cos(a));assert.ok(r[0].p[1]<r[1].p[1]);}
 const r=forces('4.852');near(Math.hypot(...r[1].v)/Math.hypot(...r[0].v),20/50);
 const skier=forces('4.132',1);near(moment(skier,skier[0].p),0,1e-5);assert.ok(Math.hypot(...skier[2].v)<.15*Math.hypot(...skier[1].v));
});
test('Accelererande kroppar har rätt kraftskillnad och inget påhittat vridmoment',()=>{
 const f=forces('4.237');near((-f.slice(0,2).reduce((s,f)=>s+f.v[1],0)/f[2].v[1]-1)*9.82,.6,1e-5);near(moment(f,[250,172]));
 for(const id of ['4.123','4.196','4.221']){const f=forces(id,1);near(f[0].v[1]+f[2].v[1]);near(moment(f,[250,175]),0,1e-5);assert.ok(f[1].v[0]>0);}
 const car=forces('4.266',1);near(car.reduce((s,f)=>s+f.v[1],0));near(moment(car,[250,175]));assert.ok(car.reduce((s,f)=>s+f.v[0],0)<0);
 const rocket=forces('4.53');assert.equal(rocket[0].p[1],245);near(Math.abs(rocket[1].v[1]/rocket[0].v[1]),.60*9.82/45);
});
test('Momentarmar och vajertopologi stämmer med den fysiska modellen',()=>{
 const nut=forces('4.7');near((nut[0].p[0]-70)/(160-70),14/3.5);assert.equal(nut[1].p[0],nut[0].p[0]);
 const lever=forces('4.872');near(lever[0].v[1]/lever[1].v[1],300/400);near(moment(lever,[290,100]));
 const pulley=figures('4.111')[0];assert.match(pulley,/M 260 60 L 260 215 A 30 30 0 0 0 320 215 L 320 95/);assert.match(pulley,/cx="350" cy="95" r="30"/);assert.deepEqual(forces('4.111')[0].p,[380,250]);assert.doesNotMatch(q('4.111').t,/<img/);
 assert.match(q('4.111').s,/196/);assert.match(q('4.111').s,/40/);
});
