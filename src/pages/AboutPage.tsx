import { useTranslation } from 'react-i18next';
import { User, Book, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('about.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 items-start">
              {/* Photo Placeholder */}
              <div className="aspect-[3/4] rounded-xl bg-card border border-border/50 flex items-center justify-center">
                <User className="w-24 h-24 text-muted-foreground/30" />
              </div>

              {/* Bio */}
              <div className="md:col-span-2 space-y-6">
                <h2 className="font-display text-3xl font-bold text-foreground">
                  {t('about.authorName')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.bio1')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.bio2')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.bio3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saga Section */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                {t('about.sagaTitle')}
              </h2>
            </div>

            <div className="bg-background rounded-xl border border-border/50 p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('about.sagaDesc1')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('about.sagaDesc2')}
              </p>
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">{t('about.sagaAvailable')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              {t('about.missionTitle')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.missionQuote')}
            </p>
            <p className="text-primary font-display text-xl mt-6 italic">
              — Danihros
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
