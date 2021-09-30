const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connecting to local database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database Connected!"));

//importing friend model
const FriendModel = require("./models/friends");

//insert data route
app.post("/insert", async (req, res) => {
  const friend = new FriendModel({
    name: req.body.name,
    age: req.body.age,
    description: req.body.description,
  });
  await friend.save((err) => {
    err ? console.log(err) : console.log("friend saved to db");
  });

  res.send(friend);
});

//read data route
app.get("/read", (req, res) => {
  FriendModel.find({}, (err, result) => {
    console.log(result);
    err ? res.send(err) : res.send(result);
  });
});

//update data route
app.put("/update", async (req ,res) => {
  const newName = req.body.newName;
  const newAge = req.body.newAge;
  const newDescription = req.body.newDescription;
  const id = req.body.id;

  try { 
    await FriendModel.findById(id, (err, friend) => {
      friend.name = newName;
      friend.age = newAge;
      friend.description = newDescription;
      friend.save();
    });
  } catch (error) {
    console.log(error);
  }

  res.send("friend updated successfully!");
});


//delete data route
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await FriendModel.findByIdAndDelete(id).exec();
  } catch (error) {
    console.log(error);
  }
  res.send("friend Removed!")
})

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3001!");
});
