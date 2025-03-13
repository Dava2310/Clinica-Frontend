import axiosInstance from '../interceptors/axiosInstance';

const client = () => {
    const get = async (endPoint: string,) => {
        return axiosInstance.get(endPoint, { timeout: 10000 });
    };

    const post = async (endPoint: string, body?: FormData, ) => {
        return axiosInstance.post(endPoint, body, );
    };

    const put = async (endPoint: string, body?: FormData, ) => {
        return axiosInstance.put(endPoint, body,);
    };

    const patch = async (endPoint: string, body?: FormData) => {
        return axiosInstance.patch(endPoint, body);
    };

    const del = async (endPoint: string) => {
        return axiosInstance.delete(endPoint);
    };

    return { get, post, put, del, patch };
};

export default client;