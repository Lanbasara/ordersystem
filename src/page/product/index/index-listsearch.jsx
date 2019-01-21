import React from 'react';

class ListSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchType : 'productId',
      searchKeyword : ''
    }
  }
  onSearchChange(e){
    let name = e.target.name,
        value = e.target.value.trim();
    this.setState({
      [name] : value
    });

  }
  onSearch(){
    this.props.onSearchOutside(this.state.searchType,this.state.searchKeyword);
  }
  onSearchKeywordKeyup(e){
    if(e.keyCode==13){
      this.onSearch();
    }
    
  }
  render(){
    return(
          <div className='row search-wrap'>
          <div className='col-md-12'>
          <div className="form-inline">
          <div className="form-group">
          <select onChange={(e)=>{this.onSearchChange(e)}} name='searchType' className='form-control'>
          <option value='productId'>Search as product Id</option>
          <option value='productName'>Search as product name</option>
          </select>
          </div>
          <div className="form-group">
          <input onKeyUp={(e)=>this.onSearchKeywordKeyup(e)}
           onChange={(e)=>{this.onSearchChange(e)}} name='searchKeyword' type="text" className="form-control" id="exampleInputPassword3" placeholder="Key word"/>
          </div>
          <button onClick = {(e) => {this.onSearch()}}
          className="btn btn-primary">Search</button>
          </div>
          </div>
          </div>
    )
  }
}

export default ListSearch;