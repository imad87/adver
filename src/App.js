import react,{useState,useContext, useEffect} from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Add from './components/Add';
import Edit from './components/Edit';
import MobileText from './components/MobileText';
import Delete from './components/Delete';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

import {BrowserRouter as Router,Link,Route,Routes,Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import axios from 'axios';

function App() {
  
  const [email, setIsEmail] = useState("");
  const [password, setIsPassword] = useState("");
  const [isData, setIsData] = useState([]);
const [islogin, setIsLogin] = useState(false);
const [showEmail, setShowEmail]= useState("");
const [userData, setUserData]= useState(false);
const [backEnd, setBackEnd]=useState("");

useEffect(()=>{
  
  axios.get("http://localhost:3002/api",{

    }).then(res => {
      console.warn(res);
     
      setBackEnd(res.data);
     
    })
   
},[])

useEffect(()=>{
  console.log(showEmail)
  setUserData(localStorage.getItem('user'));
  if(userData){
    setShowEmail(JSON.parse(userData));
  console.log(userData)
}else{
  console.log("user is not logged in!")
}

},[])
const handleLogOut = ()=>{

  setShowEmail("");
  window.localStorage.clear();
      }
  return (
    <div className="App">
      <Router>
      <Navbar variant="dark" bg="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand  >Solider Home</Navbar.Brand>
      <p>{!backEnd ? "loading..." : "oki" }</p>
      <Navbar.Toggle aria-controls="navbar-dark-example" />
      <Navbar.Collapse id="navbar-dark-example">
        <Nav>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Dropdown"
            menuVariant="dark"
          >
          <Link to="/Login">
          
            <NavDropdown.Item onClick={handleLogOut} href="#redirect" >{userData ? "logout" : "login"}</NavDropdown.Item> 
        
            <NavDropdown.Item >{userData ? showEmail.email : "No User"}</NavDropdown.Item>
            </Link>
           
            <NavDropdown.Divider />
           
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
          <UserContext.Provider value ={{userData:userData, setUserData:setUserData, isData:isData, setIsData:setIsData ,email:email, setIsEmail:setIsEmail,password:password, setIsPassword:setIsPassword,islogin:islogin, setIsLogin:setIsLogin,showEmail:showEmail, setShowEmail:setIsEmail}}>   
        <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/add" element={userData ? <Add /> : "page not found"}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/delete" element={<Navigate to="/"/>}></Route>
        <Route path="/mobiletext" element={<MobileText />}></Route>
        <Route path="/redirect" element={userData ? <Navigate to="/"/>: <Navigate to="/login"/>}></Route>
        </Routes>
          </UserContext.Provider>
      </Router>
  
    </div>
  );
}

export default App;
