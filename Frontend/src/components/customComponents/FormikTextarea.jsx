import React from 'react';
import { Textarea } from '../ui/textarea'; 

const FormikTextArea = ({ field, form, ...props }) => {
  return (
    <Textarea
      {...field}
      {...props}
      onChange={(e) => {
        form.setFieldValue(field.name, e.target.value);
      }}
      error={form.touched[field.name] && form.errors[field.name]}
    />
  );
};

export default FormikTextArea;
