import { useListRegions } from '@workspace/api-client-react';
import { useTranslation } from '@/lib/i18n';

export default function RegionsPage() {
  const { t, lang } = useTranslation();
  const { data: regions = [], isLoading } = useListRegions();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Delivery Across Algeria</h1>
        <p className="text-lg text-muted-foreground">We deliver to all 58 Wilayas.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-muted animate-pulse border border-border"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {regions.map((region) => (
            <div key={region.id} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors shadow-sm">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                {region.code}
              </span>
              <span className="font-medium text-sm truncate">
                {lang === 'ar' ? region.nameAr : region.nameFr || region.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
