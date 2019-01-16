import React from 'react';
import { Link, NavLink } from 'react-router-dom';
class NavSide extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="navbar-default navbar-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav" id="main-menu">

                    <li>
                        <NavLink exact activeClassName="active-menu" to="/"><i className="fa fa-dashboard"></i>HomePage</NavLink>
                    </li>
                
   

                    <li className = "">
                        <Link to="/product"><i className="fa fa-sitemap"></i>Items<span className="fa arrow"></span></Link>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink to="/product" activeClassName="active-menu">Item management</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/product-category" activeClassName="active-menu">Category management </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="">
                        <Link to="/order"><i className="fa fa-sitemap"></i>Orders<span className="fa arrow"></span></Link>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink to="/order" activeClassName="active-menu">Order management</NavLink>
                            </li>
                    
                        </ul>
                    </li>
                    <li className="">
                        <Link to="/user"><i className="fa fa-sitemap"></i>Users<span className="fa arrow"></span></Link>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink to="/user" activeClassName="active-menu">Users management</NavLink>
                            </li>
                        </ul>
                    </li>

                </ul>

            </div>

        </div>
      
    )
  }
}

export default NavSide;