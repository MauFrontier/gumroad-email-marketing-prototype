import {render} from '@testing-library/react';
import {EmailMarketingState} from './emailMarketingStoreTypes';
import {EmailMarketingProvider} from './emailMarketingStore';
import {emailMarketingInitialState} from './emailMarketingInitialState';

export const renderComponentWithState = (
  component: React.ReactElement,
  initialState: EmailMarketingState = emailMarketingInitialState,
) => {
  return render(
    <EmailMarketingProvider initialState={initialState}>
      {component}
    </EmailMarketingProvider>,
  );
};
