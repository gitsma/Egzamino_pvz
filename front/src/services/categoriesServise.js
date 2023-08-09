import axios from 'axios';

const API_URL = '/api/category';

// gauti visas kategorijas
// home page

const getAllCategoriesData = async() => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// prideti kategorija
const setCategory = async(categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    try {
        const response = await axios.post(API_URL, categoryData, config);
        return response.data
    } catch (error) {
        console.log(error);
    }
}

// istrinti kategorija pagal id
const deleteCategory = async (categoryId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + '/' + categoryId, config)

    return response.data
}

const categoryService = {
    getAllCategoriesData,
    setCategory,
    deleteCategory
}

export default categoryService