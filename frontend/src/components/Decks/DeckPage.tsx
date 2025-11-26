import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import { deleteCard, deleteDeckOfCards, getDeckOfCards } from "@lib/decks";
import type { CardNoUserId, DeckNoUserId } from "@utils/types";
import DeckForm from "./DeckForm";
import { LANGUAGES } from "@utils/constants";
import Loader from "@components/Loader";
import {
  Button,
  Card,
  CardDelete,
  CardNotes,
  CardTitle,
  EmptyState,
  EmptyText,
  FullSpan,
  Grid,
  Header,
  HeaderOne,
  HeaderTwo,
  IconLinkWrapper,
  Wrapper,
} from "@globalStyles";

const DeckPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const deckId = usePathSegment(1);
  const [params] = useSearchParams();

  const [deckInfo, setDeckInfo] = useState<DeckNoUserId>();
  const [cards, setCards] = useState<CardNoUserId[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

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
        setToken(accessToken);
      } catch (err) {
        console.error("Failed to load deck:", err);
        navigate("/decks");
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, [deckId, auth?.session, params.toString()]);

  if (params.get("action")) {
    return <DeckForm deckId={deckId} />;
  }

  const getLangName = (code: string | undefined) => {
    if (!code) return "";
    const language = LANGUAGES.find((lang) => lang.code === code);
    return language ? language.name : code;
  };

  const handleEdit = async () => {
    navigate(`/decks/${deckId}?action=edit`);
  };

  const handleDelete = async (
    e: React.MouseEvent,
    item: string,
    cardId: number
  ) => {
    e.stopPropagation();
    const confirmed = confirm(
      `Are you sure you'd like to delete this ${item}?`
    );
    if (confirmed) {
      if (item === "deck") {
        await deleteDeckOfCards(Number(deckId), token);
        navigate("/decks");
      } else {
        item === "card" && (await deleteCard(Number(deckId), cardId, token));
        setCards(cards.filter((card) => card.id !== cardId));
        setDeckInfo((prev) =>
          prev
            ? {
                ...prev,
                totalCards: (prev.totalCards || 0) - 1,
              }
            : prev
        );
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <Wrapper>
      <Header>
        <HeaderOne>
          <i className="fa-solid fa-layer-group"></i> {deckInfo?.title}
        </HeaderOne>
        <Button onClick={() => navigate(`/decks/${deckId}/new`)}>
          Add New Card
        </Button>
      </Header>

      <section>
        <HeaderTwo>
          {getLangName(deckInfo?.sourceLanguage)}{" "}
          <i className="fa-solid fa-arrow-right-arrow-left fa-xs"></i>{" "}
          {getLangName(deckInfo?.targetLanguage)}
        </HeaderTwo>
        {deckInfo?.notes && <CardNotes>{deckInfo?.notes}</CardNotes>}
        <FullSpan>
          <IconLinkWrapper onClick={handleEdit}>
            Edit Deck
            <i className="fa-solid fa-pen-to-square"></i>
          </IconLinkWrapper>
          <IconLinkWrapper
            onClick={(e) => handleDelete(e, "deck", Number(deckId))}
          >
            Delete Deck
            <i className="fa-solid fa-trash"></i>
          </IconLinkWrapper>
        </FullSpan>
      </section>

      <p>Total cards: {deckInfo?.totalCards}</p>
      {cards?.length > 0 ? (
        <Grid>
          {cards.map((card) => {
            const { word, id } = card;
            return (
              <Card key={id} onClick={() => navigate(`${id}`)}>
                <CardDelete
                  onClick={(e) => handleDelete(e, "card", Number(id))}
                  title="Delete Card"
                >
                  <i className="fa-solid fa-trash"></i>
                </CardDelete>
                <CardTitle>{word}</CardTitle>
              </Card>
            );
          })}
        </Grid>
      ) : (
        <EmptyState>
          <EmptyText>You don't have any cards yet :(</EmptyText>
        </EmptyState>
      )}
    </Wrapper>
  );
};

export default DeckPage;
