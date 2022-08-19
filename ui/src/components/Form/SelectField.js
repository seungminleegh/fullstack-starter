import { getIn } from 'formik'
import MuiSelectField from '@material-ui/core/Select'
import React from 'react'

const fieldToSelectField = ({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { errors, isSubmitting, touched },
//  helperText,
  onBlur,
  required,
  variant,
  warning,
  ...props
}) => {
  const dirty = getIn(touched, field.name)
  const fieldError = getIn(errors, field.name)
  const showError = dirty && !!fieldError
  return {
    variant: variant,
    error: showError,
//    helperText: showError ? fieldError : warning ?? helperText,
    disabled: disabled ?? isSubmitting,
    onBlur: (event) => onBlur ?? fieldOnBlur(event ?? field.name),
    ...field,
    ...props,
  }
}

export const SelectField = ({ children, ...props }) =>
  <MuiSelectField {...fieldToSelectField(props)}>
    {children}
  </MuiSelectField>


export default SelectField

SelectField.displayName = 'FormikSelectField'
SelectField.tabIndex = 0
