import './styles.css';

const activeTweens = [];
const getTargets = (target) => typeof target === 'string' ? [...document.querySelectorAll(target)] : (target?.length ? [...target] : [target].filter(Boolean));
const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const applyVars = (el, vars, p = 1, from = {}) => {
  const transforms = [];
  const val = (key, current = 0) => (from[key] ?? current) + ((vars[key] ?? current) - (from[key] ?? current)) * p;
  if ('opacity' in vars || 'autoAlpha' in vars || 'opacity' in from) el.style.opacity = val('opacity', from.autoAlpha ?? 1);
  if ('autoAlpha' in vars) el.style.opacity = val('autoAlpha', from.autoAlpha ?? 1);
  if ('xPercent' in vars) transforms.push(`translateX(${val('xPercent')}%)`);
  if ('x' in vars || 'x' in from) transforms.push(`translateX(${val('x')}px)`);
  if ('y' in vars || 'y' in from) transforms.push(`translateY(${val('y')}px)`);
  if ('z' in vars || 'z' in from) transforms.push(`translateZ(${val('z')}px)`);
  if ('scale' in vars || 'scale' in from) transforms.push(`scale(${val('scale', 1)})`);
  if ('rotateX' in vars || 'rotateX' in from) transforms.push(`rotateX(${val('rotateX')}deg)`);
  if ('rotateY' in vars || 'rotateY' in from) transforms.push(`rotateY(${val('rotateY')}deg)`);
  if (transforms.length) el.style.transform = transforms.join(' ');
};
const progressFor = (trigger) => {
  const el = typeof trigger === 'string' ? document.querySelector(trigger) : trigger;
  if (!el) return 1;
  const r = el.getBoundingClientRect();
  const total = r.height + innerHeight;
  return clamp((innerHeight - r.top) / total);
};
const renderTweens = () => {
  activeTweens.forEach(t => {
    const p = t.scrollTrigger ? easeOut(progressFor(t.scrollTrigger.trigger)) : 1;
    if (t.object) {
      Object.keys(t.vars).forEach(k => { if (typeof t.vars[k] === 'number') t.object[k] = (t.from[k] ?? t.object[k] ?? 0) + (t.vars[k] - (t.from[k] ?? 0)) * p; });
      t.vars.onUpdate?.();
    } else {
      t.targets.forEach(el => applyVars(el, t.vars, p, t.from));
    }
  });
  document.querySelector('.progress span')?.style.setProperty('transform', `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight || 1)})`);
};
const gsap = {
  registerPlugin() {},
  ticker: { add(fn) { const loop = (t) => { fn(t / 1000); requestAnimationFrame(loop); }; requestAnimationFrame(loop); }, lagSmoothing() {} },
  set(target, vars) { getTargets(target).forEach(el => applyVars(el, vars, 1, {})); },
  to(target, vars) {
    if (typeof target === 'object' && !target.nodeType && !target.length) {
      const tween = { object: target, vars, from: { ...target }, scrollTrigger: vars.scrollTrigger };
      activeTweens.push(tween); renderTweens(); return tween;
    }
    const targets = getTargets(target);
    if (!vars.scrollTrigger) { targets.forEach(el => applyVars(el, vars, 1, {})); return { targets, vars }; }
    const tween = { targets, vars, from: {}, scrollTrigger: vars.scrollTrigger };
    activeTweens.push(tween); renderTweens(); return tween;
  },
  from(target, vars) {
    const targets = getTargets(target); targets.forEach(el => applyVars(el, vars, 0, vars));
    if (!vars.scrollTrigger) { requestAnimationFrame(() => targets.forEach(el => applyVars(el, {}, 1, vars))); return { targets, vars }; }
    const tween = { targets, vars: {}, from: vars, scrollTrigger: vars.scrollTrigger };
    activeTweens.push(tween); renderTweens(); return tween;
  }
};
const ScrollTrigger = { create(config) { activeTweens.push({ targets: [], vars: {}, from: {}, scrollTrigger: config, callback: config.onUpdate }); return config; }, update() { renderTweens(); } };
class Lenis { constructor() {} on() {} raf() {} }
addEventListener('scroll', renderTweens, { passive: true });
addEventListener('resize', renderTweens);

