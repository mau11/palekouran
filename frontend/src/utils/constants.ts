// ElevenLabs supports 32 languages for TTS:
// https://elevenlabs.io/docs/models#flash-v25
// English (USA, UK, Australia, Canada), Japanese, Chinese, German, Hindi, French (France, Canada), Korean, Portuguese (Brazil, Portugal), Italian, Spanish (Spain, Mexico), Indonesian, Dutch, Turkish, Filipino, Polish, Swedish, Bulgarian, Romanian, Arabic (Saudi Arabia, UAE), Czech, Greek, Finnish, Croatian, Malay, Slovak, Danish, Tamil, Ukrainian, Russian, Hungarian, Norwegian, Vietnamese

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

// TODO map available AI languages to listed options on backend
// const mappingForTTSVoice = {
//   ar: ['ar', 'ma'],
//   en: ['en'],
//   ja: ['ja'],
//   zh: ['zh', 'yue']
// }

// Available translation languages: https://developers.google.com/workspace/admin/directory/v1/languages
// const languages = [
//   ["", ""],
//   ["Amharic", "am"],
//   ["Arabic", "ar"],
//   ["Basque", "eu"],
//   ["Bengali", "bn"],
//   ["Portuguese (Brazil)", "pt-BR"],
//   ["Bulgarian", "bg"],
//   ["Catalan", "ca"],
//   ["Cherokee", "chr"],
//   ["Croatian", "hr"],
//   ["Czech", "cs"],
//   ["Danish", "da"],
//   ["Dutch", "nl"],
//   ["Estonian", "et"],
//   ["Filipino", "fil"],
//   ["Finnish", "fi"],
//   ["French", "fr"],
//   ["German", "de"],
//   ["Greek", "el"],
//   ["Gujarati", "gu"],
//   ["Hebrew", "iw"],
//   ["Hindi", "hi"],
//   ["Hungarian", "hu"],
//   ["Icelandic", "is"],
//   ["Indonesian", "id"],
//   ["Italian", "it"],
//   ["Japanese", "ja"],
//   ["Kannada", "kn"],
//   ["Korean", "ko"],
//   ["Latvian", "lv"],
//   ["Lithuanian", "lt"],
//   ["Malay", "ms"],
//   ["Malayalam", "ml"],
//   ["Marathi", "mr"],
//   ["Norwegian", "no"],
//   ["Polish", "pl"],
//   ["Portuguese (Portugal)", "pt-PT"],
//   ["Romanian", "ro"],
//   ["Russian", "ru"],
//   ["Serbian", "sr"],
//   ["Chinese (PRC)", "zh-CN"],
//   ["Slovak", "sk"],
//   ["Slovenian", "sl"],
//   ["Spanish", "es"],
//   ["Swahili", "sw"],
//   ["Swedish", "sv"],
//   ["Tamil", "ta"],
//   ["Telugu", "te"],
//   ["Thai", "th"],
//   ["Chinese (Taiwan)", "zh-TW"],
//   ["Turkish", "tr"],
//   ["Urdu", "ur"],
//   ["Ukrainian", "uk"],
//   ["Vietnamese", "vi"],
//   ["Welsh", "cy"],
// ];
