import { useState } from 'react';
// import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () =>{
  const navigate = useNavigate();
  const [user,setUser] = useState({
    
  })

  let name , value;
  const handleInput = (e) =>{
   
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value})
    
  }

  const Logindata = async(e) =>{
    e.preventDefault();
    const {   email , password } = user;
    const res  = await fetch("/login",{
      method : "POST",
      headers : {
        "Content-type" : "application/json"
      },
      body:JSON.stringify({
       email , password
      })
    })

    const resData = await res.json();
  
    if(resData.error)

  {
    window.alert("Invalid Movie Enter");
    navigate("/login");
  }
  else {
    window.alert("Login Successfully");
    // console.log("Successful");
    navigate("/displaymovie");
  }

}
    return (<>
      
       <Form>
       <h2 style={{color:'white',textAlign:'center'}}> Login </h2>
       
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email ID</Form.Label>
        <Form.Control type="email" placeholder="Enter Email ID" name="email" onChange={handleInput}  required/>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name="password" onChange={handleInput} required/>
        
      </Form.Group>
      <Button variant="primary" type="submit" onClick={Logindata}>
       Login
      </Button><br/><br/>
      <a href="/register">Register Now</a>
    </Form>
    </>
    )
}

export default Login;