const partners = {
  gautam: {
    name: 'Gautam Patel',
    role: 'WordPress Developer & Web Solutions Specialist',
    focus: 'Website Development Expert',
    location: 'Ahmedabad, India',
    email: 'gautam.vaghasiya06@gmail.com',
    phone: '7777914916',
    whatsapp: '7016523249',
    skills: ['WordPress', 'Elementor', 'WooCommerce', 'PHP', 'JavaScript', 'HTML', 'CSS'],
    bio: 'Building reliable, refined, high-performance websites that turn business ideas into polished digital systems.',
    achievements: ['Conversion-focused builds', 'Responsive WordPress systems', 'Commerce-ready experiences']
  },
  diya: {
    name: 'Diya Vaghasiya',
    role: 'Social Media Manager & Video Editor',
    focus: 'Social Media Growth Expert',
    location: 'Rajkot, India',
    email: 'vaghasiyadiya466@gmail.com',
    phone: '9574227282',
    instagram: 'https://www.instagram.com/diyaa_vaghasiya',
    linkedin: 'https://www.linkedin.com/in/diya257',
    skills: ['Social Media Management', 'Social Media Marketing', 'Video Editing', 'Reel Editing', 'Content Strategy'],
    bio: 'Transforming ideas into scroll-stopping content with cinematic edits, aesthetic visuals, and smart marketing strategies that help brands grow, connect, and stand out.',
    achievements: ['Cinematic brand videos', 'Scroll-stopping reels', 'Strategy-led content systems']
  }
};

const developmentProjects = ['WordPress Websites', 'WooCommerce Stores', 'Landing Pages', 'Custom Development'];
const marketingProjects = ['Social Media Campaigns', 'Instagram Growth Projects', 'Content Strategy Projects', 'Reel Editing Projects'];
const metrics = [
  ['Projects Completed', 48], ['Websites Built', 32], ['WooCommerce Stores', 14],
  ['Brands Managed', 24], ['Campaigns Executed', 68], ['Content Created', 420]
];
const testimonials = [
  ['Development', 'The website felt premium, loaded fast, and gave our brand the confidence it needed online.'],
  ['Marketing', 'Our content finally had a system, a style, and the consistency to create real engagement.'],
  ['Partnership', 'Having web and social handled together made the entire growth process clearer and more powerful.']
];

function App() {
  document.querySelector('#app').innerHTML = `
    <canvas id="webgl" aria-hidden="true"></canvas>
    <div class="noise" aria-hidden="true"></div>
    <div class="cursor" aria-hidden="true"><span></span></div>
    <div class="loader" aria-live="polite"><div><span>One Team</span><strong>Complete Digital Growth</strong></div></div>
    <nav class="nav">
      <a class="brand magnetic" href="#origin" aria-label="Go to top"><span>GP</span><span>DV</span></a>
      <div class="nav__links">
        <a href="#work">Work</a><a href="#partners">Partners</a><a href="#contact">Contact</a>
      </div>
      <a class="nav__cta magnetic" href="mailto:gautam.vaghasiya06@gmail.com,vaghasiyadiya466@gmail.com">Start a Project</a>
    </nav>
    <div class="progress"><span></span></div>
    <main class="story">
      ${originScene()}
      ${identityScene()}
      ${expertiseScene()}
      ${showcaseScene()}
      ${partnerScene('gautam')}
      ${partnerScene('diya')}
      ${collaborationScene()}
      ${ecosystemScene()}
      ${resultsScene()}
      ${testimonialsScene()}
      ${contactScene()}
      ${finalScene()}
    </main>`;
}

