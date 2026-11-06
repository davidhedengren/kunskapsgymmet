"""Ma2 kapitel 4: genomgångar med GeoGebra-skärmbilder och en fördjupning i normalfördelning (6 nov 2026).

Skriver om ma2-grund-4-01, -4-02, -4-06b, -4-07 och -4-08 i Kunskapsgymmets typuppgifter-ma2.js
och lägger till ma2-grund-4-09 (Normalfördelning fördjupning). Värdena är avlästa i GeoGebra.
"""
import json
import math
import re
from pathlib import Path
from statistics import NormalDist

FIL = Path(__file__).resolve().parents[1] / 'typuppgifter-ma2.js'
J = lambda s: json.dumps(s, ensure_ascii=False)


def bild(fil, alt, maxw):
    return (f'<img src="bilder/{fil}" alt="{alt}" loading="lazy" '
            f'style="display:block;width:100%;max-width:{maxw}px;height:auto;margin:4px auto;border-radius:8px">')


def steg(rubrik, text, matte=None, figur=None):
    a = [J(rubrik), J(text)]
    if matte or figur:
        a.append(J(matte) if matte else 'null')
    if figur:
        a.append(J(figur))
    return 'steg(' + ', '.join(a) + ')'


def add(id_, omr, rubrik, t, ram, stegs, svar, komihag, familj):
    lista = ',\n     '.join(stegs)
    return (f'  add({J(id_)}, 4, {J(omr)}, ALL,\n    {J(rubrik)},\n    {J(t)},\n    {J(ram)},\n'
            f'    [{lista}],\n    {J(svar)},\n    {J(komihag)}, {J(familj)});')


PERSP_KALK = bild('geogebra-kalkylblad-perspektiv.png',
                  'GeoGebra Classic med menyn öppen. Inringat: 1 menyknappen, 2 Perspektiv, 3 Kalkylblad.', 340)
PERSP_SANN = bild('geogebra-sannolikhet-perspektiv.png',
                  'GeoGebra Classic med menyn öppen. Inringat: 1 menyknappen, 2 Perspektiv, 3 Sannolikhet.', 340)
MENY = bild('geogebra-envariabelanalys-meny.png', 'Menyn under stapeldiagramknappen med Envariabelanalys inringad.', 420)
OPPNA_KALK = ('Gå till geogebra.org/classic. Klicka på menyknappen ☰ uppe till höger, välj <strong>Perspektiv</strong> '
              'och sedan <strong>Kalkylblad</strong>.')
OPPNA_SANN = ('Gå till geogebra.org/classic. Klicka på menyknappen ☰ uppe till höger, välj <strong>Perspektiv</strong> '
              'och sedan <strong>Sannolikhet</strong>. Kontrollera att det står <strong>Normalfördelning</strong> i listan.')


def sann_bild(slug, mu, sigma, knapp, svar):
    return bild(f'geogebra-genomgang-{slug}.png',
                f'Sannolikhetskalkylatorn med μ = {mu} och σ = {sigma}. Inringat: 1 μ, 2 σ, 3 knappen {knapp}, '
                f'4 gränserna och 5 svaret {svar}.', 420)


# ---------------------------------------------------------------- 4-01 lägesmått
e401 = add(
    'ma2-grund-4-01', 'lagesmatt', 'Bestäm medelvärde, median och typvärde',
    '<p>Bestäm medelvärde, median och typvärde för talen 2, 4, 4, 5, 10.</p>',
    'Medelvärdet använder alla värden. Medianen är det mittersta sorterade värdet. Typvärdet är det vanligaste. '
    'Med många tal går det snabbare med GeoGebra.',
    [steg('Beräkna medelvärdet', 'Addera värdena och dela med antalet.', r'\[\bar x=\frac{2+4+4+5+10}{5}=5\]'),
     steg('Bestäm medianen', 'Talen är redan sorterade, och det tredje talet ligger i mitten.', r'\[\text{median}=4\]'),
     steg('Bestäm typvärdet', '4 förekommer två gånger och övriga tal en gång.', r'\[\text{typvärde}=4\]'),
     steg('Med GeoGebra: skriv in talen och välj Envariabelanalys',
          OPPNA_KALK + ' Skriv talen i A1–A5 (tryck Enter efter varje tal) och dra med musen över cellerna så att de blir '
          'blå (1). Klicka på stapeldiagramknappen (2) och välj <strong>Envariabelanalys</strong>.',
          None, bild('geogebra-genomgang-4-01-data.png',
                     'Kalkylbladet med talen 2, 4, 4, 5, 10 i A1–A5. Cellerna är markerade och stapeldiagramknappen är inringad.', 300)),
     steg('Med GeoGebra: klicka på Σx och läs av Medel och Median',
          'Klicka på knappen <strong>Σx</strong> uppe till höger i analysfönstret. Tabellen visar Medel = 5 och '
          'Median = 4, samma som för hand. Typvärdet visas inte i tabellen. Det ser du i stället på den högsta stapeln.',
          None, bild('geogebra-genomgang-4-01-medel-median.png',
                     'Statistiktabellen i GeoGebra. Raderna Medel 5 och Median 4 är inringade.', 300))],
    'Medelvärdet är 5, medianen 4 och typvärdet 4.',
    'Sortera alltid materialet innan du bestämmer medianen för hand. GeoGebra sorterar åt dig.', 'Lägesmått')

