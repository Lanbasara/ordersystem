import React from 'react';
import './index.css';
import PageTitle from '../../components/page-title/index.jsx';
class Home extends React.Component{
  render(){
    return(
        <div id="page-wrapper">
            <PageTitle title="HomePage"/>
            <div className="row">
                <div className="col-md-12">
                    body
                </div>
            </div>
      </div>
    )
  }
}


export default Home;