import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "@contexts/AuthContext";
import { Button, Grid, Wrapper } from "@globalStyles";
import {
  ButtonGroup,
  FeatureCard,
  FeatureIcon,
  FeatureText,
  FeatureTitle,
  Hero,
  HeroText,
  HeroTitle,
  SecondaryButton,
} from "./Home.styled";

const Home = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = !!auth?.user;

  return (
    <Wrapper>
      <Hero>
        <HeroTitle>
          Practice vocabulary with flashcards that talk back
        </HeroTitle>
        <HeroText>
          Palekouran is a modern language learning tool that combines
          traditional flashcards with interactive audio features. Record your
          pronunciation, get AI-powered translations, and track your progress,
          all in one place.
        </HeroText>
        {isLoggedIn ? (
          <ButtonGroup>
            <Button onClick={() => navigate("/decks")}>
              <i className="fa-solid fa-layer-group"></i> My Decks
            </Button>
            <SecondaryButton onClick={() => navigate("/decks/new")}>
              <i className="fa-solid fa-plus"></i> Create Deck
            </SecondaryButton>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <Button onClick={() => navigate("/signup")}>Get Started</Button>
            <SecondaryButton onClick={() => navigate("/login")}>
              Log in
            </SecondaryButton>
          </ButtonGroup>
        )}
      </Hero>

      <Grid>
        <FeatureCard>
          <FeatureIcon>
            <i className="fa-solid fa-microphone"></i>
          </FeatureIcon>
          <FeatureTitle>Speak & Listen</FeatureTitle>
          <FeatureText>
            Record your own voice and compare it with AI-generated
            pronunciations to improve accuracy and confidence.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <i className="fa-solid fa-book-open"></i>
          </FeatureIcon>
          <FeatureTitle>Personalized Cards</FeatureTitle>
          <FeatureText>
            Add translations, clear definitions, and your own notes or examples
            to create a study experience tailored to you.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <i className="fa-solid fa-repeat"></i>
          </FeatureIcon>
          <FeatureTitle>Spaced Repetition</FeatureTitle>
          <FeatureText>
            Practice cards at your own pace and reinforce memory with built-in
            spaced repetition, making learning more effective.
          </FeatureText>
        </FeatureCard>
      </Grid>
    </Wrapper>
  );
};

export default Home;
