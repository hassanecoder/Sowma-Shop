import { Link } from 'wouter';
import { useTranslation } from '@/lib/i18n';
import { useShopStore } from '@/lib/store';
import { LocalizedName } from '@/components/ui/LocalizedText';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { cn } from '@/components/layout/Navbar';

export default function CartPage() {
  const { t, isRtl } = useTranslation();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useShopStore();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">{t('emptyCart')}</h1>
        <p className="text-muted-foreground mb-8 text-lg">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products">
          <Button size="lg" className="rounded-xl px-8 h-14 text-lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const total = getCartTotal();
  const shipping = 500; // Flat rate mock

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('cart')}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm items-center relative">
              <Link href={`/products/${item.product.id}`} className="w-full sm:w-24 h-24 rounded-xl bg-muted overflow-hidden shrink-0 block">
                <img 
                  src={item.product.image || item.product.images?.[0] || `${import.meta.env.BASE_URL}images/placeholder-product.png`} 
                  alt={item.product.name} 
                  className="w-full h-full object-cover"
                />
              </Link>
              
              <div className="flex-1 text-center sm:text-start w-full">
                <div className="text-xs text-primary mb-1">{item.product.categoryName}</div>
                <Link href={`/products/${item.product.id}`} className="font-bold text-lg hover:text-primary transition-colors line-clamp-1">
                  <LocalizedName entity={item.product} />
                </Link>
                <div className="font-bold mt-1 text-muted-foreground">
                  {item.product.price.toLocaleString()} {t('currency')}
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center border border-border rounded-xl bg-background overflow-hidden h-10">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-10 h-full flex items-center justify-center hover:bg-muted">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-10 h-full flex items-center justify-center hover:bg-muted">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="w-24 text-end font-bold text-lg hidden sm:block">
                  {(item.product.price * item.quantity).toLocaleString()}
                </div>

                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 rounded-full" onClick={() => removeFromCart(item.product.id)}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('subtotal')}</span>
                <span className="font-medium">{total.toLocaleString()} {t('currency')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('shipping')}</span>
                <span className="font-medium">{shipping.toLocaleString()} {t('currency')}</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">{t('total')}</span>
                <span className="font-bold text-2xl text-primary">{(total + shipping).toLocaleString()} {t('currency')}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-accent border-0">
                {t('checkout')}
                {isRtl ? <ArrowRight className="w-5 h-5 ms-2 rotate-180" /> : <ArrowRight className="w-5 h-5 ms-2" />}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
