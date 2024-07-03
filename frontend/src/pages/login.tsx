import { useRequest } from "../hooks/use-request"
import { useFormik } from "formik"
import { Textinput } from "../component"
import * as yup from "yup"
import { Button } from "../component/button"
import { Link, useNavigate } from "react-router-dom"
import api from "../utilities/api"

const initialValues = {
  email: "",
  password: ""
}

export function Login(){
  const { makeRequest, loading, data } = useRequest(api.login)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required")
    }),
    async onSubmit(value, helpers){
      const data = await makeRequest(value)
      if(data?.status === "success") {
        helpers.resetForm()
        navigate("/")
      }
    }
  })
  return(
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center min-vh-100">
              <div className="w-100 d-block bg-white shadow-lg rounded my-5">
                <div className="row">
                  <div className="col-lg-5 d-none d-lg-block bg-login rounded-left"></div>
                  <div className="col-lg-7">
                    <div className="p-5">
                      <div className="text-center mb-5">
                          <a className='text-dark font-size-22 font-family-secondary' href='index.html'>
                            <i className="mdi mdi-alpha-h-circle"></i> <b>HEYQO</b>
                          </a>
                      </div>
                      <h1 className="h5 mb-1">Welcome Back!</h1>
                      <p className="text-muted mb-4">Enter your email address and password to access admin panel.</p>
                      <form onSubmit={formik.handleSubmit} className="user">
                        <Textinput type="email" name="email" style="form-control-user" placeholder="johndoe@gmail.com" label="Enter email" formik={formik} />
                        <Textinput type="password" name="password" style="form-control-user" placeholder="* * * * * *"  label="Enter password" formik={formik} />

                        <Button loading={loading} title="Log In" type="submit" style="btn-success btn-block"  />
                      </form>

                      <div className="row mt-4">
                        <div className="col-12 text-center">
                          <p className="text-muted mb-2">
                            Don't have an account? 
                            <Link className='text-primary font-weight-medium ml-1' to='/register'>Register</Link>
                          </p>
                        </div>
                      </div>
                        
                    </div>
                  </div>
                </div>
              </div> 
            </div> 
          </div> 
        </div> 
      </div>
    </div>
  )
}