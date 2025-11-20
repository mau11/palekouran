import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Form, FormRow, HeaderTwo, InputError, Label } from "@globalStyles";
import AuthContext from "@contexts/AuthContext";
import { createDeck } from "@lib/decks";

const DeckForm = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Account info not found");
  }

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");

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

        await createDeck(token, body);
        navigate("/decks");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <HeaderTwo>Create a deck</HeaderTwo>

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
          {loading ? "Loading..." : "Create"}
        </button>
      </Form>
    </section>
  );
};

export default DeckForm;
