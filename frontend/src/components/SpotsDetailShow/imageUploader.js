import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import catWait from "../../assets/meowWaiting.jpg"
import { addSpotImageAction, editSpotImageAction } from "../../store/spots";


function ImageUploader({spotId, imageData, type, imgnum, showPicModal, setShowPicModal}){
    const [url, setUrl] = useState(imageData.url || '');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [errorsObj, setErrorsObj] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {

    },[imgnum, showPicModal]);


    const handleSubmit = e => {
        e.preventDefault();

        if(imgnum >= 5){
            return setErrors(["Cannot add more than 5 pics to one spot!"])
        }else if(!image){
            return setErrors(["No image chosen!"])
        }else{
            setErrors([]);
            if(type === 'add'){
                return dispatch(addSpotImageAction({image}, spotId))
                    .then(() => {
                        setImage(null);
                        // setUrl(img.url);
                        setShowPicModal(-1);
                    })
                    .catch(async (res) => {

                        const data = await res.json();
                        if(data && data.errors) {
                            setErrorsObj(data.errors[0].errors);
                            setErrors(Object.values(data.errors[0].errors));
                        }
                    })
            }else if(type === 'edit'){
                if(!imageData.id){
                    return setErrors(['Unknown error, please contact the developer!'])
                }
                return dispatch(editSpotImageAction({image}, imageData.id, spotId))
                                .then(() => {
                                    setImage(null);
                                    setShowPicModal(-1);
                                })
                                .catch(async (res) => {
                                    const data = await res.json();
                                    if(data && data.errors) {
                                        setErrorsObj(data.errors[0].errors);
                                        setErrors(Object.values(data.errors[0].errors));
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
                    <label htmlFor="image_uploads" className="label-img-upload">Upload a spot image! (like png or jpg) <br />
                        <input
                        type="file"
                        placeholder="Upload a spot image(like png or jpg)"
                        id="image_uploads"
                        name="image_uploads"
                        accept="Image/jpeg, Image/png"
                        onChange={updateFile}
                        /></label>
                </div>
                <button type="submit">Submit your image</button>
            </form>
        </div>
    );
}

export default ImageUploader;