# ---------------------------------------------------------------- 4-02 kvartiler
e402 = add(
    'ma2-grund-4-02', 'kvartiler_percentiler', 'Bestäm median och kvartiler',
    '<p>Bestäm median, undre kvartil och övre kvartil för 2, 3, 5, 7, 8, 10, 12, 15.</p>',
    'Medianen delar materialet i två halvor. Kvartilerna är medianerna i den undre respektive övre halvan.',
    [steg('Bestäm medianen', 'Det finns åtta värden, så ta medelvärdet av det fjärde och femte.', r'\[Q_2=\frac{7+8}{2}=7{,}5\]'),
     steg('Bestäm undre kvartilen', 'Medianen i 2, 3, 5, 7 är medelvärdet av 3 och 5.', r'\[Q_1=\frac{3+5}{2}=4\]'),
     steg('Bestäm övre kvartilen', 'Medianen i 8, 10, 12, 15 är medelvärdet av 10 och 12.', r'\[Q_3=\frac{10+12}{2}=11\]'),
     steg('Med GeoGebra: skriv in talen och välj Envariabelanalys',
          OPPNA_KALK + ' Skriv de åtta talen i A1–A8 och markera dem (1). Klicka på stapeldiagramknappen (2) och välj '
          '<strong>Envariabelanalys</strong>.',
          None, bild('geogebra-genomgang-4-02-data.png',
                     'Kalkylbladet med talen 2, 3, 5, 7, 8, 10, 12, 15 i A1–A8. Cellerna är markerade och stapeldiagramknappen är inringad.', 300)),
     steg('Med GeoGebra: klicka på Σx och läs av Q1, Median och Q3',
          'Klicka på <strong>Σx</strong> uppe till höger. Raderna Q1, Median och Q3 visar 4, 7.5 och 11. '
          'GeoGebra skriver decimaltal med punkt, så 7.5 betyder 7,5.',
          None, bild('geogebra-genomgang-4-02-kvartiler.png',
                     'Statistiktabellen i GeoGebra. Raderna Q1 4, Median 7.5 och Q3 11 är inringade.', 300))],
    r'\(Q_1=4\), medianen är \(7{,}5\) och \(Q_3=11\).',
    'Olika digitala verktyg kan använda något olika sätt att bestämma kvartiler. Följ kursens eller verktygets metod konsekvent.',
    'Bestämma median och kvartiler')

# ---------------------------------------------------------------- 4-06b standardavvikelse
data = [12, 15, 11, 14, 18, 16]
e406 = add(
    'ma2-grund-4-06b', 'standardavvikelse', 'Beräkna standardavvikelse med GeoGebra',
    '<p>Sex elever gjorde armhävningar: 12, 15, 11, 14, 18 och 16 stycken. Bestäm medelvärdet och standardavvikelsen med GeoGebra.</p>',
    'Standardavvikelsen beskriver hur långt värdena typiskt ligger från medelvärdet. Den räknar du inte för hand, '
    'utan med Envariabelanalys i GeoGebra. Svaret står på raden <strong>s</strong>.',
    [steg('Öppna ett kalkylblad', OPPNA_KALK, None, PERSP_KALK),
     steg('Skriv in värdena i kolumn A och markera dem',
          'Klicka i cell A1, skriv 12 och tryck Enter. Då hamnar du i cellen under. Skriv på samma sätt 15, 11, 14, 18 och 16. '
          'Dra sedan med musen från A1 till A6 så att cellerna blir blå (1).',
          None, bild('geogebra-genomgang-4-06-data.png',
                     'Kalkylbladet med värdena 12, 15, 11, 14, 18, 16 i A1–A6. Cellerna är markerade och stapeldiagramknappen är inringad.', 300)),
     steg('Välj Envariabelanalys',
          'Klicka på stapeldiagramknappen, den andra knappen i verktygsraden (2 i förra bilden), och välj '
          '<strong>Envariabelanalys</strong>. Ett analysfönster med ett histogram öppnas.', None, MENY),
     steg('Klicka på Σx',
          'Knappen <strong>Σx</strong> sitter uppe till höger i analysfönstret. Då visas en tabell med statistiska mått.',
          None, bild('geogebra-genomgang-4-06-analys.png',
                     'Analysfönstret med histogram över armhävningarna. Knappen Σx uppe till höger är inringad.', 520)),
     steg('Läs av Medel och s',
          'Medel = 14.3333 och s = 2.582. GeoGebra skriver decimaltal med punkt. Använd raden <strong>s</strong> för '
          'standardavvikelsen, inte raden σ. I den här kursen räknar vi standardavvikelsen för ett datamaterial med s.',
          r'\[\bar x\approx14{,}3\qquad s\approx2{,}58\]',
          bild('geogebra-genomgang-4-06-medel-s.png',
               'Statistiktabellen i GeoGebra. Raderna Medel 14.3333 och s 2.582 är inringade.', 300))],
    r'Medelvärdet är ungefär \(14{,}3\) armhävningar och standardavvikelsen ungefär \(2{,}58\) armhävningar.',
    'Raden s ger standardavvikelsen. Kontrollera att n i tabellen är lika med antalet värden du skrev in.',
    'Beräkna och tolka standardavvikelse')

