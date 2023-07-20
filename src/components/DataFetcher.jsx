import { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetcher = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api_endpoint = 'https://swapi.dev/api/people/';
                const response = await axios.get(api_endpoint);
                setData(response.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {data.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.map((item) => (
                        <li key={item.name}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DataFetcher;
