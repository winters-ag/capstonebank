import { MongoClient }  from  'mongodb';
 
const url  = 'mongodb://localhost:27017';
let db     = null;
let client = null;

MongoClient.connect(url)
  .then(client => {
    console.log("Connected successfully to db server");

    db = client.db('myproject');
  });

function connect(){
  MongoClient.connect(url)
  .then(res => {
    console.log("Connected successfully to db server");
    return res;
  });
}

export function create(name, email, password, fbId) {
  return new Promise((resolve,reject) =>{
    const collection = db.collection('users');
    const doc = {fbId, name, email, password, balance:0, transactions:[]};
    collection.insertOne(doc)
      .then(result => {
        console.log(`Inserted: ${doc}`)
        resolve(doc);
      })
      .catch(() => reject(error));
  })
}

export function all(){

  let accounts = [];
  let transactions = [];
  return new Promise((resolve, reject) => {
    db.collection('users')
      .find({})
      .toArray()
      .then(docs => {
        accounts = docs;
        console.log(`Accounts Retrieved: ${docs}`)
        resolve(docs);
      })
      .catch(err => reject(err))
      .finally(() => {
        console.log(`Accounts Retrieved`)
      })

    // db.collection('transactions')
    //   .find({})
    //   .toArray()
    //   .then(docs => {
    //     transactions = docs;
    //     console.log(`Transactions Retrieved: ${transactions}`)
    //   })
    //   .catch(err => reject(err))
    //   .finally(() => {
    //     console.log('transactions retrieved')
    //   })
    // resolve({...accounts, ...transactions});
  });
}

export function transaction(account, amount) {
  return new Promise((resolve, reject) => {
    const collection = db.collection('transactions');

    const doc = {account, amount}
    collection.insertOne(doc)
      .then(result => {
        console.log(`Inserted Transaction: ${doc}`)
        resolve(doc);
      })
      .catch(err => reject(err))
      .finally(() => {
        console.log('transaction connection closed');
      })
  });
}

function updateAccount(account, amount) {
  
}