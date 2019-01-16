import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch , Route, Link,Redirect} from 'react-router-dom'

import Home from 'page/home/index.jsx';
import Layout from 'components/layout/index.jsx';
class App extends React.Component{
  render(){
    return(
      <Router>
        <Layout>
      <Switch>
          <Route path="/" exact component = {Home}></Route>
          <Route path="/product" exact component={Home}></Route>
        <Route path="/product-category" exact component={Home}></Route>
        <Route path="/order" exact component={Home}></Route>
        <Route path="/user" exact component={Home}></Route>
      </Switch>
      </Layout>
      </Router>

    )
  }
}
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);