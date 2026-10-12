'use strict';
const img = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=75`;

const PROPERTIES = [
  {t:'Hillside Villa with Valley View', loc:'Banjosa Road, Rawalakot', type:'House', price:28500000, tag:'Featured', beds:5, baths:4, area:'10 Marla', img:img('1613490493576-7fde63acd811')},
  {t:'Corner Residential Plot', loc:'Hajira Road, Rawalakot', type:'Plot', price:4200000, tag:'For Sale', beds:0, baths:0, area:'8 Marla', img:img('1500382017468-9049fed747ef')},
  {t:'Three-Storey Commercial Plaza', loc:'Main Bazaar, Rawalakot', type:'Commercial', price:62000000, tag:'Commercial', beds:0, baths:6, area:'5 Marla', img:img('1486406146926-c627a92ad1ab')},
  {t:'Modern Family Home', loc:'Sector F-11, Islamabad', type:'House', price:78000000, tag:'Featured', beds:6, baths:5, area:'1 Kanal', img:img('1600596542815-ffad4c1539a9')},
  {t:'Mountain Farmhouse with Orchard', loc:'Tarkhain, Poonch', type:'Farmhouse', price:15500000, tag:'New', beds:4, baths:3, area:'4 Kanal', img:img('1480074568708-e7b720bb3f09')},
  {t:'Budget-Friendly Starter Home', loc:'Dhamni, Rawalakot', type:'House', price:6800000, tag:'Hot Deal', beds:3, baths:2, area:'5 Marla', img:img('1568605114967-8130f3a36994')},
  {t:'Plot near Bahria Town', loc:'Rawalpindi', type:'Plot', price:9500000, tag:'For Sale', beds:0, baths:0, area:'7 Marla', img:img('1560518883-ce09059eeffa')},
  {t:'Showroom on Main Road', loc:'Gulberg, Lahore', type:'Commercial', price:96000000, tag:'Commercial', beds:0, baths:2, area:'8 Marla', img:img('1497366216548-37526070297c')},
  {t:'Scenic Guest House Land', loc:'Banjosa Lake Area, Rawalakot', type:'Plot', price:12000000, tag:'Featured', beds:0, baths:0, area:'1 Kanal', img:img('1506905925346-21bda4d32df4')}
];

const PROJECTS = [
  {t:'Al-Noor Residence', place:'Rawalakot', note:'6-bedroom family home', img:img('1600585154340-be6161a56a0c')},
  {t:'Kashmir View Plaza', place:'Rawalakot Main Bazaar', note:'Commercial building, 3 floors', img:img('1541888946425-d81bb19240f5')},
  {t:'Pine Ridge Guest House', place:'Banjosa', note:'12-room tourist guest house', img:img('1512917774080-9991f1c4c750')},
  {t:'Green Valley Homes', place:'Islamabad', note:'Four modern villas', img:img('1605276374104-dee2a0ed3cd6')}
];

const REVIEWS = [
  {q:'I live in Saudi Arabia and bought my plot in Rawalakot without travelling. They sent videos, checked every document and finished the transfer smoothly.', n:'Tariq Mehmood', r:'Overseas client'},
  {q:'They built our house on a steep slope and the work is solid. Costs were explained upfront and there were no surprises.', n:'Shabana Iqbal', r:'Home owner, Rawalakot'},
  {q:'I sold my family property at a fair price within three weeks. Honest advice from the first call.', n:'Raja Asif Khan', r:'Seller, Poonch'}
];

const fmt = n => n >= 10000000 ? (n/10000000).toFixed(2).replace(/\.?0+$/,'') + ' Crore' : (n/100000).toFixed(0) + ' Lac';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* Properties */
const grid = $('#propGrid'), empty = $('#propEmpty');
let state = {f:'all', loc:'', type:'', budget:0};

function renderProps(){
  const list = PROPERTIES.filter(p =>
    (state.f === 'all' || p.type === state.f) &&
    (!state.type || p.type === state.type) &&
    (!state.loc || p.loc.includes(state.loc)) &&
    (!state.budget || p.price <= state.budget));
  grid.innerHTML = list.map(p => `
    <article class="prop">
      <div class="ph"><img src="${p.img}" alt="${p.t}" loading="lazy" onerror="this.remove()"><span class="tag">${p.tag}</span></div>
      <div class="body">
        <div class="price">PKR ${fmt(p.price)}</div>
        <h3>${p.t}</h3>
        <div class="loc">${p.loc}</div>
        <div class="meta"><span>${p.area}</span>${p.beds ? `<span>${p.beds} beds</span>` : ''}${p.baths ? `<span>${p.baths} baths</span>` : ''}<span>${p.type}</span></div>
        <a href="#contact" class="btn btn-navy" data-inq="${p.t}">Enquire now</a>
      </div>
    </article>`).join('');
  empty.hidden = list.length > 0;
}

const cities = [...new Set(PROPERTIES.map(p => p.loc.split(', ').pop()))].sort();
cities.forEach(c => $('#sLocation').insertAdjacentHTML('beforeend', `<option>${c}</option>`));

$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if(!b) return;
  $$('.chip').forEach(c => c.classList.toggle('active', c === b));
  state.f = b.dataset.f; state.type = ''; $('#sType').value = '';
  renderProps();
});
$('#searchForm').addEventListener('submit', e => {
  e.preventDefault();
  state.loc = $('#sLocation').value; state.type = $('#sType').value;
  state.budget = +$('#sBudget').value || 0; state.f = 'all';
  $$('.chip').forEach(c => c.classList.toggle('active', c.dataset.f === 'all'));
  renderProps();
  $('#properties').scrollIntoView({behavior:'smooth'});
});
grid.addEventListener('click', e => {
  const a = e.target.closest('[data-inq]'); if(!a) return;
  const m = document.querySelector('#contactForm [name=message]');
  m.value = `I would like more details about: ${a.dataset.inq}.`;
});
renderProps();

/* Projects */
$('#projGrid').innerHTML = PROJECTS.map(p => `
  <article class="proj"><img src="${p.img}" alt="${p.t}" loading="lazy" onerror="this.remove()">
  <div class="cap"><h3>${p.t}</h3><span>${p.place}: ${p.note}</span></div></article>`).join('');

/* Testimonials */
const slides = $('#slides'), dots = $('#dots');
slides.innerHTML = REVIEWS.map(r => `<div class="slide"><p>&ldquo;${r.q}&rdquo;</p><b>${r.n}</b><span>${r.r}</span></div>`).join('');
dots.innerHTML = REVIEWS.map((_, i) => `<button aria-label="Show review ${i+1}" data-i="${i}"></button>`).join('');
let cur = 0, timer;
function go(i){
  cur = (i + REVIEWS.length) % REVIEWS.length;
  slides.style.transform = `translateX(-${cur * 100}%)`;
  $$('#dots button').forEach((d, k) => d.classList.toggle('on', k === cur));
}
function auto(){ clearInterval(timer); timer = setInterval(() => go(cur + 1), 6000); }
dots.addEventListener('click', e => { const b = e.target.closest('button'); if(b){ go(+b.dataset.i); auto(); } });
go(0); auto();

/* Mobile menu */
const burger = $('#burger'), nav = $('#nav');
function toggleMenu(open){
  nav.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', () => toggleMenu(!nav.classList.contains('open')));
nav.addEventListener('click', e => { if(e.target.closest('a')) toggleMenu(false); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') toggleMenu(false); });
window.addEventListener('resize', () => { if(innerWidth > 1020) toggleMenu(false); });

/* Scroll: sticky header, back to top, active link */
const header = $('#header'), toTop = $('#toTop');
const links = $$('.nav a:not(.btn)');
const secs = links.map(a => $(a.getAttribute('href')));
function onScroll(){
  const y = scrollY;
  header.classList.toggle('scrolled', y > 40);
  toTop.classList.toggle('show', y > 600);
  let idx = 0;
  secs.forEach((s, i) => { if(s && s.offsetTop - 120 <= y) idx = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === idx));
}
addEventListener('scroll', onScroll, {passive:true}); onScroll();
toTop.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));

/* Stat counters, run once when visible */
const counters = $$('[data-count]');
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if(!en.isIntersecting) return;
    const el = en.target, end = +el.dataset.count, t0 = performance.now();
    const step = t => {
      const p = Math.min((t - t0) / 1400, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    io.unobserve(el);
  });
}, {threshold:.5});
counters.forEach(c => io.observe(c));

/* Forms: validation and confirmation (replace with a backend or Formspree endpoint in production) */
function handleForm(id, okText){
  const f = $(id), msg = f.querySelector('.form-msg');
  f.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    f.querySelectorAll('[required]').forEach(el => {
      let valid = el.value.trim() !== '';
      if(valid && el.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
      if(valid && el.type === 'tel') valid = el.value.replace(/\D/g, '').length >= 10;
      el.classList.toggle('invalid', !valid);
      if(!valid) ok = false;
    });
    msg.className = 'form-msg ' + (ok ? 'ok' : 'err');
    msg.textContent = ok ? okText : 'Please correct the highlighted fields. Phone numbers need at least 10 digits.';
    if(ok) f.reset();
  });
}
handleForm('#sellForm', 'Thank you. Our team will call you within 24 hours with your free valuation.');
handleForm('#contactForm', 'Message sent. We will get back to you today.');

$('#year').textContent = new Date().getFullYear();
