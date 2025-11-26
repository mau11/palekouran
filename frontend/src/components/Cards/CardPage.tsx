import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import { deleteCard, getCard } from "@lib/decks";
import type { CardNoUserId } from "@utils/types";
import CardForm from "./CardForm";
import {
  Button,
  CardDetailSection,
  DetailLabel,
  DetailRow,
  DetailValue,
  FullSpan,
  Header,
  HeaderOne,
  IconLinkWrapper,
  Wrapper,
} from "@globalStyles";
import Loader from "@components/Loader";

const CardPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const deckId = usePathSegment(1);
  const cardId = usePathSegment(2);
  const [params] = useSearchParams();

  const [card, setCard] = useState<CardNoUserId>();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    const fetchDecks = async () => {
      const accessToken = auth?.session?.access_token;

      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const response = await getCard(deckId, cardId, accessToken);
        const { card, signedUrl } = response.data;
        setCard(card);
        setAudioUrl(signedUrl);
        setToken(accessToken);
      } catch (err) {
        console.error("Failed to load card:", err);
        navigate(`/decks/${deckId}`);
      } finally {
        setLoading(false);
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

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you'd like to delete this card?`);

    if (confirmed) {
      await deleteCard(Number(deckId), Number(cardId), token);
      navigate(`/decks/${deckId}`);
    }
  };

  if (loading) return <Loader />;

  return (
    <Wrapper>
      <Header>
        <HeaderOne>Card Details</HeaderOne>
        <Button onClick={() => navigate(`/decks/${deckId}`)}>
          Back to Deck
        </Button>
      </Header>

      <CardDetailSection>
        <DetailRow>
          <DetailLabel>Category: </DetailLabel>
          <DetailValue>{card?.category}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>Word/Phrase</DetailLabel>
          <DetailValue>{card?.word}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>Translation</DetailLabel>
          <DetailValue>{card?.translation}</DetailValue>
        </DetailRow>

        {card?.definition && (
          <DetailRow>
            <DetailLabel>Definition</DetailLabel>
            <DetailValue>{card.definition}</DetailValue>
          </DetailRow>
        )}

        {card?.notes && (
          <DetailRow>
            <DetailLabel>Notes</DetailLabel>
            <DetailValue>{card.notes}</DetailValue>
          </DetailRow>
        )}

        {audioUrl && (
          <DetailRow>
            <DetailLabel>Audio</DetailLabel>
            <audio controls src={audioUrl} />
          </DetailRow>
        )}
      </CardDetailSection>

      <FullSpan>
        <IconLinkWrapper>
          Edit card{" "}
          <i onClick={handleEdit} className="fa-solid fa-pen-to-square"></i>
        </IconLinkWrapper>
        <IconLinkWrapper>
          Delete this card{" "}
          <i onClick={handleDelete} className="fa-solid fa-trash"></i>
        </IconLinkWrapper>
      </FullSpan>
    </Wrapper>
  );
};

export default CardPage;