function originScene() {
  return `<section id="origin" class="scene scene--origin" data-scene="origin">
    <div class="pin intro-copy depth-layer">
      <p class="eyebrow">Digital Partnership Portfolio</p>
      <h1><span>Gautam Patel</span><em>&</em><span>Diya Vaghasiya</span></h1>
      <p class="subline">Web Development · Social Media Growth · Creative Digital Solutions</p>
      <div class="statement">One Team. Complete Digital Growth.</div>
    </div>
  </section>`;
}

function identityScene() {
  return `<section class="scene scene--identity" data-scene="identity">
    <div class="pin identity-words">
      ${['Developer', 'Creator', 'Strategist', 'Builder'].map(w => `<h2>${w}</h2>`).join('')}
    </div>
  </section>`;
}

function expertiseScene() {
  return `<section class="scene scene--expertise" data-scene="expertise">
    <div class="pin universe-wrap">
      <div class="scene-kicker">Expertise Universe</div>
      <h2>Two specialist ecosystems, connected into one growth system.</h2>
      <div class="universes">
        <div class="orbit orbit--left"><h3>Website Development</h3>${partners.gautam.skills.map(s => `<span>${s}</span>`).join('')}</div>
        <div class="bridge"><span></span><strong>Complete Digital Presence</strong><span></span></div>
        <div class="orbit orbit--right"><h3>Social Media Growth</h3>${partners.diya.skills.map(s => `<span>${s}</span>`).join('')}</div>
      </div>
    </div>
  </section>`;
}

function showcaseScene() {
  const cards = [...developmentProjects.map((p, i) => projectCard(p, 'Development', i)), ...marketingProjects.map((p, i) => projectCard(p, 'Marketing', i + 4))].join('');
  return `<section id="work" class="scene scene--showcase" data-scene="showcase"><div class="pin showcase-pin">
    <div class="showcase-head"><p class="eyebrow">Project Showcase</p><h2>Surrounded by refined websites, growth campaigns, and cinematic content systems.</h2></div>
    <div class="project-rail">${cards}</div>
  </div></section>`;
}

function projectCard(title, type, index) {
  return `<article class="project-screen" style="--i:${index}"><div class="screen-top"><span></span><span></span><span></span></div><div class="mock-ui"><p>${type}</p><h3>${title}</h3><div></div><div></div><div></div></div></article>`;
}

function partnerScene(key) {
  const p = partners[key];
  const isDiya = key === 'diya';
  const links = key === 'gautam'
    ? `<a href="mailto:${p.email}">${p.email}</a><a href="tel:${p.phone}">${p.phone}</a><a href="https://wa.me/91${p.whatsapp}">WhatsApp ${p.whatsapp}</a>`
    : `<a href="${p.instagram}" target="_blank" rel="noreferrer">Instagram</a><a href="${p.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:${p.email}">${p.email}</a><a href="tel:${p.phone}">${p.phone}</a>`;
  return `<section id="${key === 'gautam' ? 'partners' : ''}" class="scene scene--partner scene--${key}" data-scene="${key}"><div class="pin partner-card ${isDiya ? 'partner-card--reverse' : ''}">
    <div class="portrait portrait--${key}" aria-label="${p.name} portrait"><div class="portrait__initials">${isDiya ? 'DV' : 'GP'}</div><div class="portrait__rings"></div></div>
    <div class="partner-copy">
      <p class="eyebrow">${p.focus}</p>
      <h2>${isDiya ? 'Helping Brands Grow Through Content, Creativity & Strategy.' : 'Turning Ideas Into High Performance Digital Experiences.'}</h2>
      <p>${p.bio}</p>
      <div class="chips">${p.skills.map(s => `<span>${s}</span>`).join('')}</div>
      <div class="achievement-grid">${p.achievements.map(a => `<strong>${a}</strong>`).join('')}</div>
      <address>${p.name} · ${p.location}<br>${links}</address>
    </div>
  </div></section>`;
}

