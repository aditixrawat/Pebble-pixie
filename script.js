const PERSONAS = {
  citrus: { key:'citrus', mark:'citrus', name:'Citrus spark', type:'01', color:'#f0921f', tint:'#ffeeda',
    subtitle:'bold, spontaneous, always ready for the next adventure.', line1:"You don't wait for the fun.", line2:'You bring it.',
    img:'assets/w-citrus-c.png', photo:'assets/orangecard.jfif', life:'assets/polaroid-citrus.jpg', vibe:'Bold · social · spontaneous',
    blurb:"sitting still? not really your thing. citrus spark is bold, social and always ready for the next adventure." },
  mint: { key:'mint', mark:'mint', name:'Mint mischief', type:'02', color:'#7dc496', tint:'#eaf7ee',
    subtitle:'sweet on the outside, slightly chaotic underneath.', line1:'You have a plan.', line2:'Whether anyone follows it is another story.',
    img:'assets/w-mint-c.png', photo:'assets/mintcard.jfif', life:'assets/polaroid-mint.jpg', vibe:'Playful · clever · chaotic',
    blurb:'probably the unofficial planner, problem-solver and chaos manager of your friend group. mint mischief keeps the group chat unwell in the best possible way.' },
  daydream: { key:'daydream', mark:'daydream', name:'Dreamy pixie', type:'03', color:'#93c4d6', tint:'#e8f4f8',
    subtitle:'soft, curious, and happily lost in your own little world.', line1:'Life is better when you slow down.', line2:'And notice the little things.',
    img:'assets/w-blue-c.png', photo:'assets/bluecard.jfif', life:'assets/polaroid-blue.jpg', vibe:'Dreamy · calm · curious',
    blurb:'you romanticize ordinary moments and somehow make doing nothing feel like a whole vibe. dreamy pixie is soft, calm and quietly curious.' }
};

const QUESTIONS = [
  { type:'cards', q:'Your group chat says: "What are we doing tonight?"', opts:[
    { label:"I'm already dressed. Let's go.", persona:'citrus' },
    { label:"I'll make the plan. Someone has to.", persona:'mint' },
    { label:'Somewhere chill, please.', persona:'daydream' } ] },
  { type:'button', q:'Monday morning. Your alarm goes off. You…', opts:[
    { label:'Absolutely not.', persona:'citrus' },
    { label:'Snooze → group chat.', persona:'mint' },
    { label:'Stare at the ceiling dramatically.', persona:'daydream' } ] },
  { type:'portal', q:'You go for a "mental health" walk. What happens?', opts:[
    { label:'It becomes a spontaneous side quest.', persona:'citrus' },
    { label:"I'm texting, scrolling & managing the chaos.", persona:'mint' },
    { label:'I completely zone out and romanticize the walk.', persona:'daydream' } ] },
  { type:'watch', q:'Your everyday vibe is…', opts:[
    { label:'Bold & bright.', persona:'citrus' },
    { label:'Sweet with a little chaos.', persona:'mint' },
    { label:'Soft & dreamy.', persona:'daydream' } ] }
];

const MARK_SVG = {
  citrus: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.1"/><path d="M12 3v5.6M12 15.4V21M3 12h5.6M15.4 12H21M5.7 5.7l3.9 3.9M14.4 14.4l3.9 3.9M18.3 5.7l-3.9 3.9M9.6 14.4l-3.9 3.9"/></svg>`,
  mint: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 3.5c0 9.2-5.7 14-12.2 14H3.5C3.5 8.3 9.2 3.5 15.7 3.5h4.8z"/><path d="M3.5 20.5c3.2-6.4 7.8-10.2 13-12.3"/></svg>`,
  daydream: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.2 19h10.2a3.9 3.9 0 0 0 .4-7.8A6 6 0 0 0 6.6 9.6 4.7 4.7 0 0 0 7.2 19z"/><path d="M2.5 15.5h1.8M19.8 6.4h1.7"/></svg>`
};

const state = {
  persona: null, colour: 'citrus', stage: 'intro', qi: 0,
  answers: [], scores: { citrus:0, mint:0, daydream:0 },
  lock: false, watchHoverPersona: null, footerOpen: {}
};

