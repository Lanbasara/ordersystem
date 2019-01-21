import React from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import Mutil from '../../util/mm.jsx';
const _mm = new Mutil();
import Static from '../../server/static-server.jsx';
const _static = new Static();
import PageTitle from '../../components/page-title/index.jsx';
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userCount : '-',
            productCount :'-',
            orderCount : '-'
        }
    }
    componentDidMount(){
        this.loadCount();
    }
    loadCount(){
        _static.getHomeCount().then(res=>{
            this.setState(res);
        },errMsg =>{
            _mm.errorTips(errMsg);
        });
    }
  render(){
    return(
        <div id="page-wrapper">
            <PageTitle title="主页"/>
            <div className="row">
                <div className="col-md-4">
                <Link className="color-box brown" to='/user'>
                <p className="count">{this.state.userCount}</p>
                <p className="desc">
                    <i className='fa fa-user-o'></i>
                    <span>User number</span>
                </p>  
                </Link>
                </div>
                <div className="col-md-4">
                <Link className="color-box blue" to='/product'>
                <p className="count">{this.state.productCount}</p>
                <p className="desc">
                    <i className='fa fa-list'></i>
                    <span>product number</span>
                </p>
                </Link>
                </div>
                <div className="col-md-4">
                <Link className="color-box green" to='/order'>
                <p className="count">{this.state.orderCount}</p>
                <p className="desc">
                    <i className='fa fa-check-square-o'></i>
                    <span>order number</span>
                </p>
                </Link>
                </div>
            </div>
      </div>
    )
  }
}


export default Home;