import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Form, FormRow, HeaderTwo, InputError, Label } from "@globalStyles";
import AuthContext from "@contexts/AuthContext";
import { createDeck, editDeck, getDeckOfCards } from "@lib/decks";

type DeckFormProps = {
  deckId?: string;
};

const DeckForm = ({ deckId }: DeckFormProps) => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Account info not found");
  }

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (deckId) {
      const fetchDeck = async () => {
        const accessToken = auth?.session?.access_token;

        if (!accessToken) {
          navigate("/login");
          return;
        }

        try {
          const response = await getDeckOfCards(deckId, accessToken);
          const { info } = response.data;
          setTitle(info.title);
          setSourceLanguage(info.sourceLanguage);
          setTargetLanguage(info.targetLanguage);
          setNotes(info.notes);
          setLoading(false);
        } catch (err) {
          console.error("Failed to load deck:", err);
          navigate("/decks");
        }
      };
      fetchDeck();
    }
  }, [deckId, auth?.session]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = auth.session?.access_token;

      if (token) {
        const body = {
          userId: auth.user?.id,
          title,
          notes,
          sourceLanguage,
          targetLanguage,
        };

        if (deckId) {
          await editDeck(token, body, deckId);
          navigate(`/decks/${deckId}`);
        } else {
          await createDeck(token, body);
          navigate("/decks");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <HeaderTwo>{deckId ? "Edit Deck" : "Create a Deck"}</HeaderTwo>

      {error && <InputError>{error}</InputError>}

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="sourceLanguage">Source</Label>
          <input
            type="sourceLanguage"
            name="sourceLanguage"
            id="sourceLanguage"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            required
          />
          <Label htmlFor="targetLanguage">Target</Label>
          <input
            type="targetLanguage"
            name="targetLanguage"
            id="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            required
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

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : deckId ? "Save Changes" : "Create"}
        </button>
      </Form>
    </section>
  );
};

export default DeckForm;
