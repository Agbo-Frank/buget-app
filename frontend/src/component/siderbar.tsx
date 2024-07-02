import classnames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../hooks/use-store";

export function SiderBar(){
  const { user } = useStore()
  return(
    <div className="vertical-menu">

        <div data-simplebar className="h-100">

            <div className="navbar-brand-box">
                <a className='logo' href='index.html'>
                  <i className="mdi mdi-alpha-h-circle"></i>
                  <span> Heyqo </span>
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
                <li>
                  <Link to="/users" className='waves-effect'>
                    <i className="feather-airplay"></i>
                    <span>Users</span>
                  </Link>
                </li>
                <Dropdown 
                  title="Entries" 
                  icon={<i className="dripicons-user-group"></i>}
                  items={[
                    {title: "Incomes", value: "/incomes"},
                    {title: "Expenses", value: "/expenses"}
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
  items: {title: string, value: string}[]
}

function Dropdown({ title, icon, items }: IDropdown){
  const [toggle, setToggle] = useState(false)
  return(
    <li className={classnames("", {"mm-active": toggle})}>
      <a onClick={() => setToggle(p => !p)} className="has-arrow waves-effect">
        {icon}
        <span>{ title }</span>
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