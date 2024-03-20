import {Targeting, TriggerType} from '../shared/emailMarketingTypes';
import {EmailMarketingState} from './emailMarketingStoreTypes';
import defaultData_targeting from './defaultTargeting.json';
import productsFromServer from '../api/productsFromServer';

export const emailMarketingInitialState: EmailMarketingState = {
  targeting: defaultData_targeting as Targeting,
  selectedTrigger: TriggerType.Purchase,
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
};