function collaborationScene() {
  return `<section class="scene scene--engine" data-scene="engine"><div class="pin engine">
    <p class="eyebrow">Collaboration Engine</p><h2>Two Specialists.<br>One Digital Growth Team.</h2>
    <div class="engine-map"><div><span>Website Development</span><strong>Gautam Patel</strong></div><svg viewBox="0 0 600 160" preserveAspectRatio="none"><path d="M20 80 C180 5 420 155 580 80"/><path d="M20 80 C180 155 420 5 580 80"/></svg><div><span>Social Media Growth</span><strong>Diya Vaghasiya</strong></div></div>
  </div></section>`;
}

function ecosystemScene() {
  return `<section class="scene scene--ecosystem" data-scene="ecosystem"><div class="pin ecosystem">
    <p class="eyebrow">Complete Digital Ecosystem</p><h2>Website Development + Content Creation + Social Media Growth</h2>
    <div class="growth-path">${['Website','Content','Audience','Engagement','Leads','Growth'].map((n, i) => `<div class="node" style="--i:${i}"><span>${String(i+1).padStart(2,'0')}</span><strong>${n}</strong></div>`).join('')}</div>
    <div class="ecosystem-result">Complete Digital Presence</div>
  </div></section>`;
}

function resultsScene() {
  return `<section class="scene scene--results" data-scene="results"><div class="pin results">
    <p class="eyebrow">Results</p><h2>Premium execution, measured across development and growth.</h2>
    <div class="metric-grid">${metrics.map(([l, v]) => `<div class="metric"><strong data-count="${v}">0</strong><span>${l}</span></div>`).join('')}</div>
  </div></section>`;
}

function testimonialsScene() {
  return `<section class="scene scene--testimonials" data-scene="testimonials"><div class="pin testimonials">
    <p class="eyebrow">Client Testimonials</p><h2>Confidence from brands that need more than isolated execution.</h2>
    <div class="testimonial-stack">${testimonials.map(([t, q]) => `<blockquote><span>${t}</span><p>“${q}”</p></blockquote>`).join('')}</div>
  </div></section>`;
}

function contactScene() {
  return `<section id="contact" class="scene scene--contact" data-scene="contact"><div class="pin contact">
    <p class="eyebrow">Contact Experience</p><h2>Start with one conversation. Build one complete digital presence.</h2>
    <div class="contact-grid">
      <article><h3>Gautam Patel</h3><p>WordPress Developer</p><a href="mailto:${partners.gautam.email}">${partners.gautam.email}</a><a href="tel:${partners.gautam.phone}">${partners.gautam.phone}</a><a href="https://wa.me/91${partners.gautam.whatsapp}">WhatsApp ${partners.gautam.whatsapp}</a></article>
      <article><h3>Diya Vaghasiya</h3><p>Social Media Manager & Video Editor</p><a href="mailto:${partners.diya.email}">${partners.diya.email}</a><a href="tel:${partners.diya.phone}">${partners.diya.phone}</a><a href="${partners.diya.instagram}" target="_blank" rel="noreferrer">Instagram</a><a href="${partners.diya.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a></article>
    </div>
  </div></section>`;
}

function finalScene() {
  return `<section class="scene scene--final" data-scene="final"><div class="pin final">
    <p class="eyebrow">Complete Circle</p><h2>One Team.<br>Two Specialists.<br>Unlimited Possibilities.</h2>
    <p>Web Development. Content Creation. Social Media Growth.<br>Everything Your Brand Needs To Grow Online.</p>
    <div class="cta-row"><a class="button magnetic" href="#work">View Work</a><a class="button button--primary magnetic" href="mailto:gautam.vaghasiya06@gmail.com,vaghasiyadiya466@gmail.com">Start A Project</a><a class="button magnetic" href="#contact">Contact Us</a></div>
  </div></section>`;
}

App();
initExperience();

