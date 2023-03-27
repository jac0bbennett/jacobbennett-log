import HomeHeader from '../components/home/header';
import { Suspense } from 'react';
import Posts from '../components/home/posts';
import LoadingPosts from '../components/app/loadingPosts';
import { authorName } from '../constants';

export const metadata = {
  title: `${authorName}'s Log`,
  description: `Logs written by ${authorName}`,
};

const Home = () => {
  return (
    <>
      <HomeHeader name={authorName} />
      <div className="log-wrapper">
        <Suspense fallback={<LoadingPosts />}>
          {/* @ts-expect-error Server Component */}
          <Posts />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
