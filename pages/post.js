import axios from "axios";
import Hamburger from "../components/hamburger";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Link from "next/link";

const Post = props => {
  const post = props.post;

  return (
    <React.Fragment>
      <Head>
        <title>
          {post.content.title} | {props.page.state.name}
        </title>
        {post.content.featureImage ? (
          <React.Fragment>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={post.content.featureImage} />
          </React.Fragment>
        ) : (
          <meta name="twitter:card" content="summary" />
        )}

        <meta name="twitter:site" content="@yaakovbennett" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.content.title} />
        <meta
          property="og:description"
          content={
            post.content.subtitle
              ? post.content.subtitle
              : "Article by " + props.page.state.name
          }
        />
        {post.content.featureImage ? (
          <meta property="og:image" content={post.content.featureImage} />
        ) : null}
      </Head>
      <div id="header">
        <div className="post-author">
          <Link href="/">
            <a>{props.page.state.name}</a>
          </Link>
        </div>
        <Hamburger setNavOpen={props.page.setNavOpen} />
        <div className="post-title">{post.content.title}</div>
        {post.content.subtitle ? (
          <div className="post-subtitle">{post.content.subtitle}</div>
        ) : null}

        <div className="post-timestamp">
          <Moment fromNow withTitle>
            {post.publishedAt}
          </Moment>
          {post.updatedAt ? (
            <React.Fragment>
              {" - "}
              (Updated{" "}
              {
                <Moment fromNow withTitle>
                  {post.updatedAt}
                </Moment>
              }
              )
            </React.Fragment>
          ) : null}
        </div>
      </div>
      <div
        id="post-body"
        style={post.content.featureImage ? {} : { marginTop: "-20px" }}
      >
        {post.content.featureImage ? (
          <img
            alt={post.content.title}
            src={post.content.featureImage}
            className="feature-image"
          />
        ) : null}
        <div className="wrapper">
          <ReactMarkdown source={post.content.body} />
        </div>
      </div>
    </React.Fragment>
  );
};

Post.getInitialProps = async ({ ctx }) => {
  const filter = {
    contentType: "post",
    fields: { slug: ctx.query.slug },
    access_token: ctx.access_token
  };
  try {
    const req = await axios.get("https://milk.jwb.cloud/api/cdn/" + ctx.appId, {
      params: filter
    });
    if (req.data.error) {
      console.log(req.data.error);
    }
    if (req.data.contents.length > 0) {
      return { post: req.data.contents[0] };
    } else {
      const noPageData = {
        publishedAt: null,
        content: {
          title: "Page doesn't exist!",
          subtitle: "404",
          body: "## Maybe it used to, though"
        }
      };
      return { post: noPageData };
    }
  } catch (err) {
    console.log(err);
  }
};

export default Post;
