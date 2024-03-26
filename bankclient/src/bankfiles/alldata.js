import React from 'react'
import {Card, UserContext} from '../index.js'
import { auth } from './fb.js';
import { onAuthStateChanged } from 'firebase/auth';
import Transactions from './transactions.js'

function Alldata() {
  const [data, setData]                       = React.useState('');
  const [dbAccounts, setDBAccounts]           = React.useState([]);
  const [accTransactions, setAccTransactions] = React.useState([]);
  const [accountID, setAccountID]             = React.useState('');
  const [user, setUser]                       = React.useState({});

  const ctx = React.useContext(UserContext);
  let ctxUser = ctx.user;

  React.useEffect(() => {
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        setData(JSON.stringify(data));
        setDBAccounts(data);
      })
  },[])

  function getAccount(){
    const url = `/account/${user}`;
        fetch(url)
          .then(response => response.json())
          .then(response => {
            const resTransactions = response.savingstransactions;
            const accID = response.fbId;
            setAccTransactions(resTransactions);
            setAccountID(accID);
            console.log(`Transactions Retrieved`);
          })
          .catch(err => console.log(err))
  }
  return (
    <>
      <h3>All Data:</h3>
      {data}
      <div className="container">
        <div className = "row align-items-start">
          <div className="col">
            <Card
              bgcolor="primary"
              header="Mongo Accounts"
              body={
                dbAccounts.map((item) => {
                  return <Card
                    bgcolor="success"
                    header={`Account ID: ${item.fbId} || Email:  ${item.email}`}
                    body={`Account Name: ${item.name} || Balance: ${item.savingsbalance}`}
                    footer={`Number on transactions: ${item.savingstransactions.length()}`}
                  />
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Alldata;