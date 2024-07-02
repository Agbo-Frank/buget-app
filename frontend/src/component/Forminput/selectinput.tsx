import { FormikProps } from "formik"

interface ISelectinput {
  id: string
  name: string
  label: string
  formik?: FormikProps<any>
  disabled?: boolean
  data: {label: string, value: any}[]
}
export function Selectinput({ id , formik, name, label, disabled, data }: ISelectinput){
  return(
    <div className="form-group">
      <label htmlFor={id}>{ label }</label>
      <select disabled={disabled} onChange={formik.handleChange} name={name} className="form-control" id={id}>
        <option disabled>{ label }</option>
        { data?.map((d, i) => <option key={i} value={d.value}>{ d.label }</option>) }
      </select>
      {formik?.errors[name] && (
        <small className="text-danger">{`${formik?.errors[name]}`}</small>
      )}
    </div>
  )
}