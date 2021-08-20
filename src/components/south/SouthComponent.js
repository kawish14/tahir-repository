import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from '../LoadingComponent';
import { Map } from 'react-arcgis';
import Customer from '../../pages/south/Customer'
import Header from '../HeaderComponent';
import Layerlist from '../../pages/south/widget/Layerlist';
import SearchWidget from '../../pages/south/widget/SearchWidget'
import AppWidgets from '../../pages/south/widget/AppWidgets';
import ViewMaps  from '../../pages/ViewMaps';

function South(props) {

    const [viewProperties] = useState({
        center: [67.050987, 24.894766],
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

    if (props.customerLoading) {
        return(
           
            <Loading />
        );
    }
    else if (props.customerErrMess) {
        return(
                <h4>{props.customerErrMess}</h4>
        );
    }
    else 
        {
        return(
            <div>
                <Header 
                    item = {props.customer}
                    loginRole ={props.login}
                    view = {mapview}
                 />
                 
                <Map
                    className="container-fluid"
                    style={{ paddingLeft:'0px', marginRight:'0px', width:'100vw', height:mapHeight }}
                    mapProperties={{ basemap: 'satellite' }}
                    viewProperties={viewProperties}
                    > 
                        <Customer item = {props.customer} loginRole ={props.login}
                         />
                     
                        <Layerlist
                            customerLabel = {props.customer}
                            loginRole ={props.login} 
                        />
                        <SearchWidget
                            customerSearch = {props.customer}
                         />
                         <AppWidgets
                          />
                          
                          <ViewMaps south = {props.customer} view = {mapview}
                          loginRole ={props.login} 
                         />
                </Map>
            </div>
          
        )
    }
}

export default South;