/**
 * Aurelia Fine Jewelry - Product Comparison Module
 * Manages comparing up to 3 jewelry products side-by-side.
 */

import { PRODUCTS } from './products.js';
import { getProductWhatsAppUrl } from './whatsapp.js';

class CompareManager {
  constructor() {
    this.storageKey = 'aurelia_compare_items';
    this.items = this.loadStoredItems();
  }

  loadStoredItems() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveItems() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {}
    this.updateCompareBadges();
  }

  toggleCompare(productId) {
    const index = this.items.indexOf(productId);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveItems();
      return { added: false, count: this.items.length };
    } else {
      if (this.items.length >= 3) {
        alert('You can compare a maximum of 3 jewelry pieces at once.');
        return { added: false, count: this.items.length, limitReached: true };
      }
      this.items.push(productId);
      this.saveItems();
      return { added: true, count: this.items.length };
    }
  }

  isInCompare(productId) {
    return this.items.includes(productId);
  }

  removeCompare(productId) {
    this.items = this.items.filter(id => id !== productId);
    this.saveItems();
  }

  clearCompare() {
    this.items = [];
    this.saveItems();
  }

  getComparedProducts() {
    return PRODUCTS.filter(p => this.items.includes(p.id));
  }

  updateCompareBadges() {
    const badges = document.querySelectorAll('.compare-badge-count');
    badges.forEach(b => {
      b.textContent = this.items.length;
      if (this.items.length > 0) {
        b.classList.add('has-items');
      } else {
        b.classList.remove('has-items');
      }
    });
  }
}

export const compareManager = new CompareManager();

export function renderCompareView(container) {
  const products = compareManager.getComparedProducts();

  if (products.length === 0) {
    container.innerHTML = `
      <div class="page-container empty-state-container">
        <div class="empty-icon">⚖️</div>
        <h2 class="empty-title">No Items Selected for Comparison</h2>
        <p class="empty-desc">Browse our catalogue and tap the <strong>Compare</strong> button on any jewelry piece to compare materials, weights, purity, and pricing side-by-side.</p>
        <a href="#catalogue" class="btn btn-gold btn-lg">Browse Catalogue</a>
      </div>
    `;
    return;
  }

  const columnsHtml = products.map(p => `
    <div class="compare-card">
      <div class="compare-card-header">
        <button class="remove-compare-btn" data-remove-id="${p.id}" title="Remove from compare">✕</button>
        <img src="${p.images[0]}" alt="${p.name}" class="compare-card-img" />
        <span class="product-code-badge">${p.code}</span>
        <h3 class="compare-card-title">${p.name}</h3>
        <div class="compare-card-price">${p.isPriceOnRequest ? 'Price on Request' : p.priceDisplay}</div>
      </div>
      <div class="compare-spec-list">
        <div class="spec-row"><strong>Category:</strong> ${p.categoryName}</div>
        <div class="spec-row"><strong>Material:</strong> ${p.material}</div>
        <div class="spec-row"><strong>Purity:</strong> ${p.purity}</div>
        <div class="spec-row"><strong>Net Weight:</strong> ${p.weight}</div>
        <div class="spec-row"><strong>Sizes:</strong> ${p.sizes.join(', ')}</div>
        <div class="spec-row"><strong>Status:</strong> <span class="status-tag status-in-store">${p.availability}</span></div>
        <div class="spec-row"><strong>Collection:</strong> ${p.collection}</div>
      </div>
      <div class="compare-card-footer">
        <a href="${getProductWhatsAppUrl(p)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm w-100">
          <span>Inquire on WhatsApp</span>
        </a>
        <a href="#product?id=${p.id}" class="btn btn-outline-gold btn-sm w-100 mt-2">View Details</a>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="page-container">
      <div class="section-header text-center">
        <span class="gold-subtitle">Side-by-Side Analysis</span>
        <h1 class="page-title">Compare Jewelry</h1>
        <p class="section-desc">Comparing ${products.length} of 3 selected items</p>
        <button id="clear-all-compare" class="btn btn-link-gold mt-2">Clear All Items</button>
      </div>

      <div class="compare-grid count-${products.length}">
        ${columnsHtml}
      </div>
    </div>
  `;

  // Bind remove buttons
  container.querySelectorAll('[data-remove-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-remove-id');
      compareManager.removeCompare(id);
      renderCompareView(container);
    });
  });

  const clearBtn = container.querySelector('#clear-all-compare');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      compareManager.clearCompare();
      renderCompareView(container);
    });
  }
}
