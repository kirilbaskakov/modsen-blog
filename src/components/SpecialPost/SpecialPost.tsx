import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import SpecialPostImage from '@/assets/SpeciaPost.webp';

import styles from './SpecialPost.module.scss';

const SpecialPost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={SpecialPostImage}
          alt="Special post image"
          layout="responsive"
        />
      </div>
      <div className={styles.textContainer}>
        <p className="cap1">Why we started</p>
        <h1>It started out as a simple idea and evolved into our passion</h1>
        <p className="body1 secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip.
        </p>
        <Link href="/about" className="button">
          Discover our story {'>'}
        </Link>
      </div>
    </div>
  );
};

export default SpecialPost;
