import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { ProductList } from './components/ListComponents/ProductList';

export default class App extends Component {

  render() {
    return (
      <Layout>
        <Route path='/list' component={ProductList} />
      </Layout>
    );
  }
}
