import _ from 'lodash';

const user = (state = {}, action) => {
    
    state = {currentUser: JSON.parse(localStorage.getItem("currentUser"))};
    
    const newState = _.merge({}, state)

    switch (action.type) {
        case "USER_REGISTERED":
            newState.registeredUser = action.result;
            return newState;
        case "USER_UPDATED":
            newState.updatedUser = action.result;
            return newState;
        case "USER_LOGIN":
            newState.currentUser = action.result;
            return newState;
        case "USER_LOGOUT":
            newState.updatedUser = action.result;
            return newState;
        case "USER_REFRESHED":
            newState.refreshUser = action.result;
            // newState.schoolList = action.result;
            //may need to create new element to state for this but technically updating the user so may try to use existing state tool
            return newState;
        case "FAVORITE_DELETED":
            newState.deletedSchool = action.result;
            // newState.schoolList = action.result;
            //may need to create new element to state for this but technically updating the user so may try to use existing state tool
            return newState;
        case "FAVORITE_ADDED":
            newState.addedSchool = action.result;
            // newState.schoolList = action.result;
            //may need to create new element to state for this but technically updating the user so may try to use existing state tool
            return newState;
        default:
            return newState;
        }
}

export default user