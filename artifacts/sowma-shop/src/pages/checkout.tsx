import { useState } from 'react';
import { useLocation } from 'wouter';
import { useCreateOrder, useListRegions, useListCitiesByRegion } from '@workspace/api-client-react';
import { useTranslation } from '@/lib/i18n';
import { useShopStore } from '@/lib/store';
import { LocalizedName } from '@/components/ui/LocalizedText';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const { t, lang } = useTranslation();
  const [, setLocation] = useLocation();
  const { cart, getCartTotal, clearCart } = useShopStore();
  
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    regionId: '',
    cityId: '',
    address: '',
    notes: ''
  });
  const [success, setSuccess] = useState(false);

  const { data: regions = [] } = useListRegions();
  const { data: cities = [], isLoading: loadingCities } = useListCitiesByRegion(
    form.regionId ? parseInt(form.regionId) : 0, 
    { query: { enabled: !!form.regionId } }
  );

  const createOrderMutation = useCreateOrder();

  // Redirect if cart is empty and not on success screen
  if (cart.length === 0 && !success) {
    setLocation('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOrderMutation.mutate({
      data: {
        ...form,
        regionId: parseInt(form.regionId),
        cityId: form.cityId ? parseInt(form.cityId) : undefined,
        items: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        }))
      }
    }, {
      onSuccess: () => {
        setSuccess(true);
        clearCart();
      }
    });
  };

  const total = getCartTotal();
  const shipping = 500;

  if (success) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('orderSuccess')}</h1>
        <p className="text-muted-foreground mb-8 text-lg max-w-md">
          Thank you for your purchase! Your order has been received and we will contact you shortly to arrange delivery.
        </p>
        <Button size="lg" className="rounded-xl px-8" onClick={() => setLocation('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('checkout')}</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-8">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 border-b border-border pb-4">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('fullName')} *</label>
                <input required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} className="h-12 px-4 rounded-xl border border-input bg-background w-full focus:border-primary outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('phone')} *</label>
                <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="h-12 px-4 rounded-xl border border-input bg-background w-full focus:border-primary outline-none focus:ring-1 focus:ring-primary" dir="ltr" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('region')} *</label>
                <select required value={form.regionId} onChange={e => setForm({...form, regionId: e.target.value, cityId: ''})} className="h-12 px-4 rounded-xl border border-input bg-background w-full focus:border-primary outline-none">
                  <option value="">{t('selectRegion')}</option>
                  {regions.map(r => (
                    <option key={r.id} value={r.id}>{r.code} - {lang === 'ar' ? r.nameAr : r.nameFr || r.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('city')}</label>
                <select disabled={!form.regionId || loadingCities} value={form.cityId} onChange={e => setForm({...form, cityId: e.target.value})} className="h-12 px-4 rounded-xl border border-input bg-background w-full disabled:opacity-50 focus:border-primary outline-none">
                  <option value="">{t('selectCity')}</option>
                  {cities.map(c => (
                    <option key={c.id} value={c.id}>{lang === 'ar' ? c.nameAr : c.nameFr || c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium">{t('address')}</label>
              <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="h-12 px-4 rounded-xl border border-input bg-background w-full focus:border-primary outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('notes')}</label>
              <textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="p-4 rounded-xl border border-input bg-background w-full focus:border-primary outline-none resize-none" />
            </div>
          </div>
        </form>

        {/* Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6 border-b border-border pb-4">Your Order</h2>
            
            <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar mb-6 pe-2">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0 border border-border">
                    <img src={item.product.image || item.product.images?.[0]} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate"><LocalizedName entity={item.product}/></div>
                    <div className="text-muted-foreground text-xs">{item.quantity} x {item.product.price.toLocaleString()}</div>
                  </div>
                  <div className="font-bold text-sm shrink-0">
                    {(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 text-sm bg-muted/30 p-4 rounded-xl">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('subtotal')}</span>
                <span className="font-medium">{total.toLocaleString()} {t('currency')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('shipping')}</span>
                <span className="font-medium">{shipping.toLocaleString()} {t('currency')}</span>
              </div>
              <div className="border-t border-border/50 pt-3 mt-1 flex justify-between items-center">
                <span className="font-bold text-base">{t('total')}</span>
                <span className="font-bold text-xl text-primary">{(total + shipping).toLocaleString()} {t('currency')}</span>
              </div>
            </div>

            <Button 
              type="submit"
              onClick={handleSubmit}
              disabled={createOrderMutation.isPending}
              className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-accent border-0 shadow-lg hover:shadow-primary/25"
            >
              {createOrderMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : t('placeOrder')}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">Cash on Delivery (Pay when you receive)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
