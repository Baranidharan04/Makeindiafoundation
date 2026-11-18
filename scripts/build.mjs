import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { buildAssets } from './build-assets.mjs';

const require = createRequire(import.meta.url);
const Babel = require('../public/js/babel.min.js');

const files = [
  'src/context/RegistrationContext.js',
  'src/components/CommonUI.js',
  'src/components/Navigation.js',
  'src/components/Footer.js',
  'src/components/Contact.js',
  'src/components/ScienceHeroBackground.js',
  'src/components/Hero.js',
  'src/components/Mission.js',
  'src/components/CompetitionSection.js',
  'src/components/InnovatorJourney.js',
  'src/components/TrendingNews.js',
  'src/components/ScienceSimplified.js',
  'src/pages/IndexPage.js',
  'src/pages/AboutPage.js',
  'src/pages/WorkshopPage.js',
  'src/pages/MakersSpacePage.js',
  'src/pages/ArisePage.js',
  'src/pages/IgnitePage.js',
  'src/pages/GuidelinesPage.js',
  'src/pages/CompetitionsPage.js',
  'src/pages/CompetitionCategoriesPage.js',
  'src/pages/CompetitionRulesPage.js',
  'src/pages/CompetitionFAQPage.js',
  'src/pages/FindFairPage.js',
  'src/pages/CompetitionDatabasePage.js',
  'src/pages/AwardsPage.js',
  'src/pages/GeneralFAQPage.js',
  'src/pages/ContactPage.js',
  'src/pages/VolunteerRegistrationPage.js',
  'src/pages/NotFoundPage.js',
  'src/pages/ComingSoonPage.js',
  'src/App.js'
];

console.log('Building app.min.js ahead of time...');
let bundle = '(function(){\n';
for (const file of files) {
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    process.exit(1);
  }
  const code = fs.readFileSync(file, 'utf8');
  try {
    const res = Babel.transform(code, {
      presets: ['react'],
      minified: true,
      comments: false
    });
    bundle += `// [file: ${file}]\n${res.code}\n`;
  } catch (err) {
    console.error(`Compilation error in ${file}:`, err.message);
    process.exit(1);
  }
}
bundle += '\n})();\n';

fs.mkdirSync('public/js', { recursive: true });
fs.writeFileSync('public/js/app.min.js', bundle);
console.log(`Successfully compiled app.min.js (${(bundle.length / 1024).toFixed(1)} KB)`);

// Sync to .cloudflare-assets
console.log('Syncing deployment release directory (.cloudflare-assets)...');
buildAssets();

if (fs.existsSync('_headers')) {
  fs.copyFileSync('_headers', '.cloudflare-assets/_headers');
}
if (fs.existsSync('public/robots.txt')) {
  fs.copyFileSync('public/robots.txt', '.cloudflare-assets/robots.txt');
}
if (fs.existsSync('public/sitemap.xml')) {
  fs.copyFileSync('public/sitemap.xml', '.cloudflare-assets/sitemap.xml');
}

console.log('Build and deployment synchronization complete!');
