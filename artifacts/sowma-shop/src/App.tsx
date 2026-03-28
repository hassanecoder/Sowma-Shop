import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { I18nProvider } from "./lib/i18n";
import { AppLayout } from "./components/layout/AppLayout";

// Pages
import Home from "./pages/home";
import ProductsPage from "./pages/products";
import ProductDetailPage from "./pages/product-detail";
import CategoriesPage from "./pages/categories";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import RegionsPage from "./pages/regions";
import { SignInPage, SignUpPage } from "./pages/auth";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/products/:id" component={ProductDetailPage} />
        <Route path="/categories" component={CategoriesPage} />
        <Route path="/categories/:id" component={ProductsPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/regions" component={RegionsPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        {/* Simple Favorites route mapping to products for now, or could make a dedicated page */}
        <Route path="/favorites" component={() => (
          <div className="container mx-auto py-20 text-center"><h1 className="text-3xl font-bold">Favorites Page</h1><p className="text-muted-foreground mt-4">Feature coming soon.</p></div>
        )} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
