import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import catWait from "../../assets/meowWaiting.jpg"
import { addReviewImageAction, deleteReviewImageAction, editReviewImageAction } from "../../store/reviews";
import { addSpotImageAction, deleteSpotImageAction, editSpotImageAction } from "../../store/spots";
import "./ImageUploader.css";

function ReviewImageUploader({spotId ,reviewId, imageData, type, imgnum, showReviewPicModal, setShowReviewPicModal}){
    //only reviewId and url needed for backend
    //redux store action requires spotId

    const [url, setUrl] = useState(imageData?.url || '');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [errorsObj, setErrorsObj] = useState({});
    const [uploading, setUploading] = useState('');
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

    },[imgnum, showReviewPicModal]);

    const deleteClick = e => {
        e.preventDefault();
        if(!imageData.id){
            return setErrors(['Unknown error, please contact the developer!'])
        }
        return dispatch(deleteReviewImageAction(imageData.id, spotId))
                        .then(() => {
                            setImage(null);
                            setShowReviewPicModal(-1);
                        })
                        .catch(async (res) => {
                            const data = await res.json();
                            if(data && data.errors) {
                                setErrorsObj(data.errors[0].errors);
                                setErrors(Object.values(data.errors[0].errors));
                            }
                        });
    }


    const handleSubmit = e => {
        e.preventDefault();

        if(!image){
            return setErrors(["No image chosen!"])
        }else{
            if(imgnum >= 5){
                return setErrors(["Cannot add more than 5 pics to one spot!"])
            }
            setErrors([]);
            setDisabled(true);
            setUploading('Uploading! Please wait a sec...')
            if(type === 'add'){
                return dispatch(addReviewImageAction({image}, reviewId, spotId))
                    .then(() => {
                        setImage(null);
                        // setUrl(img.url);
                        setShowReviewPicModal(-1);
                        setDisabled(false);
                        setUploading('');
                    })
                    .catch(async (res) => {
                        const data = await res.json();
                        if(data && data.errors) {
                            setErrorsObj(data.errors[0].errors);
                            setErrors(Object.values(data.errors[0].errors));
                            setDisabled(false);
                            setUploading('');
                        }
                    })
            }else if(type === 'edit'){
                if(!imageData.id){
                    return setErrors(['Unknown error, please contact the developer!'])
                }
                return dispatch(editReviewImageAction({image}, imageData.id, spotId))
                                .then(() => {
                                    setImage(null);
                                    setShowReviewPicModal(-1);
                                    setDisabled(false);
                                    setUploading('');
                                })
                                .catch(async (res) => {
                                    const data = await res.json();
                                    if(data && data.errors) {
                                        setErrorsObj(data.errors[0].errors);
                                        setErrors(Object.values(data.errors[0].errors));
                                        setDisabled(false);
                                        setUploading('');
                                    }
                                });
            }else{
                return setErrors(["Unknown Error, please contact the developer."]);
            }
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file){
            setImage(file);
            const imgUrl = URL.createObjectURL(file);
            setUrl(imgUrl);
            URL.revokeObjectURL(file);
        }
    };

    return(
        <div className="img-upload-holder spot-img-upload-holder">
            {url && (<img src={url}/>)}
            <form className="img-form spot-img-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='img-form-input-holder spot-img-form-input-holder'>
                    <label htmlFor="image_uploads"
                        className="label-img-upload">Upload a spot image! (like png or jpg) <br /></label>

                    <input
                    type="file"
                    id="image_uploads"
                    name="image_uploads"
                    accept="Image/jpeg, Image/png"
                    title=" "
                    onChange={updateFile}
                    disabled={disabled}
                    />
                </div>
                <button disabled={disabled} className={`${disabled?'img-submit-disabled':'img-submit'} spot-img-submit`} type="submit">Submit your image</button>
            </form>
            {imageData && (<button disabled={disabled} className={`${disabled?'img-delete-disabled':'img-delete'} spot-img-delete`} onClick={deleteClick}>Delete this image</button>)}
            <p>{uploading}</p>
        </div>
    );
}

export default ReviewImageUploader;
