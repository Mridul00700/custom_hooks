import React, { useEffect, useState } from 'react'
import {useApiCall} from '../CustomHooks/useApiCall';
let a ='https://api.publicapis.org/entries';
const ApiCall : React.FunctionComponent = () => {
    const [data, loading, error] =  useApiCall({configuration: {url: a, retry: 1}});


    // console.log(data, loading, error);
    console.log(data);
    console.log(error)
    return (
        <>
        {loading ? <>Data loading..</> : <>data loaded</>}
        </>
    )
}


export default ApiCall;