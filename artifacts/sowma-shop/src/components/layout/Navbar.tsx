import { Link, useLocation } from 'wouter';
import { Search, ShoppingCart, Heart, User, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { useShopStore } from '@/lib/store';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { useListCategories } from '@workspace/api-client-react';
import { LocalizedName } from '../ui/LocalizedText';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const { t, lang, setLang, isRtl } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useShopStore((s) => s.getCartCount());
  const favCount = useShopStore((s) => s.favorites.length);
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: categories = [] } = useListCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/40">
      {/* Top Bar - Very thin for language/theme */}
      <div className="bg-primary/5 border-b border-border/40 py-1">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center gap-4 text-muted-foreground font-medium">
            <span>Sowma.shop - The Premium Algerian Marketplace</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-background/50 rounded-full px-2 py-1 shadow-sm border border-border/50">
              <Globe className="w-3 h-3 text-muted-foreground" />
              <button 
                onClick={() => setLang('ar')} 
                className={cn("px-2 py-0.5 rounded-full transition-colors", lang === 'ar' ? "bg-primary text-white" : "hover:text-primary")}
              >عربي</button>
              <button 
                onClick={() => setLang('fr')} 
                className={cn("px-2 py-0.5 rounded-full transition-colors", lang === 'fr' ? "bg-primary text-white" : "hover:text-primary")}
              >FR</button>
              <button 
                onClick={() => setLang('en')} 
                className={cn("px-2 py-0.5 rounded-full transition-colors", lang === 'en' ? "bg-primary text-white" : "hover:text-primary")}
              >EN</button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-xl leading-none">S</span>
          </div>
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent hidden sm:block">
            Sowma
          </span>
        </Link>

        {/* Search Bar - Hidden on small mobile */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative">
          <input
            type="search"
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 ps-4 pe-12 rounded-full bg-muted/50 border-2 border-transparent focus:border-primary/50 focus:bg-background outline-none transition-all"
          />
          <button type="submit" className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors", isRtl ? "start-4" : "end-4")}>
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>

          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10 hover:text-primary">
              <Heart className="w-6 h-6" />
              {favCount > 0 && (
                <span className="absolute 1 top-0 end-0 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background">
                  {favCount}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10 hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute 1 top-0 end-0 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background shadow-sm">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/sign-in" className="hidden sm:block">
            <Button variant="outline" className="rounded-full gap-2 border-primary/20 hover:bg-primary/10 hover:border-primary/50">
              <User className="w-4 h-4" />
              <span className="font-medium">{t('signIn')}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Categories Bar - Desktop */}
      <div className="hidden md:block border-t border-border/40 bg-background/50">
        <div className="container mx-auto px-4 flex items-center h-12 overflow-x-auto no-scrollbar gap-6">
          <Link href="/products" className="text-sm font-semibold hover:text-primary whitespace-nowrap transition-colors flex items-center gap-1">
            <Menu className="w-4 h-4" />
            {t('allCategories')}
          </Link>
          {categories.slice(0, 8).map((cat) => (
            <Link key={cat.id} href={`/categories/${cat.id}`} className="text-sm text-muted-foreground hover:text-primary whitespace-nowrap transition-colors">
              <LocalizedName entity={cat} />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background p-4 flex flex-col gap-4 shadow-xl">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="search"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 ps-4 pe-12 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none"
            />
            <button type="submit" className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground", isRtl ? "start-4" : "end-4")}>
              <Search className="w-5 h-5" />
            </button>
          </form>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/sign-in">
              <Button variant="outline" className="w-full justify-start gap-2">
                <User className="w-4 h-4" /> {t('signIn')}
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Menu className="w-4 h-4" /> {t('products')}
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="font-bold text-sm text-muted-foreground px-2">{t('categories')}</h3>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.id}`} className="px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                <LocalizedName entity={cat} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
