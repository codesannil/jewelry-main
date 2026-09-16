/**
 * Aurelia Fine Jewelry - Digital Catalogue Database
 * Comprehensive list of luxury jewelry products for offline store catalogue.
 */

export const PRODUCTS = [
  {
    id: "prod-101",
    name: "Royal Heritage Choker Necklace",
    code: "AU-NK-101",
    category: "necklaces",
    categoryName: "Necklaces",
    material: "22K Gold",
    purity: "BIS Hallmarked 916 (22K)",
    weight: "34.50 grams",
    sizes: ["14 inch", "16 inch adjustable"],
    price: 3250,
    priceDisplay: "$3,250",
    isPriceOnRequest: false,
    availability: "In Store",
    isNewArrival: true,
    isFeatured: true,
    collection: "Royal Heritage",
    description: "An extraordinary handcrafted 22K gold choker featuring intricate filigree work, accented with synthetic emerald drops and natural lustrous pearls. A timeless heirloom designed for weddings and regal celebrations.",
    images: [
      "assets/images/prod_necklace_1.png",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-102",
    name: "Solitaire Crown Gold Ring",
    code: "AU-RG-102",
    category: "rings",
    categoryName: "Rings",
    material: "22K Gold & Diamond",
    purity: "22K Gold / VVS1 Diamond",
    weight: "6.80 grams",
    sizes: ["6 US", "7 US", "8 US", "9 US"],
    price: 1850,
    priceDisplay: "$1,850",
    isPriceOnRequest: false,
    availability: "In Store",
    isNewArrival: true,
    isFeatured: true,
    collection: "Crown Solitaire",
    description: "Elevate your elegance with this crown-inspired 22K yellow gold ring featuring a sparkling central diamond setting. Crafted to perfection with polished mirror finish.",
    images: [
      "assets/images/prod_ring_1.png",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-103",
    name: "Golden Lotus Filigree Jhumkas",
    code: "AU-ER-103",
    category: "earrings",
    categoryName: "Earrings",
    material: "22K Gold",
    purity: "BIS Hallmarked 916",
    weight: "14.20 grams",
    sizes: ["Standard Drop (4.5 cm)"],
    price: null,
    priceDisplay: "Price on Request",
    isPriceOnRequest: true,
    availability: "In Store",
    isNewArrival: true,
    isFeatured: true,
    collection: "Temple Tradition",
    description: "Traditional Indian lotus filigree drop earrings crafted in pure 22K gold. Features delicate pearl droplets that dance gracefully with every move.",
    images: [
      "assets/images/prod_earrings_1.png",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-104",
    name: "Imperial Karat Gold Bangles (Set of 4)",
    code: "AU-BG-104",
    category: "bangles",
    categoryName: "Bangles",
    material: "22K Gold",
    purity: "BIS Hallmarked 916",
    weight: "48.00 grams (set)",
    sizes: ["2.4", "2.6", "2.8"],
    price: 4600,
    priceDisplay: "$4,600",
    isPriceOnRequest: false,
    availability: "In Store",
    isNewArrival: false,
    isFeatured: true,
    collection: "Royal Heritage",
    description: "Set of four heavy 22K gold bangles engraved with royal floral motifs. Designed for traditional bridal wear and grand festive occasions.",
    images: [
      "https://images.unsplash.com/photo-1611591475143-be232935f478?auto=format&fit=crop&w=800&q=80",
      "assets/images/cat_gold.png"
    ]
  },
  {
    id: "prod-105",
    name: "Maharani Royal Bridal Gold Set",
    code: "AU-BD-105",
    category: "bridal",
    categoryName: "Bridal Collection",
    material: "22K Yellow Gold",
    purity: "BIS Hallmarked 916",
    weight: "112.50 grams",
    sizes: ["Complete Bridal Set"],
    price: null,
    priceDisplay: "Price on Request",
    isPriceOnRequest: true,
    availability: "Made to Order",
    isNewArrival: true,
    isFeatured: true,
    collection: "Bridal Couture",
    description: "The pinnacle of artisanal craftsmanship. A comprehensive grand bridal set including grand necklace, matching drop earrings, head ornament (Maang Tikka), and wedding ring.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      "assets/images/cat_gold.png"
    ]
  },
  {
    id: "prod-106",
    name: "Celestial Diamond Tennis Bracelet",
    code: "AU-BR-106",
    category: "bracelets",
    categoryName: "Bracelets",
    material: "18K White Gold & Diamond",
    purity: "18K Gold / VS Diamond Clarity",
    weight: "18.40 grams",
    sizes: ["7 inch", "7.5 inch"],
    price: 2950,
    priceDisplay: "$2,950",
    isPriceOnRequest: false,
    availability: "In Store",
    isNewArrival: false,
    isFeatured: true,
    collection: "Modern Solitaire",
    description: "Continuous line of hand-set round brilliant diamonds in 18K white gold. Secured with a custom safety clasp for everyday luxury.",
    images: [
      "assets/images/cat_diamonds.png",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-107",
    name: "925 Silver Artisan Kundan Pendant",
    code: "AU-SV-107",
    category: "silver",
    categoryName: "Silver Jewelry",
    material: "925 Sterling Silver",
    purity: "925 Silver (Gold Plated)",
    weight: "22.10 grams",
    sizes: ["18 inch chain"],
    price: 420,
    priceDisplay: "$420",
    isPriceOnRequest: false,
    availability: "In Store",
    isNewArrival: true,
    isFeatured: false,
    collection: "Contemporary Silver",
    description: "Pure 925 sterling silver chain and pendant plated in 24K yellow gold with Kundan glass stone work and ruby drop accent.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-108",
    name: "Imperium Men's Gold Signet Ring",
    code: "AU-MN-108",
    category: "mens",
    categoryName: "Men's Jewelry",
    material: "22K Gold",
    purity: "BIS Hallmarked 916",
    weight: "12.60 grams",
    sizes: ["9 US", "10 US", "11 US", "12 US"],
    price: 1400,
    priceDisplay: "$1,400",
    isPriceOnRequest: false,
    availability: "In Store",
    isNewArrival: false,
    isFeatured: false,
    collection: "Men's Sovereign",
    description: "Bold masculine design featuring a solid brushed 22K gold face with high-polish bevel edges. Represents strength and distinction.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      "assets/images/prod_ring_1.png"
    ]
  },
  {
    id: "prod-109",
    name: "Velvet Rose Gold Diamond Band",
    code: "AU-RG-109",
    category: "rings",
    categoryName: "Rings",
    material: "18K Rose Gold",
    purity: "18K Rose Gold / Pavé Diamonds",
    weight: "4.90 grams",
    sizes: ["5 US", "6 US", "7 US"],
    price: 1250,
    priceDisplay: "$1,250",
    isPriceOnRequest: false,
    availability: "In Store",
    isNewArrival: true,
    isFeatured: false,
    collection: "Modern Solitaire",
    description: "Romantic 18K rose gold stackable band set with sparkling micro-pavé diamonds along half the circumference.",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
      "assets/images/prod_ring_1.png"
    ]
  },
  {
    id: "prod-110",
    name: "Little Angels Kids Gold Kada Bangle",
    code: "AU-KD-110",
    category: "kids",
    categoryName: "Kids Jewelry",
    material: "22K Gold",
    purity: "BIS Hallmarked 916",
    weight: "8.20 grams",
    sizes: ["Adjustable Kids Size"],
    price: 780,
    priceDisplay: "$780",
    isPriceOnRequest: false,
    availability: "In Store",
    isNewArrival: false,
    isFeatured: false,
    collection: "Little Angels",
    description: "Smooth edge, gentle touch 22K gold bangle crafted specifically for toddlers and kids. Hypoallergenic polish with adjustable lock.",
    images: [
      "https://images.unsplash.com/photo-1611591475143-be232935f478?auto=format&fit=crop&w=800&q=80",
      "assets/images/cat_gold.png"
    ]
  },
  {
    id: "prod-111",
    name: "Royal Sapphire & Diamond Drop Pendant",
    code: "AU-NK-111",
    category: "necklaces",
    categoryName: "Necklaces",
    material: "18K White Gold",
    purity: "18K Gold / Natural Sapphire",
    weight: "11.30 grams",
    sizes: ["18 inch chain"],
    price: null,
    priceDisplay: "Price on Request",
    isPriceOnRequest: true,
    availability: "In Store",
    isNewArrival: true,
    isFeatured: true,
    collection: "Crown Solitaire",
    description: "Deep blue oval cut natural sapphire encased in a halo of brilliant round diamonds. Suspended from an 18K white gold link chain.",
    images: [
      "assets/images/cat_diamonds.png",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-112",
    name: "Sovereign Heavy Gold Men's Chain",
    code: "AU-MN-112",
    category: "mens",
    categoryName: "Men's Jewelry",
    material: "22K Gold",
    purity: "BIS Hallmarked 916",
    weight: "42.00 grams",
    sizes: ["22 inch", "24 inch"],
    price: 3990,
    priceDisplay: "$3,990",
    isPriceOnRequest: false,
    availability: "In Store",
    isNewArrival: false,
    isFeatured: true,
    collection: "Men's Sovereign",
    description: "Classic curb link 22K gold chain for men. Built with solid links and heavy-duty box lock mechanism.",
    images: [
      "assets/images/cat_gold.png",
      "https://images.unsplash.com/photo-1611591475143-be232935f478?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Jewelry", icon: "✨", count: PRODUCTS.length },
  { id: "gold", name: "Gold Jewelry", icon: "🔱", count: 8, image: "assets/images/cat_gold.png" },
  { id: "silver", name: "Silver Jewelry", icon: "💎", count: 3, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" },
  { id: "rings", name: "Rings", icon: "💍", count: 4, image: "assets/images/prod_ring_1.png" },
  { id: "necklaces", name: "Necklaces", icon: "📿", count: 4, image: "assets/images/prod_necklace_1.png" },
  { id: "earrings", name: "Earrings", icon: "✨", count: 3, image: "assets/images/prod_earrings_1.png" },
  { id: "bangles", name: "Bangles & Bracelets", icon: "💫", count: 3, image: "assets/images/cat_diamonds.png" },
  { id: "bridal", name: "Bridal Collection", icon: "👑", count: 2, image: "assets/images/cat_gold.png" },
  { id: "mens", name: "Men's Jewelry", icon: "⚡", count: 2, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80" },
  { id: "kids", name: "Kids Collection", icon: "🎈", count: 1, image: "https://images.unsplash.com/photo-1611591475143-be232935f478?auto=format&fit=crop&w=600&q=80" }
];

export const SHOP_INFO = {
  name: "Aurelia Fine Jewelry",
  tagline: "Timeless Jewelry. Made to Shine.",
  phone: "+1 (555) 839-2847",
  whatsappNumber: "15558392847",
  address: "742 Royal Heritage Plaza, Diamond Market, Suite 102",
  cityStateZip: "New York, NY 10001",
  hours: "Monday – Saturday: 10:00 AM – 7:30 PM | Sunday: 11:30 AM – 5:00 PM",
  googleMapsEmbed: "https://maps.google.com/?q=Diamond+District+New+York",
  established: "1988"
};
