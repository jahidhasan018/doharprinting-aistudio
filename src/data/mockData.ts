import { Product, OrderTrackResult } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'dohar-tee-heavy',
    slug: 'heavyweight-oversized-t-shirt',
    title: 'Heavyweight Oversized T-Shirt (240 GSM)',
    category: 'apparel',
    categoryLabel: 'T-Shirts & Tops',
    basePrice: 38,
    currency: 'AED',
    badge: 'Best Seller',
    specs: 'XS–3XL · 100% Combed Cotton · No Minimums',
    moq: 1,
    supportedMethods: ['DTF', 'Screen', 'DTG', 'Embroidery'],
    material: '240 GSM pre-shrunk ring-spun organic cotton with drop-shoulder fit',
    leadTime: 'Same-day dispatch in Dubai · 24h UAE wide',
    image: '/products/heavyweight-tee.jpg',
    illustrationType: 'tshirt',
    rating: 4.9,
    reviewCount: 142,
    description: 'Our flagship heavy streetwear tee, engineered specifically for Middle Eastern climates with breathable high-density 240 GSM combed cotton. Retains structure wash after wash with reinforced twin-needle stitching.',
    variants: [
      { colorName: 'Jet Black', colorHex: '#1F2022', inStock: true },
      { colorName: 'Desert Dune', colorHex: '#E2DBD2', inStock: true },
      { colorName: 'Chalk White', colorHex: '#F6F6F4', inStock: true },
      { colorName: 'Arabian Forest', colorHex: '#27382E', inStock: true },
      { colorName: 'Slate Navy', colorHex: '#26303B', inStock: true }
    ],
    tierPricing: [
      { range: '1–9 pcs', minQty: 1, maxQty: 9, pricePerUnit: 38, discountPercent: 0 },
      { range: '10–49 pcs', minQty: 10, maxQty: 49, pricePerUnit: 32, discountPercent: 15 },
      { range: '50–199 pcs', minQty: 50, maxQty: 199, pricePerUnit: 26, discountPercent: 31 },
      { range: '200+ pcs', minQty: 200, pricePerUnit: 21, discountPercent: 44 }
    ]
  },
  {
    id: 'dohar-hoodie-terry',
    slug: 'oversized-french-terry-hoodie',
    title: '380 GSM Heavy French Terry Hoodie',
    category: 'apparel',
    categoryLabel: 'Hoodies & Fleece',
    basePrice: 78,
    currency: 'AED',
    badge: 'Best Seller',
    specs: 'XS–3XL · Double-layer hood · No Minimums',
    moq: 1,
    supportedMethods: ['DTF', 'Embroidery', 'Screen'],
    material: '380 GSM loopback French terry, 80% cotton, 20% polyester fleece interior',
    leadTime: '24h Express in Dubai · 48h Abu Dhabi / Sharjah',
    image: '/products/french-terry-hoodie.jpg',
    illustrationType: 'hoodie',
    rating: 4.8,
    reviewCount: 98,
    description: 'Luxury heavyweight hoodie designed with clean architectural silhouette, no drawstrings for a modern aesthetic, and kangaroo pouch with concealed phone pocket.',
    variants: [
      { colorName: 'Washed Charcoal', colorHex: '#2E3033', inStock: true },
      { colorName: 'Bone Cream', colorHex: '#EAE5DB', inStock: true },
      { colorName: 'Onyx Black', colorHex: '#18191A', inStock: true },
      { colorName: 'Sage Green', colorHex: '#4A5B52', inStock: true }
    ],
    tierPricing: [
      { range: '1–9 pcs', minQty: 1, maxQty: 9, pricePerUnit: 78, discountPercent: 0 },
      { range: '10–49 pcs', minQty: 10, maxQty: 49, pricePerUnit: 68, discountPercent: 12 },
      { range: '50–199 pcs', minQty: 50, maxQty: 199, pricePerUnit: 58, discountPercent: 25 },
      { range: '200+ pcs', minQty: 200, pricePerUnit: 49, discountPercent: 37 }
    ]
  },
  {
    id: 'dohar-tote-heavy',
    slug: 'heavy-canvas-tote-bag',
    title: '12oz Heavyweight Organic Canvas Tote',
    category: 'bags',
    categoryLabel: 'Bags & Totes',
    basePrice: 18,
    currency: 'AED',
    badge: 'Eco Friendly',
    specs: '38 × 42 cm · 100% Unbleached Canvas · No Minimums',
    moq: 1,
    supportedMethods: ['Screen', 'DTF'],
    material: '12oz GOTS-certified unbleached organic cotton canvas with 65cm cross-stitched handles',
    leadTime: 'Same-day dispatch in Dubai · 24h UAE wide',
    image: '/products/canvas-tote.jpg',
    illustrationType: 'tote',
    rating: 5.0,
    reviewCount: 210,
    description: 'A durable everyday canvas tote with bottom gusset for enhanced capacity. Perfect for retail merchandise, bookstore launches, café branding, and conference gift packs.',
    variants: [
      { colorName: 'Raw Ecru', colorHex: '#EFECE4', inStock: true },
      { colorName: 'Midnight Black', colorHex: '#1B1C1E', inStock: true },
      { colorName: 'Olive Drab', colorHex: '#3D4436', inStock: true }
    ],
    tierPricing: [
      { range: '1–9 pcs', minQty: 1, maxQty: 9, pricePerUnit: 18, discountPercent: 0 },
      { range: '10–49 pcs', minQty: 10, maxQty: 49, pricePerUnit: 14, discountPercent: 22 },
      { range: '50–199 pcs', minQty: 50, maxQty: 199, pricePerUnit: 10.5, discountPercent: 41 },
      { range: '200+ pcs', minQty: 200, pricePerUnit: 8.5, discountPercent: 52 }
    ]
  },
  {
    id: 'dohar-bottle-vacuum',
    slug: 'matte-vacuum-insulated-bottle',
    title: '750ml Double-Wall Matte Insulated Bottle',
    category: 'drinkware',
    categoryLabel: 'Drinkware & Bottles',
    basePrice: 42,
    currency: 'AED',
    badge: 'Best Seller',
    specs: '750ml · 24h Cold / 12h Hot · Laser or UV Print',
    moq: 1,
    supportedMethods: ['UV', 'Screen'],
    material: '18/8 food-grade 304 stainless steel with durable matte powder coat finish',
    leadTime: '24h Express in Dubai · 48h UAE wide',
    image: '/products/insulated-bottle.jpg',
    illustrationType: 'bottle',
    rating: 4.9,
    reviewCount: 167,
    description: 'Keeps water ice-cold during UAE summer months for up to 24 hours. Features a leak-proof bamboo-capped lid, silicone seal, and sweat-proof exterior. Ideal for corporate wellness packs.',
    variants: [
      { colorName: 'Matte Obsidian', colorHex: '#1F2023', inStock: true },
      { colorName: 'Brushed Silver', colorHex: '#D8D9DB', inStock: true },
      { colorName: 'Nordic White', colorHex: '#F5F5F7', inStock: true },
      { colorName: 'Royal Navy', colorHex: '#1E2C3D', inStock: true }
    ],
    tierPricing: [
      { range: '1–9 pcs', minQty: 1, maxQty: 9, pricePerUnit: 42, discountPercent: 0 },
      { range: '10–49 pcs', minQty: 10, maxQty: 49, pricePerUnit: 35, discountPercent: 16 },
      { range: '50–199 pcs', minQty: 50, maxQty: 199, pricePerUnit: 29, discountPercent: 30 },
      { range: '200+ pcs', minQty: 200, pricePerUnit: 24, discountPercent: 42 }
    ]
  },
  {
    id: 'dohar-cap-dad',
    slug: 'vintage-washed-cotton-dad-cap',
    title: 'Washed Twill 6-Panel Structured Cap',
    category: 'headwear',
    categoryLabel: 'Caps & Headwear',
    basePrice: 28,
    currency: 'AED',
    badge: 'No MOQ',
    specs: 'Adjustable Brass Buckle · 3D Puff or Flat Embroidery',
    moq: 1,
    supportedMethods: ['Embroidery', 'DTF'],
    material: '100% heavy washed cotton twill with antique brass slider closure',
    leadTime: 'Same-day in Dubai · 24h UAE wide',
    image: '/products/washed-dad-cap.jpg',
    illustrationType: 'cap',
    rating: 4.7,
    reviewCount: 88,
    description: 'A classic low-profile 6-panel silhouette with curved visor and structured front panels. Crafted specifically for high-definition 3D puff embroidery and micro-stitch lettering.',
    variants: [
      { colorName: 'Washed Black', colorHex: '#2A2C2E', inStock: true },
      { colorName: 'Sand Beige', colorHex: '#D8CEBE', inStock: true },
      { colorName: 'Dark Olive', colorHex: '#394033', inStock: true },
      { colorName: 'Navy Blue', colorHex: '#1F2B3B', inStock: true }
    ],
    tierPricing: [
      { range: '1–9 pcs', minQty: 1, maxQty: 9, pricePerUnit: 28, discountPercent: 0 },
      { range: '10–49 pcs', minQty: 10, maxQty: 49, pricePerUnit: 23, discountPercent: 17 },
      { range: '50–199 pcs', minQty: 50, maxQty: 199, pricePerUnit: 18, discountPercent: 35 },
      { range: '200+ pcs', minQty: 200, pricePerUnit: 15, discountPercent: 46 }
    ]
  },
  {
    id: 'dohar-mug-ceramic',
    slug: 'matte-ceramic-coffee-mug-350ml',
    title: 'Minimalist Matte Ceramic Mug (350ml)',
    category: 'drinkware',
    categoryLabel: 'Drinkware & Bottles',
    basePrice: 19,
    currency: 'AED',
    badge: 'Best Seller',
    specs: '350ml · Dishwasher Safe · UV Wrap or Screen',
    moq: 1,
    supportedMethods: ['Sublimation', 'UV', 'Screen'],
    material: 'High-fire ceramic stoneware with tactile satin exterior and glazed interior',
    leadTime: '24h in Dubai · 48h UAE wide',
    image: '/products/ceramic-mug.jpg',
    illustrationType: 'mug',
    rating: 4.9,
    reviewCount: 133,
    description: 'Modern cylindrical coffee mug with comfortable ergonomic C-handle. Coated with premium print sublimation primer ensuring crisp full-wrap graphics that never peel.',
    variants: [
      { colorName: 'Satin White', colorHex: '#FFFFFF', inStock: true },
      { colorName: 'Matte Charcoal', colorHex: '#252629', inStock: true },
      { colorName: 'Terracotta Warmth', colorHex: '#B25D42', inStock: true }
    ],
    tierPricing: [
      { range: '1–9 pcs', minQty: 1, maxQty: 9, pricePerUnit: 19, discountPercent: 0 },
      { range: '10–49 pcs', minQty: 10, maxQty: 49, pricePerUnit: 15, discountPercent: 21 },
      { range: '50–199 pcs', minQty: 50, maxQty: 199, pricePerUnit: 12, discountPercent: 36 },
      { range: '200+ pcs', minQty: 200, pricePerUnit: 9.5, discountPercent: 50 }
    ]
  },
  {
    id: 'dohar-notebook-pu',
    slug: 'debossed-hardcover-a5-notebook',
    title: 'Executive Debossed A5 Hardcover Journal',
    category: 'office',
    categoryLabel: 'Office & Stationery',
    basePrice: 24,
    currency: 'AED',
    badge: 'New',
    specs: 'A5 · 192 Pages 100 GSM · Blind Deboss / Foil',
    moq: 5,
    supportedMethods: ['UV', 'Screen'],
    material: 'Soft-touch thermo PU leather cover with FSC-certified 100 GSM cream acid-free lined pages',
    leadTime: '48h across Dubai & UAE',
    image: '/products/executive-notebook.jpg',
    illustrationType: 'notebook',
    rating: 4.8,
    reviewCount: 64,
    description: 'Executive journal engineered with expandable back inner pocket, matching elastic pen loop, and dual grosgrain ribbon bookmarks. Thermo-reactive cover allows stunning dark tonal debossing.',
    variants: [
      { colorName: 'Executive Black', colorHex: '#1E1F21', inStock: true },
      { colorName: 'Cognac Brown', colorHex: '#6F4E37', inStock: true },
      { colorName: 'Deep Teal', colorHex: '#1A3F44', inStock: true }
    ],
    tierPricing: [
      { range: '5–19 pcs', minQty: 5, maxQty: 19, pricePerUnit: 24, discountPercent: 0 },
      { range: '20–49 pcs', minQty: 20, maxQty: 49, pricePerUnit: 20, discountPercent: 16 },
      { range: '50–199 pcs', minQty: 50, maxQty: 199, pricePerUnit: 16, discountPercent: 33 },
      { range: '200+ pcs', minQty: 200, pricePerUnit: 13, discountPercent: 45 }
    ]
  },
  {
    id: 'dohar-giftset-luxury',
    slug: 'curated-uae-executive-gift-set',
    title: 'Curated UAE VIP Welcome Gift Hamper',
    category: 'gifting',
    categoryLabel: 'Corporate Gifting',
    basePrice: 155,
    currency: 'AED',
    badge: 'Express 24h',
    specs: 'Custom Box + 4 Branded Items · MOQ 5',
    moq: 5,
    supportedMethods: ['UV', 'Screen', 'Embroidery'],
    material: 'Rigid magnetic luxury presentation box with precision laser-cut EVA foam insert',
    leadTime: '3-4 business days · Custom mockups provided in 3 hours',
    image: '/products/vip-gift-set.jpg',
    illustrationType: 'giftbox',
    rating: 5.0,
    reviewCount: 76,
    description: 'The ultimate onboarding and executive client appreciation kit. Includes debossed PU journal, laser-engraved metal twist pen, matte stainless bottle, and bespoke greeting card.',
    variants: [
      { colorName: 'Matte Black Edition', colorHex: '#1A1B1D', inStock: true },
      { colorName: 'Desert Sand Edition', colorHex: '#DFD7C7', inStock: true }
    ],
    tierPricing: [
      { range: '5–19 sets', minQty: 5, maxQty: 19, pricePerUnit: 155, discountPercent: 0 },
      { range: '20–49 sets', minQty: 20, maxQty: 49, pricePerUnit: 135, discountPercent: 12 },
      { range: '50–199 sets', minQty: 50, maxQty: 199, pricePerUnit: 118, discountPercent: 23 },
      { range: '200+ sets', minQty: 200, pricePerUnit: 98, discountPercent: 36 }
    ]
  },
  {
    id: 'dohar-safety-vest',
    slug: 'high-visibility-reflective-safety-vest',
    title: 'Certified High-Vis Reflective Safety Vest',
    category: 'uniforms',
    categoryLabel: 'Uniforms & Workwear',
    basePrice: 16,
    currency: 'AED',
    badge: 'No MOQ',
    specs: 'EN ISO 20471 Certified · Front & Back Print',
    moq: 1,
    supportedMethods: ['Screen', 'DTF'],
    material: '120 GSM breathable neon warp-knit polyester with 2-inch high-visibility reflective bands',
    leadTime: 'Same-day in Dubai · Immediate batch delivery',
    image: '/products/safety-vest.jpg',
    illustrationType: 'vest',
    rating: 4.8,
    reviewCount: 92,
    description: 'Essential gear for UAE construction supervisors, site engineers, event security teams, and logistical operations. Features secure zipper front closure and mic tab.',
    variants: [
      { colorName: 'Fluorescent Yellow', colorHex: '#D5E627', inStock: true },
      { colorName: 'Fluorescent Orange', colorHex: '#FF7322', inStock: true }
    ],
    tierPricing: [
      { range: '1–9 pcs', minQty: 1, maxQty: 9, pricePerUnit: 16, discountPercent: 0 },
      { range: '10–49 pcs', minQty: 10, maxQty: 49, pricePerUnit: 12.5, discountPercent: 21 },
      { range: '50–199 pcs', minQty: 50, maxQty: 199, pricePerUnit: 9.8, discountPercent: 38 },
      { range: '200+ pcs', minQty: 200, pricePerUnit: 7.9, discountPercent: 50 }
    ]
  }
];

