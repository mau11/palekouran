import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { getDecks } from "@lib/decks";

const Decks = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      const token = auth?.session?.access_token;

      if (token) {
        const response = await getDecks(token);
        const { decks } = response;
        setDecks(decks);
        setLoading(false);
      } else {
        navigate("/login");
      }
    };
    fetchDecks();
  }, [auth?.session]);

  if (loading) return <p>Loading</p>;

  return (
    <>
      <h1>Decks</h1>
      <button onClick={() => navigate("/decks/new")}>Create New Deck</button>
      {decks?.length > 0 ? (
        decks.map((deck, i) => {
          const { title, id } = deck;
          return (
            <p key={i} onClick={() => navigate(`${id}`)}>
              {title}
            </p>
          );
        })
      ) : (
        <p>You don't have any decks yet :(</p>
      )}
    </>
  );
};

export default Decks;
