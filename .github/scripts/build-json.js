#!/usr/bin/env node
/**
 * Build ideas-list.json from .md files in ideas/ folder
 */
const fs = require('fs');
const path = require('path');

const IDEAS_DIR = path.join(__dirname, '../../ideas');
const OUTPUT = path.join(__dirname, '../../ideas-list.json');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const fm = {};
  match[1].split('\n').forEach(line => {
    const sep = line.indexOf(':');
    if (sep === -1) return;
    const key = line.slice(0, sep).trim();
    let val = line.slice(sep + 1).trim();
    // Remove quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    fm[key] = val;
  });
  return fm;
}

const ideas = [];

function walk(dir, niche) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    if (f.startsWith('.')) return;
    const fp = path.join(dir, f);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      walk(fp, f);
    } else if (f.endsWith('.md')) {
      const content = fs.readFileSync(fp, 'utf-8');
      const fm = parseFrontmatter(content);
      if (fm) {
        ideas.push({
          title: fm.title || f.replace('.md', ''),
          niche: fm.niche || niche,
          hook: fm.hook || '',
          format: fm.format || 'Reel',
          platform: fm.platform || 'IG/TikTok',
          date: fm.date || '',
          path: `ideas/${niche}/${f}`,
          tags: fm.tags ? fm.tags.replace(/[\[\]]/g, '').split(',').map(t => t.trim()) : []
        });
      }
    }
  });
}

walk(IDEAS_DIR, '');
ideas.sort((a, b) => b.date.localeCompare(a.date));

fs.writeFileSync(OUTPUT, JSON.stringify(ideas, null, 2), 'utf-8');
console.log(`✅ Updated ideas-list.json — ${ideas.length} ideas`);