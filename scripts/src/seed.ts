import { db } from "@workspace/db";
import {
  regionsTable,
  citiesTable,
  categoriesTable,
  productsTable,
  ordersTable,
} from "@workspace/db/schema";

async function seed() {
  const seedMode = process.env.SEED_MODE === "bootstrap" ? "bootstrap" : "reset";
  console.log(`Seeding database in ${seedMode} mode...`);

  if (seedMode === "reset") {
    // Delete child tables first so reruns do not fail on foreign keys.
    await db.delete(ordersTable);
    await db.delete(productsTable);
    await db.delete(categoriesTable);
    await db.delete(citiesTable);
    await db.delete(regionsTable);
    console.log("Cleared existing orders, products, categories, cities, and regions");
  }

  // REGIONS (58 Algerian Wilayas)
  const regions = [
    { code: "01", name: "Adrar", nameAr: "أدرار", nameFr: "Adrar" },
    { code: "02", name: "Chlef", nameAr: "الشلف", nameFr: "Chlef" },
    { code: "03", name: "Laghouat", nameAr: "الأغواط", nameFr: "Laghouat" },
    { code: "04", name: "Oum El Bouaghi", nameAr: "أم البواقي", nameFr: "Oum El Bouaghi" },
    { code: "05", name: "Batna", nameAr: "باتنة", nameFr: "Batna" },
    { code: "06", name: "Béjaïa", nameAr: "بجاية", nameFr: "Béjaïa" },
    { code: "07", name: "Biskra", nameAr: "بسكرة", nameFr: "Biskra" },
    { code: "08", name: "Béchar", nameAr: "بشار", nameFr: "Béchar" },
    { code: "09", name: "Blida", nameAr: "البليدة", nameFr: "Blida" },
    { code: "10", name: "Bouira", nameAr: "البويرة", nameFr: "Bouira" },
    { code: "11", name: "Tamanrasset", nameAr: "تمنراست", nameFr: "Tamanrasset" },
    { code: "12", name: "Tébessa", nameAr: "تبسة", nameFr: "Tébessa" },
    { code: "13", name: "Tlemcen", nameAr: "تلمسان", nameFr: "Tlemcen" },
    { code: "14", name: "Tiaret", nameAr: "تيارت", nameFr: "Tiaret" },
    { code: "15", name: "Tizi Ouzou", nameAr: "تيزي وزو", nameFr: "Tizi Ouzou" },
    { code: "16", name: "Alger", nameAr: "الجزائر", nameFr: "Alger" },
    { code: "17", name: "Djelfa", nameAr: "الجلفة", nameFr: "Djelfa" },
    { code: "18", name: "Jijel", nameAr: "جيجل", nameFr: "Jijel" },
    { code: "19", name: "Sétif", nameAr: "سطيف", nameFr: "Sétif" },
    { code: "20", name: "Saïda", nameAr: "سعيدة", nameFr: "Saïda" },
    { code: "21", name: "Skikda", nameAr: "سكيكدة", nameFr: "Skikda" },
    { code: "22", name: "Sidi Bel Abbès", nameAr: "سيدي بلعباس", nameFr: "Sidi Bel Abbès" },
    { code: "23", name: "Annaba", nameAr: "عنابة", nameFr: "Annaba" },
    { code: "24", name: "Guelma", nameAr: "قالمة", nameFr: "Guelma" },
    { code: "25", name: "Constantine", nameAr: "قسنطينة", nameFr: "Constantine" },
    { code: "26", name: "Médéa", nameAr: "المدية", nameFr: "Médéa" },
    { code: "27", name: "Mostaganem", nameAr: "مستغانم", nameFr: "Mostaganem" },
    { code: "28", name: "M'Sila", nameAr: "المسيلة", nameFr: "M'Sila" },
    { code: "29", name: "Mascara", nameAr: "معسكر", nameFr: "Mascara" },
    { code: "30", name: "Ouargla", nameAr: "ورقلة", nameFr: "Ouargla" },
    { code: "31", name: "Oran", nameAr: "وهران", nameFr: "Oran" },
    { code: "32", name: "El Bayadh", nameAr: "البيض", nameFr: "El Bayadh" },
    { code: "33", name: "Illizi", nameAr: "إليزي", nameFr: "Illizi" },
    { code: "34", name: "Bordj Bou Arréridj", nameAr: "برج بوعريريج", nameFr: "Bordj Bou Arréridj" },
    { code: "35", name: "Boumerdès", nameAr: "بومرداس", nameFr: "Boumerdès" },
    { code: "36", name: "El Tarf", nameAr: "الطارف", nameFr: "El Tarf" },
    { code: "37", name: "Tindouf", nameAr: "تندوف", nameFr: "Tindouf" },
    { code: "38", name: "Tissemsilt", nameAr: "تيسمسيلت", nameFr: "Tissemsilt" },
    { code: "39", name: "El Oued", nameAr: "الوادي", nameFr: "El Oued" },
    { code: "40", name: "Khenchela", nameAr: "خنشلة", nameFr: "Khenchela" },
    { code: "41", name: "Souk Ahras", nameAr: "سوق أهراس", nameFr: "Souk Ahras" },
    { code: "42", name: "Tipaza", nameAr: "تيبازة", nameFr: "Tipaza" },
    { code: "43", name: "Mila", nameAr: "ميلة", nameFr: "Mila" },
    { code: "44", name: "Aïn Defla", nameAr: "عين الدفلى", nameFr: "Aïn Defla" },
    { code: "45", name: "Naâma", nameAr: "النعامة", nameFr: "Naâma" },
    { code: "46", name: "Aïn Témouchent", nameAr: "عين تيموشنت", nameFr: "Aïn Témouchent" },
    { code: "47", name: "Ghardaïa", nameAr: "غرداية", nameFr: "Ghardaïa" },
    { code: "48", name: "Relizane", nameAr: "غليزان", nameFr: "Relizane" },
    { code: "49", name: "El M'Ghair", nameAr: "المغير", nameFr: "El M'Ghair" },
    { code: "50", name: "El Meniaa", nameAr: "المنيعة", nameFr: "El Meniaa" },
    { code: "51", name: "Ouled Djellal", nameAr: "أولاد جلال", nameFr: "Ouled Djellal" },
    { code: "52", name: "Bordj Baji Mokhtar", nameAr: "برج باجي مختار", nameFr: "Bordj Baji Mokhtar" },
    { code: "53", name: "Béni Abbès", nameAr: "بني عباس", nameFr: "Béni Abbès" },
    { code: "54", name: "Timimoun", nameAr: "تيميمون", nameFr: "Timimoun" },
    { code: "55", name: "Touggourt", nameAr: "تقرت", nameFr: "Touggourt" },
    { code: "56", name: "Djanet", nameAr: "جانت", nameFr: "Djanet" },
    { code: "57", name: "In Salah", nameAr: "عين صالح", nameFr: "In Salah" },
    { code: "58", name: "In Guezzam", nameAr: "عين قزام", nameFr: "In Guezzam" },
  ];

  const existingRegions = seedMode === "bootstrap" ? await db.select().from(regionsTable) : [];
  const existingRegionCodes = new Set(existingRegions.map((region) => region.code));
  const missingRegions = regions.filter((region) => !existingRegionCodes.has(region.code));

  if (missingRegions.length > 0) {
    await db.insert(regionsTable).values(missingRegions);
  }

  const availableRegions = await db.select().from(regionsTable);
  if (seedMode === "reset") {
    console.log(`Inserted ${availableRegions.length} regions`);
  } else if (missingRegions.length > 0) {
    console.log(`Inserted ${missingRegions.length} missing regions`);
  } else {
    console.log(`Skipped regions; ${availableRegions.length} already present`);
  }

  // CITIES (major cities per wilaya)
  const algerId = availableRegions.find(r => r.code === "16")!.id;
  const oranId = availableRegions.find(r => r.code === "31")!.id;
  const constantineId = availableRegions.find(r => r.code === "25")!.id;
  const annId = availableRegions.find(r => r.code === "23")!.id;
  const setifId = availableRegions.find(r => r.code === "19")!.id;
  const tiziId = availableRegions.find(r => r.code === "15")!.id;
  const blidaId = availableRegions.find(r => r.code === "09")!.id;
  const batnaId = availableRegions.find(r => r.code === "05")!.id;

  const cities = [
    { name: "Algiers", nameAr: "الجزائر العاصمة", nameFr: "Alger Centre", regionId: algerId },
    { name: "Bab El Oued", nameAr: "باب الواد", nameFr: "Bab El Oued", regionId: algerId },
    { name: "El Harrach", nameAr: "الحراش", nameFr: "El Harrach", regionId: algerId },
    { name: "Kouba", nameAr: "القبة", nameFr: "Kouba", regionId: algerId },
    { name: "Dar El Beïda", nameAr: "دار البيضاء", nameFr: "Dar El Beïda", regionId: algerId },
    { name: "Oran", nameAr: "وهران", nameFr: "Oran Centre", regionId: oranId },
    { name: "Es Senia", nameAr: "السانية", nameFr: "Es Senia", regionId: oranId },
    { name: "Bir El Djir", nameAr: "بئر الجير", nameFr: "Bir El Djir", regionId: oranId },
    { name: "Constantine", nameAr: "قسنطينة", nameFr: "Constantine Centre", regionId: constantineId },
    { name: "El Khroub", nameAr: "الخروب", nameFr: "El Khroub", regionId: constantineId },
    { name: "Annaba", nameAr: "عنابة", nameFr: "Annaba Centre", regionId: annId },
    { name: "El Bouni", nameAr: "البوني", nameFr: "El Bouni", regionId: annId },
    { name: "Sétif", nameAr: "سطيف", nameFr: "Sétif Centre", regionId: setifId },
    { name: "El Eulma", nameAr: "العلمة", nameFr: "El Eulma", regionId: setifId },
    { name: "Tizi Ouzou", nameAr: "تيزي وزو", nameFr: "Tizi Ouzou Centre", regionId: tiziId },
    { name: "Azazga", nameAr: "عزازقة", nameFr: "Azazga", regionId: tiziId },
    { name: "Blida", nameAr: "البليدة", nameFr: "Blida Centre", regionId: blidaId },
    { name: "Boufarik", nameAr: "بوفاريك", nameFr: "Boufarik", regionId: blidaId },
    { name: "Batna", nameAr: "باتنة", nameFr: "Batna Centre", regionId: batnaId },
    { name: "Barika", nameAr: "بريكة", nameFr: "Barika", regionId: batnaId },
  ];

  const existingCities = seedMode === "bootstrap" ? await db.select().from(citiesTable) : [];
  const existingCityKeys = new Set(existingCities.map((city) => `${city.regionId}:${city.name}`));
  const missingCities = cities.filter((city) => !existingCityKeys.has(`${city.regionId}:${city.name}`));

  if (missingCities.length > 0) {
    await db.insert(citiesTable).values(missingCities);
  }

  const availableCities = await db.select().from(citiesTable);
  if (seedMode === "reset") {
    console.log(`Inserted ${availableCities.length} cities`);
  } else if (missingCities.length > 0) {
    console.log(`Inserted ${missingCities.length} missing cities`);
  } else {
    console.log(`Skipped cities; ${availableCities.length} already present`);
  }

  // CATEGORIES
  const categories = [
    {
      name: "Electronics",
      nameAr: "إلكترونيات",
      nameFr: "Électronique",
      description: "Smartphones, laptops, tablets and more",
      descriptionAr: "هواتف ذكية وحواسيب ومستلزمات إلكترونية",
      descriptionFr: "Smartphones, ordinateurs, tablettes et plus",
      slug: "electronics",
      icon: "Smartphone",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
      sortOrder: 1,
    },
    {
      name: "Fashion",
      nameAr: "أزياء وملابس",
      nameFr: "Mode & Vêtements",
      description: "Clothing, shoes and accessories",
      descriptionAr: "ملابس وأحذية وإكسسوارات للرجال والنساء",
      descriptionFr: "Vêtements, chaussures et accessoires pour homme et femme",
      slug: "fashion",
      icon: "Shirt",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      sortOrder: 2,
    },
    {
      name: "Home & Kitchen",
      nameAr: "المنزل والمطبخ",
      nameFr: "Maison & Cuisine",
      description: "Furniture, appliances and kitchen essentials",
      descriptionAr: "أثاث ومستلزمات المنزل والمطبخ",
      descriptionFr: "Meubles, appareils électroménagers et ustensiles de cuisine",
      slug: "home-kitchen",
      icon: "Home",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      sortOrder: 3,
    },
    {
      name: "Sports & Fitness",
      nameAr: "رياضة ولياقة",
      nameFr: "Sport & Fitness",
      description: "Sports equipment and fitness gear",
      descriptionAr: "معدات رياضية وأدوات اللياقة البدنية",
      descriptionFr: "Équipements sportifs et matériel de fitness",
      slug: "sports-fitness",
      icon: "Dumbbell",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
      sortOrder: 4,
    },
    {
      name: "Beauty & Health",
      nameAr: "الجمال والصحة",
      nameFr: "Beauté & Santé",
      description: "Cosmetics, skincare and health products",
      descriptionAr: "مستحضرات تجميل وعناية بالبشرة ومنتجات صحية",
      descriptionFr: "Cosmétiques, soins de la peau et produits de santé",
      slug: "beauty-health",
      icon: "Heart",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      sortOrder: 5,
    },
    {
      name: "Books & Education",
      nameAr: "كتب وتعليم",
      nameFr: "Livres & Éducation",
      description: "Books, stationery and educational materials",
      descriptionAr: "كتب وقرطاسية ومواد تعليمية",
      descriptionFr: "Livres, papeterie et matériaux éducatifs",
      slug: "books-education",
      icon: "BookOpen",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      sortOrder: 6,
    },
    {
      name: "Food & Groceries",
      nameAr: "غذاء وبقالة",
      nameFr: "Alimentation & Épicerie",
      description: "Traditional Algerian food and grocery items",
      descriptionAr: "أغذية جزائرية تقليدية ومواد بقالة",
      descriptionFr: "Alimentation traditionnelle algérienne et épicerie",
      slug: "food-groceries",
      icon: "ShoppingBag",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
      sortOrder: 7,
    },
    {
      name: "Automotive",
      nameAr: "سيارات وقطع غيار",
      nameFr: "Auto & Pièces détachées",
      description: "Car accessories and spare parts",
      descriptionAr: "إكسسوارات السيارات وقطع الغيار",
      descriptionFr: "Accessoires auto et pièces détachées",
      slug: "automotive",
      icon: "Car",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
      sortOrder: 8,
    },
    {
      name: "Baby & Kids",
      nameAr: "أطفال ورضع",
      nameFr: "Bébé & Enfants",
      description: "Baby products, toys and kids clothing",
      descriptionAr: "منتجات الأطفال والألعاب وملابس الأطفال",
      descriptionFr: "Produits bébé, jouets et vêtements enfants",
      slug: "baby-kids",
      icon: "Baby",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
      sortOrder: 9,
    },
    {
      name: "Tools & Hardware",
      nameAr: "أدوات وأعمال",
      nameFr: "Outils & Bricolage",
      description: "Hand tools, power tools and hardware",
      descriptionAr: "أدوات يدوية وكهربائية ومعدات بناء",
      descriptionFr: "Outils manuels, électriques et matériaux de construction",
      slug: "tools-hardware",
      icon: "Wrench",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
      sortOrder: 10,
    },
  ];

  const existingCategories = seedMode === "bootstrap" ? await db.select().from(categoriesTable) : [];
  const existingCategorySlugs = new Set(existingCategories.map((category) => category.slug));
  const missingCategories = categories.filter((category) => !existingCategorySlugs.has(category.slug));

  if (missingCategories.length > 0) {
    await db.insert(categoriesTable).values(missingCategories);
  }

  const availableCategories = await db.select().from(categoriesTable);
  if (seedMode === "reset") {
    console.log(`Inserted ${availableCategories.length} categories`);
  } else if (missingCategories.length > 0) {
    console.log(`Inserted ${missingCategories.length} missing categories`);
  } else {
    console.log(`Skipped categories; ${availableCategories.length} already present`);
  }

  const catMap = Object.fromEntries(availableCategories.map(c => [c.slug, c.id]));

  // PRODUCTS
  const products = [
    // Electronics
    {
      name: "Samsung Galaxy A54",
      nameAr: "سامسونج جالاكسي A54",
      nameFr: "Samsung Galaxy A54",
      description: "6.4-inch Super AMOLED display, 5000mAh battery, 128GB storage",
      descriptionAr: "شاشة سوبر أموليد 6.4 بوصة، بطارية 5000 مللي أمبير، تخزين 128 جيجابايت",
      descriptionFr: "Écran Super AMOLED 6,4 pouces, batterie 5000mAh, stockage 128Go",
      slug: "samsung-galaxy-a54",
      price: "65000.00",
      originalPrice: "75000.00",
      discount: 13,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
      images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800", "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800"],
      inStock: true,
      stockQty: 45,
      rating: "4.50",
      reviewCount: 127,
      categoryId: catMap["electronics"],
      brand: "Samsung",
      featured: true,
      specifications: [
        { key: "Display", keyAr: "الشاشة", value: "6.4\" Super AMOLED", valueAr: "6.4 بوصة سوبر أموليد" },
        { key: "Battery", keyAr: "البطارية", value: "5000mAh", valueAr: "5000 مللي أمبير" },
        { key: "Storage", keyAr: "التخزين", value: "128GB", valueAr: "128 جيجابايت" },
        { key: "Camera", keyAr: "الكاميرا", value: "50MP Triple", valueAr: "50 ميجابكسل ثلاثية" },
      ],
    },
    {
      name: "Xiaomi Redmi Note 12",
      nameAr: "شاومي ريدمي نوت 12",
      nameFr: "Xiaomi Redmi Note 12",
      description: "AMOLED display, 5000mAh, 4G, 64MP camera",
      descriptionAr: "شاشة أموليد، بطارية 5000، 4G، كاميرا 64 ميجابكسل",
      descriptionFr: "Écran AMOLED, 5000mAh, 4G, caméra 64MP",
      slug: "xiaomi-redmi-note-12",
      price: "42000.00",
      originalPrice: "48000.00",
      discount: 13,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
      images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"],
      inStock: true,
      stockQty: 80,
      rating: "4.30",
      reviewCount: 215,
      categoryId: catMap["electronics"],
      brand: "Xiaomi",
      featured: true,
    },
    {
      name: "Laptop HP 250 G9",
      nameAr: "لابتوب HP 250 G9",
      nameFr: "Ordinateur portable HP 250 G9",
      description: "Intel Core i5, 8GB RAM, 512GB SSD, Windows 11",
      descriptionAr: "معالج إنتل كور i5، ذاكرة 8 جيجا، SSD 512 جيجا، ويندوز 11",
      descriptionFr: "Intel Core i5, 8Go RAM, SSD 512Go, Windows 11",
      slug: "laptop-hp-250-g9",
      price: "120000.00",
      originalPrice: "135000.00",
      discount: 11,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800"],
      inStock: true,
      stockQty: 20,
      rating: "4.60",
      reviewCount: 89,
      categoryId: catMap["electronics"],
      brand: "HP",
      featured: true,
    },
    {
      name: "TWS Bluetooth Earbuds",
      nameAr: "سماعات بلوتوث لاسلكية",
      nameFr: "Écouteurs Bluetooth TWS",
      description: "Active Noise Cancelling, 30h battery, IPX5 waterproof",
      descriptionAr: "إلغاء الضوضاء النشط، 30 ساعة بطارية، مقاوم للماء IPX5",
      descriptionFr: "Réduction de bruit active, 30h autonomie, résistant à l'eau IPX5",
      slug: "tws-bluetooth-earbuds",
      price: "8500.00",
      originalPrice: "12000.00",
      discount: 29,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
      images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800"],
      inStock: true,
      stockQty: 150,
      rating: "4.20",
      reviewCount: 342,
      categoryId: catMap["electronics"],
      brand: "Generic",
    },
    {
      name: "Smart TV 43 inch",
      nameAr: "تلفاز ذكي 43 بوصة",
      nameFr: "Smart TV 43 pouces",
      description: "4K Ultra HD, Android TV, WiFi, 3 HDMI ports",
      descriptionAr: "دقة 4K فائقة الوضوح، أندرويد تي في، واي فاي، 3 منافذ HDMI",
      descriptionFr: "4K Ultra HD, Android TV, WiFi, 3 ports HDMI",
      slug: "smart-tv-43-inch",
      price: "85000.00",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400",
      images: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800"],
      inStock: true,
      stockQty: 25,
      rating: "4.40",
      reviewCount: 56,
      categoryId: catMap["electronics"],
      brand: "Hisense",
    },
    // Fashion
    {
      name: "Men's Traditional Burnous",
      nameAr: "برنوس رجالي تقليدي",
      nameFr: "Burnous traditionnel homme",
      description: "Authentic Algerian wool burnous, handcrafted",
      descriptionAr: "برنوس جزائري أصيل من الصوف، مصنوع يدوياً",
      descriptionFr: "Burnous algérien authentique en laine, fait main",
      slug: "mens-traditional-burnous",
      price: "15000.00",
      image: "https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=400",
      images: ["https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=800"],
      inStock: true,
      stockQty: 30,
      rating: "4.80",
      reviewCount: 43,
      categoryId: catMap["fashion"],
      brand: "Artisanat DZ",
      featured: true,
    },
    {
      name: "Women's Karakou Jacket",
      nameAr: "جاكيت كراكو نسائي",
      nameFr: "Veste Karakou femme",
      description: "Traditional embroidered Algerian velvet jacket",
      descriptionAr: "جاكيت مخملي جزائري تقليدي مطرز",
      descriptionFr: "Veste en velours algérien traditionnel brodé",
      slug: "womens-karakou-jacket",
      price: "22000.00",
      image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400",
      images: ["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800"],
      inStock: true,
      stockQty: 15,
      rating: "4.90",
      reviewCount: 28,
      categoryId: catMap["fashion"],
      brand: "Artisanat DZ",
    },
    {
      name: "Running Shoes Nike Air",
      nameAr: "حذاء ركض نايك إير",
      nameFr: "Chaussures de running Nike Air",
      description: "Lightweight, breathable mesh, cushioned sole",
      descriptionAr: "خفيف الوزن، شبكة تنفس، نعل مبطن",
      descriptionFr: "Mesh léger et respirant, semelle amortie",
      slug: "running-shoes-nike-air",
      price: "18500.00",
      originalPrice: "22000.00",
      discount: 16,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
      inStock: true,
      stockQty: 60,
      rating: "4.50",
      reviewCount: 178,
      categoryId: catMap["fashion"],
      brand: "Nike",
      featured: true,
    },
    {
      name: "Men's Polo Shirt",
      nameAr: "قميص بولو رجالي",
      nameFr: "Polo homme",
      description: "100% cotton, classic fit, available in multiple colors",
      descriptionAr: "قطن 100٪، مقاس كلاسيكي، متوفر بألوان متعددة",
      descriptionFr: "100% coton, coupe classique, disponible en plusieurs couleurs",
      slug: "mens-polo-shirt",
      price: "2800.00",
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
      images: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800"],
      inStock: true,
      stockQty: 200,
      rating: "4.10",
      reviewCount: 95,
      categoryId: catMap["fashion"],
    },
    // Home & Kitchen
    {
      name: "Tagine Dish Set",
      nameAr: "طاجين تقليدي",
      nameFr: "Tajine traditionnel",
      description: "Handmade clay tagine, authentic North African cooking pot",
      descriptionAr: "طاجين من الطين مصنوع يدوياً، إناء طهي شمال أفريقي أصيل",
      descriptionFr: "Tajine en argile fait main, plat de cuisson nord-africain authentique",
      slug: "tagine-dish-set",
      price: "3500.00",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
      images: ["https://images.unsplash.com/photo-1547592180-85f173990554?w=800"],
      inStock: true,
      stockQty: 75,
      rating: "4.70",
      reviewCount: 62,
      categoryId: catMap["home-kitchen"],
      brand: "Artisanat DZ",
      featured: true,
    },
    {
      name: "Coffee Machine Espresso",
      nameAr: "ماكينة قهوة إسبريسو",
      nameFr: "Machine à café Espresso",
      description: "15 bar pressure, 1.5L water tank, milk frother included",
      descriptionAr: "ضغط 15 بار، خزان ماء 1.5 لتر، رغوة الحليب مضمنة",
      descriptionFr: "Pression 15 bars, réservoir 1,5L, mousseur à lait inclus",
      slug: "coffee-machine-espresso",
      price: "28000.00",
      originalPrice: "35000.00",
      discount: 20,
      image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400",
      images: ["https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800"],
      inStock: true,
      stockQty: 18,
      rating: "4.50",
      reviewCount: 84,
      categoryId: catMap["home-kitchen"],
      brand: "DeLonghi",
    },
    {
      name: "Sofa 3+2 Set",
      nameAr: "طقم كنبة 3+2",
      nameFr: "Canapé 3+2 places",
      description: "Modern fabric sofa set, 3-seater + 2-seater, available in multiple colors",
      descriptionAr: "طقم كنبة قماش حديث، 3 مقاعد + 2 مقاعد، بألوان متعددة",
      descriptionFr: "Canapé moderne en tissu, 3+2 places, disponible en plusieurs couleurs",
      slug: "sofa-3-2-set",
      price: "95000.00",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"],
      inStock: true,
      stockQty: 8,
      rating: "4.30",
      reviewCount: 37,
      categoryId: catMap["home-kitchen"],
    },
    // Sports & Fitness
    {
      name: "Yoga Mat Professional",
      nameAr: "حصيرة يوغا احترافية",
      nameFr: "Tapis de yoga professionnel",
      description: "6mm thick, non-slip, eco-friendly TPE material",
      descriptionAr: "سماكة 6 ملم، مضادة للانزلاق، مادة TPE صديقة للبيئة",
      descriptionFr: "6mm d'épaisseur, antidérapant, matière TPE écologique",
      slug: "yoga-mat-professional",
      price: "4500.00",
      originalPrice: "6000.00",
      discount: 25,
      image: "https://images.unsplash.com/photo-1601925228842-ad7f7c5c75e6?w=400",
      images: ["https://images.unsplash.com/photo-1601925228842-ad7f7c5c75e6?w=800"],
      inStock: true,
      stockQty: 120,
      rating: "4.60",
      reviewCount: 203,
      categoryId: catMap["sports-fitness"],
    },
    {
      name: "Football Official Size 5",
      nameAr: "كرة قدم رسمية مقاس 5",
      nameFr: "Ballon de football taille 5 officiel",
      description: "FIFA approved, size 5, durable PU leather",
      descriptionAr: "معتمد من الفيفا، مقاس 5، جلد بولي يوريثان متين",
      descriptionFr: "Approuvé FIFA, taille 5, cuir PU durable",
      slug: "football-official-size-5",
      price: "3200.00",
      image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=400",
      images: ["https://images.unsplash.com/photo-1614632537190-23e4146777db?w=800"],
      inStock: true,
      stockQty: 250,
      rating: "4.40",
      reviewCount: 156,
      categoryId: catMap["sports-fitness"],
      featured: true,
    },
    // Beauty & Health
    {
      name: "Argan Oil Pure 100ml",
      nameAr: "زيت أرغان نقي 100 مل",
      nameFr: "Huile d'Argan pure 100ml",
      description: "100% pure Moroccan argan oil, cold pressed, for hair & skin",
      descriptionAr: "زيت أرغان مغربي نقي 100٪، مضغوط بارد، للشعر والبشرة",
      descriptionFr: "Huile d'argan marocaine 100% pure, pressée à froid, pour cheveux & peau",
      slug: "argan-oil-pure-100ml",
      price: "2800.00",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400",
      images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800"],
      inStock: true,
      stockQty: 400,
      rating: "4.80",
      reviewCount: 521,
      categoryId: catMap["beauty-health"],
      featured: true,
    },
    {
      name: "Traditional Moroccan Soap",
      nameAr: "صابون غار بلدي",
      nameFr: "Savon beldi traditionnel",
      description: "Natural black soap with eucalyptus, traditional hammam soap",
      descriptionAr: "صابون أسود طبيعي بالأوكاليبتوس، صابون الحمام التقليدي",
      descriptionFr: "Savon noir naturel à l'eucalyptus, savon de hammam traditionnel",
      slug: "traditional-beldi-soap",
      price: "900.00",
      image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400",
      images: ["https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800"],
      inStock: true,
      stockQty: 800,
      rating: "4.70",
      reviewCount: 287,
      categoryId: catMap["beauty-health"],
    },
    // Books & Education
    {
      name: "Learn Arabic Dictionary",
      nameAr: "قاموس تعلم العربية",
      nameFr: "Dictionnaire d'apprentissage de l'arabe",
      description: "Comprehensive Arabic-French dictionary, 50,000 entries",
      descriptionAr: "قاموس عربي-فرنسي شامل، 50,000 مدخل",
      descriptionFr: "Dictionnaire arabe-français complet, 50 000 entrées",
      slug: "learn-arabic-dictionary",
      price: "2200.00",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800"],
      inStock: true,
      stockQty: 150,
      rating: "4.50",
      reviewCount: 78,
      categoryId: catMap["books-education"],
    },
    // Food & Groceries
    {
      name: "Dates Deglet Nour Premium",
      nameAr: "تمر دقلة نور ممتاز",
      nameFr: "Dattes Deglet Nour premium",
      description: "Premium Biskra dates, 1kg box, naturally sweet",
      descriptionAr: "تمر بسكرة الممتاز، علبة 1 كيلو، حلاوة طبيعية",
      descriptionFr: "Dattes premium de Biskra, boite 1kg, naturellement sucrées",
      slug: "dates-deglet-nour-premium",
      price: "1800.00",
      image: "https://images.unsplash.com/photo-1630350066851-5e7e18345ce1?w=400",
      images: ["https://images.unsplash.com/photo-1630350066851-5e7e18345ce1?w=800"],
      inStock: true,
      stockQty: 500,
      rating: "4.90",
      reviewCount: 634,
      categoryId: catMap["food-groceries"],
      featured: true,
    },
    {
      name: "Olive Oil Extra Virgin 1L",
      nameAr: "زيت زيتون بكر ممتاز 1 لتر",
      nameFr: "Huile d'olive extra vierge 1L",
      description: "Algerian extra virgin olive oil from Kabylie region",
      descriptionAr: "زيت زيتون جزائري بكر ممتاز من منطقة القبائل",
      descriptionFr: "Huile d'olive extra vierge algérienne de la région de Kabylie",
      slug: "olive-oil-extra-virgin-1l",
      price: "1200.00",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
      images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800"],
      inStock: true,
      stockQty: 350,
      rating: "4.80",
      reviewCount: 412,
      categoryId: catMap["food-groceries"],
    },
    // Automotive
    {
      name: "Car Dash Camera Full HD",
      nameAr: "كاميرا سيارة داش كام فل HD",
      nameFr: "Caméra tableau de bord Full HD",
      description: "1080p Full HD, night vision, loop recording, G-sensor",
      descriptionAr: "فل إتش دي 1080p، رؤية ليلية، تسجيل حلقي، جي-سنسور",
      descriptionFr: "Full HD 1080p, vision nocturne, enregistrement en boucle, G-sensor",
      slug: "car-dash-camera-full-hd",
      price: "6500.00",
      originalPrice: "9000.00",
      discount: 28,
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400",
      images: ["https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800"],
      inStock: true,
      stockQty: 85,
      rating: "4.20",
      reviewCount: 93,
      categoryId: catMap["automotive"],
    },
    // Baby & Kids
    {
      name: "Educational Toy Set 3-6 Years",
      nameAr: "مجموعة ألعاب تعليمية 3-6 سنوات",
      nameFr: "Set de jouets éducatifs 3-6 ans",
      description: "Colorful blocks, puzzles and learning cards, BPA-free",
      descriptionAr: "مكعبات ملونة وأحجية وبطاقات تعليمية، خالية من BPA",
      descriptionFr: "Blocs colorés, puzzles et cartes éducatives, sans BPA",
      slug: "educational-toy-set-3-6-years",
      price: "3800.00",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
      images: ["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800"],
      inStock: true,
      stockQty: 95,
      rating: "4.60",
      reviewCount: 147,
      categoryId: catMap["baby-kids"],
    },
    // Tools & Hardware
    {
      name: "Power Drill Set 18V",
      nameAr: "مثقاب كهربائي 18 فولت",
      nameFr: "Perceuse sans fil 18V",
      description: "18V cordless drill, 2 batteries included, 25-piece bit set",
      descriptionAr: "مثقاب لاسلكي 18 فولت، بطاريتان مضمنتان، مجموعة 25 قطعة",
      descriptionFr: "Perceuse sans fil 18V, 2 batteries incluses, set de 25 forets",
      slug: "power-drill-set-18v",
      price: "18500.00",
      originalPrice: "22000.00",
      discount: 16,
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
      images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800"],
      inStock: true,
      stockQty: 35,
      rating: "4.50",
      reviewCount: 68,
      categoryId: catMap["tools-hardware"],
    },
  ];

  const existingProducts = seedMode === "bootstrap" ? await db.select().from(productsTable) : [];
  const existingProductSlugs = new Set(existingProducts.map((product) => product.slug));
  const missingProducts = products.filter((product) => !existingProductSlugs.has(product.slug));

  if (missingProducts.length > 0) {
    await db.insert(productsTable).values(missingProducts);
  }

  const availableProducts = await db.select().from(productsTable);
  if (seedMode === "reset") {
    console.log(`Inserted ${availableProducts.length} products`);
  } else if (missingProducts.length > 0) {
    console.log(`Inserted ${missingProducts.length} missing products`);
  } else {
    console.log(`Skipped products; ${availableProducts.length} already present`);
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
