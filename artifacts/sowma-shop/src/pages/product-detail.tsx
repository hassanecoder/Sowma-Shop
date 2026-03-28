import { useState } from 'react';
import { useRoute } from 'wouter';
import { useGetProduct, useGetRelatedProducts, useCreateOrder, useListRegions, useListCitiesByRegion } from '@workspace/api-client-react';
import { useTranslation } from '@/lib/i18n';
import { useShopStore } from '@/lib/store';
import { LocalizedName, LocalizedDescription } from '@/components/ui/LocalizedText';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Minus, Plus, Truck, Shield, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/components/layout/Navbar';
import { ProductCard } from '@/components/ui/ProductCard';

export default function ProductDetailPage() {
  const [, params] = useRoute('/products/:id');
  const productId = parseInt(params?.id || '0');
  
  const { t, isRtl, lang } = useTranslation();
  const { addToCart, toggleFavorite, isFavorite } = useShopStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Queries
  const { data: product, isLoading, isError } = useGetProduct(productId);
  const { data: related } = useGetRelatedProducts(productId);

  // Instant Order Form State
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    phone: '',
    regionId: '',
    cityId: '',
    address: '',
    notes: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { data: regions = [] } = useListRegions();
  const { data: cities = [], isLoading: loadingCities } = useListCitiesByRegion(
    orderForm.regionId ? parseInt(orderForm.regionId) : 0, 
    { query: { enabled: !!orderForm.regionId } }
  );

  const createOrderMutation = useCreateOrder();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  if (isError || !product) {
    return <div className="container mx-auto px-4 py-20 text-center text-destructive">Product not found.</div>;
  }

  const images = product.images?.length ? product.images : [product.image || `${import.meta.env.BASE_URL}images/placeholder-product.png`];
  const fav = isFavorite(product.id);

  const handleInstantOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.fullName || !orderForm.phone || !orderForm.regionId) return;

    createOrderMutation.mutate({
      data: {
        ...orderForm,
        regionId: parseInt(orderForm.regionId),
        cityId: orderForm.cityId ? parseInt(orderForm.cityId) : undefined,
        items: [{ productId: product.id, quantity, price: product.price }]
      }
    }, {
      onSuccess: () => setOrderSuccess(true)
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="bg-card rounded-3xl p-4 md:p-8 shadow-sm border border-border mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/20 border border-border">
              <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
              {product.discount && product.discount > 0 ? (
                <div className={cn("absolute top-4 bg-destructive text-white px-4 py-1.5 text-sm font-bold rounded-full shadow-lg", isRtl ? "start-4" : "start-4")}>
                  -{product.discount}%
                </div>
              ) : null}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                      activeImage === idx ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-2 text-sm font-semibold text-primary uppercase tracking-wider">
              {product.categoryName}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              <LocalizedName entity={product} />
            </h1>
            
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-border/50">
              <span className="text-4xl font-bold text-foreground">
                {product.price.toLocaleString()} <span className="text-2xl font-normal text-muted-foreground">{t('currency')}</span>
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-muted-foreground line-through mb-1">
                  {product.originalPrice.toLocaleString()} {t('currency')}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-8 text-lg leading-relaxed whitespace-pre-line">
              <LocalizedDescription entity={product} />
            </p>

            {/* Actions or Instant Order */}
            {!showOrderForm ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-border rounded-xl bg-background overflow-hidden h-14">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-full flex items-center justify-center hover:bg-muted transition-colors text-foreground"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-full flex items-center justify-center hover:bg-muted transition-colors text-foreground"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-14 w-14 rounded-xl border-2"
                    onClick={() => toggleFavorite(product)}
                  >
                    <Heart className="w-6 h-6" fill={fav ? "currentColor" : "none"} color={fav ? "red" : "currentColor"} />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="flex-1 h-14 text-lg rounded-xl bg-foreground hover:bg-foreground/90 text-background"
                    onClick={() => { addToCart(product, quantity); }}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-5 h-5 me-2" />
                    {t('addToCart')}
                  </Button>
                  <Button 
                    className="flex-1 h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg border-0"
                    onClick={() => setShowOrderForm(true)}
                    disabled={!product.inStock}
                  >
                    {t('orderNow')}
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Truck className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">Delivery 58 Wilayas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">Secure Payment</span>
                  </div>
                </div>
              </div>
            ) : orderSuccess ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">{t('orderSuccess')}</h3>
                <p className="text-green-700 dark:text-green-500 mb-6">We will contact you shortly to confirm delivery.</p>
                <Button variant="outline" onClick={() => { setShowOrderForm(false); setOrderSuccess(false); }}>
                  Back to Product
                </Button>
              </div>
            ) : (
              <form onSubmit={handleInstantOrder} className="bg-muted/30 p-6 rounded-2xl border border-border space-y-4 relative">
                <button type="button" onClick={() => setShowOrderForm(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold mb-4">{t('orderNow')}</h3>
                
                <div className="bg-background p-4 rounded-xl border border-border flex justify-between items-center mb-4">
                  <span className="font-medium">{quantity}x <LocalizedName entity={product}/></span>
                  <span className="font-bold text-primary">{(product.price * quantity).toLocaleString()} {t('currency')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required placeholder={t('fullName')} value={orderForm.fullName} onChange={e => setOrderForm({...orderForm, fullName: e.target.value})} className="h-12 px-4 rounded-xl border border-input bg-background w-full" />
                  <input required type="tel" placeholder={t('phone')} value={orderForm.phone} onChange={e => setOrderForm({...orderForm, phone: e.target.value})} className="h-12 px-4 rounded-xl border border-input bg-background w-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select required value={orderForm.regionId} onChange={e => setOrderForm({...orderForm, regionId: e.target.value, cityId: ''})} className="h-12 px-4 rounded-xl border border-input bg-background w-full">
                    <option value="">{t('selectRegion')}</option>
                    {regions.map(r => (
                      <option key={r.id} value={r.id}>{r.code} - {lang === 'ar' ? r.nameAr : r.nameFr || r.name}</option>
                    ))}
                  </select>
                  <select disabled={!orderForm.regionId || loadingCities} value={orderForm.cityId} onChange={e => setOrderForm({...orderForm, cityId: e.target.value})} className="h-12 px-4 rounded-xl border border-input bg-background w-full disabled:opacity-50">
                    <option value="">{t('selectCity')}</option>
                    {cities.map(c => (
                      <option key={c.id} value={c.id}>{lang === 'ar' ? c.nameAr : c.nameFr || c.name}</option>
                    ))}
                  </select>
                </div>

                <input placeholder={t('address')} value={orderForm.address} onChange={e => setOrderForm({...orderForm, address: e.target.value})} className="h-12 px-4 rounded-xl border border-input bg-background w-full" />
                
                <Button type="submit" disabled={createOrderMutation.isPending} className="w-full h-14 text-lg rounded-xl mt-4 bg-gradient-to-r from-primary to-accent">
                  {createOrderMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : t('placeOrder')}
                </Button>
              </form>
            )}

          </div>
        </div>

        {/* Specifications Table */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border/50">
            <h3 className="text-2xl font-bold mb-6">{t('specifications')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex border-b border-border/50 pb-3">
                  <span className="w-1/3 font-medium text-muted-foreground">
                    {lang === 'ar' ? spec.keyAr || spec.key : spec.key}
                  </span>
                  <span className="w-2/3 text-foreground font-medium">
                    {lang === 'ar' ? spec.valueAr || spec.value : spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {related && related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">{t('relatedProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((prod, i) => (
              <ProductCard key={prod.id} product={prod} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
