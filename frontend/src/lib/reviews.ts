import { API_URL } from "@utils/api";

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

// add review
export const addReview = (
  token: string,
  data: { rating: string; cardId: number }
) => {
  return fetchAPI(`/api/reviews`, {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
};
