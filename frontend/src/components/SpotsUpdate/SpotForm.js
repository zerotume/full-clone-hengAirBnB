import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createSpotAction, updateSpotAction } from "../../store/spots";
import HeaderBar from "../HeaderBar";


function SpotForm({spot, formType, sessionLoaded}){
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState(spot.name || '');
    const [address, setAddress] = useState(spot.address || '');
    const [city, setCity] = useState(spot.city || '');
    const [state, setState] = useState(spot.state || '');
    const [country, setCountry] = useState(spot.country || '');
    const [lat, setLat] = useState(spot.lat || 0);
    const [lng, setLng] = useState(spot.lng || 0);
    const [price, setPrice] = useState(spot.price || 0);
    const [description, setDescription] = useState(spot.description || '');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    if(!user) {
        return (
            <>
                <HeaderBar sessionLoaded={sessionLoaded} main={false}/>
                <div className="sub-page-holder">
                    <span className="log-in-warning">You're not logged in!</span>
                </div>
            </>
        )
    }

    const actions = {
        "create":createSpotAction,
        "update":updateSpotAction
    }

    const handleSubmit = async e => {
        e.preventDefault();
        spot = {
            ...spot,
            name,
            address,
            city,
            state,
            country,
            lat,
            lng,
            price,
            description
        }
        setErrors([]);
        // console.log(spot);

        let newSpot = await dispatch(actions[formType](spot,spot.id))
                    // .then(async (res) => {
                    //     if(!res.errors)
                    //     return res;
                    // })
                    .catch(async prevData => {
                        if(!prevData.name){
                            const data = await prevData.json();
                            if(data && data.errors) setErrors(Object.values(data.errors[0].errors));
                        }
                        // console.log(prevData);
                    });
        console.log(newSpot);
        if(newSpot)history.push(`/spots/${newSpot.id}`);
    }

    return(
        <div className="sub-page-holder">
            <HeaderBar sessionLoaded={sessionLoaded} main={false}/>
                <form className="catbnb-form spot-form" onSubmit={handleSubmit}>
                <h2>{formType}</h2>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Spot Name:
                <input
                type="text"
                placeholder="Name your spot"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </label>
            <label>
                Address:
                <input
                type="text"
                placeholder="Address of your spot"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </label>
            <label>
                City:
                <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </label>
            <label>
                State:
                <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
            </label>
            <label>
                Country:
                <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </label>
            <label>
                Lat:
                <input
                type="number"
                placeholder="Lat between -90 to 90"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                />
            </label>
            <label>
                Lng:
                <input
                type="number"
                placeholder="Lng between -180 to 180"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                />
            </label>
            <label>
                Price:
                <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                />
            </label>
            <label>
                Description:
                <input
                type="textarea"
                placeholder="Describe your spot!"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </label>
            <input type="Submit" value={formType} />
            </form>
        </div>
    );




}

export default SpotForm;
