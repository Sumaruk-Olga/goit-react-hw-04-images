import PropTypes from 'prop-types';
import { Button } from './LoadMoreBtn.styled';

export function LoadMoreBtn({ onClick }) {
    return (
        <Button type="button" onClick={onClick}>Load more</Button>
    )
}

LoadMoreBtn.propTypes = {
    onClick: PropTypes.func.isRequired,
}