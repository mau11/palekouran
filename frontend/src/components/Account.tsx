import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";

const Account = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    throw new Error("Account info not found");
  }

  const { user } = auth;

  return (
    <section>
      {/* Header */}
      <header>
        <h1>Welcome, {user?.username ?? "Learner"}!</h1>
      </header>

      {/* show general stats */}
      <section>
        <h2>My Stats</h2>
        <ul>
          <li>Total Decks: {/* number of decks */}</li>
        </ul>
      </section>

      {/* decks */}
      <section>
        <h2>My Decks</h2>
        <ul>{/* Loop through user decks */}</ul>
        <button onClick={() => navigate("/deck/new")}>Create New Deck</button>
      </section>

      {/* Account actions */}
    </section>
  );
};

export default Account;
