import React, {useState} from 'react';
import './CurrencyInput.scss';

interface CurrencyInputProps {
  value: number;
  label?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  label,
  disabled = false,
}) => {
  const [localValue, setLocalValue] = useState(value.toString());
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const originalValue = event.target.value;
    const processedValue =
      originalValue === '' ? 0 : parseFloat(event.target.value);

    setLocalValue(event.target.value);

    if (isNaN(processedValue)) {
      setIsValid(false);
    } else {
      setIsValid(true);
      onChange(processedValue);
    }
  };

  const handleBlur = () => {
    const parsedValue = parseFloat(localValue);
    if (isNaN(parsedValue)) {
      setLocalValue(value.toString());
    } else {
      setLocalValue(parsedValue.toString());
      onChange(parsedValue);
    }
  };

  return (
    <div className="currency-input-container" aria-label={label}>
      <input
        type="text"
        value={localValue}
        inputMode="decimal"
        maxLength={10}
        placeholder="0"
        autoComplete="off"
        disabled={disabled}
        aria-invalid={!isValid}
        aria-label="Currency amount input"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span className="currency-label">$</span>
    </div>
  );
};

export default CurrencyInput;
