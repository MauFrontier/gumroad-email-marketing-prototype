import {ChangeEvent} from 'react';
import './NumberInputWithLabel.scss';

type Props = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  allowNegative?: boolean;
  disabled?: boolean;
};

const NumberInputWithLabel = ({
  value,
  onChange,
  label,
  allowNegative = false,
  disabled = false,
}: Props) => {
  const updateIfValid = (newValue: number) => {
    if (isNaN(newValue)) {
      return;
    }
    if (!allowNegative && newValue < 0) {
      return;
    }

    onChange(newValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    updateIfValid(newValue);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    updateIfValid(newValue);
  };

  return (
    <div className="number-input-with-label">
      <input
        type="number"
        value={value}
        placeholder="0"
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-labelledby="input-label"
      />
      <label id="input-label" className="input-label">
        {label}
      </label>
    </div>
  );
};

export default NumberInputWithLabel;
