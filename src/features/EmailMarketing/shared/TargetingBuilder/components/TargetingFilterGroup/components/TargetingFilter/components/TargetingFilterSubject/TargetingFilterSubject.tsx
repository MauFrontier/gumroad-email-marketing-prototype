import Icon from '../../../../../../../../../shared/ui/Icon/Icon';
import {IconType} from '../../../../../../../../../shared/ui/Icon/iconLibrary';
import Select from '../../../../../../../../../shared/ui/Select/Select';
import {TargetingFilterSubject as TargetingFilterSubjectEnum} from '../../../../../../../emailMarketingTypes';
import './TargetingFilterSubject.scss';

interface Props {
  value: TargetingFilterSubjectEnum;
  onChange: (value: TargetingFilterSubjectEnum) => void;
  disabled?: boolean;
}

const TargetingFilterSubject = ({value, onChange, disabled = false}: Props) => {
  const handleSubjectChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue as TargetingFilterSubjectEnum);
    }
  };

  const subjectOptions = [
    {
      key: TargetingFilterSubjectEnum.Product,
      value: TargetingFilterSubjectEnum.Product,
    },
    {
      key: TargetingFilterSubjectEnum.Payment,
      value: TargetingFilterSubjectEnum.Payment,
    },
    {
      key: TargetingFilterSubjectEnum.Location,
      value: TargetingFilterSubjectEnum.Location,
    },
    {
      key: TargetingFilterSubjectEnum.Date,
      value: TargetingFilterSubjectEnum.Date,
    },
  ];

  return (
    <div aria-label="Filter subject">
      {value && value === TargetingFilterSubjectEnum.Product ? (
        <Icon type={IconType.Archive} />
      ) : value === TargetingFilterSubjectEnum.Payment ? (
        <Icon type={IconType.CreditCard} />
      ) : value === TargetingFilterSubjectEnum.Location ? (
        <Icon type={IconType.Globe} />
      ) : value === TargetingFilterSubjectEnum.Date ? (
        <Icon type={IconType.Calendar} />
      ) : null}

      <Select
        value={value}
        onChange={handleSubjectChange}
        options={subjectOptions}
        disabled={disabled}
      />
    </div>
  );
};

export default TargetingFilterSubject;
