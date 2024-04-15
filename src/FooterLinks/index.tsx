import React from 'react';

import {
  Button
} from 'antd';

import {
  useTranslation
} from 'react-i18next';

export const FooterLinks: React.FC = () => {

  const {
    t
  } = useTranslation();

  const openLink = (): void => {
    window.open('https://github.com/terrestris/shogun-gis-client-plugins');
  };

  return (
    <Button
      type='link'
      onClick={openLink}
    >
      {
        t('FooterLinks.exampleLink')
      }
    </Button>
  );
};

export default FooterLinks;
