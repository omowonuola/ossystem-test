import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

const App = () => {
  return (
    
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/product/:id' component={ProductScreen} />

            <Route path='/profile' component={ProfileScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route
              path='/admin/productlist'
              exact
              component={ProductListScreen}
            />
            <Route
              path='/admin/productlist/:pageNumber'
              exact
              component={ProductListScreen}
            />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/search/:keyword' exact component={HomeScreen} />
            <Route path='/page/:pageNumber' exact component={HomeScreen} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              exact
              component={HomeScreen}
            />
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
