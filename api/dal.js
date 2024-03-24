import { MongoClient, ServerApiVersion }  from  'mongodb';
import 'dotenv/config';
 
const url               = process.env.ATLASURL;
const project           = process.env.MONGOPROJECT;
const mongoColl       = process.env.MONGOCOLLECTION;

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping:1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!")
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

export async function create(name, email, password, fbId) {

  const doc = {
    fbId, 
    name, 
    email, 
    password, 
    savingsbalance:0,
    checkingbalance:0, 
    savings:true,
    checking:false,
    savingstransactions:[],
    checkingtransactions:[]
  };


  try{
    await client.connect();
    console.log('connected to atlas');

    const db              = client.db(project);
    const collection      = db.collection(mongoColl);

    return new Promise((resolve,reject) =>{
      collection.insertOne(doc)
        .then(result => {
          console.log(`Inserted: ${doc}`)
          resolve(result);
        })
        .catch((error) => reject(error))
        .finally(() => {
          client.close();
        })
    })
  } catch (error) {
    console.error(error);
    throw error;
  } 

}

export async function all(){

  try {
    await client.connect();
    const db = client.db(project);

    return new Promise((resolve, reject) => {
      db.collection(mongoColl)
        .find({})
        .toArray()
        .then(docs => {
          resolve(docs);
        })
        .catch(err => reject(err))
        .finally(() => {
          client.close();
          console.log(`Accounts Retrieved`)
        })
  });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function transaction(accountId, amount, type) {

  try{
    await client.connect();
    const db = client.db(project);

    const filter = {"fbId":accountId}
    const timestamp = Date.now();
    const formatter = new Intl.DateTimeFormat('en-US', {dateStyle: 'long'})
    const formattedTime = formatter.format(timestamp);
    const delta = Number(amount);
    var newBalance = 0;
  
    var currAcct = await db.collection(mongoColl).findOne(filter)
    newBalance = currAcct.savingsbalance + delta;      
  
    return new Promise((resolve, reject) => {
      db.collection(mongoColl)
        .updateOne(filter, 
          {
            $inc: {
              "savingsbalance":delta
            },
            $push: {
              savingstransactions:{
                "amount":amount,
                "date":formattedTime,
                "type":type,
                "balance":newBalance
              }
            }
          })
        .then(data => {
          resolve(data);
          console.log(`Dal: ${JSON.stringify(data)}`)
        })
        .catch(err => reject(err))
        .finally(() => {
          client.close();
          console.log('connection closed');
        })
    })
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser(account) {

  try{
  await client.connect();
  const db = client.db(project);
  console.log(`DAL account ID: ${account}`);
  const filter = {"fbId":account}


  return new Promise((resolve,reject) =>{
    db.collection(mongoColl)
      .findOne(filter)
      .then(doc => {
        resolve(doc);
      })
      .catch(err => reject(err))
      .finally(() => {
        client.close();
        console.log('Dal GetUser Complete')
      })
  })
  } catch(error) {
    console.error(error);
    throw error;
  }
}
