import axios, { AxiosHeaders } from 'axios';
import {OpenAI} from 'openai';

const openAIClient = axios.create({
    baseURL: "https://api.openai.com/v1/chat/completions",
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
});

openAIClient.interceptors.request.use(
    async (config) => {
        const headers = new AxiosHeaders(config.headers as AxiosHeaders);
        headers.set('Authorization', `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`);
        return { ...config, headers };
    },
    (error) => {
        Promise.reject(error);
    }
);

export default openAIClient;