# ---------------------------------------------------------------- 4-07 68–95–99,7
e407 = add(
    'ma2-grund-4-07', 'normalfordelat_material', 'Använd 68–95–99,7-regeln',
    '<p>Ett normalfördelat material har medelvärdet 100 och standardavvikelsen 15. Mellan vilka värden ligger ungefär 95 % av observationerna?</p>',
    'I en normalfördelning ligger ungefär 68 % inom en standardavvikelse och ungefär 95 % inom två standardavvikelser från medelvärdet.',
    [steg('Beräkna två standardavvikelser', 'Två standardavvikelser är 2 · 15 = 30.', r'\[2\sigma=2\cdot15=30\]'),
     steg('Bestäm gränserna', 'Subtrahera och addera 30 till medelvärdet.', r'\[100-30=70,\quad100+30=130\]'),
     steg('Kontrollera i GeoGebras Sannolikhetskalkylator',
          OPPNA_SANN + ' Skriv μ = 100 (1) och σ = 15 (2). Välj <strong>Intervall</strong> (3) och skriv gränserna 70 och 130 (4). '
          'Svaret 0.9545 (5) betyder 95,45 %, alltså ungefär 95 %.',
          None, sann_bild('4-07', 100, 15, 'Intervall', '0.9545'))],
    'Ungefär 95 % ligger mellan 70 och 130.',
    'Rita gärna en enkel normalfördelningskurva och markera medelvärdet innan du räknar.', 'Andel i ett intervall')

# ---------------------------------------------------------------- 4-08 digitalt
e408 = add(
    'ma2-grund-4-08', 'normalfordelning_digitala_verktyg', 'Beräkna normalfördelningssannolikhet med GeoGebra',
    '<p>Längden hos vuxna kvinnor i ett land är normalfördelad med medelvärdet 168 cm och standardavvikelsen 7 cm. '
    'Hur stor andel av kvinnorna är mellan 160 cm och 180 cm långa?</p>',
    'Sannolikhetskalkylatorn i GeoGebra räknar ut andelen under kurvan. Du skriver in μ och σ, väljer vilket område du '
    'vill ha och skriver gränserna.',
    [steg('Öppna Sannolikhetskalkylatorn', OPPNA_SANN, None, PERSP_SANN),
     steg('Skriv in μ = 168 och σ = 7',
          'Klicka i rutan efter μ (1), skriv 168 och tryck Enter. Gör likadant i rutan efter σ (2) med 7.'),
     steg('Välj Intervall och skriv gränserna 160 och 180',
          'Klicka på knappen <strong>Intervall</strong> (3), den andra av de fyra knapparna. Skriv 160 i den vänstra rutan '
          'och 180 i den högra (4). Tryck Enter efter varje tal.'),
     steg('Läs av svaret',
          'Efter likhetstecknet (5) står 0.8302. Det skuggade området mellan 160 och 180 visar samma andel.',
          r'\[P(160\le X\le180)\approx0{,}830=83{,}0\,\%\]',
          sann_bild('4-08', 168, 7, 'Intervall', '0.8302'))],
    r'Ungefär \(83\,\%\) av kvinnorna är mellan 160 cm och 180 cm långa.',
    'Knapparna betyder: <strong>Öppet åt vänster</strong> ger andelen under en gräns, <strong>Intervall</strong> andelen '
    'mellan två gränser och <strong>Öppet åt höger</strong> andelen över en gräns.',
    'Sannolikhet över, under och i intervall')

