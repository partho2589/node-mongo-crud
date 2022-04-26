const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// user:dbuser1
// password:yFbJKJPhwnIUmvGe



// const uri = "mongodb+srv://dbuser1:yFbJKJPhwnIUmvGe@cluster0.amg0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("userdata").collection("users");
//     console.log(' db connected')
//     // perform actions on the collection object
//     client.close();
// });
const uri = "mongodb+srv://dbuser1:yFbJKJPhwnIUmvGe@cluster0.amg0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        await client.connect();
        const userCollection = client.db("userdata").collection("users");
        // get user
        app.get('/user', async(req, res)=>{
            const query = {};
            const cursor = userCollection.find(query)
            const users = await cursor.toArray();
            res.send(users)
        })

        // post User: add a new user
       app.post('/user', async (req, res)=>{
           const newUser = req.body;
           console.log('adding new use',newUser )
            const result = await userCollection.insertOne(newUser)
           res.send(result)
        //    res.send({result: 'success'})
       })
   }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running My node CRUD Server')
});

app.listen(port, () => {
    console.log('CRUD server is running')
})