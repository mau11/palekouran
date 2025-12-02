// get translation
export const getTrans = (
  word: string,
  sourceLang: string,
  targetLang: string
) => {
  const translationURL = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${targetLang}&tl=${sourceLang}&q=${word}`;

  return fetch(translationURL)
    .then((res) => res.json())
    .then((data) => {
      const translationText = Array.isArray(data[0])
        ? data[0][0].toLowerCase()
        : data[0].toLowerCase();
      return translationText;
    });
};
