import React from 'react';
import Feature from 'ol/Feature';
// import { Feature } from 'ol';

import {
  Button
} from 'antd';

import {
  useTranslation
} from 'react-i18next';

interface Props {
  feature: Feature
}

export const FooterLinks: React.FC<Props> = ({
  feature
}) => {

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
      {feature instanceof Feature ? 'is a feature' : 'isNot a feature'}
    </Button>
  );
};

export default FooterLinks;
