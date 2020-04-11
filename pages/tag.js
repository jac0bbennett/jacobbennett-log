import axios from "axios";
import Hamburger from "../components/hamburger";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Link from "next/link";

const Tag = props => {
  const tag = props.tag;
  const contents = props.contents;

  return (
    <React.Fragment>
      <Head>
        <title>
          {tag} | {props.page.state.name}
        </title>
        <meta name="twitter:site" content="@yaakovbennett" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={"Tag - " + tag} />
        <meta
          property="og:description"
          content={"Article's tagged with " + tag}
        />
      </Head>
      <div id="header">
        <div className="post-author">
          <Link href="/">
            <a>{props.page.state.name}</a>
          </Link>
        </div>
        <Hamburger setNavOpen={props.page.setNavOpen} />
        <div className="post-title">
          <span style={{ fontSize: "60%", opacity: "85%" }}>Tag: </span>
          {tag}
        </div>
      </div>
      <div className="log-wrapper">
        {contents.length > 0 ? (
          contents.map(post => {
            return (
              <div className="log-entry" key={post.uuid}>
                {post.content.featureImage ? (
                  <Link
                    as={`/post/${post.content.slug}`}
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
                  as={`/post/${post.content.slug}`}
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
          })
        ) : (
          <span>No Content with that tag</span>
        )}
      </div>
    </React.Fragment>
  );
};

Tag.getInitialProps = async ({ ctx }) => {
  const tag = ctx.query.tag.charAt(0).toUpperCase() + ctx.query.tag.slice(1);
  const filter = {
    content_type: "post",
    fields: { tags: tag },
    access_token: ctx.access_token
  };
  try {
    const req = await axios.post(
      "https://milk.jwb.cloud/api/cdn/" + ctx.appId,
      filter
    );
    if (req.data.error) {
      console.log(req.data.error);
    }

    return { contents: req.data.contents, tag: tag };
  } catch (err) {
    console.log(err);
  }
};

export default Tag;
