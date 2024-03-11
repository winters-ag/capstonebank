const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

 

// connect to mongo

MongoClient.connect(url)
  .then(res =>{
    console.log('Connected');

    //database name
    const dbName = 'myproject';
    const db     = res.db(dbName)

    //new user
    var name  = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';
    console.log(email);


    //insert into customer table
    var collection = db.collection('customers');
    var doc        = {name, email};

    collection.insertOne(doc)
      .then(res => console.log('Document Inserted:' + res.insertedId));

    db.collection('customers').find().toArray()
      .then(docs => {
        console.log(docs);

        res.close();
      })

  });