# ---------------------------------------------------------------- 4-09 fördjupning
z = NormalDist().inv_cdf(0.03)          # −1,8808 (GeoGebra visar −1.8808)
mu = 990 - z * 6                         # 1001,28
assert abs(z + 1.8808) < 5e-5 and round(mu, 1) == 1001.3
kontroll = NormalDist(1001.3, 6).cdf(990)
assert round(kontroll, 4) == 0.0298


def figur():
    """Normalkurva med två skalor: antal standardavvikelser och ml."""
    x0, x1, yb, h = 14, 306, 128, 96
    X = lambda k: x0 + (k + 3.4) / 6.8 * (x1 - x0)
    f = lambda k: math.exp(-k * k / 2)
    pts = [(X(k / 20), yb - h * f(k / 20)) for k in range(-68, 69)]
    kurva = 'M' + ' L'.join(f'{a:.1f} {b:.1f}' for a, b in pts)
    zk = -1.8808
    svans = [(X(k / 20), yb - h * f(k / 20)) for k in range(-68, int(zk * 20) + 1)] + [(X(zk), yb - h * f(zk))]
    yta = f'M{X(-3.4):.1f} {yb} L' + ' L'.join(f'{a:.1f} {b:.1f}' for a, b in svans) + f' L{X(zk):.1f} {yb} Z'
    T = 'style="font-size:15px"'
    sig = ''.join(f'<text x="{X(k):.1f}" y="{yb + 19}" text-anchor="middle" {T}>{str(k).replace("-", "−")}</text>'
                  for k in (-3, -1, 0, 1, 2, 3))
    streck = ''.join(f'M{X(k):.1f} {yb}V{yb + 5}' for k in range(-3, 4))
    y2 = yb + 44
    return (
        '<svg class="dg" viewBox="0 0 320 214" role="img" aria-label="Normalfördelningskurva med två skalor under. Den övre '
        'skalan räknar antal standardavvikelser från minus 3 till 3. På den undre skalan, i milliliter, ligger 990 ml vid '
        'minus 1,88 standardavvikelser och medelvärdet μ vid 0. Området till vänster om gränsen är skuggat och är 3 procent." '
        'style="display:block;width:100%;max-width:420px;height:auto;margin:6px auto 2px">'
        f'<path d="{yta}" style="fill:var(--gold);opacity:.55"/>'
        f'<path class="dg-linje" d="{kurva}"/>'
        f'<path class="dg-axel" d="M{x0} {yb}H{x1}{streck}"/>'
        f'<path class="dg-hjalp" d="M{X(zk):.1f} {yb - 58}V{y2 + 4}"/>'
        f'<g class="dg-txt">{sig}</g>'
        f'<text class="dg-etikett" x="{X(zk) + 9:.1f}" y="{yb + 19}" text-anchor="end" {T}>−1,88</text>'
        f'<path class="dg-axel" d="M{x0} {y2}H{x1}M{X(zk):.1f} {y2}V{y2 + 5}M{X(0):.1f} {y2}V{y2 + 5}"/>'
        f'<text class="dg-etikett" x="{X(zk):.1f}" y="{y2 + 21}" text-anchor="middle" {T}>990</text>'
        f'<text class="dg-txt" x="{X(0):.1f}" y="{y2 + 21}" text-anchor="middle" {T}>μ</text>'
        f'<text class="dg-liten" x="{x1}" y="{yb + 34}" text-anchor="end" style="font-size:13px">antal standardavvikelser</text>'
        f'<text class="dg-liten" x="{x1}" y="{y2 + 38}" text-anchor="end" style="font-size:13px">milliliter</text>'
        f'<text class="dg-etikett" x="{X(zk) - 6:.1f}" y="{yb - 40}" text-anchor="end" {T}>3 %</text>'
        f'<path d="M{X(zk) - 18:.1f} {yb - 35}L{X(-2.3):.1f} {yb - 9}" style="fill:none;stroke:var(--gold);stroke-width:1.5"/>'
        '</svg>')


