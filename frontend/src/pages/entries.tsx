import { DashboardLayout, Modal, Paginate, Selectinput, Textinput } from "../component";
import { Button } from "../component/button";
import * as yup from "yup"
import { useRequest } from "../hooks/use-request";
import { useFormik } from "formik";
import api from "../utilities/api";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs"
import numeral from "numeral"
import { useStore } from "../hooks/use-store";
import { useParams } from "react-router-dom";

const config = {
  'expense': {title: "Expenses", slug: "expense"},
  'income': {title: "Incomes", slug: "income"},
  'all': {title: "Entries", slug: "all"}
}

export function Entries(){
  const { category } = useParams()
  const { title, slug } = config[category] || config["all"]

  const [page, setPage] = useState(1)
  const { makeRequest, data, loading, setData } = useRequest(api.entries)
  const [selected, setSelected] = useState()

  const onSearch = useCallback((search) => {
    let timer
    clearTimeout(timer);
    timer = setTimeout(() => makeRequest({ search, category: "expense", page }, "get"), 1800);
  }, []);

  useEffect(() => {
    makeRequest({ category: slug === "all" ? null : slug, page }, "get")
  }, [page, category])
  return(
    <DashboardLayout 
      title={title} 
      right={<Button title={`Add ${title}`} data-toggle="modal" data-target={`#add-${slug}`} />}
    >
      <AddEntry {...{title, slug, setData}} />
      <RemoveEntry {...{title, slug, item: selected, setData}} />
      <ViewEntry {...{title, slug, item: selected, setData}} />
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
                    { loading && <div> <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div> </div> }
                  </div>
                </div>

              <table className="table table-striped dt-responsive nowrap">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th><i className="fas fa-ellipsis-h" ></i></th>
                  </tr>
                </thead>
              
                <tbody>
                  {
                    data?.data?.data?.map((p, i) => (
                      <tr key={i}>
                        <td className="text-capitalize">{ p.description }</td>
                        <td>₦{ numeral(p.amount).format("0,0.00") }</td>
                        <td className="text-capitalize">{ p.category }</td>
                        <td>{ dayjs(p.date).format("DD MMM YYYY HH:mm") }</td>
                        <td className="">
                          <i 
                            className="feather-edit mr-2"
                            onClick={() => setSelected(p) }
                            data-toggle="modal" 
                            data-target={`#${slug}-item`}
                          ></i>
                          <i 
                            className="feather-trash" 
                            data-toggle="modal" 
                            onClick={() => setSelected(p) } 
                            data-target={`#remove-${slug}`}
                          ></i>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <Paginate page={page} onChange={setPage} totalPage={data?.data?.totalPage} />
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

function ViewEntry({ item, title, slug, setData }){
  const { makeRequest, loading } = useRequest(`${api.entries}/${item?.id}`)

  const formik = useFormik({
    initialValues,
    async onSubmit(values, heplers){
      const data = await makeRequest(values, "put")
      if(data.status === "success") {
        setData(state => ({
          ...state,
          data:{
            ...state.data,
            data: state.data.data.map(i => i.id === item.id ? data.data : i)
          }
        }))
      }
    }
  })

  useEffect(() => {
    formik.setValues(item)
  }, [item])
  return(
    <Modal 
      title={title}
      id={`${slug}-item`}
      footer={
        <>
          <Button title="Close" variant="outlined" data-dismiss="modal" />
          <Button onClick={formik.handleSubmit} loading={loading} title={`Update ${title}`} />
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

function RemoveEntry({ item, title, slug, setData }: any ){
  const { makeRequest, loading } = useRequest(`${api.entries}/${item?.id}`)

  async function handleRemoveEntry(){
    const result = await makeRequest({}, "delete")
    if(result?.status === "success"){
      setData(state => ({
        ...state,
        data:{
          ...state.data,
          data: state.data.data.filter(i => i.id !== item?.id)
        }
      }))
    }
  }
  return(
    <Modal 
      title={`Remove ${title}`} 
      id={`remove-${slug}`}
      footer={
        <>
          <Button title="Cancel" variant="outlined" data-dismiss="modal" />
          <Button 
            loading={loading} 
            onClick={handleRemoveEntry} 
            title="Confirm" 
          />
        </>
      }
    >
      <span>Are you sure you want to delete this { title }?</span>
    </Modal>
  )
}

function AddEntry({ title, slug, setData }){
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
        setData(state => ({
          ...state,
          data:{
            ...state.data,
            data: [data.data, ...state.data.data]
          }
        }))
      }
    }
  })
  return(
    <Modal 
      title={`Add ${title}`} 
      id={`add-${slug}`}
      footer={
        <>
          <Button title="Close" variant="outlined" data-dismiss="modal" />
          <Button loading={loading} onClick={formik.handleSubmit} title={`Add ${title}`} />
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