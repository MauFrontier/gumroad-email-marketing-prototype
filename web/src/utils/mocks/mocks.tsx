import {emailMarketingInitialState} from '../../features/EmailMarketing/store/emailMarketingInitialState';
import {EmailMarketingState} from '../../features/EmailMarketing/store/emailMarketingActionTypes';

import defaultSegmentation from '../../features/EmailMarketing/store/defaultSegmentation.json';

jest.mock('../../features/EmailMarketing/api/ai/ChatGPT', () => {
  return {
    ...jest.requireActual('../../features/EmailMarketing/api/ai/ChatGPT'),
    generateSegmentationAPIRequest: () => ({
      result: 'success with errors',
      payload: {
        defaultSegmentation: defaultSegmentation,
      },
      errors: [
        "Products 'motorcycle' and 'app' were not recognized. They've been excluded from your criteria.",
      ],
    }),
  };
});

global.alert = jest.fn();

jest.mock('@/constants', () => ({
  VITE_OPENAI_API_KEY: 'EXAMPLE_OPENAI_API_KEY',
}));

jest.mock('uuid', () => ({
  v4: () => 'EXAMPLE_UUID',
}));

export const mockDispatch = jest.fn();
let emailMarketingState = emailMarketingInitialState;

export const setMockEmailMarketingState = (
  customState: EmailMarketingState,
) => {
  emailMarketingState = customState;
};

export const resetMockEmailMarketingState = () => {
  emailMarketingState = emailMarketingInitialState;
};

jest.mock('../../features/EmailMarketing/store/useEmailMarketingState', () => ({
  useEmailMarketingState: () => ({
    state: emailMarketingState,
    dispatch: mockDispatch,
  }),
}));

global.scrollTo = jest.fn();
