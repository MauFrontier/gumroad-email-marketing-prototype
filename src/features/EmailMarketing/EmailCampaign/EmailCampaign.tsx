import TextInput from '../../shared/ui/TextInput/TextInput';
import TriggerSelection from '../shared/TriggerSelection/TriggerSelection';

const EmailCampaign = () => {
  return (
    <div data-testid="EmailCampaign">
      <label className="mb-2">
        Name
        <TextInput id="name" />
      </label>
      <TriggerSelection />
    </div>
  );
};

export default EmailCampaign;
