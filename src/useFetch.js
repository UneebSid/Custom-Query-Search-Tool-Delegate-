import  { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {

const [metricDefinitions, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);



    useEffect(()=>{
        setLoading(true);
        axios
        .get(url)
        .then((response)=>{
            setData(response.data);
        })
        .catch((err)=>{
            setError(err);
        })
        .finally(()=>{
            setLoading(false);
        });
    },[url]);

    return {metricDefinitions,loading,error};
      
}

    




export default useFetch
