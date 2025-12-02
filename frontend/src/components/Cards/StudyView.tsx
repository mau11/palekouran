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
  CardBack,
  CardContainer,
  CardFace,
  NavWrapper,
  PlayerWrapper,
  RatingSection,
  SmallSubtext,
  Subtext,
} from "./Card.styled";
import { getSignedTTS } from "@lib/tts";

type CardInfo = CardNoUserId & {
  signedUrl?: string;
  id: string;
  ttsAudioId?: string;
  ttsAudioUrl?: string;
};

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
  const [reviews, setReviews] = useState<Record<number, string>>({});

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

        const spaceReppedCards = await Promise.all(
          cards
            // filter out cards that do not need to be reviewed now
            .filter((item: CardInfo) => now >= new Date(item.nextReviewAt))
            // add tts audio to card
            .map(async (card: CardInfo) => {
              if (card.ttsAudioId) {
                const { data } = await getSignedTTS(
                  card.ttsAudioId,
                  accessToken
                );
                return { ...card, ttsAudioUrl: data.signedUrl };
              }
              return card;
            })
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

    const cardId = card.id;
    setReviews((prev) => ({ ...prev, [cardId]: rating }));
    await addReview(token, {
      rating,
      cardId: cardId,
    });
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

      <CardContainer onClick={flip} $flipped={showBack}>
        {!showBack ? (
          <CardFace>
            <h2>{card.word}</h2>
            {card.signedUrl && (
              <PlayerWrapper>
                <AudioWrapper src={card.signedUrl} controls />
              </PlayerWrapper>
            )}
            {card.ttsAudioUrl && (
              <>
                <SmallSubtext>AI Generated Pronunciation:</SmallSubtext>
                <PlayerWrapper>
                  <AudioWrapper src={card.ttsAudioUrl} controls />
                </PlayerWrapper>
              </>
            )}
            <Subtext>(Tap to flip)</Subtext>
            <IconLinkWrapper $fixed={true}>
              <i className="fa-solid fa-repeat"></i>
            </IconLinkWrapper>
          </CardFace>
        ) : (
          <CardBack>
            <h2>{card.translation}</h2>
            {card.definition && <p>{card.definition}</p>}
            {card.notes && <Italic>{card.notes}</Italic>}
            <RatingSection>
              <IconLinkWrapper
                $color="error"
                title="Hard"
                onClick={(e) => handleRating(e, "hard")}
                $disabled={
                  reviews[card.id] ? reviews[card.id] !== "hard" : false
                }
              >
                <i className="fa-regular fa-face-frown"></i>
              </IconLinkWrapper>
              <IconLinkWrapper
                $color="info"
                title="Okay"
                onClick={(e) => handleRating(e, "okay")}
                $disabled={
                  reviews[card.id] ? reviews[card.id] !== "okay" : false
                }
              >
                <i className="fa-regular fa-face-meh"></i>
              </IconLinkWrapper>
              <IconLinkWrapper
                $color="success"
                title="Easy!"
                onClick={(e) => handleRating(e, "easy")}
                $disabled={
                  reviews[card.id] ? reviews[card.id] !== "easy" : false
                }
              >
                <i className="fa-regular fa-face-smile"></i>
              </IconLinkWrapper>
            </RatingSection>
            <IconLinkWrapper $fixed={true}>
              <i className="fa-solid fa-repeat"></i>
            </IconLinkWrapper>
          </CardBack>
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
