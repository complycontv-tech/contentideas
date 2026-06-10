#!/usr/bin/env node
/**
 * Launchpad Marketing — Daily Idea Generator 🇸🇰
 * Creates fresh content ideas for Slovak market every day.
 * Output: .md files in ideas/{Niche}/YYYY-MM-DD-{slug}.md
 */

const fs = require('fs');
const path = require('path');

const today = new Date().toISOString().split('T')[0];
const IDEAS_DIR = path.join(__dirname, '../../ideas');

const templates = {
  Marketing: [
    { title: 'Prečo tvoje IG Stories nikto nepozerá?', hook: 'Píšeš Stories každý deň, ale engagement je nula? Tu je 5 dôvodov, prečo ťa ľudia preskakujú.', tags: ['marketing', 'instagram', 'stories'] },
    { title: 'Ako využiť User Generated Content na Slovensku', hook: 'UGC je najlacnejší a najefektívnejší marketing. Prečo ho slovenské značky stále ignorujú?', tags: ['marketing', 'ugc', 'trendy'] },
    { title: 'Meta Ads vs Google Ads: Čo funguje na SK trhu?', hook: 'Máš rozpočet na reklamu, ale nevieš, kam ho dať? Poďme si rozobrať, čo reálne funguje na slovenskom trhu.', tags: ['marketing', 'ads', 'comparison'] },
    { title: 'SEO pre začiatočníkov: Prvých 30 dní', hook: 'SEO nie je veda. Tu je presný plán na prvých 30 dní, ktorý zvládne aj úplný začiatočník.', tags: ['marketing', 'seo', 'navod'] },
    { title: 'Prečo ti newsletter nikto neotvára?', hook: 'Máš 500 odberateľov ale otvára ich 10? Tu je 5 vecí, ktoré robíš zle.', tags: ['marketing', 'email', 'newsletter'] },
    { title: 'Ako písať virálne titulky (slovensky)', hook: 'Titulka rozhoduje o tom, či ťa niekto klikne alebo preskočí. Tu je 7 vzorcov, ktoré fungujú na slovenské publikum.', tags: ['marketing', 'copywriting', 'headlines'] },
  ],
  Gastro: [
    { title: 'Ako spraviť z reštaurácie Instagram fenomén', hook: 'Stačia 3 zmeny v tvojom IG profile a ľudia začnú prichádzať len z Instagramu.', tags: ['gastro', 'instagram', 'marketing'] },
    { title: 'Najlepšie slovenské food miesta, o ktorých nikto nevie', hook: 'Zabudni na známe reštaurácie. Tieto 3 miesta ťa dostanú kvalitou aj cenou.', tags: ['gastro', 'slovensko', 'tipy'] },
    { title: 'Prečo slovenské bistrá nevedia predávať kávu?', hook: 'Káva je najpredávanejší produkt v gastre, ale 90% bistier ju nevie správne odkomunikovať. Tu je návod.', tags: ['gastro', 'kava', 'predaj'] },
    { title: 'Food styling pre začiatočníkov: Ako fotiť jedlo', hook: 'Na fotenie jedla nepotrebuješ profi foťák. Tu je 5 trikov ako spraviť estetické fotky mobilom.', tags: ['gastro', 'fotenie', 'instagram'] },
    { title: 'Recenzia: Najlepšia pizza v Bratislave', hook: 'Otestoval som 7 pizzérií v BA za mesiac. Toto je víťaz (a podvod, ktorému sa vyhnúť).', tags: ['gastro', 'bratislava', 'recenzia'] },
    { title: 'Ako spraviť virálne video z tvojho bistra', hook: 'Jeden Reel ti môže zaplniť reštauráciu na týždeň. Tu je presný postup, ako na to.', tags: ['gastro', 'tiktok', 'viral'] },
  ],
  'Personal Brand': [
    { title: '3 veci, ktoré som sa naučil za rok budovania brandu', hook: 'Rok som budoval osobnú značku od nuly. Tu je 3 vecí, ktoré by som si prial vedieť na začiatku.', tags: ['personal-brand', 'skusenosti', 'learnt'] },
    { title: 'Prečo ťa na LinkedIne nikto nesleduje?', hook: 'Máš plný profil, ale nikto ťa nesleduje? Tu je dôvod (a riešenie).', tags: ['personal-brand', 'linkedin', 'growth'] },
    { title: 'Ako začať s content creation bez drahej techniky', hook: 'Myslíš si, že na tvorbu obsahu potrebuješ Sony kam eru a svetlá? Tu je pravda.', tags: ['personal-brand', 'content-creation', 'zaciatky'] },
    { title: 'Tvoja prvá spolupráca so značkou: Návod', hook: 'Značka ťa oslovila, ale nevieš, čo pýtať? Tu je presný návod na prvú platenú spoluprácu.', tags: ['personal-brand', 'spolupraca', 'biznis'] },
    { title: 'Ako rozprávať príbehy, ktoré ľudí zaujmú', hook: 'Storytelling je najsilnejší nástroj brandu. Ale 90% ľudí ho robí zle. Tu je návod.', tags: ['personal-brand', 'storytelling', 'content'] },
    { title: 'Prečo autenticita vyhráva nad dokonalosťou', hook: 'Dokonalý feed je mŕtvy. Ľudia chcú vidieť tvoju tvár, tvoje chyby a tvoj príbeh.', tags: ['personal-brand', 'autenticita', 'trendy'] },
  ]
};

const niches = Object.keys(templates);

// Generate 2-3 ideas from each niche
for (const niche of niches) {
  const nicheDir = path.join(IDEAS_DIR, niche);
  fs.mkdirSync(nicheDir, { recursive: true });

  const pool = templates[niche];
  // Shuffle and pick 2-3
  const selected = pool.sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 2));

  for (const idea of selected) {
    const slug = idea.title
      .toLowerCase()
      .replace(/[^a-z0-9áäčďéíĺľňóôŕšťúýž ]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 55);

    const filename = `${today}-${slug}.md`;
    const filepath = path.join(nicheDir, filename);

    const formats = ['Reel', 'Carousel', 'Stories', 'TikTok'];
    const platforms = ['IG', 'IG/TikTok', 'TikTok'];
    const format = formats[Math.floor(Math.random() * formats.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];

    const content = `---
title: "${idea.title}"
niche: ${niche}
hook: "${idea.hook}"
format: ${format}
platform: ${platform}
status: draft
date: ${today}
tags: [${idea.tags.map(t => t.toLowerCase()).join(', ')}]
---

# ${idea.title}

**Hook:** ${idea.hook}

**Formát:** ${format} | **Platforma:** ${platform}

## Osnova
- Bod 1
- Bod 2
- Bod 3

## CTA
-
`;

    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`✅ ${niche}/${filename}`);
  }
}

console.log(`\n🎉 Generated ${today} — hotovo!`);