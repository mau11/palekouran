import { API_URL } from "@utils/api";

// upload pronunciation to supabase
export const uploadAudio = async (
  filename: string,
  blob: Blob,
  token: string,
  deckId: string
) => {
  const formData = new FormData();
  formData.append("file", blob, filename);

  const res = await fetch(`${API_URL}/api/uploads/audio/${deckId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};
