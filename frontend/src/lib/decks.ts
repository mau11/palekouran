import { API_URL } from "@utils/api";
import type { DeckNoUserId } from "@utils/types";

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
    const errorMsg = `Error: ${response.status} ${response.statusText}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  return response.json();
};

// get all decks
export const getDecks = (token: string) => {
  return fetchAPI(`/api/decks`, { token });
};

// create deck
export const createDeck = (token: string, data: DeckNoUserId) => {
  return fetchAPI(`/api/decks`, {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
};
