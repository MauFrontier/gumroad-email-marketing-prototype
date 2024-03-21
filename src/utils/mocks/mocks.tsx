import {emailMarketingInitialState} from '../../features/EmailMarketing/store/emailMarketingInitialState';
import {EmailMarketingState} from '../../features/EmailMarketing/store/emailMarketingActionTypes';

import defaultTargeting from '../../features/EmailMarketing/store/defaultTargeting.json';

jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: () =>
              Promise.resolve({
                choices: [
                  {
                    message: {
                      content: JSON.stringify({
                        result: 'success with errors',
                        payload: defaultTargeting,
                        errors: [
                          "Products 'motorcycle' and 'app' were not recognized. They've been excluded from your criteria.",
                        ],
                      }),
                    },
                  },
                ],
              }),
          },
        },
      };
    }),
  };
});

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
