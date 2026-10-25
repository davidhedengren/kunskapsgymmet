const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({});for(const name of ['stadaSvar','hogerled']){const start=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);}
test('Typografiska primtecken fungerar även med variabelargument',()=>{for(const s of ['f′(x)=2x','f″(x)=2x','g’(x)=2x',"g''(t)=2x",'A′(x) ≈ 2x'])assert.equal(c.hogerled(s),'2x',s);});
test('Värdet till höger och vinkelenheter ändras inte',()=>{for(const s of ['30′','20″','2x','x-1=2x','f′(x-1)=2x'])assert.equal(c.hogerled(s),s);assert.equal(c.hogerled('f′(x)=30″'),'30″');});
