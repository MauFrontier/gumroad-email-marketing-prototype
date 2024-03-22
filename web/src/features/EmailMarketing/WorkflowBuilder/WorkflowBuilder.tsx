import TextInput from '../../shared/ui/components/TextInput/TextInput';
import InternalTools from './InternalTools/InternalTools';
import TargetingBuilder from './TargetingBuilder/TargetingBuilder';
import AudienceSelection from './AudienceSelection/AudienceSelection';

const WorkflowBuilder = () => {
  return (
    <form aria-label="Workflow builder">
      <label>
        Name
        <TextInput placeholder="Name of workflow" />
      </label>
      <AudienceSelection />
      <TargetingBuilder />
      <InternalTools />
    </form>
  );
};

export default WorkflowBuilder;
