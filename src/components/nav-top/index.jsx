import React from 'react';
import {Link} from 'react-router-dom'
import Mtuil from '../../util/mm.jsx';
import User from '../../server/userserver.jsx';
const _user = new User();
const _mm = new Mtuil();
class NavTop extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        username : _mm.getStorage('userInfo').username || '东大人'
    }
    }
    //推出登陆
    onLogout() {
        _user.logout().then(res => {
            _mm.removeStorage('userInfo');
            window.location.href ='/login';
        },errMsg =>{
            _mm.errorTips(errMsg);
        });
    }
  render(){
    return(
      <div className="navbar navbar-default top-navbar">
      <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>SEU</b>Order</Link>
      </div>

      <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
              <a className="dropdown-toggle"  href="/">
                        <i className="fa fa-user fa-fw"></i>
                        {
                            this.state.username? <span>Welcome,{this.state.username}</span> : <span>Welcome,SEUER</span>
                        }
                        <i className="fa fa-caret-down"></i>
              </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li><a onClick={() => {this.onLogout()}} href="#"><i className="fa fa-sign-out fa-fw"></i><span>Logout</span></a>
                  </li>
              </ul>
    
          </li>
   
      </ul>
  </div>
    )
  }
}

export default NavTop;