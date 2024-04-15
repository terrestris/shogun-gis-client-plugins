import type {
  ClientPlugin
} from '@terrestris/shogun-gis-client/dist/plugin';

import footerLinksPluginLocale from './i18n/index';

import FooterLinks from './index';

export const FooterLinksPlugin: ClientPlugin = {
  key: 'FooterLinks-plugin',
  integration: {
    placement: 'footer',
    placementOrientation: 'right',
    insertionIndex: 2
  },
  component: FooterLinks,
  i18n: footerLinksPluginLocale,
};

export default FooterLinksPlugin;
