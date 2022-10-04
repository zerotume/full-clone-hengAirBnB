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
