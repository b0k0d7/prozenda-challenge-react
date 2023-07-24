import './assets/css/App.css'
import {useState} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


import DataFetcher from "./components/DataFetcher.jsx";
import TopMenu from "./components/TopMenu.jsx";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";


const App = () => {
    const characters = useSelector((state) => state.characters);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [sort, setSort] = useState('');

    const handleSort = (event) => {
        setSort(event.target.value);
        dispatch({type: 'sortCharacters', value: event.target.value});
    };

    const handleSearch = (event) => {
        setInputValue(event.target.value);
    };

    const getImageUrl = (index) => {
        if (index % 2 === 0) {
            return '/img/mock-image-1.png'
        } else {
            return '/img/mock-image.png'
        }
    }

    const getLoadedCharacters = () => {
        return characters.filter((obj) => {
            return obj.show;
        }).length;
    }

    const getLoadingButtonState = () => {
        return characters.filter((obj) => {
            return obj.show;
        }).length === characters.length;

    }

    const getSearchButtonState = () => {
        return inputValue.length === 0;
    }
    const loadMoreCharacters = () => {
        dispatch({type: 'loadMoreCharacters'});
    }

    const searchCharacter = async () => {
        try {

            const api_endpoint = `https://swapi.dev/api/people/?search=${inputValue}`;
            const response = await axios.get(api_endpoint);
            let characters = response.data.results;
            characters.forEach((e) => {
                e.show = true;
            })
            dispatch({type: 'searchCharacter', value: response.data.results});
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (

        <div className="app">
            <DataFetcher/>

            <TopMenu/>

            <div className="app__search">
                <div className="app__search--box">
                    <TextField
                        id='app__search--btn'
                        label="Search Character"
                        variant="outlined"
                        value={inputValue}
                        onChange={handleSearch}

                    />

                    <div className="app__search--break"/>
                    <Button sx={{background: '#58547a', color: 'yellow'}} variant="contained" onClick={async () => {
                        await searchCharacter()
                    }} disabled={getSearchButtonState()}>Search Character</Button>
                </div>

            </div>


            {characters.length === 0 ? (
                <div className="app__loading">
                    <CircularProgress
                        sx={{color: 'yellow'}}
                    />
                </div>
            ) : (
                <div>

                    <div className="app__sort">
                        {characters.length > 0 &&
                            <p>Showing {getLoadedCharacters()} results of {characters.length}</p>
                        }


                        <FormControl id="app__sort--btn">
                            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                            <Select
                                value={sort}
                                onChange={handleSort}
                            >
                                <MenuItem value={'a-z'}>A-Z</MenuItem>
                                <MenuItem value={'z-a'}>Z-A</MenuItem>
                                <MenuItem value={'male'}>Male</MenuItem>
                                <MenuItem value={'female'}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="app__characters">
                        <Grid container columns={4} sx={{flexDirection: {xs: "column", md: "row"}}}>
                            {characters.filter((obj) => {
                                return obj.show;
                            }).map((item, index) => (
                                <Grid item xs={1} key={item.name}>
                                    <Card sx={{maxWidth: 400, marginBottom: 3, background: '#2e2a49', color: 'yellow'}}>
                                        <CardMedia
                                            sx={{height: 400}}
                                            image={getImageUrl(index)}
                                            title="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            )}

            <Button sx={{background: '#58547a', color: 'yellow'}} fullWidth variant="contained" onClick={() => {
                loadMoreCharacters()
            }} disabled={getLoadingButtonState()}>Load More</Button>
        </div>
    )
}

export default App
