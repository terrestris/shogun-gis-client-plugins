import React from 'react';

import {
  useTranslation
} from 'react-i18next';

export const CookieConsentPopup: React.FC = () => {

  const {
    t
  } = useTranslation();

  return (
    <div>
      {
        t('CookieConsentPopup.test')
      }
    </div>
  );
};

export default CookieConsentPopup;
