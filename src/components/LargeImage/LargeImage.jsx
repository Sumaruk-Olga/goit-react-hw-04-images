import PropTypes from 'prop-types';

export function LargeImage({ data }) {
    return <img src={data.url} alt={data.alt} />
}

LargeImage.propTypes = {
    data: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
    })
}