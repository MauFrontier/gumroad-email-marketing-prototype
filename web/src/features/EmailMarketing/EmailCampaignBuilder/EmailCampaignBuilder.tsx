import TextInput from '../../shared/ui/components/TextInput/TextInput';
import InternalTools from './InternalTools/InternalTools';
import SegmentationBuilder from './SegmentationBuilder/SegmentationBuilder';
import AudienceSelection from './AudienceSelection/AudienceSelection';
import './EmailCampaignBuilder.scss';
import {Channels} from './emailMarketingTypes';
import {EmailMarketingActionType} from '../store/emailMarketingActionTypes';
import {useEmailMarketingState} from '../store/useEmailMarketingState';

const EmailCampaignBuilder = () => {
  const {state, dispatch} = useEmailMarketingState();

  const handleChangeChannel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: EmailMarketingActionType.SetChannel,
      payload: event.target.value as Channels,
    });
  };

  const handleAllowCommentsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch({
      type: EmailMarketingActionType.SetAllowComments,
      payload: event.target.checked,
    });
  };

  return (
    <form aria-label="Email campaign builder">
      <label>
        Title
        <TextInput placeholder="Title" />
      </label>
      <AudienceSelection />
      <SegmentationBuilder />
      <label aria-label="Select channel">
        Channel
        <select onChange={handleChangeChannel} value={state.channel}>
          <option value={Channels.EmailAndProfile}>
            Send email and post to my profile
          </option>
          <option value={Channels.Email}>Send email</option>
        </select>
      </label>
      <label aria-label="Allow comments">
        <input
          type="checkbox"
          onChange={handleAllowCommentsChange}
          checked={state.allowComments}
        />
        Allow comments in your posts
      </label>
      <InternalTools />
    </form>
  );
};

export default EmailCampaignBuilder;
