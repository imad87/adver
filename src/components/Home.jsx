import react, { useState, useContext,useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Parse from 'html-react-parser';
import axios from 'axios';


import { UserContext } from "../context/UserContext";

import { BrowserRouter as Link,useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  const userContext = useContext(UserContext);

 

const HandleDelete = async (id)=>{
const uid=id.id;
const image=id.image;
console.log(uid,image);

  try{
await axios.delete("http://localhost:3002/data"+uid+"/image"+image)
window.location.reload();
}catch(err){
console.log(err)
  }
}

  useEffect(()=>{
  
    axios.get("http://localhost:3002/getdata",{
  
      }).then(res => {
        console.warn(res);
       
        userContext.setIsData(res.data);
       
      })
     
  },[])
  return (
    <div>
      <header className="App-header">
           <Carousel>
          {userContext.isData.map((data,id)=>
          <Carousel.Item key={id}>
             <img style={{ width: "700px", height: "800px" }}
               className="d-block w-100"
               src={"uploads/"+ data.image}
               alt="Second slide"
             />
             <Carousel.Caption>
               
          {Parse(data.content)}
             </Carousel.Caption>
             {userContext.userData ? (
          
          <Stack
            className="d-flex justify-content-center mt-2"
            direction="horizontal"
            gap={3}
          >
          
            <Button to="/add"  onClick={()=>{navigate('/add')}} variant="primary" size="sm">
              Add
            </Button>
           
            <Button  onClick={()=>{navigate('/mobiletext')}} variant="info" size="sm">
              Mobiletext
           </Button>
           
        
            <Button  onClick={()=>HandleDelete({id:data.user_id,image:data.image})} variant="danger" size="sm">
              Delete
            </Button>
          
          </Stack>
        ) : null}
           </Carousel.Item>
        
          )}
     
         </Carousel>
       
    
      </header>
    </div>
  );
}

export default Home;
