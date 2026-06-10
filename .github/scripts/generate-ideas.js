#!/usr/bin/env node
/**
 * Launchpad Marketing — Daily Idea Generator 🇸🇰
 * Generates rich content ideas for Slovak market with full production details.
 */

const fs = require('fs');
const path = require('path');

const today = new Date().toISOString().split('T')[0];
const IDEAS_DIR = path.join(__dirname, '../../ideas');

const ideaPool = [
  // ===== MARKETING =====
  {
    niche: 'Marketing',
    title: 'Prečo tvoje IG Stories nikto nepozerá?',
    hook: 'Píšeš Stories každý deň, ale engagement je nula? Tu je 5 dôvodov, prečo ťa ľudia preskakujú.',
    target: 'Majitelia malých firiem, freelanceri, content creatori (25-40), ktorí už tvoria obsah ale nevidia výsledky.',
    tone: 'Priateľský, ale odborný. Tykanie. "Kamoš, čo ti povie tvrdú pravdu."',
    script: '1. Hook (0-3s): "Pošleš 10 Stories denne a nikto nereaguje?"\n2. Problem (3-15s): "Stráviš hodinu fotením, píšeš ankety, ale odklepávajú to."\n3. Reveal (15-30s): "Tu je 5 dôvodov: 1. Prvý slide nie je hook, 2. Nepoužívaš poll, 3. Príliš veľa textu, 4. Žiadna konzistencia štýlu, 5. Nepozeráš analytics."\n4. Riešenie (30-45s): "Oprav jednu vec denne. Zajtra: hook v prvom slide."\n5. CTA (45-50s): "Napíš STORIES a pošlem ti checklist."',
    length: 'Reel 45-60s alebo Carousel 5 slidov',
    visualTips: 'Svetlo: Denné svetlo z okna, 45° uhol. Žiadne tvrdé tiene. Kamera: iPhone 13+ zadná kamera, 4K 30fps. Kompozícia: Tvár v strede, texty v safe zone. Farby: #1A56DB akcenty na bielom pozadí. Strih: Rýchly, každé 3-4s strih, beat synced.'
  },
  {
    niche: 'Marketing',
    title: 'SEO pre začiatočníkov: Prvých 30 dní',
    hook: 'SEO nie je veda. Tu je presný plán na prvých 30 dní, ktorý zvládne aj úplný začiatočník.',
    target: 'Začínajúci podnikatelia a freelance marketéri (22-35), ktorí chcú pochopiť SEO.',
    tone: 'Edukačný, trpezlivý. Vysvetľuje komplexné veci jednoducho.',
    script: '1. Hook (0-3s): "Myslíš, že SEO je nukleárna fyzika?"\n2. (3-20s): "Nie je. Tu je plán na 30 dní."\n3. (20-40s): "Týždeň 1: Key research. Týždeň 2: Napíš 1 post. Týždeň 3: Interné linky. Týždeň 4: Meraj výsledky."\n4. (40-55s): "Jeden post denne ťa dostane na page 1 za 90 dní."',
    length: 'Carousel 7 slidov alebo Reel 55s',
    visualTips: 'Screen recording z Google Search Console a Ahrefs. Zelené a modré grafy. Textové slidov s postupnými krokmi. Použi mockup telefónu pre ukážku výsledkov.'
  },
  {
    niche: 'Marketing',
    title: 'Meta Ads vs Google Ads na Slovensku',
    hook: 'Máš budget 500€ na reklamu. Kam to dáš? Rozbor čo funguje na slovenskom trhu.',
    target: 'Podnikatelia a majitelia e-shopov (25-45), ktorí investujú do reklamy.',
    tone: 'Analytický, dáta-driven. "Žiadne dojmy, len čísla."',
    script: '1. Hook: "500€ do reklamy. Meta alebo Google?"\n2. Dáta: Priemerné CPA na SK trhu.\n3. Kedy Meta: vizuálne produkty, impulzívny nákup.\n4. Kedy Google: vysoký intent, služby, B2B.\n5. Odporúčanie: 70/30 split podľa biznisu.',
    length: 'Reel 60s',
    visualTips: 'Split screen: Meta vs Google rozhranie. Grafy CPA porovnanie, červená/zelená. Zvýrazni kľúčové čísla. Použi data screenshots.'
  },

  // ===== GASTRO =====
  {
    niche: 'Gastro',
    title: 'Najlepšie skryté gastro miesta na Slovensku',
    hook: 'Zabudni na známe reštaurácie. Tieto 3 miesta ťa dostanú kvalitou aj atmosférou.',
    target: 'Foodies, mladí ľudia 20-35 z väčších miest (BA, KE, TN, BB), ktorí radi objavujú nové miesta.',
    tone: 'Nadšený, autentický. "Kamoš, čo ti dáva insider tipy."',
    script: '1. Hook: "TOP 3 miesta, o ktorých nikto nerozpráva."\n2. Miesto 1: Lokalita, čo ochutnať, cena, vibe.\n3. Miesto 2: To isté + instagramovateľnosť.\n4. Miesto 3: Hidden gem + prečo práve tam.\n5. CTA: "Kde si ty naposledy objavil skvelé miesto?"',
    length: 'Reel 45-60s',
    visualTips: 'Svetlo: Zlatá hodinka (60 min pred západom). 45° bočné svetlo na jedlo. Kamera: 4K 60fps pre slow-mo. Kompozícia: Top-down na jedlo, 45° na nápoje. Farba: Teplé tóny (+5 temp). Stabilizácia: Gimbal alebo stôl.'
  },
  {
    niche: 'Gastro',
    title: 'Ako spraviť z reštaurácie Instagram fenomén',
    hook: 'Stačia 3 zmeny v tvojom IG profile a ľudia začnú prichádzať len z Instagramu.',
    target: 'Majitelia reštaurácií, bister, kaviarní (28-50), ktorí chcú viac zákazníkov cez sociálne siete.',
    tone: 'Praktický, business-oriented. "Žiadna teória, len to čo funguje."',
    script: '1. Hook: "Tvoja reštaurácia je skvelá, ale IG ťa stojí zákazníkov."\n2. Chyba 1: Žiadna atmosféra na fotkách.\n3. Chyba 2: Bio nehovorí čo ponúkate.\n4. Chyba 3: Nevyužívate User Generated Content.\n5. Fix: 3 zmeny do týždňa.',
    length: 'Reel 55-65s',
    visualTips: 'Interiérové zábery: Široký uhol (24mm) pre atmosféru, makro (50mm+) pre jedlo. Svetlo: Kombinuj okenné + teplé umelé (2800K). Nespoliehaj sa na stropné svetlá. Použi food styling: bylinky, omáčka kvapnutá umelecky.'
  },
  {
    niche: 'Gastro',
    title: 'Koľko reálne zarábajú slovenské reštaurácie?',
    hook: 'Myslíš, že reštaurácie zarábajú milióny? Poď sa pozrieť na reálne čísla.',
    target: 'Podnikatelia, investori, ľudia čo rozmýšľajú nad otvorením reštaurácie (25-40).',
    tone: 'Transparentný, edukatívny, "behind the curtain".',
    script: '1. Hook: "Otvoriť reštauráciu = sen? Skôr nočná mora."\n2. Náklady: Nájom, energie, suroviny, mzdy.\n3. Marža: Koľko reálne zostane.\n4. Kedy sa to oplatí: High volume alebo high margin.\n5. Rada: Začni s pop-up alebo food truck.',
    length: 'Reel 60-75s',
    visualTips: 'Infografika: koláčové grafy nákladov. Animovaná osnova. Modrá/zelená pre profit, červená pre stratu. Biznis estetika: čisté pozadie, profesionálne písmo.'
  },

  // ===== PERSONAL BRAND =====
  {
    niche: 'Personal Brand',
    title: 'Prečo ťa na LinkedIne nikto nesleduje?',
    hook: 'Máš plný profil, ale nikto neinteraguje. Tu je dôvod.',
    target: 'Mladí profesionáli, freelanceri, konzultanti (24-38), ktorí chcú budovať osobnú značku.',
    tone: 'Úprimný, direct. "Poviem ti to na rovinu."',
    script: '1. Hook: "Skontrolujem tvoj LinkedIn profil a poviem ti, čo je zle."\n2. Chyba 1: Profilová fotka.\n3. Chyba 2: Bio bez value proposition.\n4. Chyba 3: Content je nuda.\n5. Fix: Nová fotka, prepísané bio, 3 posty týždenne.',
    length: 'Carousel 6 slidov alebo Reel 50s',
    visualTips: 'Screenshoty zlých/dobrých LinkedIn profilov (anonymizované). Pred/po porovnanie. Zelené fajky pre "good", červené kríže pre "bad". Použi LinkedIn modrú (#0A66C2) ako akcent.'
  },
  {
    niche: 'Personal Brand',
    title: '3 nástroje, ktoré ti ušetria 10h týždenne',
    hook: 'Strácaš čas tvorbou obsahu? Tieto 3 nástroje ti ho vrátia.',
    target: 'Content creatori, podnikatelia, busy profesionáli (22-40), ktorí chcú byť efektívnejší.',
    tone: 'Užitočný, tool-focused. "Nástroje, ktoré reálne používam."',
    script: '1. Hook: "10 hodín týždenne naspäť? Tu je ako."\n2. Nástroj 1: Notion na plánovanie.\n3. Nástroj 2: Canva na grafiku (AI features).\n4. Nástroj 3: CapCut na strih videa.\n5. Workflow: Ako to celé funguje dokopy.',
    length: 'Carousel 7 slidov',
    visualTips: 'Screen recording z každého nástroja. Mockup UI. Rozdeľ na tri sekcie - každý nástroj má 2 slid. Farebne odlíš (modrá/Charcoal/zelená). Posledný slide: workflow diagram.'
  },
  {
    niche: 'Personal Brand',
    title: 'Ako rozprávať príbehy, ktoré zaujmú',
    hook: 'Storytelling je najsilnejší nástroj. Ale 90% ľudí ho robí zle.',
    target: 'Content creatori, lídri, konzultanti (25-45), ktorí chcú lepšie komunikovať.',
    tone: 'Inšpiratívny, ale praktický. "Príbeh + lesson learned."',
    script: '1. Hook: "Každý hovorí o storytellingu. Málokto ho vie reálne použiť."\n2. Štruktúra: Hook → Problem → Journey → Lesson → CTA\n3. Príklad: Ako som zlyhal pri prvom klientovi.\n4. Template: "Pred rokom som [situácia]. Dnes [výsledok]. Tu je čo som sa naučil."',
    length: 'Reel 60-90s',
    visualTips: 'Talking head + B-roll (zábery z reálneho života). Striedaj detail tváre a wide shot. Svetlo: Rembrandt (45° bočné, 45° výška). Použi teplé tóny pre storytelling. Pomalšie strihanie (každých 5-6s).'
  }
];

