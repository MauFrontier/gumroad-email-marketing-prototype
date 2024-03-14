import {
  EmailMarketingState,
  EmailMarketingAction,
  EmailMarketingActionType,
} from './emailMarketingStoreTypes';
import {Operand} from '../shared/emailMarketingTypes';
import {getDefaultFilterForSubject} from '../shared/emailMarketingDefaults';
import {updateFilterValue, updateFilterVerb} from '../shared/targetingUtils';

export const emailMarketingReducer = (
  state: EmailMarketingState,
  action: EmailMarketingAction,
): EmailMarketingState => {
  switch (action.type) {
    case EmailMarketingActionType.SetTargeting:
      return {...state, targeting: action.payload};
      break;
    default:
      return state;
      break;
  }
};
