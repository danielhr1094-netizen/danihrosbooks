import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Book, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import LanguageToggle from '@/components/LanguageToggle';

const getNavLinks = (t: (key: string) => string) => [
  { href: '/', label: t('nav.home') },
  { href: '/libros', label: t('nav.books') },
  { href: '/galeria', label: t('nav.gallery') },
  { href: '/noticias', label: t('nav.news') },
  { href: '/autor', label: t('nav.about') },
  { href: '/contacto', label: t('nav.contact') },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const { t } = useTranslation();
  const navLinks = getNavLinks(t);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-colors">
              <Book className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl md:text-2xl font-semibold text-foreground">
              Danihros
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="w-4 h-4" />
                  {t('nav.admin')}
                </Button>
              </Link>
            )}
            {user ? (
              <Button variant="ghost" size="sm" onClick={signOut} className="gap-2">
                <User className="w-4 h-4" />
                {t('nav.logout')}
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  {t('nav.login')}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden glass-card border-t border-border/30 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border/30 space-y-2">
              <div className="px-4 py-2">
                <LanguageToggle />
              </div>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-primary hover:bg-primary/10 font-medium"
                >
                  {t('nav.adminPanel')}
                </Link>
              )}
              {user ? (
                <button
                  onClick={() => { signOut(); setIsOpen(false); }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-foreground/70 hover:bg-secondary/50"
                >
                  {t('nav.closeSession')}
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-foreground/70 hover:bg-secondary/50"
                >
                  {t('nav.startSession')}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
