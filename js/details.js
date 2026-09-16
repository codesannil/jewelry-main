/**
 * Aurelia Fine Jewelry - Product Details Page Renderer
 */

import { PRODUCTS } from './products.js';
import { getProductWhatsAppUrl, getShareWhatsAppUrl, copyProductLink } from './whatsapp.js';
import { compareManager } from './compare.js';

export function renderProductDetailsView(container, params = {}) {
  const productId = params.id;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  if (!product) {
    container.innerHTML = `
      <div class="page-container empty-state-container">
        <h2>Product Not Found</h2>
        <p>The requested jewelry piece could not be found.</p>
        <a href="#catalogue" class="btn btn-gold btn-md">Return to Catalogue</a>
      </div>
    `;
    return;
  }

  const inCompare = compareManager.isInCompare(product.id);
  const waUrl = getProductWhatsAppUrl(product);
  const waShareUrl = getShareWhatsAppUrl(product);

  container.innerHTML = `
    <div class="page-container">
      <nav class="breadcrumb">
        <a href="#home">Home</a> &rsaquo; 
        <a href="#catalogue">Catalogue</a> &rsaquo; 
        <span>${product.name}</span>
      </nav>

      <div class="product-details-grid">
        <!-- Gallery Column -->
        <div class="product-gallery-container">
          <div class="main-image-wrapper">
            ${product.isNewArrival ? '<span class="badge badge-new">NEW</span>' : ''}
            <span class="product-code-tag flex-code">Code: ${product.code}</span>
            <img id="detail-main-img" src="${product.images[0]}" alt="${product.name}" class="detail-main-img" />
          </div>
          ${product.images.length > 1 ? `
            <div class="thumbnails-row">
              ${product.images.map((img, idx) => `
                <img src="${img}" alt="${product.name} view ${idx + 1}" class="thumb-img ${idx === 0 ? 'active' : ''}" data-thumb-src="${img}" />
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Info Column -->
        <div class="product-info-column">
          <div class="product-meta-header">
            <span class="product-collection-badge">${product.collection} Collection</span>
            <h1 class="product-detail-title">${product.name}</h1>
            <div class="product-detail-price-row">
              <span class="product-detail-price">${product.isPriceOnRequest ? 'Price on Request' : product.priceDisplay}</span>
              <span class="status-tag status-in-store">● ${product.availability}</span>
            </div>
          </div>

          <p class="product-detail-desc">${product.description}</p>

          <!-- Specifications Table -->
          <div class="specs-card">
            <h3 class="specs-card-title">✨ Specifications & Purity</h3>
            <div class="specs-grid">
              <div class="spec-item">
                <span class="spec-label">Product Code</span>
                <span class="spec-val highlight-code">${product.code}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Material</span>
                <span class="spec-val">${product.material}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Purity Grade</span>
                <span class="spec-val">${product.purity}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Net Weight</span>
                <span class="spec-val">${product.weight}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Available Sizes</span>
                <span class="spec-val">${product.sizes.join(', ')}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Guarantee</span>
                <span class="spec-val">100% BIS Hallmarked</span>
              </div>
            </div>
          </div>

          <!-- Direct Actions -->
          <div class="detail-cta-box">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg w-100 mb-3">
              <span>Ask Price & Store Availability on WhatsApp</span>
            </a>

            <div class="detail-actions-row">
              <button id="detail-compare-btn" class="btn btn-outline-gold flex-1 ${inCompare ? 'active' : ''}">
                ⚖️ ${inCompare ? 'In Compare' : 'Add to Compare'}
              </button>
              <button id="detail-share-btn" class="btn btn-outline-gold flex-1">
                📤 Share Product
              </button>
            </div>
          </div>

          <div class="store-assurance-box">
            <div class="assurance-item">
              <span>🏛️</span>
              <div>
                <strong>Offline Store Purchase</strong>
                <p>Visit our showroom to inspect and try on this jewelry piece in person.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Share Modal -->
    <div id="share-modal" class="modal-backdrop">
      <div class="modal-card">
        <div class="modal-header">
          <h3>Share Jewelry Details</h3>
          <button id="close-share-modal" class="modal-close-btn">✕</button>
        </div>
        <div class="modal-body">
          <p>Send this jewelry piece directly to friends or family:</p>
          <a href="${waShareUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-md w-100 mb-3">
            <span>Share via WhatsApp</span>
          </a>
          <button id="copy-link-btn" class="btn btn-outline-gold btn-md w-100">
            📋 Copy Product Link
          </button>
          <div id="copy-toast" class="copy-toast">Link copied to clipboard!</div>
        </div>
      </div>
    </div>
  `;

  // Gallery Thumbnail switcher
  const mainImg = container.querySelector('#detail-main-img');
  container.querySelectorAll('.thumb-img').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      container.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const newSrc = e.currentTarget.getAttribute('data-thumb-src');
      if (mainImg) mainImg.src = newSrc;
    });
  });

  // Compare Toggle
  const compareBtn = container.querySelector('#detail-compare-btn');
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      const res = compareManager.toggleCompare(product.id);
      if (res.added) {
        compareBtn.classList.add('active');
        compareBtn.innerHTML = '⚖️ In Compare';
      } else {
        compareBtn.classList.remove('active');
        compareBtn.innerHTML = '⚖️ Add to Compare';
      }
    });
  }

  // Share Modal triggers
  const shareBtn = container.querySelector('#detail-share-btn');
  const shareModal = container.querySelector('#share-modal');
  const closeShareBtn = container.querySelector('#close-share-modal');
  const copyLinkBtn = container.querySelector('#copy-link-btn');
  const copyToast = container.querySelector('#copy-toast');

  if (shareBtn && shareModal) {
    shareBtn.addEventListener('click', () => shareModal.classList.add('open'));
  }

  if (closeShareBtn && shareModal) {
    closeShareBtn.addEventListener('click', () => shareModal.classList.remove('open'));
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      copyProductLink(product.id);
      if (copyToast) {
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 3000);
      }
    });
  }
}
