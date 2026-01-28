import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import BookCard from '@/components/books/BookCard';
import { useBooks } from '@/hooks/useBooks';
import { useTranslatedBooks } from '@/hooks/useTranslatedBook';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { getBookCategory, BookCategory } from '@/utils/bookTranslations';

export default function BooksPage() {
  const { t } = useTranslation();
  const { data: books, isLoading } = useBooks();
  const [search, setSearch] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<BookCategory>('saga');

  // Get translated books
  const translatedBooks = useTranslatedBooks(books || []);

  // Filter books by category
  const booksByCategory = useMemo(() => {
    if (!books) return { saga: [], collaborations: [] };
    
    const saga = books.filter(book => getBookCategory(book.id) === 'saga');
    const collaborations = books.filter(book => getBookCategory(book.id) === 'collaborations');
    
    return { saga, collaborations };
  }, [books]);

  // Filter books within active category
  const filteredBooks = useMemo(() => {
    const categoryBooks = activeCategory === 'saga' ? booksByCategory.saga : booksByCategory.collaborations;
    
    return categoryBooks.filter(book => {
      // Search filter using translated content
      if (search) {
        const translatedBook = translatedBooks.find(tb => tb.id === book.id);
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          (translatedBook?.translatedTitle || book.title).toLowerCase().includes(searchLower) ||
          (translatedBook?.translatedSeries || book.series)?.toLowerCase().includes(searchLower) ||
          (translatedBook?.translatedSynopsis || book.synopsis)?.toLowerCase().includes(searchLower) ||
          (translatedBook?.translatedTagline || book.tagline)?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      
      // Format filter
      if (selectedFormat) {
        if (selectedFormat === 'paperback' && !book.amazon_paperback_url) return false;
        if (selectedFormat === 'ebook' && !book.amazon_kindle_url) return false;
        if (selectedFormat === 'audiobook' && !book.audible_url && !book.itunes_url) return false;
      }
      
      return true;
    });
  }, [books, translatedBooks, search, selectedFormat, activeCategory, booksByCategory]);

  const hasActiveFilters = selectedFormat;

  const clearFilters = () => {
    setSelectedFormat(null);
  };

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

      {/* Search & Filters */}
      <section className="py-6 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('books.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {/* Format */}
              <select
                value={selectedFormat || ''}
                onChange={(e) => setSelectedFormat(e.target.value || null)}
                className="h-10 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">{t('books.allFormats')}</option>
                <option value="paperback">{t('books.paperback')}</option>
                <option value="ebook">{t('books.ebook')}</option>
                <option value="audiobook">{t('books.audiobook')}</option>
              </select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                  <X className="w-4 h-4" />
                  {t('books.clear')}
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedFormat && (
                <Badge variant="secondary" className="gap-1">
                  {t('books.format')}: {selectedFormat}
                  <button onClick={() => setSelectedFormat(null)}><X className="w-3 h-3" /></button>
                </Badge>
              )}
            </div>
          )}
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
            <>
              <p className="text-muted-foreground mb-6">
                {filteredBooks.length === 1 
                  ? t('books.booksFound', { count: filteredBooks.length })
                  : t('books.booksFoundPlural', { count: filteredBooks.length })}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {t('books.noBooks')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('books.tryDifferentFilters')}
              </p>
              <Button variant="outline" onClick={() => { setSearch(''); clearFilters(); }}>
                {t('books.clearFilters')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
