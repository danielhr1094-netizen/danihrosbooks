import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import BookCard from '@/components/books/BookCard';
import { useBooks } from '@/hooks/useBooks';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBookCategory, BookCategory } from '@/utils/bookTranslations';

export default function BooksPage() {
  const { t } = useTranslation();
  const { data: books, isLoading } = useBooks();
  const [activeCategory, setActiveCategory] = useState<BookCategory>('saga');

  // Filter books by category
  const booksByCategory = useMemo(() => {
    if (!books) return { saga: [], collaborations: [] };
    
    const saga = books.filter(book => getBookCategory(book.id) === 'saga');
    const collaborations = books.filter(book => getBookCategory(book.id) === 'collaborations');
    
    return { saga, collaborations };
  }, [books]);

  // Get books for active category
  const filteredBooks = useMemo(() => {
    return activeCategory === 'saga' ? booksByCategory.saga : booksByCategory.collaborations;
  }, [activeCategory, booksByCategory]);

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('books.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('books.subtitle')}
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as BookCategory)}>
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:inline-flex h-auto gap-2 bg-transparent p-0">
              <TabsTrigger 
                value="saga" 
                className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg border border-border/50 data-[state=active]:border-primary bg-card"
              >
                <span className="text-sm md:text-base">{t('books.sagaTab')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="collaborations"
                className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg border border-border/50 data-[state=active]:border-primary bg-card"
              >
                <span className="text-sm md:text-base">{t('books.collaborationsTab')}</span>
              </TabsTrigger>
            </TabsList>

            {/* Category Description */}
            <div className="mt-4 text-muted-foreground">
              {activeCategory === 'saga' ? (
                <p>{t('books.sagaDescription')}</p>
              ) : (
                <p>{t('books.collaborationsDescription')}</p>
              )}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-[2/3] bg-secondary" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-secondary rounded w-3/4" />
                    <div className="h-4 bg-secondary rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {t('books.noBooks')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('books.tryDifferentFilters')}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
