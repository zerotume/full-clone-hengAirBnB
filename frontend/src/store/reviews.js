import { csrfFetch } from "./csrf";

const GET_USER_REVIEWS = 'reviews/getUserReviews';
const GET_SPOT_REVIEWS = 'reviews/getSpotReviews';
const ADD_ONE_REVIEW = 'reviews/addOneReview';
const EDIT_ONE_REVIEW = 'reviews/editOneReview';
const DELETE_ONE_REVIEW = 'reviews/deleteOneReview';
const RESET_MY_REVIEWS = 'reviews/resetMyReviews';

export const resetMyReviews = () => {
    return{
        type:RESET_MY_REVIEWS
    }
}

const getUserReviews = (myReviews) => {
    return {
        type:GET_USER_REVIEWS,
        myReviews
    }
}

const getSpotReviews = (spotReviews, reviewed) => {
    return {
        type:GET_SPOT_REVIEWS,
        spotReviews,
        // booked,
        reviewed
    }
}

const createOneReview = (review) => {
    return {
        type:ADD_ONE_REVIEW,
        review
    }
}

const updateOneReview = (review) => {
    return {
        type:EDIT_ONE_REVIEW,
        review
    }
}

const deleteOneReview = (id) => {
    return {
        type:DELETE_ONE_REVIEW,
        id
    }
}

export const readUserReviewsAction = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/myreview');

    if(response.ok){
        const data = await response.json();
        dispatch(getUserReviews(data.Reviews));
        return data;
    }
}

export const readSpotReviewsAction = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if(response.ok){
        const data = await response.json();
        // console.log(data);
        dispatch(getSpotReviews(data.Reviews, data.reviewed));
        return data;
    }
}

export const createReviewAction = (review) => async dispatch => {
    console.log(review);
    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(review)
    });

    if(response.ok){
        const newReivew = await response.json();
        dispatch(createOneReview(newReivew));
        return newReivew;
    }
}

export const updateReviewAction = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(review)
    });

    if(response.ok){
        const newReview = await response.json();
        dispatch(updateOneReview(newReview));
        return newReview;
    }
}

export const deleteReviewAction = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method:'DELETE'
    });

    if(response.ok){
        const data = await response.json();
        dispatch(deleteOneReview(id));
        return data;
    }
}

const reviewReducer = (state = {myReviews:{}}, action) => {
    let newState = {...state};
    switch(action.type){
        case RESET_MY_REVIEWS:
            newState.myReviews = {};
            return newState;

        case GET_USER_REVIEWS:
            newState.myReviews = {};
            newState.myReviews.myReviewsArray = action.myReviews;
            action.myReviews.forEach(e => {
                newState.myReviews[e.id] = e;
            });
            return newState;

        case GET_SPOT_REVIEWS:
            newState.spotReviews = {};
            newState.spotReviews.reviewed = action.reviewed;
            newState.spotReviews.spotReviewsArray = action.spotReviews;
            action.spotReviews.forEach(e => {
                newState.spotReviews[e.id] = e;
            });
            return newState;

        case ADD_ONE_REVIEW:
        case EDIT_ONE_REVIEW:
            newState.myReviews = {
                ...state.myReviews,
                [action.review.id]:{
                    ...newState.myReviews[action.review.id],
                    ...action.review,
                }
            }
            if(newState.spotReviews[action.review.id]){
                newState.spotReviews = {
                    ...state.spotReviews,
                    [action.review.id]:{
                        ...newState.spotReviews[action.review.id],
                        ...action.review,
                    }
                }
            }
            return newState;
            //remember to dispatch the spot review
        case DELETE_ONE_REVIEW:
            newState.myReviews = {...state.myReviews};
            newState.spotReviews = {...state.spotReviews};
            delete newState.spotReviews.reviewed;
            if(newState.myReviews[action.id]){
                delete newState.myReviews[action.id];
                delete newState.myReviews.myReviewsArray;
                newState.myReviews.myReviewsArray = Object.values(newState.myReviews);
            }
            if(newState.spotReviews[action.id]){
                delete newState.spotReviews[action.id];
                delete newState.spotReviews.spotReviewsArray;
                newState.spotReviews.spotReviewsArray = Object.values(newState.spotReviews);
            }
            newState.spotReviews.reviewed = false;
            return newState;
        default:
            return newState;
    }
}

export default reviewReducer;
