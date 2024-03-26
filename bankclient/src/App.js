import Home                        from './bankfiles/home.js';
import Alldata                     from './bankfiles/alldata.js'
import Balance                     from './bankfiles/balance.js'
import Context                     from './bankfiles/context.js'
import CreateAccount               from './bankfiles/createaccount.js'
import Deposit                     from './bankfiles/deposit.js'
import Login                       from './bankfiles/login.js'
import Withdraw                    from './bankfiles/withdraw.js'
import BankNav                     from './bankfiles/navbar.js';
import React                       from 'react';
import {useState,useEffect}        from 'react';
import axios                       from 'axios'
import                                  './App.css';
import {Route,Routes, HashRouter}  from 'react-router-dom';
import { UserContext }             from './index.js'
import { Container } from 'react-bootstrap'

function App() {

  const [accounts,setAccounts]             = useState([]);
  const [transactions, setTransactions]    = useState([]);

  useEffect(() => {
    
  }, []);
  return (
    <Container fluid>
      <HashRouter>
          <BankNav />
          <UserContext.Provider value={{accounts:accounts,transactions:transactions,user:''}}>
            <Routes>
                <Route path="/"                 exact          element={<Home />}    />
                <Route path="/alldata/"         exact          element={<Alldata />} />
                <Route path="/balance/"         exact          element={<Balance />} />
                <Route path="/context/"         exact          element={<Context />} />
                <Route path="/createaccount/"   exact          element={<CreateAccount />} />
                <Route path="/deposit/"         exact          element={<Deposit />} />
                <Route path="/login/"           exact          element={<Login />} />
                <Route path="/withdraw/"        exact          element={<Withdraw />}/>
            </Routes>
          </UserContext.Provider>
      </HashRouter>

    </Container>
  );
}

export default App;
