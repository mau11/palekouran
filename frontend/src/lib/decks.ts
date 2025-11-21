import { API_URL } from "@utils/api";
import type { CardNoUserId, DeckNoUserId } from "@utils/types";

export type DeckNoIds = Omit<DeckNoUserId, "id">;

type FetchAPIOptions = RequestInit & { token?: string };

const fetchAPI = async (path: string, options: FetchAPIOptions = {}) => {
  const url = API_URL + path;
  const { token, headers: customHeaders, ...rest } = options;
  // rest = methods, body, etc

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };

  const response = await fetch(url, { headers, ...rest });

  if (!response.ok) {
    const errorMsg = `${response.status} ${response.statusText}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  return response.json();
};

// get all decks
export const getDecks = (token: string) => {
  return fetchAPI(`/api/decks`, { token });
};

// get one deck, including all cards
export const getDeckOfCards = (id: string, token: string) => {
  return fetchAPI(`/api/decks/${id}`, { token });
};

// delete one deck, cascade delete cards within
export const deleteDeckOfCards = (id: number, token: string) => {
  return fetchAPI(`/api/decks/${id}`, {
    method: "DELETE",
    token,
  });
};

// create deck
export const createDeck = (token: string, data: DeckNoIds) => {
  return fetchAPI(`/api/decks`, {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
};

// get one card
export const getCard = (deckId: string, cardId: string, token: string) => {
  return fetchAPI(`/api/decks/${deckId}/${cardId}`, { token });
};

// create card
export const createCard = (id: string, token: string, data: CardNoUserId) => {
  return fetchAPI(`/api/decks/${id}/new`, {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
};
