import Warning from '../../../../../shared/ui/Warning/Warning';
import {EmailMarketingActionType} from '../../../../store/emailMarketingStoreTypes';
import {useEmailMarketingState} from '../../../../store/useEmailMarketingState';
import {ErrorWarning} from '../../../emailMarketingTypes';
import './AIErrorWarnings.scss';

const AIErrorWarnings = () => {
  const {state, dispatch} = useEmailMarketingState();

  const closeErrorWarning = (id: string) => {
    dispatch({
      type: EmailMarketingActionType.SetErrorVisibility,
      payload: {id, isVisible: false},
    });
  };

  return (
    <div aria-label="AI error warnings">
      {state.aiErrors
        .filter((errorWarning: ErrorWarning) => errorWarning.isVisible)
        .map((errorWarning: ErrorWarning) => (
          <Warning
            label="AI error warning"
            key={errorWarning.id}
            onCloseWarning={() => closeErrorWarning(errorWarning.id)}
            message={errorWarning.error}
            isError={true}
          />
        ))}
    </div>
  );
};

export default AIErrorWarnings;
