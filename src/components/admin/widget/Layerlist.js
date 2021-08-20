import React from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import './css/layerlist.css'

export default class Layerlist extends React.Component{

    componentDidMount() {

    /*     let dcLayer = this.props.dcLabel.dc.data
        let fatLayer = this.props.fatLabel.fat.data */
        let customerLabel = this.props.customerLabel.customer.data
        let centralCustomerLabel = this.props.centralCustomerLabel.centerCustomer.data
        let northCustomerLabel = this.props.northCustomerLabel.northCustomer.data
       /*  let fiberLabel = this.props.fiberLabel.fiber.data
        let jointLabel = this.props.jointLabel.joint.data;
        let popLabel = this.props.popLabel.pop.data; */

        let view = this.props.view
        let map = this.props.map

        loadModules(['esri/widgets/Expand','esri/widgets/LayerList',"esri/layers/GroupLayer"], { css: false })
            .then(([ Expand, LayerList,GroupLayer]) => {

                let layerlist = new Expand({
                    content: new LayerList({
                        view: view,
                        style: "classic",
                        statusIndicatorsVisible: false,
                        listItemCreatedFunction: function (event) {
                            let item = event.item

                           if (item.title === "KHI Layers") {
                                item.actionsSections = [
                                    [
                                        {
                                          title: "Go to full extent",
                                          className: "esri-icon-zoom-out-fixed",
                                          id: "full-extent KHI"
                                        }
                                      ]
                                ]
                            }

                            if (item.title === "ISB Layers") {
                                item.actionsSections = [
                                    [
                                        {
                                          title: "Go to full extent",
                                          className: "esri-icon-zoom-out-fixed",
                                          id: "full-extent ISB"
                                        }
                                      ]
                                ]
                            }

                            if (item.title === "LHR Layers") {
                                item.actionsSections = [
                                    [
                                        {
                                          title: "Go to full extent",
                                          className: "esri-icon-zoom-out-fixed",
                                          id: "full-extent LHR"
                                        }
                                      ]
                                ]
                            }

                            if (item.title === "FAT") {
                                item.actionsSections = [
                                    [
                                        {
                                            title: "Label FAT",
                                            className: "esri-icon-labels",
                                            id: "label-FAT"
                                        }
                                    ]
                                ]
                            }
                            if (item.title === "ODB/DC") {
                                item.actionsSections = [
                                    [
                                        {
                                            title: "Label ODB-DC",
                                            className: "esri-icon-labels",
                                            id: "label-ODB"
                                        }
                                    ]
                                ]
                            }

                        }
                    }),
                    view: view,
                    group: "bottom-right",
                    expanded: false,
                })

                view.ui.add(layerlist, 'top-right')

                layerlist.content.on("trigger-action", function (event) {
                 
                    var id = event.action.id;
                    
                     if (id === "full-extent KHI") {
     
                        view.goTo({
                            target:[67.233635,24.905977],
                            zoom:11
                        })
                        .catch(function(error){
                          if (error.name != "AbortError"){
                            console.error(error);
                          }
                        });
                      }

                      if (id === "full-extent ISB") {
     
                        view.goTo({
                            target:[73.127233,33.529393],
                            zoom:11
                        })
                        .catch(function(error){
                          if (error.name != "AbortError"){
                            console.error(error);
                          }
                        });
                      } 

                      if (id === "full-extent LHR") {
     
                        view.goTo({
                            target:[74.355626,31.545676],
                            zoom:11
                        })
                        .catch(function(error){
                          if (error.name != "AbortError"){
                            console.error(error);
                          }
                        });
                      } 

                   /*  if (id === "label-ODB") {

                        if (dcLayer.labelsVisible === false) {

                            dcLayer.labelsVisible = true

                        }
                        else {

                            dcLayer.labelsVisible = false
                        }
                      
                    }

                    if (id === "label-FAT") {
                        if (fatLayer.labelsVisible === false) {

                            fatLayer.labelsVisible = true
                        }
                        else {

                            fatLayer.labelsVisible = false
                        }

                    } */
                }) 

                var KHI_Layers = new GroupLayer({
                    title: "KHI Layers",
                    layers: [/* fiberLabel,popLabel,dcLayer, fatLayer,jointLabel, */customerLabel],
                  });

                var ISB_Layers = new GroupLayer({
                title: "ISB Layers",
                layers: [northCustomerLabel],
                });

                var LHR_Layers = new GroupLayer({
                title: "LHR Layers",
                layers: [centralCustomerLabel],
                });


                var south_Layer =  new GroupLayer({
                title: "South Layer",
                layers: [KHI_Layers],
                });

                var north_Layer =  new GroupLayer({
                title: "North Layer",
                layers: [ISB_Layers],
                });

                var central_Layer =  new GroupLayer({
                title: "Central Layer",
                layers: [LHR_Layers],
                });

                map.addMany([south_Layer,north_Layer,central_Layer])
            })

            
    }
    render(){

        return null
    }
}