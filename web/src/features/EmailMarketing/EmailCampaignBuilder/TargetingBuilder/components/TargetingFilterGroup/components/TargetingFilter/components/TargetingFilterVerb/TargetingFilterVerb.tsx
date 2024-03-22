import {
  SegmentationFilterSubject as TargetingFilterSubjectEnum,
  SegmentationFilterVerb as TargetingFilterVerbEnum,
} from '../../../../../../../emailMarketingTypes';
import {getVerbOptions} from '../../../../../../../segmentationUtils';
import Select from '../../../../../../../../../shared/ui/components/Select/Select';

interface Props {
  subject: TargetingFilterSubjectEnum;
  value: TargetingFilterVerbEnum;
  onChange: (value: TargetingFilterVerbEnum) => void;
  disabled?: boolean;
}

const TargetingFilterVerb = ({
  subject,
  value,
  onChange,
  disabled = false,
}: Props) => {
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
      <Select
        value={value}
        onChange={handleVerbChange}
        disabled={disabled}
        options={verbOptions}
      />
    </div>
  );
};

export default TargetingFilterVerb;