const $ = (id) => document.getElementById(id);
function on(id, ev, fn){
  const el = $(id);
  if (el) el.addEventListener(ev, fn);
}
function setText(id, text){
  const el = $(id);
  if (el) el.textContent = text;
}
function setHtml(id, html){
  const el = $(id);
  if (el) el.innerHTML = html;
}

function tally(answers){
  const scores = { citrus:0, mint:0, daydream:0 };
  answers.forEach((k) => { if (k in scores) scores[k] += 1; });
  return scores;
}

function resolveWinner(answers){
  const scores = tally(answers);
  const max = Math.max(scores.citrus, scores.mint, scores.daydream);
  const tied = ['citrus','mint','daydream'].filter((k) => scores[k] === max);
  if (tied.length === 1) return tied[0];
  for (let i = answers.length - 1; i >= 0; i--) {
    if (tied.includes(answers[i])) return answers[i];
  }
  return tied[0] || 'citrus';
}

function resetQuiz(){
  state.qi = 0;
  state.lock = false;
  state.answers = [];
  state.scores = { citrus:0, mint:0, daydream:0 };
  state.watchHoverPersona = null;
}

function flash(persona){
  const el = $('flashOverlay');
  if (el) {
    el.style.background = '#fff';
    el.classList.remove('on'); void el.offsetWidth; el.classList.add('on');
    setTimeout(() => el.classList.remove('on'), 500);
  }
  if (persona) {
    const qf = $('quizFlash');
    const p = PERSONAS[persona];
    if (qf && p) {
      qf.style.background = p.color;
      qf.style.opacity = 0.16;
      setTimeout(() => { qf.style.opacity = 0; }, 260);
    }
  }
}

function showPanel(id){
  document.querySelectorAll('.quiz-panel').forEach(p => p.classList.remove('active'));
  const el = $(id);
  if (el) el.classList.add('active');
}

window.addEventListener('resize', () => updateCardScale());

function bindQuiz(){
  on('startQuizBtn', 'click', () => {
    resetQuiz();
    flash();
    setTimeout(() => { state.stage = 'quiz'; showPanel('panelQuiz'); renderQuestion(); }, 240);
  });
  on('backBtn', 'click', () => {
    if (state.qi === 0) { state.stage = 'intro'; showPanel('panelIntro'); return; }
    state.qi = Math.max(0, state.qi - 1);
    state.answers = state.answers.slice(0, state.qi);
    state.scores = tally(state.answers);
    renderQuestion();
  });
  on('retakeBtn', 'click', () => {
    resetQuiz();
    state.stage = 'intro';
    showPanel('panelIntro');
  });
  on('downloadBtn', 'click', downloadCard);
  on('shareStoriesBtn', 'click', downloadCard);
  on('copyLinkBtn', 'click', copyPixieLink);
}

function renderTicks(){
  const wrap = $('ticks');
  if (wrap) {
    wrap.innerHTML = '';
    QUESTIONS.forEach((_, i) => {
      const t = document.createElement('span');
      t.className = 'tick' + (i <= state.qi ? ' done' : '');
      wrap.appendChild(t);
    });
  }
  setText('stepLabel', (Math.min(state.qi + 1, QUESTIONS.length)) + ' / ' + QUESTIONS.length);
}

