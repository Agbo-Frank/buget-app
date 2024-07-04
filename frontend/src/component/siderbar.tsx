import classnames from "classnames";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../hooks/use-store";

export function SiderBar(){
  const { profile } = useStore()
  return(
    <div className="vertical-menu">

        <div data-simplebar className="h-100">

            <div className="navbar-brand-box">
                <a className='logo' href='index.html'>
                  <i className="mdi mdi-alpha-b-circle"></i>
                  <span> Budgeti </span>
                </a>
            </div>
            <div id="sidebar-menu">
              <ul className="metismenu list-unstyled" id="side-menu">
                <li className="menu-title">Menu</li>

                <li>
                  <Link to="/" className='waves-effect'>
                    <i className="feather-airplay"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>
                {
                  profile?.role === "admin" &&
                  <li>
                    <Link to="/users" className='waves-effect'>
                      <i className="feather-users"></i>
                      <span>Users</span>
                    </Link>
                  </li>
                }
                <Dropdown 
                  title="Entries" 
                  link="/entries/all"
                  icon={<i className="feather-inbox"></i>}
                  items={[
                    {title: "Incomes", value: "/entries/income"},
                    {title: "Expenses", value: "/entries/expense"}
                  ]} 
                />
              </ul>
            </div>
        </div>
    </div>
  )
}

interface IDropdown {
  title: string
  icon: JSX.Element
  link?: string
  items: {title: string, value: string}[]
}

function Dropdown({ title, icon, link, items }: IDropdown){
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()
  return(
    <li className={classnames({"mm-active": toggle})}>
      <a className="d-flex waves-effect justify-content-between align-items-center">
        <span>
          <span> { icon } </span>
          <span onClick={() => navigate(link)}>{ title }</span>
        </span>
        <i 
          onClick={() => setToggle(p => !p)} 
          className={toggle ?"dripicons-chevron-up": "dripicons-chevron-down"}
          ></i>
      </a>
      {
        toggle &&
        <ul className={classnames("", {"sub-menu mm-collapse mm-show": toggle})} aria-expanded={toggle ? "true" : "false"}>
          { items.map((l, i) => <li key={i}><Link to={l.value}>{l.title}</Link></li>) }
        </ul>
      }
    </li>
  )
}