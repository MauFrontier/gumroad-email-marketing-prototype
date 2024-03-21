import Button from '../../../shared/ui/components/Button/Button';
import Sticker from '../../../shared/ui/components/Sticker/Sticker';
import {EmailMarketingActionType} from '../../store/emailMarketingActionTypes';
import {useEmailMarketingState} from '../../store/useEmailMarketingState';
import {TriggerType} from '../emailMarketingTypes';
import {triggers} from './triggers';

import './TriggerSelection.scss';

const TriggerSelection = () => {
  const {state, dispatch} = useEmailMarketingState();
  const {selectedTrigger} = state;

  const selectTrigger = (trigger: TriggerType) => {
    if (selectedTrigger === trigger) {
      return;
    }

    dispatch({type: EmailMarketingActionType.SelectTrigger, payload: trigger});
  };

  const audienceType =
    selectedTrigger === TriggerType.NewSubscriber
      ? 'email subscribers'
      : selectedTrigger === TriggerType.MemberCancels
        ? 'members who canceled'
        : selectedTrigger === TriggerType.NewAffiliate
          ? 'affiliates'
          : 'customers';

  return (
    <section role="region" aria-label="Trigger selection">
      <fieldset>
        <legend>Trigger</legend>
        {triggers.map(trigger => (
          <Button
            onClick={() => selectTrigger(trigger.type)}
            key={trigger.type}
            pressed={selectedTrigger === trigger.type}
            label={trigger.type + ' trigger'}>
            <Sticker uri={trigger.stickerURI} label={trigger.type} />
            <h3>{trigger.type}</h3>
            <p>{trigger.shortDescription}</p>
          </Button>
        ))}
      </fieldset>
      <label className="row">
        <input type="checkbox" />
        Also send to past {audienceType}
      </label>
    </section>
  );
};

export default TriggerSelection;
