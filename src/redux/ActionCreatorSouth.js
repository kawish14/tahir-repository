import * as ActionTypes from './ActionTypes';
import { southURL } from '../shared/southURL';
import { loadModules, setDefaultOptions } from 'esri-loader';
import { request } from '@esri/arcgis-rest-request';
import { authenticationService } from '../_services/authentication';

export const fetchCustomer = () => (dispatch) => {

    dispatch(customerLoading(true));
    
    return fetch(southURL + '%3ASouth_CPE&maxFeatures=1000000&outputFormat=application%2Fjson')
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
    .then(customer => dispatch(addCustomer(customer)))
    .catch(error => dispatch(customerFailed(error.message)))
    
}

export const customerLoading = () => ({
    type: ActionTypes.Customer_LOADING
});

export const customerFailed = (errmess) => ({
    type: ActionTypes.Customer_FAILED,
    payload: errmess
});

export const addCustomer = (customer) => {

    const blob = new Blob([JSON.stringify(customer)], {
        type: "application/json"
      });

    const url = URL.createObjectURL(blob);

    let customerData = {}

    loadModules(["esri/layers/FeatureLayer","esri/layers/GeoJSONLayer", "esri/geometry/projection",
                'esri/widgets/LayerList', 'esri/widgets/Expand'], { css: false })
            .then(([FeatureLayer,GeoJSONLayer, projection, LayerList, Expand]) => {

                let customer = new GeoJSONLayer({
                    url: url,
                    title:"South Customer",
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
                
                customerData.data = customer

            })
        return {
            type: ActionTypes.ADD_Customer,
            payload: customerData
        }
    
}

