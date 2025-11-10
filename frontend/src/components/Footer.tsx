import { FooterSection, GitHub } from "./Footer.styled";

const Footer = () => {
  return (
    <FooterSection>
      <a
        href="https://github.com/mau11/palekouran"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Palekouran GitHub Repository"
      >
        <p>
          <span>&copy; 2025 Palekouran. All rights reserved.</span>
          <GitHub>
            Created by Mau
            <img src="/images/github-mark.png" alt="GitHub Logo" />
          </GitHub>
        </p>
      </a>
    </FooterSection>
  );
};

export default Footer;
