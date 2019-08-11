import axios from "axios";
import Hamburger from "../components/hamburger";
import Timestamp from "react-timestamp";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

const Post = props => {
  const post = props.post;

  const scrollListener = e => {
    const postBody = document.getElementById("post-body");

    postBody.classList.add("non-scrolled-post");

    const headerHeight = document.getElementById("header").clientHeight;

    if (window.scrollY >= headerHeight) {
      postBody.classList.remove("non-scrolled-post");
    } else {
      postBody.classList.add("non-scrolled-post");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{post.content.title} | Jacob Bennett</title>
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
              : "Article by Jacob Bennett"
          }
        />
        {post.content.featureImage ? (
          <meta property="og:image" content={post.content.featureImage} />
        ) : null}
      </Head>
      <div id="header">
        <div className="post-author">
          <Link href="/">
            <a>Jacob Bennett</a>
          </Link>
        </div>
        <Hamburger setNavOpen={props.page.setNavOpen} />
        <div className="post-title">{post.content.title}</div>
        {post.content.subtitle ? (
          <div className="post-subtitle">{post.content.subtitle}</div>
        ) : null}

        <div className="post-timestamp">
          <Timestamp relative date={post.publishedAt} />
          {post.updatedAt ? (
            <React.Fragment>
              {" - "}
              (Updated at <Timestamp relative date={post.updatedAt} />)
            </React.Fragment>
          ) : null}
        </div>
      </div>
      <div id="post-body" className="non-scrolled-post">
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

Post.getInitialProps = async query => {
  const filter = { contentType: "post", fields: { slug: query.slug } };
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
    if (req.data.contents.length > 0) {
      return { post: req.data.contents[0] };
    } else {
      const noPageData = {
        author: { name: "Jacob Bennett" },
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
