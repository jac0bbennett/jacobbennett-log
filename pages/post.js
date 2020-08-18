import axios from "axios";
import Hamburger from "../components/hamburger";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown/with-html";
import Head from "next/head";
import Link from "next/link";

const Post = props => {
  const post = props.post;

  const tagUrl = tag => {
    return tag.replace("-", "--").replace(" ", "-");
  };

  return (
    <React.Fragment>
      <Head>
        <title>
          {post.fields.title} | {props.page.state.name}
        </title>
        {post.fields.featureImage ? (
          <React.Fragment>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={post.fields.featureImage} />
          </React.Fragment>
        ) : (
          <meta name="twitter:card" content="summary" />
        )}

        <meta name="twitter:site" content="@yaakovbennett" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.fields.title} />
        <meta
          property="og:description"
          content={
            post.fields.subtitle
              ? post.fields.subtitle
              : "Article by " + props.page.state.name
          }
        />
        {post.fields.featureImage ? (
          <meta property="og:image" content={post.fields.featureImage} />
        ) : null}
      </Head>
      <div id="header">
        <div className="post-author">
          <Link href="/">
            <a>{props.page.state.name}</a>
          </Link>
        </div>
        <Hamburger setNavOpen={props.page.setNavOpen} />
        <div className="post-title">{post.fields.title}</div>
        {post.fields.subtitle ? (
          <div className="post-subtitle">{post.fields.subtitle}</div>
        ) : null}

        <div className="post-timestamp">
          <Moment format="MMM M, YYYY, h:mma">{post.publishedAt}</Moment>
          {post.updatedAt ? (
            <React.Fragment>
              {" - "}
              (Updated{" "}
              {<Moment format="MMM M, YYYY, h:mma">{post.updatedAt}</Moment>})
            </React.Fragment>
          ) : null}
        </div>
      </div>
      <div
        id="post-body"
        style={post.fields.featureImage ? {} : { marginTop: "-20px" }}
      >
        {post.fields.featureImage ? (
          <img
            alt={post.fields.title}
            src={post.fields.featureImage}
            className="feature-image"
          />
        ) : null}
        <div className="wrapper">
          <ReactMarkdown source={post.fields.body} escapeHtml={false} />
        </div>
        {post.fields.tags && post.fields.tags.length > 0 ? (
          <div className="post-tags">
            <div style={{ fontSize: "12pt" }}>Tags:</div>
            {post.fields.tags.map((tag, index) => {
              return (
                <Link
                  as={`/tag/${tagUrl(tag)}`}
                  href={`/tag?tag=${tagUrl(tag)}`}
                  key={index}
                >
                  <a>
                    <span className="post-tag">{tag}</span>
                  </a>
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

Post.getInitialProps = async ({ ctx }) => {
  const filter = {
    content_type: "post",
    fields: { slug: ctx.query.slug },
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
