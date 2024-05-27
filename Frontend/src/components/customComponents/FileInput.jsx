import React from 'react';
import { Input } from '../ui/input'; // Assumed import, replace with your actual FileInput import

const FormikFilePicker = ({ className,field, form, ...props }) => {
     const { value, onChange, ...fieldProps } = field;
  return (
    <Input
      className={className}
      {...fieldProps} // Pass field props except value and onChange
      {...props}
      type="file"
      onChange={(event) => {
        const files = event.target.files;
        form.setFieldValue(field.name, files[0]); // Set the single file, or adjust for multiple files if needed
        // Optionally call the original Formik onChange if it's needed
        if (onChange) {
          onChange(event);
        }
      }}
      error={form.touched[field.name] && form.errors[field.name]}
    />
  );
};

export default FormikFilePicker;
