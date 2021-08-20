import React, { useState, useEffect } from 'react';
import { Row,Col,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from '../LoadingComponent';
import { Map } from 'react-arcgis';
import Customer from '../../pages/south/Customer'
import CenterCustomer from '../../pages/central/CenterCustomer'
import NorthCustomer from '../../pages/north/NorthCustomer'
import Header from '../HeaderComponent';
import Layerlist from './widget/Layerlist';
import SearchWidget from './widget/SearchWidget'
import AppWidgets from './widget/AppWidgets'
import Gpondb from './Gpondb'
import ViewMaps from '../../pages/ViewMaps';


function Admin(props) {
    
    const [viewProperties] = useState({
        center: [70.177627, 28.844898], 
        scale: 18489298,
         popup: {
            dockEnabled: false,
            dockOptions: {
               
                buttonEnabled: true,
            
                breakpoint: false,
                position: "bottom-left"
            }
        }, 
         ui: {
             components: ["zoom", "compass", "attribution"]
         }

    });

    const [mapHeight, mapHeightUpdate] = useState('76vh');
    /* const changemapHeight = (e) => {mapHeightUpdate(e)} */

    const [mapview, updateView] = useState({})
    const viewCheck = (e) => { updateView(e) }

    const [alarmInfo,updatealarmInfo] = useState({})
    const alarmInfos = (e) => {updatealarmInfo(e)}

    const [southLOS,updateSouthLOS] = useState(null)
    const updateSouthLOSfun = (e) => {updateSouthLOS(e)}

    const [northLOS,updateNorthLOS] = useState(null)
    const updateNorthLOSfun = (e) => {updateNorthLOS(e)}

    const [centralLOS,upsdateCentralLOS] = useState(null)
    const updateCentralLOSfun = (e) => {upsdateCentralLOS(e)}
    
    
    if (props.customerLoading || props.centerCustomerLoading || props.northCustomerLoading ) {
        return(
           
            <Loading />
        );
    }
    else if (props.customerErrMess || props.centerCustomerErrMess || props.northCustomerErrMess ) {
        return(
                <h4>{props.customerErrMess}</h4>
        );
    }
    else 
        { 
        return(
            <div style={{backgroundColor:'#1d1d1d'}}>
                <Header 
                    item = {props.customer}
                    centerItem = {props.centerCustomer}
                    northItem = {props.northCustomer}
                    loginRole ={props.login}
                    view = {mapview}
                    
                    alarmInfo={alarmInfos}
                  
                 />
                <Map
                    className="container-fluid"
                    style={{ paddingLeft:'0px', width:'100vw', height:mapHeight }}
                    mapProperties={{ basemap: 'satellite' }}
                    viewProperties={viewProperties}
                    >  
                        <Customer item = {props.customer} 
                                    loginRole ={props.login} 
                                    viewInstance = {viewCheck}
                                    southLOS = {updateSouthLOSfun}
                                     />
                        <CenterCustomer 
                                    item = {props.centerCustomer} 
                                    loginRole ={props.login}
                                    centralLOS = {updateCentralLOSfun}
                                    />
                        <NorthCustomer item = {props.northCustomer} 
                                        loginRole ={props.login} 
                                        northLOS = {updateNorthLOSfun} 

                            />
                        <Layerlist
                            customerLabel = {props.customer}
                            centralCustomerLabel = {props.centerCustomer}
                            northCustomerLabel = {props.northCustomer}
                            loginRole ={props.login} 
                            
                        />
                        <SearchWidget
                            customerSearch = {props.customer}
                            centralCustomerSearch = {props.centerCustomer}
                            northCustomerSearch = {props.northCustomer}
            
                        />
                        <AppWidgets
                        />
                        <ViewMaps south = {props.customer} view = {mapview}
                            north = {props.northCustomer} 
                            center = {props.centerCustomer}
                            loginRole ={props.login} 
                         />
                </Map>
                <Gpondb southLOS={southLOS}
                        northLOS={northLOS}
                        centralLOS = {centralLOS}

                        alarmInfo={alarmInfo}
                        loginRole ={props.login}
                        
                        view = {mapview}

                />
                
              
            </div>
          
        )
    }
    
}

export default Admin;