import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unavailable, img_500 , img_300 } from "../../config/config";
import './SinglePageSeries.css';
import {youtubevideo } from '../../config/config';
import ReactPlayer from 'react-player/youtube';

const SinglePageSeries = () => {
    const params = useParams();
    const [content, setContent] = useState([]);
    const [video, setVideo] = useState([]);
    const [key, setKey] = useState([]);
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`);
            await setContent(data);
            // console.log(data.title);
        }
        catch (e) {
            console.log(e);
        }
    }

    const fetchVideo = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
            await setVideo(data);
            await setKey(data.results[0].key);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchData();
        fetchVideo();
    }, [])


    return (

  <>
   <div class="nav-btn"><a class="btn" href="/series">Popular TV Series</a> 
  
   </div>
        <div className="movieSection">


           
            <div className="MovieImage">
                <img src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.title} />
                
                <br /><br /><br />
            </div>


            <div class="details-grid">
                <div class="title-singlepage">Series Facts</div>
                <div class="details-container">
                    <div class="details-title">{content.original_title}</div>
                    {/* <div class="details-value">{content.}</div> */}
                </div><div class="details-container">
                    <div class="details-title">No of Episode : </div>
                    <div class="details-value">{content.number_of_episodes}</div>
                </div><div class="details-container">
                    <div class="details-title">Number of Seasons : </div>
                    <div class="details-value">{content.number_of_seasons}</div>
                </div><div class="details-container">
                    <div class="details-title">Ratings : </div>
                    <div class="details-value">{content.vote_average}</div></div>
                <div class="details-container">
                    <div class="details-title">Language : </div>
                    <div class="details-value">{content.original_language} </div>
                </div><div class="details-container">
                    <div class="details-title">Release Date : </div>
                    <div class="details-value">{content.first_air_date}</div>
                </div><div class="details-container">
                    <div class="details-title">Season : </div>
                    <div class="details-value">{content.seasons && content.seasons.map((c)=>(
                    <>
                    <p style={{'fontSize':'20px','color':'yellow'}}>{c.name}</p>
                    <img src={c.poster_path ? `${img_300}/${c.poster_path}` : unavailable} alt={c.title} />
                   
                     <p>Overview : {c.overview}</p>
                   
                    <p>Episode : {c.episode_count}</p>
                    <p>Release Date : {c.air_date}</p>
                    </>))}</div></div></div>
            <div className="Infosgrid">
                <div className="movieTitle">{content.title}</div>
                <div class="movie-infos">
                    <span class="movie-date">Release Date : {content.release_date}</span>
                    <span class="movie-vote">Avg Vote : {content.vote_average}</span>
                    <span class="movie-runtime">Runtime : {content.runtime}min</span></div>

                <div class="movie-genres">{content.genres && content.genres.map((c) => <span>{c.name},</span>)}</div>
                {/* <div class="movie-tagline">A villain will rise.</div> */}
                {/* <div class="movie-overview">A fanboy of a supervillain supergroup known as the Vicious 6, Gru hatches a plan to become evil enough to join them, with the backup of his followers, the Minions.</div> */}
                {/* <div class="movie-director"><span class="director-job">Homepage : </span><span class="home-page"><L>Home Page</L></span></div> */}
                <div class="movie-tagline">Tagline : {content.tagline ? content.tagline : "Not Available"}</div>
                <div class="movie-overview">Overview : {content.overview}</div>
                {/* <div class="movie-genres">Category : {content.genres.map((c) => (<span>{c.name}</span>) )} </div> */}

            </div>
            <div className="MovieVideo">
            <ReactPlayer url={`${youtubevideo}${key}`} width='100%' />
            </div>
        </div>
</>
    )
}

export default SinglePageSeries;