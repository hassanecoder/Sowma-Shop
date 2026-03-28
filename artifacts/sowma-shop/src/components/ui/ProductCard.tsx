import { Link } from 'wouter';
import { ShoppingCart, Heart } from 'lucide-react';
import type { ProductSummary } from '@workspace/api-client-react';
import { useShopStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { LocalizedName } from './LocalizedText';
import { Button } from './button';
import { cn } from '../layout/Navbar';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export function ProductCard({ product, index = 0 }: { product: ProductSummary; index?: number }) {
  const { t, isRtl } = useTranslation();
  const { addToCart, toggleFavorite, isFavorite } = useShopStore();
  const fav = isFavorite(product.id);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart.`,
      duration: 2000,
    });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  // Safe image fallback
  const displayImage = product.image || product.images?.[0] || `${import.meta.env.BASE_URL}images/placeholder-product.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Discount Badge */}
      {product.discount && product.discount > 0 ? (
        <div className={cn("absolute top-3 z-10 bg-destructive text-destructive-foreground px-3 py-1 text-xs font-bold rounded-full shadow-md", isRtl ? "start-3" : "start-3")}>
          -{product.discount}%
        </div>
      ) : null}

      {/* Favorite Button */}
      <button 
        onClick={handleFavorite}
        className={cn(
          "absolute top-3 z-10 w-9 h-9 rounded-full bg-background/80 backdrop-blur shadow-sm flex items-center justify-center transition-all hover:scale-110",
          isRtl ? "end-3" : "end-3",
          fav ? "text-red-500" : "text-muted-foreground hover:text-red-500"
        )}
      >
        <Heart className="w-5 h-5" fill={fav ? "currentColor" : "none"} />
      </button>

      {/* Image Area */}
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] w-full overflow-hidden bg-muted/20">
        <img 
          src={displayImage} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-background px-4 py-2 rounded-lg font-bold shadow-lg">
              {t('outOfStock')}
            </span>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-primary font-medium mb-1 line-clamp-1">
          {product.categoryName || "Category"}
        </div>
        
        <Link href={`/products/${product.id}`} className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 mb-2 leading-tight flex-grow">
          <LocalizedName entity={product} />
        </Link>
        
        <div className="mt-auto pt-3 border-t border-border/50 flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through opacity-70">
                {product.originalPrice.toLocaleString()} {t('currency')}
              </span>
            )}
            <span className="text-lg font-bold text-foreground leading-none">
              {product.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">{t('currency')}</span>
            </span>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            size="icon"
            className="rounded-full w-10 h-10 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all shrink-0 bg-gradient-to-r from-primary to-accent border-0"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
