import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Headphones, BookOpen, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tables } from '@/integrations/supabase/types';

type Book = Tables<'books'>;

interface BookCardProps {
  book: Book;
  className?: string;
}

export default function BookCard({ book, className }: BookCardProps) {
  const { t } = useTranslation();
  const hasAudiobook = book.audible_url || book.itunes_url;
  const hasEbook = book.amazon_kindle_url;
  const hasPaperback = book.amazon_paperback_url;

  return (
    <Link 
      to={`/libros/${book.id}`}
      className={cn(
        "group block bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_12px_40px_hsl(0_0%_0%/0.4)]",
        className
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {book.is_new && (
            <Badge className="bg-accent text-accent-foreground border-0">{t('books.new')}</Badge>
          )}
          {hasAudiobook && (
            <Badge variant="secondary" className="gap-1">
              <Headphones className="w-3 h-3" />
              {t('common.audio')}
            </Badge>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {book.title}
        </h3>
        
        {book.series && (
          <p className="text-sm text-primary/80 mt-1">{book.series}</p>
        )}

        {book.tagline && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{book.tagline}</p>
        )}

        <div className="flex items-center gap-3 mt-3 text-muted-foreground">
          {hasPaperback && (
            <div className="flex items-center gap-1 text-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('common.paper')}</span>
            </div>
          )}
          {hasEbook && (
            <div className="flex items-center gap-1 text-xs">
              <Smartphone className="w-3.5 h-3.5" />
              <span>eBook</span>
            </div>
          )}
          {hasAudiobook && (
            <div className="flex items-center gap-1 text-xs">
              <Headphones className="w-3.5 h-3.5" />
              <span>{t('common.audio')}</span>
            </div>
          )}
        </div>

        {book.price && (
          <p className="text-primary font-semibold mt-3">{book.price}</p>
        )}
      </div>
    </Link>
  );
}
