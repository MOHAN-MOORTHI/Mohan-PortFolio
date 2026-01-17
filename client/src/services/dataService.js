import api from './api';

const getPublicData = async () => {
    const response = await api.get('/data');
    return response.data;
};

const sendContactMessage = async (data) => {
    const response = await api.post('/contact', data);
    return response.data;
}

const getAboutData = async () => {
    const response = await api.get('/about');
    return response.data;
};

const dataService = {
    getPublicData,
    getAboutData,
    sendContactMessage
};

export default dataService;
