import {
  Targeting,
  AudienceType,
  Channels,
} from '../EmailCampaignBuilder/emailMarketingTypes';
import {EmailMarketingState} from './emailMarketingActionTypes';
import defaultData_targeting from './defaultTargeting.json';
import productsFromServer from '../api/productsFromServer';

export const emailMarketingInitialState: EmailMarketingState = {
  targeting: defaultData_targeting as Targeting,
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
