import Link from "next/link";

const LogEntry = props => {
  const post = props.post;
  return (
    <div className="log-entry">
      {post.content.featureImage ? (
        <Link
          as={`/post/${post.content.slug}`}
          href={`/post?slug=${post.content.slug}`}
        >
          <a>
            <div className="log-entry-imgCont">
              <img alt={post.content.title} src={post.content.featureImage} />
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
      <span className="log-entry-subtitle">{post.content.subtitle}</span>
    </div>
  );
};

export default LogEntry;
