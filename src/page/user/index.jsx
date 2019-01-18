import React from 'react';
import {Link} from 'react-router-dom';
import User from '../../server/userserver.jsx';
const _user = new User();
import Mutil from '../../util/mm.jsx';
const _mm = new Mutil();
import PageTitle from '../../components/page-title/index.jsx';
import Pagination from '../../util/pagination/index.jsx';
class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state={
          list : [],
          pageNum : 1,
          firstLoading : true
        };
    }
    componentDidMount(){
      this.LoadUserList();
    }
    LoadUserList(){
      _user.getUserList(this.state.pageNum).then(res=>{
        this.setState(res,()=>{
          this.setState({
            firstLoading : false
          })
        })

      },errMsg=>{
        this.setState({
          list : []
        })
        _mm.errorTips(errMsg);
      })
    }
    OnPageNumChange(pageNum){
        this.setState({
          pageNum : pageNum
        },()=>{
          this.LoadUserList();
        } );
    }
  render(){
    let UserListBody = this.state.list.map((user,index)=>{
      return (
       <tr key={index}>
       <td>{user.id}</td>
       <td>{user.username}</td>
       <td>{user.email}</td>
       <td>{user.phone}</td>
       <td>{new Date(user.createTime).toLocaleString()}</td>
     </tr>
      )
    })
    let UserListError = (
      <tr >
        <td colSpan = "5" className="text-center">{this.state.firstLoading?"Loading...":"No result"}</td>
      </tr>
    )
    let UserList =  this.state.list.length>0 ? UserListBody : UserListError
    return(
       <div id='page-wrapper'>
       <PageTitle title="User List"/>
       <div className="row">
       <div className="col-md-12">
       <table className="table table-striped table-bordered">
       <thead>
         <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>邮箱</th>
            <th>电话</th>
            <th>时间</th>
         </tr>
       </thead>
       <tbody>
     
         {
           UserList
         }
         
       </tbody>
       </table>
         </div>
         </div>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum)=>this.OnPageNumChange(pageNum)}/>
       </div>
       

    )
  }
}


export default UserList;