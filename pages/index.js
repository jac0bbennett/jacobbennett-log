import Hamburger from "../components/hamburger";
import axios from "axios";
import { useEffect, useState } from "react";
import LogEntry from "../components/logEntry";
import Head from "next/head";

const Home = props => {
  const contents = props.contents;

  const [offset, setOffset] = useState(0);

  const scrollListener = e => {
    setOffset(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const calcTitleOffset = () => {
    const eq = -10 + offset / 15;
    return eq < 30 ? (offset === 0 ? "-10%" : eq.toString() + "%") : "30%";
  };

  const calcArrowOffset = () => {
    const eq = 10 - offset / 80;
    return eq > 5 ? (offset === 0 ? "10%" : eq.toString() + "%") : "5%";
  };

  return (
    <React.Fragment>
      <Head>
        <title>{props.page.state.name}</title>
        <meta
          property="og:description"
          content="Logs written by Jacob Bennett"
        />
      </Head>
      <div id="header" style={{ minHeight: "100vh", justifyContent: "center" }}>
        <Hamburger setNavOpen={props.page.setNavOpen} />
        <div
          className="post-title home-title"
          style={{
            marginTop: calcTitleOffset()
          }}
        >
          {props.page.state.name}'s Log
        </div>

        <div
          className="downarrow"
          style={{
            bottom: calcArrowOffset()
          }}
        >
          &#8595;
        </div>
      </div>
      <div className="log-wrapper">
        {contents.map(post => {
          return <LogEntry post={post} key={post.uuid} />;
        })}
      </div>
    </React.Fragment>
  );
};

Home.getInitialProps = async ({ ctx }) => {
  const filter = {
    content_type: "post",
    access_token: ctx.access_token,
    return_fields: ["title", "subtitle", "slug", "featureImage"]
  };
  try {
    const req = await axios.post(
      "https://milkcms.com/api/cdn/" + ctx.appId,
      filter
    );
    if (req.data.error) {
      console.log(req.data.error);
    }

    return { contents: req.data.contents };
  } catch (err) {
    console.log(err);
  }
};

export default Home;
