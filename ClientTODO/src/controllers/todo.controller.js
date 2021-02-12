import { errorLogger } from "../utils";
// import { todoService } from "../mongoServices";
import client from "../../client";
// import { crud } from "../crudService";
const ObjectID = require("mongodb").ObjectID;

const addTodo = async (req, res) => {
  let db = await crud.dbCreate();
  try {
    let { body } = req,
      data = null,
      todoId = null,
      AssignTo = null;
    body = {
      ...body,
      isCompleted: false,
    };
    client.CreateTodo(body, async (err, saveTodo) => {
      if (err) throw err;
      let dbconnect = await crud.dbConnect(db, saveTodo.regionName);
      AssignTo = saveTodo.assignedTo.split(",");
      let newTodo = {
        ...saveTodo,
        assignedTo: AssignTo,
      };
      data = await dbconnect.collection("Todo").insertOne(newTodo);
      todoId = data.insertedId;

      let reminderBody = {
        DateTime: body.DateTime,
        Todo: todoId,
        notifyTo: AssignTo,
        isSent: false,
      };
      data = await dbconnect.collection("Reminder").insertOne(reminderBody);
      data &&
        res.status(200).send({
          success: true,
          message: "Todo Add SuccessFully",
        });
    });
  } catch (error) {
    errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  let db = await crud.dbCreate();
  try {
    let { query, body } = req,
      { id } = query,
      data = null;

    client.UpdateUser(body, async (err, updateTodo) => {
      if (err) throw err;
      let dbconnect = await crud.dbConnect(db, updateTodo.regionName);
      data = await dbconnect
        .collection("Todo")
        .updateOne({ _id: new ObjectID(id) }, { $set: body });
      data &&
        res.status(200).send({
          success: true,
          message: "Todo Completed",
        });
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getTodo = async (req, res) => {
  let db = await crud.dbCreate();
  try {
    let { query } = req,
      { regionName } = query;
    client.GetAllTodo(null, async (err) => {
      if (err) throw err;
      let dbconnect = await crud.dbConnect(db, regionName);
      let findData = dbconnect.collection("Todo");
      findData
        .find({})
        .toArray()
        .then(function (result) {
          if (!result || result.length <= 0) throw new Error("No data found");
          result &&
            res.status(200).send({
              success: true,
              result,
            });
          db.close();
        })
        .catch(function (error) {
          res.status(400).send({
            success: false,
            message: error.message,
          });
          db.close();
        });
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export default {
  addTodo,
  updateTodo,
  getTodo,
};
