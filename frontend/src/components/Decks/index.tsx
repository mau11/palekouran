import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { deleteDeckOfCards, getDecks } from "@lib/decks";
import type { Deck, DeckNoUserId } from "@utils/types";
import {
  Button,
  Card,
  CardInfo,
  CardDelete,
  CardTitle,
  Grid,
  Header,
  HeaderOne,
  Wrapper,
  EmptyState,
  EmptyText,
  IconLinkWrapper,
  CardContent,
} from "@globalStyles";
import Loader from "@components/Loader";

const Decks = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchDecks = async () => {
      const accessToken = auth?.session?.access_token;

      if (accessToken) {
        const response = await getDecks(accessToken);
        const { decks } = response;
        setDecks(decks);
        setLoading(false);
        setToken(accessToken);
      } else {
        navigate("/login");
      }
    };
    fetchDecks();
  }, [auth?.session]);

  const handleEdit = async (
    e: React.MouseEvent,
    deckId: DeckNoUserId["id"]
  ) => {
    e.stopPropagation();

    navigate(`/decks/${deckId}?action=edit`);
  };

  const handleDelete = async (
    e: React.MouseEvent,
    id: DeckNoUserId["id"],
    title: DeckNoUserId["title"]
  ) => {
    e.stopPropagation();
    const confirmed = confirm(
      `Are you sure you'd like to delete the '${title}' deck?`
    );
    if (confirmed) {
      await deleteDeckOfCards(id, token);
      setDecks(decks.filter((deck) => deck.id !== Number(id)));
    }
  };

  if (loading) return <Loader />;

  return (
    <Wrapper>
      <Header>
        <HeaderOne>
          <i className="fa-solid fa-layer-group"></i>
          My Decks
        </HeaderOne>
        <Button onClick={() => navigate("/decks/new")}>
          <i className="fa-solid fa-plus"></i> Create Deck
        </Button>
      </Header>

      {decks?.length > 0 ? (
        <Grid>
          {decks.map((deck) => {
            const { title, id, totalCards } = deck;
            return (
              <Card key={id} onClick={() => navigate(`${id}`)}>
                <CardDelete
                  onClick={(e) => handleDelete(e, id, title)}
                  title="Delete Deck"
                >
                  <i className="fa-solid fa-trash"></i>
                </CardDelete>

                <CardContent>
                  <CardTitle>{title}</CardTitle>
                  <CardInfo>
                    {totalCards} {totalCards === 1 ? "Card" : "Cards"}
                  </CardInfo>

                  <IconLinkWrapper onClick={(e) => handleEdit(e, id)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                    Edit Deck
                  </IconLinkWrapper>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      ) : (
        <EmptyState>
          <EmptyText>You haven't created any decks yet</EmptyText>
          <Button onClick={() => navigate("/decks/new")}>
            <i className="fa-solid fa-plus"></i> Create Your First Deck
          </Button>
        </EmptyState>
      )}
    </Wrapper>
  );
};

export default Decks;
