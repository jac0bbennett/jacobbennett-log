import { milkKey } from './../constants';
const baseUrl = 'https://milkcms.com/api/cdn/FFDSGEWK';

export interface MilkFilter {
  content_type?: string;
  access_token: string;
  fields?: { [key: string]: string };
  return_fields?: string[];
}

export interface Post {
  title: string;
  subtitle: string;
  slug: string;
  featureImage?: string;
  body: string;
  tags?: string[];
}

export type PostStatus = 'draft' | 'published' | 'edited';

export interface MilkContent {
  author: {
    name: string;
  };
  fields: Post;
  status: PostStatus;
  typeName: string;
  typeSlug: string;
  updatedAt?: Date;
  publishedAt?: Date;
  uuid: string;
}

export interface MilkResponse {
  contents: MilkContent[];
  page: number;
  perPage: number;
  total: number;
}

export const getAllPosts = async () => {
  const filter: MilkFilter = {
    content_type: 'post',
    access_token: milkKey,
    return_fields: ['title', 'subtitle', 'slug', 'featureImage'],
  };

  const resp = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filter),
  });

  return (await resp.json()) as MilkResponse;
};

export const getPostBySlug = async (slug: string) => {
  const filter: MilkFilter = {
    content_type: 'post',
    access_token: milkKey,
    fields: { slug: slug },
  };

  const resp = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filter),
  });

  const data = (await resp.json()) as MilkResponse;

  if (data.contents.length === 0) {
    return {
      fields: {
        title: 'Page does not exist',
        subtitle: '404',
        body: '## Maybe it used to, though',
        slug: '404',
        featureImage: '',
      },
      status: 'draft',
      typeName: 'post',
      typeSlug: 'post',
      uuid: '404',
    } as MilkContent;
  }

  return data.contents[0];
};

export const getPostsByTag = async (tag: string) => {
  const filter: MilkFilter = {
    content_type: 'post',
    access_token: milkKey,
    fields: { tags: tag },
    return_fields: ['title', 'subtitle', 'slug', 'featureImage'],
  };

  const resp = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filter),
  });

  return (await resp.json()) as MilkResponse;
};
