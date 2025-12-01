import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { Button, Header, HeaderOne, SmallButton, Wrapper } from "@globalStyles";
import {
  AccountGrid,
  AcctHeaderTwo,
  ButtonGroup,
  Card,
  DeckItem,
  DeckList,
  EmptyContainer,
  EmptyState,
  InfoList,
  StatCard,
  StatLabel,
  StatsGrid,
  StatValue,
} from "./Account.styled";
import type { Deck } from "@utils/types";
import { getDecks } from "@lib/decks";
import Loader from "./Loader";
import { getReviews } from "@lib/reviews";

const Account = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    throw new Error("Account info not found");
  }

  const { user } = auth;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  const createdAt: string =
    (user &&
      new Date(user?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })) ||
    "";

  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCards, setTotalCards] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchDecks = async () => {
      const accessToken = auth?.session?.access_token;

      if (!accessToken) {
        navigate("/login");
      } else {
        let count = 0;
        try {
          const response = await getDecks(accessToken);
          const decks: Deck[] = response.decks;

          count = decks.reduce((acc, val) => acc + val.totalCards, 0);
          setTotalCards(count);

          setDecks(decks);

          const reviews = await getReviews(accessToken);
          if (reviews) {
            setReviewCount(reviews);
          }
          console.log(reviews);
        } catch (err) {
          console.error("Error retrieving data");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDecks();
  }, [auth?.session]);

  if (loading) return <Loader />;

  return (
    <Wrapper>
      <Header>
        <HeaderOne>Welcome back, {user?.username}!</HeaderOne>
      </Header>

      {/* stats */}
      <Card>
        <AcctHeaderTwo>
          <i className="fa-solid fa-chart-line"></i>
          Your Statistics
        </AcctHeaderTwo>
        <StatsGrid>
          <StatCard>
            <StatValue>{decks.length || 0}</StatValue>
            <StatLabel>Total Decks</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{totalCards}</StatValue>
            <StatLabel>Total Cards</StatLabel>
          </StatCard>

          <StatCard>
            <StatValue>{reviewCount}</StatValue>
            <StatLabel>Reviews Done</StatLabel>
          </StatCard>
        </StatsGrid>
      </Card>

      {/* account info */}
      <AccountGrid>
        <Card>
          <AcctHeaderTwo>
            <i className="fa-solid fa-user"></i>
            Account Information
          </AcctHeaderTwo>
          <InfoList>
            <li>
              <p>Username</p>
              <span>{user?.username}</span>
            </li>
            <li>
              <p>Email</p>
              <span>{user?.email}</span>
            </li>
            {createdAt && (
              <li>
                <p>Member Since</p>
                <span>{createdAt}</span>
              </li>
            )}
          </InfoList>
          <ButtonGroup>
            {/* TODO implement edit username/email */}
            <Button onClick={() => navigate("/account/edit")}>
              <i className="fa-solid fa-pen-to-square"></i> Edit Profile
            </Button>
            {/* TODO implement change password */}
            <Button onClick={() => navigate("/account/change-password")}>
              <i className="fa-solid fa-key"></i> Change Password
            </Button>
          </ButtonGroup>
        </Card>

        {/* decks */}
        <Card>
          <AcctHeaderTwo>
            <i className="fa-solid fa-layer-group"></i>
            My Decks
          </AcctHeaderTwo>
          {decks.length > 0 ? (
            <>
              <DeckList>
                {decks.map((deck) => (
                  <DeckItem key={deck.id}>
                    <span>{deck.title}</span>
                    <div>
                      <SmallButton
                        onClick={() => navigate(`/decks/${deck.id}`)}
                      >
                        View
                      </SmallButton>
                      <SmallButton
                        onClick={() =>
                          navigate(`/decks/${deck.id}?action=edit`)
                        }
                      >
                        Edit
                      </SmallButton>
                    </div>
                  </DeckItem>
                ))}
              </DeckList>
              <Button onClick={() => navigate("/decks/new")}>
                <i className="fa-solid fa-plus"></i> Create New Deck
              </Button>
            </>
          ) : (
            <EmptyContainer>
              <EmptyState>You haven't created any decks yet :(</EmptyState>
              <Button onClick={() => navigate("/decks/new")}>
                <i className="fa-solid fa-plus"></i> Create Your First Deck
              </Button>
            </EmptyContainer>
          )}
        </Card>
      </AccountGrid>
    </Wrapper>
  );
};

export default Account;
