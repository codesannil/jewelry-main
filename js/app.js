/**
 * Aurelia Fine Jewelry - Application Controller
 */

import { Router } from './router.js';
import { renderHomeView, renderNewArrivalsView, renderAboutView, renderContactView } from './views.js';
import { renderCatalogView } from './catalog.js';
import { renderProductDetailsView } from './details.js';
import { renderCompareView, compareManager } from './compare.js';
import { getGeneralWhatsAppUrl } from './whatsapp.js';
import { SHOP_INFO } from './products.js';

document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById('main-content');

  // Define multi-page routes
  const routes = {
    'home': (params) => renderHomeView(mainContent, params),
    'catalogue': (params) => renderCatalogView(mainContent, params),
    'product': (params) => renderProductDetailsView(mainContent, params),
    'compare': (params) => renderCompareView(mainContent, params),
    'new-arrivals': (params) => renderNewArrivalsView(mainContent, params),
    'about': (params) => renderAboutView(mainContent, params),
    'contact': (params) => renderContactView(mainContent, params),
  };

  const router = new Router(routes, 'home');
  router.init();


  // Set floating & sticky WhatsApp links
  const floatingWa = document.getElementById('floating-whatsapp-btn');
  const stickyMobileWa = document.getElementById('sticky-mobile-wa');
  const stickyMobileCall = document.getElementById('sticky-mobile-call');

  const waUrl = getGeneralWhatsAppUrl();
  if (floatingWa) floatingWa.href = waUrl;
  if (stickyMobileWa) stickyMobileWa.href = waUrl;
  if (stickyMobileCall) stickyMobileCall.href = `tel:${SHOP_INFO.phone}`;

  // Global compare badge count update
  compareManager.updateCompareBadges();
});
