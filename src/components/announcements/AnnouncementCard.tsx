import { useTranslation } from 'react-i18next';
import { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

type Announcement = Tables<'announcements'>;

interface AnnouncementCardProps {
  announcement: Announcement;
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { i18n } = useTranslation();
  const dateLocale = i18n.language === 'es' ? es : enUS;

  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300">
      {announcement.image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={announcement.image_url}
            alt={announcement.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      <div className="p-5">
        {announcement.start_at && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Calendar className="w-4 h-4" />
            <span>
              {format(
                new Date(announcement.start_at), 
                i18n.language === 'es' ? "d 'de' MMMM, yyyy" : "MMMM d, yyyy", 
                { locale: dateLocale }
              )}
            </span>
          </div>
        )}

        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
          {announcement.title}
        </h3>

        {announcement.body && (
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {announcement.body}
          </p>
        )}

        {announcement.cta_url && announcement.cta_text && (
          <Button variant="outline" size="sm" asChild className="gap-2">
            <a href={announcement.cta_url} target="_blank" rel="noopener noreferrer">
              {announcement.cta_text}
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
