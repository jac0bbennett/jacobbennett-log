import Head from 'next/head';
import { authorName } from '../../../constants';
import TaggedPosts from '../../../components/tag/posts';
import { Suspense } from 'react';
import LoadingPosts from '../../../components/app/loadingPosts';
import Link from 'next/link';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export const generateMetadata = async ({ params }: TagPageProps) => {
  const tag = params.tag;

  return {
    title: `${tag} | ${authorName}`,
    description: `Article's tagged with ${tag}`,
    twitterCard: 'summary',
    twitterSite: '@yaakovbennett',
    ogType: 'article',
    ogTitle: 'Tag - ' + tag,
    ogDescription: "Article's tagged with " + tag,
  };
};

const TagPage = async ({ params }: TagPageProps) => {
  const tag = params.tag;

  const name = authorName;

  return (
    <>
      <div id="header">
        <div className="post-author">
          <Link href="/">{name}</Link>
        </div>
        <div className="post-title">
          <span style={{ fontSize: '60%', opacity: '85%' }}>Tag: </span>
          {tag}
        </div>
      </div>
      <div className="log-wrapper">
        <Suspense fallback={<LoadingPosts />}>
          {/* @ts-expect-error Server Component */}
          <TaggedPosts tag={tag} />
        </Suspense>
      </div>
    </>
  );
};

export default TagPage;
