import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Field, Form, Formik } from 'formik'
import CheckboxField from '../Form/CheckboxField'
import SelectField from '../Form/SelectField'
import TextField from '../Form/TextField'

class InventoryCreateModal extends React.Component {
  render() {
    const {
      formName,
      handleDialog,
      handleProduct,
      title,
      initialValues,
    } = this.props
    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
        fullWidth={true}
        onClose={() => { handleDialog(false) }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            handleProduct(values)
            handleDialog(true)
          }}>
          {helpers =>
            <Form
              noValidate
              autoComplete='off'
              id={formName}
            >
              <DialogTitle id='alert-dialog-title'>
                {`${title} Inventory`}
              </DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, type: "text", required: true, }}
                      name='name'
                      label='Name'
                      component={TextField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, required: true, }}
                      name='productType'
                      label='Product Type'
                      component={SelectField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, type: "text", defaultValue: "", }}
                      name='description'
                      label='Description'
                      component={TextField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, type: "number" , defaultValue: 0, }}
                      name='averagePrice'
                      label='Average Price'
                      component={TextField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, type: "number" , defaultValue: 0, }}
                      name='amount'
                      label='Amount'
                      component={TextField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, required: true, }}
                      name='unitOfMeasurement'
                      label='Unit of Measurement'
                      component={SelectField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, type: "date", }}
                      name='bestBeforeDate'
                      label='Best Before Date'
                      component={TextField}
                    />
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, checked: false, label: "Never Expires" }}
                      name='neverExpires'
                      label='Never Expires'
                      component={CheckboxField}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { handleDialog(false) }} color='secondary'>Cancel</Button>
                <Button
                  disableElevation
                  variant='contained'
                  type='submit'
                  form={formName}
                  color='secondary'
                  disabled={!helpers.dirty}>
                  Save
                </Button>
              </DialogActions>
            </Form>
          }
        </Formik>
      </Dialog>
    )
  }
}

export default InventoryCreateModal
