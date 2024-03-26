import  { Link } from 'react-router-dom';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import TriggerExample from './overlay';
import { auth } from './fb.js';


function BankNav() {
  
  const [user, setUser]  = useState({});

  function logOut() {
    auth.signOut();
    window.location.href ="/";
  }

  auth.onAuthStateChanged((user) => {
    setUser(user);
  })
  if(user){
      return ( 
        <Container>
          <Navbar expand="lg" className="bg-body-tertiary Navbar-round" bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand>
                <img
                      alt="banklogo"
                      src="/bank.png"
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                />
                </Navbar.Brand>
                <Navbar.Brand>
                  <TriggerExample tooltip="Return to the home page">
                    <Link className="nav-link" to="/">Bad Bank</Link>
                  </TriggerExample>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link>
                      <TriggerExample tooltip="Deposit funds on this page">
                        <Link className="nav-link" to="/deposit">Deposit</Link>
                      </TriggerExample>
                    </Nav.Link>
                    <Nav.Link>
                      <TriggerExample tooltip="Withdraw funds on this page">
                        <Link className="nav-link" to="/withdraw">Withdraw</Link>
                      </TriggerExample>
                    </Nav.Link>   
                  </Nav>
                  <Navbar.Text>
                    Signed in as: {user.email} 
                  </Navbar.Text>
                  <Button onClick={logOut}>
                    Log Out
                  </Button>
                </Navbar.Collapse>
              </Container>
          </Navbar>
        </Container>
      );
  }
  else {
    return(
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary Navbar-round" bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand>
                <img
                      alt="banklogo"
                      src="/bank.png"
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                />
                </Navbar.Brand>
                <Navbar.Brand>
                  <TriggerExample tooltip="Return to the home page">
                    <Link className="nav-link" to="/">Bad Bank</Link>
                  </TriggerExample>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link>
                      <TriggerExample tooltip="View all data on this page">
                        <Link className="nav-link" to="/alldata">All Data</Link>
                      </TriggerExample>
                    </Nav.Link>    
                    <Nav.Link>
                      <TriggerExample tooltip="View all data on this page">
                        <Link className="nav-link" to="/login">Login</Link>
                      </TriggerExample>
                    </Nav.Link>    
                    <Nav.Link>
                      <TriggerExample tooltip="Create an account on this page">
                        <Link className="nav-link" to="/createaccount">Sign Up</Link>
                      </TriggerExample>
                    </Nav.Link>   
                  </Nav>
                </Navbar.Collapse>
              </Container>
          </Navbar>
        </Container>
    )
  }
}


export default BankNav;