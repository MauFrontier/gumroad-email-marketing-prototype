import {
  Segmentation as Segmentation,
  AudienceType,
  Channels,
} from '../EmailCampaignBuilder/emailMarketingTypes';
import {EmailMarketingState} from './emailMarketingActionTypes';
import defaultData_segmentation from './defaultSegmentation.json';
import productsFromServer from '../api/productsFromServer';

export const emailMarketingInitialState: EmailMarketingState = {
  segmentation: defaultData_segmentation as Segmentation,
  selectedAudience: AudienceType.Everyone,
  products: productsFromServer,
  showGenerateWithAIPanel: false,
  isAILoading: false,
  showAIAccuracyWarning: false,
  prompt: '',
  votedAIAccuracyUp: false,
  votedAIAccuracyDown: false,
  aiErrors: [],
  latestAIPrompt: '',
  latestAIResponse: '',
  channel: Channels.EmailAndProfile,
  allowComments: true,
};
