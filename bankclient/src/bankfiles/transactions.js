import { auth } from './fb.js';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, useContext } from 'react';
import {Card, UserContext} from '../index.js'
import './bankstyles.css'




function Transactions() {
  const ctx = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [email, setEmail]               = useState('');
  const [user, setUser]           = useState(ctx.user);

  
  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      if(currUser) {
        setUser(currUser.uid);
      }
    })
    fetch(`/account/${user}`)
    .then(response => response.json())
    .then(response => {
      setTransactions(response.savingstransactions);
      setEmail(response.email);
    })
  },[user])


  return(
    <div className="col scroll">
      <Card
        bgcolor="dark"
        header={`${email}: Transactions`}
        body={
          transactions.map((item) => {
            return <Card
              bgcolor={(item.type === "Deposit") ? "success" : "danger"}
              header={`${item.type}`}
              body={`Amount: ${item.amount} Date: ${(item.date)}`}
              footer={`Running Balance: ${item.balance}`}
            />
          })
        }
      />
    </div>
  )
}

export default Transactions