export const PRINT_METHODS_INFO = [
  {
    id: 'dtf',
    name: 'Direct-to-Film (DTF)',
    shortCode: 'DTF',
    bestFor: 'Complex full-color graphics, photographic gradients, unlimited colors on any cotton or poly blend.',
    feel: 'Smooth, flexible film transfer with exceptional elasticity and zero crackling.',
    durability: '60+ machine washes at 40°C with no fading.',
    turnaround: 'Same-day to 24 hours in Dubai.',
    minOrder: '1 piece (No MOQ)',
    cmykAccent: '#29abe1'
  },
  {
    id: 'screen',
    name: 'Industrial Screen Printing',
    shortCode: 'SCREEN',
    bestFor: 'Large volume apparel, 1 to 4 pantone-matched spot colors, uniforms, event tees.',
    feel: 'Soft-hand plastisol or water-based inks that fuse seamlessly into the fabric fibers.',
    durability: 'Industry gold standard, 100+ washes.',
    turnaround: '2 to 3 days for bulk batches.',
    minOrder: '25 pieces recommended for cost efficiency',
    cmykAccent: '#faec1c'
  },
  {
    id: 'embroidery',
    name: 'Precision Computerized Embroidery',
    shortCode: 'EMB',
    bestFor: 'Polos, executive jackets, structured caps, beanies, aprons, and premium uniform crests.',
    feel: 'High-density Madeira thread with tactile 3D relief or flat satin finish.',
    durability: 'Lifetime garment durability; withstands high-heat industrial laundering.',
    turnaround: '24 to 48 hours.',
    minOrder: '1 piece (No MOQ)',
    cmykAccent: '#e80f8a'
  },
  {
    id: 'uv',
    name: 'Rotary & Flatbed UV Printing',
    shortCode: 'UV PRINT',
    bestFor: 'Rigid surfaces: water bottles, metal pens, acrylic plaques, electronic accessories, power banks.',
    feel: 'Instant-cured UV polymer with crisp micro-embossed tactile texture.',
    durability: 'Scratch-resistant, water-proof, UV-stable in Middle Eastern heat.',
    turnaround: 'Same-day to 24 hours.',
    minOrder: '1 piece (No MOQ)',
    cmykAccent: '#211f1f'
  }
];

