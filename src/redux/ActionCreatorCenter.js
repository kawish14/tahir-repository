import * as ActionTypes from './ActionTypes';
import {centralURL} from '../shared/centralURL'
import { loadModules, setDefaultOptions } from 'esri-loader';
import { request } from '@esri/arcgis-rest-request';
import { authenticationService } from '../_services/authentication';

export const fetchCustomerCenter = () => (dispatch) => {

    dispatch(center_customerLoading(true));

    return fetch(centralURL + '%3ACentral_Postgis&maxFeatures=1000000&outputFormat=application%2Fjson')
    .then(response => {
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(customer => dispatch(center_addCustomer(customer)))
    .catch(error => dispatch(center_customerFailed(error.message)))
    
}

export const center_customerLoading = () => ({
    type: ActionTypes.CENTER_Customer_LOADING
});

export const center_customerFailed = (errmess) => ({
    type: ActionTypes.CENTER_Customer_FAILED,
    payload: errmess
});

export const center_addCustomer = (customer) => {

    const blob = new Blob([JSON.stringify(customer)], {
        type: "application/json"
      });

    const url = URL.createObjectURL(blob);

    let centralcustomerData = {}

    loadModules(["esri/layers/FeatureLayer","esri/layers/GeoJSONLayer", "esri/geometry/projection",
                'esri/widgets/LayerList', 'esri/widgets/Expand'], { css: false })
            .then(([FeatureLayer,GeoJSONLayer, projection, LayerList, Expand]) => {


                let centralcustomer = new GeoJSONLayer({
                    url: url,
                    title:"Central Customer",
                    //minScale: 20000,
                    labelsVisible: false,
                    popupTemplate: {
                        title: "Customer",
                        content: [
                            {
                            type: "fields",
                            fieldInfos: [{
                                fieldName: "name",
                                visible: true,
                                label: "Name",
                                format: {
                                    digitSeparator: false,
                                    places: 0
                                }
                            }, {
                                fieldName: "id",
                                visible: true,
                                label: "ID",
                            },{
                                fieldName: "address",
                                visible: true,
                                label: "Address",
                            },{
                                fieldName: "type",
                                visible: true,
                                label: "Type",
                            },{
                                fieldName: "block_phase_sector",
                                visible: true,
                                label: "Block/Phase",
                            },{
                                fieldName: "area",
                                visible: true,
                                label: "Town/Area",
                            },{
                                fieldName: "city",
                                visible: true,
                                label: "City",
                            }, {
                                fieldName: "olt",
                                visible: true,
                                label: "OLT",
                            },{
                                fieldName: "frame",
                                visible: true,
                                label: "Frame",
                            },{
                                fieldName: "slot",
                                visible: true,
                                label: "Slot",
                            },{
                                fieldName: "port",
                                visible: true,
                                label: "Port",
                            },{
                                fieldName: "ontid",
                                visible: true,
                                label: "ONT ID",
                            }, {
                                fieldName: "ontmodel",
                                visible: true,
                                label: "ONT Model",
                            },{
                                fieldName: "alarminfo",
                                visible: true,
                                label: "Alarm Info",
                            },{
                                fieldName: "bandwidth",
                                visible: true,
                                label: "Bandwidth",
                            }, {
                                fieldName: "lastuptime",
                                visible: true,
                                label: "Last-UP-Time",

                            },{
                                fieldName: "lastdowntime",
                                visible: true,
                                label: "Last-Down-Time",

                            }]
                        },{
                            type: "text",
                            text:''
                          }]
                    }
                   
                })
                
                centralcustomerData.data = centralcustomer
 

            })

        return {
            type: ActionTypes.CENTER_ADD_Customer,
            payload: centralcustomerData
        }
    
}






