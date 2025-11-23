import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import { deleteCard, getCard } from "@lib/decks";
import type { CardNoUserId } from "@utils/types";
import CardForm from "./CardForm";

const CardPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const deckId = usePathSegment(1);
  const cardId = usePathSegment(2);
  const [params] = useSearchParams();

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
        console.error("Failed to load card:", err);
        navigate(`/decks/${deckId}`);
      }
    };
    fetchDecks();
  }, [deckId, cardId, auth?.session, params.toString()]);

  if (params.get("action")) {
    return <CardForm cardId={cardId} />;
  }

  const handleEdit = async () => {
    navigate(`/decks/${deckId}/${cardId}?action=edit`);
  };

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
      <span>
        Edit card info
        <i className="fa-solid fa-pen-to-square" onClick={handleEdit}></i>
      </span>
    </>
  );
};

export default CardPage;