function renderQuestion(){
  renderTicks();
  const qEl = $('quizQ');
  const body = $('quizBody');
  if (!qEl || !body) return;
  const q = QUESTIONS[Math.min(state.qi, QUESTIONS.length - 1)];
  qEl.textContent = q.q;
  body.innerHTML = '';

  if (q.type === 'cards') {
    const grid = document.createElement('div'); grid.className = 'opt-grid';
    q.opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt-card'; b.textContent = o.label;
      b.style.animationDelay = (i * 90) + 'ms';
      b.style.setProperty('--accent', PERSONAS[o.persona].color);
      b.onclick = () => advance(o.persona);
      grid.appendChild(b);
    });
    body.appendChild(grid);
  } else if (q.type === 'button') {
    const row = document.createElement('div'); row.className = 'press-pills';
    q.opts.forEach(o => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'opt-pill'; b.textContent = o.label;
      b.style.setProperty('--accent', PERSONAS[o.persona].color);
      b.onclick = () => advance(o.persona);
      row.appendChild(b);
    });
    body.appendChild(row);
  } else if (q.type === 'portal') {
    const row = document.createElement('div'); row.className = 'portal-row';
    q.opts.forEach(o => {
      const p = PERSONAS[o.persona];
      const b = document.createElement('button'); b.type = 'button'; b.className = 'portal'; b.style.flex = '1'; b.style.background = p.tint;
      b.innerHTML = `<span class="pdot" style="background:${p.color}"></span><span class="pname">${o.label}</span>`;
      b.onmouseenter = () => { row.querySelectorAll('.portal').forEach(x => x.style.flex = x === b ? '2.4' : '0.8'); };
      b.onmouseleave = () => { row.querySelectorAll('.portal').forEach(x => x.style.flex = '1'); };
      b.onclick = () => advance(o.persona);
      row.appendChild(b);
    });
    body.appendChild(row);
  } else if (q.type === 'watch') {
    const row = document.createElement('div'); row.className = 'watch-q-row';
    const img = document.createElement('img'); img.className = 'watch-preview'; img.src = PERSONAS[state.watchHoverPersona || 'citrus'].img;
    row.appendChild(img);
    const opts = document.createElement('div'); opts.className = 'watch-opts';
    q.opts.forEach(o => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'opt-face'; b.textContent = o.label;
      b.style.setProperty('--accent', PERSONAS[o.persona].color);
      b.onmouseenter = () => { state.watchHoverPersona = o.persona; img.src = PERSONAS[o.persona].img; img.style.transform = `rotate(${o.persona==='citrus'?-8:o.persona==='daydream'?8:0}deg)`; };
      b.onclick = () => advance(o.persona);
      opts.appendChild(b);
    });
    row.appendChild(opts);
    body.appendChild(row);
  }
}

function advance(persona){
  if (state.lock) return;
  if (!PERSONAS[persona]) return;
  state.lock = true;
  flash(persona);
  setTimeout(() => {
    state.answers[state.qi] = persona;
    state.answers = state.answers.slice(0, state.qi + 1);
    state.qi += 1;
    state.scores = tally(state.answers);
    state.lock = false;
    if (state.qi >= QUESTIONS.length) { runCalculating(); }
    else { renderQuestion(); }
  }, 260);
}

function runCalculating(){
  state.stage = 'calculating';
  showPanel('panelCalc');
  const seq = ['12%', '8%', '3%', 'Error', '0% boring.'];
  const pctEl = $('calcPct');
  if (pctEl) pctEl.textContent = '';
  seq.forEach((v, i) => setTimeout(() => {
    if (!pctEl) return;
    pctEl.textContent = v;
    pctEl.style.animation = 'none'; void pctEl.offsetWidth; pctEl.style.animation = '';
  }, 500 + i * 550));
  setTimeout(() => {
    const win = resolveWinner(state.answers);
    state.persona = win;
    state.colour = win;
    state.scores = tally(state.answers);
    state.stage = 'revealed';
    showPanel('panelReveal');
    renderReveal();
    applyColourway(win);
  }, 500 + seq.length * 550 + 600);
}

