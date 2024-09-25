'use client';

import React from 'react';

import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

import SocialWrapper from '@/assets/Social wrapper.svg';

import styles from './AuthorCard.module.scss';

const AuthorCard = ({
  id,
  icon,
  name,
  job
}: {
  id: number;
  icon: StaticImageData;
  name: string;
  job: string;
}) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/author/${id}`);
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <Image src={icon} alt={name} className={styles.image} />
      <h4 className={styles.title}>{name}</h4>
      <p className={styles.job}>{job}</p>
      <Image src={SocialWrapper} alt="Social icons" />
    </div>
  );
};

export default AuthorCard;
