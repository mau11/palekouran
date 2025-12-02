import { Routes, Route } from "react-router"; // https://reactrouter.com/start/declarative/routing
import "./App.css";
import Layout from "@components/Layout";
import Home from "@components/Home";
import AuthForm from "@components/AuthForm";
import ProtectedLayout from "@components/ProtectedLayout";
import Account from "@components/Account";
import AuthContext from "@contexts/AuthContext";
import useAuth from "@customHooks/useAuth";
import Decks from "@components/Decks";
import DeckForm from "@components/Decks/DeckForm";
import DeckPage from "@components/Decks/DeckPage";
import CardForm from "@components/Cards/CardForm";
import CardPage from "@components/Cards/CardPage";
import About from "@components/About";
import Loader from "@components/Loader";
import StudyView from "@components/Cards/StudyView";
import NotFound from "@components/NotFound";

function App() {
  const auth = useAuth();

  if (auth.loading) return <Loader />;

  return (
    <AuthContext value={auth}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/account" element={<Account />} />
          <Route path="/decks">
            <Route index element={<Decks />} />
            <Route path="new" element={<DeckForm />} />
            <Route path=":deckId">
              <Route index element={<DeckPage />} />
              <Route path="new" element={<CardForm />} />
              <Route path="study" element={<StudyView />} />
              <Route path=":cardId" element={<CardPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthContext>
  );
}

export default App;
