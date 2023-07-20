import './App.css'
import { useState } from 'react';

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
import {useSelector} from 'react-redux';


const App = () => {
    const characters = useSelector((state) => state.characters);

    const [inputValue, setInputValue] = useState('');
    const [age, setAge] = useState('');

    const handleSort = (event) => {
        setAge(event.target.value);
    };

    const handleSearch = (event) => {
        setInputValue(event.target.value);
    };

    return (

        <div className="app">
            <DataFetcher />

            <TopMenu />

            <TextField
                label="Your Input"
                variant="outlined"
                value={inputValue}
                onChange={handleSearch}
            />

            <Button variant="contained">Search Character</Button>

            <p>Showing 5 results of {characters.length}</p>


            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
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
                <CircularProgress />
            ) : (
                    <Grid container columns={4}>
                    {characters.map((item) => (
                        <Grid item xs={1}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="/img/mock-image.png"
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

            <Button variant="contained">Load More</Button>
        </div>
    )
}

export default App
