import Icon from '../../../../../../../../../shared/ui/components/Icon/Icon';
import {IconType} from '../../../../../../../../../shared/ui/components/Icon/iconLibrary';
import Select from '../../../../../../../../../shared/ui/components/Select/Select';
import {SegmentationFilterSubject as SegmentationFilterSubjectEnum} from '../../../../../../../emailMarketingTypes';
import './SegmentationFilterSubject.scss';

interface Props {
  value: SegmentationFilterSubjectEnum;
  onChange: (value: SegmentationFilterSubjectEnum) => void;
  disabled?: boolean;
}

const SegmentationFilterSubject = ({
  value,
  onChange,
  disabled = false,
}: Props) => {
  const handleSubjectChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue as SegmentationFilterSubjectEnum);
    }
  };

  const subjectOptions = [
    {
      key: SegmentationFilterSubjectEnum.Product,
      value: SegmentationFilterSubjectEnum.Product,
    },
    {
      key: SegmentationFilterSubjectEnum.Payment,
      value: SegmentationFilterSubjectEnum.Payment,
    },
    {
      key: SegmentationFilterSubjectEnum.Location,
      value: SegmentationFilterSubjectEnum.Location,
    },
    {
      key: SegmentationFilterSubjectEnum.Date,
      value: SegmentationFilterSubjectEnum.Date,
    },
  ];

  return (
    <div aria-label="Filter subject">
      {value && value === SegmentationFilterSubjectEnum.Product ? (
        <Icon type={IconType.Archive} />
      ) : value === SegmentationFilterSubjectEnum.Payment ? (
        <Icon type={IconType.CreditCard} />
      ) : value === SegmentationFilterSubjectEnum.Location ? (
        <Icon type={IconType.Globe} />
      ) : value === SegmentationFilterSubjectEnum.Date ? (
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

export default SegmentationFilterSubject;
