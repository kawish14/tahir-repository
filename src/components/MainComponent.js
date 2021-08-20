import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Header from './HeaderComponent';
import Footer from './FooterComponent'
import South from './south/SouthComponent';
import North from './north/NorthComponent'
import Central from './central/CenterComponent'
import Admin from './admin/AdminComponent';
import { Switch, Route, Redirect, withRouter,Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCustomer} from '../redux/ActionCreatorSouth';
import {fetchCustomerCenter} from '../redux/ActionCreatorCenter';
import {fetchCustomerNorth} from '../redux/ActionCreatorNorth';
import {alarmInfo} from '../redux/AlarmInfoactionCreator'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import  LoginPage  from '../LoginPage/LoginPage';
import  {PrivateRoute}  from './PrivateRoute';


const mapStateToProps = state => {
  return {
    customer: state.customer,
    centerCustomer:state.centerCustomer,
    northCustomer:state.northCustomer,
    login:state.login,


  }
}

const mapDispatchToProps = dispatch => ({
  fetchCustomer: () => { dispatch(fetchCustomer())},
  fetchCustomerCenter: () => { dispatch(fetchCustomerCenter())},
  fetchCustomerNorth: () => { dispatch(fetchCustomerNorth())},
  alarmInfo: () => { dispatch(alarmInfo())},

  
})

class Main extends Component {


  componentDidMount() {
  
    this.props.fetchCustomer();
    this.props.fetchCustomerCenter();
    this.props.fetchCustomerNorth();
    this.props.alarmInfo();
 
  }

  render() {

     const appPage = () => {
       //console.log(this.props.login.data.role)

       if(this.props.login.data.role === 'SouthDEVuser'){

         return (
              <South 
              customer={this.props.customer}
              customerLoading={this.props.customer.isLoading}
              customerErrMess={this.props.customer.errMess}

              alarmInfo={this.props.alarmInfo}

              login = {this.props.login}
          />
         )
       }

       if(this.props.login.data.role === 'NorthDEVuser'){
        return (
          <North 
            northCustomer={this.props.northCustomer}
            northCustomerLoading={this.props.northCustomer.isLoading}
            northCustomerErrMess={this.props.northCustomer.errMess}
            

            login = {this.props.login}

            alarmInfo={this.props.alarmInfo}
          />
        )
      }
      if(this.props.login.data.role === 'CentralDEVuser'){
        return (
          <Central 
              centerCustomer={this.props.centerCustomer}
              centerCustomerLoading={this.props.centerCustomer.isLoading}
              centerCustomerErrMess={this.props.centerCustomer.errMess}
            

            login = {this.props.login}

            alarmInfo={this.props.alarmInfo}
          />
        )
      }
      if(this.props.login.data.role === 'Admin'){
 
        return (
            <Admin 
              customer={this.props.customer}
              customerLoading={this.props.customer.isLoading}
              customerErrMess={this.props.customer.errMess}

              centerCustomer={this.props.centerCustomer}
              centerCustomerLoading={this.props.centerCustomer.isLoading}
              centerCustomerErrMess={this.props.centerCustomer.errMess}

              northCustomer={this.props.northCustomer}
              northCustomerLoading={this.props.northCustomer.isLoading}
              northCustomerErrMess={this.props.northCustomer.errMess}

              login = {this.props.login}

              alarmInfo={this.props.alarmInfo}
            />
        )
      }
      
    }

 
    return (
      <div>

        <TransitionGroup>
            <Switch>
                  <PrivateRoute exact  path="/" component={appPage} />
                  {/* <PrivateRoute exact path='/' component={HomePage} />  */}
                  <Route path="/login" component={LoginPage} />
              </Switch>

        </TransitionGroup>
       {/*  <Footer /> */}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));