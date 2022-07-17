import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TvIcon from '@mui/icons-material/Tv';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';


export default function SimpleBottomNavigation(props) {
    const [value, setValue] = React.useState();

    const navigate = useNavigate();
    useEffect(() => {
        if (value === 0)
            navigate('/');
        else if (value === 1)
            navigate('/movies');
        else if (value === 2)
            navigate('/series');
        else if (value === 3)
            navigate('/search');
        else if (value === 4)
            navigate('/movieentry');
            else if (value === 5)
            navigate('/displaymovie');
            else if (value === 6)
            navigate('/register');






    }, [value, navigate])

    return (
        <Box sx={{
            width: '100%',
            position: "fixed",
            bottom: 0,
            zIndex: 100

        }}>
            <BottomNavigation sx={{
                backgroundColor: "#2d313a",
                color: "white"
            }}
                showLabels

                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} sx={{

                    color: "white"
                }} />
                <BottomNavigationAction label="Movies" icon={<MovieCreationIcon />} sx={{

                    color: "white"
                }} />
                <BottomNavigationAction label="TV Series" icon={<TvIcon />} sx={{

                    color: "white"
                }} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} sx={{

                    color: "white"
                }} />

              
                <BottomNavigationAction label="ADD MOVIE(ADMIN)" icon={<AddCircleOutlineIcon />} sx={{

                    color: "white"
                }} />

<BottomNavigationAction label="DISPLAY MOVIE(ADMIN)" icon={<AddCircleOutlineIcon />} sx={{

color: "white"
}} />

<BottomNavigationAction label="REGISTRATION ADMIN" icon={<AddCircleOutlineIcon />} sx={{

color: "white"
}} />
              
            </BottomNavigation>
        </Box>
    );
}