const niches = [...new Set(ideaPool.map(i => i.niche))];

for (const niche of niches) {
  const nicheDir = path.join(IDEAS_DIR, niche);
  fs.mkdirSync(nicheDir, { recursive: true });

  const pool = ideaPool.filter(i => i.niche === niche);
  // Pick 2-3 from each niche (dnes všetky)
  const selected = pool; // .sort(() => Math.random() - 0.5).slice(0, Math.min(3, pool.length));

  for (const idea of selected) {
    const slug = idea.title
      .toLowerCase()
      .replace(/[^a-z0-9áäčďéíĺľňóôŕšťúýž ]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 55);

    const filename = `${today}-${slug}.md`;
    const filepath = path.join(nicheDir, filename);

    const content = `---
title: "${idea.title}"
niche: ${idea.niche}
hook: "${idea.hook}"
format: Reel
platform: IG/TikTok
status: draft
date: ${today}
tags: [${idea.niche.toLowerCase().replace(' ', '-')}, content]
target_audience: "${idea.target}"
tone_of_voice: "${idea.tone}"
length: "${idea.length}"
---

# ${idea.title}

**Hook:** ${idea.hook}

**Cieľová skupina:** ${idea.target}

**Tone of Voice:** ${idea.tone}

**Dĺžka:** ${idea.length}

---

## Scénar

${idea.script}

---

## Vizuálne tipy

${idea.visualTips}

---

## CTA

-
`;

    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`✅ ${niche}/${filename}`);
  }
}

// Update ideas-list.json
const { execSync } = require('child_process');
execSync('node ' + path.join(__dirname, 'build-json.js'), { cwd: path.dirname(__dirname) });

console.log(`\n🎉 Generated ${today} — hotovo!`);