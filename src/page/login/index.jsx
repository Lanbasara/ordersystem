import React from 'react';
import './index.scss';
import Mutil from '../../util/mm.jsx';
import User from '../../server/userserver.jsx';
const _mm = new Mutil();
const _user = new User();
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username : '',
      password : '',
      redirect : _mm.getUrlParam('redirect') || '/'
    }
  }
  componentWillMount(){
    document.title = 'Login -SEU Order'
  }
  OninputChange(e){
    let inputname = e.target.name;
    let inputvalue = e.target.value;
    this.setState({
      [inputname] : inputvalue
    });
  }
  Onsubmit(){
    let loginInfo = {
      username : this.state.username,
      password : this.state.password
    },
      checkLoginInfo = _user.checkLoginInfo(loginInfo);
      if(checkLoginInfo.status){
        _user.login(loginInfo).then((res)=>{
          _mm.setStorage('userInfo',res);
          this.props.history.push(this.state.redirect);
        },(errMsg)=>{
          _mm.errorTips(errMsg);
    
        })
      }
      else{
        _mm.errorTips(checkLoginInfo.msg);
      }
  
    }
    OninputKeyup(e){
      if(e.keyCode === 13){
        this.Onsubmit();
      }
    }
  
  render(){
    return(

      <div className="col-md-4 col-md-offset-4">
      <div className="panel panel-default login-panel">
        <div className="panel-heading">欢迎登陆 SEU Order</div>
        <div className="panel-body">
              <div>
              <div className="form-group">
              <label htmlFor="exampleInputEmail1">用户名</label>
              <input  type="text" 
                      className="form-control" 
                      id="exampleInputEmail1" 
                      placeholder="Username"
                      onKeyUp = {e => {
                        this.OninputKeyup(e)
                      }}
                      onChange={(e)=>this.OninputChange(e)}
                      name = "username"/>
              </div>
              <div className="form-group">
              <label htmlFor="exampleInputPassword1">密码</label>
              <input   onKeyUp = {e => {
                        this.OninputKeyup(e)
                      }}
                      name = "password" onChange={(e)=>this.OninputChange(e)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>
              <button  
                className="btn btn-lg btn-primary btn-block"
                onClick = {e=>{this.Onsubmit(e)}}>Submit</button>
              </div>
        </div>
        </div>
      </div>

       
    )
  }
}

export default Login;