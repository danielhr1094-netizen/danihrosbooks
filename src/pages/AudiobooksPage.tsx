import { useTranslation } from 'react-i18next';
import { Headphones, ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAudiobooks } from '@/hooks/useBooks';
import { Link } from 'react-router-dom';

export default function AudiobooksPage() {
  const { t } = useTranslation();
  const { data: audiobooks, isLoading } = useAudiobooks();

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6">
            <Headphones className="w-4 h-4" />
            <span className="text-sm font-medium">{t('audiobooks.badge')}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('audiobooks.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('audiobooks.subtitle')}
          </p>
        </div>
      </section>

      {/* Audiobooks Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                  <div className="flex gap-6">
                    <div className="w-32 aspect-[2/3] bg-secondary rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-secondary rounded w-3/4" />
                      <div className="h-4 bg-secondary rounded w-1/2" />
                      <div className="h-20 bg-secondary rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : audiobooks && audiobooks.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {audiobooks.map((book) => (
                <div key={book.id} className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row">
                    {/* Cover */}
                    <Link to={`/libros/${book.id}`} className="sm:w-40 aspect-[2/3] sm:aspect-auto flex-shrink-0 overflow-hidden">
                      {book.cover_image_url ? (
                        <img
                          src={book.cover_image_url}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                          <Headphones className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                    </Link>

                    {/* Content */}
                    <div className="flex-1 p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link to={`/libros/${book.id}`}>
                            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {book.title}
                            </h3>
                          </Link>
                          {book.series && (
                            <p className="text-sm text-primary/80">{book.series}</p>
                          )}
                        </div>
                        <Badge variant="secondary" className="gap-1 flex-shrink-0">
                          <Headphones className="w-3 h-3" />
                          {t('common.audio')}
                        </Badge>
                      </div>

                      {book.synopsis && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {book.synopsis}
                        </p>
                      )}

                      {/* Platform Links */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {book.audible_url && (
                          <Button asChild variant="outline" size="sm" className="gap-1">
                            <a href={book.audible_url} target="_blank" rel="noopener noreferrer">
                              Audible
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        )}
                        {book.itunes_url && (
                          <Button asChild variant="outline" size="sm" className="gap-1">
                            <a href={book.itunes_url} target="_blank" rel="noopener noreferrer">
                              iTunes
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Headphones className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {t('audiobooks.comingSoon')}
              </h3>
              <p className="text-muted-foreground">
                {t('audiobooks.comingSoonDesc')}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
