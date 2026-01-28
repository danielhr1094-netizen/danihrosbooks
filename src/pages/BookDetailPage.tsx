import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BookOpen, Smartphone, Headphones, Calendar, FileText, Globe, ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBook } from '@/hooks/useBooks';
import { useTranslatedBook } from '@/hooks/useTranslatedBook';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

export default function BookDetailPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useBook(id || '');
  const dateLocale = i18n.language === 'es' ? es : enUS;

  // We need to call the hook unconditionally, so we pass a placeholder if book is null
  const translatedBook = useTranslatedBook(book || {
    id: '',
    title: '',
    series: null,
    synopsis: null,
    tagline: null,
    amazon_paperback_url: null,
    amazon_kindle_url: null,
    audible_url: null,
    itunes_url: null,
    cover_image_url: null,
    publish_date: null,
    pages: null,
    language: null,
    formats: null,
    tags: null,
    featured: null,
    is_new: null,
    price: null,
    created_at: null,
    updated_at: null,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary rounded w-32 mb-8" />
            <div className="grid md:grid-cols-2 gap-10">
              <div className="aspect-[2/3] bg-secondary rounded-xl" />
              <div className="space-y-4">
                <div className="h-10 bg-secondary rounded w-3/4" />
                <div className="h-6 bg-secondary rounded w-1/2" />
                <div className="h-32 bg-secondary rounded" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            {t('bookDetail.notFound')}
          </h1>
          <Link to="/libros">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('bookDetail.backToCatalog')}
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const hasAudiobook = book.audible_url || book.itunes_url;
  const hasEbook = book.amazon_kindle_url;
  const hasPaperback = book.amazon_paperback_url;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Back Link */}
        <Link to="/libros" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          {t('bookDetail.backToCatalog')}
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Cover */}
          <div className="aspect-[2/3] max-w-md mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-[0_20px_60px_hsl(0_0%_0%/0.5)]">
            {book.cover_image_url ? (
              <img
                src={book.cover_image_url}
                alt={translatedBook.translatedTitle}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-muted-foreground/30" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {book.is_new && (
                <Badge className="bg-accent text-accent-foreground">{t('bookDetail.new')}</Badge>
              )}
              {hasAudiobook && (
                <Badge variant="secondary" className="gap-1">
                  <Headphones className="w-3 h-3" />
                  {t('bookDetail.audiobookAvailable')}
                </Badge>
              )}
              {book.featured && (
                <Badge variant="outline" className="border-primary text-primary">{t('bookDetail.featured')}</Badge>
              )}
            </div>

            {/* Title & Series */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                {translatedBook.translatedTitle}
              </h1>
              {translatedBook.translatedSeries && (
                <p className="text-xl text-primary">{translatedBook.translatedSeries}</p>
              )}
            </div>

            {translatedBook.translatedTagline && (
              <p className="text-lg text-muted-foreground italic">"{translatedBook.translatedTagline}"</p>
            )}

            {/* Synopsis */}
            {translatedBook.translatedSynopsis && (
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">{t('bookDetail.synopsis')}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {translatedBook.translatedSynopsis}
                </p>
              </div>
            )}

            {/* Book Details */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/50">
              {book.publish_date && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('bookDetail.publication')}</p>
                    <p className="text-foreground">
                      {format(
                        new Date(book.publish_date), 
                        i18n.language === 'es' ? "d 'de' MMMM, yyyy" : "MMMM d, yyyy", 
                        { locale: dateLocale }
                      )}
                    </p>
                  </div>
                </div>
              )}
              {book.pages && (
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('bookDetail.pages')}</p>
                    <p className="text-foreground">{book.pages}</p>
                  </div>
                </div>
              )}
              {book.language && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('bookDetail.language')}</p>
                    <p className="text-foreground">{book.language}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Purchase Links */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t('bookDetail.buyNow')}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {hasPaperback && (
                  <Button asChild variant="gold" size="lg" className="w-full gap-2">
                    <a href={translatedBook.localizedPaperbackUrl || '#'} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="w-5 h-5" />
                      Amazon Paperback
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {hasEbook && (
                  <Button asChild variant="outline" size="lg" className="w-full gap-2">
                    <a href={translatedBook.localizedKindleUrl || '#'} target="_blank" rel="noopener noreferrer">
                      <Smartphone className="w-5 h-5" />
                      Kindle eBook
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {book.audible_url && (
                  <Button asChild variant="secondary" size="lg" className="w-full gap-2">
                    <a href={book.audible_url} target="_blank" rel="noopener noreferrer">
                      <Headphones className="w-5 h-5" />
                      Audible
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {book.itunes_url && (
                  <Button asChild variant="secondary" size="lg" className="w-full gap-2">
                    <a href={book.itunes_url} target="_blank" rel="noopener noreferrer">
                      <Headphones className="w-5 h-5" />
                      iTunes
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Price */}
            {book.price && (
              <p className="text-2xl font-bold text-primary">{book.price}</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
