import "../main.css";
import Footer from "../components/footer";
import { Provider, Subscribe } from "unstated";
import PageContainer from "../containers/PageContainer";
import LoadbarContainer from "../containers/LoadbarContainer";
import LoadingBar from "../components/LoadingBar/loadingBar";
import Hamburger from "../components/hamburger";
import Sidemenu from "../components/sidemenu";
import App, { Container } from "next/app";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

const pageCont = new PageContainer();
const loadbarCont = new LoadbarContainer();

class MainApp extends App {
  state = { loadbarInterval: null };

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    ctx.appId = "FFDSGEWK";
    ctx.access_token = "SFsI0r3izG2pM7oTRu4a9K3phIEgl18DhbP";
    const query = router.query;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ query, ctx });
    }

    return { pageProps };
  }

  scrollListener = e => {
    const fixedHeader = document.getElementById("fixed-header");

    const headerHeight = document.getElementById("header").clientHeight;

    fixedHeader.style.transition = "150ms ease-in-out";

    if (window.scrollY >= headerHeight) {
      fixedHeader.classList.add("scrolled-fixed-header");
    } else {
      fixedHeader.classList.remove("scrolled-fixed-header");
    }
  };

  componentDidMount() {
    history.scrollRestoration = "manual";
    const cachedScroll = [];
    let oldPage = false;

    Router.events.on("routeChangeStart", () => {
      loadbarCont.progressTo(25);
      const loadbarInt = setInterval(this.loadbarAutoProgress, 500);
      this.setState({ loadbarInterval: loadbarInt });
      if (!oldPage) {
        cachedScroll.push(document.documentElement.scrollTop);
      }
    });

    Router.events.on("routeChangeComplete", () => {
      clearInterval(this.state.loadbarInterval);
      loadbarCont.progressTo(100);
      if (oldPage) {
        document.documentElement.scrollTop = cachedScroll.pop();

        oldPage = false;
      }
      pageCont.setNavOpen(false);
    });

    Router.beforePopState(() => {
      oldPage = true;

      return true;
    });

    window.addEventListener("scroll", this.scrollListener);

    return () => {
      window.removeEventListener("scroll", this.scrollListener);
    };
  }

  loadbarAutoProgress = () => {
    if (loadbarCont.state.progress < 80) {
      loadbarCont.progressTo(loadbarCont.state.progress + 1);
    }
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider inject={[pageCont, loadbarCont]}>
        <Subscribe to={[PageContainer, LoadbarContainer]}>
          {(page, loadbar) => (
            <React.Fragment>
              <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
              </Head>
              <LoadingBar
                id="loadingbar"
                progress={loadbar.state.progress}
                onErrorDone={loadbar.errorDone}
                onProgressDone={loadbar.progressDone}
                error={loadbar.state.error}
              />
              <div id="fixed-header" className="fixed-header">
                <div className="post-author">
                  <Link href="/">
                    <a>Jacob Bennett</a>
                  </Link>
                </div>
                <Hamburger setNavOpen={page.setNavOpen} />
              </div>
              <Sidemenu page={page} />
              <Container>
                <Component {...pageProps} page={page} />
              </Container>
              <Footer />
            </React.Fragment>
          )}
        </Subscribe>
      </Provider>
    );
  }
}

export default MainApp;
