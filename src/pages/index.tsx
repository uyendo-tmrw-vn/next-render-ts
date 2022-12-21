import React from 'react';

import { GetStaticProps } from 'next';
import Image from 'next/image';

import { BlogGallery, IBlogGalleryProps } from '../blog/BlogGallery';
import { Meta } from '../layout/Meta';
import { IPaginationProps } from '../pagination/Pagination';
import { Main } from '../templates/Main';
import { Config } from '../utils/Config';
import { getAllPosts } from '../utils/Content';

const Index = (props: IBlogGalleryProps) => (
  <Main
    meta={(
      <Meta
        title="Made with Next.js, TypeScript, ESLint, Prettier, PostCSS, Tailwind CSS"
        description={Config.description}
      />
    )}
  >
    <div className="w-full overflow-hidden" style={{ maxHeight: '30vh' }}>
      <Image width="300" height="200" layout="responsive" src="https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" />
    </div>
    <BlogGallery posts={props.posts} pagination={props.pagination} />
  </Main>
);

export const getStaticProps: GetStaticProps<IBlogGalleryProps> = async () => {
  const posts = getAllPosts(['title', 'date', 'slug']);
  const pagination: IPaginationProps = {};

  if (posts.length > Config.pagination_size) {
    pagination.next = '/page2';
  }

  return {
    props: {
      posts: posts.slice(0, Config.pagination_size),
      pagination,
    },
  };
};

export default Index;
