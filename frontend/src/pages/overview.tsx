import { useEffect } from "react";
import { DashboardLayout, LineChart } from "../component";
import { useRequest } from "../hooks/use-request";
import api from "../utilities/api";
import classNames from "classnames";
import numeral from "numeral";

export function Overview(){
  const { makeRequest, data, loading } = useRequest(api.overview)

  useEffect(() => {
    makeRequest({}, "get")
  }, [])
  return(
   <DashboardLayout title="Dashboard">
    {
      loading ?
      <div className="d-flex flex-row row px-3 align-items-stretch">
        {
          [1,2].map(i => (
            <div key={i} className="col-xl-6">
              <div className="card">
                <div className="card-body bg-light" style={{ height: 300}}></div>
              </div>
            </div>
          ))
        }
      </div>:

      <div className="d-flex flex-row row align-items-stretch">
        <LineChart {...data?.data} />
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Entries</h4>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                  </thead>
                    <tbody>
                      {
                        data?.data?.recent_entries?.map((entry, i) => (
                          <tr key={i}>
                            <td className="text-capitalize">{ entry?.description }</td>
                            <td className="text-capitalize">{ entry?.category }</td>
                            <td>₦{ numeral(entry?.amount).format('0,0.00') }</td>
                          </tr>
                        ))
                      }
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
   </DashboardLayout>
  )
}

function OverviewCard({ label, value, color }){
  return(
    <div className="col-md-6 col-xl-3">
      <div className={classNames("card", color)}>
        <div className="card-body">
          <div className="mb-4">
            <span className="badge badge-soft-light float-right">Daily</span>
            <h5 className="card-title mb-0 text-white">{ label }</h5>
          </div>
          <div className="row d-flex align-items-center mb-4">
            <div className="col-8">
              <h2 className="d-flex align-items-center text-white mb-0">{value}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}