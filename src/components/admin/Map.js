import React, {useEffect, useState,useRef} from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';

function Map(props){

    console.log(props.items)
    
 const Viewref = useRef(null)

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


useEffect((props) => {
   
    let view;

    loadModules(["esri/Map", "esri/views/MapView"], { css: true })
    .then(([Map, MapView]) => {

        let map = new Map({
            basemap: "satellite"
          });

        view = new MapView({
            map: map,
            container: Viewref.current,
            center:viewProperties.center,
            scale:viewProperties.scale 
          });

    })
    return console.log(view)
})
    return (
        <div style={props.styles} ref={Viewref}></div>
    )  
}

export default Map