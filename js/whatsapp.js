/**
 * Aurelia Fine Jewelry - WhatsApp Integration Engine
 * Creates pre-filled messages and direct wa.me links for products and general store inquiries.
 */

import { SHOP_INFO } from './products.js';

export function getProductWhatsAppUrl(product) {
  const priceText = product.isPriceOnRequest ? 'Price on Request' : product.priceDisplay;
  const currentUrl = window.location.href;
  
  const text = `Hello ${SHOP_INFO.name}! 👋\n\nI am interested in this jewelry product from your digital catalogue:\n\n💎 *Product:* ${product.name}\n🔖 *Product Code:* ${product.code}\n⚖️ *Weight:* ${product.weight}\n✨ *Material:* ${product.material} (${product.purity})\n💰 *Price:* ${priceText}\n\nPlease let me know if this piece is available at your store and how I can visit to see it in person.\n\nLink: ${currentUrl}`;

  return `https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function getGeneralWhatsAppUrl() {
  const text = `Hello ${SHOP_INFO.name}! 👋\n\nI just explored your digital jewelry catalogue website! I would like to inquire about your latest collections and schedule a visit to your physical store.`;
  return `https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function getAppointmentWhatsAppUrl() {
  const text = `Hello ${SHOP_INFO.name}! 👋\n\nI would like to book a private viewing appointment at your store.\n\nPlease share available time slots for this week. Thank you!`;
  return `https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function getShareWhatsAppUrl(product) {
  const currentUrl = `${window.location.origin}${window.location.pathname}#product?id=${product.id}`;
  const text = `✨ Check out this exquisite jewelry piece from ${SHOP_INFO.name}:\n\n💎 *${product.name}*\n🔖 Product Code: ${product.code}\n⚖️ Weight: ${product.weight}\n✨ Metal: ${product.material}\n\nView details online:\n${currentUrl}`;

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function copyProductLink(productId) {
  const url = `${window.location.origin}${window.location.pathname}#product?id=${productId}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url);
    return true;
  }
  return false;
}
