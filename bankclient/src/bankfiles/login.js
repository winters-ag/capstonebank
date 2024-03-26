import React from 'react'
import {useState} from 'react'
import {UserContext, Card} from '../index.js'
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup }  from 'firebase/auth';
import 'firebaseui/dist/firebaseui.css'
import { auth } from './fb.js'
import { Container, Row, Col, Button } from 'react-bootstrap'




function Login() {
  const [email, setEmail]        = useState('');
  const [password, setPassword]  = useState('');
  const [status, setStatus]      = useState('');
  const ctx = React.useContext(UserContext);

  function handleSignIn() {
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

  async function googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        ctx.user = result.user.uid;
        console.log(`google user: ${JSON.stringify(result.user)}`)
        const checkurl = `/account/check/${result.user.uid}`;
        fetch(checkurl)
          .then(code => {
            if (code.status === 202) {
              const url = `/account/create/${result.user.displayName}/${result.user.email}/google/${result.user.uid}`;
              fetch(url)
                .then(response => response.json())
                .then(data => {
                  console.log(JSON.stringify(data));
                  window.location.href ="/";
                });
            }
          });
      }).catch((error) => {
        console.error(error);
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
                <Button className="btn btn-dark" onClick={googleSignIn}>Sign in with Google</Button>
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