import react, { useState, useContext, useEffect,useRef } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import JodiEditor from 'jodit-react';
import { UserContext } from "../context/UserContext";
import Parse from 'html-react-parser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userSchema } from "../Validations/UserValidations";

function Add() {
 
const content = useRef(null);
  const userContext = useContext(UserContext);
  const [jodiValue, setJodiValue] = useState("");
  const [isSucces, setSuccess] = useState(null);
  
  let navigate = useNavigate();

  const [file,setFile]= useState({
    files :[],
    
  });
  const info = jodiValue;


const handlefile =  e =>{
   setFile({
    ...file, 
    files:e.target.files[0],
    
   });
   
 
}
useEffect(()=>{
  
  axios.get("http://localhost:3002/getdata",{

    }).then(res => {
      console.warn(res);
      
      userContext.setIsData(res.data);
     
    })
   
},[])
const handelSubmit= async e =>{
e.preventDefault();

const formData = new FormData();
formData.append('file', file.files);
formData.append('content', info);

const isValid = await userSchema.isValid(formData);

console.log(isValid);
axios.post("http://localhost:3002/imageupload",formData,{

headers:{"Contnet-Type" : "multipart/form-data"}
})
.then(res => {
  console.warn(res);
  if(res.data.success === 1){
    setSuccess("Image upload successfully");
    window.location.reload();
  }
})

}



  return (
  
    <div className="App">
       <Button  onClick={()=>{navigate('/')}} variant="info" size="sm">
              Back
           </Button>
        <header className="App-header">
        {isSucces !== null ? <h4> {isSucces} </h4> :null }
          {userContext.userData ?    <Form onSubmit={handelSubmit} >
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label></Form.Label>
        <Form.Control name="file" type="file" onChange={handlefile} />
        
      </Form.Group>
      <JodiEditor name="content" ref={content} onChange={content=>setJodiValue(content)}></JodiEditor>
          <Button  type="submit">Submit</Button>
   
          </Form> : null }
        
          {userContext.isData.map((data, id) =>
  <div md="auto" key={id}>
     <img md="auto"
              className="d-block w-50"
              src={"uploads/" + data.image} 
              alt="Second slide"
            />
      {Parse(data.content)}
      </div>
  
  )}
    </header>
    
  
 
      
    </div>
  )
}

export default Add