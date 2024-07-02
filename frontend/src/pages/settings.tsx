import { useFormik } from "formik";
import { DashboardLayout, Textinput } from "../component";
import { useRequest } from "../hooks/use-request";
import { useStore } from "../hooks/use-store";
import api from "../utilities/api";
import { Button } from "../component/button";
import { compareStrings, isEmpty } from "../utilities/helpers";
import * as yup from "yup"
import { useEffect } from "react";

export function Settings(){
  const { user, token, set } = useStore()
  const { makeRequest, loading } = useRequest(api.profile)
  const { makeRequest: changePassword, loading: updating } = useRequest(api.login)

  const formik = useFormik({
    initialValues: user,
    async onSubmit(values) {
      const { status, data } = await makeRequest(values, "put")
      if(compareStrings(status, "success")){
        set("user", data)
      }
    },
  })

  const changePasswordFormik = useFormik({
    initialValues:{
      new_password: "",
      old_password: ""
    },
    validationSchema: yup.object({
      new_password: yup.string().required("New password is required").min(6),
      old_password: yup.string().required("Old password is required").min(6),
    }),
    async onSubmit(values) {
      const { status, data } = await changePassword(values)
      if(compareStrings(status, "success")){
        set("user", data)
      }
    },
  })

  useEffect(() => {
    if(token && isEmpty(user)) {
      makeRequest({}, "get")
        .then(({ data, status }) => {
          if(data && status === "success") {
            set("user", data);
          }
        })
        .catch(console.log);
    }
    if(user) formik.setValues(user)
  }, [])
  return(
    <DashboardLayout title="Settings">
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">

              <h4 className="card-title">Update Profile</h4>
              <p className="card-subtitle mb-4">Change your password by entring your previous password and your new password</p>

              <form onSubmit={formik.handleSubmit}>
                <Textinput formik={formik} label="First name" name="first_name" />
                <Textinput formik={formik} label="Last name" name="last_name" />
                <Textinput formik={formik} label="Email" name="email" disabled />
                <Textinput formik={formik} label="Phone number" name="phone_number" />
                <Textinput formik={formik} label="Address" name="address" />
                <Textinput formik={formik} label="Role" name="role" disabled />
  
                <Button type="submit" loading={loading} title="Update Profile" />
              </form>

            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">

              <h4 className="card-title">Change password</h4>
              <p className="card-subtitle mb-4">Change your password by entring your previous password and your new password</p>

              <form onSubmit={changePasswordFormik.handleSubmit}>
                <Textinput formik={changePasswordFormik} type="password" label="Old password" name="old_password" />
                <Textinput formik={changePasswordFormik} type="password" label="New password" name="new_password" />

                <Button type="submit" loading={updating} title="Update Password" />
              </form>

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}