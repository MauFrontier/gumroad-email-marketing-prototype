import {createContext, useReducer} from 'react';
import {
  EmailMarketingAction,
  EmailMarketingState,
} from './emailMarketingStoreTypes';
import {emailMarketingReducer} from './emailMarketingReducer';
import {emailMarketingInitialState} from './emailMarketingInitialState';

export const EmailMarketingStateContext = createContext<{
  state: EmailMarketingState;
  dispatch: React.Dispatch<EmailMarketingAction>;
}>({
  state: emailMarketingInitialState,
  dispatch: () => null,
});

export const EmailMarketingProvider: React.FC<{
  children: React.ReactNode;
  initialState?: EmailMarketingState;
}> = ({children, initialState = emailMarketingInitialState}) => {
  const [state, dispatch] = useReducer(emailMarketingReducer, initialState);

  return (
    <EmailMarketingStateContext.Provider value={{state, dispatch}}>
      {children}
    </EmailMarketingStateContext.Provider>
  );
};
