import React, {useState} from 'react';
import './CurrencyInput.scss';

interface CurrencyInputProps {
  value: number;
  label?: string;
  onChange: (value: number) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  label,
}) => {
  const [localValue, setInputValue] = useState(value.toString());
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const originalValue = event.target.value;
    const processedValue =
      originalValue === '' ? 0 : parseFloat(event.target.value);

    setInputValue(event.target.value);
    if (isNaN(processedValue)) {
      setIsValid(false);
    } else {
      setIsValid(true);
      onChange(processedValue);
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
        aria-invalid={!isValid}
        aria-label="Currency amount input"
        onChange={handleChange}
      />
      <span className="currency-label">$</span>
    </div>
  );
};

export default CurrencyInput;