function initExperience() {
  const lenis = new Lenis({ duration: 1.35, smoothWheel: true, wheelMultiplier: 0.82 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  initThree();
  initCursor();
  initMotion();
}

function initThree() {
  const canvas = document.querySelector('#webgl');
  const ctx = canvas.getContext('2d', { alpha: true });
  const particles = [];
  const mouse = { x: 0, y: 0 };
  let w = 0, h = 0, dpr = 1;

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 1.7);
    w = canvas.width = Math.floor(innerWidth * dpr);
    h = canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    const count = innerWidth < 700 ? 900 : 2200;
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), .45) * Math.min(w, h) * .46;
      particles.push({
        ox: Math.cos(a) * r, oy: Math.sin(a) * r, z: Math.random() * 1.8 + .2,
        a, s: Math.random() * 1.6 + .45, drift: Math.random() * .002 + .0005
      });
    }
  }

  addEventListener('pointermove', (e) => {
    mouse.x = (e.clientX / innerWidth - .5) * 2;
    mouse.y = (e.clientY / innerHeight - .5) * 2;
  }, { passive: true });

  function draw(t) {
    const pageProgress = scrollY / (document.documentElement.scrollHeight - innerHeight || 1);
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2 + mouse.x * 28 * dpr + Math.sin(pageProgress * Math.PI * 4) * 90 * dpr, h / 2 - mouse.y * 22 * dpr);
    ctx.rotate(pageProgress * Math.PI * 1.35);
    const sphere = (1 - Math.abs(pageProgress - .5) * .55) * Math.min(w, h) * .15;
    particles.forEach((p, i) => {
      const angle = p.a + t * p.drift + pageProgress * Math.PI * (p.z * 1.8);
      const morph = Math.sin(pageProgress * Math.PI * 2 + p.z) * sphere;
      const x = p.ox * (.86 + pageProgress * .18) + Math.cos(angle) * morph * .22;
      const y = p.oy * (.86 + pageProgress * .18) + Math.sin(angle) * morph * .22;
      const alpha = .18 + .56 * (1 - Math.hypot(x, y) / Math.max(w, h));
      ctx.fillStyle = i % 5 === 0 ? `rgba(196,181,253,${alpha})` : `rgba(245,245,245,${alpha * .72})`;
      ctx.beginPath(); ctx.arc(x, y, p.s * dpr, 0, Math.PI * 2); ctx.fill();
    });
    ctx.strokeStyle = `rgba(139,92,246,${.16 + Math.sin(t * .001) * .05})`;
    ctx.lineWidth = dpr;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.ellipse(0, 0, sphere * (1.8 + i * .28), sphere * (.62 + i * .13), pageProgress * Math.PI + i, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
    requestAnimationFrame(draw);
  }
  addEventListener('resize', resize);
  resize(); draw(0);
}

function initCursor() {
  const cursor = document.querySelector('.cursor');
  const dot = cursor.querySelector('span');
  window.addEventListener('pointermove', e => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power3.out' });
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' });
  });
  document.querySelectorAll('a, button, .magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
    el.addEventListener('pointermove', e => {
      const rect = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - rect.left - rect.width / 2) * 0.12, y: (e.clientY - rect.top - rect.height / 2) * 0.12, duration: 0.35 });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.35)' }));
  });
}

