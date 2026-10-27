/* Lucas Lozano · site vitrine : interactions et animations */
(function () {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------------- Traductions ---------------- */
  const EN = {
    'nav.story': 'Journey', 'nav.method': 'Method', 'nav.calc': 'Calculator', 'nav.projects': 'Projects', 'nav.skills': 'Skills', 'nav.passions': 'Passions', 'nav.contact': 'Contact',
    'hero.badge': 'Available · 11-week internship from 12 April 2027',
    'hero.hello': 'Hello, I\u2019m Lucas.',
    'hero.t1': 'Measure precisely.', 'hero.t2': 'Explain clearly.',
    'hero.lead': 'Second-year student in a <strong>Bachelor of Technology in Physical Measurements</strong> (BUT), alongside the <strong>CITISE</strong> integrated engineering preparatory programme at Télécom Saint-Étienne. I am looking for an internship as an instrumentation and metrology technician.',
    'hero.cta1': 'Explore my background', 'hero.cta2': 'Download my CV', 'hero.tagk': 'Dual degree',
    'mf.eyebrow': 'In a few words',
    'mf.text': 'Born and raised in Lyon, now studying in Saint-Étienne, I am pursuing two programmes at once. What drives me: understanding <em>how we know a measurement is right</em>, then explaining it simply. The rest of the time, I play chess, follow Olympique Lyonnais and remain fascinated by the chemistry of perfume.',
    'st.eyebrow': 'Journey', 'st.title': 'My story,<br><span class="muted">chapter by chapter.</span>',
    'st.c0k': 'Prologue', 'st.c0d': 'January 2021', 'st.c0t': 'A week in a machining workshop.',
    'st.c0p': 'My observation internship at DLO Indus, in Lyon, introduced me to precision manufacturing and the constraints of industrial production. A first glimpse of a world where every dimension counts.',
    'st.c1k': 'Chapter 1', 'st.c1t': 'Les Lazaristes, a school of high standards.',
    'st.c1p': 'I studied at Aux Lazaristes – La Salle, a school run by the Brothers of the Christian Schools on the Fourvière site, regularly ranked among the best high schools in Lyon. There I learned to work with method and consistency, chose mathematics and physics-chemistry as my majors, and earned my French Baccalauréat in July 2024.',
    'st.c2k': 'Chapter 2', 'st.c2d': 'September 2024', 'st.c2t': 'Saint-Étienne, two programmes at once.',
    'st.c2p': 'I chose a dual degree: the BUT in Physical Measurements at the IUT de Saint-Étienne and the CITISE integrated preparatory programme at Télécom Saint-Étienne, pursued in parallel, with the engineering cycle in sight. Two timetables, two degrees, one question: how do you prove a measurement is right?',
    'st.c3k': 'Chapter 3', 'st.c3t': 'First projects, first responsibilities.',
    'st.c3p': 'I built an Excel tool that automatically computes the uncertainty of a measurement chain following the GUM, then led the WinDev app project for learning English. In the lab, I discovered high vacuum, LabVIEW and spectrophotometry. Since September 2026, I have also been tutoring first-year students every week.',
    'st.f1': 'Excel uncertainty tool', 'st.f2b': 'Project manager', 'st.f2': 'WinDev app', 'st.f3b': '2 to 5', 'st.f3': 'students tutored weekly',
    'st.c4k': 'Chapter 4', 'st.c4d': 'April 2027', 'st.c4t': 'The next chapter is one we write together.',
    'st.c4p': 'An 11-week internship as an instrumentation and metrology technician, starting 12 April 2027, in Lyon, Saint-Étienne or the Paris area.',
    'st.type': 'Your lab?', 'st.cta': 'Write this chapter together',
    'stats.weeks': 'weeks of internship,<br>starting 12 April 2027', 'stats.tracks': 'programmes followed<br>in parallel since 2024',
    'stats.tutor': 'first-year students<br>tutored every week', 'stats.k': 'coverage factor:<br>the GUM method, not guesswork',
    'chain.eyebrow': 'My method', 'chain.title': 'From a physical quantity<br><span class="muted">to a result you can sign.</span>',
    'chain.s1t': 'Sense', 'chain.s1p': 'Select and set up the sensor: thermocouple, PT100, force sensor, distance sensor.',
    'chain.s2t': 'Acquire', 'chain.s2p': 'Condition the signal, acquire and process it in LabVIEW; electrical measuring instruments on the bench.',
    'chain.s3t': 'Quantify', 'chain.s3p': 'Trace back to standards and build the uncertainty budget following the GUM, using VIM vocabulary.',
    'chain.s4t': 'Report', 'chain.s4p': 'State the result with its expanded uncertainty, write the procedure or the calibration certificate.',
    'calc.eyebrow': 'Interactive demo', 'calc.title': 'An uncertainty budget,<br><span class="muted">live.</span>',
    'calc.lead': 'In a metrology project, I studied a distance sensor against gauge blocks and built an Excel tool that computed the uncertainty automatically. Here is the same reasoning, on the web. Change the values: everything updates.',
    'calc.values': 'Repeated measurements (mm)', 'calc.valuesHint': 'Sample values, separated by spaces: sensor readings against a 10 mm gauge block.',
    'calc.res': 'Indicator resolution (mm)', 'calc.std': 'Standard U, k = 2 (mm)', 'calc.k': 'Coverage factor k', 'calc.result': 'Measurement result',
    'calc.bA': 'Repeatability (type A) · s/√n', 'calc.bR': 'Resolution (type B) · r/√12', 'calc.bE': 'Standard (type B) · U/k', 'calc.bC': 'Combined standard uncertainty u<sub>c</sub>',
    'calc.note': 'Bars show each source’s share of the variance. The uncertainty is rounded to two significant figures.',
    'proj.eyebrow': 'Projects', 'proj.title': 'What I built,<br><span class="muted">and what I learned.</span>',
    'proj.p1t': 'Metrology project: a distance sensor against gauge blocks',
    'proj.p1p': 'Modelling of the measurement chain, uncertainty budget following the GUM method, then an Excel tool that automatically computes the uncertainty from the entered measurements.',
    'chip.gauge': 'Gauge blocks',
    'proj.p2t': 'Project manager: an app to learn English',
    'proj.p2p': 'Educational mobile game built with WinDev in 2026: four difficulty levels, random word selection, scoring, player and score databases, admin mode. I planned, coordinated and supervised the team, from choosing the project to the final demo.',
    'chip.pm': 'Project management', 'chip.db': 'Databases', 'chip.en': 'English', 'game.l1': 'Easy', 'game.l2': 'Medium', 'game.l3': 'Hard',
    'proj.p3t': 'CITISE 1 tutor at Télécom Saint-Étienne',
    'proj.p3p': 'Since September 2026, I have been helping 2 to 5 first-year students every week in their science subjects. Explaining a difficult idea simply takes the same discipline as writing a clear procedure.',
    'chip.peda': 'Teaching', 'chip.speak': 'Public speaking', 'chip.group': 'Group leadership',
    'lab.eyebrow': 'In the lab', 'lab.title': 'Practical work,<br><span class="muted">graded, not just attended.</span>',
    'lab.t1': 'Vacuum technology', 'lab.p1': 'Dry pumps and a turbomolecular pump, to reach rough then high vacuum.',
    'lab.p2': 'Data acquisition and processing: graded labs at the end of first year, and in fluid mechanics this year.',
    'lab.t3': 'Spectrophotometry', 'lab.p3': 'Measuring the absorbance of solutions at different dilutions and plotting their spectra.',
    'lab.t4': 'Calibration certificate', 'lab.p4': 'Writing a calibration certificate, a graded exercise in the BUT; use of standard masses.',
    'lab.t5': 'Sensors and dimensional', 'lab.p5': 'Thermocouple, PT100, force sensor; height gauge and vernier caliper.',
    'lab.t6': 'Electricity and electronics', 'lab.p6': 'Oscilloscope, multimeter, wattmeter and signal generators; circuit analysis, electric motors.',
    'sk.eyebrow': 'Skills', 'sk.title': 'The toolbox.',
    'sk.c1': 'Metrology and calibration', 'sk.i11': 'Measurement uncertainty, GUM method', 'sk.i12': 'International Vocabulary of Metrology (VIM)', 'sk.i13': 'Standards, traceability, calibration certificate',
    'sk.c2': 'Instrumentation and sensors', 'sk.i21': 'Measurement chains', 'sk.i22': 'Temperature: thermocouple, PT100', 'sk.i23': 'Force, distance, dimensional metrology',
    'sk.c3': 'Acquisition and programming', 'sk.i31': 'LabVIEW, signal processing', 'sk.i32': 'Excel: automated calculation tools', 'sk.i33': 'Basics of Python, WinDev, SolidWorks',
    'sk.c4': 'Physics and physical chemistry', 'sk.i41': 'Optics, acoustics, materials', 'sk.i42': 'Vacuum technology, fluid mechanics', 'sk.i43': 'Spectrophotometry, chromatography, pH measurement, titration, calorimetry',
    'sk.fr': 'French', 'sk.frl': 'Native', 'sk.en': 'English', 'sk.enl': 'B2 written · B1 spoken', 'sk.de': 'German',
    'pa.eyebrow': 'Outside the lab', 'pa.title': 'What drives me.',
    'pa.k1': 'Perfumery and cosmetics', 'pa.t1': 'To me, one of the most beautiful applications of chemistry in the 21<sup>st</sup> century.',
    'pa.p1': 'A long-held ambition, confirmed by a visit to the Fragonard perfume factories in Grasse. I am also interested in fashion.',
    'pa.k2': 'Football', 'pa.t2': 'Supporter of the French national team and Olympique Lyonnais for over 12 years.', 'pa.p2': 'My favourite sport, played for one year in a club.',
    'pa.k3': 'Chess', 'pa.k3b': 'Queen\u2019s Gambit', 'pa.fra': 'France national team', 'pa.t3': 'Anticipate, calculate, decide.', 'pa.p3': 'A game I love.',
    'pa.k4': 'Guitar', 'pa.t4': '5 years, self-taught.', 'pa.k5': 'Sports',
    'pa.s1': 'Tennis', 'pa.s1v': '8 years', 'pa.s2': 'Volleyball', 'pa.s2v': '5 years, school club', 'pa.s3': 'Alpine skiing', 'pa.s3v': 'regularly',
    'ct.title': 'Accurate measurement starts<br><span class="muted">with a good question.</span>',
    'ct.lead': 'Instrumentation and metrology technician internship, 11 weeks from 12 April 2027. Lyon, Saint-Étienne or Paris area.',
    'ct.mail': 'Get in touch', 'ct.cv': 'CV (PDF, French)',
    'ft.made': 'Measured to the micrometre.', 'ft.top': 'Back to top ↑'
  };
  const FR = {};
  const i18nEls = $$('[data-i18n]');
  i18nEls.forEach(el => { FR[el.dataset.i18n] = el.innerHTML; });

  function setLang(lang) {
    const dict = lang === 'en' ? EN : FR;
    i18nEls.forEach(el => {
      const v = dict[el.dataset.i18n];
      if (v != null && el.innerHTML !== v) el.innerHTML = v;
    });
    root.lang = lang;
    $('[data-lang-toggle]').setAttribute('aria-label', lang === 'en' ? 'Passer en français' : 'Switch to English');
    $('.portrait img').alt = lang === 'en' ? 'Portrait of Lucas Lozano' : 'Portrait de Lucas Lozano';
    document.title = lang === 'en' ? 'Lucas Lozano · Physical Measurements' : 'Lucas Lozano · Mesures Physiques';
    store.set('lang', lang);
    prepManifesto();
    buildMarquee(lang);
    if (curChapter >= 0) placeEl.textContent = chapterPlace(chapters[curChapter]);
    if (calc) calc.update();
    if (game) game.relabel();
  }

  /* ---------------- Thème ---------------- */
  function isDark() {
    const t = root.dataset.theme;
    return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function syncTheme() { root.classList.toggle('is-dark', isDark()); }
  $('[data-theme-toggle]').addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    store.set('theme', root.dataset.theme);
    syncTheme();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncTheme);
  syncTheme();

  /* ---------------- Intro ---------------- */
  // On attend seulement la photo (pas les polices ni le reste), avec un plafond de 0,9 s
  const heroImg = $('.portrait img');
  const ready = Promise.race([
    heroImg.decode ? heroImg.decode().catch(() => {}) : Promise.resolve(),
    new Promise(r => setTimeout(r, 900))
  ]).then(() => new Promise(r => setTimeout(r, reduce ? 0 : 250)));
  ready.then(() => root.classList.add('is-loaded'));

  /* ---------------- Navigation ---------------- */
  const nav = $('.nav');
  const burger = $('[data-burger]');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('.sheet a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }));
  $('[data-lang-toggle]').addEventListener('click', () => setLang(root.lang === 'en' ? 'fr' : 'en'));

  const navLinks = $$('.nav__links a');
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['accueil', 'parcours', 'mesure', 'calculateur', 'projets', 'competences', 'passions', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) sectionObs.observe(el); });

  /* ---------------- Apparitions ---------------- */
  // Décalage en cascade entre éléments frères
  $$('.reveal').forEach(el => {
    const sibs = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
    const i = sibs.indexOf(el);
    if (i > 0 && !el.closest('.hero')) el.style.setProperty('--d', Math.min(i, 5) * 0.08 + 's');
  });
  $$('.hero .reveal').forEach((el, i) => el.style.setProperty('--d', 0.35 + i * 0.1 + 's'));

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      revealObs.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  $$('.reveal').forEach(el => {
    if (el.closest('.hero')) ready.then(() => el.classList.add('is-in'));
    else revealObs.observe(el);
  });

  /* ---------------- Compteurs ---------------- */
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countObs.unobserve(e.target);
      const end = +e.target.dataset.count;
      if (reduce) { e.target.textContent = end; return; }
      const t0 = performance.now(), dur = 1600;
      (function tick(t) {
        const p = clamp((t - t0) / dur, 0, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        e.target.textContent = Math.round(end * ease);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => countObs.observe(el));

  /* ---------------- Règle graduée ---------------- */
  const track = $('[data-ruler]');
  const rulerVal = $('[data-ruler-value]');
  const RULER_SPEED = 0.6; // px de règle par px de scroll ; 10 px = 1 mm
  function buildRuler() {
    const w = Math.ceil(document.documentElement.scrollHeight * RULER_SPEED + innerWidth + 400);
    track.style.width = w + 'px';
    track.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let x = 100; x < w; x += 100) {
      const s = document.createElement('span');
      s.style.left = x + 'px';
      s.textContent = x / 100 + ' cm';
      frag.appendChild(s);
    }
    track.appendChild(frag);
  }

  /* ---------------- Manifeste : les mots s'allument au scroll ---------------- */
  const manifesto = $('[data-manifesto]');
  let mWords = [];
  function wrapWords(node) {
    Array.from(node.childNodes).forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span');
          w.className = 'w'; w.textContent = part;
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) wrapWords(n);
    });
  }
  function prepManifesto() { wrapWords(manifesto); mWords = $$('.w', manifesto); lightManifesto(); }
  function lightManifesto() {
    if (!mWords.length) return;
    const r = manifesto.getBoundingClientRect();
    const p = reduce ? 1 : clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35), 0, 1);
    const lit = Math.round(p * mWords.length * 1.15);
    mWords.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
  }

  /* ---------------- Bandeau de mots-clés ---------------- */
  const MARQUEE = {
    fr: ['Métrologie', 'Incertitudes GUM', 'VIM', 'Capteurs', 'PT100', 'Thermocouple', 'LabVIEW', 'Technique du vide', 'Spectrophotométrie', 'Étalonnage', 'Traitement du signal', 'Mécanique des fluides'],
    en: ['Metrology', 'GUM uncertainty', 'VIM', 'Sensors', 'PT100', 'Thermocouple', 'LabVIEW', 'Vacuum technology', 'Spectrophotometry', 'Calibration', 'Signal processing', 'Fluid mechanics']
  };
  function buildMarquee(lang) {
    const track = $('.marquee__track');
    if (!track) return;
    const group = '<div class="marquee__group">' + MARQUEE[lang].map(t => `<span>${t}</span><i></i>`).join('') + '</div>';
    track.innerHTML = group + group;
  }

  /* ---------------- Parcours en récit ---------------- */
  const chapters = $$('.chapter');
  const yearEl = $('[data-story-year]'), placeEl = $('[data-story-place]');
  const dots = $$('.story__dots i');
  let curChapter = -1, yearTimer = null;
  const chapterPlace = ch => (root.lang === 'en' ? ch.dataset.placeEn : ch.dataset.place);
  function setChapter(i) {
    if (i < 0 || i === curChapter) return;
    curChapter = i;
    const ch = chapters[i];
    chapters.forEach((c, j) => c.classList.toggle('is-active', j === i));
    dots.forEach((d, j) => { d.classList.toggle('is-on', j === i); d.classList.toggle('is-done', j < i); });
    placeEl.textContent = chapterPlace(ch);
    const y = ch.dataset.year;
    if (yearEl.textContent === y) return;
    if (reduce) { yearEl.textContent = y; return; }
    clearTimeout(yearTimer);
    yearEl.classList.add('is-out');
    yearTimer = setTimeout(() => {
      yearEl.textContent = y;
      yearEl.classList.remove('is-out');
      yearEl.classList.add('is-enter');
      void yearEl.offsetWidth; // relance la transition depuis le bas
      yearEl.classList.remove('is-enter');
    }, 280);
  }
  const chapterObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setChapter(chapters.indexOf(e.target)); });
  }, { rootMargin: '-35% 0px -55% 0px' });
  chapters.forEach(c => chapterObs.observe(c));

  /* ---------------- Parallaxe des photos ---------------- */
  const parallax = $$('[data-parallax]');
  function updateParallax() {
    if (reduce) return;
    parallax.forEach(img => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.transform = `translate3d(0, ${(-c * 8 - 6.5).toFixed(2)}%, 0)`;
    });
  }

  /* ---------------- Chaîne de mesure épinglée ---------------- */
  const chain = $('.chain');
  const steps = $$('.chain__step');
  const nodes = $$('.node');
  const wire = $('.chain__wire');
  const pulse = $('.chain__pulse');
  const readout = $('[data-chain-readout]');
  const wireLen = wire.getTotalLength();
  const mobile = matchMedia('(max-width: 760px)');
  let curStep = -1;

  function updateChain() {
    let p;
    if (mobile.matches) {
      const r = chain.getBoundingClientRect();
      p = clamp((innerHeight * 0.75 - r.top) / (r.height * 0.8), 0, 1);
    } else {
      const r = chain.getBoundingClientRect();
      p = clamp(-r.top / (r.height - innerHeight), 0, 1);
    }
    wire.style.strokeDashoffset = 1 - p;
    const pt = wire.getPointAtLength(p * wireLen);
    pulse.setAttribute('cx', pt.x); pulse.setAttribute('cy', pt.y);
    pulse.style.opacity = p > 0.01 && p < 0.99 ? 1 : 0;
    nodes.forEach((n, i) => n.classList.toggle('is-on', p > 0.02 && p >= (i / 3) * 0.94));
    readout.classList.toggle('is-on', p > 0.9);
    const s = Math.min(3, Math.floor(p * 4));
    if (s !== curStep && !mobile.matches) {
      curStep = s;
      steps.forEach((el, i) => el.classList.toggle('is-active', i === s));
    }
  }

  /* ---------------- Boucle de scroll ---------------- */
  const bar = $('.progress span');
  let lastY = scrollY, ticking = false;
  function onScroll() {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle('is-scrolled', y > 10);
    if (!nav.classList.contains('is-open')) nav.classList.toggle('is-hidden', y > lastY && y > 600);
    root.classList.toggle('nav-up', nav.classList.contains('is-hidden'));
    lastY = y;

    const off = y * RULER_SPEED;
    track.style.transform = `translate3d(${-off}px,0,0)`;
    const mm = (innerWidth / 2 + off) / 10;
    rulerVal.textContent = fmt(mm, 1) + ' mm';

    updateChain();

    lightManifesto();
    updateParallax();
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', () => { buildRuler(); onScroll(); });

  /* ---------------- Portrait en relief + boutons magnétiques ---------------- */
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduce) {
    const tilt = $('[data-tilt]');
    const vis = $('.hero__visual');
    vis.addEventListener('mousemove', e => {
      const r = vis.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    vis.addEventListener('mouseleave', () => { tilt.style.transform = ''; });

    $$('.pill').forEach(b => {
      b.addEventListener('mousemove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      b.addEventListener('mouseleave', () => { b.style.transform = ''; });
    });
  }

  /* ---------------- Mise en forme des nombres ---------------- */
  function fmt(v, d) {
    return v.toLocaleString(root.lang === 'en' ? 'en-GB' : 'fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: false });
  }
  function sig2(v) {
    if (!isFinite(v) || v === 0) return { txt: fmt(0, 0), dec: 0 };
    const dec = Math.max(0, 1 - Math.floor(Math.log10(Math.abs(v))));
    return { txt: fmt(v, dec), dec };
  }
  const num = s => parseFloat(String(s).trim().replace(',', '.'));

  /* ---------------- Calculateur GUM ---------------- */
  const calc = (function () {
    const form = $('[data-calc]');
    if (!form) return null;
    const out = k => $(`[data-out="${k}"]`);
    const curve = $('[data-gauss-curve]'), band = $('[data-gauss-band]');
    const hero = $('[data-live-reading]');
    const W = 400, H = 140, base = 132, amp = 118;

    function gaussPath(z0, z1, closed) {
      let d = '';
      const steps = 80;
      for (let i = 0; i <= steps; i++) {
        const z = z0 + (z1 - z0) * i / steps;
        const x = W / 2 + z * (W / 8);
        const y = base - amp * Math.exp(-z * z / 2);
        d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      if (closed) {
        d += `L${(W / 2 + z1 * W / 8).toFixed(1)} ${base}L${(W / 2 + z0 * W / 8).toFixed(1)} ${base}Z`;
      }
      return d;
    }
    curve.setAttribute('d', gaussPath(-4, 4, false));

    function update() {
      const vals = form.values.value.split(/[\s;]+/).map(num).filter(v => isFinite(v));
      const r = num(form.res.value), Ue = num(form.std.value);
      const k = +form.querySelector('input[name="k"]:checked').value;
      form.values.classList.toggle('is-invalid', vals.length < 2);
      form.res.classList.toggle('is-invalid', !(r >= 0));
      form.std.classList.toggle('is-invalid', !(Ue >= 0));
      if (vals.length < 2 || !(r >= 0) || !(Ue >= 0)) return;

      const n = vals.length;
      const mean = vals.reduce((a, b) => a + b, 0) / n;
      const s = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1));
      const uA = s / Math.sqrt(n);
      const uR = r / Math.sqrt(12);
      const uE = Ue / 2;
      const uc = Math.sqrt(uA * uA + uR * uR + uE * uE);
      const U = k * uc;

      const Uf = sig2(U);
      out('mean').textContent = fmt(mean, Uf.dec);
      out('U').textContent = Uf.txt;
      out('uA').textContent = sig2(uA).txt + ' mm';
      out('uR').textContent = sig2(uR).txt + ' mm';
      out('uE').textContent = sig2(uE).txt + ' mm';
      out('uc').textContent = sig2(uc).txt + ' mm';
      const conf = { 1: '68', 2: '95', 3: '99,7' }[k];
      out('meta').textContent = `n = ${n} · s = ${sig2(s).txt} mm · k = ${k} (≈ ${root.lang === 'en' ? conf.replace(',', '.') : conf} %)`;

      const v2 = uc * uc || 1;
      [['A', uA], ['R', uR], ['E', uE]].forEach(([id, u]) => {
        $(`[data-row="${id}"] .budget__bar i`).style.transform = `scaleX(${(u * u) / v2})`;
      });
      band.setAttribute('d', gaussPath(-k, k, true));
      if (hero) hero.textContent = sig2(uc).txt + ' mm';
      if (readout) readout.textContent = `x = ${fmt(mean, Uf.dec)} ± ${Uf.txt} mm`;
    }
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    update();
    return { update };
  })();

  /* ---------------- Projet 01 : pied à coulisse ---------------- */
  (function () {
    const media = $('.feature__media--metro');
    const val = $('[data-caliper]'), blocks = $$('.blocks span');
    if (!media) return;
    const sizes = [1.0, 2.5, 5.0, 10.0];
    let i = 0, timer = null;
    function step() {
      blocks.forEach((b, j) => b.classList.toggle('is-on', j === i));
      animateNumber(val, sizes[i], 3);
      i = (i + 1) % sizes.length;
    }
    let cur = 0;
    function animateNumber(el, to, d) {
      const from = cur, t0 = performance.now(), dur = reduce ? 1 : 1400;
      (function tick(t) {
        const p = clamp((t - t0) / dur, 0, 1);
        const e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        cur = from + (to - from) * e;
        el.textContent = fmt(cur, d);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }
    new IntersectionObserver(([e]) => {
      media.classList.toggle('is-in', e.isIntersecting);
      if (e.isIntersecting && !timer) { step(); timer = setInterval(step, 2600); }
      else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
    }, { threshold: 0.3 }).observe(media);
  })();

  /* ---------------- Projet 02 : écran du jeu ---------------- */
  const game = (function () {
    const media = $('.feature__media--game');
    if (!media) return null;
    const word = $('[data-word]'), score = $('[data-score]');
    const lvls = $$('.phone__lvl i');
    const words = { fr: ['MEASURE', 'ACCURACY', 'SENSOR', 'GAUGE', 'CALIBRATE'], en: ['MESURE', 'PRÉCISION', 'CAPTEUR', 'ÉTALON', 'ÉTALONNER'] };
    let i = 0, pts = 120, timer = null;
    function step() {
      // Le jeu fait traduire l'anglais : on affiche le mot à deviner dans l'autre langue
      const list = root.lang === 'en' ? words.en : words.fr;
      word.textContent = list[i % list.length];
      lvls.forEach((l, j) => l.classList.toggle('is-on', j === i % 4));
      pts += 10 * (i % 4 + 1);
      score.textContent = pts;
      i++;
    }
    new IntersectionObserver(([e]) => {
      media.classList.toggle('is-in', e.isIntersecting);
      if (e.isIntersecting && !timer) { step(); timer = setInterval(step, 1800); }
      else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
    }, { threshold: 0.3 }).observe(media);
    return { relabel() { i = Math.max(0, i - 1); step(); } };
  })();

  /* ---------------- Échiquier : gambit dame (1. d4 d5 2. c4) ---------------- */
  (function () {
    const board = $('[data-board]');
    if (!board) return;
    const squares = [];
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
      const s = document.createElement('i');
      s.className = (r + c) % 2 ? 'd' : 'l';
      board.appendChild(s);
      squares.push(s);
    }
    const GLYPH = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
    const sq = name => [name.charCodeAt(0) - 97, 8 - +name[1]];
    const pos = (el, name) => { const [c, r] = sq(name); el.style.transform = `translate(${c * 100}%, ${r * 100}%)`; };
    const home = {};
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'.split('/').forEach((row, r) => {
      let c = 0;
      for (const ch of row) {
        if (/\d/.test(ch)) { c += +ch; continue; }
        const p = document.createElement('span');
        p.className = 'piece ' + (ch === ch.toUpperCase() ? 'w' : 'b');
        p.textContent = GLYPH[ch.toLowerCase()] + '︎'; // forme texte, pas emoji
        const name = String.fromCharCode(97 + c) + (8 - r);
        home[name] = p;
        pos(p, name);
        board.appendChild(p);
        c++;
      }
    });
    const MOVES = [['d2', 'd4'], ['d7', 'd5'], ['c2', 'c4']];
    const notes = $$('[data-moves] span');
    const highlight = names => {
      const idx = names.map(n => { const [c, r] = sq(n); return r * 8 + c; });
      squares.forEach((s, i) => s.classList.toggle('hl', idx.includes(i)));
    };
    let occ = {}, step = 0, timer = null;
    function reset() {
      occ = Object.assign({}, home);
      Object.keys(home).forEach(n => pos(home[n], n));
      notes.forEach(n => n.classList.remove('is-on'));
      highlight([]);
      step = 0;
    }
    function play(i) {
      const [from, to] = MOVES[i];
      const el = occ[from];
      delete occ[from]; occ[to] = el;
      pos(el, to);
      highlight([from, to]);
      notes.forEach((n, j) => n.classList.toggle('is-on', j === i));
    }
    function tick() {
      if (step < MOVES.length) { play(step++); timer = setTimeout(tick, 1300); }
      else timer = setTimeout(() => { reset(); timer = setTimeout(tick, 1500); }, 3500);
    }
    reset();
    if (reduce) { MOVES.forEach((m, i) => play(i)); return; }
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) timer = setTimeout(tick, 700);
      else if (!e.isIntersecting && timer) { clearTimeout(timer); timer = null; reset(); }
    }, { threshold: 0.4 }).observe(board);
  })();

  /* ---------------- Démarrage ---------------- */
  buildRuler();
  const startLang = store.get('lang') || ((navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : (navigator.language ? 'en' : 'fr'));
  setLang(startLang);
  setChapter(0);
  onScroll();
  addEventListener('load', () => { buildRuler(); onScroll(); });
})();
