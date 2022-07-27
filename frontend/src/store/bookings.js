import { bindActionCreators } from "redux";
import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = 'booking/getUserBookings';
// const GET_ONE_BOOKING = 'booking/getOneBooking';
const GET_SPOT_BOOKINGS = 'booking/getSpotBookings';
const ADD_ONE_BOOKING = 'booking/addOneBooking';
const EDIT_ONE_BOOKING = 'booking/editOneBooking';
const DELETE_ONE_BOOKING = 'booking/deleteOneBooking';

const getUserBookings = (myBookings) => {
    return {
        type:GET_USER_BOOKINGS,
        myBookings
    }
}

// const getOneBooking = (currentBooking) => {
//     return {
//         type:GET_ONE_BOOKING,
//         currentBooking
//     }
// }

const getSpotBookings = (spotBookings) => {
    return {
        type: GET_SPOT_BOOKINGS,
        spotBookings
    }
}

const createOneBooking = (booking) => {
    return {
        type:ADD_ONE_BOOKING,
        booking
    }
}

const updateOneBooking = (booking) => {
    return {
        type:EDIT_ONE_BOOKING,
        booking
    }
}

const deleteOneBooking = (id) => {
    return{
        type: DELETE_ONE_BOOKING,
        id
    }
}

export const deleteBookingAction = (id) => async dispatch => {
    const response = await csrfFetch(`/api/bookngs/${id}`,{
        method:'DELETE'
    });

    if(response.ok){
        const data = await response.json();
        dispatch(deleteOneBooking(id));
        return data;
    }
}

export const createBookingAction = (booking) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${booking.spotId}/bookings`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(booking)
    });

    if(response.ok){
        const newBooking = await response.json();
        dispatch(createOneBooking(newBooking));
        return newBooking;
    }
}

export const updateBookingAction = (booking) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(booking)
    });

    if(response.ok){
        const newBooking = await response.json();
        dispatch(updateOneBooking(newBooking));
        return newBooking;
    }
}

export const readUserBookingsAction = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/mybooking');

    if(response.ok){
        const data = await response.json();
        dispatch(getUserBookings(data.Bookings));
        return data;
    }
}

export const readSpotBookingsAction = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if(response.ok){
        const data = await response.json();
        dispatch(getSpotBookings(data.Bookings));
        return data;
    }
}

const bookingReducer = (state = {}, action) => {
    let newState = {...state};
    switch(action.type){
        case GET_USER_BOOKINGS:
            newState.myBookings = {};
            newState.myBookings.myBookingsArray = action.myBookings;
            action.myBookings.forEach(e => {
                newState.myBookings[e.id] = e;
            });
            return newState;
        case GET_SPOT_BOOKINGS:
            newState.spotBookings = {};
            newState.spotBookings.spotBookingsArray = action.spotBookings;
            action.spotBookings.forEach(e => {
                // console.log(e.id)
                newState.spotBookings[e.id] = e;
            });
            return newState;
        case ADD_ONE_BOOKING:
        case EDIT_ONE_BOOKING:
            newState.myBookings = {
                ...state.myBookings,
                [action.booking.id]:{
                    ...state.myBookings[action.booking.id],
                    ...action.booking,
                }
            };
            delete newState.myBookings.myBookingsArray;
            newState.myBookings.myBookingsArray = Object.values(newState.myBookings);
            return newState;
        case DELETE_ONE_BOOKING:
            newState.myBookings = {...state.myBookings};
            newState.spotBookings = {...state.spotBookings};
            if(newState.myBookings[action.id]){
                delete newState.myBookings[action.id];
                delete newState.myBookings.myBookingsArray;
                newState.myBookings.myBookingsArray = Object.values(newState.myBookings);
            }
            if(newState.spotBookings[action.id]){
                delete newState.spotBookings[action.id];
                delete newState.spotBookings.spotBookingsArray;
                newState.spotBookings.spotBookingsArray = Object.values(newState.spotBookings);
            }
            return newState;
        default:
            return newState;
    }
}

export default bookingReducer;
