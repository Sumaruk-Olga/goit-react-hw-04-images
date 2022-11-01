import { Formik} from 'formik';
import PropTypes from 'prop-types';
import { FcSearch } from "react-icons/fc";
import { PageTitle, StyledForm, SearchButton, StyledField } from './SearchBar.styled';

export function Searchbar({onSubmit}) {
    return (<PageTitle>
<Formik
            initialValues={{ search: '' }}
            onSubmit={(values, {resetForm}) => {
                onSubmit(values);
                resetForm();
    }}>
    <StyledForm>
        <SearchButton type="submit">
            <FcSearch/>
        </SearchButton>

    <StyledField
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
    />
    </StyledForm>
</Formik>
</PageTitle>)
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    
}