import TextInput from '../../shared/ui/TextInput/TextInput';
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
    </form>
  );
};

export default WorkflowBuilder;
