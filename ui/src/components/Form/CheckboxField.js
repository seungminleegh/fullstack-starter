import { getIn } from 'formik'
import MuiCheckboxField from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import React from 'react'

const fieldToCheckboxField = ({
  backgroundColor,
  custom,
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { errors, isSubmitting, touched },
//  helperText,
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
//    helperText: showError ? fieldError : warning ?? helperText,
    disabled: disabled ?? isSubmitting,
    onBlur: (event) => onBlur ?? fieldOnBlur(event ?? field.name),
    ...custom,
    ...field,
    ...props,
  }
}

export const CheckboxField = ({ children, ...props }) =>
  <FormControlLabel
    control={<MuiCheckboxField {...fieldToCheckboxField(props)}> {children} </MuiCheckboxField>}
    label={props.label}
  />

export default CheckboxField

CheckboxField.displayName = 'FormikCheckboxField'
CheckboxField.tabIndex = 0
