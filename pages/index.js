import Hamburger from "../components/hamburger";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
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
    return eq < 25 ? (offset === 0 ? "-10%" : eq.toString() + "%") : "25%";
  };

  const calcArrowOffset = () => {
    const eq = 10 - offset / 80;
    return eq > 5 ? (offset === 0 ? "10%" : eq.toString() + "%") : "5%";
  };

  return (
    <React.Fragment>
      <Head>
        <title>Jacob Bennett</title>
      </Head>
      <div id="header" style={{ minHeight: "100vh", justifyContent: "center" }}>
        <Hamburger setNavOpen={props.page.setNavOpen} />
        <div
          className="post-title"
          style={{
            marginTop: calcTitleOffset()
          }}
        >
          Jacob Bennett's Log
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
          return (
            <div className="log-entry" key={post.publishedAt}>
              {post.content.featureImage ? (
                <Link
                  as={`/${post.content.slug}`}
                  href={`/post?slug=${post.content.slug}`}
                >
                  <a>
                    <div className="log-entry-imgCont">
                      <img
                        alt={post.content.title}
                        src={post.content.featureImage}
                      />
                    </div>
                  </a>
                </Link>
              ) : null}
              <Link
                as={`/${post.content.slug}`}
                href={`/post?slug=${post.content.slug}`}
              >
                <a>
                  <h1 className="log-entry-title">{post.content.title}</h1>
                </a>
              </Link>
              <span className="log-entry-subtitle">
                {post.content.subtitle}
              </span>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

Home.getInitialProps = async ({ ctx }) => {
  const filter = { contentType: "post" };
  try {
    const req = await axios.get(
      "https://milk.jwb.cloud/api/cdn/" +
        ctx.appId +
        "?q=" +
        JSON.stringify(filter) +
        "&access_token=" +
        ctx.access_token
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
