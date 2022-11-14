import type {
  ClientPlugin
} from '@terrestris/shogun-gis-client/dist/plugin';

import cookieConsentPopupLocale from './i18n';

import CookieConsentPopupComponent from './index';

export const CookieConsentPlugin: ClientPlugin = {
  key: 'CookieConsentPopup-plugin',
  integration: {
    placement: 'cookie-banner'
  },
  component: CookieConsentPopupComponent,
  i18n: cookieConsentPopupLocale,
  reducers: {}
};

export default CookieConsentPlugin;
