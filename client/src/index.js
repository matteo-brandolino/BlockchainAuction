import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import store from './redux-store/index'
import {Provider} from 'react-redux'
import axios from 'axios'

//render function //avoid repeating code
const render = () => {
  ReactDOM.render(
    <Provider store = {store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

  //if you refresh and token still exists redirect to /profile
  axios.get("/api/auth/user",{withCredentials: true})
    .then(res => {
      store.dispatch({type:"SET_LOGIN", payload:res.data})
      render()
    })
    .catch(() => render())

