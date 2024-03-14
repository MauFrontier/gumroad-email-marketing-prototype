import {createContext, useReducer} from 'react';
import {
  EmailMarketingAction,
  EmailMarketingState,
} from './emailMarketingStoreTypes';
import {emailMarketingReducer} from './emailMarketingSlice';
import {emailMarketingInitialState} from './emailMarketingStatePresets';

export const EmailMarketingStateContext = createContext<{
  state: EmailMarketingState;
  dispatch: React.Dispatch<EmailMarketingAction>;
}>({
  state: emailMarketingInitialState,
  dispatch: () => null,
});

export const EmailMarketingProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    emailMarketingReducer,
    emailMarketingInitialState,
  );

  return (
    <EmailMarketingStateContext.Provider value={{state, dispatch}}>
      {children}
    </EmailMarketingStateContext.Provider>
  );
};
