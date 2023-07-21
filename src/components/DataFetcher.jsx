import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const DataFetcher = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('lefut')
                const api_endpoint = 'https://swapi.dev/api/people/';
                const response = await axios.get(api_endpoint);
                let value = response.data.results;
                // for(let i = 0; i < value.length; i++){
                //     value[i].show = i < 4;
                // }
                // console.log('val', value);

                value.forEach((e, index) => {
                    e.show = index < 4;
                })
                dispatch({ type: 'setCharacters', value: value });
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
