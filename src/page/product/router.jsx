import React from 'react';

import {BrowserRouter as Router, Switch , Route, Link,Redirect} from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from './index/detail.jsx';
class ProductRouter extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
        <Route path="/product/index" component = {ProductList}></Route>
        <Route path="/product/save/:pid?" component = {ProductSave}></Route>
        <Route path="/product/detail/:pid" component={ProductDetail}/>
    
        <Redirect exact from="/product"  to="/product/index"  />
        <Redirect exact from="/category" to="/category/index"/>
        </Switch>   
      </Router>
    )
  }
}

export default ProductRouter;