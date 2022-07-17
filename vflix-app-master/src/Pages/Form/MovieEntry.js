import { useState } from 'react';
// import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import 'bootstrap/dist/css/bootstrap.min.css';

const MovieEntry = () =>{
  // const history = useHistory();
  const [movie,setMovie] = useState({
    name : "",releasedate : "", id:"" , tagline:"",rating:"",image:"",video:"",runtime:""
  })

  let name , value;
  const handleInput = (e) =>{
   
    name = e.target.name;
    value = e.target.value;
    setMovie({...movie,[name]:value})
    
  }

  const PostData = async(e) =>{
    e.preventDefault();
    const {id ,name , releasedate,tagline , rating , image , video , runtime } = movie;
    const res  = await fetch("/entermovie",{
      method : "POST",
      headers : {
        "Content-type" : "application/json"
      },
      body:JSON.stringify({
        id ,name , releasedate , tagline ,rating , image , video , runtime
      })
    })

    const resData = await res.json();
    if(!resData || resData.status===422)

  {
    window.alert("Invalid Movie Enter");
    console.log("Invalid Movie Enter");
  }
  else {
    window.alert("Movie Enter Successfully");
    console.log("Successful");
    // history.push("/movies");
  }

  }
    return (<>
      
       <Form>
       <h2 style={{color:'black',textAlign:'center'}}> MOVIE ENTER HERE </h2>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>id</Form.Label>
        <Form.Control type="text" placeholder="Enter Unique ID" name="id" onChange={handleInput} value={movie.id} required />
     
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Movie Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Movie Name" name="name" onChange={handleInput} value={movie.name} required/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      
        <Form.Label>Release Date</Form.Label>
        <Form.Control type="text" placeholder="Enter Release Date" name="releasedate" onChange={handleInput} value={movie.releasedate} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Tagline</Form.Label>
        <Form.Control type="text" placeholder="Enter Tagline" name="tagline" onChange={handleInput} value={movie.tagline} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="text" placeholder="Enter Rating" name="rating" onChange={handleInput} value={movie.rating} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" placeholder="Emter Image URL" name="image" onChange={handleInput} value={movie.image} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>video</Form.Label>
        <Form.Control type="text" placeholder="Enter Video URL" name="video" onChange={handleInput} value={movie.video} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Runtime</Form.Label>
        <Form.Control type="text" placeholder="Enter Movie RUNTIME" name="runtime" onChange={handleInput} value={movie.runtime} required/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit" onClick={PostData}>
      ADD NEW MOVIE
      </Button>
    </Form>
    </>
    )
}

export default MovieEntry;