import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { usePublishedPosts } from '@/hooks/usePosts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function NewsPage() {
  const { data: posts, isLoading } = usePublishedPosts();

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Noticias y Blog
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mantente al día con los últimos anuncios, lanzamientos y reflexiones del autor.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-secondary rounded w-3/4 mb-3" />
                  <div className="h-4 bg-secondary rounded w-1/4 mb-4" />
                  <div className="h-20 bg-secondary rounded" />
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/noticias/${post.slug}`}
                  className="group block bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {post.featured_image_url && (
                      <div className="md:w-48 aspect-video md:aspect-square flex-shrink-0 overflow-hidden">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        {post.published_at && (
                          <span>{format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: es })}</span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
                      {post.body && (
                        <p className="text-muted-foreground line-clamp-2 mb-3">
                          {post.body.substring(0, 200)}...
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                        Leer más
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Próximamente
              </h3>
              <p className="text-muted-foreground">
                Las noticias y el blog estarán disponibles pronto.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
