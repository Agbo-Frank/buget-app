import { DashboardLayout, Modal, Textinput } from "../component";
import { Button } from "../component/button";
import * as yup from "yup"
import { useRequest } from "../hooks/use-request";
import { useFormik } from "formik";
import api from "../utilities/api";
import { useEffect, useState } from "react";
import dayjs from "dayjs"
import numeral from "numeral"
import { useStore } from "../hooks/use-store";

export function Incomes(){
  const { penalties, set, user } = useStore()
  const { makeRequest } = useRequest(api.entries)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState()

  useEffect(() => {
    if(penalties.length === 0){
      makeRequest({ category: "income" }, "get")
        .then(data => set("income", data.data))
        .catch(console.log)
    }
  }, [])
  return(
    <DashboardLayout 
      title="Income" 
      right={<Button title="Add income" data-toggle="modal" data-target="#add-income" />}
    >
      <AddIncome />
      <PenaltyRemoval item={selected} />
      <PenaltyItem item={selected} />
      <div className="row">
        <div className="col-12">
            <div className="card">
              <div className="card-body">

                <div>
                  <div className="d-flex gap-2 mb-4 col-4 align-items-center">
                    <span>Search:</span>
                    <input 
                      type="search"
                      onChange={e =>  setSearch(e.target.value)} 
                      className="form-control form-control-sm ml-2" 
                      placeholder="Search..." 
                    />
                  </div>
                </div>

              <table className="table table-striped dt-responsive nowrap">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Fee</th>
                    <th>Created At</th>
                    <th><i className="fas fa-ellipsis-h" ></i></th>
                  </tr>
                </thead>
              
                <tbody>
                  {
                    penalties?.filter(p =>
                      p?.name?.toLowerCase().includes(search) ||
                      String(p?.fine)?.toLowerCase().includes(search)
                    ).map((p, i) => (
                      <tr key={i}>
                        <td className="text-capitalize">{ p.name }</td>
                        <td>₦{ numeral(p.fine).format("0,0.00") }</td>
                        <td>{ dayjs(p.created_at).format("DD MMM YYYY HH:mm") }</td>
                        <td className="">
                          <i 
                            className="feather-edit mr-2"
                            onClick={() => setSelected(p) }
                            data-toggle="modal" 
                            data-target="#penalty-item"
                          ></i>
                          <i 
                            className="feather-trash" 
                            data-toggle="modal" 
                            onClick={() => setSelected(p) } 
                            data-target={`#penalty-removal`}
                          ></i>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div> 
          </div> 
        </div>
      </div>
    </DashboardLayout>
  )
}

function PenaltyItem({ item }: any ){
  const { makeRequest, loading } = useRequest(api.entries)
  const formik = useFormik({
    initialValues: { name: item?.name, fine: item?.fine},
    async onSubmit(values, heplers){
      const data = await makeRequest({...values, id: item?._id}, "put")
      if(data.status === "success") {
        heplers.resetForm()
      }
    }
  })

  useEffect(() => {
    formik.setValues(item)
  }, [item])
  return(
    <Modal 
      title="Add Penalties" 
      id={`penalty-item`}
      footer={
        <>
          <Button title="Close" variant="outlined" data-dismiss="modal" />
          <Button onClick={formik.handleSubmit} loading={loading} title="Update Penalties" />
        </>
      }
    >
      <div className="needs-validation">
        <Textinput formik={formik} label="Enter Penalty name" name="name" />
        <Textinput formik={formik} label="Enter fine/fee" name="fine" type="number" />
      </div>
    </Modal>
  )
}

function PenaltyRemoval({ item }: any ){
  const { penalties, set } = useStore()
  const { makeRequest, loading } = useRequest(`${api.entries}/${item?._id}`)

  async function handlePenaltyRemoval(){
    const result = await makeRequest({}, "delete")
    if(result?.status === "success"){
      set("penalties", penalties.filter(i => i._id !== item?._id))
    }
  }
  return(
    <Modal 
      title="Delete Penalty" 
      id={`penalty-removal`}
      footer={
        <>
          <Button title="Cancel" variant="outlined" data-dismiss="modal" />
          <Button 
            loading={loading} 
            onClick={handlePenaltyRemoval} 
            title="Confirm" 
          />
        </>
      }
    >
      <span>Are you sure you want to delete this Penalty?</span>
    </Modal>
  )
}

function AddIncome(){
  const { set } = useStore()
  const { makeRequest, loading } = useRequest(api.entries)
  const formik = useFormik({
    initialValues: {name: "", fine: 0},
    validationSchema: yup.object({
      name: yup.string().required("Penalty name is required"),
      fine: yup.number().required("Fine/fee is required")
    }),
    async onSubmit(values, heplers){
      const data = await makeRequest(values)
      if(data.status === "success") {
        heplers.resetForm()
        set("penalties", data.data)
      }
    }
  })
  return(
    <Modal 
      title="Add Penalties" 
      id="add-income"
      footer={
        <>
          <Button title="Close" variant="outlined" data-dismiss="modal" />
          <Button loading={loading} onClick={formik.handleSubmit} title="Add Penalties" />
        </>
      }
    >
      <form className="needs-validation">
        <Textinput formik={formik} label="Enter Penalty name" name="name" />
        <Textinput formik={formik} label="Enter fine/fee" name="fine" type="number" />
      </form>
    </Modal>
  )
}