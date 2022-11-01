import PropTypes, { shape } from 'prop-types';
import { StyledList } from 'components/ImageGallery/ImageGallery.styled';

import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export function ImageGallery({ imageArray, onClick }) {
    return (<StyledList>
        {imageArray.map(image => <ImageGalleryItem key={image.id} image={image} onClick={onClick}  />)}        
    </StyledList>
            )
}

ImageGallery.propTypes = {
    imageArray: PropTypes.arrayOf(shape({
        id: PropTypes.number.isRequired,
    })).isRequired,    
    onClick: PropTypes.func.isRequired,
}