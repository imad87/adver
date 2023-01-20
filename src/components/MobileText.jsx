import React,{ useState ,useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import axios from "axios";

function MobileText() {

const [recipient , setRecipient]=useState('');
const[textmessage, setTextMessage]=useState('');


const HandelOnSubmit = (e)=>{
    e.preventDefault();
    console.log("clicck")
    const textData ={
        recipient:recipient,
        textmessage:textmessage
    }
    console.log(textData);
    axios.post(`http://localhost:3002/send-text?recipient=${textData.recipient}&textmessage=${textData.textmessage}`)
 .then((response)=>{

    console.log(response);
  
 })  .catch((err)=>{

    console.log("error");
})
        
    


}
  return (
    <header className="App-header"> 
    <Form onSubmit={HandelOnSubmit}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Email address</Form.Label>
      <Form.Control value={recipient} onChange={(e)=>setRecipient(e.target.value)} type="tel" placeholder="Please enter the Number" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Example textarea</Form.Label>
      <Form.Control value={textmessage} onChange={(e)=> setTextMessage(e.target.value)} as="textarea" rows={3} />
    </Form.Group>
    <Button  type="submit">Submit</Button>
  </Form>
  </header>
  )
}

export default MobileText