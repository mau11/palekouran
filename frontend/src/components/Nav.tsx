import { HeaderOne } from "../Global.styled";
import { NavSection } from "./Nav.styled";

const Nav = () => {
  return (
    <NavSection>
      <header>
        {/* add nav */}
        <HeaderOne>
          <a href="/">Palekouran</a>
        </HeaderOne>
      </header>
    </NavSection>
  );
};

export default Nav;
