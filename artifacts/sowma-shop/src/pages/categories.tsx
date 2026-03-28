import { Link } from 'wouter';
import { useListCategories } from '@workspace/api-client-react';
import { useTranslation } from '@/lib/i18n';
import { LocalizedName, LocalizedDescription } from '@/components/ui/LocalizedText';

export default function CategoriesPage() {
  const { t } = useTranslation();
  const { data: categories = [], isLoading } = useListCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">{t('categories')}</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-48 rounded-3xl bg-muted animate-pulse border border-border"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?categoryId=${cat.id}`}>
              <div className="group bg-card rounded-3xl p-6 border border-border hover:border-primary/50 hover:shadow-xl transition-all h-full flex flex-col items-center text-center cursor-pointer overflow-hidden relative">
                <div className="absolute -inset-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-3xl z-0"></div>
                <div className="w-20 h-20 rounded-2xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors mb-4 relative z-10">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-12 h-12 object-contain mix-blend-multiply" />
                  ) : (
                    <span className="text-3xl font-bold text-primary opacity-50">{cat.name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors relative z-10">
                  <LocalizedName entity={cat} />
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 relative z-10">
                  <LocalizedDescription entity={cat} />
                </p>
                <div className="mt-auto pt-4 relative z-10 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Explore {cat.productCount || 0} products &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
