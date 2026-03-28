import { useState } from 'react';
import { useLocation } from 'wouter';
import { useListProducts, useListCategories, ListProductsSort } from '@workspace/api-client-react';
import { useTranslation } from '@/lib/i18n';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { LocalizedName } from '@/components/ui/LocalizedText';

export default function ProductsPage() {
  const { t, isRtl } = useTranslation();
  const [location] = useLocation();
  
  // Parse URL search params
  const searchParams = new URLSearchParams(window.location.search);
  const initialSearch = searchParams.get('search') || '';
  const initialCat = searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined;

  // Filters state
  const [search, setSearch] = useState(initialSearch);
  const [categoryId, setCategoryId] = useState<number | undefined>(initialCat);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState<ListProductsSort>(ListProductsSort.newest);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Fetch data
  const { data: categories = [] } = useListCategories();
  const { data, isLoading, isError } = useListProducts({
    search: search || undefined,
    categoryId,
    inStock: inStock ? true : undefined,
    sort,
    limit: 24,
  });

  const clearFilters = () => {
    setSearch('');
    setCategoryId(undefined);
    setInStock(false);
    setSort(ListProductsSort.newest);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('products')}</h1>
          {search && <p className="text-muted-foreground mt-1">Showing results for "{search}"</p>}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Mobile Filter Toggle */}
          <Button 
            variant="outline" 
            className="md:hidden flex-1"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Filter className="w-4 h-4 ms-2" />
            {t('filter')}
          </Button>

          {/* Sort */}
          <div className="flex items-center gap-2 flex-1 md:flex-none">
            <span className="text-sm text-muted-foreground hidden sm:inline">{t('sort')}:</span>
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value as ListProductsSort)}
              className="h-10 px-3 py-2 rounded-xl border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full md:w-auto"
            >
              <option value={ListProductsSort.newest}>{t('newest')}</option>
              <option value={ListProductsSort.popular}>{t('popular')}</option>
              <option value={ListProductsSort.price_asc}>{t('priceAsc')}</option>
              <option value={ListProductsSort.price_desc}>{t('priceDesc')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Sidebar Filters */}
        <aside className={`
          fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} z-50 w-80 bg-background border-${isRtl ? 'l' : 'r'} border-border p-6 shadow-2xl transition-transform duration-300 transform
          md:relative md:translate-x-0 md:w-64 md:border-0 md:bg-transparent md:p-0 md:shadow-none
          ${isMobileFiltersOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')}
        `}>
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" /> Filters
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="sticky top-24 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{t('categories')}</h3>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pe-2 custom-scrollbar">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category"
                    checked={categoryId === undefined}
                    onChange={() => setCategoryId(undefined)}
                    className="w-4 h-4 text-primary focus:ring-primary accent-primary"
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">{t('allCategories')}</span>
                </label>
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category"
                      checked={categoryId === cat.id}
                      onChange={() => setCategoryId(cat.id)}
                      className="w-4 h-4 text-primary focus:ring-primary accent-primary"
                    />
                    <span className="text-sm group-hover:text-primary transition-colors"><LocalizedName entity={cat} /></span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-lg">Availability</h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary border-muted-foreground"
                />
                <span className="text-sm group-hover:text-primary transition-colors">{t('inStock')} only</span>
              </label>
            </div>

            <Button variant="outline" className="w-full rounded-xl" onClick={clearFilters}>
              {t('clearFilters')}
            </Button>
          </div>
        </aside>

        {/* Mobile Filter Overlay */}
        {isMobileFiltersOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
        )}

        {/* Product Grid */}
        <main className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse"></div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
              <p className="text-destructive font-bold text-xl mb-2">Error loading products</p>
              <p className="text-muted-foreground">Please try again later.</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : data?.products.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border flex flex-col items-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
              
              {/* Pagination Placeholder (Data schema has totalPages but no real endpoint to paginate easily via hook without state) */}
              {data && data.totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  <Button variant="outline" disabled={data.page === 1}>Previous</Button>
                  <span className="flex items-center px-4 font-medium">Page {data.page} of {data.totalPages}</span>
                  <Button variant="outline" disabled={data.page === data.totalPages}>Next</Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
