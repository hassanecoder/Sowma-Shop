import { Link } from 'wouter';
import { useListProducts, useListCategories } from '@workspace/api-client-react';
import { useTranslation } from '@/lib/i18n';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, TrendingUp, ShieldCheck, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { LocalizedName } from '@/components/ui/LocalizedText';

export default function Home() {
  const { t, isRtl } = useTranslation();
  
  // Fetch some featured products
  const { data: featuredData, isLoading: isLoadingProducts } = useListProducts({ 
    limit: 8, 
    sort: 'popular',
    inStock: true 
  });
  
  const { data: newArrivalsData } = useListProducts({ 
    limit: 4, 
    sort: 'newest' 
  });

  const { data: categories = [], isLoading: isLoadingCats } = useListCategories();

  const heroImage = `${import.meta.env.BASE_URL}images/hero-banner.png`;
  const promoImage = `${import.meta.env.BASE_URL}images/promo-1.png`;

  return (
    <div className="w-full flex flex-col gap-16 pb-10 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative w-full pt-4 md:pt-8 px-4 container mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] lg:h-[600px] flex items-center">
          <img 
            src={heroImage} 
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent"></div>
          
          <div className="relative z-10 px-8 md:px-16 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Sowma.shop Live
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 drop-shadow-sm">
                Discover The Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Algerian</span> Deals
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Shop electronics, fashion, and home goods with instant checkout and fast delivery to 58 Wilayas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="rounded-xl h-14 px-8 text-base bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 border-0">
                    {t('buyNow')}
                    {isRtl ? <ChevronRight className="w-5 h-5 ms-2 rotate-180" /> : <ArrowRight className="w-5 h-5 ms-2" />}
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button size="lg" variant="outline" className="rounded-xl h-14 px-8 text-base bg-background/50 backdrop-blur hover:bg-background border-2">
                    {t('categories')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Delivery 58 Wilayas", desc: "Fast & reliable shipping" },
            { icon: ShieldCheck, title: "Secure Checkout", desc: "100% protected payments" },
            { icon: TrendingUp, title: "Best Prices", desc: "Unbeatable deals daily" },
            { icon: Clock, title: "24/7 Support", desc: "Always here for you" }
          ].map((feat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <feat.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{feat.title}</h4>
                <p className="text-sm text-muted-foreground">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full"></div>
            {t('categories')}
          </h2>
          <Link href="/categories" className="text-primary font-medium hover:underline flex items-center gap-1">
            {t('allCategories')}
            {isRtl ? <ChevronRight className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}
          </Link>
        </div>

        {isLoadingCats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((cat, i) => (
              <Link key={cat.id} href={`/categories/${cat.id}`}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/50 transition-all group cursor-pointer h-full"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-8 h-8 object-contain mix-blend-multiply" />
                    ) : (
                      <span className="text-2xl font-bold text-primary opacity-50">{cat.name.charAt(0)}</span>
                    )}
                  </div>
                  <span className="font-medium text-center text-sm group-hover:text-primary transition-colors line-clamp-2">
                    <LocalizedName entity={cat} />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* PROMO BANNER */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden shadow-lg h-[200px] md:h-[300px]">
          <img src={promoImage} alt="Promo" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-5xl font-bold mb-2">Mega Sale</h3>
            <p className="text-lg opacity-90 mb-4">Up to 50% off on selected electronics</p>
            <Link href="/products?sort=popular">
              <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8">Shop Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <div className="w-2 h-8 bg-accent rounded-full"></div>
            {t('featuredProducts')}
          </h2>
          <Link href="/products" className="text-primary font-medium hover:underline flex items-center gap-1">
            See All
            {isRtl ? <ChevronRight className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}
          </Link>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredData?.products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* NEW ARRIVALS */}
      <section className="container mx-auto px-4 bg-muted/30 py-12 rounded-3xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 flex flex-col justify-center text-center md:text-start px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('newArrivals')}</h2>
            <p className="text-muted-foreground mb-6">Discover the latest additions to our catalog. Fresh styles, newest tech, and more.</p>
            <Link href="/products?sort=newest">
              <Button size="lg" className="rounded-xl w-fit mx-auto md:mx-0">Explore All</Button>
            </Link>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {newArrivalsData?.products.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
