import Warning from '../../../../../shared/ui/Warning/Warning';
import {EmailMarketingActionType} from '../../../../store/emailMarketingStoreTypes';
import {useEmailMarketingState} from '../../../../store/useEmailMarketingState';
import './AIAccuracyWarning.scss';

const AIAccuracyWarning = () => {
  const {state, dispatch} = useEmailMarketingState();

  const handleCloseWarning = () => {
    dispatch({
      type: EmailMarketingActionType.SetShowAIAccuracyWarning,
      payload: false,
    });
  };

  const voteUpAIResult = () => {
    dispatch({
      type: EmailMarketingActionType.SetVotedAIAccuracyUp,
      payload: true,
    });
  };

  const removeVoteUpAIResult = () => {
    dispatch({
      type: EmailMarketingActionType.SetVotedAIAccuracyUp,
      payload: false,
    });
  };

  const voteDownAIResult = () => {
    dispatch({
      type: EmailMarketingActionType.SetVotedAIAccuracyDown,
      payload: true,
    });
  };

  const removeVoteDownAIResult = () => {
    dispatch({
      type: EmailMarketingActionType.SetVotedAIAccuracyDown,
      payload: false,
    });
  };

  return (
    <Warning
      label="AI accuracy warning"
      message="AI outputs can be inaccurate or wrong. Help improve them by rating this result."
      onCloseWarning={handleCloseWarning}
      votedUp={state.votedAIAccuracyUp}
      votedDown={state.votedAIAccuracyDown}
      onVoteUp={voteUpAIResult}
      onRemoveVoteUp={removeVoteUpAIResult}
      onVoteDown={voteDownAIResult}
      onRemoveVoteDown={removeVoteDownAIResult}
    />
  );
};

export default AIAccuracyWarning;
