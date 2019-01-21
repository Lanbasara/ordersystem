import React from 'react';
import Categoryselector from '../../../page/product/index/category-select.jsx';
import PageTitle from '../../../components/page-title/index.jsx';
import Fileloader from '../../../util/uploader/index.jsx';
import './save.scss';
import Richeditor from '../../../util/richeditor/index.jsx';
import Product from '../../../server/productserver.jsx';
const _product = new Product();
import Mutil from '../../../util/mm.jsx';
const _mm = new Mutil();
class ProductSave extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name : '',
      subtitle : '',
      categoryId : 0,
      parentCategoryId : 0,
      subImages : [],
      price : '',
      stock : '',
      detail : '',
      status : 1
      //商品状态1 ： 在售
    }
  }
  onCategoryChange(categoryId,parentCategoryId){
   this.setState({
     categoryId : categoryId,
     parentCategoryId : parentCategoryId
   })
    

  }
  onUploadSuccess(res){
    let subImages = this.state.subImages;
    subImages.push(res);
    this.setState({
      subImages : subImages

    });

  }
  onUploadFail(errMsg){
    _mm.errorTips(errMsg||'upload fail')
   

  }
  onImageDelete(e){
    let index = parseInt(e.target.getAttribute('index')),
        subImages = this.state.subImages;
    subImages.splice(index,1);
    this.setState({
      subImages : subImages
    })

  }
  onDetailValueChange(value){
    this.setState({
      detail : value
    })
    console.log(value);

  }
  onValueChange(e){
    let name = e.target.name,
        value = e.target.value.trim();
    this.setState({
      [name]: value
    })

  }
  getSubImagesString(){
    return this.state.subImages.map((image) => image.uri).join(',');
}
// 提交表单
onSubmit(){
    let product = {
        name        : this.state.name,
        subtitle    : this.state.subtitle,
        categoryId  : parseInt(this.state.categoryId),
        subImages   : this.getSubImagesString(),
        detail      : this.state.detail,
        price       : parseFloat(this.state.price),
        stock       : parseInt(this.state.stock),
        status      : this.state.status
    },
    productCheckResult = _product.checkProduct(product);
    if(this.state.id){
        product.id = this.state.id;
    }
    // 表单验证成功
    if(productCheckResult.status){
        _product.saveProduct(product).then((res) => {
            _mm.successTips(res);
            this.props.history.push('/product/index');
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
    }
    // 表单验证失败
    else{
        _mm.errorTips(productCheckResult.msg);
    }
    
}
  render(){
    return(
      <div id='page-wrapper'>
      <PageTitle title="Add product"/>
        <div className="form-horizontal">
        <div className="form-group">
        <label  className="col-md-2 control-label">Product name</label>
        <div className="col-md-5">
        <input 
        name = "name"
        onChange = {(e)=>{
          this.onValueChange(e)
        }}
        type="test" className="form-control"  placeholder="Product name"/>
        </div>
        </div>
        <div className="form-group">
        <label  className="col-md-2 control-label">Product describe</label>
        <div className="col-md-5">
        <input 
         name = "subtitle"
         onChange = {(e)=>{
           this.onValueChange(e)
         }}
        type="test" className="form-control"  placeholder="Product describe"/>
        </div>
        </div>
        <div className="form-group">
        <label  className="col-md-2 control-label">Category</label>
        <Categoryselector onCategoryChange = {(categoryId,parentCategoryId)=> this.onCategoryChange(categoryId,parentCategoryId)}></Categoryselector>
        </div>
        <div className="form-group">  
        <label  className="col-md-2 control-label">Price</label>
        <div className="col-md-5">
        <div className="input-group">
        <input type="number" className="form-control" 
        placeholder="价格" 
        name="price"
        value={this.state.price}
        onChange={(e) => this.onValueChange(e)}/>
          <span className="input-group-addon" id="basic-addon2">$</span>
          </div>
       
        </div>
        </div>
        <div className="form-group">
        <label  className="col-md-2 control-label">Stock number</label>
        <div className="col-md-5">
        <div className="input-group">
            <input type="number" className="form-control" 
            placeholder="库存" 
            name="stock"
            value={this.state.stock}
            onChange={(e) => this.onValueChange(e)}/>
          <span className="input-group-addon" id="basic-addon2">件</span>
          </div>
        </div>
        </div>
        <div className="form-group">
        <label  className="col-md-2 control-label">Product image</label>
        <div className="col-md-10">
        {
          this.state.subImages.length? this.state.subImages.map((image,index)=>
            (
              <div key={index} className='img-con'>
                <img  className='img' src={image.url}></img>
                <i className="fa fa-close" index = {index} onClick={(e)=>{this.onImageDelete(e)}}></i>
                </div>
           
            )
          ):<div>Please Upload image</div>
        }
        </div>
        <div className="col-md-offset-2 col-md-10 file-upload-con">
        <Fileloader onSucess = {(res)=>this.onUploadSuccess(res)}
        onFail = {(errMsg)=>this.onUploadFail(errMsg)}/>
        </div>
        </div>
        <div className="form-group">
        <label  className="col-md-2 control-label">Product image</label>
        <div className="col-md-10">
        <Richeditor onValueChange = {(value)=>this.onDetailValueChange(value)}></Richeditor>
        </div>
        <div className="form-group"> 
        <div className="col-md-offset-2 col-md-10">
        <button type="submit" className="btn btn-primary" onClick={(e)=>{this.onSubmit(e)}}>Finish</button>
        </div>
        </div>
        </div>
        </div>
      </div>
    )
  }
}

export default ProductSave;