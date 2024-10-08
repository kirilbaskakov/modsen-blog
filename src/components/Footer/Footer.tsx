'use client';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import emailjs from '@emailjs/browser';
import classNames from 'classnames';
import Image from 'next/image';

import SocialIcons from '@/assets/icons/SocialIcons.svg';
import validateEmail from '@/constants/validation/validateEmail';

import Nav from '../Nav/Nav';
import Popup from '../Popup/Popup';
import styles from './Footer.module.scss';

const Footer = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<{ email: string }>();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onPopupClose = () => setIsPopupOpen(false);

  const onSubmit: SubmitHandler<{ email: string }> = data => {
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_SUBSCRIBE_ID!,
        data,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
        }
      )
      .then(() => {
        setIsPopupOpen(true);
        reset();
      });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerNav}>
        <Nav type="footer" />
      </div>
      <form className={styles.subscribeForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.subscribeTitle}>{t('footerTitle')}</h2>
        <input
          className={classNames({
            [styles.errorInput]: errors.email,
            [styles.subscribeInput]: true
          })}
          placeholder={t('enterEmail')}
          {...register('email', validateEmail(t))}
        />
        <button className="button">{t('subscribe')}</button>
      </form>
      <div className={styles.contacts}>
        <div className={styles.address}>
          <p>Finstreet 118 2561 Fintown </p>
          <p>Hello@finsweet.com 020 7993 2905</p>
        </div>
        <Image src={SocialIcons} alt="Social icons" />
      </div>
      {isPopupOpen && (
        <Popup
          text={t('subscribeMsg')}
          isOpen={isPopupOpen}
          onClose={onPopupClose}
        />
      )}
    </footer>
  );
};

export default Footer;
