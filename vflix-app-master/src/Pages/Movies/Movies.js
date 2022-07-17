import { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Movies.css';
import useGenre from "../../hooks/useGenre";
// import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import SinglePage from "../../components/SinglePage/Singlepage";
import { Link, Route, Routes } from "react-router-dom";
import SingleCustomContent from "../../components/SingleCustomContent/SingleCustomContent";

const Movies = () =>{
    
    const [content, setContent] = useState([]);
    const [page,setPage] = useState(1);
    const [numofPages,setnumofPages] = useState();

    const [selectedGenres,setSelectedGenres] = useState([]);
    const [genres,setGenres] = useState([]);
    const genresforURL = useGenre(selectedGenres);

    const [moviedata,setmovieData]  = useState([]);
    const fetchMovie = async () => {
        
        await axios
        .get('/api/getdata')
        .then(res => {
        //  console.log(res.data[0].name)
         setmovieData(res.data);
        })
        .catch(err =>{
          console.log('Error');
        })
    };

   
      
    useEffect(() => {
        fetchMovie();
     
       
    }, []);

    const fetchTrending = async () => {
        
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&with_genres=${genresforURL}`);
        // console.log(data);
        await setContent(data.results);
        await setnumofPages(data.total_pages);
       
    };
    useEffect(() => {
        fetchTrending();
       
    }, [page,genresforURL]);

    

    return (
        <div>
            <span className='pageTitle'>Movies</span>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                genres = {genres}
                setGenres={setGenres}
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
                // key = {}

            />
            {/* <CustomPagination setPage={setPage} numofPages={numofPages}/> */}

  <div className="trending" style={{marginTop:'40px'}}>{moviedata.map((c)=>
               
                <SingleCustomContent
                    key={c._id} 
                    id={c._id} 
                    poster={c.image}
                    title={c.name}
                    date={c.releasedate}
                    media_type ='Movie'
                    vote_average = {c.rating}
                    tagline = {c.tagline}
                    video = {c.video}
                    runtime = {c.runtime}
                />
              
            )}</div>
            <div className="trending">{
                content && content.map((c) => <SingleContent 
                    key={c.id} 
                    id={c.id} 
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type ='movies'
                    vote_average = {c.vote_average}
                />)
            }</div>
            <CustomPagination setPage={setPage} numofPages={numofPages}/>
         
            {/* <a>  <Link to="/movies/pages">List</Link></a> */}
          
        </div>
    )
    
}

export default Movies;