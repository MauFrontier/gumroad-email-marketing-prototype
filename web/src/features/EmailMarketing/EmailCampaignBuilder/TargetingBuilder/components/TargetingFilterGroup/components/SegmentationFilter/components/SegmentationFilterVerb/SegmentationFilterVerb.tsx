import {
  SegmentationFilterSubject as SegmentationFilterSubjectEnum,
  SegmentationFilterVerb as SegmentationFilterVerbEnum,
} from '../../../../../../../emailMarketingTypes';
import {getVerbOptions} from '../../../../../../../segmentationUtils';
import Select from '../../../../../../../../../shared/ui/components/Select/Select';

interface Props {
  subject: SegmentationFilterSubjectEnum;
  value: SegmentationFilterVerbEnum;
  onChange: (value: SegmentationFilterVerbEnum) => void;
  disabled?: boolean;
}

const SegmentationFilterVerb = ({
  subject,
  value,
  onChange,
  disabled = false,
}: Props) => {
  const handleVerbChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue as SegmentationFilterVerbEnum);
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

export default SegmentationFilterVerb;
