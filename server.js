const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 8080;

const URI = process.env.DB_CONNECTION_STRING;

const app = express();

app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get("/spots", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("parknfly").collection("spots").find().toArray();
    await con.close();
    res.send(data);
    console.log(data)
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/spots/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id)
    const occupancies = req.body;
    const con = await client.connect();
    
    const result = await con
      .db("parknfly")
      .collection("spots")
      .updateOne({_id: objectId}, {$push: { occupancies: occupancies }})

    await con.close();
    if (result.matchedCount === 1) {
      res.send({ message: "Answer updated successfully" });
    } else {
      res.status(404).send("Answer not found");
    }
  } catch (error) {
    console.error(error)
    res.status(500).send(error);
  }
});


app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});