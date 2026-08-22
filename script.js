const PERSONAS = {
  citrus: { key:'citrus', mark:'citrus', name:'Citrus Spark', type:'01', color:'#f0921f', tint:'#ffeeda',
    subtitle:'bold, spontaneous, always ready for the next adventure.', line1:"You don't wait for the fun.", line2:'You bring it.',
    img:'assets/w-citrus-c.png', photo:'assets/polaroid-citrus-tight.jpg', vibe:'BOLD · SOCIAL · SPONTANEOUS',
    blurb:"sitting still? not really your thing. citrus spark is bold, social and always ready for the next adventure." },
  mint: { key:'mint', mark:'mint', name:'Mint Mischief', type:'02', color:'#7dc496', tint:'#eaf7ee',
    subtitle:'sweet on the outside, slightly chaotic underneath.', line1:'You have a plan.', line2:'Whether anyone follows it is another story.',
    img:'assets/w-mint-c.png', photo:'assets/polaroid-mint-tight.jpg', vibe:'PLAYFUL · CLEVER · CHAOTIC',
    blurb:'probably the unofficial planner, problem-solver and chaos manager of your friend group. mint mischief keeps the group chat unwell in the best possible way.' },
  daydream: { key:'daydream', mark:'daydream', name:'Dreamy Pixie', type:'03', color:'#93c4d6', tint:'#e8f4f8',
    subtitle:'soft, curious, and happily lost in your own little world.', line1:'Life is better when you slow down.', line2:'And notice the little things.',
    img:'assets/w-blue-c.png', photo:'assets/polaroid-blue-tight.jpg', vibe:'DREAMY · CALM · CURIOUS',
    blurb:'you romanticize ordinary moments and somehow make doing nothing feel like a whole vibe. dreamy pixie is soft, calm and quietly curious.' },
  citrusMischief: { key:'citrusMischief', mark:'citrus', name:'Citrus Mischief', type:'01+02', color:'#f0921f', tint:'#eaf7ee',
    subtitle:'bold energy with a chaotic streak.', line1:'Bold energy.', line2:'With a chaotic streak.',
    img:'assets/w-citrus-c.png', photo:'assets/polaroid-citrus-tight.jpg', vibe:'BOLD · PLAYFUL · CHAOTIC',
    blurb:'you refuse to sit still, and you refuse to sit still quietly. citrus mischief brings the plan and immediately derails it.' },
  dreamyMischief: { key:'dreamyMischief', mark:'daydream', name:'Dreamy Mischief', type:'02+03', color:'#7dc496', tint:'#e8f4f8',
    subtitle:'soft on the outside, unpredictable underneath.', line1:'Soft on the outside.', line2:'Unpredictable underneath.',
    img:'assets/w-blue-c.png', photo:'assets/polaroid-blue-tight.jpg', vibe:'DREAMY · PLAYFUL · CLEVER',
    blurb:'dreamy until the exact moment you are not. dreamy mischief romanticizes the walk, then takes the scenic route on purpose.' },
  citrusDream: { key:'citrusDream', mark:'citrus', name:'Citrus Dream', type:'01+03', color:'#f0921f', tint:'#e8f4f8',
    subtitle:'adventurous, but with a soft side.', line1:'Adventurous.', line2:'But with a soft side.',
    img:'assets/w-citrus-c.png', photo:'assets/polaroid-citrus-tight.jpg', vibe:'BOLD · DREAMY · CURIOUS',
    blurb:'first to say yes, first to need a nap after. citrus dream chases the spontaneity and still stops to notice the sky.' },
  fullPixie: { key:'fullPixie', mark:'mint', name:'The Full Pixie', type:'01+02+03', color:'#c9a15a', tint:'#f6f1e6',
    subtitle:'you refuse to be put in a box.', line1:'You refuse to be put in a box.', line2:'Honestly? Very pixie of you.',
    img:'assets/w-mint-c.png', photo:'assets/hero-trio.jpg', vibe:'BOLD · PLAYFUL · DREAMY',
    blurb:'citrus energy, mint chaos, daydream softness — all at once, all the time. the full pixie is not a phase, it is a lifestyle.' }
};

