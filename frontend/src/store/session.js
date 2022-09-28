
import { resetMyBookings } from "./bookings";
import { csrfFetch } from "./csrf";
import { resetMySpots } from "./spots";


const LOGIN_SESSION = 'session/loginSession';
const LOGOUT_SESSION = 'session/logoutSession'

const loginSession = (user) => {
    return {
        type:LOGIN_SESSION,
        user
    };
}

const logoutSession = () => {
    return{
        type:LOGOUT_SESSION
    };
}

export const restoreSession = () => async dispatch => {
    const response = await fetch('/api/mypage');

    if(response.ok){
        const obj = await response.json();

        dispatch(loginSession(obj.user));
        return response;
    }
}

export const signupAction = (user) => async dispatch => {
    const {firstName, lastName, email, username, password, image} = user;
    const formData = new FormData();
    formData.append("username", username)
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("password", password)

    if(image) formData.append("image",image);


    const response = await csrfFetch('/api/users/signup',{
        method:"POST",
        headers:{
            "Content-Type":"multipart/form-data"
        },
        body: formData
    });

    if(response.ok){
        const obj = await response.json();
        dispatch(loginSession(obj.user));
        return response;
    }
}



export const loginAction = (user) => async dispatch => {
    const {credential, password} = user;
    const response = await csrfFetch('/api/users/login', {
        method:'POST',
        body: JSON.stringify({credential, password})
    });

    const obj = await response.json();
    dispatch(loginSession(obj.user));
    return response;
}

export const logoutAction = () => async dispatch => {
    const response = await csrfFetch('/api/users',{
        method:'DELETE'
    });
    if(response.ok){
        dispatch(resetMySpots());
        dispatch(resetMyBookings());
        dispatch(logoutSession());
        return response;
    }
}

const initialState = {user:null};

const sessionReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case LOGIN_SESSION:
            newState.user = action.user;
            return newState;
        case LOGOUT_SESSION:
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;
