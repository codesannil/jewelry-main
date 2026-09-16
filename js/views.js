/**
 * Aurelia Fine Jewelry - Page Renderers (Home, New Arrivals, About Us, Contact)
 */

import { PRODUCTS, CATEGORIES, SHOP_INFO } from './products.js';
import { getGeneralWhatsAppUrl, getAppointmentWhatsAppUrl, getProductWhatsAppUrl } from './whatsapp.js';
import { compareManager } from './compare.js';

export function renderHomeView(container) {
  const newArrivals = PRODUCTS.filter(p => p.isNewArrival).slice(0, 4);
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 6);

  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-backdrop" style="background-image: url('assets/images/hero_bg.png');"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-subtitle">✨ Artisanal Fine Jewelry Since ${SHOP_INFO.established}</span>
        <h1 class="hero-title">Timeless Jewelry.<br/>Made to Shine.</h1>
        <p class="hero-desc">Discover exquisite handcrafted gold, diamond, and silver jewelry collections from our physical store. Explore our latest designs and contact us directly on WhatsApp for availability and inquiries.</p>
        <div class="hero-btn-group">
          <a href="#catalogue" class="btn btn-gold btn-lg">Explore Catalogue</a>
          <a href="${getGeneralWhatsAppUrl()}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">
            <span>WhatsApp Us</span>
          </a>
        </div>

        <div class="hero-features-bar">
          <div class="feature-badge"><span>🏆</span> 100% BIS Hallmarked 916 Gold</div>
          <div class="feature-badge"><span>💎</span> Certified Natural Diamonds</div>
          <div class="feature-badge"><span>🏛️</span> Physical Store Experience</div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section-padding">
      <div class="page-container">
        <div class="section-header text-center">
          <span class="gold-subtitle">Curated Collections</span>
          <h2 class="section-title">Explore Categories</h2>
          <p class="section-desc">Tap any category to view our full collection of handcrafted jewelry</p>
        </div>

        <div class="categories-grid">
          ${CATEGORIES.filter(c => c.id !== 'all').map(cat => `
            <a href="#catalogue?category=${cat.id}" class="category-card">
              <div class="category-card-bg" style="background-image: url('${cat.image || 'assets/images/cat_gold.png'}');"></div>
              <div class="category-card-overlay"></div>
              <div class="category-card-content">
                <span class="category-icon">${cat.icon}</span>
                <h3 class="category-name">${cat.name}</h3>
                <span class="category-count">${cat.count} Designs</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Products Showcase -->
    <section class="section-padding bg-dark-card">
      <div class="page-container">
        <div class="section-header text-center">
          <span class="gold-subtitle">Handpicked Masterpieces</span>
          <h2 class="section-title">Featured Jewelry</h2>
          <p class="section-desc">Selected pieces crafted with extraordinary precision and elegance</p>
        </div>

        <div class="products-grid">
          ${featuredProducts.map(p => renderMiniProductCard(p)).join('')}
        </div>

        <div class="text-center mt-5">
          <a href="#catalogue" class="btn btn-outline-gold btn-lg">View Entire Digital Showroom &rarr;</a>
        </div>
      </div>
    </section>

    <!-- New Arrivals Preview Section -->
    <section class="section-padding">
      <div class="page-container">
        <div class="section-header flex-between">
          <div>
            <span class="gold-subtitle">Fresh Crafts</span>
            <h2 class="section-title">New Arrivals</h2>
          </div>
          <a href="#new-arrivals" class="btn btn-link-gold">View All New &rarr;</a>
        </div>

        <div class="products-grid">
          ${newArrivals.map(p => renderMiniProductCard(p)).join('')}
        </div>
      </div>
    </section>
  `;

  bindProductCardEvents(container);
}

export function renderNewArrivalsView(container) {
  const newProducts = PRODUCTS.filter(p => p.isNewArrival);

  container.innerHTML = `
    <div class="page-container">
      <div class="section-header text-center">
        <span class="gold-subtitle">Latest Handcrafted Additions</span>
        <h1 class="page-title">New Arrivals</h1>
        <p class="section-desc">Explore our newest releases freshly minted by our master goldsmiths</p>
      </div>

      <div class="products-grid">
        ${newProducts.map(p => renderMiniProductCard(p)).join('')}
      </div>
    </div>
  `;

  bindProductCardEvents(container);
}

export function renderAboutView(container) {
  container.innerHTML = `
    <div class="page-container">
      <div class="section-header text-center">
        <span class="gold-subtitle">Legacy of Excellence</span>
        <h1 class="page-title">About Aurelia Fine Jewelry</h1>
        <p class="section-desc">Handcrafting timeless elegance for over three decades</p>
      </div>

      <div class="about-grid">
        <div class="about-content-card">
          <h2>Our Heritage & Promise</h2>
          <p>Founded in ${SHOP_INFO.established}, ${SHOP_INFO.name} has grown from a boutique family artisan workshop into one of the region's most trusted offline fine jewelry destinations.</p>
          <p>We specialize in 22K hallmarked yellow gold, certified natural diamond solitaires, custom wedding jewelry, and contemporary 925 sterling silver crafts.</p>
          
          <div class="about-highlights-grid mt-4">
            <div class="highlight-item">
              <span class="hl-icon">📜</span>
              <div>
                <strong>100% BIS Hallmarked</strong>
                <p>Every gold jewelry item carries mandatory purity hallmark stamps.</p>
              </div>
            </div>
            <div class="highlight-item">
              <span class="hl-icon">💎</span>
              <div>
                <strong>Certified Gemstones</strong>
                <p>All diamonds are naturally mined and accompanied by purity certificates.</p>
              </div>
            </div>
            <div class="highlight-item">
              <span class="hl-icon">🔨</span>
              <div>
                <strong>Master Craftsmen</strong>
                <p>Designed and finished by veteran goldsmiths with decades of experience.</p>
              </div>
            </div>
            <div class="highlight-item">
              <span class="hl-icon">🤝</span>
              <div>
                <strong>Direct Store Consultation</strong>
                <p>Personalized attention and custom design modifications available at our showroom.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="about-image-card">
          <img src="assets/images/cat_gold.png" alt="Gold Craftsmanship" class="about-img mb-3" />
          <div class="text-center p-3">
            <h3 class="gold-text">Visit Our Physical Showroom</h3>
            <p>${SHOP_INFO.address}, ${SHOP_INFO.cityStateZip}</p>
            <a href="${getAppointmentWhatsAppUrl()}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-md mt-2">
              <span>Contact Store Manager</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderContactView(container) {
  container.innerHTML = `
    <div class="page-container">
      <div class="section-header text-center">
        <span class="gold-subtitle">Physical Showroom & Inquiries</span>
        <h1 class="page-title">Contact & Visit Us</h1>
        <p class="section-desc">Visit our physical store to view our jewelry collection in person or reach out directly on WhatsApp.</p>
      </div>

      <div class="contact-grid">
        <!-- Store Information -->
        <div class="contact-info-card">
          <h2 class="contact-card-title">${SHOP_INFO.name}</h2>
          <p class="gold-text">${SHOP_INFO.tagline}</p>

          <div class="contact-detail-list">
            <div class="contact-detail-item">
              <span class="c-icon">📍</span>
              <div>
                <strong>Physical Store Address:</strong>
                <p>${SHOP_INFO.address}<br/>${SHOP_INFO.cityStateZip}</p>
              </div>
            </div>

            <div class="contact-detail-item">
              <span class="c-icon">📞</span>
              <div>
                <strong>Phone Number:</strong>
                <p><a href="tel:${SHOP_INFO.phone}">${SHOP_INFO.phone}</a></p>
              </div>
            </div>

            <div class="contact-detail-item">
              <span class="c-icon">💬</span>
              <div>
                <strong>WhatsApp Direct:</strong>
                <p><a href="${getGeneralWhatsAppUrl()}" target="_blank" rel="noopener">${SHOP_INFO.phone} (WhatsApp Chat)</a></p>
              </div>
            </div>

            <div class="contact-detail-item">
              <span class="c-icon">🕒</span>
              <div>
                <strong>Showroom Opening Hours:</strong>
                <p>${SHOP_INFO.hours}</p>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <a href="${getAppointmentWhatsAppUrl()}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg w-100 mb-2">
              <span>Book Appointment on WhatsApp</span>
            </a>
            <a href="tel:${SHOP_INFO.phone}" class="btn btn-outline-gold btn-lg w-100">
              📞 Direct Call Store
            </a>
          </div>
        </div>

        <!-- Google Maps Mockup / Store Preview -->
        <div class="map-card">
          <h3 class="map-card-title">🗺️ Store Location Map</h3>
          <div class="map-container-mock">
            <div class="map-placeholder-content">
              <span class="map-pin-icon">📍</span>
              <h4>${SHOP_INFO.name} Flagship Store</h4>
              <p>${SHOP_INFO.address}, ${SHOP_INFO.cityStateZip}</p>
              <a href="${SHOP_INFO.googleMapsEmbed}" target="_blank" rel="noopener" class="btn btn-gold btn-sm mt-3">
                Open in Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderMiniProductCard(p) {
  const inCompare = compareManager.isInCompare(p.id);
  return `
    <div class="product-card" data-product-id="${p.id}">
      <div class="product-card-media">
        ${p.isNewArrival ? '<span class="badge badge-new">NEW</span>' : ''}
        ${p.isFeatured ? '<span class="badge badge-featured">FEATURED</span>' : ''}
        <span class="product-code-tag">${p.code}</span>
        <a href="#product?id=${p.id}" class="product-img-link">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy" class="product-img primary" />
        </a>
      </div>
      <div class="product-card-body">
        <span class="product-category">${p.categoryName} • ${p.material}</span>
        <h3 class="product-title">
          <a href="#product?id=${p.id}">${p.name}</a>
        </h3>
        <div class="product-specs">
          <span>⚖️ ${p.weight}</span>
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
        <button class="btn btn-compare-icon ${inCompare ? 'active' : ''}" data-compare-id="${p.id}" title="Compare">
          ⚖️
        </button>
      </div>
    </div>
  `;
}

function bindProductCardEvents(container) {
  container.querySelectorAll('[data-compare-id]').forEach(btn => {
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
}
