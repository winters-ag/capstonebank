import React from 'react';
import {UserContext, Card} from '../index.js';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './fb.js'
import Container from 'react-bootstrap/Container';

const useState   = React.useState;
const useContext = React.useContext;

function CreateAccount() {
  const [show, setShow]          = useState(true);
  const [status, setStatus]      = useState('');
  const [name, setName]          = useState('');
  const [email, setEmail]        = useState('');
  const [password, setPassword]  = useState('');
  const ctx = useContext(UserContext);
  let accounts = ctx.accounts;


  function validate(field, label) {
    if(label === 'password' && field.length < 8) {
      setStatus('Password must be 8 characters long');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    if(!field) {
      setStatus('Error: ' + label + ' Field is required');
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    if(label === 'email' && accounts.filter((el) => el.email === field).length > 0) {
      setStatus('An account with this email already exists');
      setTimeout(() => setStatus(''), 10000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    let id = ctx.accounts.at(-1).id + 1;
    if (!validate(name,    'name'))          return;
    if (!validate(email,   'email'))         return;
    if (!validate(password,   'password'))   return;
    
    console.log(name,email,password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      //Signed Up
      const user = userCredential.user;
      console.log(user.uid);
      //create account in db
      const url = `/account/create/${name}/${email}/${password}/${user.uid}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(JSON.stringify(data));
          setShow(false);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({errorCode, errorMessage});
      })
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Container>
      <Card
        bgcolor="info"
        header="Create Account"
        status={status}
        body={show ? (
          <>
            Name <br />
            <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
            Email Address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
            Password<br />
            <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
            <button type="submit" className="btn btn-dark" onClick={handleCreate} disabled={!name && !email && !password}>Create Account</button>
          </>
        ):(
          <>
          <h5>Success</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
          </>
        )}
      />
    </Container>
  )
}

export default CreateAccount;