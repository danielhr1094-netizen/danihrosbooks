import { Link } from 'react-router-dom';
import { Book, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
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
              Daniel Hernandez Rosales - Autor de fantasía independiente. 
              Creador de "Los Cuentos Perdidos de Terra" y otras historias que transportan a mundos mágicos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><Link to="/libros" className="text-muted-foreground hover:text-foreground transition-colors">Libros</Link></li>
              <li><Link to="/audiolibros" className="text-muted-foreground hover:text-foreground transition-colors">Audiolibros</Link></li>
              <li><Link to="/galeria" className="text-muted-foreground hover:text-foreground transition-colors">Galería</Link></li>
              <li><Link to="/noticias" className="text-muted-foreground hover:text-foreground transition-colors">Noticias</Link></li>
              <li><Link to="/contacto" className="text-muted-foreground hover:text-foreground transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary mb-4">Sígueme</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:contacto@danihros.com" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Danihros - Daniel Hernandez Rosales. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
