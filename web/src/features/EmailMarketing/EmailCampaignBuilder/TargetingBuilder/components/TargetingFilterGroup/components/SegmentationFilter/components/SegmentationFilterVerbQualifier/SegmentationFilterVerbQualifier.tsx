import {
  SegmentationFilterSubject as SegmentationFilterSubjectEnum,
  SegmentationFilterVerbQualifier as VerbQualifierEnum,
} from '../../../../../../../emailMarketingTypes';
import {getVerbQualifierOptions} from '../../../../../../../segmentationUtils';
import './SegmentationFilterVerbQualifier.scss';
import Select from '../../../../../../../../../shared/ui/components/Select/Select';

interface Props {
  subject: SegmentationFilterSubjectEnum;
  value?: VerbQualifierEnum;
  onChange?: (value: VerbQualifierEnum) => void;
  disabled?: boolean;
}

const SegmentationFilterVerbQualifier = ({
  subject,
  value,
  onChange,
  disabled,
}: Props) => {
  const handleVerbQualifierChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue as VerbQualifierEnum);
    }
  };

  const verbQualifierOptions = getVerbQualifierOptions(subject);

  if (!verbQualifierOptions || verbQualifierOptions.length === 0) {
    return null;
  }

  return (
    <div aria-label="Filter verb qualifier">
      <Select
        value={value || VerbQualifierEnum.Any}
        options={verbQualifierOptions}
        disabled={disabled}
        onChange={handleVerbQualifierChange}
      />
    </div>
  );
};

export default SegmentationFilterVerbQualifier;
