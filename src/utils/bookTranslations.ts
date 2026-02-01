// Mapping of book IDs to translation keys
// This allows dynamic translation of book content based on the current language

export const BOOK_TRANSLATION_KEYS: Record<string, string> = {
  // El Medallón del Destino
  'd2ceea00-93e2-4615-9b1a-6b294db54dec': 'medallon',
  // Sombras del Pasado
  '945a0d71-c261-4769-89f3-bc0fb02957d9': 'sombras',
  // Luvis: Historia de una Flor Valiente
  'e8ede3ab-a356-4c2d-8a25-8e8ed6a18129': 'luvis',
};

// English Amazon links for each book
export const ENGLISH_AMAZON_LINKS: Record<string, { paperback: string; kindle: string }> = {
  // The Medallion of Destiny
  'd2ceea00-93e2-4615-9b1a-6b294db54dec': {
    paperback: 'https://a.co/d/0egzrFf',
    kindle: 'https://a.co/d/0egzrFf',
  },
  // Shadows of the Past
  '945a0d71-c261-4769-89f3-bc0fb02957d9': {
    paperback: 'https://a.co/d/hzXoMq7',
    kindle: 'https://a.co/d/hzXoMq7',
  },
  // Luvis: Story of a Brave Flower
  'e8ede3ab-a356-4c2d-8a25-8e8ed6a18129': {
    paperback: 'https://a.co/d/9AO17fF',
    kindle: 'https://a.co/d/9AO17fF',
  },
};

// English cover images for each book
export const ENGLISH_COVER_IMAGES: Record<string, string> = {
  'd2ceea00-93e2-4615-9b1a-6b294db54dec': '/images/covers/medallon_cover_en.jpg',
  '945a0d71-c261-4769-89f3-bc0fb02957d9': '/images/covers/sombras_cover_en.jpg',
  'e8ede3ab-a356-4c2d-8a25-8e8ed6a18129': '/images/covers/luvis_cover_en.jpg',
};

// Book category mapping for filtering
export type BookCategory = 'saga' | 'collaborations';

export const BOOK_CATEGORIES: Record<string, BookCategory> = {
  // Saga de los Cuentos Perdidos de Terra
  'd2ceea00-93e2-4615-9b1a-6b294db54dec': 'saga', // El Medallón del Destino
  '945a0d71-c261-4769-89f3-bc0fb02957d9': 'saga', // Sombras del Pasado
  // Colaboraciones
  'e8ede3ab-a356-4c2d-8a25-8e8ed6a18129': 'collaborations', // Luvis
};

export function getBookCategory(bookId: string): BookCategory {
  return BOOK_CATEGORIES[bookId] || 'collaborations';
}
