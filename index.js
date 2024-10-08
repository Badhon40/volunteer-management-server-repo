const express=require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require('cors')
require("dotenv").config()
const app=express()

const port=process.env.PORT || 5000;

const corsOptions = {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      
    ],
    credentials: true,
    optionSuccessStatus: 200,
  }

app.use(cors(corsOptions))
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xbwmhk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const postCollection=client.db('volunteerHub').collection('posts')
    const storyCollection=client.db('volunteerHub').collection('stories')
        // get all posts

    app.get('/posts',async(req,res)=>{
        const result=await postCollection.find().toArray()
        res.send(result)
    })

    app.get('/stories',async(req,res)=>{
        const result=await storyCollection.find().toArray()

        res.send(result)
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('Server is running')
})

app.listen(port,(req,res)=>{
    console.log(`Ser is running on port ${port}`)
})