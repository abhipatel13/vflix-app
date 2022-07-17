import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unavailable, img_500 } from "../../config/config";
import './Singlepage.css';
import {youtubevideo } from '../../config/config';
import ReactPlayer from 'react-player/youtube';

const Singlepage = () => {
    const params = useParams();
    const [content, setContent] = useState([]);
    const [video, setVideo] = useState([]);
    const [key, setKey] = useState([]);
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`);
            await setContent(data);
            // console.log(data.title);
        }
        catch (e) {
            console.log(e);
        }
    }

    const fetchVideo = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
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
   <div class="nav-btn"><a class="btn" href="/movies">Popular Movies</a> 
  
   </div>
        <div className="movieSection">


           
            <div className="MovieImage">
                <img src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.title} />
                
                <br /><br /><br />
            </div>


            <div class="details-grid">
                <div class="title-singlepage">Movie Facts</div>
                <div class="details-container">
                    <div class="details-title">{content.original_title}</div>
                    {/* <div class="details-value">{content.}</div> */}
                </div><div class="details-container">
                    <div class="details-title">Status : </div>
                    <div class="details-value">{content.status}</div>
                </div><div class="details-container">
                    <div class="details-title">Release Date : </div>
                    <div class="details-value">{content.release_date}</div>
                </div><div class="details-container">
                    <div class="details-title">Ratings : </div>
                    <div class="details-value">{content.vote_average}</div></div>
                <div class="details-container">
                    <div class="details-title">Runtime : </div>
                    <div class="details-value">{content.runtime} minute</div>
                </div><div class="details-container">
                    <div class="details-title">Budget : </div>
                    <div class="details-value">${content.budget}</div>
                </div><div class="details-container">
                    <div class="details-title">Revenue : </div>
                    <div class="details-value">$-{content.revenue}</div></div></div>
            <div className="Infosgrid">
                <div className="movieTitle">{content.title}</div>
                <div class="movie-infos">
                    <span class="movie-date">Release Date : {content.release_date}</span>
                    <span class="movie-vote">Avg Vote : {content.vote_average}</span>
                    <span class="movie-runtime">Runtime : {content.runtime}min</span></div>

                {/* <div class="movie-genres">{content.genres.map((c) => c.name)}</div> */}
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

export default Singlepage;