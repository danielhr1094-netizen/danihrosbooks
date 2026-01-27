import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

export default function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot field
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const { toast } = useToast();

  const contactSchema = z.object({
    name: z.string().min(1, t('contact.validation.nameRequired')).max(100),
    email: z.string().email(t('contact.validation.emailInvalid')).max(255),
    message: z.string().min(1, t('contact.validation.messageRequired')).max(1000),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const result = contactSchema.safeParse({ name, email, message });
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; message?: string } = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as 'name' | 'email' | 'message';
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await supabase.functions.invoke('submit-contact', {
        body: { name, email, message, website }
      });

      if (response.error) throw response.error;
      
      const data = response.data;
      if (data?.error) {
        if (data.error.includes('Too many requests')) {
          toast({
            title: t('contact.rateLimitTitle'),
            description: t('contact.rateLimitDesc'),
            variant: 'destructive',
          });
        } else {
          throw new Error(data.error);
        }
        return;
      }

      toast({
        title: t('contact.success'),
        description: t('contact.successDesc'),
      });
      
      setName('');
      setEmail('');
      setMessage('');
      setWebsite('');
    } catch {
      toast({
        title: t('contact.error'),
        description: t('contact.errorDesc'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-card rounded-xl border border-border/50 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field - hidden from users, filled by bots */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                
                <div>
                  <Label htmlFor="name">{t('contact.name')}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('contact.namePlaceholder')}
                    className="mt-1"
                    disabled={loading}
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">{t('contact.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('contact.emailPlaceholder')}
                    className="mt-1"
                    disabled={loading}
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="message">{t('contact.message')}</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contact.messagePlaceholder')}
                    rows={5}
                    className="mt-1 resize-none"
                    disabled={loading}
                  />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                </div>

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {t('contact.send')}
                </Button>
              </form>
            </div>

            <div className="mt-8 text-center text-muted-foreground">
              <p>{t('contact.socialInfo')}</p>
              <a href="mailto:contacto@danihros.com" className="text-primary hover:underline mt-2 block">
                contacto@danihros.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