/* ---- reveal card ---- */
function renderReveal(){
  const p = PERSONAS[state.persona] || PERSONAS.citrus;
  const stage = $('revealStage');
  if (stage) stage.dataset.pixie = p.key;
  const life = $('revealLife');
  if (life) { life.src = p.life; life.alt = p.name + ' lifestyle'; }
  const cardBg = $('cardBg');
  if (cardBg) cardBg.src = p.photo;
  setHtml('cardMark', MARK_SVG[p.mark](84));
  const cardMark = $('cardMark'); if (cardMark) cardMark.style.color = p.color;
  setText('cardName', p.name);
  setText('cardSubtitle', p.subtitle);
  const sw = $('cardSwatch'); if (sw) sw.style.background = p.color;
  setText('cardType', 'Pixie type ' + p.type);
  setHtml('cardLines', p.line1 + '<br>' + p.line2);

  const badgeBox = $('badgeBox'); if (badgeBox) badgeBox.style.background = p.tint;
  setHtml('badgeMark', MARK_SVG[p.mark](24));
  const badgeTop = $('badgeTop'); if (badgeTop) badgeTop.style.color = p.color;
  setText('badgeName', p.name);
  const badgeName = $('badgeName'); if (badgeName) badgeName.style.color = 'var(--color-ink)';
  setText('badgeType', 'type ' + p.type);
  setText('badgeSub', p.subtitle);
  setHtml('revealLines', p.line1 + '<br>' + p.line2);
  setText('revealVibe', p.vibe);
  setText('revealBlurb', p.blurb);

  const chaos = Math.min(96, state.scores.mint * 20 + 12);
  const dream = Math.min(96, state.scores.daydream * 20 + 8);
  const stats = [
    { label:'Boring level', value:2, color:'var(--text-muted)' },
    { label:'Chaos level', value:chaos, color:'var(--color-mint)' },
    { label:'Daydream level', value:dream, color:'var(--color-daydream)' }
  ];
  setHtml('statsRow', stats.map(st => `<div class="stat"><div class="stat-val" style="color:${st.color}">${st.value}%</div><div class="stat-label">${st.label}</div></div>`).join(''));
  updateCardScale();
}

function updateCardScale(){
  const frameEl = $('cardFrame');
  if (!frameEl || !frameEl.offsetWidth) return;
  frameEl.style.setProperty('--card-scale', frameEl.offsetWidth / 1080);
}

function drawMark(x, key, cx, cy, r){
  x.beginPath();
  if (key === 'citrus') {
    x.arc(cx, cy, r, 0, Math.PI*2); x.stroke();
    x.beginPath(); x.arc(cx, cy, r*0.35, 0, Math.PI*2); x.stroke();
    for (let i=0;i<8;i++){ const a=i*Math.PI/4;
      x.beginPath(); x.moveTo(cx+Math.cos(a)*r*0.46, cy+Math.sin(a)*r*0.46); x.lineTo(cx+Math.cos(a)*r*0.92, cy+Math.sin(a)*r*0.92); x.stroke(); }
  } else if (key === 'mint') {
    x.moveTo(cx+r, cy-r);
    x.bezierCurveTo(cx+r, cy+r*0.7, cx-r*0.2, cy+r, cx-r, cy+r);
    x.bezierCurveTo(cx-r, cy-r*0.4, cx+r*0.1, cy-r, cx+r, cy-r);
    x.stroke();
    x.beginPath(); x.moveTo(cx-r, cy+r); x.quadraticCurveTo(cx-r*0.1, cy+r*0.2, cx+r*0.75, cy-r*0.5); x.stroke();
  } else {
    x.arc(cx-r*0.45, cy+r*0.15, r*0.5, Math.PI*0.6, Math.PI*1.9);
    x.arc(cx+r*0.05, cy-r*0.25, r*0.6, Math.PI*1.1, Math.PI*2.05);
    x.arc(cx+r*0.6, cy+r*0.2, r*0.45, Math.PI*1.6, Math.PI*0.5);
    x.closePath(); x.stroke();
  }
}

