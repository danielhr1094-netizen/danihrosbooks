import { Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  Book, Megaphone, FileText, Images, Mail, Settings, 
  LayoutDashboard, LogOut, ChevronRight, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useBooks } from '@/hooks/useBooks';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { usePosts } from '@/hooks/usePosts';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/libros', label: 'Libros', icon: Book },
  { href: '/admin/anuncios', label: 'Anuncios', icon: Megaphone },
  { href: '/admin/posts', label: 'Blog/Noticias', icon: FileText },
  { href: '/admin/galeria', label: 'Galería', icon: Images },
  { href: '/admin/mensajes', label: 'Mensajes', icon: Mail },
  { href: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();
  const { data: books } = useBooks();
  const { data: announcements } = useAnnouncements();
  const { data: posts } = usePosts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Acceso Denegado
          </h1>
          <p className="text-muted-foreground mb-6">
            No tienes permisos de administrador.
          </p>
          <Link to="/">
            <Button variant="outline">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const activeAnnouncements = announcements?.filter(a => a.is_active).length || 0;
  const publishedPosts = posts?.filter(p => p.is_published).length || 0;

  const stats = [
    { label: 'Libros', value: books?.length || 0, icon: Book, href: '/admin/libros' },
    { label: 'Anuncios Activos', value: activeAnnouncements, icon: Megaphone, href: '/admin/anuncios' },
    { label: 'Posts Publicados', value: publishedPosts, icon: FileText, href: '/admin/posts' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border/50 flex flex-col">
        <div className="p-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
              <Book className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-display text-lg font-semibold text-foreground block">
                Danihros
              </span>
              <span className="text-xs text-muted-foreground">Panel Admin</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border/50">
          <Button variant="ghost" className="w-full justify-start gap-3" onClick={signOut}>
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Bienvenido al panel de administración
            </p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                to={stat.href}
                className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Acciones Rápidas
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/admin/libros">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Nuevo Libro
                </Button>
              </Link>
              <Link to="/admin/anuncios">
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Nuevo Anuncio
                </Button>
              </Link>
              <Link to="/admin/posts">
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Nuevo Post
                </Button>
              </Link>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-card rounded-xl border border-border/50 p-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              📖 Cómo usar el panel
            </h2>
            <div className="prose prose-invert prose-sm max-w-none text-muted-foreground">
              <p><strong>Para agregar un nuevo libro:</strong></p>
              <ol>
                <li>Ve a la sección "Libros" en el menú lateral</li>
                <li>Haz clic en "Nuevo Libro"</li>
                <li>Completa los campos: título, sinopsis, portada, enlaces de compra</li>
                <li>Guarda los cambios</li>
              </ol>
              <p><strong>Para crear un anuncio:</strong></p>
              <ol>
                <li>Ve a "Anuncios" en el menú lateral</li>
                <li>Crea un nuevo anuncio con título, texto e imagen</li>
                <li>Configura las fechas de inicio/fin si es temporal</li>
                <li>Actívalo para que aparezca en el sitio</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
