import * as ActionTypes from '../ActionTypes';

export const AlarmInfo = (state = { 
    isLoading: true,
    errMess: null,
    alarmInfo:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ALARMINFO_ADD:
            return {...state, isLoading: false, errMess: null, alarmInfo: action.payload};

        case ActionTypes.ALARMINFO_LOADING:
            return {...state, isLoading: true, errMess: null, alarmInfo: []}

        case ActionTypes.ALARMINFO_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};