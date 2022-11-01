import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ onClick, image}) {
    const { largeImageURL, tags, webformatURL } = image;
    return (
        <Item onClick={() => onClick({
            url: largeImageURL,
            alt: tags,
        })}>
            <Image src={webformatURL} alt={tags} />
        </Item>
    )
}

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,        
    }),  
    onClick: PropTypes.func.isRequired,
}