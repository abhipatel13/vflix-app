import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import SingleContent from "../../components/SingleContent/SingleContent";
import SingleCustomContent from "../../components/SingleCustomContent/SingleCustomContent";
import SingleCustomContentAdmin from "../../components/SingleCustomContentAdmin/SingleCustomContentAdmin";

const DisplayMovie = () =>{
    const navigate = useNavigate();
    const [moviedata,setmovieData]  = useState([]);
    const fetchMovie = async () => {
        
        await axios
        .get('/api/getdata')
        .then(res => {
        //  console.log(res.data[0].name)
         setmovieData(res.data);
        }).catch((err)=>
            console.log(err)
        )
    };

   
      
    useEffect(() => {
        fetchMovie();
     
       
    }, []);
    return (
        <>
            <h1 style={{textAlign:'center'}}>Movies</h1>
            <div className="trending">{moviedata.map((c)=>
               
                <SingleCustomContentAdmin
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
        </>
    )
}

export default DisplayMovie;