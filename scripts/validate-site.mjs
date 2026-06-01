import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('src/styles.css', 'utf8');
const js = readFileSync('src/main.js', 'utf8');

const requiredCopy = [
  'Gautam Patel', 'WordPress Developer', 'Elementor Expert', 'WooCommerce Specialist',
  'Developer', 'Creator', 'Builder', 'Diya Vaghasiya', 'Beyond Websites.',
  'Complete Digital Presence', "Let's Build Something Extraordinary."
];
const requiredSkills = ['WordPress', 'Elementor', 'WooCommerce', 'PHP', 'JavaScript', 'HTML', 'CSS'];
const requiredTech = ['gsap', 'ScrollTrigger', 'THREE.WebGLRenderer'];

const missing = [...requiredCopy, ...requiredSkills].filter((item) => !html.includes(item));
const missingTech = requiredTech.filter((item) => !js.includes(item) && !html.includes(item));
const missingCss = ['#0a0a0a', '#141414', '#181818', '#f5f5f5', '#b3b3b3', '#8b5cf6'].filter((token) => !css.toLowerCase().includes(token));

if (missing.length || missingTech.length || missingCss.length) {
  console.error('Validation failed');
  console.error({ missing, missingTech, missingCss });
  process.exit(1);
}

console.log('Site validation passed: required scenes, skills, technologies, and color tokens are present.');
