import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import { getCard } from "@lib/decks";
import type { CardNoUserId } from "@utils/types";

const CardPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const deckId = usePathSegment(1);
  const cardId = usePathSegment(2);

  const [card, setCard] = useState<CardNoUserId>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      const token = auth?.session?.access_token;

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await getCard(deckId, cardId, token);
        const { data } = response;
        setCard(data.card);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load deck:", err);
        navigate("/decks");
      }
    };
    fetchDecks();
  }, [auth?.session]);

  if (loading) return <p>Loading</p>;

  return (
    <>
      <p>Category: {card?.category}</p>
      <p>Word: {card?.word}</p>
      <p>Translation: {card?.translation}</p>
      <p>Definition: {card?.definition}</p>
      <p>Notes: {card?.notes}</p>
      <p>Audio: {card?.audioUrl}</p>
    </>
  );
};

export default CardPage;
