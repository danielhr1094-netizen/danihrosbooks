import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import BookCard from '@/components/books/BookCard';
import AnnouncementCard from '@/components/announcements/AnnouncementCard';
import { useBooks } from '@/hooks/useBooks';
import { useActiveAnnouncements } from '@/hooks/useAnnouncements';
import { useTranslatedBook } from '@/hooks/useTranslatedBook';
import heroBg from '@/assets/hero-bg.jpg';

// Component for the Latest Release section with translation support
function LatestReleaseSection({ book }: { book: NonNullable<ReturnType<typeof useBooks>['data']>[0] }) {
  const { t } = useTranslation();
  const translatedBook = useTranslatedBook(book);

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('home.latestRelease.title')}
            </h2>
            <p className="text-muted-foreground">{t('home.latestRelease.subtitle')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-[2/3] max-w-sm mx-auto md:mx-0 rounded-xl overflow-hidden shadow-[0_20px_60px_hsl(0_0%_0%/0.5)]">
            {translatedBook.localizedCoverUrl ? (
              <img
                src={translatedBook.localizedCoverUrl}
                alt={translatedBook.translatedTitle}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-muted-foreground/30" />
              </div>
            )}
          </div>

          <div className="space-y-6">
            {book.is_new && (
              <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                {t('home.latestRelease.new')}
              </span>
            )}
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {translatedBook.translatedTitle}
            </h3>
            {translatedBook.translatedSeries && (
              <p className="text-primary text-lg">{translatedBook.translatedSeries}</p>
            )}
            {translatedBook.translatedSynopsis && (
              <p className="text-muted-foreground line-clamp-3">
                {translatedBook.translatedSynopsis}
              </p>
            )}
            <Link to={`/libros/${book.id}`}>
              <Button variant="gold" size="lg" className="gap-2">
                {t('home.latestRelease.viewDetails')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const { t } = useTranslation();
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
              <span className="text-sm font-medium">{t('home.hero.badge')}</span>
            </div>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">{t('home.hero.titleLine1')}</span>
            <br />
            <span className="text-gold-gradient">{t('home.hero.titleLine2')}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/libros">
              <Button variant="hero" size="xl" className="gap-3">
                <BookOpen className="w-5 h-5" />
                {t('home.hero.exploreBooks')}
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
      {latestBook && <LatestReleaseSection book={latestBook} />}

      {/* Announcements */}
      {announcements && announcements.length > 0 && (
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {t('home.news.title')}
                </h2>
                <p className="text-muted-foreground">{t('home.news.subtitle')}</p>
              </div>
              <Link to="/noticias" className="hidden md:block">
                <Button variant="outline" className="gap-2">
                  {t('home.news.viewAll')}
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
            {t('home.cta.title')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            {t('home.cta.subtitle')}
          </p>
          <Link to="/libros">
            <Button variant="hero" size="xl" className="gap-3">
              {t('home.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