const QUESTIONS = [
  { type:'cards', q:'YOUR GROUP CHAT SAYS: "WHAT ARE WE DOING TONIGHT?"', opts:[
    { label:"I'm already dressed. Let's go.", persona:'citrus' },
    { label:"I'll make the plan. Someone has to.", persona:'mint' },
    { label:'Somewhere chill, please.', persona:'daydream' } ] },
  { type:'button', q:'MONDAY MORNING. YOUR ALARM GOES OFF. YOU…', opts:[
    { label:'Absolutely not.', persona:'citrus' },
    { label:'Snooze → group chat.', persona:'mint' },
    { label:'Stare at the ceiling dramatically.', persona:'daydream' } ] },
  { type:'portal', q:'YOU GO FOR A "MENTAL HEALTH" WALK. WHAT HAPPENS?', opts:[
    { label:'It becomes a spontaneous side quest.', persona:'citrus' },
    { label:"I'm texting, scrolling & managing the chaos.", persona:'mint' },
    { label:'I completely zone out and romanticize the walk.', persona:'daydream' } ] },
  { type:'watch', q:'YOUR EVERYDAY VIBE IS…', opts:[
    { label:'Bold & bright.', persona:'citrus' },
    { label:'Sweet with a little chaos.', persona:'mint' },
    { label:'Soft & dreamy.', persona:'daydream' } ] }
];

const REMINDERS = [
  'stand up. you have been sitting since the group chat started.',
  'reply to mom. it has been four days.',
  'drink water, main character.',
  'quick call at 4 — it will not be quick.',
  'gym. or a walk. or vibes. anything.',
  'you have 3 unread invites and one excuse.'
];

const MARK_SVG = {
  citrus: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.1"/><path d="M12 3v5.6M12 15.4V21M3 12h5.6M15.4 12H21M5.7 5.7l3.9 3.9M14.4 14.4l3.9 3.9M18.3 5.7l-3.9 3.9M9.6 14.4l-3.9 3.9"/></svg>`,
  mint: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 3.5c0 9.2-5.7 14-12.2 14H3.5C3.5 8.3 9.2 3.5 15.7 3.5h4.8z"/><path d="M3.5 20.5c3.2-6.4 7.8-10.2 13-12.3"/></svg>`,
  daydream: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.2 19h10.2a3.9 3.9 0 0 0 .4-7.8A6 6 0 0 0 6.6 9.6 4.7 4.7 0 0 0 7.2 19z"/><path d="M2.5 15.5h1.8M19.8 6.4h1.7"/></svg>`
};

const state = {
  persona: null, stage: 'intro', qi: 0, scores: { citrus:0, mint:0, daydream:0 },
  view: 'desktop', watchHoverPersona: null, facePersona: 'citrus', eggs: [], logoTaps: 0,
  footerOpen: {}, crownDeg: 0, heroP: 0, heroMX: 0, heroMY: 0
};

const $ = (id) => document.getElementById(id);
const eggTotal = 5;

function egg(name){
  if (state.eggs.indexOf(name) > -1) return;
  state.eggs.push(name);
  $('eggLabel').textContent = state.eggs.length >= eggTotal ? 'certified anti-boring · 5/5' : state.eggs.length + '/' + eggTotal + ' anti-boring points';
}

function flash(persona){
  const el = $('flashOverlay');
  el.style.background = '#fff';
  el.classList.remove('on'); void el.offsetWidth; el.classList.add('on');
  setTimeout(() => el.classList.remove('on'), 500);
  if (persona) {
    const qf = $('quizFlash');
    qf.style.background = PERSONAS[persona].color;
    qf.style.opacity = 0.16;
    setTimeout(() => { qf.style.opacity = 0; }, 260);
  }
}

function showPanel(id){
  document.querySelectorAll('.quiz-panel').forEach(p => p.classList.remove('active'));
  $(id).classList.add('active');
}

