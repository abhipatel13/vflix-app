import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";


export default function SingleCustomContent({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
    tagline ,
    video ,
    runtime 
  }) {
    const navigate = useNavigate();
    const deletedata = async (id) => {
 
        // e.preventDefault();
      await axios
      .delete(`/entermovie/${id}`)
      .then(res => {
        window.location.reload();
      })
      .catch(err =>{
        console.log(err);
      })
  }

 
    return (
      <Card sx={{ maxWidth: 325 }} style={{marginTop:'30px'}}>
        <CardMedia
          component="img"
          height="300"
          image={poster}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Tagline : {tagline}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Release Date : {date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
         Runtime : {runtime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Type : {media_type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Release Date : {date}
          </Typography>
        
        </CardContent>
        <CardActions>
          <Button size="small" href={video}>Watch Trailer</Button>
          {/* <Button size="small" onClick={()=>deletedata(id)}>Delete</Button> */}
          {/* <Button size="small" href={video}>Update</Button> */}
          {/* <Button size="small" href={video} >Download Trailer</Button> */}
        </CardActions>
      </Card>
    );
  }