import React from 'react'
import { loadModules } from 'esri-loader';

export default function Gpondb (props) {
        
        return (
            <div>
            {!props.alarmInfo.show ?
                <div>
                    {!props.alarmInfo.status ? // Initail Table
                        <table id="example" className="table table-bordered table-striped table-hover js-basic-example dataTable" style ={styels.table}>
                        
                            <thead style={{backgroundColor:'#7d5701', height:'20px'}}>
                            <tr>
                                <th>Alarm Info</th>
                                <th>South</th>
                                <th>North</th>
                                <th>Central</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Link Down</td>
                                <td>{props.southLOS}</td>
                                <td>{props.northLOS}</td>
                                <td>{props.centralLOS}</td>
                            </tr>
                            </tbody>
                        </table>
                    : // Query base table
                    <table id="example" className="table table-bordered table-striped table-hover js-basic-example dataTable" style ={styels.table}>
                        
                        <thead style={{backgroundColor:'#7d5701', height:'20px'}}>
                        <tr>
                            <th>Alarm Info</th>
                            <th>South</th>
                            <th>North</th>
                            <th>Central</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{props.alarmInfo.alarminfo}</td>
                            <td>{props.alarmInfo.south}</td>
                            <td>{props.alarmInfo.north}</td>
                            <td>{props.alarmInfo.central}</td>
                        </tr>
                        </tbody>
                    </table>
                    }
                </div>
                :
                // complete table
                <table id="example" className="table table-bordered table-striped table-hover js-basic-example dataTable" style ={styels.table}>
                        
                        <thead style={{backgroundColor:'#7d5701', height:'20px'}}>
                        <tr>
                            <th>Alarm Info</th>
                            <th>South</th>
                            <th>North</th>
                            <th>Central</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Link Down</td>
                            <td>{props.alarmInfo.southLOS}</td>
                            <td>{props.alarmInfo.northLOS}</td>
                            <td>{props.alarmInfo.centralLOS}</td>
                        </tr>

                        <tr>
                            <td>Online</td>
                            <td>{props.alarmInfo.southActive}</td>
                            <td>{props.alarmInfo.northActive}</td>
                            <td>{props.alarmInfo.centralActive}</td>
                        </tr>

                        <tr>
                            <td>Powered Off</td>
                            <td>{props.alarmInfo.southDyingGasp}</td>
                            <td>{props.alarmInfo.northDyingGasp}</td>
                            <td>{props.alarmInfo.centralDyingGasp}</td>
                        </tr>

                        <tr>
                            <td>GEM Packet Loss</td>
                            <td>{props.alarmInfo.southLCDGI}</td>
                            <td>{props.alarmInfo.northLCDGI}</td>
                            <td>{props.alarmInfo.centralLCDGI}</td>
                        </tr>

                        <tr>
                            <td>Low Optical Power</td>
                            <td>{props.alarmInfo.southLOP}</td>
                            <td>{props.alarmInfo.northLOP}</td>
                            <td>{props.alarmInfo.centralLOP}</td>
                        </tr>
                        </tbody>
                    </table>

            }
               
            </div>
                
        )
    }

const styels = {
    table:{
        backgroundColor: '#242424',
        color: 'white',
        fontSize:'13px'
    }
}