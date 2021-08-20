import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,Dropdown,DropdownToggle,
    DropdownMenu,DropdownItem,UncontrolledDropdown} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { authenticationService } from '../_services/authentication';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isNavOpen: false,
        dropdownOpen:false,
        south:null,
        north:null,
        central:null,
        alarminfo:'',
        status:false,
        show:false,
        adminLogin:false,
        infoRegion:null,

        southActive:null,
        southDyingGasp:null,
        southLOS:null,
        southLCDGI: null,
        southLOP:null,

        northActive:null,
        northDyingGasp:null,
        northLOS:null,
        northLCDGI: null,
        northLOP:null,

        centralActive:null,
        centralDyingGasp:null,
        centralLOS:null,
        centralLCDGI: null,
        centralLOP:null
  
     
      };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this);
   
  }


logout = () => {
    authenticationService.logout();
}
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen // true
    });
}
toggleDrop() {
    this.setState({
      isNavOpen: !this.state.isNavOpen // true
    });
}

 selectLayer = (e) => {
     let _this = this

    if(this.props.loginRole.data.role === 'Admin'){

        this.setState ({
            adminLogin:true,
            show:true
        })

        let customerQuery = this.props.item.customer.data
        var query = customerQuery.createQuery();
    
        let centerCustomerQuery = this.props.centerItem.centerCustomer.data
        var centerQuery = centerCustomerQuery.createQuery();
    
        let northCustomerQuery = this.props.northItem.northCustomer.data
        var northQuery = northCustomerQuery.createQuery();

        if(e.target.value === "clear"){
            /*  this.props.view.goTo({
                  target:[67.116733,24.898892],
                  zoom:14
              }) */ 
              let clearQuery = "status = 'Active'"
              customerQuery.definitionExpression = clearQuery
              northCustomerQuery.definitionExpression = clearQuery
              centerCustomerQuery.definitionExpression = clearQuery


           /***************   SOUTH REGION   *************/
           let southLOS = customerQuery.createQuery();
            let southActive = customerQuery.createQuery();
            let southDyingGasp = customerQuery.createQuery();
            let southLCDGI = customerQuery.createQuery();
            let southLOP = customerQuery.createQuery();

               // LOS
               southLOS.where = "alarmstate = 2 AND status = 'Active'"
               customerQuery.queryFeatures(southLOS)
                   .then(function(response){
                       _this.setState({
                           southLOS:response.features.length
                       })
                    
                   });
               // Active
               southActive.where = "alarmstate = 0 AND status = 'Active'"
               customerQuery.queryFeatures(southActive)
                   .then(function(response){
                       _this.setState({
                           southActive:response.features.length
                       })
                  
                   });
               // DyingGasp
               southDyingGasp.where = "alarmstate = 1 AND status = 'Active'"
               customerQuery.queryFeatures(southDyingGasp)
                   .then(function(response){
                       _this.setState({
                           southDyingGasp:response.features.length
                       })
                     
                   });

               // LCDGI
               southLCDGI.where = "alarmstate = 3 AND status = 'Active'"
               customerQuery.queryFeatures(southLCDGI)
                   .then(function(response){
                       _this.setState({
                           southLCDGI:response.features.length
                       })
                 
                   });

               // LOP
               southLOP.where = "alarmstate = 4 AND status = 'Active'"
               customerQuery.queryFeatures(southLOP)
                   .then(function(response){
                       _this.setState({
                           southLOP:response.features.length
                       })
                       
                   });

              /***************   NORTH REGION   *************/

                let northLOS = northCustomerQuery.createQuery();
                let northActive = northCustomerQuery.createQuery();
                let northDyingGasp = northCustomerQuery.createQuery();
                let northLCDGI = northCustomerQuery.createQuery();
                let northLOP = northCustomerQuery.createQuery();

                // LOS
                northLOS.where = "alarmstate = 2 AND status = 'Active'"
                northCustomerQuery.queryFeatures(northLOS)
                    .then(function(response){
                        _this.setState({
                            northLOS:response.features.length
                        })
                    
                    });
                
                // Active
                northActive.where = "alarmstate = 0 AND status = 'Active'"
                northCustomerQuery.queryFeatures(northActive)
                    .then(function(response){
                        _this.setState({
                            northActive:response.features.length
                        })
                       
                    });
                // DyingGasp
                northDyingGasp.where = "alarmstate = 1 AND status = 'Active'"
                northCustomerQuery.queryFeatures(northDyingGasp)
                    .then(function(response){
                        _this.setState({
                            northDyingGasp:response.features.length
                        })
                       
                    });

                // LCDGI
                northLCDGI.where = "alarmstate = 3 AND status = 'Active'"
                northCustomerQuery.queryFeatures(northLCDGI)
                    .then(function(response){
                        _this.setState({
                            northLCDGI:response.features.length
                        })
                       
                    });

                // LOP
                northLOP.where = "alarmstate = 4 AND status = 'Active'"
                northCustomerQuery.queryFeatures(northLOP)
                    .then(function(response){
                        _this.setState({
                            northLOP:response.features.length
                        })
                        
                    });

                /***************   CENTRAL REGION   *************/
                let centralLOS = centerCustomerQuery.createQuery();
                let centralActive = centerCustomerQuery.createQuery();
                let centralDyingGasp = centerCustomerQuery.createQuery();
                let centralLCDGI = centerCustomerQuery.createQuery();
                let centralLOP = centerCustomerQuery.createQuery();

                // LOS
                centralLOS.where = "alarmstate = 2 AND status = 'Active'"
                centerCustomerQuery.queryFeatures(centralLOS)
                    .then(function(response){
                        _this.setState({
                            centralLOS:response.features.length
                        })
                       
                    });
                // Active
                centralActive.where = "alarmstate = 0 AND status = 'Active'"
                centerCustomerQuery.queryFeatures(centralActive)
                    .then(function(response){
                        _this.setState({
                            centralActive:response.features.length
                        })
                        
                    });
                // DyingGasp
                centralDyingGasp.where = "alarmstate = 1 AND status = 'Active'"
                centerCustomerQuery.queryFeatures(centralDyingGasp)
                    .then(function(response){
                        _this.setState({
                            centralDyingGasp:response.features.length
                        })
                       
                    });

                // LCDGI
                centralLCDGI.where = "alarmstate = 3 AND status = 'Active'"
                centerCustomerQuery.queryFeatures(centralLCDGI)
                    .then(function(response){
                        _this.setState({
                            centralLCDGI:response.features.length
                        })
                      
                    });

                // LOP
                centralLOP.where = "alarmstate = 4 AND status = 'Active'"
                centerCustomerQuery.queryFeatures(centralLOP)
                    .then(function(response){
                        _this.setState({
                            centralLOP:response.features.length
                        })
                        _this.props.alarmInfo(_this.state)
                    });
           
           
          }
          else {
              //var queryExpression = `status = '${e.target.value}'`
              var queryExpression = `alarmstate = ${e.target.value} AND status = 'Active'`

              // South
              customerQuery.definitionExpression = queryExpression
              query.where = queryExpression
              customerQuery.queryFeatures(query)
                .then(function(response){
                    if (response.features[0].attributes.alarmstate === 0){
                        _this.setState({
                            alarminfo:'Online',
                            south:response.features.length,
                            status:true,
                            show:false
                        })
                    }else if (response.features[0].attributes.alarmstate === 1){
                        _this.setState({
                            alarminfo:'Powered Off',
                            south:response.features.length,
                            status:true,
                            show:false
                        })
                    }else if (response.features[0].attributes.alarmstate === 2){
                        _this.setState({
                            alarminfo:'Link Down',
                            south:response.features.length,
                            status:true,
                            show:false
                        })
                    }else if (response.features[0].attributes.alarmstate === 3){
                        _this.setState({
                            alarminfo:'GEM Packet Loss',
                            south:response.features.length,
                            status:true,
                            show:false
                        })
                    }else if (response.features[0].attributes.alarmstate === 4){
                        _this.setState({
                            alarminfo:'Low Optical Power',
                            south:response.features.length,
                            status:true,
                            show:false
                        })
                    }else
                    _this.setState({
                        alarminfo:response.features[0].attributes.alarminfo,
                        south:response.features.length,
                        status:true,
                        show:false
                    })
                    
                    _this.props.alarmInfo(_this.state)
                });
                // Central
              centerCustomerQuery.definitionExpression = queryExpression
              centerQuery.where = queryExpression
              centerCustomerQuery.queryFeatures(centerQuery)
                    .then(function(response){
                        _this.setState({
                            central:response.features.length,
                            show:false
                        })
                        
                        _this.props.alarmInfo(_this.state)
                    });
                // North
              northCustomerQuery.definitionExpression = queryExpression
              northQuery.where = queryExpression
              northCustomerQuery.queryFeatures(northQuery)
                    .then(function(response){
                        _this.setState({
                            north:response.features.length,
                            show:false
                        })
                        
                        _this.props.alarmInfo(_this.state)
                    });
                
             
      
              //console.log(customerQuery)

              
          }
    }
    else if(this.props.loginRole.data.role === 'SouthDEVuser') {

        let customerQuery = this.props.item.customer.data
        var query = customerQuery.createQuery();
 

        if(e.target.value === "clear"){
              let clearQuery = "status = 'Active'"
              customerQuery.definitionExpression = clearQuery
              
              query.where = clearQuery
              customerQuery.queryFeatures(query)
              .then(function(response){
                  _this.setState({
                      south:response.features.length,
                      infoRegion:response.features.length,
                      show:false
                  })
                  
                  
              });
          }
          else {
              //var queryExpression = `status = '${e.target.value}'`
              var queryExpression = `alarmstate = ${e.target.value} AND status = 'Active'`
              customerQuery.definitionExpression = queryExpression
      
              query.where = queryExpression

              customerQuery.queryFeatures(query)
              .then(function(response){
                  _this.setState({
                      south:response.features.length,
                      infoRegion:response.features.length,
                      show:false
                  })
                  
                  
              });

          }
    }
    else if(this.props.loginRole.data.role === 'NorthDEVuser') {

        let northCustomerQuery = this.props.northItem.northCustomer.data
        var northQuery = northCustomerQuery.createQuery();

        if(e.target.value === "clear"){
              let clearQuery = "status = 'Active'"
              northCustomerQuery.definitionExpression = clearQuery  
              
              northQuery.where = clearQuery
              northCustomerQuery.queryFeatures(northQuery)
              .then(function(response){
                  _this.setState({
                      north:response.features.length,
                      infoRegion:response.features.length,
                      show:false
                  })
                  
                  
              });
          }
          else {
              //var queryExpression = `status = '${e.target.value}'`
              var queryExpression = `alarmstate = ${e.target.value} AND status = 'Active'`
              northCustomerQuery.definitionExpression = queryExpression
              
              northQuery.where = queryExpression
              northCustomerQuery.queryFeatures(northQuery)
              .then(function(response){
                  _this.setState({
                      north:response.features.length,
                      infoRegion:response.features.length,
                      show:false
                  })
                  
                  
              });
          }
    }
    else if(this.props.loginRole.data.role === 'CentralDEVuser') {

        let centerCustomerQuery = this.props.centerItem.centerCustomer.data
        var centerQuery = centerCustomerQuery.createQuery();

        if(e.target.value === "clear"){
              let clearQuery = "status = 'Active'"
              centerCustomerQuery.definitionExpression = clearQuery  
              
              centerQuery.where = clearQuery
              centerCustomerQuery.queryFeatures(centerQuery)
              .then(function(response){
                  _this.setState({
                      north:response.features.length,
                      infoRegion:response.features.length,
                      show:false
                  })
                  
                  
              });
          }
          else {
              //var queryExpression = `status = '${e.target.value}'`
              var queryExpression = `alarmstate = ${e.target.value} AND status = 'Active'`
              centerCustomerQuery.definitionExpression = queryExpression
              
              centerQuery.where = queryExpression
              centerCustomerQuery.queryFeatures(centerQuery)
              .then(function(response){
                  _this.setState({
                      north:response.features.length,
                      infoRegion:response.features.length,
                      show:false
                  })
                  
                  
              });
          }
    }
    

}

  render() {
    return(
        <div>
            <Navbar color="dark" dark expand="md">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand style={{color:'#1f91f3'}}>Transworld</NavbarBrand>
                    {
                        this.props.loginRole.data.role !== 'Admin' ? 
                        <div style={styles.infoRegion}>{this.state.infoRegion}</div>
                        :
                        null
                    }
                    <Collapse isOpen={this.state.isNavOpen} navbar>

                        <Nav  className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle style={styles.dropToggle} nav caret>
                                    Customer Status
                                </DropdownToggle>
                                <DropdownMenu onClick={(e)=> this.selectLayer(e)} style={{background:"#343a40"}} center>
                                    <DropdownItem value = "clear" style={styles.dropItem}>Clear Selection</DropdownItem>
                                    <DropdownItem value='0' style={styles.dropItem}>Online</DropdownItem>
                                    <DropdownItem value='1' style={styles.dropItem}>Powered Off</DropdownItem>
                                    <DropdownItem value='2' style={styles.dropItem}>Link Down</DropdownItem>
                                    <DropdownItem value='3' style={styles.dropItem}>GEM Packet Loss</DropdownItem>
                                    <DropdownItem value='4' style={styles.dropItem}>Low Optical Power</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink className="nav-link"  to='/login' onClick={this.logout}><span className="fa fa-sign-in fa-lg"></span> Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
             
            </Navbar>
        </div>
    );
  }
}

const styles = {
    dropToggle:{
        background:"#343a40",
        color:"#1f91f3",
    },
    dropItem:{
        color:"#1f91f3",
    },
    infoRegion:{
        color:'#1f91f3',
        fontSize: '25px',
        fontWeight:'bold',
        textShadow:'3px 3px black'
    }
}

export default Header;

