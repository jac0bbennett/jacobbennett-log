/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { MilkContent } from '../services/milk';

const LogEntry = (props: { post: MilkContent }) => {
  const post = props.post;
  return (
    <div className="log-entry">
      {post.fields.featureImage ? (
        <Link href={`/post/${post.fields.slug}`}>
          <div className="log-entry-imgCont">
            <img alt={post.fields.title} src={post.fields.featureImage} />
          </div>
        </Link>
      ) : null}
      <Link href={`/post/${post.fields.slug}`}>
        <h1 className="log-entry-title text-[2rem] font-bold leading-10 pb-0 pt-1.5">
          {post.fields.title}
        </h1>
      </Link>
      <span className="log-entry-subtitle">{post.fields.subtitle}</span>
    </div>
  );
};

export default LogEntry;