export const MOCK_ORDERS: Record<string, OrderTrackResult> = {
  'DOH-8924': {
    orderNumber: 'DOH-8924',
    customerName: 'Jumeirah Hospitality Group',
    itemsSummary: '75 × Heavyweight Oversized T-Shirt (Jet Black) with 2-Color Screen Print',
    currentStatus: 'Out for Delivery',
    estimatedDelivery: 'Today, 2:30 PM – 4:30 PM',
    deliveryCity: 'Dubai Marina, UAE',
    timeline: [
      {
        title: 'Digital Proof Approved',
        description: 'Customer approved digital CMYK proof and Pantone color alignment.',
        timestamp: 'Yesterday, 09:15 AM',
        completed: true,
        current: false
      },
      {
        title: 'Precision Print Production',
        description: 'Printed at DOHAR Textiles Production Facility, Al Quoz 3.',
        timestamp: 'Yesterday, 04:30 PM',
        completed: true,
        current: false
      },
      {
        title: 'Quality Control & Finishing',
        description: 'Heat-press curing inspection and individual eco-poly bagging passed.',
        timestamp: 'Today, 08:20 AM',
        completed: true,
        current: false
      },
      {
        title: 'Out for Delivery via Express Courier',
        description: 'Driver dispatched with delivery scheduled before 4:30 PM.',
        timestamp: 'Today, 10:45 AM',
        completed: false,
        current: true
      },
      {
        title: 'Delivered',
        description: 'Recipient sign-off and digital proof of receipt.',
        timestamp: 'Estimated 3:00 PM',
        completed: false,
        current: false
      }
    ]
  },
  'DOH-7102': {
    orderNumber: 'DOH-7102',
    customerName: 'Fintech Hub ADGM',
    itemsSummary: '120 × Executive Debossed A5 Journal & Matte Insulated Bottle Gift Sets',
    currentStatus: 'In Production',
    estimatedDelivery: 'Tomorrow, by 12:00 PM',
    deliveryCity: 'Al Maryah Island, Abu Dhabi',
    timeline: [
      {
        title: 'Digital Proof Approved',
        description: 'Foil deboss dies created and digital mockups signed off.',
        timestamp: '23 Sep, 11:00 AM',
        completed: true,
        current: false
      },
      {
        title: 'Hot Foil Stamping & Rotary UV Printing',
        description: 'Currently run on automated rotary UV lines at our production center.',
        timestamp: '24 Sep, 07:30 AM',
        completed: false,
        current: true
      },
      {
        title: 'Gift Box Assembly & Custom Sleeve Packing',
        description: 'EVA foam cutouts assembled with branded seals.',
        timestamp: 'Scheduled today 4:00 PM',
        completed: false,
        current: false
      },
      {
        title: 'Dispatched to Abu Dhabi Hub',
        description: 'Transferred to direct temperature-controlled courier van.',
        timestamp: 'Scheduled tomorrow 08:00 AM',
        completed: false,
        current: false
      },
      {
        title: 'Delivered',
        description: 'Delivery confirmation at ADGM Tower.',
        timestamp: 'Scheduled tomorrow 12:00 PM',
        completed: false,
        current: false
      }
    ]
  }
};

