import TextInput from '../../shared/ui/TextInput/TextInput';
import TriggerSelection from './TriggerSelection/TriggerSelection';

const EmailTargeting = () => {
  return (
    <div data-testid="EmailTargeting">
      <label htmlFor="name">Name:</label>
      <div>
        <TextInput id="name" />
      </div>
      <TriggerSelection />
    </div>
  );
};

export default EmailTargeting;
