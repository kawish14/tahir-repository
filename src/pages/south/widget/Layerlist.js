import React, { useState, useEffect } from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import './css/layerlist.css'

export default function  Layerlist (props) {

    useEffect(() => {

        var south_Layer 

        let customerLabel = props.customerLabel.customer.data
        let view = props.view
        let map = props.map

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

                var KHI_Layers = new GroupLayer({
                    title: "KHI Layers",
                    layers: [customerLabel],
                  });

                south_Layer =  new GroupLayer({
                    title: "South Layer",
                    layers: [KHI_Layers],
                  });

                map.add(south_Layer)
            })
            .catch((err) => {
                console.error(err)
            })

            return function clean(){

                map.remove(south_Layer)
            }

    }, [props])

        return null       
    }

 
    
