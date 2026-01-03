import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Headphones, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import BookCard from '@/components/books/BookCard';
import AnnouncementCard from '@/components/announcements/AnnouncementCard';
import { useFeaturedBooks, useBooks } from '@/hooks/useBooks';
import { useActiveAnnouncements } from '@/hooks/useAnnouncements';
import heroBg from '@/assets/hero-bg.jpg';

export default function Index() {
  const { data: featuredBooks } = useFeaturedBooks();
  const { data: allBooks } = useBooks();
  const { data: announcements } = useActiveAnnouncements(3);
  
  // Get the latest book for "Last Release" section
  const latestBook = allBooks?.[0];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Mundos mágicos esperan ser descubiertos</span>
            </div>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Bienvenido a los</span>
            <br />
            <span className="text-gold-gradient">Cuentos de Terra</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Historias de fantasía que transportan a mundos donde la magia es real y las aventuras nunca terminan. 
            Por Daniel Hernandez Rosales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/libros">
              <Button variant="hero" size="xl" className="gap-3">
                <BookOpen className="w-5 h-5" />
                Explorar Libros
              </Button>
            </Link>
            <Link to="/audiolibros">
              <Button variant="outline" size="xl" className="gap-3">
                <Headphones className="w-5 h-5" />
                Audiolibros
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Latest Release */}
      {latestBook && (
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Último Lanzamiento
                </h2>
                <p className="text-muted-foreground">La más reciente aventura</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="aspect-[2/3] max-w-sm mx-auto md:mx-0 rounded-xl overflow-hidden shadow-[0_20px_60px_hsl(0_0%_0%/0.5)]">
                {latestBook.cover_image_url ? (
                  <img
                    src={latestBook.cover_image_url}
                    alt={latestBook.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {latestBook.is_new && (
                  <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    Nuevo
                  </span>
                )}
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {latestBook.title}
                </h3>
                {latestBook.series && (
                  <p className="text-primary text-lg">{latestBook.series}</p>
                )}
                {latestBook.synopsis && (
                  <p className="text-muted-foreground line-clamp-3">
                    {latestBook.synopsis}
                  </p>
                )}
                <Link to={`/libros/${latestBook.id}`}>
                  <Button variant="gold" size="lg" className="gap-2">
                    Ver Detalles
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Books */}
      {featuredBooks && featuredBooks.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Libros Destacados
                </h2>
                <p className="text-muted-foreground">Las historias más queridas por los lectores</p>
              </div>
              <Link to="/libros" className="hidden md:block">
                <Button variant="outline" className="gap-2">
                  Ver Todos
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBooks.slice(0, 6).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link to="/libros">
                <Button variant="outline" className="gap-2">
                  Ver Todos los Libros
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Announcements */}
      {announcements && announcements.length > 0 && (
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Últimas Noticias
                </h2>
                <p className="text-muted-foreground">Anuncios y novedades</p>
              </div>
              <Link to="/noticias" className="hidden md:block">
                <Button variant="outline" className="gap-2">
                  Todas las Noticias
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Explora el catálogo completo y encuentra tu próxima historia favorita. 
            Disponible en formato físico, eBook y audiolibro.
          </p>
          <Link to="/libros">
            <Button variant="hero" size="xl" className="gap-3">
              Explorar Catálogo
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
