import React from 'react';

export default class NorthCustomer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: [],
        }

    }
    componentDidMount(){

        let _this = this

        let customerLayerNorth = this.props.item.northCustomer.data
        customerLayerNorth.outFields = ["*"]
        let loginRole = this.props.loginRole.data.role

        
        let view = this.props.view
        let map = this.props.map
        
        const name = "$feature.alarmstate"
        const cat = "$feature.category"

        const valueExpression = `When( ${name} == 0 && ${cat} == 'VIP', 'zero', ${name} == 1 && ${cat} == 'VIP', 'one',
            ${name} == 2 && ${cat} == 'VIP', 'two', ${name} == 3 && ${cat} == 'VIP', 'three', 
            ${name} == 4 && ${cat} == 'VIP', 'four', 
            ${name} == 0 && ${cat} != 'VIP', 0, ${name} == 1 && ${cat} != 'VIP', 1,
            ${name} == 2 && ${cat} != 'VIP', 2, ${name} == 3 && ${cat} != 'VIP', 3,
            ${name} == 4 && ${cat} != 'VIP', 4, 5)`

        var rendererCheck = {
            type: "unique-value", 
            valueExpression:valueExpression,
             uniqueValueInfos: [
                {
                    value: "zero",
                    symbol: {
                        type: "picture-marker", 
                        url: "images/zero.png",
                        color: "red",
                        width: "29px",
                        height: "29px"
                    }
                },  {
                    value: "one",
                    symbol: {
                        type: "picture-marker", 
                        url: "images/one.png",
                        color: "red",
                        width: "34px",
                        height: "34px"
                    }
                },  {
                    value: "two",
                    symbol: {
                        type: "picture-marker", 
                        url: "images/two.png",
                        color: "red",
                        width: "34px",
                        height: "34px"
                    }
                },  {
                    value: "three",
                    symbol: {
                        type: "picture-marker", 
                        url: "images/three.png",
                        color: "red",
                        width: "30px",
                        height: "30px"
                    }
                },  {
                    value: "four",
                    symbol: {
                        type: "picture-marker", 
                        url: "images/four.png",
                        color: "red",
                        width: "30px",
                        height: "30px"
                    }
                }, {

                    value: "0",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "green",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }, {

                    value: "1",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "blue",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }, {

                    value: "2",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "red",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }, {

                    value: "3",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "black",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }, {

                    value: "4",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "yellow",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }, {

                    value: "5",
                    symbol: {
                        type: "simple-marker", 
                        style: "circle",
                        color: "white",
                        size: "8px",
                        outline: { 
                            color: [ 255, 255, 255, 1 ],
                            width: 0.4
                          }
                    }
                }
            ]
        };
        
       
        //customerLayerNorth.listMode = "hide";

        if (loginRole === 'Admin'){

            var queryExpression = "alarmstate = 2 AND status = 'Active'"
            customerLayerNorth.definitionExpression = queryExpression
            customerLayerNorth.visible = true
            customerLayerNorth.legendEnabled = false
            customerLayerNorth.renderer =rendererCheck

            view.when(function(){
                
                let northLOS = customerLayerNorth.createQuery();
                northLOS.where = "alarmstate = 2 AND status = 'Active'"
                customerLayerNorth.queryFeatures(northLOS)
                .then(function(response){
    
                    _this.props.northLOS(response.features.length)
    
                });
              }, function(error){
                console.log(error)
              });
  
        }
        else {
            
            var queryExpression = "alarmstate = 2 AND status = 'Active'"
            customerLayerNorth.definitionExpression = queryExpression
            //customerLayerNorth.visible = false 
            customerLayerNorth.visible = true
            customerLayerNorth.legendEnabled = false
            customerLayerNorth.renderer =rendererCheck
        }
        
    }
    render(){
        return null
    }
}