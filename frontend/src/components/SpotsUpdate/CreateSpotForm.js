const { useSelector } = require("react-redux");
const { useParams } = require("react-router-dom");
const { default: SpotForm } = require("./SpotForm");

const CreateSpotForm = ({sessionLoaded}) => {

    const spot = {}

    return (
        <SpotForm spot={spot} sessionLoaded={sessionLoaded} formType="create" />
    )
}

export default CreateSpotForm;
