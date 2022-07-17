import { useEffect, useState } from "react";
import axios from "axios";
// import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";
import Loading from "../../components/Loading/Loading";
// import './Trending.css';
import CustomPagination from "../../components/Pagination/CustomPagination";

const Series = () => {
    const [content, setContent] = useState([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const [numofPages,setnumofPages] = useState();
    const [selectedGenres,setSelectedGenres] = useState([]);
    const [genres,setGenres] = useState([]);
    const genresforURL = useGenre(selectedGenres);

    const fetchTrending = async () => {
        setLoading(true);
        
      const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&with_genres=${genresforURL}`);  
        await setContent(data.results);
        await setnumofPages(100);
        setLoading(false);
 

       
    };
    useEffect(() => {
       fetchTrending();
    
      
       
    }, [genresforURL,page]);
    
    return (
        <div>
            <span className='pageTitle'>Series</span>
        
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                genres = {genres}
                setGenres={setGenres}
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
                // key = {}

            />
            <CustomPagination setPage={setPage} numofPages={numofPages}/>
    
            <div className="trending">{
             content.map((c) => <SingleContent 
                    key={c.id} 
                    id={c.id} 
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type ="tv"
                    vote_average = {c.vote_average}
                />)
            }</div>
            <CustomPagination setPage={setPage} numofPages={numofPages}/>
        </div>
    )
}

export default Series;