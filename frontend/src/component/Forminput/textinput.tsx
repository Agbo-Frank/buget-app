import classNames from "classnames"
import { FormikProps } from "formik"
import { InputHTMLAttributes } from "react"

interface ITextinput {
  label: string
  name: string
  type?: string
  formik?: FormikProps<any>
  style?: string
}

export function Textinput({ label, name, style, formik, type = "text", ...props }: ITextinput | any){
  return(
    <div className="mb-3">
      <label htmlFor="validationCustom01">{ label }</label>
      <input type={type} className={classNames("form-control", style)} name={name} { ...formik.getFieldProps(name) } {...props} />
      {formik?.errors[name] && (
        <small className="text-danger">{`${formik?.errors[name]}`}</small>
      )}
    </div>
  )
}