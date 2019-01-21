import React                from 'react';
import MUtil                from '../../util/mm.jsx'
import Order              from '../../server/orderserver.jsx'
import PageTitle            from '../../components/page-title/index.jsx';
import TableList from '../../util/tableList/index.jsx';
const _mm           = new MUtil();
const _order     = new Order();
import './detail.scss';
class OrdertDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderNumber : this.props.match.params.orderNumber,
            orderInfo : {}
        }
    }
    componentDidMount(){
        this.loadOrder();
    }
 
    loadOrder(){
          _order.getOrderDetail(this.state.orderNumber).then((res) => {
                this.setState({
                  orderInfo : res
                });
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        
    }
    onSendGoods(){
      if(window.confirm("Are you sure to deliver?")){
        _order.sendGoods(this.state.orderNumber).then((res)=>{
          _mm.successTips('success');
          this.loadOrder();
        },(errMsg)=>{
          _mm.errorTips(errMsg)
        })
      }
    }
    render(){
      let receiverInfo = this.state.orderInfo.shippingVo || {},
          productList = this.state.orderInfo.orderItemVoList || [];
    
        return (
            <div id="page-wrapper">
                <PageTitle title="Order Detail" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">Order Id</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Time</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Address</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                            {receiverInfo.receiverName}
                            {receiverInfo.receiverProvince}
                            {receiverInfo.receiverCity}
                            {receiverInfo.receiverAddress}
                            {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                      
                            </p>
                        </div>
                        <div className="form-group">
                        <label className="col-md-2 control-label">Status</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.statusDesc}</p>
                            {
                              this.state.orderInfo.status === 20 ?
                              <button 
                              onClick = {(e)=>{this.onSendGoods(e)}}
                              className='btn btn-sm btn-default' >Delivery</button> : null
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Payment Method</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Money</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.payment}</p>
                        </div>
                    </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Item List</label>
                        <div className="col-md-10">
                        <TableList tableHeads={['Item','Detail','Price','Number','Total']}>
          {
            productList.map((product,index)=>{
              return (
               <tr key={index}>
               <td>
               <img className = "p-img"   src = {`${this.state.orderInfo.imageHost}${product.productImage}`} alt = {product.productName}></img>
                 </td>
               <td>
                    {product.productName}
                </td>
               <td>{product.curretUnitPrice}</td>
               <td>
               {product.quantity}
               </td>
               <td>
               {product.totalPrice}
               </td>
             </tr>
              )
            })
          }
        </TableList>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default OrdertDetail;