import React from 'react';
import {Link} from 'react-router-dom';
import Order from '../../server/orderserver.jsx';
const _order = new Order();
import Mutil from '../../util/mm.jsx';
const _mm = new Mutil();
import PageTitle from '../../components/page-title/index.jsx';
import TableList from '../../util/tableList/index.jsx';
import Pagination from '../../util/pagination/index.jsx';
import ListSearch from './indexlistsearch.jsx';

class OrderList extends React.Component{
    constructor(props){
        super(props);
        this.state={
          list : [],
          pageNum : 1,
          listType : 'list'
         
        };
    }
    componentDidMount(){
      this.loadOrderList();
    }
    loadOrderList(){
      let listParam = {};
      listParam.listType = this.state.listType;
      listParam.pageNum = this.state.pageNum;
      if(this.state.listType ==='search'){
        listParam.orderNo = this.state.ordernumber;
      }
      _order.getOrderList(listParam).then(res=>{
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
          this.loadOrderList();
        } );
    }
    onSearch(ordernumber){
      let listType = ordernumber ===''? 'list' : 'search';
      this.setState({
        listType : listType,
        pageNum : 1,
        ordernumber : ordernumber
      },()=>{
        this.loadOrderList();
      })
       

    }
  render(){
    let tableHeads = [
    'Order Number',
    'People',
    'Status',
    'price',
    'Time',
    'operation'
    ];
  
    return(
      
      <div id='page-wrapper'>
      <PageTitle title="Product List"/>
     <ListSearch onSearchOutside = {(orderNumber)=>{this.onSearch(orderNumber)}}/>
        <TableList tableHeads={tableHeads}>
          {
            this.state.list.map((order,index)=>{
              return (
               <tr key={index}>
               <td>
               <Link to = {`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                 </td>
               <td>
                    {order.receiverName}
                </td>
               <td>{order.statusDesc}</td>
               <td>
               {order.payment}
               </td>
               <td>
               {order.createTime}
               </td>
               <td>
               <Link to = {`/order/detail/${order.orderNo}`}>Deatil</Link>
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


export default OrderList;