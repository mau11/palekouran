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
