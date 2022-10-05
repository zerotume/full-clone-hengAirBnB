import { csrfFetch } from "./csrf";

const GET_USER_REVIEWS = 'review/getUserReviews';
const GET_SPOT_REVIEWS = 'review/getSpotReviews';
const ADD_ONE_REVIEW = 'review/addOneReview';
const EDIT_ONE_REVIEW = 'review/editOneReview';
const DELETE_ONE_REVIEW = 'review/deleteOneReview';
const RESET_MY_REVIEWS = 'review/resetMyReviews';

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

const getSpotReviews = (spotReviews) => {
    return {
        type:GET_SPOT_REVIEWS,
        spotReviews
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
        dispatch(getSpotReviews(data.Reviews));
        return data;
    }
}

export const createReviewAction = (review) => async dispatch => {
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
