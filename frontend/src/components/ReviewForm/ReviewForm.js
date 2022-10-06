import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReviewAction, readSpotReviewsAction, updateReviewAction } from "../../store/reviews";
import { readOneSpotAction } from "../../store/spots";



function ReviewForm({spotId, review,
                        showReviewEdit, setShowReviewEdit,
                        showReviewCreate, setShowReviewCreate,
                        sessionLoaded, type, setRerender}){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [reviewContent, setReviewContent] = useState(review.content || '');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const actions = {
        "create":createReviewAction,
        "edit":updateReviewAction
    }


    useEffect(() => {
        setReviewContent(review.content || '');
    }, [showReviewEdit]);

    const handleSubmit = async e => {
        e.preventDefault();
        review = {
            ...review,
            review:reviewContent
        };
        // let data = await dispatch(actions[formType](channel));
        let data = await dispatch(actions[formType](channel));
        setErrors([]);
        if(data?.errors){

        }else{
            if(type === "create")setShowReviewCreate(false);
            if(type === "edit")setShowReviewEdit(-1);
            dispatch(readSpotReviewsAction(spotId));
            setReviewContent('');
            return setRenderer({});
        }
        // if(data.errors){
        //     //todo: error handling
        // }else{
        // console.log('prev', messageContent);
        // socket.emit("updateChannelmessage", {channelmessage, serverId, channelId})
        // if(formType === "Create Channel")setShowChannelCreate(false);


        // console.log('after', messageContent);
        // }
    }

    return sessionLoaded && (
        <div className="review-form-wrapper">
            <form className="catbnb-form review-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="review-form-label">
                    <label
                        style={{color:(reviewContent.length >= 300)?'#f08486':''}}
                    > {type==='create'?'Send review':'Update review here'}: {reviewContent.length}/300
                        </label>
                        <textarea
                        type="text"
                        placeholder={type==='create'?"Share your exprience!":"How you wanna change your review?"}
                        minlength="1"
                        maxlength="300"
                        style={{border:(reviewContent.length >= 300)?'2px red solid':''}}
                        title="1 to 300 characters for the review!"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        required
                        />
                </div>
                <button className="review-form-input-button"
                    type="Submit"
                 >{type==='create'?'Send it!':'Confirm Edit'} <i class="fa-solid fa-check"></i></button>
            </form>
        </div>
    )

}


export default ReviewForm;
