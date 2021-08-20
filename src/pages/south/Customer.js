import React, { useState, useEffect } from 'react';

export default class Customer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: [],
            power:null
        }

    }
    componentDidMount(){
        let _this =this

        let customerLayer = this.props.item.customer.data
        customerLayer.outFields = ["*"]
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
            //field: "alarminfo",
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
        
        //customerLayer.listMode = "hide";
        
        if (loginRole === 'Admin'){

            var queryExpression = "alarmstate = 2 AND status = 'Active'"
            customerLayer.definitionExpression = queryExpression

            customerLayer.visible = true
            customerLayer.legendEnabled = false
            customerLayer.renderer =rendererCheck

            view.when(function(){

                let southLOS = customerLayer.createQuery();
                southLOS.where = "alarmstate = 2 AND status = 'Active'"
                customerLayer.queryFeatures(southLOS)
                .then(function(response){
    
                    _this.props.southLOS(response.features.length)
                    _this.props.viewInstance(view)
    
                });
              }, function(error){
                console.log(error)
              });
  
        }
        else {
            
            var queryExpression = "alarmstate = 2 AND status = 'Active'"
            customerLayer.definitionExpression = queryExpression
            //customerLayer.visible = false 
            customerLayer.visible = true
            customerLayer.legendEnabled = false
            customerLayer.renderer =rendererCheck
            
        }
    }

    render(){

        return null
    }
}