import { useTranslation } from 'react-i18next';
import { Tables } from '@/integrations/supabase/types';
import { BOOK_TRANSLATION_KEYS, ENGLISH_AMAZON_LINKS } from '@/utils/bookTranslations';

type Book = Tables<'books'>;

interface TranslatedBook extends Book {
  translatedTitle: string;
  translatedSeries: string | null;
  translatedTagline: string | null;
  translatedSynopsis: string | null;
  localizedPaperbackUrl: string | null;
  localizedKindleUrl: string | null;
}

export function useTranslatedBook(book: Book): TranslatedBook {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en' || i18n.language?.startsWith('en');
  
  const translationKey = BOOK_TRANSLATION_KEYS[book.id];
  
  if (!translationKey || !isEnglish) {
    // Return original Spanish data
    return {
      ...book,
      translatedTitle: book.title,
      translatedSeries: book.series,
      translatedTagline: book.tagline,
      translatedSynopsis: book.synopsis,
      localizedPaperbackUrl: book.amazon_paperback_url,
      localizedKindleUrl: book.amazon_kindle_url,
    };
  }
  
  // Get English translations
  const englishLinks = ENGLISH_AMAZON_LINKS[book.id];
  
  return {
    ...book,
    translatedTitle: t(`bookData.${translationKey}.title`, book.title),
    translatedSeries: t(`bookData.${translationKey}.series`, { defaultValue: book.series }),
    translatedTagline: t(`bookData.${translationKey}.tagline`, { defaultValue: book.tagline }),
    translatedSynopsis: t(`bookData.${translationKey}.synopsis`, { defaultValue: book.synopsis }),
    localizedPaperbackUrl: englishLinks?.paperback || book.amazon_paperback_url,
    localizedKindleUrl: englishLinks?.kindle || book.amazon_kindle_url,
  };
}

export function useTranslatedBooks(books: Book[]): TranslatedBook[] {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en' || i18n.language?.startsWith('en');
  
  return books.map(book => {
    const translationKey = BOOK_TRANSLATION_KEYS[book.id];
    
    if (!translationKey || !isEnglish) {
      return {
        ...book,
        translatedTitle: book.title,
        translatedSeries: book.series,
        translatedTagline: book.tagline,
        translatedSynopsis: book.synopsis,
        localizedPaperbackUrl: book.amazon_paperback_url,
        localizedKindleUrl: book.amazon_kindle_url,
      };
    }
    
    const englishLinks = ENGLISH_AMAZON_LINKS[book.id];
    
    return {
      ...book,
      translatedTitle: t(`bookData.${translationKey}.title`, book.title),
      translatedSeries: t(`bookData.${translationKey}.series`, { defaultValue: book.series }),
      translatedTagline: t(`bookData.${translationKey}.tagline`, { defaultValue: book.tagline }),
      translatedSynopsis: t(`bookData.${translationKey}.synopsis`, { defaultValue: book.synopsis }),
      localizedPaperbackUrl: englishLinks?.paperback || book.amazon_paperback_url,
      localizedKindleUrl: englishLinks?.kindle || book.amazon_kindle_url,
    };
  });
}

export type { TranslatedBook };
