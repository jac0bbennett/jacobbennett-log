import Link from "next/link";

const LogEntry = props => {
  const post = props.post;
  return (
    <div className="log-entry">
      {post.fields.featureImage ? (
        <Link
          as={`/post/${post.fields.slug}`}
          href={`/post?slug=${post.fields.slug}`}
        >
          <a>
            <div className="log-entry-imgCont">
              <img alt={post.fields.title} src={post.fields.featureImage} />
            </div>
          </a>
        </Link>
      ) : null}
      <Link
        as={`/post/${post.fields.slug}`}
        href={`/post?slug=${post.fields.slug}`}
      >
        <a>
          <h1 className="log-entry-title">{post.fields.title}</h1>
        </a>
      </Link>
      <span className="log-entry-subtitle">{post.fields.subtitle}</span>
    </div>
  );
};

export default LogEntry;
