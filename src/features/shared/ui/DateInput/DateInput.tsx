import React from 'react';
import {formatDateForDisplay} from '../../../EmailMarketing/shared/formatUtils';

interface DatePickerProps {
  value?: string;
  label?: string;
  onChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({value, onChange, label}) => {
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
      aria-label={label}
      onChange={handleChange}
    />
  );
};

export default DatePicker;
