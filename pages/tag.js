import axios from "axios";
import Hamburger from "../components/hamburger";
import Head from "next/head";
import Link from "next/link";
import LogEntry from "../components/logEntry";

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
            return <LogEntry post={post} key={post.uuid} />;
          })
        ) : (
          <span>No Content with that tag</span>
        )}
      </div>
    </React.Fragment>
  );
};

Tag.getInitialProps = async ({ ctx }) => {
  const tag = ctx.query.tag
    .split("-")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
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
