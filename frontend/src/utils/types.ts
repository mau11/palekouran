export type Session = {
  access_token: string;
};

// TODO
// for now, keep these types in sync with backend schema
// manually, when backend schema changes, update these types

// from api, see backend/src/types
export type User = {
  id: string;
  username: string;
  email: string;
  nativeLanguage: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Deck = {
  userId: string;
  title: string;
  sourceLanguage: string;
  targetLanguage: string;
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  notes?: string;
  isPublic?: boolean;
  totalCards?: number;
};
export type DeckNoUserId = Omit<Deck, "userId">;
export type DeckNoIds = Omit<DeckNoUserId, "id"> & {
  id?: number;
};

type Card = {
  id?: number;
  userId: string;
  deckId: number;
  category?: string;
  word: string;
  translation: string;
  definition?: string;
  notes?: string;
  audioUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export type CardNoUserId = Omit<Card, "userId">;
