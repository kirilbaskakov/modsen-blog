import React from 'react';

import BlogHeader from '@/components/BlogHeader/BlogHeader';
import Categories from '@/components/Categories/Categories';
import JoinUs from '@/components/JoinUs/JoinUs';
import Posts from '@/components/Posts/Posts';

import styles from './page.module.scss';
import initTranslations from '@/app/i18n';
import LazyList from '@/components/LazyList/LazyList';

const Blog = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { t } = await initTranslations(locale, ['default']);
  return (
    <>
      <BlogHeader />
      <main>
        <LazyList>
          <div className={styles.container}>
            <h1>{t('allPosts')}</h1>
            <div className={styles.separator} />
            <div>
              <Posts />
            </div>
          </div>
          <Categories />
          <JoinUs />
        </LazyList>
      </main>
    </>
  );
};

export default Blog;
