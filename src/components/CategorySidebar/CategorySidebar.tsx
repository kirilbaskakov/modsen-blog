'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter, useSearchParams } from 'next/navigation';

import categories from '@/constants/data/categories';
import { tagsRoute } from '@/constants/routes/apiRoutes';
import { CategoryCardType } from '@/types/CategoryCardType';
import { TagType } from '@/types/TagType';

import CategoryCard from '../CategoryCard/CategoryCard';
import TagCard from '../TagCard/TagCard';
import TagInput from '../TagInput/TagInput';
import styles from './CategorySidebar.module.scss';

const CategorySidebar = ({ category }: { category: string }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [allTags, setAllTags] = useState<Array<TagType>>([]);
  const [tags, setTags] = useState<Array<TagType>>([]);

  useEffect(() => {
    const values = searchParams.get('tags')?.split(', ');
    if (!values) {
      setTags([]);
      return;
    }
    setTags(
      values.map(value => ({
        value,
        title: allTags.find(tag => tag.value === value)?.title ?? ''
      }))
    );
  }, [allTags, searchParams]);

  useEffect(() => {
    fetch(`${tagsRoute}?locale=${i18n.language}`)
      .then(response => response.json())
      .then(allTags => setAllTags(allTags));
  }, [i18n.language]);

  const onTagSelect = useCallback(
    (tag: TagType) =>
      !tags.find(({ value }) => value === tag.value) &&
      setTags(tags => [...tags, tag]),
    [tags]
  );

  const onTagDelete = (tagValue: string) => () => {
    setTags(tags.filter(({ value }) => value != tagValue));
  };

  const onSearch = useCallback(() => {
    if (!tags.length) {
      router.push('?');
      return;
    }
    const params = new URLSearchParams({
      tags: tags.map(({ value }) => value).join(', ')
    });
    router.push(`?${params.toString()}`);
  }, [router, tags]);

  return (
    <div className={styles.categorySidebar}>
      <TagInput onSelect={onTagSelect} onSearch={onSearch} tags={allTags} />
      <div>
        <h2>{t('categories')}</h2>
        <div className={styles.cards}>
          {categories.map(({ key, text, icon }) => (
            <CategoryCard
              key={key}
              categoryKey={key}
              title={t(key)}
              text={text}
              icon={icon}
              type={CategoryCardType.SMALL}
              selected={category.toLowerCase() === key.toLowerCase()}
            />
          ))}
        </div>
      </div>
      {tags.length > 0 && (
        <div>
          <h2>{t('allTags')}</h2>
          <div className={styles.tags}>
            {tags.map(tag => (
              <TagCard
                key={tag.value}
                title={tag.title}
                onDelete={onTagDelete(tag.value)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySidebar;
