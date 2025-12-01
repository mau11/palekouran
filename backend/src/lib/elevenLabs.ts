// https://elevenlabs.io/docs/quickstart
// https://elevenlabs.io/docs/models#flash-v25
// https://elevenlabs.io/docs/api-reference/text-to-speech/convert
// https://nodejs.org/api/webstreams.html#web-streams-api

import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import { Readable } from "stream";
import { buffer } from "stream/consumers";
import "dotenv/config";

export const VOICE_ID =
  process.env.ELEVEN_LABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb"; // default voice id
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const elevenlabs = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY });

export const generateAudio = async (text: string, languageCode: string) => {
  const audioStream = await elevenlabs.textToSpeech.convert(VOICE_ID, {
    outputFormat: "mp3_44100_128",
    text,
    modelId: "eleven_multilingual_v2", // or "eleven_multilingual_v2"
    languageCode,
  });

  // convert WebReadableStream to Node buffer
  // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
  const nodeStream = Readable.fromWeb(audioStream as any);
  return await buffer(nodeStream);
};
