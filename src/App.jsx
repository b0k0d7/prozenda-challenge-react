import './App.css'
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
        if(index % 2 === 0) {
            return '/img/mock-image-1.png'
        } else{
            return '/img/mock-image.png'
        }
    }

    const getLoadedCharacters = () => {
        return characters.filter((obj) => { return obj.show; }).length;
    }

    const getLoadingButtonState = () => {
        return characters.filter((obj) => {
            return obj.show;
        }).length === characters.length;

    }

    const getSearchButtonState = () => {
        return inputValue.length > 0
    }
    const loadMoreCharacters = () => {
        dispatch({type: 'loadMoreCharacters'});
    }

    const searchCharacter = () => {

    }


    return (

        <div className="app">
            <DataFetcher/>

            <TopMenu/>

            <TextField
                label="Your Input"
                variant="outlined"
                value={inputValue}
                onChange={handleSearch}
            />

            <Button variant="contained" onClick={() => { searchCharacter() }} disabled={getSearchButtonState()}>Search Character</Button>

            {characters.length > 0 &&
                <p>Showing {getLoadedCharacters()} results of {characters.length}</p>
            }


            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Age"
                    onChange={handleSort}
                >
                    <MenuItem value={'a-z'}>A-Z</MenuItem>
                    <MenuItem value={'z-a'}>Z-A</MenuItem>
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                </Select>
            </FormControl>


            {characters.length === 0 ? (
                <CircularProgress/>
            ) : (
                <Grid container columns={4}>
                    {characters.filter((obj) => { return obj.show; }).map((item, index) => (
                        <Grid item xs={1} key={item.name}>
                            <Card sx={{maxWidth: 345}}>
                                <CardMedia
                                    sx={{height: 140}}
                                    image={getImageUrl(index)}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {/*Lizards are a widespread group of squamate reptiles, with over 6,000*/}
                                        {/*species, ranging across all continents except Antarctica*/}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Button variant="contained" onClick={() => { loadMoreCharacters() }} disabled={getLoadingButtonState()}>Load More</Button>
        </div>
    )
}

export default App
