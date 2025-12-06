import { FooterSection, FooterLink } from "./Footer.styled";

const Footer = () => {
  return (
    <FooterSection>
      <div>
        <span>&copy; 2025 Palekouran.</span>
        <span>All rights reserved.</span>
      </div>
      <span>
        Created by Mau:
        <FooterLink
          href="https://tech.mauworks.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Mau's Portfolio"
          title="Visit Mau's Portfolio"
        >
          <i className="fa-solid fa-globe"></i>
        </FooterLink>
        <FooterLink
          href="https://github.com/mau11/palekouran"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Palekouran GitHub Repository"
          title="View Palekouran's source code"
        >
          <img src="/images/github.png" alt="GitHub Logo" />
        </FooterLink>
        <FooterLink
          href="https://linkedin.com/in/mau11"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Mau's LinkedIn Profile"
          title="Visit Mau's LinkedIn"
        >
          <img src="/images/linkedin.png" alt="LinkedIn Logo" />
        </FooterLink>
      </span>
    </FooterSection>
  );
};

export default Footer;
