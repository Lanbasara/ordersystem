import React from 'react';
import '../index/category-select.scss'; 
import Product from '../../../server/productserver.jsx';
const _product = new Product();
import MUtil from '../../../util/mm.jsx';
const _mm = new MUtil();
class Categoryselector extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId : 0,
      secondCategoryList : [],
      secondCaregoryId : 0
    }
  }
  componentDidMount(){
    this.loadFirstCategory();
  }
  loadFirstCategory(){
    _product.getCategoryList().then(res=>{
      this.setState({
        firstCategoryList : res
      });

      },errMsg=>{
        _mm.errorTips(errMsg);
      });
  }
  OnsecondCateoryChange(e){
    if(this.props.readOnly){
      return ;
    }
    let newValue = e.target.value || 0;
    this.setState({
      secondCaregoryId : newValue,
    }, ()=>{
      this.onPropsCategoryChange();
    })
  }
  OnfirstCateoryChange(e){
    if(this.props.readOnly){
      return ;
    }
    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId : newValue,
      secondCaregoryId : 0,
      secondCategoryList : []
    }, ()=>{
      this.loadSecondcatory();
      this.onPropsCategoryChange();
    })
  }
  onPropsCategoryChange(){
     this.props.onCategoryChange(this.state.secondCaregoryId,this.state.firstCategoryId);

  }
  loadSecondcatory(){
    _product.getCategoryList(this.state.firstCategoryId).then(res=>{
      this.setState({
        secondCategoryList : res
      });
      },errMsg=>{
        _mm.errorTips(errMsg);
      });
  }
  render(){
    return(
      <div className="col-md-5">
        <select 
        readOnly = {this.props.readOnly}
        onChange={(e)=>{this.OnfirstCateoryChange(e)}} className='form-control cate-select'>
          <option value="">Please choose the first level Category</option>
          {
            this.state.firstCategoryList.map((category,index)=>
              <option key = {index} value = {category.id}>{category.name}</option>
            )
          }
        </select>
        {this.state.firstCategoryList.length?
        (<select  readOnly = {this.props.readOnly}
        onChange={(e)=>{this.OnsecondCateoryChange(e)}} className='form-control cate-select'>
          (<option value="">Please choose the second level Category</option>
          {
            this.state.secondCategoryList.map((category,index)=>
              <option key = {index} value = {category.id}>{category.name}</option>
            )
          }
        </select>) : null}
        
        </div>
    )
  }
}

export default Categoryselector;