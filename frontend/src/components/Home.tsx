import { Wrapper } from "@globalStyles";

const Home = () => {
  return (
    <Wrapper>
      <h1>Practice vocabulary with flashcards that ...</h1>
      <p>
        Record your pronunciation, get AI-powered support, and track your
        progress as you learn new words at your own pace.
      </p>
      {/* buttons: Get Started + View Decks */}

      {/* create highlight cards */}
      <p>
        Practice speaking - Record yourself saying words and phrases. Listen
        back and compare with examples to improve your pronunciation.
      </p>

      <p>
        Get clear definitions - See translations and explanations that make
        sense. Each word includes context to help you understand how it's used.
      </p>

      <p>
        See your progress - Keep track of the words you've practiced and how
        you're improving over time with simple charts and stats.
      </p>
    </Wrapper>
  );
};

export default Home;
