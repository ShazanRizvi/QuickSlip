import React, {useState} from 'react';
import { DatePicker } from '../ui/DatePicker'; // Assumed import, replace with your date picker import


const FormikDatePicker = ({ field, form, ...props }) => {
  const locale = 'en-US'; // You can change this according to your needs
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleDateChange = (date) => {
    form.setFieldValue(field.name, date);
    setIsOpen(false); // Close the picker after selection
  };
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onSelect={handleDateChange}
      error={form.touched[field.name] && form.errors[field.name]}
    />
  );
};

export default FormikDatePicker;
