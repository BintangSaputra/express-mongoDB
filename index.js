const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const Contact = mongoose.model("Contact", {
  name: String,
  phone: String
});
const DataDummy = [
  {
    id: 1,
    name: "Marlina Valkyrie",
    phone: "0213848740"
  }
];

// setelah di install dimasukin ke require terus di use
app.use(bodyParser.json());

// panggil data yang udah ada
app.get("/", (req, res) => {
  // pake find untuk nampilin data,terus dipake async(then)
  Contact.find().then(result =>
    res.send({
      data: result
    })
  );
});

// masukin data dari front-end
app.post("/", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const phone = req.body.phone;

  const person = new Contact({
    name,
    phone
  });

  person.save().then(result =>
    res.send({
      message: "success",
      data: result
    })
  );
});

app.get("/", (req, res) => res.send("welcome!"));

app.listen(3000, () => console.log("express is ready on localhost: 3000"));