e409 = add(
    'ma2-grund-4-09', 'normalfordelning_digitala_verktyg', 'Normalfördelning fördjupning',
    '<p>En maskin fyller juiceflaskor. Innehållet är normalfördelat med standardavvikelsen 6 ml, och medelvärdet kan '
    'ställas in. Högst 3 % av flaskorna får innehålla mindre än 990 ml. Vilket är det lägsta medelvärde maskinen kan '
    'ställas in på?</p>',
    'Här är medelvärdet okänt, så du kan inte skriva in fördelningen i GeoGebra direkt. Räkna i stället först i '
    '<strong>antal standardavvikelser</strong> med μ = 0 och σ = 1, och översätt sedan till milliliter.',
    [steg('Varför går det inte att räkna direkt?',
          'Sannolikhetskalkylatorn behöver både μ och σ. Vi vet att σ = 6 ml, men μ är just det vi söker. Vi vet däremot '
          'andelen, 3 %, och gränsen, 990 ml.'),
     steg('Tänk i antal standardavvikelser',
          'Alla normalfördelningar har samma form. Andelen under en gräns beror bara på hur många standardavvikelser '
          'gränsen ligger från medelvärdet. 3 % under gränsen betyder alltså lika många standardavvikelser under '
          'medelvärdet i alla normalfördelningar. Med μ = 0 och σ = 1 räknar x-axeln direkt i standardavvikelser, '
          'som den övre skalan i figuren. Gränsen 990 ml och −1,88 standardavvikelser är samma punkt.', None, figur()),
     steg('Hitta gränsen för 3 % med μ = 0 och σ = 1',
          OPPNA_SANN + ' Skriv μ = 0 (1) och σ = 1 (2). Välj <strong>Öppet åt vänster</strong> (3). Skriv 0,03 i rutan '
          'efter likhetstecknet (4) och tryck Enter. GeoGebra räknar då baklänges och visar gränsen −1.8808 i rutan efter '
          'X ≤ (5).',
          None, bild('geogebra-genomgang-4-09-z.png',
                     'Sannolikhetskalkylatorn med μ = 0 och σ = 1. Inringat: 1 μ, 2 σ, 3 knappen Öppet åt vänster, '
                     '4 sannolikheten 0.03 och 5 svaret, gränsen −1.8808.', 420)),
     steg('Översätt: 990 ml ligger 1,8808 standardavvikelser under medelvärdet',
          'Gränsen är negativ, alltså under medelvärdet. En standardavvikelse är 6 ml, så avståndet från medelvärdet ner '
          'till gränsen är 1,8808 · 6 ml.', r'\[\mu-1{,}8808\cdot6=990\]'),
     steg('Lös ut medelvärdet', 'Addera 1,8808 · 6 till båda leden.',
          r'\[\mu=990+1{,}8808\cdot6\approx1001{,}3\]'),
     steg('Kontrollera med de riktiga värdena',
          'Skriv nu μ = 1001,3 och σ = 6, välj <strong>Öppet åt vänster</strong> och skriv gränsen 990. Andelen blir 0.0298, '
          'alltså knappt 3 %. Det stämmer.',
          None, bild('geogebra-genomgang-4-09-kontroll.png',
                     'Sannolikhetskalkylatorn med μ = 1001.3 och σ = 6. Inringat: 1 μ, 2 σ, 3 knappen Öppet åt vänster, '
                     '4 gränsen 990 och 5 svaret 0.0298.', 420))],
    r'Maskinen måste ställas in på minst ungefär \(1001{,}3\) ml.',
    'Gör så här när μ eller σ är okänd: 1) Sök gränsen med μ = 0 och σ = 1. Då får du antal standardavvikelser. '
    '2) Ställ upp gränsen = μ + (antal standardavvikelser) · σ. 3) Lös ut det okända. Samma ekvation fungerar när σ är '
    r'okänd och μ känd, till exempel \(1000-1{,}8808\cdot\sigma=990\) ger \(\sigma\approx5{,}3\).',
    'Bestämma gränsvärde och percentil')

src = FIL.read_text(encoding='utf-8')


def ersatt(src, id_, ny, efter=None):
    m = re.search(r'  add\("' + re.escape(id_) + r'",.*?\);\n', src, re.S)
    assert m, id_
    return src[:m.start()] + ny + '\n' + src[m.end():]


for id_, ny in [('ma2-grund-4-01', e401), ('ma2-grund-4-02', e402), ('ma2-grund-4-06b', e406),
                ('ma2-grund-4-07', e407)]:
    src = ersatt(src, id_, ny)
if 'add("ma2-grund-4-09"' in src:
    src = ersatt(ersatt(src, 'ma2-grund-4-08', e408), 'ma2-grund-4-09', e409)
else:
    src = ersatt(src, 'ma2-grund-4-08', e408 + '\n\n' + e409)
assert src.count('ma2-grund-4-09') == 1
FIL.write_text(src, encoding='utf-8', newline='')
print('ok', round(z, 4), round(mu, 2), round(kontroll, 4))
