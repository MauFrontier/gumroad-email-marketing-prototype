import {
  TargetingFilterSubject as TargetingFilterSubjectEnum,
  TargetingFilterVerb as TargetingFilterVerbEnum,
} from '../../../../../../../emailMarketingTypes';
import {getVerbOptions} from '../../../../../../../targetingUtils';
import Select from '../../../../../../../../../shared/ui/Select/Select';

interface Props {
  subject: TargetingFilterSubjectEnum;
  value: TargetingFilterVerbEnum;
  onChange: (value: TargetingFilterVerbEnum) => void;
}

const TargetingFilterVerb = ({subject, value, onChange}: Props) => {
  const handleVerbChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue as TargetingFilterVerbEnum);
    }
  };

  const verbOptions = getVerbOptions(subject);

  if (!verbOptions || verbOptions.length === 0) {
    return null;
  }

  return (
    <div aria-label="Filter verb">
      <Select value={value} onChange={handleVerbChange} options={verbOptions} />
    </div>
  );
};

export default TargetingFilterVerb;