import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Form,
  FormRow,
  Header,
  HeaderOne,
  InputError,
  Label,
  StyledInput,
  Wrapper,
} from "@globalStyles";
import AuthContext from "@contexts/AuthContext";
import { createDeck, editDeck, getDeckOfCards } from "@lib/decks";
import { LANGUAGES } from "@utils/constants";
import Loader from "@components/Loader";

type DeckFormProps = {
  deckId?: string;
};

const DeckForm = ({ deckId }: DeckFormProps) => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Account info not found");
  }

  const navigate = useNavigate();

  const [loading, setLoading] = useState(deckId ? true : false);
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
        } catch (err) {
          console.error("Failed to load deck:", err);
          navigate("/decks");
        } finally {
          setLoading(false);
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

  if (loading) return <Loader />;

  return (
    <Wrapper>
      <Header>
        <HeaderOne>{deckId ? "Edit Deck" : "Create a Deck"}</HeaderOne>
      </Header>
      <Form onSubmit={handleSubmit}>
        {error && <InputError>{error}</InputError>}
        <FormRow>
          <Label htmlFor="title">Deck Title*</Label>
          <StyledInput
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="sourceLanguage">Translate from*</Label>
          <select
            id="sourceLanguage"
            name="sourceLanguage"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            required
          >
            <option value="">Select a language</option>
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </FormRow>

        <FormRow>
          <Label htmlFor="targetLanguage">Translate to*</Label>
          <select
            id="targetLanguage"
            name="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            required
          >
            <option value="">Select a language</option>
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
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

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : deckId ? "Save Changes" : "Create"}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default DeckForm;
