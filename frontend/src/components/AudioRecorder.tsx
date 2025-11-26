// https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
// https://github.com/mdn/dom-examples/tree/main/media/web-dictaphone
// https://github.com/mdn/dom-examples/blob/main/media/web-dictaphone/scripts/app.js

import { useState, useRef } from "react";

type AudioRecorderProps = {
  setRecordedBlob: (blob: Blob) => void;
};

const MAX_DURATION_MS = 10000; // 10 seconds

const AudioRecorder = ({ setRecordedBlob }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [currentAudio, setCurrentAudio] = useState<Blob | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);

      setCurrentAudio(blob);
      setAudioUrl(url);
      setRecordedBlob(blob);

      stream.getTracks().forEach((t) => t.stop());
    };

    recorder.start();
    setIsRecording(true);

    setTimeout(() => {
      if (recorder.state === "recording") {
        recorder.stop();
      }
      setIsRecording(false);
    }, MAX_DURATION_MS);
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    setIsRecording(false);
  };

  const clearRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setCurrentAudio(null);
    setAudioUrl("");
  };

  return (
    <div>
      {!currentAudio && (
        <>
          {!isRecording ? (
            <button onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : (
            <button onClick={stopRecording} type="button">
              Stop
            </button>
          )}
        </>
      )}

      {currentAudio && (
        <>
          <audio src={audioUrl} controls />
          <button onClick={clearRecording} type="button">
            Clear
          </button>
        </>
      )}
    </div>
  );
};

export default AudioRecorder;
