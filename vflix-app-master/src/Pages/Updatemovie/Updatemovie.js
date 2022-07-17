import axios from 'axios';
import { useEffect, useState } from 'react';
import {useHistory, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Updatemovie = () =>{
  const navigate = useNavigate();
  const [movie,setMovie] = useState({
    name : "",releasedate : "", id:"" , tagline:"",rating:"",image:"",video:"",runtime:""
  })

  let name , value;
 
  // console.log(id);

  const {id} = useParams("");
  // const uid = id;
 
  const [moviedata,setmovieData]  = useState([]);
    const fetchMovie = async () => {
        
        await axios
        .get(`/api/getdata/${id}`)
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

    const handleInput = (e) =>{
   
      name = e.target.name;
      value = e.target.value;
      setMovie({...movie,[name]:value})
      
    }

    const UpdateData = async(e) =>{
      
      e.preventDefault();
      const { name , releasedate,tagline , rating , image , video , runtime } = movie;
      // console.log(uid);
     
      const res  = await fetch(`/entermovie/${id}`,{
        method : "PUT",
        headers : {
          "Content-type" : "application/json"
        },
        body:JSON.stringify({
          name , releasedate , tagline ,rating , image , video , runtime
        })
      })
  
      const resData = await res.json();
      if(!resData || resData.status===422)
  
    {
      window.alert("Invalid Movie Enter");
      console.log("Invalid Movie Enter");
    }
    else {
      window.alert("Movie Update Successfully");
      // console.log("Successful");
      navigate("/displaymovie");
    }
  
   

  }
    return (<>
    {/* <h1>Hello World</h1>   */}
       <Form>
       <h2 style={{color:'white',textAlign:'center'}}> Update Movie </h2>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>id</Form.Label>
        <Form.Control type="text" placeholder="Enter Unique ID" name="id" onChange={handleInput} value={moviedata.id} required />
     
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Movie Name</Form.Label>
        <Form.Control type="text" placeholder="Update Movie Name" name="name" onChange={handleInput} required/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      
        <Form.Label>Release Date</Form.Label>
        <Form.Control type="text" placeholder="Update Release Date" name="releasedate" onChange={handleInput}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Tagline</Form.Label>
        <Form.Control type="text" placeholder="Update Tagline" name="tagline" onChange={handleInput}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="text" placeholder="Update Rating" name="rating" onChange={handleInput} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" placeholder="Update Image URL" name="image" onChange={handleInput}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>video</Form.Label>
        <Form.Control type="text" placeholder="Update Video URL" name="video" onChange={handleInput}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Runtime</Form.Label>
        <Form.Control type="text" placeholder="Update Movie RUNTIME" name="runtime" onChange={handleInput} required/>
      </Form.Group>
    
      <Button variant="primary" type="submit" onClick={UpdateData}>
      Update Movie
      </Button>
    </Form>
    </>
    )

  }
export default Updatemovie;