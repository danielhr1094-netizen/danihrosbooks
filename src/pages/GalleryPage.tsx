import { useState, useEffect } from 'react';
import { Images, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type GalleryAlbum = Tables<'gallery_albums'>;
type GalleryImage = Tables<'gallery_images'>;

export default function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (selectedAlbum) {
      fetchImages(selectedAlbum);
    } else {
      fetchAllImages();
    }
  }, [selectedAlbum]);

  const fetchAlbums = async () => {
    const { data } = await supabase
      .from('gallery_albums')
      .select('*')
      .order('sort_order');
    setAlbums(data || []);
  };

  const fetchImages = async (albumId: string) => {
    setLoading(true);
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('album_id', albumId)
      .order('sort_order');
    setImages(data || []);
    setLoading(false);
  };

  const fetchAllImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });
    setImages(data || []);
    setLoading(false);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Galería
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora imágenes de portadas, eventos, promociones y más.
          </p>
        </div>
      </section>

      {/* Album Filters */}
      {albums.length > 0 && (
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedAlbum(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !selectedAlbum
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Todas
              </button>
              {albums.map((album) => (
                <button
                  key={album.id}
                  onClick={() => setSelectedAlbum(album.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedAlbum === album.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {album.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-secondary rounded-lg animate-pulse" />
              ))}
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setLightboxImage(image)}
                  className="group aspect-square rounded-lg overflow-hidden bg-secondary relative"
                >
                  <img
                    src={image.image_url}
                    alt={image.caption || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {image.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <p className="text-sm text-foreground">{image.caption}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Images className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Galería vacía
              </h3>
              <p className="text-muted-foreground">
                Pronto habrá imágenes aquí.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage.image_url}
            alt={lightboxImage.caption || 'Gallery image'}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          {lightboxImage.caption && (
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground bg-card px-4 py-2 rounded-lg">
              {lightboxImage.caption}
            </p>
          )}
        </div>
      )}
    </Layout>
  );
}
