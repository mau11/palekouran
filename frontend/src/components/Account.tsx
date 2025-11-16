import { useContext } from "react";
import AuthContext from "@contexts/AuthContext";

const Account = () => {
  const auth = useContext(AuthContext);

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
        <button>Create New Deck</button>
      </section>

      {/* Account actions */}
    </section>
  );
};

export default Account;
