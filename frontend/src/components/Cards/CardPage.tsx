import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import { deleteCard, getCard } from "@lib/decks";
import type { CardNoUserId } from "@utils/types";

const CardPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const deckId = usePathSegment(1);
  const cardId = usePathSegment(2);

  const [card, setCard] = useState<CardNoUserId>();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchDecks = async () => {
      const accessToken = auth?.session?.access_token;

      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const response = await getCard(deckId, cardId, accessToken);
        const { data } = response;
        setCard(data.card);
        setToken(accessToken);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load deck:", err);
        navigate("/decks");
      }
    };
    fetchDecks();
  }, [auth?.session]);

  const handleDelete = async (cardId: number) => {
    await deleteCard(Number(deckId), cardId, token);
    navigate(`/decks/${deckId}`);
  };

  if (loading) return <p>Loading</p>;

  return (
    <>
      <p>Category: {card?.category}</p>
      <p>Word: {card?.word}</p>
      <p>Translation: {card?.translation}</p>
      <p>Definition: {card?.definition}</p>
      <p>Notes: {card?.notes}</p>
      <p>Audio: {card?.audioUrl}</p>
      <span>
        Delete this card
        <i
          className="fa-solid fa-trash"
          onClick={() => handleDelete(Number(cardId))}
        ></i>
      </span>
    </>
  );
};

export default CardPage;
