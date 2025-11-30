import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import Loader from "@components/Loader";
import { getDeckOfCards } from "@lib/decks";
import { addReview } from "@lib/reviews";
import type {
  CardNoUserId,
  CardReviewNoUserId,
  DeckNoUserId,
} from "@utils/types";
import {
  Button,
  EmptyState,
  EmptyText,
  Header,
  HeaderOne,
  IconLinkWrapper,
  Italic,
  Wrapper,
} from "@globalStyles";
import {
  AudioWrapper,
  CardContainer,
  NavWrapper,
  RatingSection,
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
  const now = new Date();

  const [showBack, setShowBack] = useState(false);
  const [token, setToken] = useState("");
  const [review, setReview] = useState("");

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

        // filter out cards that do not need to be reviewed now
        const spaceReppedCards = cards.filter(
          (item: CardInfo) => now >= new Date(item.nextReviewAt)
        );
        setCards(spaceReppedCards);
        setToken(accessToken);
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
        <Header>
          <HeaderOne>
            <i className="fa-solid fa-layer-group"></i> {deckInfo?.title}
          </HeaderOne>
          <Button onClick={() => navigate(`/decks/${deckId}`)}>
            Back to Deck
          </Button>
        </Header>

        <EmptyState>
          <EmptyText>No cards left to study</EmptyText>
          <Button onClick={() => navigate(`/decks/${deckId}/new`)}>
            <i className="fa-solid fa-plus fa-xs"></i> Add More Cards
          </Button>
        </EmptyState>
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

  const handleRating = async (
    e: React.MouseEvent,
    rating: CardReviewNoUserId["rating"]
  ) => {
    e.stopPropagation();
    setReview(rating);
    if (card.id) {
      await addReview(token, {
        rating,
        cardId: card.id,
      });
    }
  };

  return (
    <Wrapper>
      <Header>
        <HeaderOne>
          <i className="fa-solid fa-book-open"></i>
          {deckInfo?.title}
        </HeaderOne>
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
            {card.notes && <Italic>{card.notes}</Italic>}
            <RatingSection>
              <IconLinkWrapper
                $color="error"
                title="Hard"
                onClick={(e) => handleRating(e, "hard")}
                $disabled={(review && review !== "hard") || false}
              >
                <i className="fa-regular fa-face-frown"></i>
              </IconLinkWrapper>
              <IconLinkWrapper
                $color="info"
                title="Okay"
                onClick={(e) => handleRating(e, "okay")}
                $disabled={(review && review !== "okay") || false}
              >
                <i className="fa-regular fa-face-meh"></i>
              </IconLinkWrapper>
              <IconLinkWrapper
                $color="success"
                title="Easy!"
                onClick={(e) => handleRating(e, "easy")}
                $disabled={(review && review !== "easy") || false}
              >
                <i className="fa-regular fa-face-smile"></i>
              </IconLinkWrapper>
            </RatingSection>
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
