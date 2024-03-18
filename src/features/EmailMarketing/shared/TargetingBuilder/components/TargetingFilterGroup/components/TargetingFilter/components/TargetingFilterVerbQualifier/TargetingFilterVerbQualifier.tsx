import {
  TargetingFilterSubject as TargetingFilterSubjectEnum,
  TargetingFilterVerbQualifier as VerbQualifierEnum,
} from '../../../../../../../emailMarketingTypes';
import {getVerbQualifierOptions} from '../../../../../../../targetingUtils';
import './TargetingFilterVerbQualifier.scss';
import Select from '../../../../../../../../../shared/ui/Select/Select';

interface Props {
  subject: TargetingFilterSubjectEnum;
  value?: VerbQualifierEnum;
  onChange?: (value: VerbQualifierEnum) => void;
}

const TargetingFilterVerbQualifier = ({subject, value, onChange}: Props) => {
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
        onChange={handleVerbQualifierChange}
      />
    </div>
  );
};

export default TargetingFilterVerbQualifier;
