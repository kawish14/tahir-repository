import React from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import './css/layerlist.css'

export default class Layerlist extends React.Component{

    componentDidMount() {

        let centralCustomerLabel = this.props.centralCustomerLabel.centerCustomer.data

       /*  let dcLayer = this.props.dcLabel.dc.data
        let fatLayer = this.props.fatLabel.fat.data
        let fiberLabel = this.props.fiberLabel.fiber.data
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
                    }),
                    view: view,
                    group: "bottom-right",
                    expanded: false,
                })

                view.ui.add(layerlist, 'top-right')

                var LHR_Layers = new GroupLayer({
                    title: "LHR Layers",
                    layers: [centralCustomerLabel],
                  });

                  var central_Layer =  new GroupLayer({
                    title: "Central Layer",
                    layers: [LHR_Layers],
                  });
                map.add(central_Layer)
            })

            
    }
    render(){

        return null
    }
}