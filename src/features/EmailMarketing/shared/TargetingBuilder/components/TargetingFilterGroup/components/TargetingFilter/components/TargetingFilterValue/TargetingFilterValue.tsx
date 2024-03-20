import {
  TargetingFilterSubject as TargetingFilterSubjectEnum,
  TargetingFilterVerb as TargetingFilterVerbEnum,
  TargetingFilterValueType,
} from '../../../../../../../emailMarketingTypes';
import {getValueOptions} from '../../../../../../../targetingUtils';
import './TargetingFilterValue.scss';
import DateInput from '../../../../../../../../../shared/ui/DateInput/DateInput';
import ComboBox from '../../../../../../../../../shared/ui/ComboBox/ComboBox';
import {formatDateForDisplay} from '../../../../../../../formatUtils';
import NumberInputWithLabel from '../../../../../../../../../shared/ui/NumberInputWithLabel/NumberInputWithLabel';
import CurrencyInput from '../../../../../../../../../shared/ui/CurrencyInput/CurrencyInput';
import Select from '../../../../../../../../../shared/ui/Select/Select';

interface Props {
  subject: TargetingFilterSubjectEnum;
  verb: TargetingFilterVerbEnum;
  value: TargetingFilterValueType;
  onChange: (value: TargetingFilterValueType) => void;
  disabled?: boolean;
}

const TargetingFilterValue = ({
  subject,
  verb,
  value,
  onChange,
  disabled = false,
}: Props) => {
  const stringValue = value !== undefined ? value.toString() : '';
  const options = getValueOptions(subject);
  const shouldExpand = subject === TargetingFilterSubjectEnum.Product;

  const handleOnChange = (newValue: TargetingFilterValueType) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div
      aria-label="Filter value"
      className={`${shouldExpand ? 'expanded' : ''}`}>
      {subject === TargetingFilterSubjectEnum.Date ? (
        verb === TargetingFilterVerbEnum.IsInTheLast ? (
          <NumberInputWithLabel
            value={
              typeof value === 'number'
                ? value
                : typeof value === 'string'
                  ? parseInt(value)
                  : 0
            }
            onChange={handleOnChange}
            disabled={disabled}
            label="days"
          />
        ) : (
          <DateInput
            value={formatDateForDisplay(value as string)}
            onChange={handleOnChange}
            disabled={disabled}
          />
        )
      ) : subject === TargetingFilterSubjectEnum.Location ? (
        <Select
          value={stringValue}
          onChange={handleOnChange}
          options={options ?? []}
          disabled={disabled}
        />
      ) : subject === TargetingFilterSubjectEnum.Product ? (
        <ComboBox
          selectedValues={value as string[]}
          onValuesChange={handleOnChange}
          placeholder="Select a product..."
          suggestions={options ?? []}
          disabled={disabled}
        />
      ) : subject === TargetingFilterSubjectEnum.Payment ? (
        <CurrencyInput
          value={typeof value === 'number' ? value : parseFloat(stringValue)}
          onChange={newValue => handleOnChange(newValue as number)}
          disabled={disabled}
        />
      ) : null}
    </div>
  );
};

export default TargetingFilterValue;
