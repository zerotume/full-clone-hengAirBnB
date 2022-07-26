import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readUserSpotsAction } from "../../store/spots";
import HeaderBar from "../HeaderBar";

function MySpots({sessionLoaded}){
    const user = useSelector(state => state.session.user);

const dispatch = useDispatch();
    let mySpots = useSelector(state => state.spots.mySpots);
    useEffect(() => {
        dispatch(readUserSpotsAction());
    },[dispatch]);
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

    if(!mySpots || !mySpots.mySpotsArray)return null;

    return(
        <>
            <HeaderBar sessionLoaded={sessionLoaded} main={false}/>
            <div className="sub-page-holder">
                <table className="my-spots-table">
                    <tr className="my-spots-table-header my-table-header">
                        <td>
                            Delete?
                        </td>
                        <td>
                            Spots
                        </td>
                        <td>
                            Address
                        </td>
                        <td>
                            Location
                        </td>
                        <td>
                            Price
                        </td>
                        <td>
                            Last Modified
                        </td>
                    </tr>
                    {mySpots.mySpotsArray.map(e => (
                        <tr className="my-spots-table-content my-table-content">
                            <td>
                                <button><i class="fa-solid fa-circle-trash"></i></button>
                            </td>
                            <td className="my-spots-table-img-text my-table-img-text">
                                <img src={e.previewImage[0].url}></img>
                                <span>{e.name}</span>
                            </td>
                            <td>
                                <span>{e.address}</span>
                            </td>
                            <td>
                                <span>{e.city}, {e.state}, {e.country}</span>
                            </td>
                            <td>
                                <span>{e.price}</span>
                            </td>
                            <td>
                                <span>{e.updatedAt}</span>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </>

    );
}

export default MySpots;
