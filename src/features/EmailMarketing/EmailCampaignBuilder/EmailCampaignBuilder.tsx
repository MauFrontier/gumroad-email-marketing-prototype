import TextInput from '../../shared/ui/TextInput/TextInput';
import TargetingBuilder from '../shared/TargetingBuilder/TargetingBuilder';
import TriggerSelection from '../shared/TriggerSelection/TriggerSelection';

const EmailCampaignBuilder = () => {
  return (
    <form aria-label="Email campaign builder">
      <label>
        Name
        <TextInput placeholder="Name of email campaign" />
      </label>
      <TriggerSelection />
      <TargetingBuilder />
      <label className="mt-4">
        Channel
        <select>
          <option>Send email and post to my public profile (?)</option>
        </select>
      </label>
      <label className="mt-4 row">
        <input type="checkbox" defaultChecked={true} />
        Allow comments in your posts
      </label>
    </form>
  );
};

export default EmailCampaignBuilder;
