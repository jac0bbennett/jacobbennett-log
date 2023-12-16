import { getPostsByTag } from '../../services/milk';
import LogEntry from '../logEntry';

const TaggedPosts = async (props: { tag: string }) => {
  const actualTag = props.tag
    .replace('--', '!@#$')
    .split('-')
    .join(' ')
    .replace('!@#$', '-');

  const posts = (await getPostsByTag(actualTag)).contents;

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => {
          return <LogEntry post={post} key={post.uuid} />;
        })
      ) : (
        <span>No Content with that tag</span>
      )}
    </>
  );
};

export default TaggedPosts;
