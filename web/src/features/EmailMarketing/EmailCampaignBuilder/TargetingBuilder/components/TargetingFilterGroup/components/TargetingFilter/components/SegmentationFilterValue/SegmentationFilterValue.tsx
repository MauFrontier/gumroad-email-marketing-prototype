import {
  SegmentationFilterSubject as SegmentationFilterSubjectEnum,
  SegmentationFilterVerb as SegmentationFilterVerbEnum,
  SegmentationFilterValueType,
} from '../../../../../../../emailMarketingTypes';
import './SegmentationFilterValue.scss';
import DateInput from '../../../../../../../../../shared/ui/components/DateInput/DateInput';
import ComboBox from '../../../../../../../../../shared/ui/components/ComboBox/ComboBox';
import {formatDateForDisplay} from '../../../../../../../../../../utils/formats/formatUtils';
import NumberInputWithLabel from '../../../../../../../../../shared/ui/components/NumberInputWithLabel/NumberInputWithLabel';
import CurrencyInput from '../../../../../../../../../shared/ui/components/CurrencyInput/CurrencyInput';
import Select from '../../../../../../../../../shared/ui/components/Select/Select';
import {getCountriesArray} from '../../../../../../../../../../utils/formats/countries';
import {useEmailMarketingState} from '../../../../../../../../store/useEmailMarketingState';

interface Props {
  subject: SegmentationFilterSubjectEnum;
  verb: SegmentationFilterVerbEnum;
  value: SegmentationFilterValueType;
  onChange: (value: SegmentationFilterValueType) => void;
  disabled?: boolean;
}

const SegmentationFilterValue = ({
  subject,
  verb,
  value,
  onChange,
  disabled = false,
}: Props) => {
  const {state} = useEmailMarketingState();

  const options =
    subject === SegmentationFilterSubjectEnum.Location
      ? getCountriesArray()
      : subject === SegmentationFilterSubjectEnum.Product
        ? state.products
        : null;

  const stringValue = value !== undefined ? value.toString() : '';
  const shouldExpand = subject === SegmentationFilterSubjectEnum.Product;

  const handleOnChange = (newValue: SegmentationFilterValueType) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div
      aria-label="Filter value"
      className={`${shouldExpand ? 'expanded' : ''}`}>
      {subject === SegmentationFilterSubjectEnum.Date ? (
        verb === SegmentationFilterVerbEnum.IsInTheLast ? (
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
            allowNegative={false}
            label="days"
          />
        ) : (
          <DateInput
            value={formatDateForDisplay(value as string)}
            onChange={handleOnChange}
            disabled={disabled}
          />
        )
      ) : subject === SegmentationFilterSubjectEnum.Location ? (
        <Select
          value={stringValue}
          onChange={handleOnChange}
          options={options ?? []}
          disabled={disabled}
        />
      ) : subject === SegmentationFilterSubjectEnum.Product ? (
        <ComboBox
          selectedValues={value as string[]}
          onValuesChange={handleOnChange}
          placeholder="Select a product..."
          suggestions={options ?? []}
          disabled={disabled}
        />
      ) : subject === SegmentationFilterSubjectEnum.Payment ? (
        <CurrencyInput
          value={typeof value === 'number' ? value : parseFloat(stringValue)}
          onChange={newValue => handleOnChange(newValue as number)}
          disabled={disabled}
        />
      ) : null}
    </div>
  );
};

export default SegmentationFilterValue;
