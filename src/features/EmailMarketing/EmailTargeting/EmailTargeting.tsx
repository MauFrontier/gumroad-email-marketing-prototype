import TextInput from '../../shared/ui/TextInput';

const EmailTargeting = () => {
  return (
    <div data-testid="EmailTargeting">
      <label htmlFor="name">Name:</label>
      <div>
        <TextInput id="name" />
      </div>
    </div>
  );
};

export default EmailTargeting;
