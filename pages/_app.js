import "../main.css";
import Footer from "../components/footer";
import { Provider, Subscribe } from "unstated";
import PageContainer from "../containers/PageContainer";
import App, { Container } from "next/app";
import Head from "next/head";

const pageCont = new PageContainer();

class MainApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider inject={[pageCont]}>
        <Subscribe to={[PageContainer]}>
          {page => (
            <React.Fragment>
              <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
              </Head>
              <div
                className="sidemenu"
                style={page.state.navOpen ? { right: "0px" } : {}}
              >
                <div
                  className="exit"
                  onClick={() => {
                    page.setNavOpen(false);
                  }}
                >
                  <div className="bar1" />
                  <div className="bar2" />
                </div>
                <span className="menu-title">Menu</span>

                <div className="nav">
                  <Link href="/">
                    <a>Log Home</a>
                  </Link>
                  <a href="//jacobbennett.us/#portfolio">Portfolio</a>
                  <a href="//jacobbennett.us//#about">About</a>
                  <a href="//jacobbennett.us//#contact">Contact</a>
                </div>
              </div>
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
