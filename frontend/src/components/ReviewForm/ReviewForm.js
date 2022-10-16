import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReviewAction, readSpotReviewsAction, updateReviewAction } from "../../store/reviews";
import { readOneSpotAction } from "../../store/spots";
import "./ReviewForm.css";



function ReviewForm({spotId, review,
                        showReviewEdit, setShowReviewEdit,
                        showReviewCreate, setShowReviewCreate,
                        sessionLoaded, type, setRenderer}){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [reviewContent, setReviewContent] = useState(review.review || '');
    // const [stars, setStars] = useState(review.stars || 1);
    const [reviewStars, setReviewStars] = useState(review.stars || 0);
    const [allstars, setAllstars] = useState('☆☆☆☆☆');
    const [showStars, setShowStars] = useState('');
    //this will make a render before the sudden black
    //so the sudden black will be gone
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const actions = {
        "create":createReviewAction,
        "edit":updateReviewAction
    }

    const handleStars = async e => {
        e.preventDefault()
        if (e.target.value == 1) {
            setAllstars('☆☆☆☆★')
        }
        if (e.target.value == 2) {
            setAllstars('☆☆☆★★')
        }
        if (e.target.value == 3) {
            setAllstars('☆☆★★★')
        }
        if (e.target.value == 4) {
            setAllstars('☆★★★★')
        }
        if (e.target.value == 5) {
            setAllstars('★★★★★')
        }
        setReviewStars(e.target.value)
    }

    // const changeShowStar = e => {

    // }

    // const changeNoStar = e => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setShowStars('')
    //     console.log('left');
    // }



    useEffect(() => {
        setReviewContent(review.review || '');
        // console.log(showStars);
        // console.log(allstars);
    }, [showReviewEdit]);

    const handleSubmit = async e => {
        e.preventDefault();
        if(reviewContent.length === 0)return setErrors(["Type in your review!"]);
        console.log(reviewStars);
        if(reviewStars < 1 || reviewStars > 5)return setErrors(["Choose how many stars you want to give!"]);

        review = {
            ...review,
            review:reviewContent,
            stars:reviewStars,
            userId:user.id,
            spotId:spotId
        };
        // let data = await dispatch(actions[formType](channel));
        let res = await dispatch(actions[type](review));
        setErrors([]);
        if(res.errors){
            // const data = await res.json();
            // console.log(data);
        }else{
            // if(type === "create")setShowReviewCreate(false);
            if(type === "edit")setShowReviewEdit(-1);
            dispatch(readSpotReviewsAction(spotId));
            setReviewContent('');
            setReviewStars(0);
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
                < div className="star-rating-container" >
                            <div className="radio-label-container">
                                <label htmlFor='r6' className='rating-label-all'>{showStars || allstars}</label>
                                <input type="radio" id='r1' className="rating-radio" value="5"
                                    onClick={handleStars}
                                    ></input>
                                <label htmlFor='r1'
                                    className='rating-label'
                                    // onMouseEnter={() => setShowStars('☆☆☆☆★')}
                                    // onPointerLeave={changeNoStar}
                                    >☆</label>
                                <input type="radio" id='r2' className="rating-radio" value="4"
                                    onClick={handleStars}
                                    ></input>
                                <label htmlFor='r2'
                                    className='rating-label'
                                    // onMouseEnter={() => setShowStars('☆☆☆★★')}
                                    // onPointerLeave={changeNoStar}
                                    >☆</label>
                                <input type="radio" id='r3' className="rating-radio" value="3"
                                    onClick={handleStars}
                                    ></input>
                                <label htmlFor='r3'
                                    className='rating-label'
                                    // onMouseEnter={() => setShowStars('☆☆★★★')}
                                    // onPointerLeave={changeNoStar}
                                    >☆</label>
                                <input type="radio" id='r4' className="rating-radio" value="2"
                                    onClick={handleStars}
                                    ></input>
                                <label htmlFor='r4'
                                    className='rating-label'
                                    // onMouseEnter={() => setShowStars('☆★★★★')}
                                    // onPointerLeave={changeNoStar}
                                    >☆</label>
                                <input type="radio" id='r5' className="rating-radio" value="1"
                                    onClick={handleStars}
                                    ></input>
                                <label htmlFor='r5'
                                    className='rating-label'
                                    // onMouseEnter={() => setShowStars('★★★★★')}
                                    // onPointerLeave={changeNoStar}
                                    >☆</label>
                            </div>
                        </div >
                <button className="review-form-input-button"
                    type="Submit"
                 >{type==='create'?'Send it!':'Confirm Edit'} <i class="fa-solid fa-check"></i></button>
            </form>
        </div>
    )

}


export default ReviewForm;
