import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import Loader from "@components/Loader";
import { deleteCard, deleteDeckOfCards, getDeckOfCards } from "@lib/decks";
import { LANGUAGES } from "@utils/constants";
import type { CardNoUserId, DeckNoUserId } from "@utils/types";
import DeckForm from "./DeckForm";
import {
  Button,
  Card,
  EmptyState,
  EmptyText,
  Grid,
  Header,
  HeaderOne,
  HeaderTwo,
  IconLinkWrapper,
  Wrapper,
} from "@globalStyles";
import {
  CardCount,
  CardDelete,
  CardNotes,
  CardTitle,
  DeckActions,
  DeckInfoRow,
  DeckInfoSection,
  FilterControls,
  FilterGroup,
  FilterLabel,
  ToggleButton,
} from "./Deck.styled";

const DeckPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const deckId = usePathSegment(1);
  const [params, setParams] = useSearchParams();

  const [deckInfo, setDeckInfo] = useState<DeckNoUserId>();
  const [cards, setCards] = useState<CardNoUserId[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [reversed, setReversed] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [filter, setFilter] = useState(params.get("category") || "");

  useEffect(() => {
    const fetchDeck = async () => {
      const accessToken = auth?.session?.access_token;

      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await getDeckOfCards(deckId, accessToken);
        const { info, cards } = response.data;

        // get unique categories from cards
        const uniqueCategories: string[] = Array.from(
          new Set(
            cards.map((card: CardNoUserId) => card.category).filter(Boolean)
          )
        );

        setDeckInfo(info);
        setCards(cards);
        setCategories(uniqueCategories);
        setToken(accessToken);
      } catch (err) {
        console.error("Failed to load deck:", err);
        navigate("/decks");
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, [deckId, auth?.session, params.get("action")]);

  useEffect(() => {
    setFilter(params.get("category") || "");
  }, [params]);

  if (params.get("action")) {
    return <DeckForm deckId={deckId} />;
  }

  const filteredCards = filter
    ? cards.filter((card) => card.category === filter)
    : cards;

  const handleCategoryChange = (category: string) => {
    setFilter(category);
    category ? setParams({ category }) : setParams({});
  };

  const getLangName = (code: string | undefined) => {
    if (!code) return "";
    const language = LANGUAGES.find((lang) => lang.code === code);
    return language ? language.name : code;
  };

  const handleEdit = async () => {
    navigate(`/decks/${deckId}?action=edit`);
  };

  const handleEditCard = async (e: React.MouseEvent, cardId: number) => {
    e.stopPropagation();
    navigate(`/decks/${deckId}/${cardId}?action=edit`);
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
          <i className="fa-solid fa-plus fa-xs"></i> Add Card
        </Button>
      </Header>

      <DeckInfoSection>
        <DeckInfoRow>
          <HeaderTwo>
            {getLangName(deckInfo?.sourceLanguage)}
            <i className="fa-solid fa-arrow-right-arrow-left fa-xs"></i>
            {getLangName(deckInfo?.targetLanguage)}
          </HeaderTwo>

          {cards?.length > 0 && (
            <Button onClick={() => navigate(`/decks/${deckId}/study`)}>
              <i className="fa-solid fa-book-open"></i> Study Now
            </Button>
          )}
        </DeckInfoRow>

        {deckInfo?.notes && <CardNotes>{deckInfo?.notes}</CardNotes>}

        <DeckActions>
          <IconLinkWrapper onClick={handleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
            Edit Deck
          </IconLinkWrapper>
          <IconLinkWrapper
            onClick={(e) => handleDelete(e, "deck", Number(deckId))}
          >
            <i className="fa-solid fa-trash"></i>
            Delete Deck
          </IconLinkWrapper>
        </DeckActions>
      </DeckInfoSection>

      {!!deckInfo?.totalCards && (
        <>
          <CardCount>
            <i className="fa-solid fa-layer-group"></i>
            {filteredCards.length}
            {filteredCards.length === 1 ? " card" : " cards"}
          </CardCount>
          <FilterControls>
            {categories.length > 0 && (
              <FilterGroup>
                <FilterLabel>
                  <i className="fa-solid fa-filter"></i>
                  Category:
                </FilterLabel>
                <select
                  value={filter}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  name="category"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </FilterGroup>
            )}

            <ToggleButton onClick={() => setReversed(!reversed)}>
              <i className="fa-solid fa-arrow-right-arrow-left"></i>
              {reversed ? "Show Original" : "Show Translation"}
            </ToggleButton>
          </FilterControls>
        </>
      )}

      {filteredCards?.length > 0 ? (
        <Grid>
          {filteredCards.map((card) => {
            const { word, id, translation } = card;
            return (
              <Card key={id} onClick={() => navigate(`${id}`)}>
                <CardDelete
                  onClick={(e) => handleDelete(e, "card", Number(id))}
                  title="Delete Card"
                >
                  <i className="fa-solid fa-trash"></i>
                </CardDelete>
                <CardTitle>{reversed ? translation : word}</CardTitle>
                <IconLinkWrapper onClick={(e) => handleEditCard(e, id!)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                  Edit Card
                </IconLinkWrapper>
              </Card>
            );
          })}
        </Grid>
      ) : (
        <EmptyState>
          <EmptyText>
            {filter
              ? "No cards found in this category"
              : "You haven't added any cards yet :("}
          </EmptyText>
          {!filter && (
            <Button onClick={() => navigate(`/decks/${deckId}/new`)}>
              <i className="fa-solid fa-plus"></i> Create Your First Card
            </Button>
          )}
        </EmptyState>
      )}
    </Wrapper>
  );
};

export default DeckPage;
