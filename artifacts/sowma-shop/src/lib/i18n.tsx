import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'fr' | 'en';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const translations = {
  en: {
    home: 'Home',
    products: 'Products',
    categories: 'Categories',
    cart: 'Cart',
    favorites: 'Favorites',
    regions: 'Regions',
    search: 'Search products...',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    allCategories: 'All Categories',
    featuredProducts: 'Featured Products',
    newArrivals: 'New Arrivals',
    topSellers: 'Top Sellers',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    orderNow: 'Order Now',
    price: 'Price',
    originalPrice: 'Original Price',
    discount: 'Discount',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    description: 'Description',
    specifications: 'Specifications',
    relatedProducts: 'Related Products',
    emptyCart: 'Your cart is empty',
    checkout: 'Checkout',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    placeOrder: 'Place Order',
    fullName: 'Full Name',
    phone: 'Phone Number',
    region: 'Region / Wilaya',
    city: 'City / Commune',
    address: 'Detailed Address',
    notes: 'Order Notes (Optional)',
    selectRegion: 'Select a region',
    selectCity: 'Select a city',
    orderSuccess: 'Order placed successfully!',
    orderError: 'Failed to place order. Please try again.',
    filter: 'Filter',
    clearFilters: 'Clear Filters',
    sort: 'Sort By',
    newest: 'Newest',
    popular: 'Popular',
    priceAsc: 'Price: Low to High',
    priceDesc: 'Price: High to Low',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    currency: 'DA',
    about: 'About Us',
    contact: 'Contact',
    faq: 'FAQ',
    rights: 'All rights reserved.',
  },
  fr: {
    home: 'Accueil',
    products: 'Produits',
    categories: 'Catégories',
    cart: 'Panier',
    favorites: 'Favoris',
    regions: 'Régions',
    search: 'Rechercher des produits...',
    signIn: 'Se Connecter',
    signUp: "S'inscrire",
    allCategories: 'Toutes les Catégories',
    featuredProducts: 'Produits Vedettes',
    newArrivals: 'Nouveautés',
    topSellers: 'Meilleures Ventes',
    addToCart: 'Ajouter au Panier',
    buyNow: 'Acheter',
    orderNow: 'Commander',
    price: 'Prix',
    originalPrice: 'Prix Initial',
    discount: 'Réduction',
    inStock: 'En Stock',
    outOfStock: 'Rupture de Stock',
    description: 'Description',
    specifications: 'Caractéristiques',
    relatedProducts: 'Produits Similaires',
    emptyCart: 'Votre panier est vide',
    checkout: 'Paiement',
    total: 'Total',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    free: 'Gratuit',
    placeOrder: 'Confirmer la Commande',
    fullName: 'Nom Complet',
    phone: 'Numéro de Téléphone',
    region: 'Région / Wilaya',
    city: 'Ville / Commune',
    address: 'Adresse Détaillée',
    notes: 'Notes (Optionnel)',
    selectRegion: 'Sélectionner une région',
    selectCity: 'Sélectionner une ville',
    orderSuccess: 'Commande effectuée avec succès!',
    orderError: 'Erreur lors de la commande.',
    filter: 'Filtrer',
    clearFilters: 'Effacer',
    sort: 'Trier par',
    newest: 'Plus Récent',
    popular: 'Populaire',
    priceAsc: 'Prix: Croissant',
    priceDesc: 'Prix: Décroissant',
    minPrice: 'Prix Min',
    maxPrice: 'Prix Max',
    currency: 'DA',
    about: 'À Propos',
    contact: 'Contact',
    faq: 'FAQ',
    rights: 'Tous droits réservés.',
  },
  ar: {
    home: 'الرئيسية',
    products: 'المنتجات',
    categories: 'التصنيفات',
    cart: 'السلة',
    favorites: 'المفضلة',
    regions: 'الولايات',
    search: 'ابحث عن المنتجات...',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    allCategories: 'جميع التصنيفات',
    featuredProducts: 'منتجات مميزة',
    newArrivals: 'وصل حديثاً',
    topSellers: 'الأكثر مبيعاً',
    addToCart: 'أضف للسلة',
    buyNow: 'اشتري الآن',
    orderNow: 'اطلب الآن',
    price: 'السعر',
    originalPrice: 'السعر الأصلي',
    discount: 'خصم',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    description: 'الوصف',
    specifications: 'المواصفات',
    relatedProducts: 'منتجات ذات صلة',
    emptyCart: 'سلة التسوق فارغة',
    checkout: 'الدفع',
    total: 'المجموع',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    free: 'مجاني',
    placeOrder: 'تأكيد الطلب',
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    region: 'الولاية',
    city: 'البلدية',
    address: 'العنوان بالتفصيل',
    notes: 'ملاحظات (اختياري)',
    selectRegion: 'اختر الولاية',
    selectCity: 'اختر البلدية',
    orderSuccess: 'تم تأكيد الطلب بنجاح!',
    orderError: 'حدث خطأ، يرجى المحاولة مرة أخرى.',
    filter: 'تصفية',
    clearFilters: 'مسح الفلاتر',
    sort: 'ترتيب حسب',
    newest: 'الأحدث',
    popular: 'الأكثر شعبية',
    priceAsc: 'السعر: من الأقل للأعلى',
    priceDesc: 'السعر: من الأعلى للأقل',
    minPrice: 'أقل سعر',
    maxPrice: 'أعلى سعر',
    currency: 'د.ج',
    about: 'من نحن',
    contact: 'اتصل بنا',
    faq: 'الأسئلة الشائعة',
    rights: 'جميع الحقوق محفوظة.',
  }
} as const;

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Default to Arabic
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('sowma_lang');
    return (saved as Language) || 'ar';
  });

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    localStorage.setItem('sowma_lang', lang);
  }, [lang]);

  const t = (key: keyof typeof translations['en']) => {
    return translations[lang][key];
  };

  return (
    <I18nContext.Provider value={{ lang, setLang: setLangState, t, isRtl: lang === 'ar' }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useTranslation must be used within I18nProvider');
  return context;
};
