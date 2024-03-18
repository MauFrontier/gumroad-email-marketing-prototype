import Icon from '../../../../../../../../../shared/ui/Icon/Icon';
import Select from '../../../../../../../../../shared/ui/Select/Select';
import {TargetingFilterSubject as TargetingFilterSubjectEnum} from '../../../../../../../emailMarketingTypes';
import './TargetingFilterSubject.scss';

interface Props {
  value: TargetingFilterSubjectEnum;
  onChange: (value: TargetingFilterSubjectEnum) => void;
}

const TargetingFilterSubject = ({value, onChange}: Props) => {
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
        <Icon
          uri="./src/assets/images/icons/icon_archive.svg"
          label="Product"
          className="TargetingFilterSubjectIcon"
        />
      ) : value === TargetingFilterSubjectEnum.Payment ? (
        <Icon
          uri="./src/assets/images/icons/icon_credit-card.svg"
          label="Payment"
          className="TargetingFilterSubjectIcon"
        />
      ) : value === TargetingFilterSubjectEnum.Location ? (
        <Icon
          uri="./src/assets/images/icons/icon_globe.svg"
          label="Location"
          className="TargetingFilterSubjectIcon"
        />
      ) : value === TargetingFilterSubjectEnum.Date ? (
        <Icon
          uri="./src/assets/images/icons/icon_calendar.svg"
          label="Date"
          className="TargetingFilterSubjectIcon"
        />
      ) : null}

      <Select
        value={value}
        onChange={handleSubjectChange}
        options={subjectOptions}
      />
    </div>
  );
};

export default TargetingFilterSubject;
