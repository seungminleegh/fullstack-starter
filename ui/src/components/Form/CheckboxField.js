import { getIn } from 'formik'
//Fix the import to the material-ui checkbox
import MuiTextField from '@material-ui/core/TextField'
import React from 'react'

const fieldToCheckboxField = ({
  backgroundColor,
  custom,
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { errors, isSubmitting, touched },
  helperText,
  onBlur,
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
    helperText: showError ? fieldError : warning ?? helperText,
    disabled: disabled ?? isSubmitting,
    onBlur: (event) => onBlur ?? fieldOnBlur(event ?? field.name),
    ...custom,
    ...field,
    ...props,
  }
}

//TODO change the MuiTextField to the correct mui checkbox import
export const CheckboxField = ({ children, ...props }) =>
  <MuiTextField {...fieldToCheckboxField(props)}>
    {children}
  </MuiTextField>


export default CheckboxField

CheckboxField.displayName = 'FormikCheckboxField'
CheckboxField.tabIndex = 0
