import Pagination from 'rc-pagination';
import React from 'react';
import '../../../node_modules/rc-pagination/dist/rc-pagination.min.css';
class RePagination extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className = "row">
        <div className="col-md-12">
        <Pagination {...this.props}
            hideOnSinglePage
            showQuickJumper/>
        </div>
      </div>
     
    )
    
  }
}

export default RePagination;