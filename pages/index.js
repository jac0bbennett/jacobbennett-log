import Hamburger from "../components/hamburger";
import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

const Home = props => {
  const contents = props.contents;

  useEffect(() => {
    props.page.setNavOpen(false);
  }, [props.page]);

  return (
    <React.Fragment>
      <Head>
        <title>Jacob Bennett</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div id="header" style={{ minHeight: "100vh", justifyContent: "center" }}>
        <Hamburger setNavOpen={props.page.setNavOpen} />
        <div className="post-title" style={{ marginTop: "-20vh" }}>
          Jacob Bennett's Log
        </div>
        <div className="downarrow">&#8595;</div>
      </div>
      <div className="log-wrapper">
        {contents.map(post => {
          return (
            <div className="log-entry" key={post.publishedAt}>
              {post.content.featureImage ? (
                <Link href={`/${post.content.slug}`}>
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
              <Link href={`/${post.content.slug}`}>
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

Home.getInitialProps = async () => {
  const filter = { contentType: "post" };
  try {
    const req = await axios.get(
      "https://milk.jwb.cloud/api/cdn/FFDSGEWK?q=" +
        JSON.stringify(filter) +
        "&access_token=" +
        "SFsI0r3izG2pM7oTRu4a9K3phIEgl18DhbP"
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
