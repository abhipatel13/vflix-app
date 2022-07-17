import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css';
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
    const [content, setContent] = useState([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const [numofPages,setnumofPages] = useState();
   
    const fetchTrending = async () => {
       
       
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        // console.log(data);
        
        await setContent(data.results);
        await setnumofPages(data.total_pages);
      
    };
    useEffect(() => {
        
        fetchTrending();
        
       
    }, [page]);

    return (
        <div>
            <span className='pageTitle'>Trending</span>

            <CustomPagination setPage={setPage} numofPages={numofPages}/>
            <div className="trending">{
                !loading && <Spinner/> &&
                content && content.map((c) => <SingleContent 
                    key={c.id} 
                    id={c.id} 
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type ={c.media_type}
                    vote_average = {c.vote_average}
                />)
            }</div>
            <CustomPagination setPage={setPage} numofPages={numofPages}/>
        </div>
    )
}

export default Trending;