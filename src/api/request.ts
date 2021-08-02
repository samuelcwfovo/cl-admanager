
import { toast } from 'react-toastify';

interface CustomConfigs {
    method: 'POST' | 'GET' | 'DELETE';
    body?: string;
    headers?: any;
}

const request = async (url: string, configs: CustomConfigs): Promise<any> => {
    const headers = { 'Content-Type': 'application/json' }

    const config = {
        method: configs.method,
        body: configs.body,
        headers: {
            ...configs.headers ? configs.headers : headers
        }
    }

    const response = await fetch(`${process.env.REACT_APP_API_HOST}${url}`, config);

    return response
}

request.get = (url: string): Promise<any> => {
    return request(url, { method: 'GET' })
}

request.post = (url: string, body: any, headers?: any): Promise<any> => {
    return request(url, { method: 'POST', body: body, headers: headers })
}

request.delete = (url: string): Promise<any> => {
    return request(url, { method: 'DELETE' })
}

type GetRequest = {
    url: string;
    errorMsg: string;
}

request.gets = async (props: GetRequest) => {

    const result = await request(props.url, { method: 'GET' })
    if (result.ok) return await result.json();

    toast.error(props.errorMsg);
    console.log(props.errorMsg, result)
}

export default request