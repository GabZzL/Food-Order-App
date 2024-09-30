import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
    const res = await fetch(url, config);
    const data = await res.json(); 

    if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch');
    };

    return data;
}

export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(userData) {
        setIsLoading(true);
        try {
            const data = await sendHttpRequest(url, {...config, body: userData});
            setData(data);
        } catch (error) {
            setError(error.message || 'Failet to fetch')
        };
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData,
    };
}