async function downloadCard(){
  const p = PERSONAS[state.persona] || PERSONAS.citrus;
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1920;
  const x = c.getContext('2d');
  x.fillStyle = p.tint; x.fillRect(0,0,1080,1920);
  try { await document.fonts.load('600 150px Quicksand'); await document.fonts.load('600 56px Inter'); } catch(e){}
  x.fillStyle = 'rgba(0,45,70,.55)'; x.font = '600 34px Inter, sans-serif';
  x.fillText('the anti boring club', 90, 150);
  try {
    const bg = await new Promise((res, rej) => { const i = new Image(); i.onload=()=>res(i); i.onerror=rej; i.src=p.photo; });
    const s = Math.max(1080/bg.width, 1920/bg.height);
    x.drawImage(bg, (1080-bg.width*s)/2, (1920-bg.height*s)/2, bg.width*s, bg.height*s);
  } catch(e){}
  const grad = x.createLinearGradient(0,0,0,1920);
  grad.addColorStop(0,'rgba(0,20,32,.15)'); grad.addColorStop(0.3,'rgba(0,20,32,.05)');
  grad.addColorStop(0.68,'rgba(0,20,32,.55)'); grad.addColorStop(1,'rgba(0,20,32,.92)');
  x.fillStyle = grad; x.fillRect(0,0,1080,1920);
  x.fillStyle = 'rgba(255,255,255,.9)'; x.font = '600 34px Inter, sans-serif';
  x.fillText('the anti boring club', 90, 150);
  x.strokeStyle = p.color; x.lineWidth = 6; x.lineCap = 'round';
  drawMark(x, p.mark, 1180, 1445, 34);
  x.fillStyle = '#fff'; x.font = '600 90px Quicksand, sans-serif';
  x.fillText(p.name, 90, 1480);
  x.font = '600 30px Inter, sans-serif'; x.globalAlpha = 0.85;
  x.fillText(p.subtitle, 90, 1525); x.globalAlpha = 1;
  x.fillStyle = 'rgba(255,255,255,.14)'; x.beginPath(); x.roundRect(90,1565,320,62,31); x.fill();
  x.fillStyle = p.color; x.beginPath(); x.arc(120,1596,9,0,Math.PI*2); x.fill();
  x.fillStyle = '#fff'; x.font = '600 22px Inter, sans-serif';
  x.fillText('Pixie type ' + p.type, 145, 1604);
  x.font = '600 32px Inter, sans-serif';
  x.fillText(p.line1, 90, 1690); x.fillText(p.line2, 90, 1732);
  x.strokeStyle = 'rgba(255,255,255,.28)'; x.lineWidth = 2;
  x.beginPath(); x.moveTo(90,1770); x.lineTo(990,1770); x.stroke();
  x.fillStyle = '#fff'; x.font = '600 42px Quicksand, sans-serif';
  x.fillText('pebble', 90, 1840);
  x.font = '600 20px Inter, sans-serif'; x.fillStyle = 'rgba(255,255,255,.75)';
  x.fillText('Pixie smartwatch', 220, 1840);
  const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = 'pixie-' + p.key + '-story.png'; a.click();
}

function pixieShareUrl(){
  const key = (state.persona && PERSONAS[state.persona]) ? state.persona : 'citrus';
  const u = new URL(location.href);
  u.searchParams.set('pixie', key);
  u.hash = 'quiz';
  return u.href;
}

async function copyPixieLink(){
  const url = pixieShareUrl();
  const btn = $('copyLinkBtn');
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
    } else {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    if (btn) {
      const prev = btn.textContent;
      btn.textContent = 'copied';
      setTimeout(() => { btn.textContent = prev; }, 1600);
    }
  } catch (e) {
    if (btn) btn.textContent = 'copy failed';
  }
}

function openSharedPixie(){
  const key = new URLSearchParams(location.search).get('pixie');
  if (!key || !PERSONAS[key]) return;
  state.persona = key;
  state.colour = key;
  state.stage = 'revealed';
  showPanel('panelReveal');
  renderReveal();
  applyColourway(key);
}

/* ---- features in motion (sticky stage + scrolling chapters) ---- */
const FEATURE_KEYS = ['display', 'crown', 'health', 'smart'];
let notesUnlocked = 0;
function unlockFeatureNotes(key){
  const rank = { display: 1, crown: 2, health: 3, smart: 3 };
  notesUnlocked = Math.max(notesUnlocked, rank[key] || 0);
  document.querySelectorAll('.sticky-note').forEach((el) => {
    const at = Number(el.dataset.noteAt || 99);
    el.classList.toggle('is-in', at <= notesUnlocked);
  });
}
function setFeature(key, withNotes){
  const reel = $('features');
  if (!reel || !FEATURE_KEYS.includes(key)) return;
  if (reel.dataset.feature !== key){
    reel.dataset.feature = key;
    reel.classList.remove('feature-display', 'feature-crown', 'feature-health', 'feature-smart');
    reel.classList.add('feature-' + key);
    reel.querySelectorAll('.feature-stage-layer').forEach((el) => {
      el.classList.toggle('active', el.dataset.layer === key);
    });
    const idx = $('featureIdx');
    if (idx) idx.textContent = String(FEATURE_KEYS.indexOf(key) + 1).padStart(2, '0');
  }
  syncFeatureVids(key);
  if (withNotes !== false) unlockFeatureNotes(key);
}
function syncFeatureVids(beat){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const map = { display: '[data-dome-vid]', crown: '[data-haptic-vid]' };
  document.querySelectorAll('[data-dome-vid], [data-haptic-vid]').forEach((v) => {
    const host = v.closest('.feature-stage, .feature-chapter-visual');
    const shown = host && host.offsetParent;
    const sel = map[beat];
    const should = !reduced && shown && sel && v.matches(sel);
    if (should) v.play().catch(() => {});
    else v.pause();
  });
}
function initFeatureReel(){
  const reel = $('features');
  const chapters = document.querySelectorAll('[data-feature-chapter]');
  if (!reel || !chapters.length) return;
  setFeature('display', false);
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    const hit = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (hit) setFeature(hit.target.dataset.featureChapter || 'display');
  }, { rootMargin: '-20% 0px -35% 0px', threshold: [0.15, 0.35, 0.55, 0.75] });
  chapters.forEach((ch) => obs.observe(ch));
}

