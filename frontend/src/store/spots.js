
import { csrfFetch } from "./csrf";


// const LOGIN_SESSION = 'session/loginSession';
// const LOGOUT_SESSION = 'session/logoutSession';

const GET_ALL_SPOTS = 'session/getAllSpots';

// const loginSession = (user) => {
//     return {
//         type:LOGIN_SESSION,
//         user
//     };
// }

const readAllSpots = (spots) => {
    return{
        type:GET_ALL_SPOTS,
        spots,
    }
}

// const logoutSession = () => {
//     return{
//         type:LOGOUT_SESSION
//     };
// }

export const readAllSpotsAction = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if(response.ok){
        const data = await response.json();
        console.log(data)
        dispatch(readAllSpots(data.Spots));
        return response;
    }
}

// export const signupAction = (user) => async dispatch => {
//     const response = await csrfFetch('/api/users/signup',{
//         method:"POST",
//         body: JSON.stringify({...user})
//     });

//     if(response.ok){
//         const obj = await response.json();
//         dispatch(loginSession(obj.user));
//         return response;
//     }
// }



// export const loginAction = (user) => async dispatch => {
//     const {credential, password} = user;
//     const response = await csrfFetch('/api/users/login', {
//         method:'POST',
//         body: JSON.stringify({credential, password})
//     });

//     const obj = await response.json();
//     dispatch(loginSession(obj.user));
//     return response;
// }

// export const logoutAction = () => async dispatch => {
//     const response = await csrfFetch('/api/users',{
//         method:'DELETE'
//     });
//     if(response.ok){
//         dispatch(logoutSession());
//         return response;
//     }
// }




const spotsReducer = (state = {}, action) => {
    let newState = {...state};
    switch(action.type){
        case GET_ALL_SPOTS:
            newState.spotsArray = action.spots;
            action.spots.forEach(e => newState[e.id] = e);
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