/* ---- view toggle ---- */
function setView(v){
  state.view = v;
  const frame = $('frame');
  frame.classList.toggle('mobile', v === 'mobile');
  $('btnDesktop').classList.toggle('active', v === 'desktop');
  $('btnMobile').classList.toggle('active', v === 'mobile');
}
$('btnDesktop').onclick = () => setView('desktop');
$('btnMobile').onclick = () => setView('mobile');

/* ---- logo tap egg ---- */
$('logoBtn').onclick = () => {
  state.logoTaps++;
  if (state.logoTaps >= 3) egg('logo');
};

/* ---- quiz flow ---- */
$('startQuizBtn').onclick = () => {
  flash();
  setTimeout(() => { state.stage = 'quiz'; state.qi = 0; showPanel('panelQuiz'); renderQuestion(); }, 240);
};

function renderTicks(){
  const wrap = $('ticks'); wrap.innerHTML = '';
  QUESTIONS.forEach((_, i) => {
    const t = document.createElement('span');
    t.className = 'tick' + (i <= state.qi ? ' done' : '');
    wrap.appendChild(t);
  });
  $('stepLabel').textContent = (Math.min(state.qi + 1, QUESTIONS.length)) + ' / ' + QUESTIONS.length;
}

function renderQuestion(){
  renderTicks();
  const q = QUESTIONS[Math.min(state.qi, QUESTIONS.length - 1)];
  $('quizQ').textContent = q.q;
  const body = $('quizBody');
  body.innerHTML = '';

  if (q.type === 'cards') {
    const grid = document.createElement('div'); grid.className = 'opt-grid';
    q.opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'opt-card'; b.textContent = o.label;
      b.style.animationDelay = (i * 90) + 'ms';
      b.onclick = () => advance(o.persona);
      grid.appendChild(b);
    });
    body.appendChild(grid);
  } else if (q.type === 'button') {
    const [main, ...pills] = q.opts;
    const wrap = document.createElement('div'); wrap.className = 'press-wrap';
    const btn = document.createElement('button'); btn.className = 'press-btn'; btn.textContent = main.label.toUpperCase();
    btn.onmousemove = (e) => {
      const r = btn.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width/2, my = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate(${-mx*0.22}px,${-my*0.22}px)`;
    };
    btn.onclick = () => advance(main.persona);
    wrap.appendChild(btn);
    const row = document.createElement('div'); row.style.display='flex'; row.style.flexWrap='wrap'; row.style.gap='10px'; row.style.justifyContent='center';
    pills.forEach(o => {
      const b = document.createElement('button'); b.className = 'opt-pill'; b.textContent = o.label;
      b.onclick = () => advance(o.persona);
      row.appendChild(b);
    });
    wrap.appendChild(row);
    body.appendChild(wrap);
  } else if (q.type === 'portal') {
    const row = document.createElement('div'); row.className = 'portal-row';
    q.opts.forEach(o => {
      const p = PERSONAS[o.persona];
      const b = document.createElement('button'); b.className = 'portal'; b.style.flex = '1'; b.style.background = p.tint;
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
      const b = document.createElement('button'); b.className = 'opt-face'; b.textContent = o.label;
      b.onmouseenter = () => { state.watchHoverPersona = o.persona; img.src = PERSONAS[o.persona].img; img.style.transform = `rotate(${o.persona==='citrus'?-8:o.persona==='daydream'?8:0}deg)`; };
      b.onclick = () => advance(o.persona);
      opts.appendChild(b);
    });
    row.appendChild(opts);
    body.appendChild(row);
  }
}

function advance(persona){
  flash(persona);
  setTimeout(() => {
    state.scores[persona] += 1;
    state.qi += 1;
    if (state.qi >= QUESTIONS.length) { runCalculating(); }
    else { renderQuestion(); }
  }, 260);
}

$('backBtn').onclick = () => {
  if (state.qi === 0) { state.stage = 'intro'; showPanel('panelIntro'); }
  else { state.qi = Math.max(0, state.qi - 1); renderQuestion(); }
};

function resolveWinner(scores){
  const max = Math.max(scores.citrus, scores.mint, scores.daydream);
  const winners = Object.keys(scores).filter(k => scores[k] === max);
  if (winners.length === 1) return winners[0];
  if (winners.length === 3) return 'fullPixie';
  const pair = winners.sort().join('+');
  if (pair === 'citrus+mint') return 'citrusMischief';
  if (pair === 'daydream+mint') return 'dreamyMischief';
  if (pair === 'citrus+daydream') return 'citrusDream';
  return winners[0];
}

function runCalculating(){
  state.stage = 'calculating';
  showPanel('panelCalc');
  const seq = ['12%', '8%', '3%', 'ERROR', '0% BORING.'];
  const pctEl = $('calcPct'); pctEl.textContent = '';
  seq.forEach((v, i) => setTimeout(() => {
    pctEl.textContent = v;
    pctEl.style.animation = 'none'; void pctEl.offsetWidth; pctEl.style.animation = '';
  }, 500 + i * 550));
  setTimeout(() => {
    const win = resolveWinner(state.scores);
    egg('quiz');
    state.persona = win;
    state.stage = 'revealed';
    showPanel('panelReveal');
    renderReveal();
  }, 500 + seq.length * 550 + 600);
}

$('retakeBtn').onclick = () => {
  state.qi = 0; state.scores = { citrus:0, mint:0, daydream:0 }; state.stage = 'intro';
  showPanel('panelIntro');
};

/* ---- reveal card ---- */
function renderReveal(){
  const p = PERSONAS[state.persona || 'citrus'];
  $('cardBg').src = p.photo;
  $('cardMark').innerHTML = MARK_SVG[p.mark](84);
  $('cardMark').style.color = p.color;
  $('cardName').textContent = p.name;
  $('cardSubtitle').textContent = p.subtitle;
  $('cardSwatch').style.background = p.color;
  $('cardType').textContent = 'PIXIE TYPE ' + p.type;
  $('cardLines').innerHTML = p.line1 + '<br>' + p.line2;

  $('badgeBox').style.background = p.tint;
  $('badgeMark').innerHTML = MARK_SVG[p.mark](24);
  $('badgeTop').style.color = p.color;
  $('badgeName').textContent = p.name;
  $('badgeName').style.color = 'var(--color-ink)';
  $('badgeType').textContent = 'TYPE ' + p.type;
  $('badgeSub').textContent = p.subtitle;
  $('revealLines').innerHTML = p.line1 + '<br>' + p.line2;
  $('revealVibe').textContent = p.vibe;
  $('revealBlurb').textContent = p.blurb;

  const chaos = Math.min(96, state.scores.mint * 20 + 12);
  const dream = Math.min(96, state.scores.daydream * 20 + 8);
  const stats = [
    { label:'BORING LEVEL', value:2, color:'var(--text-muted)' },
    { label:'CHAOS LEVEL', value:chaos, color:'var(--color-mint)' },
    { label:'DAYDREAM LEVEL', value:dream, color:'var(--color-daydream)' }
  ];
  $('statsRow').innerHTML = stats.map(st => `<div class="stat"><div class="stat-val" style="color:${st.color}">${st.value}%</div><div class="stat-label">${st.label}</div></div>`).join('');
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

$('downloadBtn').onclick = async () => {
  const p = PERSONAS[state.persona || 'citrus'];
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1920;
  const x = c.getContext('2d');
  x.fillStyle = p.tint; x.fillRect(0,0,1080,1920);
  try { await document.fonts.load('700 150px Quicksand'); await document.fonts.load('600 56px Inter'); } catch(e){}
  x.fillStyle = 'rgba(0,45,70,.55)'; x.font = '700 34px Inter, sans-serif';
  x.fillText('THE ANTI BORING CLUB', 90, 150);
  try {
    const bg = await new Promise((res, rej) => { const i = new Image(); i.onload=()=>res(i); i.onerror=rej; i.src=p.photo; });
    const s = Math.max(1080/bg.width, 1920/bg.height);
    x.drawImage(bg, (1080-bg.width*s)/2, (1920-bg.height*s)/2, bg.width*s, bg.height*s);
  } catch(e){}
  const grad = x.createLinearGradient(0,0,0,1920);
  grad.addColorStop(0,'rgba(0,20,32,.15)'); grad.addColorStop(0.3,'rgba(0,20,32,.05)');
  grad.addColorStop(0.68,'rgba(0,20,32,.55)'); grad.addColorStop(1,'rgba(0,20,32,.92)');
  x.fillStyle = grad; x.fillRect(0,0,1080,1920);
  x.fillStyle = 'rgba(255,255,255,.9)'; x.font = '700 34px Inter, sans-serif';
  x.fillText('THE ANTI BORING CLUB', 90, 150);
  x.strokeStyle = p.color; x.lineWidth = 6; x.lineCap = 'round';
  drawMark(x, p.mark, 1180, 1445, 34);
  x.fillStyle = '#fff'; x.font = '700 90px Quicksand, sans-serif';
  x.fillText(p.name, 90, 1480);
  x.font = '600 30px Inter, sans-serif'; x.globalAlpha = 0.85;
  x.fillText(p.subtitle, 90, 1525); x.globalAlpha = 1;
  x.fillStyle = 'rgba(255,255,255,.14)'; x.beginPath(); x.roundRect(90,1565,320,62,31); x.fill();
  x.fillStyle = p.color; x.beginPath(); x.arc(120,1596,9,0,Math.PI*2); x.fill();
  x.fillStyle = '#fff'; x.font = '700 22px Inter, sans-serif';
  x.fillText('PIXIE TYPE ' + p.type, 145, 1604);
  x.font = '700 32px Inter, sans-serif';
  x.fillText(p.line1, 90, 1690); x.fillText(p.line2, 90, 1732);
  x.strokeStyle = 'rgba(255,255,255,.28)'; x.lineWidth = 2;
  x.beginPath(); x.moveTo(90,1770); x.lineTo(990,1770); x.stroke();
  x.fillStyle = '#fff'; x.font = '700 42px Quicksand, sans-serif';
  x.fillText('pebble', 90, 1840);
  x.font = '700 20px Inter, sans-serif'; x.fillStyle = 'rgba(255,255,255,.75)';
  x.fillText('PIXIE SMARTWATCH', 220, 1840);
  const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = 'pixie-' + p.key + '-story.png'; a.click();
  egg('share');
};

/* ---- watch face picker (Dome AMOLED section) ---- */
function renderFaceDots(){
  const wrap = $('faceDots'); wrap.innerHTML = '';
  ['citrus','mint','daydream'].forEach(key => {
    const b = document.createElement('button');
    b.className = 'face-dot' + (state.facePersona === key ? ' active' : '');
    b.style.background = PERSONAS[key].color;
    b.onclick = () => pickFace(key);
    wrap.appendChild(b);
  });
}
function pickFace(key){
  state.facePersona = key;
  const img = $('faceImg');
  img.style.transform = 'scale(.85)';
  img.src = PERSONAS[key].img;
  $('facePicker').style.background = PERSONAS[key].tint;
  renderFaceDots();
  setTimeout(() => { img.style.transform = 'scale(1)'; }, 160);
}
$('faceImg').addEventListener('pointerdown', (e) => {
  const order = ['citrus','mint','daydream'];
  let last = e.clientX;
  const move = (ev) => {
    const dx = ev.clientX - last;
    if (Math.abs(dx) > 60) {
      last = ev.clientX;
      const i = order.indexOf(state.facePersona);
      pickFace(order[(i + (dx > 0 ? 2 : 1)) % 3]);
    }
  };
  const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
});

/* ---- reminders (haptic crown card, static text cycling on load) ---- */
$('reminderText').textContent = REMINDERS[0];

/* ---- swatch selector ---- */
function renderSwatches(){
  const row = $('swatchRow'); row.innerHTML = '';
  ['citrus','mint','daydream'].forEach(key => {
    const p = PERSONAS[key];
    const b = document.createElement('button');
    b.style.width = '44px'; b.style.height = '44px'; b.style.borderRadius = '50%'; b.style.cursor = 'pointer';
    b.style.background = p.color;
    b.style.border = (state.persona || 'citrus') === key ? '3px solid var(--color-ink)' : '3px solid transparent';
    b.onclick = () => { state.persona = key; renderSwatches(); renderSwatchDisplay(); };
    row.appendChild(b);
  });
}
function renderSwatchDisplay(){
  const p = PERSONAS[state.persona || 'citrus'];
  $('swatchMark').innerHTML = MARK_SVG[p.key](34);
  $('swatchMark').style.color = p.color;
  $('swatchName').textContent = p.name;
  $('swatchImg').src = p.img;
}

/* ---- footer accordion (mobile) ---- */
const FOOTER_COLS = [
  { title:'QUICK LINKS', links:['New Launches','Pixie Smartwatch','Straps & Bands','Accessories'] },
  { title:'COMPANY', links:['About Us','Careers','Press','Contact'] },
  { title:'SUPPORT', links:['FAQs','Warranty Policy','Track Your Order','Shipping & Returns'] }
];
function renderFooter(){
  const wrap = $('footerCols'); wrap.innerHTML = '';
  FOOTER_COLS.forEach(col => {
    const box = document.createElement('div');
    const open = state.footerOpen[col.title] !== false; // default open on desktop via CSS media check not needed; simple toggle
    box.innerHTML = `
      <button class="footer-toggle" data-col="${col.title}">
        <span class="footer-col-title">${col.title}</span>
        <span class="chev" style="transform:rotate(${state.footerOpen[col.title] ? 180 : 0}deg);transition:transform 380ms">▾</span>
      </button>
      <div class="footer-links" style="display:${(state.view==='mobile' && !state.footerOpen[col.title]) ? 'none' : 'flex'}">
        ${col.links.map(l => `<a href="#">${l}</a>`).join('')}
      </div>`;
    box.querySelector('.footer-toggle').onclick = () => {
      state.footerOpen[col.title] = !state.footerOpen[col.title];
      renderFooter();
    };
    wrap.appendChild(box);
  });
}

/* ---- misc eggs ---- */
$('stressNoteBtn').onclick = () => egg('note');

/* ---- hero: boring world → pixie interrupts (scroll-linked) ---- */
const heroEls = {
  section: $('hero'), pin: $('heroPin'), bg: $('heroBg'), boring: $('heroBoring'),
  boringCopy: $('heroCopyBoring'), burst: $('heroBurst'), polaroid: $('heroPolaroid'),
  echoCitrus: $('heroEchoCitrus'), echoMint: $('heroEchoMint'), echoDaydream: $('heroEchoDaydream'),
  sticker: $('heroSticker'), watch: $('heroWatchOuter'), glow: $('heroWatchGlow'),
  finalInner: $('heroFinalInner'), scrollCue: $('heroScrollCue')
};

function heroClamp01(v){ return Math.min(1, Math.max(0, v)); }
function heroLerp(a, b, t){ return a + (b - a) * t; }
function heroSmooth(t){ return t * t * (3 - 2 * t); }
function heroBand(p, start, end){ return heroSmooth(heroClamp01((p - start) / (end - start))); }
function heroTent(p, center, width){ return heroClamp01(1 - Math.abs(p - center) / width); }

function buildBoringGrid(){
  const grid = $('boringGrid');
  for (let i = 0; i < 24; i++) {
    const tile = document.createElement('div');
    tile.className = 'boring-tile';
    tile.style.animationDelay = (i % 8) * 90 + 'ms';
    grid.appendChild(tile);
  }
}

function renderHero(){
  if (!heroEls.section) return;
  const p = state.heroP;
  const mx = state.heroMX, my = state.heroMY;

  const boringFade = 1 - heroBand(p, 0.3, 0.65);
  heroEls.boring.style.opacity = boringFade;
  heroEls.boringCopy.style.opacity = 1 - heroBand(p, 0.22, 0.48);
  heroEls.boringCopy.style.transform = `translateY(${heroLerp(0, -18, heroBand(p, 0.22, 0.48))}px)`;

  heroEls.bg.style.opacity = heroBand(p, 0.48, 0.85);

  const burst = heroTent(p, 0.2, 0.11);
  heroEls.burst.style.opacity = burst * 0.85;
  heroEls.burst.style.transform = `translate(-50%,-50%) scale(${heroLerp(0.4, 1.7, burst)})`;

  const enter = heroBand(p, 0.28, 0.62);
  const rotate = heroBand(p, 0.28, 0.84);
  const tx = heroLerp(60, 0, enter);
  const ry = heroLerp(-72, -8, rotate) + mx * 6;
  const rx = my * -4;
  const sc = heroLerp(0.92, 1.06, heroBand(p, 0.28, 1));
  heroEls.watch.style.opacity = heroBand(p, 0.28, 0.42);
  heroEls.watch.style.transform = `translateX(${tx}cqw) rotateY(${ry}deg) rotateX(${rx}deg) scale(${sc})`;
  heroEls.glow.style.opacity = heroBand(p, 0.5, 0.68) * 0.9;
  heroEls.glow.style.backgroundPosition = `${50 + mx * 22}% 50%`;

  const worldStagger = heroBand(p, 0.55, 0.86);
  heroEls.echoCitrus.style.opacity = heroBand(p, 0.52, 0.78);
  heroEls.echoCitrus.style.transform = `translate(${mx * 10}px, ${heroLerp(16, 0, heroBand(p, 0.52, 0.78))}px)`;
  heroEls.echoMint.style.opacity = heroBand(p, 0.58, 0.84);
  heroEls.echoMint.style.transform = `translate(${mx * 6}px, ${heroLerp(16, 0, heroBand(p, 0.58, 0.84))}px)`;
  heroEls.echoDaydream.style.opacity = heroBand(p, 0.64, 0.9);
  heroEls.echoDaydream.style.transform = `translate(${mx * 14}px, ${heroLerp(16, 0, heroBand(p, 0.64, 0.9))}px)`;
  heroEls.sticker.style.opacity = worldStagger;
  heroEls.polaroid.style.opacity = worldStagger;
  heroEls.polaroid.style.transform = `translateY(${heroLerp(24, 0, worldStagger)}px) rotate(${heroLerp(-10, -5, worldStagger)}deg)`;

  heroEls.finalInner.style.opacity = heroBand(p, 0.82, 1);
  heroEls.finalInner.style.transform = `translateY(${heroLerp(26, 0, heroBand(p, 0.82, 1))}px)`;

  heroEls.scrollCue.style.opacity = 1 - heroBand(p, 0, 0.08);
}

function updateHeroProgress(){
  const rect = heroEls.section.getBoundingClientRect();
  const total = heroEls.section.offsetHeight - window.innerHeight;
  const scrolled = -rect.top;
  state.heroP = total > 0 ? heroClamp01(scrolled / total) : 0;
  renderHero();
}

let heroTicking = false;
function initHero(){
  if (!heroEls.section) return;
  buildBoringGrid();
  updateHeroProgress();
  window.addEventListener('scroll', () => {
    if (!heroTicking) {
      heroTicking = true;
      requestAnimationFrame(() => { updateHeroProgress(); heroTicking = false; });
    }
  }, { passive: true });
  window.addEventListener('resize', updateHeroProgress);
  heroEls.pin.addEventListener('pointermove', (e) => {
    const r = heroEls.pin.getBoundingClientRect();
    state.heroMX = ((e.clientX - r.left) / r.width - 0.5) * 2;
    state.heroMY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    renderHero();
  });
  heroEls.pin.addEventListener('pointerleave', () => {
    state.heroMX = 0; state.heroMY = 0;
    renderHero();
  });
}

/* ---- init ---- */
renderFaceDots();
renderSwatches();
renderSwatchDisplay();
renderFooter();
initHero();
