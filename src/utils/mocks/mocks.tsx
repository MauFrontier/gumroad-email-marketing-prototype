import {emailMarketingInitialState} from '../../features/EmailMarketing/store/emailMarketingInitialState';

jest.mock('uuid', () => ({
  v4: () => 'EXAMPLE_UUID',
}));

export const mockDispatch = jest.fn();

jest.mock('../../features/EmailMarketing/store/useEmailMarketingState', () => ({
  useEmailMarketingState: () => ({
    state: emailMarketingInitialState,
    dispatch: mockDispatch,
  }),
}));
