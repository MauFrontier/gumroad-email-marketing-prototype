import React from 'react';
import {formatDateForDisplay} from '../../../../../utils/formats/formatUtils';

interface DatePickerProps {
  value?: string;
  label?: string;
  onChange: (date: string) => void;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };

  const safeValue = formatDateForDisplay(value || new Date().toISOString());

  return (
    <input
      type="date"
      value={safeValue}
      disabled={disabled}
      aria-label={label}
      onChange={handleChange}
    />
  );
};

export default DatePicker;
