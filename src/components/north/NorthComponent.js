import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from '../LoadingComponent';
import { Map } from 'react-arcgis';
import NorthCustomer from '../../pages/north/NorthCustomer'
import Header from '../HeaderComponent';
import Layerlist from '../../pages/north/widget/Layerlist';
import SearchWidget from '../../pages/north/widget/SearchWidget'
import AppWidgets from '../../pages/north/widget/AppWidgets';
import ViewMaps from '../../pages/ViewMaps';

function North(props) {

    const [viewProperties] = useState({
        center: [73.127233,33.529393],
        scale: 144448,
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
    if (props.northCustomerLoading) {
        return(
           
            <Loading />
        );
    }
    else if (props.northCustomerErrMess) {
        return(
                <h4>{props.northCustomerErrMess}</h4>
        );
    }
    else 
        {
        return(
            <div>
                <Header 
                    item = {props.customer}
                    northItem = {props.northCustomer}
                    loginRole ={props.login}
                    view = {mapview}
                 />
                 
                <Map
                    className="container-fluid"
                    style={{ paddingLeft:'0px', marginRight:'0px', width:'100vw', height:mapHeight }}
                    mapProperties={{ basemap: 'satellite' }}
                    viewProperties={viewProperties}
                    > 
                        <NorthCustomer item = {props.northCustomer} loginRole ={props.login} />
                        <Layerlist

                            northCustomerLabel = {props.northCustomer}

                            loginRole ={props.login} 
                            
                        />
                        <SearchWidget
                            northCustomerSearch = {props.northCustomer}
            
                         />
                         <AppWidgets
                          />
                           <ViewMaps  view = {mapview}
                            north = {props.northCustomer} 
                            loginRole ={props.login}  
                         />
                    
                </Map>
            </div>
          
        )
    }
}

export default North;