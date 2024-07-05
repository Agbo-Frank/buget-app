import { useEffect } from "react";
import { useRequest } from "../hooks/use-request"
import api from "../utilities/api"
import { useStore } from "../hooks/use-store";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export function Header(){
  const { set, token, profile, setToken } = useStore()
  const { makeRequest} = useRequest(api.profile)
  const navigate = useNavigate()

  function logout(){
    setToken(null)
    toast("Logout successful", { type: "success" })
    navigate("/login")
  }

  useEffect(() => {
    if(token) {
      makeRequest({}, "get")
        .then(({ data, status }) => {
          if(data && status === "success") {
            set("profile", data);
          }
        })
        .catch(console.log);
    }
    else navigate("/login")
  }, [ ])
  return(
    <header id="page-topbar">
      <div className="navbar-header">

        <div className="d-flex align-items-left">
          <button 
            type="button" 
            className="btn btn-sm mr-2 d-lg-none px-3 font-size-16 header-item waves-effect" 
            id="vertical-menu-btn"
            onClick={() => document.body.classList.toggle("enable-vertical-menu")}
          >
            <i className="fa fa-fw fa-bars"></i>
          </button>
        </div>

        <div className="d-flex align-items-center">
          <div className="dropdown d-inline-block ml-2">
            <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {/* <img className="rounded-circle header-profile-user" src="assets/images/users/avatar-3.jpg" alt="Header Avatar" /> */}
              <span className="d-none d-sm-inline-block ml-1 text-capitalize">{ profile?.username || "" }</span>
              <i className="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              {/* <Link 
                className="dropdown-item d-flex align-items-center justify-content-between"
                to="/settings"
              >
                Settings
              </Link> */}
              <a 
                className="dropdown-item d-flex align-items-center justify-content-between"
                onClick={logout}
              >
                <span>Log Out</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}