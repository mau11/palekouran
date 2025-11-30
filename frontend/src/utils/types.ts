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
  totalCards: number;
};
export type DeckNoUserId = Omit<Deck, "userId">;
export type DeckNoIds = Omit<DeckNoUserId, "id" | "totalCards"> & {
  id?: number;
  totalCards?: number;
};

export type Card = {
  userId: string;
  deckId: number;
  word: string;
  translation: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  notes?: string;
  definition?: string;
  audioUrl?: string;
  category?: string;
  nextReviewAt: Date;
  interval?: number;
};
export type CardNoUserId = Omit<Card, "userId">;
export type CardNoReview = Omit<CardNoUserId, "nextReviewAt">;

export type CardReview = {
  id?: number;
  userId: string;
  cardId: number;
  rating: string;
  reviewedAt?: Date;
};

export type CardReviewNoUserId = Omit<CardReview, "userId">;
