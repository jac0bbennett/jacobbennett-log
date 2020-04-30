import { Container } from "unstated";

class PageContainer extends Container {
  state = {
    navOpen: false,
    name: "Jacob Bennett",
    appId: "FFDSGEWK",
    access_token: "DnTqK38SUHIAxpGQQLJA66Eey1zH6T4CpT8"
  };

  setNavOpen = (bool = !this.state.navOpen) => {
    this.setState({ navOpen: bool });
  };
}

export default PageContainer;
