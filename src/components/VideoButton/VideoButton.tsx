'use client';

import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import VideoModal from '../VideoModal/VideoModal';

const VideoButton = () => {
  const { t } = useTranslation();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const onClick = () => setIsVideoOpen(true);

  const onClose = useCallback(() => setIsVideoOpen(false), []);

  return (
    <>
      <button className="button secondary" onClick={onClick}>
        {t('video')}
      </button>
      {isVideoOpen && <VideoModal onClose={onClose} />}
    </>
  );
};

export default VideoButton;
