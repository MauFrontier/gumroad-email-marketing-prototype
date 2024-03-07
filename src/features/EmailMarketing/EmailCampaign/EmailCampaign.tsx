import TextInput from '../../shared/ui/TextInput/TextInput';
import TriggerSelection from './TriggerSelection/TriggerSelection';

const EmailCampaign = () => {
  return (
    <div data-testid="EmailCampaign">
      <label htmlFor="name">Name:</label>
      <div>
        <TextInput id="name" />
      </div>
      <TriggerSelection />
    </div>
  );
};

export default EmailCampaign;
