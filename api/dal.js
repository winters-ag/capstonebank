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

export function create(name, email, password) {
  return new Promise((resolve,reject) =>{
    const collection = db.collection('users');
    const doc = {name, email, password, balance:0};
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
        resolve(docs);
      })
      .catch(err => reject(err))
      .finally(() => {
        console.log("connection closed")
      })
  });
}