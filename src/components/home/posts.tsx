import { getAllPosts } from '../../services/milk';
import LogEntry from '../logEntry';

const Posts = async () => {
  const resp = await getAllPosts();
  const posts = resp.contents;

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <LogEntry post={post} key={post.uuid} />)}
    </>
  );
};

export default Posts;
