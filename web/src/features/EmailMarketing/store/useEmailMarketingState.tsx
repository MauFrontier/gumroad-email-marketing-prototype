// useTargetingState.ts
import {useContext} from 'react';
import {EmailMarketingStateContext} from './emailMarketingStore';

export const useEmailMarketingState = () => {
  const context = useContext(EmailMarketingStateContext);
  if (!context) {
    throw new Error(
      'useEmailMarketingState must be used within a EmailMarketingProvider',
    );
  }
  return context;
};
