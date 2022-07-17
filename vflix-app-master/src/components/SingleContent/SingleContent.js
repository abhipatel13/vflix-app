import { img_300 } from "../../config/config";
import { unavailable } from "../../config/config";
import './SingleContent.css';
// import ContentModal from "../../components/ContentModal/ContentModel";
import Badge from "@mui/material/Badge";
import { Link } from "@mui/material";
import Singlepage from "../SinglePage/Singlepage";
import { Route, Router, Routes, useNavigate } from "react-router-dom";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average
}) => {

  return (

    // <ContentModal media_type={media_type} id={id}>
    <div className="media">
      <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"} />
      

          {/* <Route path="/movies/id" element={<Singlepage />} /> */}

        


      {<img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />}
      {/* <b className="title">{title}</b> */}
      
        <Link href={media_type==='tv' ? `/series/${id}` :`/movies/${id}`} className="title" style={{textDecoration:'none',color:'orange',fontWeight:'bold'}}>
          {title}
        </Link>

     
    
      <span className="subTitle">
        {media_type === 'tv' ? 'TV Series' : 'Movies'}
        <span className="subTitle">{date}</span>
      </span>

    </div>


  )
}

export default SingleContent;