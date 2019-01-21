import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from '../../components/page-title/index.jsx';

class Error extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
  render(){
    return(
       <div id='page-wrapper'>
       <PageTitle title="OPPS!"/>
       <div className="row">
       <div className="col-md-12">
       <span>Cann't find this URl</span>
       <Link to="/">   Click me return</Link>
         </div>
         </div>
       </div>
    )
  }
}


export default Error;