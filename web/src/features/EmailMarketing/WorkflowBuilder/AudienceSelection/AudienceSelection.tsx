import Button from '../../../shared/ui/components/Button/Button';
import Sticker from '../../../shared/ui/components/Sticker/Sticker';
import {EmailMarketingActionType} from '../../store/emailMarketingActionTypes';
import {useEmailMarketingState} from '../../store/useEmailMarketingState';
import {AudienceType} from '../emailMarketingTypes';
import {audiences} from './audiences';

import './AudienceSelection.scss';

const AudienceSelection = () => {
  const {state, dispatch} = useEmailMarketingState();
  const {selectedAudience} = state;

  const selectAudience = (audience: AudienceType) => {
    if (selectedAudience === audience) {
      return;
    }

    dispatch({
      type: EmailMarketingActionType.SelectAudience,
      payload: audience,
    });
  };

  return (
    <section role="region" aria-label="Audience selection">
      <fieldset>
        <legend>Audience</legend>
        {audiences.map(audience => (
          <Button
            onClick={() => selectAudience(audience.type)}
            key={audience.type}
            pressed={selectedAudience === audience.type}
            label={audience.type + ' audience'}>
            <Sticker uri={audience.stickerURI} label={audience.type} />
            <h3>{audience.type}</h3>
            <p>{audience.shortDescription}</p>
          </Button>
        ))}
      </fieldset>
    </section>
  );
};

export default AudienceSelection;
