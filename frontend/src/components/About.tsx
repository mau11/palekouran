import { Bold, Header, HeaderOne, Spacer, Wrapper } from "@globalStyles";
import { AboutContent, FeatureList, InfoCard } from "./About.styled";

const About = () => {
  return (
    <Wrapper>
      <AboutContent>
        <Header>
          <HeaderOne>About Palekouran</HeaderOne>
        </Header>

        <p>
          <Bold>Palekouran</Bold> is a language learning tool that helps you
          practice vocabulary through interactive flashcards. It combines
          traditional flashcards with audio features to help you learn at your
          own pace.
        </p>

        <InfoCard>
          <p>
            <Bold>Palekouran</Bold> comes from the Haitian Creole phrase, "pale
            kouran" or "speak fluently", a name chosen to emphasize the app's
            goal of making language learning natural, accessible, and
            supportive.
          </p>
        </InfoCard>

        <h2>How it works</h2>

        <FeatureList>
          <li>
            <i className="fa-solid fa-check fa-lg"></i>Create custom decks
            organized by category
          </li>
          <li>
            <i className="fa-solid fa-check fa-lg"></i>Add words with personal
            notes and generated translations
          </li>
          <li>
            <i className="fa-solid fa-check fa-lg"></i>Record yourself speaking
            to practice pronunciation
          </li>
          <li>
            <i className="fa-solid fa-check fa-lg"></i>Generate AI
            pronunciations for any word or phrase
          </li>
          <li>
            <i className="fa-solid fa-check fa-lg"></i>Practice with built-in
            spaced repetition to reinforce learning
          </li>
          <li>
            <i className="fa-solid fa-check fa-lg"></i>Review cards and track
            which ones you've practiced
          </li>
        </FeatureList>

        <h2>Why I built this</h2>

        <p>
          I created this tool because I wanted a simple, flexible way to
          practice a new language, something that let me review vocabulary, hear
          pronunciations, and record my own voice. Just a clean space to learn
          at my own pace.
        </p>

        <h2>What's next</h2>

        <FeatureList>
          <li>
            <i className="fa-solid fa-circle-dot fa-xs"></i>New flashcard modes,
            including listening-only practice
          </li>
          <li>
            <i className="fa-solid fa-circle-dot fa-xs"></i>Image support for
            cards
          </li>
          <li>
            <i className="fa-solid fa-circle-dot fa-xs"></i>Category management
            directly in the app
          </li>
          <li>
            <i className="fa-solid fa-circle-dot fa-xs"></i>CSV import/export
            for easier vocab migration
          </li>
          <li>
            <i className="fa-solid fa-circle-dot fa-xs"></i>Smoother UI touches,
            like helpful toast messages
          </li>
        </FeatureList>

        <Spacer />
        <p>
          If you have any feedback or ideas, I'd love to hear them. This is a
          work in progress, and I'm constantly looking for ways to make it more
          useful. If you're a developer, feel free to take a look at the source
          code and report any issues on{" "}
          <a
            href="https://github.com/mau11/palekouran"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Palekouran GitHub Repository"
            title="View Palekouran's source code"
          >
            GitHub
          </a>
          .
        </p>
      </AboutContent>
    </Wrapper>
  );
};

export default About;
