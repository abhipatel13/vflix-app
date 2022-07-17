import axios from "axios";
import { useEffect } from "react";
import Chip from '@mui/material/Chip';
import "./Genres.css";

const Genres = ({
    selectedGenres,
    genres,
    setGenres,
    setSelectedGenres,
    setPage,
    type
}) => {

    const handleAdd = (genre) =>{
         setSelectedGenres([...selectedGenres,genre]);
         setGenres(genres.filter((g)=>g.id!==genre.id));
         setPage(1);
    }

    const handleRemove = (genre) =>{
        setSelectedGenres((selectedGenres) => 
            selectedGenres.filter((g) => g.id !== genre.id )
        );
        setGenres([...genres,genre]);
       
        
        setPage(1);
    }
    const fetchGenres = async () => {

        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setGenres(data.genres);
    };
    // console.log(genres);
    useEffect(() => {
        fetchGenres();

        // return  () => {
        //     setGenres({});
        // };

    }, []);

    return (
    
    <div style={{ color :"white" , padding: "6px 0" }}>
      {
        selectedGenres && selectedGenres.map((genre) =>
       (
            <Chip
            label={genre.name}
            style={{ margin: "4px" }}
            clickable
            size="small"
            color="primary"
            key={genre.id}  
            onDelete ={()=>handleRemove(genre)}  
            />
       
       )
        )}
        {
            genres && genres.map((genre) =>
        (
            <Chip
            label={genre.name}
            style={{ margin: "4px" }}
            clickable
            size="small"
            color="warning"
            onClick ={()=>handleAdd(genre)}
            key={genre.id}    
            />
        )

        )}
    </div>
    );
};

export default Genres;