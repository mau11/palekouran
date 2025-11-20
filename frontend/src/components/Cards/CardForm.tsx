import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import {
  Form,
  FormRow,
  HeaderTwo,
  InputError,
  Label,
} from "../../Global.styled";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import { createCard } from "@lib/decks";

const CardForm = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Account info not found");
  }

  const deckId = usePathSegment(1);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [notes, setNotes] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = auth.session?.access_token;

      if (token) {
        const body = {
          userId: auth.user?.id,
          deckId: Number(deckId),
          word,
          translation,
          definition,
          notes,
          audioUrl,
          category,
        };

        await createCard(deckId, token, body);
        navigate(`/decks/${deckId}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <HeaderTwo>Create a card</HeaderTwo>

      {error && <InputError>{error}</InputError>}

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Label htmlFor="word">Word/Phrase</Label>
          <input
            type="word"
            name="word"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />
          <Label htmlFor="translation">Translation</Label>
          <input
            type="translation"
            name="translation"
            id="translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            required
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="definition">Definition</Label>
          <input
            type="definition"
            name="definition"
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />
          <Label htmlFor="category">Category</Label>
          <input
            type="category"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="notes">Notes</Label>
          <textarea
            name="notes"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="audioUrl">Recording</Label>
          <input
            type="audioUrl"
            name="audioUrl"
            id="audioUrl"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
          />
        </FormRow>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Create"}
        </button>
      </Form>
    </section>
  );
};

export default CardForm;
