import { Link } from 'wouter';
import { useTranslation } from '@/lib/i18n';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Sowma.shop
              </span>
            </Link>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              The premier Algerian marketplace offering the best prices, quality products, and fast delivery across all 58 Wilayas.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">{t('about')}</h3>
            <div className="flex flex-col gap-2">
              <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">{t('products')}</Link>
              <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">{t('categories')}</Link>
              <Link href="/regions" className="text-muted-foreground hover:text-primary transition-colors">{t('regions')}</Link>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('faq')}</a>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">{t('categories')}</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Electronics</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Fashion & Apparel</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home & Kitchen</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Beauty & Health</a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">{t('contact')}</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Algiers Business Center, Pins Maritimes, Algiers, Algeria</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span dir="ltr">+213 (0) 555 12 34 56</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>contact@sowma.shop</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sowma.shop. {t('rights')}</p>
          <div className="flex items-center gap-4">
            <span>🇩🇿 Made with love in Algeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
