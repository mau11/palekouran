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
import { PlayerWrapper } from "./Card.styled";
import AuthContext from "@contexts/AuthContext";
import { usePathSegment } from "@customHooks/usePathSegment";
import AudioRecorder from "@components/Cards/AudioRecorder";
import Loader from "@components/Loader";
import { createCard, editCard, getCard, getDeckOfCards } from "@lib/decks";
import { uploadAudio } from "@lib/uploads";
import { createTTS, getSignedTTS } from "@lib/tts";
import type { DeckNoUserId } from "@utils/types";
import { getLangName } from "@utils/constants";
import { getTrans } from "@lib/translations";

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
  const [miniLoaderAI, setMiniLoaderAI] = useState(false);
  const [miniLoaderTrans, setMiniLoaderTrans] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [definition, setDefinition] = useState("");
  const [notes, setNotes] = useState("");
  const [playbackUrl, setPlaybackUrl] = useState(""); // signed URL for <audio />
  const [storedAudioPath, setStoredAudioPath] = useState(""); // db path for audio
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [token, setToken] = useState("");
  const [ttsUrl, setTtsUrl] = useState("");
  const [ttsAudioId, setTtsAudioId] = useState<number | null>(null);
  const [deck, setDeck] = useState<DeckNoUserId | null>(null);
  const [disabledAI, setDisabledAI] = useState(true);
  const [disabledTrans, setDisabledTrans] = useState(true);

  useEffect(() => {
    const accessToken = auth?.session?.access_token;

    if (!accessToken) {
      navigate("/login");
      return;
    }

    setToken(accessToken);

    const fetchData = async () => {
      const deckResponse = await getDeckOfCards(deckId, accessToken);
      setDeck(deckResponse.data.info);

      if (cardId) {
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

          if (card.ttsAudioId) {
            setTtsAudioId(card.ttsAudioId);
            const { data } = await getSignedTTS(card.ttsAudioId, accessToken);
            setTtsUrl(data.signedUrl);
          }

          setLoading(false);
        } catch (err) {
          console.error("Failed to load card:", err);
          navigate(`/decks/${cardId}`);
        }
      }
    };
    fetchData();
  }, [deckId, auth?.session]);

  useEffect(() => {
    if (word.length) {
      setDisabledAI(false);
      setDisabledTrans(false);
    } else {
      setDisabledAI(true);
      setDisabledTrans(true);
    }
  }, [word.trim().length]);

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

  const handleGenerateTTS = async () => {
    if (!disabledAI) {
      setMiniLoaderAI(true);

      try {
        const language = deck?.targetLanguage;

        if (language) {
          const data = {
            text: word,
            language,
            cardId: cardId || "new",
          };

          const response = await createTTS(data, token);
          const { audioUrl, ttsAudioId: newTtsId } = response;
          setTtsUrl(audioUrl);
          setTtsAudioId(newTtsId);
        }
      } catch (err) {
        setError("Failed to generate audio");
      } finally {
        setMiniLoaderAI(false);
      }
    }
  };

  const handleGetTranslation = async () => {
    setError("");
    setDisabledTrans(true);
    setMiniLoaderTrans(true);
    const sourceLang = deck?.sourceLanguage;
    const targetLang = deck?.targetLanguage;

    if (sourceLang && targetLang) {
      const trans = await getTrans(word, sourceLang, targetLang);
      if (word.trim() === trans.trim()) {
        setError("Translation unavailable. Try another word.");
      } else {
        setTranslation(trans);
      }
    }
    setMiniLoaderTrans(false);
    setDisabledTrans(false);
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
          ttsAudioId,
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

      <InputError>{error}</InputError>

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

          {/* AI pronunciation */}
          <PlayerWrapper>
            <SmallButton
              disabled={disabledAI || !!ttsUrl}
              type="button"
              onClick={handleGenerateTTS}
            >
              {miniLoaderAI ? (
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              ) : (
                <i className="fa-solid fa-volume-high"></i>
              )}{" "}
              AI Pronunciation
            </SmallButton>
            {ttsUrl && <audio src={ttsUrl} controls />}
          </PlayerWrapper>

          <Label htmlFor="translation">
            {deck && getLangName(deck.sourceLanguage)} Translation*
          </Label>
          <input
            type="text"
            name="translation"
            id="translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            required
          />

          {/* Get translation */}
          <PlayerWrapper>
            <SmallButton
              disabled={disabledTrans || !!ttsUrl}
              type="button"
              onClick={handleGetTranslation}
            >
              {miniLoaderTrans ? (
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              ) : (
                <i className="fa-solid fa-language"></i>
              )}{" "}
              Get Translation
            </SmallButton>
          </PlayerWrapper>
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
