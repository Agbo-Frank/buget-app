import { useEffect } from "react";
import { DashboardLayout, LineChart } from "../component";
import { useRequest } from "../hooks/use-request";
import api from "../utilities/api";
import classNames from "classnames";

export function Overview(){
  const { makeRequest, data } = useRequest(api.overview)
  useEffect(() => {
    makeRequest({}, "get")
  }, [])
  return(
   <DashboardLayout title="Dashboard">
      <div className="row">
        <OverviewCard 
          label="Total Entries" 
          value={ data?.data?.total_entries || 0 } 
          color="bg-primary border-primary"
        />
        <OverviewCard 
          label="Pending Entries" 
          value={ data?.data?.pending_entries || 0 } 
          color="bg-success border-success"
        />
        <OverviewCard 
          label="Cleared Entries" 
          value={data?.data?.cleared_entries || 0} 
          color="bg-warning border-warning"
        />
        <OverviewCard 
          label="Daily visit" 
          value="1,156,000" 
          color="bg-info border-info"
        />
      </div>
      <LineChart />
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