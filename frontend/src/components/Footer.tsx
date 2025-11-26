import { FooterSection, GitHubLink } from "./Footer.styled";

const Footer = () => {
  return (
    <FooterSection>
      <span>&copy; 2025 Palekouran.</span>
      <span>All rights reserved.</span>
      <span>Created by Mau</span>
      <GitHubLink
        href="https://github.com/mau11/palekouran"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Palekouran GitHub Repository"
        title="Palekouran on GitHub"
      >
        <img src="/images/github-mark.png" alt="GitHub Logo" />
      </GitHubLink>
    </FooterSection>
  );
};

export default Footer;
