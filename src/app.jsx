import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch , Route, Link,Redirect} from 'react-router-dom'

import Home from 'page/home/index.jsx';
import Layout from 'components/layout/index.jsx';
import Login from './page/login/index.jsx';
import Error from './page/error/index.jsx';
import UserList from './page/user/index.jsx';
class App extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
        <Route path="/login" exact component = {Login}></Route>
        <Route path="/"  render = {props =>(
           <Layout> 
           <Switch>
             <Route path="/" exact component = {Home}></Route>
             <Route path="/product" exact component={Home}></Route>
             <Route path="/product-category" exact component={Home}></Route>
             <Route path="/order" exact component={Home}></Route>
             <Route path="/user/index" component={UserList}></Route>
             <Redirect exact path="/user" to = "/user/index"/>
             <Route component={Error}></Route>
           </Switch>
           </Layout>
        )}/>
        </Switch>   
      </Router>
    )
  }
}
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);