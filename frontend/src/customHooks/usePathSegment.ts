import { useLocation } from "react-router";

// get values from pathname by index, for example:
// to get the id 5 from path '/decks/5', call usePathSegment(1)
export const usePathSegment = (index: number) => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  return segments[index] ?? null;
};
