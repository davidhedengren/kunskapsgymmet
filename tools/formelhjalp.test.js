'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace(/\r\n/g,'\n');
function kod(name){
  const m=new RegExp('(?:async )?function '+name+'\\(').exec(html);
  assert.ok(m,name);
  return html.slice(m.index,html.indexOf('\n}',m.index)+2);
}
const c=vm.createContext({});
vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
for(const n of ['enhetMedOrd','skrivetMattal']) vm.runInContext(kod(n),c);
vm.runInContext(html.slice(html.indexOf('const FORMEL_FN='),html.indexOf(';',html.indexOf('const FORMEL_FN='))+1).replace('const ','var '),c);
for(const n of ['formelTokens','formelLatex','formelBehovs','arLatexSvar','latexElevsvar','stadaSvar']) vm.runInContext(kod(n),c);

test('Elevens LaTeX översätts till samma enkla text som annars skrivs',()=>{
  const fall={
    '\\frac{7}{4}':'7/4','-\\frac{2}{5}':'-2/5','\\frac74':'7/4','\\dfrac{3}{4}':'3/4',
    '\\frac{2x}{3}':'2x/3','\\frac{x+1}{x-1}':'(x+1)/(x-1)',
    'x^{2}+3x':'x^2+3x','6e^{-2x}':'6e^(-2x)','10e^{2x}':'10e^(2x)',
    '\\sqrt{11}':'√(11)','\\sqrt[3]{8}':'(8)^(1/3)','2\\cdot x':'2*x','3\\times 4':'3*4',
    '0\\le x\\le\\frac{20}{3}':'0<=x<=20/3','-\\frac{1}{3}\\lt a\\lt 1':'-1/3<a<1',
    '\\left(x+1\\right)^{2}':'(x+1)^2','\\frac{2x}{{(x^2+1)}^{2}}':'2x/((x^2+1)^2)',
    '1{,}5':'1,5','\\(x^{2}\\)':'x^2','5\\,\\text{m/s}':'5 m/s','y_{B}':'y_B',
    '\\{1, 2\\}':'{1, 2}','\\pi/2':'π/2','90^{\\circ}':'90°',
  };
  for(const [in_,ut] of Object.entries(fall)) assert.equal(c.latexElevsvar(in_),ut,in_);
});

test('Svar utan LaTeX lämnas helt orörda',()=>{
  for(const s of ['x^2+3','7/4','(7)/(4)','√(2)','3·10^(5) W','x=1, 4','{1, 2}','sqrt(2)','e^(-x)']){
    assert.equal(c.arLatexSvar(s),false,s);assert.equal(c.latexElevsvar(s),s,s);
  }
});

test('Förhandsvisningen visar det eleven skrev utan att förenkla',()=>{
  const fall={
    'x^2+3':'x^{2} + 3','x^(2+3)':'x^{2 + 3}','(x+1)/(x-1)':'\\frac{x + 1}{x - 1}','3/4':'\\frac{3}{4}',
    '2x/3':'\\frac{2 x}{3}','1/2x':'\\frac{1}{2} x','√(x+1)':'\\sqrt{x + 1}','e^-x':'e^{-x}','1,5x':'1{,}5 x',
    '3·10^(5)':'3 \\cdot  10^{5}','x^{2}+3x':'x^{2} + 3 x','|x-2|':'\\left|x - 2\\right|','x<=3':'x \\le  3',
    '2+3':'2 + 3',
  };
  for(const [in_,ut] of Object.entries(fall)) assert.equal(c.formelLatex(in_).latex,ut,in_);
  /* Talpar inom parentes läses som en punkt, inte som decimaltal. */
  assert.match(c.formelLatex('(32/3,53/3)').latex,/\\frac\{32\}\{3\} ,\\\s+\\frac\{53\}\{3\}/);
  assert.equal(c.formelLatex('(x+1').ok,false);assert.equal(c.formelLatex('x+1)').ok,false);
  assert.equal(c.formelLatex('\\frac{1}{2').ok,false);assert.equal(c.formelLatex('\\frac{1}{2}').latex,'\\frac{1}{2}');
});

test('Funktioner utan parentes visas som rättningen läser dem',()=>{
  const fall={
    'cosx':'\\cos \\left(x\\right)','cos x':'\\cos \\left(x\\right)','cos2x':'\\cos \\left(2x\\right)',
    'sin^2x':'\\sin ^{2}\\left(x\\right)','sin x^2':'\\sin \\left(x^{2}\\right)','sinx^2':'\\sin \\left(x\\right)^{2}',
    'lnx':'\\ln \\left(x\\right)','cosxsinx':'\\cos \\left(x\\right) \\sin \\left(x\\right)',
    '2xcosx':'2 x \\cos \\left(x\\right)','ln(x+1)':'\\ln \\left(x + 1\\right)',
  };
  for(const [in_,ut] of Object.entries(fall)) assert.equal(c.formelLatex(in_).latex,ut,in_);
  for(const s of ['cosx','sin2x','lnx','tanx']) assert.equal(c.formelBehovs(s),true,s);
});

test('Förhandsvisningen visas bara när den tillför något',()=>{
  for(const s of ['42','-3,5','x+1','12 cm']) assert.equal(c.formelBehovs(s),false,s);
  for(const s of ['x^2','3/4','√2','(x+1','\\frac{1}{2}','2·x','sin(x)']) assert.equal(c.formelBehovs(s),true,s);
});

test('Rättningen översätter LaTeX före all formatkontroll men inte kalkylbladsformler',()=>{
  const d=kod('delSvarRatt');
  assert.match(d,/^function delSvarRatt\(anv,facit,enhet,tol,t,idx,format\)\{\n  if\(typeof anv==="string" && format!=="kalkylbladsformel" && arLatexSvar\(anv\)\) anv=latexElevsvar\(anv\);/);
  /* Bråkknappen skriver (7)/(4); bråkformatet godtar parenteser runt rena tal. */
  assert.match(kod('rentBrakSvar'),/\\\(\\s\*\(\[\+-\]\?/);
});
