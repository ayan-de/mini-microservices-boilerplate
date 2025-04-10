const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

//when someone creates a new posts we
//emit(post request) an evemt saying someone has created new posts
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  await axios
    .post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log(`Event Received`);
});

app.listen(4000, () => {
  console.log(`Server listening at port 4000`);
});
