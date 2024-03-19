import Select from '../../../../../../../shared/ui/Select/Select';
import {Operand as OperandEnum} from '../../../../../emailMarketingTypes';
import './Operand.scss';

interface Props {
  value?: OperandEnum;
  onChange: (operand: OperandEnum) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Operand = ({value, onChange, disabled, label, className}: Props) => {
  const handleOperandChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue as OperandEnum);
    }
  };

  const operandOptions = [
    {key: OperandEnum.Initial, value: OperandEnum.Initial},
    {key: OperandEnum.And, value: OperandEnum.And},
    {key: OperandEnum.Or, value: OperandEnum.Or},
  ];

  return (
    <div aria-label={label || 'Operand'} className={`${className || ''}`}>
      {value && value !== OperandEnum.Initial ? (
        <Select
          value={value}
          options={operandOptions}
          disabled={disabled}
          onChange={handleOperandChange}
        />
      ) : (
        <div>
          <p>Where:</p>
        </div>
      )}
    </div>
  );
};

export default Operand;
