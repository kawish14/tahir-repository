import {authenticationService} from '../../_services/authentication';

let role ={}
authenticationService.currentUser.subscribe(x => {
    return role.data = x
})

export const loginRole = (state = role) => {
    return state
}