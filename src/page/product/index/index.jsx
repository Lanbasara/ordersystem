import React from 'react';
import {Link} from 'react-router-dom';
import Product from '../../../server/productserver.jsx';
const _product = new Product();
import Mutil from '../../../util/mm.jsx';
const _mm = new Mutil();
import PageTitle from '../../../components/page-title/index.jsx';
import TableList from '../../../util/tableList/index.jsx';
import Pagination from '../../../util/pagination/index.jsx';
import './index.scss';
import ListSearch from './index-listsearch.jsx';
import '../../../components/layout/theme.css';
import '../../../components/layout/index.scss';
class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state={
          list : [],
          pageNum : 1,
          listType : 'list'
         
        };
    }
    componentDidMount(){
      this.loadProductList();
    }
    loadProductList(){
      let listParam = {};
      listParam.listType = this.state.listType;
      listParam.pageNum = this.state.pageNum;
      if(this.state.listType ==='search'){
        listParam.searchType = this.state.searchType;
        listParam.keyword = this.state.searchKeyword;
      }
      _product.getProductList(listParam).then(res=>{
        this.setState(res);

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
          this.loadProductList();
        } );
    }
    onSearch(searchType,searchKeyword){
      let listType = searchKeyword ===''? 'list' : 'search';
      this.setState({
        listType : listType,
        pageNum : 1,
        searchType : searchType,
        searchKeyword : searchKeyword
      },()=>{
        this.loadProductList();
      })
       

    }
    OnSetProductStatus(e,productid,currentProductStatus){
      let newStatus = currentProductStatus==1? 2:1;
      let operationtips = currentProductStatus==1? 'Off sell?' : 'On sell?'
      if(window.confirm(operationtips)){
        _product.SetProductStatus({
          productId : productid,
          status : newStatus
        }).then(res =>{
          _mm.successTips(res);
          this.loadProductList();
        },errMsg=>{
          _mm.errorTips(errMsg)
        });
      }
    }
  render(){
    let tableHeads = [
      {name : 'ID',width : '10%'},
      {name : 'Item',width : '50%'},
      {name : 'price',width : '10%'},
      {name : 'status',width : '15%'},
      {name : 'operation',width : '15%'},
    ];
  
    return(
      
      <div id='page-wrapper'>
      <PageTitle title="Product List">
        <div className="page-header-right">
          <Link to='/product/save' className='btn btn-primary'>
          <i className='fa fa-plus'></i>
          <span>
          Add Item
          </span>
          </Link>
        </div>
      </PageTitle>
     <ListSearch onSearchOutside = {(searchType,searchKeyword)=>{this.onSearch(searchType,searchKeyword)}}/>
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((product,index)=>{
              return (
               <tr key={index}>
               <td>{product.id}</td>
               <td>
                    <p>
                      {product.name}
                    </p>
                    <p>
                      {product.subtitle}
                    </p>
                </td>
               <td>${product.price}</td>
               <td>
                    <p>
                        {product.status ==1? 'On sell' : 'Off sell'}
                      </p>
                      <button className="btn btn-warning btn-xs" onClick={(e)=>{this.OnSetProductStatus(e,product.id,product.status)}}>{product.status ==1? 'Off sell' : 'On sell'}</button>
               </td>
               <td>
                 <Link className='opear' to = {`/product/detail/${product.id}`}>Detail    </Link>
                 <Link className='opear' to = {`/product/save/${product.id}`}>Operate</Link>
               </td>
             </tr>
              )
            })
          }
        </TableList>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum)=>this.OnPageNumChange(pageNum)}/>
      </div>
    )
  }
}


export default ProductList;