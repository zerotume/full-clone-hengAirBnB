
import { csrfFetch } from "./csrf";


// const LOGIN_SESSION = 'session/loginSession';
// const LOGOUT_SESSION = 'session/logoutSession';

const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_ONE_SPOT = 'spots/getOneSpot';
const GET_USER_SPOTS = 'spots/getUserSpots';
const ADD_ONE_SPOT = 'spots/addOneSpot';
const EDIT_ONE_SPOT = 'spots/editOneSpot';
const DELETE_ONE_SPOT = 'spots/deleteOneSpot';
const RESET_MY_SPOTS = 'booking/resetMySpots';



export const resetMySpots = () => {
    return {
        type:RESET_MY_SPOTS
    }
}

// const loginSession = (user) => {
//     return {
//         type:LOGIN_SESSION,
//         user
//     };
// }

const getUserSpots = (mySpots) => {
    return{
        type:GET_USER_SPOTS,
        mySpots,
    }
}

const readAllSpots = (spots) => {
    return{
        type:GET_ALL_SPOTS,
        spots,
    }
}

const readOneSpot = (currentSpot) => {
    return{
        type:GET_ONE_SPOT,
        currentSpot
    }
}

const createOneSpot = (spot) => {
    return{
        type:ADD_ONE_SPOT,
        spot
    }
}

const updateOneSpot = (spot) => {
    return{
        type:EDIT_ONE_SPOT,
        spot
    }
}

const deleteOneSpot = (id) => {
    return{
        type:DELETE_ONE_SPOT,
        id
    }
}

// const logoutSession = () => {
//     return{
//         type:LOGOUT_SESSION
//     };
// }

export const deleteSpotAction = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`,{
        method:'DELETE'
    });

    if(response.ok){
        const data = await response.json();
        dispatch(deleteOneSpot(id));
        return data;
    }


}

export const createSpotAction = (payload) => async dispatch => {
    const response = await csrfFetch('/api/spots',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
    });

    if(response.ok){
        const newSpot = await response.json();
        dispatch(createOneSpot(newSpot));
        return newSpot;
    }
}

export const addSpotImageAction = (payload, id) => async dispatch => {
    const {image} = payload;
    const formData = new FormData();
    if(image) formData.append("image", image);

    const response = await csrfFetch(`/api/spots/${id}/images`,{
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if(response.ok){
        dispatch(readOneSpotAction(id));
    }
}

export const editSpotImageAction = (payload, id, spotId) => async dispatch => {
    const {image} = payload;
    const formData = new FormData();
    if(image) formData.append("image", image);

    const response = await csrfFetch(`/api/images/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if(response.ok){
        dispatch(readOneSpotAction(spotId));
    }
}

export const deleteSpotImageAction = (id, spotId) => async dispatch => {

    const response = await csrfFetch(`/api/images/${id}`,{
        method: "DELETE"
    });

    if(response.ok){
        dispatch(readOneSpotAction(spotId));
    }
}

// export const changeSpotImageAction = (payload, id, spotId) => async dispatch => {
//     const {image} = payload;
//     const formData = new FormData();
//     if(image) formData.append("image", image);

//     const response = await csrfFetch(`/api/spots/${id}/images`,{
//         method: "POST",
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//         body: formData,
//     });

//     if(response.ok){
//         dispatch(readOneSpotAction(id));
//     }
// }

export const updateSpotAction = (payload,id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
    });

    if(response.ok){
        const newSpot = await response.json();
        dispatch(updateOneSpot(newSpot));
        return newSpot;
    }
}

export const readUserSpotsAction = () => async dispatch => {
    const response = await csrfFetch('/api/spots/myspots');

    if(response.ok){
        const data = await response.json();
        // console.log(data)
        dispatch(getUserSpots(data));
        return data;
    }
}

export const readAllSpotsAction = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if(response.ok){
        const data = await response.json();
        // console.log(data)
        dispatch(readAllSpots(data.Spots));
        return response;
    }
}

export const readOneSpotAction = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if(response.ok){
        const data = await response.json();
        dispatch(readOneSpot(data));
        return data;
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
        case RESET_MY_SPOTS:
            newState.mySpots = {};
            return newState;
        case GET_ALL_SPOTS:
            newState.spotsArray = action.spots;
            action.spots.forEach(e => newState[e.id] = e);
            return newState;
        case GET_ONE_SPOT:
            newState.currentSpot = action.currentSpot;
            return {...newState, [action.currentSpot.id]:{
                ...newState[action.currentSpot.id],
                ...action.currentSpot
            }};
        case GET_USER_SPOTS:
            newState.mySpots = {};
            newState.mySpots.mySpotsArray = action.mySpots;
            action.mySpots.forEach(e => newState.mySpots[e.id] = e);
            return newState;
        case ADD_ONE_SPOT:
        case EDIT_ONE_SPOT:
            newState = {...state, [action.spot.id]:{
                ...state[action.spot.id],
                ...action.spot
            }};
            delete newState.spotsArray;
            newState.spotsArray = Object.values(newState);
            newState.mySpots = {
                ...newState.mySpots,
                [action.spot.id]:{
                    ...action.spot
                }
            }
            delete newState.mySpots.mySpotsArray;
            newState.mySpots.mySpotsArray = Object.values(newState.mySpots);
            return newState;
        case DELETE_ONE_SPOT:
            delete newState[action.id];
            delete newState.spotsArray;
            newState.spotsArray = Object.values(newState);
            newState.mySpots = {
                ...newState.mySpots,
            }
            delete newState.mySpots[action.id]
            delete newState.mySpots.mySpotsArray;
            newState.mySpots.mySpotsArray = Object.values(newState.mySpots);
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
