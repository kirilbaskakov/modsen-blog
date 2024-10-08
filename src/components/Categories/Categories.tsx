'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import categories from '@/constants/data/categories';

import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './Categories.module.scss';

const Categories = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.categories}>
      <h2>{t('chooseCategory')}</h2>
      <div className={styles.cards}>
        {categories.map(({ key, text, icon }) => (
          <CategoryCard
            key={key}
            categoryKey={key}
            title={t(key)}
            text={text}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
