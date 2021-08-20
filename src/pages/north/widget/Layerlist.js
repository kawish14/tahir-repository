import React from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import './css/layerlist.css'

export default class Layerlist extends React.Component{

    componentDidMount() {

        let northCustomerLabel = this.props.northCustomerLabel.northCustomer.data

     /* let dcLayer = this.props.dcLabel.dc.data
        let fatLayer = this.props.fatLabel.fat.data
        let customerLabel = this.props.customerLabel.customer.data
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

                var ISB_Layers = new GroupLayer({
                    title: "ISB Layers",
                    layers: [northCustomerLabel],
                  });

                  var north_Layer =  new GroupLayer({
                    title: "North Layer",
                    layers: [ISB_Layers],
                  });
                map.add(north_Layer)
            })

            
    }
    render(){

        return null
    }
}