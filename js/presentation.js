const TOTAL = 7;
let cur = 0;
let memberTimers = [];

// build dots
const dotsEl = document.getElementById('dots');
for (let i = 0; i < TOTAL; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === cur));
    document.getElementById('counter').textContent = (cur + 1) + ' / ' + TOTAL;
    document.getElementById('btn-prev').classList.toggle('disabled', cur === 0);
    document.getElementById('btn-next').classList.toggle('disabled', cur === TOTAL - 1);
}

function hideMembers(slideIdx) {
    const mg = document.getElementById('mg-' + slideIdx);
    if (!mg) return;
    mg.querySelectorAll('.member').forEach(m => m.classList.remove('visible'));
}

function revealMembers(slideIdx) {
    memberTimers.forEach(clearTimeout);
    memberTimers = [];
    const mg = document.getElementById('mg-' + slideIdx);
    if (!mg) return;
    mg.querySelectorAll('.member').forEach((m, i) => {
        const t = setTimeout(() => m.classList.add('visible'), 300 + i * 160);
        memberTimers.push(t);
    });
}

function goTo(idx) {
    if (idx < 0 || idx >= TOTAL) return;
    document.getElementById('slide-' + cur).classList.remove('active');
    hideMembers(cur);
    cur = idx;
    document.getElementById('slide-' + cur).classList.add('active');
    revealMembers(cur);
    updateDots();
}

function next() { goTo(cur + 1); }
function prev() { goTo(cur - 1); }

// keyboard
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
});

// swipe
let tx = 0;
document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
});

// fullscreen
function toggleFS() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => { });
    } else {
        document.exitFullscreen();
    }
}
document.addEventListener('fullscreenchange', () => {
    const btn = document.querySelector('.fs-btn');
    btn.innerHTML = document.fullscreenElement
        ? '<svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/></svg> Esci'
        : '<svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg> Fullscreen';
});

updateDots();
