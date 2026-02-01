import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Book, Instagram } from 'lucide-react';

// Custom YouTube icon
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Custom TikTok icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                <Book className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display text-2xl font-semibold">Danihros</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2">
              <li><Link to="/libros" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.books')}</Link></li>
              <li><Link to="/galeria" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.gallery')}</Link></li>
              <li><Link to="/noticias" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.news')}</Link></li>
              <li><Link to="/contacto" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary mb-4">{t('footer.followMe')}</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/tales.ofterra/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-7 h-7" />
              </a>
              <a 
                href="https://www.youtube.com/@DaniHRos" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="YouTube"
                title="YouTube"
              >
                <YouTubeIcon className="w-7 h-7" />
              </a>
              <a 
                href="https://www.tiktok.com/@dny6349" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="TikTok"
                title="TikTok"
              >
                <TikTokIcon className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Danihros - Daniel Hernandez Rosales. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
}
