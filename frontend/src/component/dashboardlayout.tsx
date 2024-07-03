import { PropsWithChildren } from "react";
import { Header } from "./header";
import { SiderBar } from "./siderbar";

interface IDashboardLayout extends PropsWithChildren {
  title: string
  right?: JSX.Element
}

export function DashboardLayout({ children, title, right }: IDashboardLayout){
  return(
    <div id="layout-wrapper">
    <Header />
    <SiderBar />
    
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
        <div className="row">
          <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">{ title }</h4>

                { right }
                {/* <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="javascript: void(0);">Pages</a></li>
                        <li className="breadcrumb-item active">Datatables</li>
                    </ol>
                </div> */}
              </div>
          </div>
        </div> 
          {children}
        </div>
      </div>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
                2024 © Budgeti.
            </div>
            <div className="col-sm-6">
                <div className="text-sm-right d-none d-sm-block">
                  {/* Design & Develop by */}
                </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  )
}