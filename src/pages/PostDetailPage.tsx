import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { usePost } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = usePost(slug || '');

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto animate-pulse">
            <div className="h-8 bg-secondary rounded w-32 mb-8" />
            <div className="h-10 bg-secondary rounded w-3/4 mb-4" />
            <div className="h-6 bg-secondary rounded w-1/4 mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-secondary rounded" />
              <div className="h-4 bg-secondary rounded" />
              <div className="h-4 bg-secondary rounded w-3/4" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Artículo no encontrado
          </h1>
          <Link to="/noticias">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a noticias
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link to="/noticias" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver a noticias
          </Link>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            {post.published_at && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: es })}</span>
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.body}
            </div>
          </div>

          {/* Back to news */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <Link to="/noticias">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver a noticias
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
