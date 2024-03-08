import TextInput from '../../shared/ui/TextInput/TextInput';
import TargetingBuilderHeader from '../shared/TargetingBuilderHeader/TargetingBuilderHeader';
import TriggerSelection from '../shared/TriggerSelection/TriggerSelection';

const EmailCampaignBuilder = () => {
  return (
    <div data-testid="EmailCampaign">
      <label className="mb-2">
        Name
        <TextInput placeholder="Name of email campaign" />
      </label>
      <TriggerSelection />
      <TargetingBuilderHeader />
    </div>
  );
};

export default EmailCampaignBuilder;
