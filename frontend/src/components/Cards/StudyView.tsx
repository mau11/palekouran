import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import { Button, Header, HeaderOne, Wrapper } from "@globalStyles";
import { getDeckOfCards } from "@lib/decks";
import Loader from "@components/Loader";
import type { CardNoUserId, DeckNoUserId } from "@utils/types";
import {
  AudioWrapper,
  CardContainer,
  NavWrapper,
  Subtext,
} from "./Card.styled";

type CardInfo = CardNoUserId & { signedUrl?: string };

const StudyView = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const deckId = usePathSegment(1);

  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deckInfo, setDeckInfo] = useState<DeckNoUserId | null>(null);
  const [cards, setCards] = useState<CardInfo[]>([]);
  const card = cards[currentIndex];
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
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
      } catch (err) {
        console.error("Failed to load deck:", err);
        navigate("/decks");
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, [deckId]);

  if (loading) return <Loader />;

  if (!card) {
    return (
      <Wrapper>
        <p>No cards in this deck.</p>
        <Button onClick={() => navigate(`/decks/${deckId}`)}>
          Back to Deck
        </Button>
      </Wrapper>
    );
  }

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowBack(false); // reset card to view front
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setShowBack(false); // reset card to view front
    }
  };

  const flip = () => setShowBack((v) => !v);

  return (
    <Wrapper>
      <Header>
        <HeaderOne>Learning: {deckInfo?.title}</HeaderOne>
        <Button onClick={() => navigate(`/decks/${deckId}`)}>
          Back to Deck
        </Button>
      </Header>

      <CardContainer onClick={flip}>
        {!showBack ? (
          <>
            <h2>{card.word}</h2>
            {card.signedUrl && <AudioWrapper src={card.signedUrl} controls />}
            <Subtext>(Tap to flip)</Subtext>
          </>
        ) : (
          <>
            <h2>{card.translation}</h2>
            {card.definition && <p>{card.definition}</p>}
            {card.notes && <p>Notes: {card.notes}</p>}
          </>
        )}
      </CardContainer>

      <NavWrapper>
        <Button disabled={currentIndex === 0} onClick={goPrev}>
          Previous
        </Button>

        <p>
          {currentIndex + 1} / {cards.length}
        </p>

        <Button disabled={currentIndex === cards.length - 1} onClick={goNext}>
          Next
        </Button>
      </NavWrapper>
    </Wrapper>
  );
};

export default StudyView;
