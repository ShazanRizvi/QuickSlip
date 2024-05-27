import React from 'react'
import { Input } from '../ui/input'

const FormikInput = ({ field,className, form, ...props }) => {
     return (
          <Input
          className={className}
            {...field}  // ensures values, names, and event handlers are passed
            {...props}  // pass all other props to the Shadcn Input
            error={form.touched[field.name] && form.errors[field.name]}
            onChange={(e) => {
              form.setFieldValue(field.name, e.target.value);
            }}
          />
        );
      };


export default FormikInput
