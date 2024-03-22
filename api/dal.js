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

  return new Promise((resolve, reject) => {
    db.collection('users')
      .find({})
      .toArray()
      .then(docs => {
        console.log(`Accounts Retrieved: ${JSON.stringify(docs)}`)
        resolve(docs);
      })
      .catch(err => reject(err))
      .finally(() => {
        console.log(`Accounts Retrieved`)
      })

  });
}

export function transaction(account, amount, type) {

  console.log(`ID: ${account}`);
  const filter = {"fbId":account}
  const timestamp = Date.now();
  const delta = Number(amount);
  var newBalance = 0;

  db.collection('users')
    .findOne(filter)
    .then(result => {
      newBalance = result.balance + delta;
    })

  return new Promise((resolve, reject) => {
    db.collection('users')
      .updateOne(filter, 
        {
          $inc: {
            "balance":delta
          },
          $push: {
            transactions:{
              "amount":amount,
              "date":timestamp,
              "type":type,
              "balance":newBalance
            }
          }
        })
      .then(data => {console.log(`Dal: ${JSON.stringify(data)}`)})
      .catch(err => reject(err))
      .finally(data => resolve(data))
  })

}

export function getUser(account) {
  console.log(`DAL account ID: ${account}`);
  const filter = {"fbId":account}
  return new Promise((resolve,reject) =>{
    db.collection('users')
      .findOne(filter)
      .then(doc => {
        console.log(JSON.stringify(doc));
        resolve(doc);
      })
      .catch(err => console.log(err))
      .finally(console.log('Dal GetUser Complete'))
  })
}
