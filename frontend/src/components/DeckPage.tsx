import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import { getDeckOfCards } from "@lib/decks";
import type { CardNoUserId, DeckNoUserId } from "@utils/types";

const DeckPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const deckId = usePathSegment(1);

  const [deckInfo, setDeckInfo] = useState<DeckNoUserId>();
  const [cards, setCards] = useState<CardNoUserId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      const token = auth?.session?.access_token;

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await getDeckOfCards(deckId, token);
        const { info, cards } = response.data;
        setDeckInfo(info);
        setCards(cards);
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
      <h2>{deckInfo?.title}</h2>
      <p>Source: {deckInfo?.sourceLanguage}</p>
      <p>Learning: {deckInfo?.targetLanguage}</p>
      <p>Notes: {deckInfo?.notes}</p>
      <p>Total cards: {deckInfo?.totalCards}</p>

      <button onClick={() => navigate(`/decks/${deckId}/new`)}>
        Add New Card
      </button>

      <section>
        {cards?.length > 0 ? (
          cards.map((card) => {
            const { word, id } = card;
            return (
              <p key={id} onClick={() => navigate(`${id}`)}>
                {word}
              </p>
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
