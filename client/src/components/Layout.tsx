import React, { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  PlusCircle, 
  ShieldCheck, 
  FileText, 
  LogOut,
  Menu,
  X,
  Globe2
} from 'lucide-react';
import { useUser, useLogout } from '@/hooks/use-auth';
import { useCurrency } from '@/contexts/CurrencyContext';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Create Pool', href: '/create-pool', icon: PlusCircle },
  { label: 'Admin', href: '/admin', icon: Users },
  { label: 'KYC Verification', href: '/verify', icon: ShieldCheck },
  { label: 'Prospectus', href: '/prospectus', icon: FileText },
  { label: 'FAQ', href: '/faq', icon: Globe2 },
];

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: user } = useUser();
  const logout = useLogout();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { currency, setCurrency } = useCurrency();

  // If no user, just render children (for Auth page)
  if (!user) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-card border-r border-border/50 shadow-xl shadow-black/5 z-20 relative">
        <div className="p-8">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Globe2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Ubuntu Pools
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm' 
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-muted-foreground">Currency</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-muted text-sm rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="ZAR">ZAR (R)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate" data-testid="text-user-name">{user.username}</p>
              <p className="text-xs text-primary font-medium">Score: {user.ubuntuScore}</p>
            </div>
            <button 
              onClick={() => logout.mutate()} 
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              title="Logout"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border z-30 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Globe2 className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-lg">Ubuntu Pools</span>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-background z-20 p-4 overflow-y-auto"
        >
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  location === item.href ? 'bg-primary/10 text-primary font-bold' : 'text-foreground font-medium'
                }`}
              >
                <item.icon className="w-6 h-6" />
                {item.label}
              </Link>
            ))}
            <button 
              onClick={() => { logout.mutate(); setMobileMenuOpen(false); }}
              className="flex items-center gap-4 p-4 rounded-xl text-destructive font-medium mt-4"
              data-testid="button-logout-mobile"
            >
              <LogOut className="w-6 h-6" />
              Logout
            </button>
          </nav>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0 bg-background/50">
        <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
