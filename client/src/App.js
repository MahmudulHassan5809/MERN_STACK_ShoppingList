import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import store from './store';


import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/ItemModal'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
			<div className="App">
		        <AppNavbar />
            <Container>
              <ItemModal />
              <ShoppingList />
            </Container>
		    </div>
      </Provider>
    );
  }
}

export default App;
