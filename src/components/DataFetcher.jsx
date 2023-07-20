import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const DataFetcher = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const api_endpoint = 'https://swapi.dev/api/people/';
                const response = await axios.get(api_endpoint);
                dispatch({ type: 'setValue', value: response.data.results });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        </>
    );
};

export default DataFetcher;
