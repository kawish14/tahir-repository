import React from 'react';
import Main from './components/MainComponent';
import { BrowserRouter, Router } from 'react-router-dom';
import './App.css'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { authenticationService } from './_services/authentication';
import history from './history'

const store = ConfigureStore();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      logginStatus: true
    }
    this.event = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ]

    this.warn.bind(this);
    this.logout = this.logout.bind(this)
    this.restTimeout = this.restTimeout.bind(this)

    for(var i in this.event){
      window.addEventListener(this.event[i], this.restTimeout)
    }

    this.setTimeout()
  }

  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout)
  }

  setTimeout() {
    this.warnTimeout = setTimeout(this.warn, 16*1800);
    this.logoutTimeout = setTimeout(this.logout, 20*38000);
  }

  restTimeout(){
    this.clearTimeout();
    this.setTimeout()
  }

   warn(){
    //alert("You will be logged out automatically")
  } 

  logout(){
    authenticationService.logout();
    history.push('/login');
  }

  destroy(){
    this.clearTimeout();

    for(var i in this.event){
      window.removeEventListener(this.event[i], this.restTimeout)
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <Main />
          </div>
        </Router>
      </Provider>

       
    );
  }
}

export default App;
