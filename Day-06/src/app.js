const express = require("express");
const userDataModel = require("./models/userData.models");
const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
  const { name, surname, age, course } = req.body;

  const userDataCreate = await userDataModel.create({
    name,
    surname,
    age,
    course,
  });

  res.status(201).json({
    message: "user data is created",
    userDataCreate,
  });
});

app.get("/user", async (req, res) => {
  const userDataFetch = await userDataModel.find();

  res.status(200).json({
    message: "user data fetch",
    userDataFetch,
  });
});

app.delete("/user/:_id", async (req, res) => {
  const { _id } = req.params;

  const userDataDelete = await userDataModel.deleteOne({
    _id,
  });

  res.status(200).json({
    message: "user data is deleted successfully",
    userDataDelete,
  });
});

app.patch("/user/:_id", async (req, res) => {
  const { _id } = req.params;
  const { course } = req.body;

  const userDataModify = await userDataModel.updateOne(
    { _id },
    { $set: { course } },
  );

  res.status(200).json({
    message: "user data is updated successfully",
    userDataModify,
  });
});

module.exports = app;
