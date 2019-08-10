import { Container } from "unstated";

class PageContainer extends Container {
  state = { navOpen: false };

  setNavOpen = (bool = !this.state.navOpen) => {
    this.setState({ navOpen: bool });
  };
}

export default PageContainer;
