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
  SmallButton,
  Wrapper,
} from "@globalStyles";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import { createCard, editCard, getCard } from "@lib/decks";
import AudioRecorder from "@components/Cards/AudioRecorder";
import { uploadAudio } from "@lib/uploads";
import Loader from "@components/Loader";
import { PlayerWrapper } from "./Card.styled";

type CardFormProps = {
  cardId?: string;
};

const CardForm = ({ cardId }: CardFormProps) => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Account info not found");
  }

  const deckId = usePathSegment(1);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(cardId ? true : false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [notes, setNotes] = useState("");
  const [playbackUrl, setPlaybackUrl] = useState(""); // signed URL for <audio />
  const [storedAudioPath, setStoredAudioPath] = useState(""); // db path for audio
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (cardId) {
      const fetchDeck = async () => {
        const accessToken = auth?.session?.access_token;

        if (!accessToken) {
          navigate("/login");
          return;
        }

        try {
          const response = await getCard(deckId, cardId, accessToken);
          const { card, signedUrl } = response.data;
          setCategory(card.category);
          setWord(card.word);
          setTranslation(card.translation);
          setNotes(card.notes);
          setStoredAudioPath(card.audioUrl);
          setDefinition(card.definition);
          setPlaybackUrl(signedUrl);
          setLoading(false);
        } catch (err) {
          console.error("Failed to load card:", err);
          navigate(`/decks/${cardId}`);
        }
      };
      fetchDeck();
    }
  }, [deckId, auth?.session]);

  const processAudio = async (token: string) => {
    if (recordedBlob) {
      const timestamp = Date.now();
      const filename = `${timestamp}.webm`;

      const { data } = await uploadAudio(filename, recordedBlob, token, deckId);
      return data;
    } else {
      return "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = auth.session?.access_token;

      if (token) {
        let finalAudioUrl = storedAudioPath;

        // user recorded new audio -> upload & replace
        if (recordedBlob) {
          finalAudioUrl = await processAudio(token);
        }

        // user removed audio -> playbackUrl is "", and no blob -> remove
        if (!playbackUrl && !recordedBlob) {
          finalAudioUrl = "";
        }

        const body = {
          userId: auth.user?.id,
          deckId: Number(deckId),
          word,
          translation,
          definition,
          notes,
          audioUrl: finalAudioUrl,
          category,
        };

        if (cardId) {
          await editCard(token, body, deckId, cardId);
          navigate(`/decks/${deckId}/${cardId}`);
        } else {
          await createCard(deckId, token, body);
          navigate(`/decks/${deckId}`);
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
        <HeaderOne>{cardId ? "Edit Card" : "Create a Card"}</HeaderOne>
        <Button onClick={() => navigate(`/decks/${deckId}`)}>
          Back to Deck
        </Button>
      </Header>

      {error && <InputError>{error}</InputError>}

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Label htmlFor="word">Word/Phrase*</Label>
          <input
            type="text"
            name="word"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />
          <Label htmlFor="translation">Translation*</Label>
          <input
            type="text"
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
            type="text"
            name="definition"
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />
          <Label htmlFor="category">Category</Label>
          <input
            type="text"
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
          <Label>Pronunciation Recording</Label>
          {playbackUrl && !recordedBlob && (
            <PlayerWrapper>
              <audio src={playbackUrl} controls />
              <SmallButton
                $color="dark-red"
                onClick={() => {
                  setPlaybackUrl("");
                  setStoredAudioPath("");
                }}
              >
                <i title="Remove Recording" className="fa-solid fa-trash"></i>{" "}
                Remove
              </SmallButton>
            </PlayerWrapper>
          )}
          {!playbackUrl && <AudioRecorder setRecordedBlob={setRecordedBlob} />}
        </FormRow>

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : cardId ? "Save Changes" : "Create"}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default CardForm;
