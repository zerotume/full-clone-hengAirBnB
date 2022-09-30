import { useState } from "react";
import catWait from "../../assets/meowWaiting.jpg"


function imageUploader({image, type}){
    const [url, setUrl] = useState(image.url || '');
    const [image, setImage] = useState(null);

    const handleSubmit = e => {

    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
      };

    return(
        <form className="img-form spot-img-form" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className='img-form-input-holder spot-img-form-input-holder'>
                <label htmlFor="image_uploads" className="label-img-upload">Upload your avanter (like png or jpg)
                    <input
                    type="file"
                    placeholder="Upload a spot image(like png or jpg)"
                    id="image_uploads"
                    name="image_uploads"
                    accept="Image/jpg, Image/png"
                    onChange={updateFile}
                    /></label>
            </div>
            <button type="submit">Submit your image</button>
        </form>
    );
}

export default imageUploader;
