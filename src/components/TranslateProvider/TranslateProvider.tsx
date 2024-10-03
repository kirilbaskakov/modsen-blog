'use client';

import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import { createInstance, Resource } from 'i18next';

import initTranslations from '@/i18n';

const TranslateProvider = ({
  children,
  locale,
  namespaces,
  resources
}: {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: Resource;
}) => {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslateProvider;
