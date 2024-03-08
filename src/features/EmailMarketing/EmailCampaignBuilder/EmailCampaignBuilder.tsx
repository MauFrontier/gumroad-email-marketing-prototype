import TextInput from '../../shared/ui/TextInput/TextInput';
import TargetingBuilder from '../shared/TargetingBuilder/TargetingBuilder';
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
      <TargetingBuilder />
      <label className="mt-4 mb-2">
        Channel
        <select>
          <option>Send email and post to my public profile (?)</option>
        </select>
      </label>
      <label className="mt-4 row">
        <input type="checkbox" defaultChecked={true} />
        Allow comments in your posts
      </label>
    </div>
  );
};

export default EmailCampaignBuilder;
