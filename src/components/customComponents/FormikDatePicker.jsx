import React from 'react';
import { DatePicker } from '../ui/DatePicker'; // Assumed import, replace with your date picker import

const FormikDatePicker = ({ field, form, ...props }) => {
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(date) => {
        form.setFieldValue(field.name, date);
      }}
      error={form.touched[field.name] && form.errors[field.name]}
    />
  );
};

export default FormikDatePicker;
