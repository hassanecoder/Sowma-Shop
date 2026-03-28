import { useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export function SignInPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('signIn')}</h1>
          <p className="text-muted-foreground">Welcome back to Sowma.shop</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input type="email" required className="h-12 px-4 rounded-xl border border-input bg-background w-full focus:border-primary outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Password</label>
              <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
            </div>
            <input type="password" required className="h-12 px-4 rounded-xl border border-input bg-background w-full focus:border-primary outline-none focus:ring-1 focus:ring-primary" />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl mt-2 bg-foreground text-background hover:bg-foreground/90">
            {loading ? "Signing in..." : t('signIn')}
          </Button>
        </form>

        <div className="my-6 flex items-center text-xs text-muted-foreground">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-3">OR CONTINUE WITH</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-11 rounded-xl bg-background">Google</Button>
          <Button variant="outline" className="h-11 rounded-xl bg-background"><Github className="w-4 h-4 me-2"/> GitHub</Button>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don't have an account? <Link href="/sign-up" className="text-primary font-bold hover:underline">{t('signUp')}</Link>
        </p>
      </div>
    </div>
  );
}

export function SignUpPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('signUp')}</h1>
          <p className="text-muted-foreground">Create an account to track your orders</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('fullName')}</label>
            <input required className="h-12 px-4 rounded-xl border border-input bg-background w-full focus:border-primary outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input type="email" required className="h-12 px-4 rounded-xl border border-input bg-background w-full focus:border-primary outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input type="password" required className="h-12 px-4 rounded-xl border border-input bg-background w-full focus:border-primary outline-none focus:ring-1 focus:ring-primary" />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl mt-2 bg-foreground text-background hover:bg-foreground/90">
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Already have an account? <Link href="/sign-in" className="text-primary font-bold hover:underline">{t('signIn')}</Link>
        </p>
      </div>
    </div>
  );
}
