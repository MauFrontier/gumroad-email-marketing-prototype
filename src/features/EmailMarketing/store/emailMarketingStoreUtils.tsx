import {render} from '@testing-library/react';
import {EmailMarketingState} from './emailMarketingStoreTypes';
import {EmailMarketingProvider} from './emailMarketingStore';
import {emailMarketingInitialState} from './emailMarketingInitialState';
import {setMockEmailMarketingState} from '../../../utils/mocks/mocks';

export const renderComponentWithState = (
  component: React.ReactElement,
  customState: EmailMarketingState = emailMarketingInitialState,
) => {
  setMockEmailMarketingState(customState);
  return render(
    <EmailMarketingProvider initialState={customState}>
      {component}
    </EmailMarketingProvider>,
  );
};
