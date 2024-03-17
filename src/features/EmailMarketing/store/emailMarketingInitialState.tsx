import {Targeting, TriggerType} from '../shared/emailMarketingTypes';
import {EmailMarketingState} from './emailMarketingStoreTypes';
import defaultData_targeting from './defaultTargeting.json';

export const emailMarketingInitialState: EmailMarketingState = {
  targeting: defaultData_targeting as Targeting,
  selectedTrigger: TriggerType.Purchase,
  showGenerateWithAIPanel: false,
  isAILoading: false,
  showAIAccuracyWarning: false,
  showAIErrorsWarning: false,
  prompt: '',
  aiErrors: [],
  latestAIPrompt: '',
  latestAIResponse: '',
  showDevTools: false,
};
