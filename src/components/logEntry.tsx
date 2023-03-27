/* eslint-disable @next/next/no-img-element */
import { MilkContent } from '../services/milk';

const LogEntry = (props: { post: MilkContent }) => {
  const post = props.post;
  return (
    <div className="log-entry">
      {post.fields.featureImage ? (
        <a href={`/post/${post.fields.slug}`}>
          <div className="log-entry-imgCont">
            <img alt={post.fields.title} src={post.fields.featureImage} />
          </div>
        </a>
      ) : null}
      <a href={`/post/${post.fields.slug}`}>
        <h1 className="log-entry-title text-[2rem] font-bold leading-10 pb-0 pt-1.5">
          {post.fields.title}
        </h1>
      </a>
      <span className="log-entry-subtitle">{post.fields.subtitle}</span>
    </div>
  );
};

export default LogEntry;
