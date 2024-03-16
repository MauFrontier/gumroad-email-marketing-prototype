import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

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

  const safeValue = value
    ? value.split('T')[0]
    : new Date().toISOString().split('T')[0];

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
