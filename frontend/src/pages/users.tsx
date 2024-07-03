import { useFormik } from "formik";
import { DashboardLayout, Modal, Selectinput, Textinput } from "../component";
import { Button } from "../component/button";
import api from "../utilities/api";
import { useRequest } from "../hooks/use-request";
import * as yup from "yup"
import { useCallback, useEffect, useState } from "react";
import { useStore } from "../hooks/use-store";
import numeral from "numeral";
import dayjs from "dayjs";
import ReactPaginate from "react-paginate";

export function Users(){
  const { users, set } = useStore()
  const [selected, setSelected] = useState()
  const { makeRequest, data, loading } = useRequest(api.users)
  
  const onSearch = useCallback((search) => {
    let timer
    clearTimeout(timer);
    timer = setTimeout(() => makeRequest({ search }, "get"), 1800);
  }, []);

  useEffect(() => {
    makeRequest({}, "get")
      .then(data => set("users", data.data))
      .catch(console.log)
  }, [])
  return(
    <DashboardLayout title="Users">
      <RemoveUser item={selected} />
      <User item={selected} />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div>
                <div className="d-flex gap-2 mb-4 col-4 align-items-center">
                  <span>Search:</span>
                  <input 
                    type="search" 
                    className="form-control form-control-sm ml-2" 
                    placeholder="Search..." 
                    onChange={e =>  onSearch(e.target.value)} 
                  />
                  { loading && <div> <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div> </div> }
                </div>
              </div>

              <table className="table table-striped dt-responsive nowrap">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th><i className="fas fa-ellipsis-h" ></i></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users?.map(d => (
                      <tr>
                        <td>{ d?.username }</td>
                        <td>{ d?.email }</td>
                        <td>{ d?.role }</td>
                        <td className="text-capitalize">{ d?.status }</td>
                        <td>{ dayjs(d?.createdAt).format("DD MMM YYYY hh:mm A") }</td>
                        <td className="">
                          <i 
                            className="feather-edit mr-2 fs-6"
                            onClick={() => setSelected(d) }
                            data-toggle="modal" 
                            data-target="#view-user"
                          ></i>
                          <i 
                            className="feather-trash" 
                            data-toggle="modal" 
                            onClick={() => setSelected(d) } 
                            data-target="#remove-user"
                          ></i>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {/* <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={page => setPage(page.selected)}
                pageRangeDisplayed={5}
                pageCount={data?.data?.totalPages || 1}
                className="paging"
                activeClassName="paging-item active"
                pageClassName="paging-item"
                previousClassName="feather-chevron-left"
                nextClassName="feather-chevron-right"
                previousLabel=""
                //@ts-ignore
                nextLabel=""
                renderOnZeroPageCount={null}
              /> */}
            </div> 
          </div> 
        </div>
      </div>
    </DashboardLayout>
  )
}

function RemoveUser({ item }: any ){
  const { makeRequest, loading } = useRequest(`${api.users}/${item?.id}`)

  async function handlePenaltyRemoval(){
    await makeRequest({}, "delete")
  }
  return(
    <Modal 
      title="Delete Entry" 
      id={`entry-removal`}
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
      <span>Are you sure you want to delete this Entry?</span>
    </Modal>
  )
}

function User({ item }: any ){
  const { makeRequest, loading } = useRequest(`${api.users}/${item?.id}`)

  const formik = useFormik({
    initialValues: item,
    async onSubmit(values, heplers){
      const data = await makeRequest(values, "put")
      console.log(data)
    }
  })

  useEffect(() => {
    formik.setValues(item)
  }, [item])
  return(
    <Modal 
      title="Update user" 
      id="view-user"
      footer={
        <>
          <Button title="close" data-dismiss="modal" variant="outlined" />
          <Button loading={loading} onClick={formik.handleSubmit} title="Update user" />
        </>
      }
    >
      <div className="needs-validation">
        <Textinput formik={formik} label="Email" name="email" />
        <Textinput formik={formik} label="Username" name="username" />
        <Selectinput 
          label="Change role" 
          id="role" name="role" 
          formik={formik}
          data={['user', 'admin'].map(i => ({label: i, value: i}))}
        />
        <Selectinput 
          label="Select status" 
          id="status" name="status" 
          formik={formik}
          data={['pending', 'active'].map(i => ({label: i, value: i}))}
        />
      </div>
    </Modal>
  )
}