import React from 'react';
import { DatePicker } from '../ui/DatePicker'; // Assumed import, replace with your date picker import

const FormikDatePicker = ({ field, form, ...props }) => {
  const locale = 'en-US'; // You can change this according to your needs
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(date) => {
        // form.setFieldValue(field.name, date);
        const formattedDate = date ? date.toLocaleDateString(locale, options) : '';
        form.setFieldValue(field.name, formattedDate);

      }}
      error={form.touched[field.name] && form.errors[field.name]}
    />
  );
};

export default FormikDatePicker;
