import * as ActionTypes from './ActionTypes';


export const alarmInfo = (trench) => {
    let alarmingoData = {

        Active:{
            south:null,
            north:null,
            central:null
        },
        DyingGasp:{
            south:null,
            north:null,
            central:null
        },
        LOSi:{
            south:null,
            north:null,
            central:null
        },
        LCDGI:{
            south:null,
            north:null,
            central:null
        },
        LOPI:{
            south:null,
            north:null,
            central:null
        }
    }
        return {
        type: ActionTypes.ALARMINFO_ADD,
        payload: alarmingoData
        }
};
