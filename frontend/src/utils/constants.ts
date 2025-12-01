export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" },
  { code: "ma", name: "Arabic (Morocco)" },
  { code: "yue", name: "Cantonese" },
  { code: "cv", name: "Creole (Cabo Verde)" },
  { code: "ht", name: "Creole (Haiti)" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ig", name: "Igbo" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Mandarin" },
  { code: "pt", name: "Portuguese" },
  { code: "es", name: "Spanish" },
  { code: "vi", name: "Vietnamese" },
];

export const getLangName = (code: string | undefined) => {
  if (!code) return "";
  const language = LANGUAGES.find((lang) => lang.code === code);
  return language ? language.name : code;
};
