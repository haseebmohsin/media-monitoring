import adminPanelAppConfig from './admin-panel/adminPanelAppConfig';
import channelsConfig from './channels/channelsConfig';
import faceTrakkAppConfig from './face-trakk/faceTrakkAppConfig';
import socialMediaScrapingAppConfig from './social-media-scraping/socialMediaScrapingAppConfig';
import sttAppConfig from './stt/sttAppConfig';
import tickersAppConfig from './tickers/tickersAppConfig';

const appsConfigs = [
  tickersAppConfig,
  faceTrakkAppConfig,
  socialMediaScrapingAppConfig,
  sttAppConfig,
  channelsConfig,
  adminPanelAppConfig,
];

export default appsConfigs;