export const FAQ_ITEMS = [
  {
    question: 'What is your turnaround time for orders in Dubai and the wider UAE?',
    answer: 'For standard items (T-shirts, hoodies, caps, totes, drinkware) with DTF or UV printing, we offer same-day dispatch for orders approved before 11:00 AM in Dubai. Standard orders take 24 to 48 hours for Abu Dhabi, Sharjah, Ajman, and Ras Al Khaimah. Large bulk orders (500+ pcs) typically take 3 to 5 business days.'
  },
  {
    question: 'Are there really no minimum order quantities (No MOQ)?',
    answer: 'Yes! You can order as few as 1 single personalized t-shirt, hoodie, or mug using our modern Direct-to-Film (DTF) and UV flatbed printing technology. However, we also provide progressive bulk pricing tiers with discounts up to 50% for 100+ units.'
  },
  {
    question: 'Can I approve a physical or digital proof before mass production?',
    answer: 'Always. Within 2 to 3 hours of submitting your order or vector artwork, our prepress team shares an exact 1:1 digital proof showing CMYK registration, print dimensions (in centimeters), placement coordinates, and Pantone color matches. For bulk orders over 100 units, we can also rush a physical sample to your UAE office.'
  },
  {
    question: 'How do I submit artwork and which file formats are accepted?',
    answer: 'We accept vector formats (AI, EPS, PDF, SVG) as well as high-resolution PNGs (minimum 300 DPI with transparent background). If you only have a low-resolution JPG or hand sketch, our in-house studio will vectorize and clean up your artwork free of charge.'
  },
  {
    question: 'Can I pay via Corporate Invoice or Cash/Transfer on Delivery in the UAE?',
    answer: 'Yes. We accept UAE credit/debit cards, Apple Pay, bank transfers to our Emirates NBD account, and Net-30 payment terms for pre-approved UAE corporate accounts and government entities. Cash on Delivery is also available for retail orders under AED 500.'
  },
  {
    question: 'Do you offer corporate gifting for Ramadan, Eid, and UAE National Day?',
    answer: 'Absolutely. We specialize in custom-tailored seasonal corporate hampers, including debossed leather goods, Arabic calligraphy engraving, luxury dates boxes, and bespoke commemorative gifts with custom gold/silver foil packaging.'
  }
];
