import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { deleteDeckOfCards, getDecks } from "@lib/decks";
import type { Deck } from "@utils/types";

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

  const handleDelete = async (id: number) => {
    await deleteDeckOfCards(id, token);
    setDecks(decks.filter((deck) => deck.id !== Number(id)));
  };

  if (loading) return <p>Loading</p>;

  return (
    <>
      <h1>Decks</h1>
      <button onClick={() => navigate("/decks/new")}>Create New Deck</button>
      {decks?.length > 0 ? (
        decks.map((deck) => {
          const { title, id } = deck;
          return (
            <div key={id}>
              <p onClick={() => navigate(`${id}`)}>{title}</p>
              <i
                className="fa-solid fa-trash"
                onClick={() => handleDelete(id)}
              ></i>
            </div>
          );
        })
      ) : (
        <p>You don't have any decks yet :(</p>
      )}
    </>
  );
};

export default Decks;
