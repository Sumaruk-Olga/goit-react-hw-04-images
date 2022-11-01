import PropTypes from 'prop-types';
import { StyledErrorMessage } from "./ErrorMessage.styled";

export function ErrorMessage({error}) {
    return <StyledErrorMessage>{error}</StyledErrorMessage>
}

ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
}