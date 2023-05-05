/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { getPostBySlug } from '../../../services/milk';
import ReactMarkdown from 'react-markdown';
import { DateTime } from 'luxon';
import { authorName } from '../../../constants';
import Link from 'next/link';

interface PostProps {
  params: {
    slug: string;
  };
}

const name = authorName;

export const generateMetadata = async ({ params }: PostProps) => {
  const post = await getPostBySlug(params.slug);

  return {
    title: `${post.fields.title} | ${name}`,
    description: post.fields.subtitle
      ? post.fields.subtitle
      : `Article by ${name}`,
    twitterCard: post.fields.featureImage ? 'summary_large_image' : 'summary',
    twitterImage: post.fields.featureImage,
    twitterSite: '@yaakovbennett',
    ogType: 'article',
    ogTitle: post.fields.title,
    ogDescription: post.fields.subtitle
      ? post.fields.subtitle
      : `Article by ${name}`,
    ogImage: post.fields.featureImage,
  };
};

const Post = async ({ params }: PostProps) => {
  const post = await getPostBySlug(params.slug);

  const tagUrl = (tag: string) => {
    return tag.replace('-', '--').replace(' ', '-');
  };

  const publishedAt = post.publishedAt
    ? DateTime.fromJSDate(new Date(post.publishedAt)).toLocaleString(
        DateTime.DATETIME_FULL
      )
    : null;

  const updatedAt = post.updatedAt
    ? DateTime.fromJSDate(post.updatedAt).toLocaleString(DateTime.DATETIME_FULL)
    : null;

  return (
    <>
      <div id="header">
        <div className="post-author">
          <Link href="/">{name}</Link>
        </div>
        <div className="post-title">{post.fields.title}</div>
        {post.fields.subtitle ? (
          <div className="post-subtitle">{post.fields.subtitle}</div>
        ) : null}

        <div className="post-timestamp">
          {publishedAt}
          {updatedAt ? (
            <>
              {' - '}
              (Updated {updatedAt}
            </>
          ) : null}
        </div>
      </div>
      <div
        id="post-body"
        style={post.fields.featureImage ? {} : { marginTop: '-20px' }}
      >
        {post.fields.featureImage ? (
          <div className="w-[740px] min-h-[386px]">
            <img
              alt={post.fields.title}
              src={post.fields.featureImage}
              className="feature-image"
            />
          </div>
        ) : null}
        <div className="wrapper">
          <ReactMarkdown>{post.fields.body}</ReactMarkdown>
        </div>
        {post.fields.tags && post.fields.tags.length > 0 ? (
          <div className="post-tags">
            <div style={{ fontSize: '12pt' }}>Tags:</div>
            {post.fields.tags.map((tag, index) => {
              return (
                <Link href={`/tag/${tagUrl(tag)}`} key={index}>
                  <span className="post-tag">{tag}</span>
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Post;
