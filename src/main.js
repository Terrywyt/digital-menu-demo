import { dishes, menuCategories } from './menu-data.js';

const categoryTabs = menuCategories.map(({ id, label }) => `<button class="tab${id === 'popular' ? ' active' : ''}" data-category="${id}">${label}</button>`).join('');
const cards = dishes.map((dish) => `<article class="dish" data-category="${dish.category}"><div class="photo" style="background-image:url('${dish.image}')">${dish.tags[0] ? `<span class="tag">${dish.tags[0]}</span>` : ''}<span class="tag spice">🌶 ${dish.spice}</span></div><div class="copy"><h3>${dish.name}</h3><span class="chinese">${dish.chineseName}</span><p>${dish.summary}</p><div class="price"><span>${dish.price}</span><span class="allergens">${dish.allergens}</span></div></div></article>`).join('');

document.querySelector('#app').innerHTML = `<header><div class="top"><div class="brand">Lotus & Lime<small>THAI KITCHEN</small></div><span>EN / 中文</span></div><div class="hero"><small>FRESH · BOLD · MADE TO SHARE</small><h1>A little trip to Thailand, at your table.</h1><p>Handmade favourites, bright herbs and proper comfort food. Please tell us about allergies before ordering.</p><div class="pills"><span>🌿 Vegetarian choices</span><span>🌶 Spice shown</span><span>✓ Halal chicken</span></div></div></header><div class="alert"><strong>⚠ Allergies?</strong> Please speak with our team before ordering. We can check every dish with the kitchen.</div><nav class="tabs" aria-label="Menu categories">${categoryTabs}</nav><main><div class="heading"><h2>Guest favourites</h2><small>MENU DEMO</small></div><div class="grid">${cards}</div><section class="note"><h2>Need a recommendation?</h2><p>Tell our team what you like — mild, spicy, vegetarian or gluten-free — and we’ll help you choose.</p></section></main>`;

const app = document.querySelector('#app');
app.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
  const category = tab.dataset.category;
  app.querySelectorAll('.tab').forEach((item) => item.classList.toggle('active', item === tab));
  app.querySelector('.heading h2').textContent = category === 'popular' ? 'Guest favourites' : tab.textContent;
  app.querySelectorAll('.dish').forEach((card) => { card.hidden = category !== 'popular' && card.dataset.category !== category; });
}));
app.querySelectorAll('.dish').forEach((card) => {
  const dish = dishes.find((item) => item.name === card.querySelector('h3').textContent);
  card.tabIndex = 0;
  card.addEventListener('click', () => openDish(dish));
});
function openDish(dish) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `<div class="shade"></div><section class="modal-card"><button class="close">×</button><img src="${dish.image}" alt="${dish.name}"><div class="modal-copy"><div class="modal-meta"><span>${dish.tags.join(' · ') || dish.category}</span><span>🌶 ${dish.spice}</span></div><h2>${dish.name}</h2><span class="chinese">${dish.chineseName}</span><p>${dish.summary}</p><strong class="modal-price">${dish.price}</strong><div class="modal-allergens">${dish.allergens}</div></div></section>`;
  document.body.append(modal); document.body.style.overflow = 'hidden';
  const close = () => { modal.remove(); document.body.style.overflow = ''; };
  modal.querySelector('.close').onclick = close; modal.querySelector('.shade').onclick = close;
}
