import { DashboardLayout, Modal, Selectinput, Textinput } from "../component";
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
  const { incomes, set } = useStore()
  const { makeRequest } = useRequest(api.entries)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState()

  useEffect(() => {
    if(incomes.length === 0){
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
      <RemoveIncome item={selected} />
      <ViewIncome item={selected} />
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
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th><i className="fas fa-ellipsis-h" ></i></th>
                  </tr>
                </thead>
              
                <tbody>
                  {
                    incomes?.map((p, i) => (
                      <tr key={i}>
                        <td className="text-capitalize">{ p.description }</td>
                        <td>₦{ numeral(p.amount).format("0,0.00") }</td>
                        <td>{ dayjs(p.date).format("DD MMM YYYY HH:mm") }</td>
                        <td className="">
                          <i 
                            className="feather-edit mr-2"
                            onClick={() => setSelected(p) }
                            data-toggle="modal" 
                            data-target="#income-item"
                          ></i>
                          <i 
                            className="feather-trash" 
                            data-toggle="modal" 
                            onClick={() => setSelected(p) } 
                            data-target="#remove-income"
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

const initialValues = { 
  amount: "", 
  description: "",
  date: "",
  category: "income"
}

function ViewIncome({ item }: any ){
  const { makeRequest, loading } = useRequest(`${api.entries}/${item?.id}`)

  const formik = useFormik({
    initialValues,
    async onSubmit(values, heplers){
      const data = await makeRequest(values, "put")
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
      title="Income" 
      id="income-item"
      footer={
        <>
          <Button title="Close" variant="outlined" data-dismiss="modal" />
          <Button onClick={formik.handleSubmit} loading={loading} title="Update Income" />
        </>
      }
    >
      <div className="needs-validation">
      <Textinput formik={formik} label="Description" name="description"  />
        <Textinput formik={formik} label="Amount" name="amount" />
        <Selectinput id="category" formik={formik} label="Change category" name="category" data={['expense', 'income'].map(i => ({label: i, value: i}))} />
      </div>
    </Modal>
  )
}

function RemoveIncome({ item }: any ){
  const { incomes, set } = useStore()
  const { makeRequest, loading } = useRequest(`${api.entries}/${item?.id}`)

  async function handleRemoveExpense(){
    const result = await makeRequest({}, "delete")
    if(result?.status === "success"){
      set("incomes", incomes.filter(i => i.id !== item?.id))
    }
  }
  return(
    <Modal 
      title="Remove Income" 
      id="remove-income"
      footer={
        <>
          <Button title="Cancel" variant="outlined" data-dismiss="modal" />
          <Button 
            loading={loading} 
            onClick={handleRemoveExpense} 
            title="Confirm" 
          />
        </>
      }
    >
      <span>Are you sure you want to delete this Income?</span>
    </Modal>
  )
}

function AddIncome(){
  const { set } = useStore()
  const { makeRequest, loading } = useRequest(api.entries)

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      description: yup.string().required("description is required"),
      amount: yup.number().required("Amount is required"),
      date: yup.date().required("Date is required"),
    }),
    async onSubmit(values, heplers){
      const data = await makeRequest(values)
      if(data.status === "success") {
        heplers.resetForm()
        set("incomes", data.data)
      }
    }
  })
  return(
    <Modal 
      title="Add Income" 
      id="add-income"
      footer={
        <>
          <Button title="Close" variant="outlined" data-dismiss="modal" />
          <Button loading={loading} onClick={formik.handleSubmit} title="Add Income" />
        </>
      }
    >
      <form className="needs-validation">
        <Textinput formik={formik} label="Enter Description" name="description" />
        <Textinput formik={formik} label="Enter Amount" name="amount" />
        <Textinput formik={formik} label="Enter date" name="date" type="date" />
      </form>
    </Modal>
  )
}