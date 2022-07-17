import { useState } from 'react';
// import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () =>{
  const navigate = useNavigate();
  const [user,setUser] = useState({
    
  })

  let name , value;
  const handleInput = (e) =>{
   
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value})
    
  }

  const RegisterData = async(e) =>{
    e.preventDefault();
    const {   name ,email , password } = user;
    const res  = await fetch("/register",{
      method : "POST",
      headers : {
        "Content-type" : "application/json"
      },
      body:JSON.stringify({
       name ,email , password
      })
    })

    const resData = await res.json();
    if(resData.error)

  {
    window.alert("Invalid User Enter");
    console.log("Invalid User Enter");
  }
  else {
    window.alert("User Registered Successfully");
    // console.log("Successful");
    navigate("/login");
  }

}
    return (<>
      
       <Form>
       <h2 style={{color:'white',textAlign:'center'}}> Registration </h2>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name" name="name" onChange={handleInput} required />
     
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email ID</Form.Label>
        <Form.Control type="email" placeholder="Enter Email ID" name="email" onChange={handleInput}  required/>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name="password" onChange={handleInput} required/>
        
      </Form.Group>
      <Button variant="primary" type="submit" onClick={RegisterData}>
       Register
      </Button>
      <br/><br/>
      <a href="/login">Already Registered ?</a>
    </Form>
    </>
    )
}

export default Register;