function initMotion() {
  gsap.to('.loader', { autoAlpha: 0, duration: 0.8, delay: 0.8, ease: 'power2.inOut' });
  gsap.to('.progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.1 } });

  document.querySelectorAll('.scene').forEach(scene => {
    const pin = scene.querySelector('.pin');
    ScrollTrigger.create({ trigger: scene, start: 'top top', end: 'bottom bottom', pin, pinSpacing: false });
  });

  gsap.from('.intro-copy > *', { y: 70, opacity: 0, stagger: 0.18, duration: 1.4, ease: 'power4.out' });
  gsap.to('.intro-copy', { scale: 0.84, opacity: 0.35, scrollTrigger: { trigger: '.scene--origin', start: '35% top', end: 'bottom top', scrub: 1 } });

  gsap.set('.identity-words h2', { opacity: 0, z: -500, rotateX: 50 });
  document.querySelectorAll('.identity-words h2').forEach((word, i) => {
    gsap.to(word, { opacity: 1, z: 0, rotateX: 0, duration: 0.45, scrollTrigger: { trigger: '.scene--identity', start: `${i * 22}% center`, end: `${i * 22 + 18}% center`, scrub: 1 } });
    gsap.to(word, { opacity: 0, z: 420, rotateX: -30, scrollTrigger: { trigger: '.scene--identity', start: `${i * 22 + 16}% center`, end: `${i * 22 + 32}% center`, scrub: 1 } });
  });

  gsap.from('.orbit--left span', { x: -120, opacity: 0, stagger: 0.05, scrollTrigger: { trigger: '.scene--expertise', start: 'top center', end: '45% center', scrub: 1 } });
  gsap.from('.orbit--right span', { x: 120, opacity: 0, stagger: 0.05, scrollTrigger: { trigger: '.scene--expertise', start: 'top center', end: '45% center', scrub: 1 } });
  gsap.from('.bridge', { scaleX: 0, opacity: 0, scrollTrigger: { trigger: '.scene--expertise', start: '42% center', end: '75% center', scrub: 1 } });

  gsap.to('.project-rail', { xPercent: -48, ease: 'none', scrollTrigger: { trigger: '.scene--showcase', start: 'top top', end: 'bottom bottom', scrub: 1 } });
  gsap.from('.project-screen', { opacity: 0, rotateY: -24, z: -220, stagger: 0.08, scrollTrigger: { trigger: '.scene--showcase', start: 'top center', end: '45% center', scrub: 1 } });

  document.querySelectorAll('.partner-card').forEach(card => {
    gsap.from(card.querySelector('.portrait'), { opacity: 0, scale: 0.72, rotateY: 24, scrollTrigger: { trigger: card.closest('.scene'), start: 'top center', end: '45% center', scrub: 1 } });
    gsap.from(card.querySelectorAll('.partner-copy > *'), { opacity: 0, y: 44, stagger: 0.04, scrollTrigger: { trigger: card.closest('.scene'), start: '18% center', end: '58% center', scrub: 1 } });
  });

  gsap.from('.engine-map svg path', { strokeDashoffset: 900, strokeDasharray: 900, scrollTrigger: { trigger: '.scene--engine', start: 'top center', end: '70% center', scrub: 1 } });
  gsap.from('.node', { opacity: 0, y: 80, rotateX: 40, stagger: 0.05, scrollTrigger: { trigger: '.scene--ecosystem', start: 'top center', end: '65% center', scrub: 1 } });

  document.querySelectorAll('[data-count]').forEach(el => {
    const obj = { value: 0 };
    gsap.to(obj, { value: Number(el.dataset.count), scrollTrigger: { trigger: '.scene--results', start: 'top center', once: true }, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(obj.value) + '+'; } });
  });
  gsap.from('.metric', { opacity: 0, y: 50, stagger: 0.08, scrollTrigger: { trigger: '.scene--results', start: 'top center', end: '55% center', scrub: 1 } });
  gsap.from('blockquote', { opacity: 0, y: 70, z: -240, rotateX: 20, stagger: 0.09, scrollTrigger: { trigger: '.scene--testimonials', start: 'top center', end: '60% center', scrub: 1 } });
  gsap.from('.contact-grid article', { opacity: 0, y: 80, rotateY: 16, stagger: 0.12, scrollTrigger: { trigger: '.scene--contact', start: 'top center', end: '58% center', scrub: 1 } });
  gsap.from('.final > *', { opacity: 0, y: 80, stagger: 0.1, scrollTrigger: { trigger: '.scene--final', start: 'top center', end: '50% center', scrub: 1 } });
}
