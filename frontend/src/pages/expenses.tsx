import { DashboardLayout, Modal, Selectinput, Textinput } from "../component";
import { Button } from "../component/button";
import * as yup from "yup"
import { useRequest } from "../hooks/use-request";
import { useFormik } from "formik";
import api from "../utilities/api";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs"
import numeral from "numeral"
import { useStore } from "../hooks/use-store";
import { isEmpty } from "../utilities/helpers";

export function Expenses(){
  const { expenses, set } = useStore()
  const { makeRequest } = useRequest(api.entries)
  const [selected, setSelected] = useState()

  const onSearch = useCallback((search) => {
    let timer
    clearTimeout(timer);
    timer = setTimeout(() => makeRequest({ category: "expense" }, "get"), 1800);
  }, []);

  useEffect(() => {
    if(isEmpty(expenses)){
      makeRequest({ category: "expense" }, "get")
        .then(data => set("expenses", data.data))
        .catch(console.log)
    }
  }, [])
  return(
    <DashboardLayout 
      title="Expenses" 
      right={<Button title="Add Expenses" data-toggle="modal" data-target="#add-expense" />}
    >
      <AddExpense />
      <RemoveExpense item={selected} />
      <ViewExpense item={selected} />
      <div className="row">
        <div className="col-12">
            <div className="card">
              <div className="card-body">

                <div>
                  <div className="d-flex gap-2 mb-4 col-4 align-items-center">
                    <span>Search:</span>
                    <input 
                      type="search"
                      onChange={e =>  onSearch(e.target.value)}
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
                    expenses?.map((p, i) => (
                      <tr key={i}>
                        <td className="text-capitalize">{ p.description }</td>
                        <td>₦{ numeral(p.amount).format("0,0.00") }</td>
                        <td>{ dayjs(p.date).format("DD MMM YYYY HH:mm") }</td>
                        <td className="">
                          <i 
                            className="feather-edit mr-2"
                            onClick={() => setSelected(p) }
                            data-toggle="modal" 
                            data-target="#expense-item"
                          ></i>
                          <i 
                            className="feather-trash" 
                            data-toggle="modal" 
                            onClick={() => setSelected(p) } 
                            data-target={`#remove-expense`}
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
  category: "expense"
}

function ViewExpense({ item }: any ){
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
      title={`Expense: `}
      id="expense-item"
      footer={
        <>
          <Button title="Close" variant="outlined" data-dismiss="modal" />
          <Button onClick={formik.handleSubmit} loading={loading} title="Update Expense" />
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

function RemoveExpense({ item }: any ){
  const { expenses, set } = useStore()
  const { makeRequest, loading } = useRequest(`${api.entries}/${item?.id}`)

  async function handleRemoveExpense(){
    const result = await makeRequest({}, "delete")
    if(result?.status === "success"){
      set("expenses", expenses.filter(i => i.id !== item?.id))
    }
  }
  return(
    <Modal 
      title="Remove Expense" 
      id="remove-expense"
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
      <span>Are you sure you want to delete this Expense?</span>
    </Modal>
  )
}

function AddExpense(){
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
        set("expenses", data.data)
      }
    }
  })
  return(
    <Modal 
      title="Add Expense" 
      id="add-expense"
      footer={
        <>
          <Button title="Close" variant="outlined" data-dismiss="modal" />
          <Button loading={loading} onClick={formik.handleSubmit} title="Add Penalties" />
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