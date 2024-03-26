import React from 'react'
import {UserContext, Card} from '../index.js'
import { Container, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap';
import TriggerExample from './overlay'
import { auth } from './fb.js';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react'
import Transactions from './transactions'
import './bankstyles.css'

const useState = React.useState;
const useContext = React.useContext;

function Deposit() {
  const ctx = useContext(UserContext);
  const [amount, setAmount]             = useState('0');
  const [email, setEmail]               = useState('');
  const [status, setStatus]             = useState('');
  const [show, setShow]                 = useState(true);
  const [user, setUser]                 = useState(ctx.user);
  const [balance, setBalance]           = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [account, setAccount]           = useState({});

  
  
  useEffect(() => {
    const userId = auth.currentUser.uid;
    setUser(userId);


    const url = `/account/${user}`;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setBalance(response.savingsbalance);
      })
      .catch(err => console.log(err))
    
  }, [user]);

  function validate(field, label) {
    if(isNaN(field)) {
      setStatus('This is not a number');
      setTimeout(() => setStatus(''),10000);
      return false;
    }
    if(!field || field <= 0) {
      setStatus('The Deposit must be larger than $0');
      setTimeout(() => setStatus(''), 10000);
      return false;
    }
    return true;
  }
  
  function addDeposit() {
    if(!validate(amount, 'amount')) return;
    const url = `/account/transaction/${user}/${amount}/Deposit`;
    fetch(url)
      .then(response => console.log(response))
      .then(data => {
        setShow(false);
      })
      .catch(error => {
        console.log(error);
      })
    
      setBalance(Number(balance)+Number(amount))
  }

  function clearForm() {
    setAmount(0);
    setShow(true);
  }

  return (
    <Container className="full-height">
      <Row>
        <Col>
          <Transactions/>
        </Col>
        <Col xs={6} className="scroll">
          <h1>Thank you for using the worst bank ever</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper feugiat nibh sed pulvinar proin. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Ullamcorper sit amet risus nullam eget felis eget nunc lobortis. Amet porttitor eget dolor morbi non arcu risus. Tincidunt augue interdum velit euismod in. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in. Metus dictum at tempor commodo ullamcorper. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Mattis rhoncus urna neque viverra justo nec ultrices. Ut enim blandit volutpat maecenas. Tortor at risus viverra adipiscing at in. Enim ut sem viverra aliquet eget sit amet. Turpis egestas integer eget aliquet nibh praesent tristique magna. Nisi porta lorem mollis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vestibulum lectus mauris ultrices eros in cursus turpis massa.
            </p>
            <p>
            Justo eget magna fermentum iaculis eu. Ipsum faucibus vitae aliquet nec. Aliquam id diam maecenas ultricies mi eget mauris. Nisl vel pretium lectus quam id leo in vitae. Quis auctor elit sed vulputate mi sit amet mauris. Quis enim lobortis scelerisque fermentum. Sapien nec sagittis aliquam malesuada bibendum arcu. Arcu bibendum at varius vel pharetra vel turpis. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Blandit turpis cursus in hac. Ornare lectus sit amet est placerat in egestas erat. Platea dictumst vestibulum rhoncus est pellentesque elit. In aliquam sem fringilla ut morbi. Sodales neque sodales ut etiam sit amet nisl. Erat imperdiet sed euismod nisi porta. Elit pellentesque habitant morbi tristique senectus et netus et malesuada. Tristique senectus et netus et malesuada fames. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus.
            </p>
            <p>
            Venenatis lectus magna fringilla urna porttitor rhoncus. Et odio pellentesque diam volutpat. Mattis nunc sed blandit libero volutpat sed cras ornare. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Lectus urna duis convallis convallis tellus id interdum. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Ac felis donec et odio pellentesque diam volutpat. Odio ut sem nulla pharetra diam sit amet. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Ultrices vitae auctor eu augue ut lectus. Neque viverra justo nec ultrices dui sapien eget mi. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Auctor urna nunc id cursus. Odio eu feugiat pretium nibh ipsum consequat nisl. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc. At ultrices mi tempus imperdiet nulla malesuada pellentesque. Sed viverra tellus in hac habitasse. Eros in cursus turpis massa tincidunt.
            </p>
        </Col>
        <Col>
          <Card
          bgcolor="info"
          txtcolor="black"
          header="Deposit"
          status={status}
          body={show ? (
            <>
            Amount <br />
            <input type="input" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
            <button type="submit" className="btn btn-success" onClick={addDeposit} disabled={(!amount)}>Deposit</button>
            </>
          ):(
            <>
            <h5>You have successfully deposited {amount} dollars</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Make another deposit</button>
            </>
          )}
          footer={`Current Balance: ${balance}`}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Deposit;