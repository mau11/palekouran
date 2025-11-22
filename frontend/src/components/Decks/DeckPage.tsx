import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import { deleteCard, deleteDeckOfCards, getDeckOfCards } from "@lib/decks";
import type { CardNoUserId, DeckNoUserId } from "@utils/types";

const DeckPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const deckId = usePathSegment(1);

  const [deckInfo, setDeckInfo] = useState<DeckNoUserId>();
  const [cards, setCards] = useState<CardNoUserId[]>([]);
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
        const response = await getDeckOfCards(deckId, accessToken);
        const { info, cards } = response.data;
        setDeckInfo(info);
        setCards(cards);
        setToken(accessToken);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load deck:", err);
        navigate("/decks");
      }
    };
    fetchDecks();
  }, [auth?.session]);

  const handleDelete = async (item: string, cardId: number) => {
    if (item === "deck") {
      await deleteDeckOfCards(Number(deckId), token);
      navigate("/decks");
    } else {
      item === "card" && (await deleteCard(Number(deckId), cardId, token));
      setCards(cards.filter((card) => card.id !== cardId));
    }
  };

  if (loading) return <p>Loading</p>;

  return (
    <>
      <h2>{deckInfo?.title}</h2>
      <p>Source: {deckInfo?.sourceLanguage}</p>
      <p>Learning: {deckInfo?.targetLanguage}</p>
      <p>Notes: {deckInfo?.notes}</p>
      <p>Total cards: {deckInfo?.totalCards}</p>
      <span>
        Delete this deck
        <i
          className="fa-solid fa-trash"
          onClick={() => handleDelete("deck", Number(deckId))}
        ></i>
      </span>

      <button onClick={() => navigate(`/decks/${deckId}/new`)}>
        Add New Card
      </button>

      <section>
        {cards?.length > 0 ? (
          cards.map((card) => {
            const { word, id } = card;
            return (
              <div key={id}>
                <p onClick={() => navigate(`${id}`)}>{word}</p>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleDelete("card", Number(id))}
                ></i>
              </div>
            );
          })
        ) : (
          <p>No cards yet</p>
        )}
      </section>
    </>
  );
};

export default DeckPage;