/* ---- swatch selector ---- */
function paintSwatchRow(row, size, selectedBorder){
  if (!row) return;
  row.innerHTML = '';
  ['citrus','mint','daydream'].forEach(key => {
    const p = PERSONAS[key];
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', p.name);
    b.style.width = size; b.style.height = size; b.style.borderRadius = '50%'; b.style.cursor = 'pointer';
    b.style.background = p.color;
    b.style.border = state.colour === key ? selectedBorder : '3px solid transparent';
    b.onclick = () => applyColourway(key);
    row.appendChild(b);
  });
}
function applyColourway(key){
  if (!PERSONAS[key]) return;
  state.colour = key;
  const footer = $('siteFooter');
  if (footer) footer.dataset.pixie = key;
  const club = $('club');
  if (club) club.dataset.pixie = key;
  setText('clubChip', PERSONAS[key].name);
  renderSwatches();
  renderSwatchDisplay();
}
function renderSwatches(){
  paintSwatchRow($('swatchRow'), '44px', '3px solid var(--color-ink)');
  paintSwatchRow($('footerSwatches'), '22px', '3px solid var(--color-white)');
}
function renderSwatchDisplay(){
  const p = PERSONAS[state.colour] || PERSONAS.citrus;
  setHtml('swatchMark', MARK_SVG[p.key](34));
  const mark = $('swatchMark'); if (mark) mark.style.color = p.color;
  setText('swatchName', p.name);
  const img = $('swatchImg'); if (img) img.src = p.img;
  const atc = $('personasAtc');
  if (atc){
    delete atc.dataset.added;
    setText('personasAtcLabel', 'Add to cart');
  }
}

/* ---- footer accordion (mobile) ---- */
const FOOTER_COLS = [
  { title:'Quick links', links:[
    { label:'New launches', href:'#hero' },
    { label:'Pixie smartwatch', href:'#features' },
    { label:'Straps & bands', href:'#straps' },
    { label:'Accessories', href:'#faces' }
  ]},
  { title:'Company', links:[
    { label:'About us', href:'#club' },
    { label:'Careers', href:'#club' },
    { label:'Press', href:'#club' },
    { label:'Contact', href:'mailto:hello@pebble.com' }
  ]},
  { title:'Support', links:[
    { label:'FAQs', href:'#features' },
    { label:'Warranty policy', href:'#club' },
    { label:'Track your order', href:'#club' },
    { label:'Shipping & returns', href:'#club' }
  ]}
];
function renderFooter(){
  const wrap = $('footerCols');
  if (!wrap) return;
  wrap.innerHTML = '';
  FOOTER_COLS.forEach(col => {
    const box = document.createElement('div');
    box.innerHTML = `
      <button class="footer-toggle" data-col="${col.title}">
        <span class="footer-col-title">${col.title}</span>
        <span class="chev" style="transform:rotate(${state.footerOpen[col.title] ? 180 : 0}deg);transition:transform 380ms">▾</span>
      </button>
      <div class="footer-links${state.footerOpen[col.title] ? ' open' : ''}">
        ${col.links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
      </div>`;
    box.querySelector('.footer-toggle').onclick = () => {
      state.footerOpen[col.title] = !state.footerOpen[col.title];
      renderFooter();
    };
    wrap.appendChild(box);
  });
}

