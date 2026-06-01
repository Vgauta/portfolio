import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  ['WordPress Websites', 'Editorial architecture for a premium consultancy', '42% faster qualified enquiries', 'linear-gradient(135deg, #f7f1e8, #151515 58%, #8b5cf6)'],
  ['WooCommerce Stores', 'Conversion-led commerce for a lifestyle brand', 'Checkout path reduced to 3 steps', 'linear-gradient(135deg, #111, #26201b 45%, #d9b98f)'],
  ['Landing Pages', 'Campaign pages built for clarity and action', 'Designed for high-intent traffic', 'linear-gradient(135deg, #181818, #333 45%, #a78bfa)'],
  ['Custom Development', 'Bespoke components, clean integrations', 'Maintainable systems for scaling teams', 'linear-gradient(135deg, #0f0f0f, #1b2430 55%, #f5f5f5)'],
];

function projectCard([type, title, metric, palette], index) {
  return `<article class="project-card">
    <div><span class="project-index">0${index + 1}</span><p>${type}</p><h3>${title}</h3><em>${metric}</em></div>
    <div class="device-wrap">
      <div class="laptop"><div class="laptop-top"><span></span><span></span><span></span></div><div class="site-shot" style="background:${palette}"><div class="shot-nav"></div><div class="shot-hero"></div><div class="shot-grid"><i></i><i></i><i></i></div></div></div>
      <div class="phone"><div class="phone-shot" style="background:${palette}"><b></b><i></i><i></i><i></i></div></div>
    </div>
  </article>`;
}

document.querySelector('.project-track').innerHTML = PROJECTS.map(projectCard).join('');

function initScrollProgress() {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--scroll', `${Math.min(1, window.scrollY / max)}`);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initThreeOrigin() {
  const el = document.querySelector('.three-origin');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100);
  camera.position.z = 7;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(el.clientWidth, el.clientHeight);
  el.appendChild(renderer.domElement);

  const count = window.innerWidth < 720 ? 520 : 980;
  const positions = new Float32Array(count * 3);
  const targets = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 12;
    positions[i3 + 1] = (Math.random() - 0.5) * 7;
    positions[i3 + 2] = (Math.random() - 0.5) * 8;
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 1.9 + Math.sin(i * 0.17) * 0.26;
    targets[i3] = r * Math.sin(phi) * Math.cos(theta);
    targets[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    targets[i3 + 2] = r * Math.cos(phi);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xa78bfa, size: 0.022, transparent: true, opacity: 0.7, depthWrite: false });
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  const halo = new THREE.Mesh(new THREE.IcosahedronGeometry(1.95, 3), new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.045 }));
  scene.add(halo);
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 0.25;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 0.18;
  }, { passive: true });
  window.addEventListener('resize', () => {
    camera.aspect = el.clientWidth / el.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(el.clientWidth, el.clientHeight);
  });
  const animate = (time) => {
    const attr = geometry.attributes.position;
    const arr = attr.array;
    const progress = prefersReduced ? 1 : Math.min(1, time / 3200);
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      arr[i3] += (targets[i3] - arr[i3]) * 0.012 * progress;
      arr[i3 + 1] += (targets[i3 + 1] - arr[i3 + 1]) * 0.012 * progress;
      arr[i3 + 2] += (targets[i3 + 2] - arr[i3 + 2]) * 0.012 * progress;
    }
    attr.needsUpdate = true;
    particles.rotation.y = time * 0.00008 + mouseX;
    particles.rotation.x = time * 0.00004 + mouseY;
    halo.rotation.y = time * 0.00012;
    halo.rotation.x = time * 0.00006;
    camera.position.z = 7 - Math.min(window.scrollY / 1200, 1.2);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

function initAnimations() {
  gsap.from('.hero-copy > *', { y: 34, opacity: 0, duration: 1.1, stagger: 0.16, delay: 0.45, ease: 'power3.out' });
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 42, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%' } });
  });
  gsap.utils.toArray('.identity-word').forEach((el) => {
    gsap.fromTo(el, { opacity: 0.08, yPercent: 35, scale: 0.94 }, { opacity: 1, yPercent: 0, scale: 1, scrollTrigger: { trigger: el, start: 'top 88%', end: 'bottom 48%', scrub: 0.9 } });
  });
  gsap.to('.project-track', { x: () => -(document.querySelector('.project-track').scrollWidth - window.innerWidth + 48), ease: 'none', scrollTrigger: { trigger: '.projects', start: 'top top', end: '+=2300', scrub: 1, pin: true, invalidateOnRefresh: true } });
  gsap.utils.toArray('.count').forEach((el) => {
    gsap.fromTo(el, { textContent: 0 }, { textContent: Number(el.dataset.value), duration: 1.8, ease: 'power2.out', snap: { textContent: 1 }, scrollTrigger: { trigger: el, start: 'top 82%' } });
  });
  gsap.to('.orbital', { rotate: 360, duration: 36, repeat: -1, ease: 'none' });
  gsap.to('.float-card, .skill-node, .process-node', { y: -12, duration: 2.8, stagger: 0.18, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  gsap.utils.toArray('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (event) => {
      const rect = btn.getBoundingClientRect();
      gsap.to(btn, { x: (event.clientX - rect.left - rect.width / 2) * 0.18, y: (event.clientY - rect.top - rect.height / 2) * 0.22, duration: 0.45, ease: 'power3.out' });
    });
    btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1,0.35)' }));
  });
}

initScrollProgress();
initThreeOrigin();
initAnimations();
