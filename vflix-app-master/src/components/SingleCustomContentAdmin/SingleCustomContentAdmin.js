import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";


export default function SingleCustomContentAdmin({
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

  // const updatedata = async(id) =>{
  //   await axios.put(`/entermovie/${id}`).then(res=>{
  //       console.log("Update")
  //   })
  //   .catch(err=>{
  //       console.log(err);
  //   })
  // }

 
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
          <Button size="small" onClick={()=>deletedata(id)}>Delete</Button>
          <a href={`/updatemovie/${id}`}><Button size="small">Update</Button></a>
          {/* <Button size="small" href={video} >Download Trailer</Button> */}
        </CardActions>
      </Card>
    );
  }