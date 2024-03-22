import Select from '../../../../../../../../../shared/ui/components/Select/Select';
import {
  SegmentationFilterSubject as SegmentationFilterSubjectEnum,
  SegmentationFilterSubjectQualifier as SegmentationFilterSubjectQualifierEnum,
} from '../../../../../../../emailMarketingTypes';
import {getSubjectQualifierOptions} from '../../../../../../../segmentationUtils';
import './SegmentationFilterSubjectQualifier.scss';

interface Props {
  subject: SegmentationFilterSubjectEnum;
  value: SegmentationFilterSubjectQualifierEnum;
  onChange: (value: SegmentationFilterSubjectQualifierEnum) => void;
  disabled?: boolean;
}

const SegmentationFilterSubjectQualifier = ({
  subject,
  value,
  onChange,
  disabled = false,
}: Props) => {
  const handleSubjectQualifierChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue as SegmentationFilterSubjectQualifierEnum);
    }
  };

  const subjectQualifiers = getSubjectQualifierOptions(subject);

  if (!subjectQualifiers || subjectQualifiers.length === 0) {
    return null;
  }

  const subjectQualifierClass = value?.replace(/\s/g, '-').toLowerCase();

  return (
    <div
      aria-label="Filter subject qualifier"
      className={subjectQualifierClass}>
      <Select
        value={value}
        disabled={disabled}
        onChange={handleSubjectQualifierChange}
        options={subjectQualifiers}
      />
    </div>
  );
};

export default SegmentationFilterSubjectQualifier;
