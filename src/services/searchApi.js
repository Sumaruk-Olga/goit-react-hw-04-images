import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/'; 

export const searchImage = async({search, page}) =>{
    const queryParams = new URLSearchParams({
        key: '27860642-3e8ada7d92a4932044b8f46a6',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 12,
    });
    const response = await axios.get(`?${queryParams}`);    
    return response.data;
}