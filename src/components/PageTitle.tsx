import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

function PageTitle({title}) {
    return <Helmet>{title} | NomadCoffee</Helmet>;
}

export default PageTitle;

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
}