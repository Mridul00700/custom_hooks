import * as React from 'react';
import { useEffect, useState } from 'react';

interface Config {
    url: string
    method?: string
    retry?: number
}

// type State = 'pending' | 'resolved' | undefined;
export const  useApiCall =({configuration} : {configuration:Config}) => {

    const [retry, setRetry] = useState(configuration?.retry ? configuration.retry : 0);
    const [retryCounter, setRetryCounter] = useState(0);
    const [data, setData] = useState(null);
    const [config, setConfig] = useState<Config>(configuration);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    const [error, setError] = useState<any>();

    useEffect(()=>{
        const call = async() => {
            console.log("Retries=", retryCounter);
            try{
            setLoading(true);
            setErrorStatus(false);   
            const rep = await fetch(config.url, {
                method: config?.method ? config.method : 'GET'
            });
            const data = await rep.json();
            setData(data);
            setErrorStatus(false);
            setLoading(false);
        }catch (error) {
            setError(error);
            setErrorStatus(true);
            setRetryCounter(prev => prev+1);
            setLoading(false);  
        }
        }
        if(retry !==0 && retry > retryCounter && errorStatus){
        call();
        }
    },[error, errorStatus]);

    useEffect(()=> {
        const call = async() => {
            try{
            setLoading(true);  
            const rep = await fetch(config.url, {
                method: config?.method ? config.method : 'GET'
            });
            const data = await rep.json();
            setData(data);
            setErrorStatus(false);
            setLoading(false);
        }catch (error) {
            setError(error);
            setErrorStatus(true);
            setLoading(false);  
        }
        }
        call();
    },[setData, setErrorStatus, setError]);


    return [data, loading, error]

} 

