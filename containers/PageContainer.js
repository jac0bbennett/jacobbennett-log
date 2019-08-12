import { Container } from "unstated";

class PageContainer extends Container {
  state = {
    navOpen: false,
    name: "Jacob Bennett",
    appId: "FFDSGEWK",
    access_token: "SFsI0r3izG2pM7oTRu4a9K3phIEgl18DhbP"
  };

  setNavOpen = (bool = !this.state.navOpen) => {
    this.setState({ navOpen: bool });
  };
}

export default PageContainer;
