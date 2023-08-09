import axios from 'axios';

const API_URL = '/api/ad';

// gauti visus visu skelbimus
// home page

const getAllAdsData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// sukurti nauja skelbima
const createAd = async (adData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, adData, config)

    return response.data
}

// gauti tik vartotojo skelbimus
const getUserAds = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    try {
        const response = await axios.get(API_URL + '/my', config)

        // console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// atnaujinti savo skelbima
const updateAd = async (adData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.put(API_URL + '/' + adData.test, adData.formData, config)
        // console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

// istrinti savo skelbima pagal id
const deleteAd = async (adId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + '/' + adId, config)

    return response.data
}

const adsService = {
    getAllAdsData,
    getUserAds,
    createAd,
    updateAd,
    deleteAd
}

export default adsService