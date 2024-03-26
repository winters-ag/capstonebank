import React from 'react'
import {useState} from 'react'
import {UserContext, Card} from '../index.js'
import { signInWithEmailAndPassword }        from 'firebase/auth';
import 'firebaseui/dist/firebaseui.css'
import { auth } from './fb.js'
import { Container, Row, Col, Button } from 'react-bootstrap'




function Login() {
  const [email, setEmail]        = useState('');
  const [password, setPassword]  = useState('');
  const [status, setStatus]      = useState('');
  const ctx = React.useContext(UserContext);

  function handleSignIn() {
    console.log(auth);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        ctx.user = userCredential.user.uid;
        window.location.href ="/";
      })
      .catch((error) => {
        console.log(error);
      })    
  }

  return (
    <Container>
      <Row>
        <Col/>
        <Col>Please Sign in Here</Col>
        <Col/>
      </Row>
      <Row>
        <Col/>
        <Col xs={6}>
          <Card
            bgcolor="warning"
            header="Sign In"
            status={status}
            body={(
              <>
                Email Address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                Password<br />
                <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                <Button className="btn btn-dark" onClick={handleSignIn} disabled={!email && !password}>Sign In</Button>
              </>
            )}
          />
        </Col>
        <Col/>
      </Row>
    </Container>
  )
}

export default Login;