/* ---- watchface showcase (native stills from standalone, no compressed mp4) ---- */
const FACE_STILLS = [1,2,3,4,5,6,7,8,9,10,11].map((n) => 'assets/faces-native/face' + n + '.png');
function fillFaceRow(row){
  if (!row) return;
  const loop = FACE_STILLS.concat(FACE_STILLS);
  row.innerHTML = loop.map((src) => '<span><img src="' + src + '" alt=""></span>').join('');
}
function initFacesShowcase(){
  const media = $('facesMedia');
  const row = $('facesRow');
  const inner = $('facesRowInner');
  if (!media || !row || !inner) return;
  fillFaceRow(row);
  fillFaceRow(inner);
  const rows = [row, inner];
  const W = 1920;
  const boxSize = 690;
  const diam = 0.527 * boxSize;
  const gap = diam * 0.32;
  const pitch = diam + gap;
  const stripWidth = pitch * FACE_STILLS.length;
  const speed = stripWidth / 11.6;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fit = () => {
    const w = media.clientWidth;
    const h = media.clientHeight;
    const s = w < 721
      ? (w * 0.7) / 690
      : Math.max(w / 1920, h / 1080);
    media.style.setProperty('--faces-scale', String(s));
  };
  fit();
  window.addEventListener('resize', fit, { passive: true });
  let playing = false, origin = 0, held = 0, raf = 0;
  const apply = (T) => {
    const raw = ((T * speed) % stripWidth + stripWidth) % stripWidth;
    const x = W / 2 - raw;
    rows.forEach((el) => { el.style.transform = 'translate3d(' + x + 'px,0,0)'; });
  };
  const tick = (now) => {
    if (!playing) return;
    apply(held + (now - origin) / 1000);
    raf = requestAnimationFrame(tick);
  };
  const play = () => {
    if (reduced || playing) return;
    playing = true;
    origin = performance.now();
    raf = requestAnimationFrame(tick);
  };
  const pause = () => {
    if (!playing) return;
    playing = false;
    held += (performance.now() - origin) / 1000;
    if (raf) cancelAnimationFrame(raf);
  };
  apply(0);
  if (reduced) return;
  if (!('IntersectionObserver' in window)){ play(); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { e.isIntersecting ? play() : pause(); });
  }, { threshold: 0.2 });
  io.observe(media);
}

/* ---- hero intro → plate ---- */
function showHeroPlate(){
  const hero = $('hero');
  if (!hero) return;
  hero.classList.remove('is-intro');
  hero.classList.add('is-plate');
  const intro = $('heroIntro');
  if (intro) intro.setAttribute('aria-hidden', 'true');
  if (intro) intro.removeAttribute('tabindex');
}
function initHeroIntro(){
  const hero = $('hero');
  const intro = $('heroIntro');
  if (!hero) return;
  const skip = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || (location.hash && location.hash !== '#hero' && location.hash !== '#top');
  if (skip){
    showHeroPlate();
    return;
  }
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    showHeroPlate();
  };
  window.setTimeout(finish, 2800);
  if (intro){
    intro.addEventListener('click', finish);
    intro.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); finish(); }
    });
  }
}

/* ---- init ---- */
try { initHeroIntro(); } catch (e) {}
try { initFeatureReel(); } catch (e) {}
try { applyColourway(state.colour); } catch (e) {}
try { openSharedPixie(); } catch (e) {}
try { renderFooter(); } catch (e) {}
try { initFacesShowcase(); } catch (e) {}
bindQuiz();
on('personasAtc', 'click', () => {
  const btn = $('personasAtc');
  if (!btn || btn.dataset.added) return;
  const p = PERSONAS[state.colour] || PERSONAS.citrus;
  btn.dataset.added = '1';
  setText('personasAtcLabel', p.name + ' added');
  window.setTimeout(() => {
    if (btn.dataset.added !== '1') return;
    delete btn.dataset.added;
    setText('personasAtcLabel', 'Add to cart');
  }, 1800);
});
on('logoBtn', 'click', () => {
  const url = location.pathname + location.search;
  if (location.hash) history.replaceState(null, '', url);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
