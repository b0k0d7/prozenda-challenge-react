import './App.css'

import DataFetcher from "./components/DataFetcher.jsx";
import {useSelector} from 'react-redux';

const App = () => {
    const characters = useSelector((state) => state.characters);

    return (

        <div className="app">
            <DataFetcher/>
            {characters.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {characters.map((item) => (
                        <li key={item.name}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default App
