const { useSelector } = require("react-redux");
const { useParams } = require("react-router-dom");
const { default: SpotForm } = require("./SpotForm");

const EditSpotForm = ({sessionLoaded}) => {
    const {id} = useParams();
    const spot = useSelector(state => state.spots[id]);

    return (
        <SpotForm spot={spot} sessionLoaded={sessionLoaded} formType="update" />
    )
}

export default EditSpotForm;
