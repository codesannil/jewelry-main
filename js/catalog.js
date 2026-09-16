/**
 * Aurelia Fine Jewelry - Catalogue & Filtering Controller
 */

import { PRODUCTS, CATEGORIES } from './products.js';
import { getProductWhatsAppUrl } from './whatsapp.js';
import { compareManager } from './compare.js';

export function renderCatalogView(container, params = {}) {
  let activeCategory = params.category || 'all';
  let searchQuery = params.search || '';
  let activeMaterial = params.material || 'all';
  let sortBy = params.sort || 'featured';
  let onlyNew = params.new === 'true';
  let onlyFeatured = params.featured === 'true';

  const filterProducts = () => {
    return PRODUCTS.filter(p => {
      // Search query (matches title or product code)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = p.name.toLowerCase().includes(query);
        const matchCode = p.code.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchTitle && !matchCode && !matchDesc) return false;
      }

      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'gold' && !p.material.toLowerCase().includes('gold')) return false;
        if (activeCategory === 'silver' && !p.material.toLowerCase().includes('silver')) return false;
        if (activeCategory !== 'gold' && activeCategory !== 'silver' && p.category !== activeCategory) return false;
      }

      // Material filter
      if (activeMaterial !== 'all') {
        if (!p.material.toLowerCase().includes(activeMaterial.toLowerCase())) return false;
      }

      // Quick toggles
      if (onlyNew && !p.isNewArrival) return false;
      if (onlyFeatured && !p.isFeatured) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return (a.price || 999999) - (b.price || 999999);
      }
      if (sortBy === 'price-high') {
        return (b.price || 0) - (a.price || 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // default: featured/newest
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  };

  const renderGrid = () => {
    const products = filterProducts();
    const gridContainer = container.querySelector('#catalog-products-grid');
    const countBadge = container.querySelector('#results-count-badge');

    if (countBadge) {
      countBadge.textContent = `${products.length} Jewelry Pieces Found`;
    }

    if (!gridContainer) return;

    if (products.length === 0) {
      gridContainer.innerHTML = `
        <div class="catalog-empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No Jewelry Matches Found</h3>
          <p>Try searching for a different Product Code (e.g. <code>AU-RG-102</code>) or clearing active filters.</p>
          <button id="reset-filters-btn" class="btn btn-gold btn-md mt-3">Reset All Filters</button>
        </div>
      `;
      const resetBtn = gridContainer.querySelector('#reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          activeMaterial = 'all';
          onlyNew = false;
          onlyFeatured = false;
          renderGrid();
          updateFilterUI();
        });
      }
      return;
    }

    gridContainer.innerHTML = products.map(p => {
      const inCompare = compareManager.isInCompare(p.id);
      return `
        <div class="product-card" data-product-id="${p.id}">
          <div class="product-card-media">
            ${p.isNewArrival ? '<span class="badge badge-new">NEW</span>' : ''}
            ${p.isFeatured ? '<span class="badge badge-featured">FEATURED</span>' : ''}
            <span class="product-code-tag">${p.code}</span>
            <a href="#product?id=${p.id}" class="product-img-link">
              <img src="${p.images[0]}" alt="${p.name}" loading="lazy" class="product-img primary" />
              ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.name}" loading="lazy" class="product-img secondary" />` : ''}
            </a>
          </div>
          <div class="product-card-body">
            <span class="product-category">${p.categoryName} • ${p.material}</span>
            <h3 class="product-title">
              <a href="#product?id=${p.id}">${p.name}</a>
            </h3>
            <div class="product-specs">
              <span>⚖️ ${p.weight}</span>
              <span>✨ ${p.purity.split('/')[0]}</span>
            </div>
            <div class="product-price-row">
              <div class="product-price">${p.isPriceOnRequest ? '<span class="price-request">Price on Request</span>' : p.priceDisplay}</div>
            </div>
          </div>
          <div class="product-card-actions">
            <a href="${getProductWhatsAppUrl(p)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm flex-1" title="Ask on WhatsApp">
              <span>Ask</span>
            </a>
            <a href="#product?id=${p.id}" class="btn btn-outline-gold btn-sm" title="View details">View</a>
            <button class="btn btn-compare-icon ${inCompare ? 'active' : ''}" data-compare-id="${p.id}" title="Compare item">
              ⚖️
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind compare toggle events
    gridContainer.querySelectorAll('[data-compare-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('data-compare-id');
        const res = compareManager.toggleCompare(id);
        if (res.added) {
          e.currentTarget.classList.add('active');
        } else {
          e.currentTarget.classList.remove('active');
        }
      });
    });
  };

  const updateFilterUI = () => {
    const searchInput = container.querySelector('#catalog-search-input');
    if (searchInput) searchInput.value = searchQuery;

    container.querySelectorAll('.category-chip').forEach(chip => {
      if (chip.getAttribute('data-cat') === activeCategory) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  };

  // Initial markup of Catalogue Page
  container.innerHTML = `
    <div class="page-container">
      <div class="section-header text-center">
        <span class="gold-subtitle">Digital Showroom</span>
        <h1 class="page-title">Jewelry Catalogue</h1>
        <p class="section-desc">Browse our curated collection of gold, diamond, and silver jewelry. Tap any piece to view details or inquire on WhatsApp.</p>
      </div>

      <!-- Search & Filters Toolbar -->
      <div class="catalog-toolbar">
        <div class="search-box-wrapper">
          <input 
            type="text" 
            id="catalog-search-input" 
            class="catalog-search-input" 
            placeholder="Search by Title or Product Code (e.g. AU-RG-102)..." 
            value="${searchQuery}" 
          />
          <span class="search-icon">🔍</span>
        </div>

        <div class="filter-controls-row">
          <select id="sort-select" class="catalog-select">
            <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>Sort by: Featured</option>
            <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
            <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
            <option value="name" ${sortBy === 'name' ? 'selected' : ''}>Name: A to Z</option>
          </select>

          <select id="material-select" class="catalog-select">
            <option value="all" ${activeMaterial === 'all' ? 'selected' : ''}>All Metals</option>
            <option value="22K Gold" ${activeMaterial === '22K Gold' ? 'selected' : ''}>22K Gold</option>
            <option value="18K" ${activeMaterial === '18K' ? 'selected' : ''}>18K Gold</option>
            <option value="Silver" ${activeMaterial === 'Silver' ? 'selected' : ''}>925 Silver</option>
            <option value="Diamond" ${activeMaterial === 'Diamond' ? 'selected' : ''}>Diamond</option>
          </select>
        </div>

        <!-- Horizontal Scrollable Category Chips -->
        <div class="category-chips-scroll">
          ${CATEGORIES.map(cat => `
            <button class="category-chip ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
              <span>${cat.icon}</span> ${cat.name}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="catalog-results-bar">
        <span id="results-count-badge" class="results-count">Loading results...</span>
      </div>

      <!-- Products Grid -->
      <div id="catalog-products-grid" class="products-grid"></div>
    </div>
  `;

  // Attach search & filter event listeners
  const searchInput = container.querySelector('#catalog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderGrid();
    });
  }

  const sortSelect = container.querySelector('#sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderGrid();
    });
  }

  const materialSelect = container.querySelector('#material-select');
  if (materialSelect) {
    materialSelect.addEventListener('change', (e) => {
      activeMaterial = e.target.value;
      renderGrid();
    });
  }

  container.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      activeCategory = e.currentTarget.getAttribute('data-cat');
      updateFilterUI();
      renderGrid();
    });
  });

  renderGrid();
}
