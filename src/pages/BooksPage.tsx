import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import BookCard from '@/components/books/BookCard';
import { useBooks } from '@/hooks/useBooks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BooksPage() {
  const { data: books, isLoading } = useBooks();
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  // Extract unique filters
  const filters = useMemo(() => {
    if (!books) return { series: [], languages: [], formats: [] };
    
    const series = [...new Set(books.map(b => b.series).filter(Boolean))] as string[];
    const languages = [...new Set(books.map(b => b.language).filter(Boolean))] as string[];
    const formats = ['paperback', 'ebook', 'audiobook'];
    
    return { series, languages, formats };
  }, [books]);

  // Filter books
  const filteredBooks = useMemo(() => {
    if (!books) return [];
    
    return books.filter(book => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          book.title.toLowerCase().includes(searchLower) ||
          book.series?.toLowerCase().includes(searchLower) ||
          book.synopsis?.toLowerCase().includes(searchLower) ||
          book.tagline?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      
      // Series filter
      if (selectedSeries && book.series !== selectedSeries) return false;
      
      // Language filter
      if (selectedLanguage && book.language !== selectedLanguage) return false;
      
      // Format filter
      if (selectedFormat) {
        if (selectedFormat === 'paperback' && !book.amazon_paperback_url) return false;
        if (selectedFormat === 'ebook' && !book.amazon_kindle_url) return false;
        if (selectedFormat === 'audiobook' && !book.audible_url && !book.itunes_url) return false;
      }
      
      return true;
    });
  }, [books, search, selectedSeries, selectedLanguage, selectedFormat]);

  const hasActiveFilters = selectedSeries || selectedLanguage || selectedFormat;

  const clearFilters = () => {
    setSelectedSeries(null);
    setSelectedLanguage(null);
    setSelectedFormat(null);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Catálogo de Libros
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora todas las historias de fantasía. Disponibles en papel, digital y audio.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por título, saga..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {/* Series */}
              {filters.series.length > 0 && (
                <select
                  value={selectedSeries || ''}
                  onChange={(e) => setSelectedSeries(e.target.value || null)}
                  className="h-10 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Todas las Sagas</option>
                  {filters.series.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              )}

              {/* Language */}
              {filters.languages.length > 0 && (
                <select
                  value={selectedLanguage || ''}
                  onChange={(e) => setSelectedLanguage(e.target.value || null)}
                  className="h-10 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Todos los Idiomas</option>
                  {filters.languages.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              )}

              {/* Format */}
              <select
                value={selectedFormat || ''}
                onChange={(e) => setSelectedFormat(e.target.value || null)}
                className="h-10 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Todos los Formatos</option>
                <option value="paperback">Papel</option>
                <option value="ebook">eBook</option>
                <option value="audiobook">Audiolibro</option>
              </select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                  <X className="w-4 h-4" />
                  Limpiar
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedSeries && (
                <Badge variant="secondary" className="gap-1">
                  Saga: {selectedSeries}
                  <button onClick={() => setSelectedSeries(null)}><X className="w-3 h-3" /></button>
                </Badge>
              )}
              {selectedLanguage && (
                <Badge variant="secondary" className="gap-1">
                  Idioma: {selectedLanguage}
                  <button onClick={() => setSelectedLanguage(null)}><X className="w-3 h-3" /></button>
                </Badge>
              )}
              {selectedFormat && (
                <Badge variant="secondary" className="gap-1">
                  Formato: {selectedFormat}
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
              {[...Array(8)].map((_, i) => (
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
                {filteredBooks.length} libro{filteredBooks.length !== 1 ? 's' : ''} encontrado{filteredBooks.length !== 1 ? 's' : ''}
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
                No se encontraron libros
              </h3>
              <p className="text-muted-foreground mb-4">
                Prueba con diferentes filtros o términos de búsqueda
              </p>
              <Button variant="outline" onClick={() => { setSearch(''); clearFilters(); }}>
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
