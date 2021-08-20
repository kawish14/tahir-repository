import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from '../LoadingComponent';
import { Map } from 'react-arcgis';
import CenterCustomer from '../../pages/central/CenterCustomer'
import Header from '../HeaderComponent';
import Layerlist from '../../pages/central/widget/Layerlist';
import SearchWidget from '../../pages/central/widget/SearchWidget'
import AppWidgets from '../../pages/central/widget/AppWidgets';
import ViewMaps from '../../pages/ViewMaps';

function Central(props) {

    const [viewProperties] = useState({
        center: [74.355626,31.545676],
        scale: 288895,
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
    const [mapHeight] = useState('92vh');
    const [mapview, updateView] = useState({})

    const viewCheck = (e) => { updateView(e) }
    
    if (props.centerCustomerLoading) {
        return(
           
            <Loading />
        );
    }
    else if (props.centerCustomerErrMess) {
        return(
                <h4>{props.centerCustomerErrMess}</h4>
        );
    }
    else 
        {
        return(
            <div>
                <Header 
                    centerItem = {props.centerCustomer}
                    loginRole ={props.login}
                    view = {mapview}
                 />
                 
                <Map
                    className="container-fluid"
                    style={{ paddingLeft:'0px', paddingRight:'15px', width:'100vw', height:mapHeight }}
                    mapProperties={{ basemap: 'satellite' }}
                    viewProperties={viewProperties}
                    > 
                        <CenterCustomer item = {props.centerCustomer} viewInstance = {viewCheck}  loginRole ={props.login} />
                        <Layerlist

                            centralCustomerLabel = {props.centerCustomer}
                            loginRole ={props.login} 
                        />
                        <SearchWidget
                            centralCustomerSearch = {props.centerCustomer}
                         />
                         <AppWidgets
                          />
                         <ViewMaps view = {mapview}
                            loginRole ={props.login} 
                            center = {props.centerCustomer}    
                         />
                  
                </Map>
            </div>
          
        )
    }
}

export default Central;