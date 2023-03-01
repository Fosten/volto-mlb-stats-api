import '@plone/volto/config';
import { PlayerCardView } from './components';

export default function applyConfig(config) {
config.views = {
    ...config.views,
    contentTypesViews: {
      ...config.views.contentTypesViews,
      playercard: PlayerCardView,
    },
  };
  return config;
}