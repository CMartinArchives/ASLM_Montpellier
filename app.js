/* Pas de bibliothèque : données, filtrage annuel, boutons et fenêtre native. */
const yearInput = document.querySelector('#year');
const timeline = document.querySelector('#timeline');
const sectionInput = document.querySelector('#section');
const dialog = document.querySelector('#profile');
const sections = ['Médecine', 'Sciences', 'Lettres'];
let year = 1900;

// Une date de début ajustée peut représenter un transfert documenté.
function occupants(section, seat, atYear) {
  const eligible = MEMBERS.filter(m => m.section === section && m.seat === seat && m.start <= atYear);
  const latest = Math.max(...eligible.map(m => m.start));
  return eligible.filter(m => m.start === latest && (m.end === null || atYear < m.end));
}
function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function displayDate(value) {
  if (!value) return 'Non renseigné';
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value.split('-').reverse().join('/') : value;
}
function showProfile(section, seat, people) {
  const content = document.querySelector('#profile-content');
  content.replaceChildren(el('p', `${section} · Fauteuil ${seat} · ${year}`, 'eyebrow'));
  if (!people.length) content.append(el('h2', 'Aucun titulaire renseigné'), el('p', 'Les données ne permettent pas d’afficher un nom pour ce fauteuil à cette année.'));
  if (people.length > 1) content.append(el('p', 'Plusieurs noms partagent la même année d’entrée. Leur ordre de succession reste indéterminé.', 'note'));
  for (const m of people) {
    const article = el('article', undefined, 'person');
    article.append(el('h2', `${m.first || ''} ${m.last}`.trim()));
    const dl = el('dl');
    for (const [label, value] of [
      ['Élection', m.election], ['Naissance', m.birth ? displayDate(m.birth) : null],
      ['Décès', m.death ? displayDate(m.death) : null], ['Carrière', m.career],
      ['Parrains', m.sponsors], ['Fonctions', m.roles], ['Transferts', m.transfer]
    ]) if (value) dl.append(el('dt', label), el('dd', String(value)));
    article.append(dl);
    if (m.note) article.append(el('p', m.note, 'note'));
    if ([m.birthPrecision, m.deathPrecision].some(v => v && v.includes('confirmer'))) article.append(el('p', 'Une date au 1er janvier demande confirmation : seule l’année pourrait être connue.', 'note'));
    if (m.death && Number(m.death.slice(0, 4)) < year) article.append(el('p', 'Le décès est antérieur à l’année affichée. Ce nom reste visible par convention jusqu’à l’élection du successeur.', 'note'));
    if (m.url && m.url.startsWith('https://www.ac-sciences-lettres-montpellier.fr/')) {
      const link = el('a', 'Lire la notice de l’Académie ↗', 'source');
      link.href = m.url; link.target = '_blank'; link.rel = 'noopener'; article.append(link);
    }
    content.append(article);
  }
  dialog.showModal();
}
function render() {
  yearInput.value = timeline.value = year;
  document.querySelector('#previous').disabled = year === 1847;
  document.querySelector('#next').disabled = year === 2026;
  const container = document.querySelector('#seating'); container.replaceChildren();
  let filled = 0, total = 0;
  for (const section of sections.filter(s => sectionInput.value === 'Toutes les sections' || sectionInput.value === s)) {
    const hall = el('section', undefined, 'hall'); hall.append(el('h2', section));
    const grid = el('div', undefined, 'seats');
    const maxSeat = Math.max(...MEMBERS.filter(m => m.section === section).map(m => m.seat));
    for (let seat = 1; seat <= maxSeat; seat++) {
      const people = occupants(section, seat, year); total++; if (people.length) filled++;
      const label = people.length ? people.map(m => m.last).join(' / ') : 'Non renseigné';
      const button = el('button', undefined, `seat ${people.length === 0 ? 'empty' : people.length > 1 ? 'uncertain' : ''}`);
      button.setAttribute('aria-label', `${section}, fauteuil ${seat}, ${year} : ${label}`);
      button.append(el('span', String(seat), 'chair'), el('span', label, 'seat-name'));
      button.addEventListener('click', () => showProfile(section, seat, people)); grid.append(button);
    }
    hall.append(grid); container.append(hall);
  }
  document.querySelector('#summary').textContent = `${year} · ${filled} fauteuils renseignés sur ${total}`;
}
function setYear(value) { const n = Number(value); if (Number.isFinite(n)) { year = Math.max(1847, Math.min(2026, Math.trunc(n))); render(); } }
yearInput.addEventListener('change', () => setYear(yearInput.value));
timeline.addEventListener('input', () => setYear(timeline.value));
sectionInput.addEventListener('change', render);
document.querySelector('#previous').addEventListener('click', () => setYear(year - 1));
document.querySelector('#next').addEventListener('click', () => setYear(year + 1));
document.querySelector('#reset').addEventListener('click', () => setYear(1900));
document.querySelector('#close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
render();
