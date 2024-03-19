import Select from '../../../../../../../../../shared/ui/Select/Select';
import {
  TargetingFilterSubject as TargetingFilterSubjectEnum,
  TargetingFilterSubjectQualifier as TargetingFilterSubjectQualifierEnum,
} from '../../../../../../../emailMarketingTypes';
import {getSubjectQualifierOptions} from '../../../../../../../targetingUtils';

interface Props {
  subject: TargetingFilterSubjectEnum;
  value: TargetingFilterSubjectQualifierEnum;
  onChange: (value: TargetingFilterSubjectQualifierEnum) => void;
  disabled?: boolean;
}

const TargetingFilterSubjectQualifier = ({
  subject,
  value,
  onChange,
  disabled = false,
}: Props) => {
  const handleSubjectQualifierChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue as TargetingFilterSubjectQualifierEnum);
    }
  };

  const subjectQualifiers = getSubjectQualifierOptions(subject);

  if (!subjectQualifiers || subjectQualifiers.length === 0) {
    return null;
  }

  return (
    <div aria-label="Filter subject qualifier">
      <Select
        value={value}
        disabled={disabled}
        onChange={handleSubjectQualifierChange}
        options={subjectQualifiers}
      />
    </div>
  );
};

export default TargetingFilterSubjectQualifier;
