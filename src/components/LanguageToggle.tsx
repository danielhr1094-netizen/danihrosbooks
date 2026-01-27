import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const isEnglish = i18n.language === 'en';

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 border-primary/30 hover:border-primary/50 hover:bg-primary/10"
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">
        {isEnglish ? t('language.switchToSpanish') : t('language.switchToEnglish')}
      </span>
    </Button>
  );
}
