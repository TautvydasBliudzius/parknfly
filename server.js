const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 8080;

const URI = process.env.DB_CONNECTION_STRING;

const app = express();

app.options('*', cors())
app.use(express.json());
app.use(cors());
app.use(cookieParser())

const client = new MongoClient(URI);

const verifyAdmin = (req, res, next) => {
  const token = req.cookies;

  if(!token) {
    return res.json("The token was not available")
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if(err) {
        console.error("Token is wrong:", err);
        return res.json("Token is wrong");
      }
      req.decodedToken = decoded; 
      next();
    });
  }
}

app.get("/admin/menu", verifyAdmin, (req, res) => {
  res.send("Success")
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const con = await client.connect();
  await con
    .db("parknfly")
    .collection("admins")
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign({ email: user.email }, "jwt-secret-key");
  
          res.send({ token, message: "Success" });
        } else {
          res.send("The password is incorrect");
        }
      } else {
        res.send("No record exist");
      }
    });
});

app.post("/spots", async (req, res) => {
  try {
    const spot = req.body;
    const con = await client.connect();
    const data = await con.db("parknfly").collection("spots").insertOne(spot);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

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
    const newOccupancy = { ...req.body, _id: new ObjectId() };
    const con = await client.connect();
    
    const result = await con
      .db("parknfly")
      .collection("spots")
      .updateOne({_id: objectId}, {$push: { occupancies: newOccupancy }})

    await con.close();
    if (result.matchedCount === 1) {
      res.send({ message: "Spot updated successfully" });
    } else {
      res.status(404).send("Spot not found");
    }
  } catch (error) {
    console.error(error)
    res.status(500).send(error);
  }
});

app.delete("/spots/:id", async (req, res) => {
  try {
    const id = req.params._id;
    const con = await client.connect();
    const result = await con
      .db("parknfly")
      .collection("spots")
      .deleteOne(id); 
    await con.close();

    if (result.deletedCount === 1) {
      res.send({ message: "Spot deleted successfully" });
    } else {
      res.status(404).send("Spot not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


app.delete("/spots/:id/occupancies/:occupancyId", async (req, res) => {
  try {
    const spotId = req.params.id;
    const occupancyId = req.params.occupancyId;
    const objectId = new ObjectId(spotId);
    
    const con = await client.connect();
    
    const result = await con
      .db("parknfly")
      .collection("spots")
      .updateOne(
        { _id: objectId },
        { $pull: { occupancies: { _id: new ObjectId(occupancyId) } } }
      );

    await con.close();
    if (result.matchedCount === 1) {
      res.send({ message: "Occupancy deleted successfully" });
    } else {
      res.status(404).send("Spot not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get("/customers", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("parknfly").collection("customers").find().toArray();
    await con.close();
    res.send(data);
    console.log(data)
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/customers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const con = await client.connect();
    const answers = await con
      .db("parknfly")
      .collection("customers")
      .find({ topicId: id })
      .toArray();
      const objectId = new ObjectId(id)
    const data = await con
      .db("parknfly")
      .collection("customers")
      .findOne({ "_id": objectId });
    await con.close();

    if (data) {
      res.send({ ...data, answers });
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


app.post("/customers", async (req, res) => {
  try {
    const customer = req.body;
    const con = await client.connect();
    const data = await con.db("parknfly").collection("customers").insertOne(customer);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});



app.delete("/customers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const con = await client.connect();
    const result = await con
      .db("parknfly")
      .collection("customers")
      .deleteOne({ id: parseInt(id) });
    await con.close();

    if (result.deletedCount === 1) {
      res.send({ message: "Customer deleted successfully" });
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/customers/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCustomer = req.body;
    const con = await client.connect();
    const result = await con
      .db("parknfly")
      .collection("customers")
      .updateOne({ id: parseInt(id) }, { $set: updatedCustomer });
    await con.close();

    if (result.matchedCount === 1) {
      res.send({ message: "Customer updated successfully" });
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/admins", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("parknfly").collection("admins").find().toArray();
    await con.close();
    res.send(data);
    console.log(data)
  } catch (error) {
    res.status(500).send(error);
  }
});




app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});