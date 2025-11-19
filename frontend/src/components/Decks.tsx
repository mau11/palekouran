import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { API_URL } from "@utils/api";

const Decks = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      const response = await fetch(`${API_URL}/api/decks`, {
        headers: { Authorization: `Bearer ${auth?.session?.access_token}` },
      });

      const { decks } = await response.json();
      setDecks(decks);
      setLoading(false);
    };
    fetchDecks();
  }, []);

  if (loading) return <p>Loading</p>;

  return (
    <>
      <h1>Decks</h1>
      <button onClick={() => navigate("/decks/new")}>Create New Deck</button>
      {decks?.length > 0 ? (
        decks.map((deck, i) => {
          const { title } = deck;
          return <p key={i}>{title}</p>;
        })
      ) : (
        <p>You don't have any decks yet :(</p>
      )}
    </>
  );
};

export default Decks;
