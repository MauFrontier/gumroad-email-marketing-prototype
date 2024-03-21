import TextInput from '../../shared/ui/components/TextInput/TextInput';
import InternalTools from '../shared/InternalTools/InternalTools';
import TargetingBuilder from '../shared/TargetingBuilder/TargetingBuilder';
import TriggerSelection from '../shared/TriggerSelection/TriggerSelection';

const WorkflowBuilder = () => {
  return (
    <form aria-label="Workflow builder">
      <label>
        Name
        <TextInput placeholder="Name of workflow" />
      </label>
      <TriggerSelection />
      <TargetingBuilder />
      <InternalTools />
    </form>
  );
};

export default WorkflowBuilder;
