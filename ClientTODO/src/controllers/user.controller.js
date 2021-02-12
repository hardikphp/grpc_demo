import { errorLogger } from "../utils";
// import { userService } from "../mongoServices";
// import { crud } from "../crudService";
// import { userModel } from "../models";
const ObjectID = require("mongodb").ObjectID;
// const client = require("../../client");
import { client1 } from "../../client";

const addUser = async (req, res) => {
  // let db = await crud.dbCreate();
  try {
    let { body } = req,
      data = null;
    client1.insert(body, async (err, saveuser) => {
      console.log("User Calling");
      if (err) throw err;
      console.log("saveuser", saveuser);
      // let dbconnect = await crud.dbConnect(db, saveuser.regionName);
      // data = await dbconnect.collection("User").insertOne(saveuser);
      // data &&
      res.status(200).send({
        success: true,
        message: "User Added SuccessFully",
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

const updateUser = async (req, res) => {
  let db = await crud.dbCreate();
  try {
    let { query, body } = req,
      { id } = query,
      data = null;

    client.UpdateUser(body, async (err, updateUSer) => {
      if (err) throw err;
      let dbconnect = await crud.dbConnect(db, updateUSer.regionName);
      data = await dbconnect
        .collection("User")
        .updateOne({ _id: new ObjectID(id) }, { $set: body });
      data &&
        res.status(200).send({
          success: true,
          message: "User Update SuccessFully",
        });
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  console.log("client GetUser Calling");
  // let db = await crud.dbCreate();
  try {
    let { body } = req;
    console.log('body', body)
    // { regionName } = query;

    client1.GetAllUser(body, async (err, data) => {
      console.log("Get User Calling");
      if (err) throw err;
      console.log("data", data);
      res.status(200).send({
        success: true,
        message: data.users,
      });
      /*let dbconnect = await crud.dbConnect(db, regionName);
      let findData = dbconnect.collection("User");
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
        });*/
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const removeUser = async (req, res) => {
  let db = await crud.dbCreate();
  try {
    let { query, body } = req,
      { id } = query,
      data = null;
    let dbconnect = await crud.dbConnect(db, body.regionName);
    data = await dbconnect
      .collection("User")
      .deleteOne({ _id: new ObjectID(id) });
    if (!data) throw new Error("User Not Found");
    data &&
      res.status(200).send({
        success: true,
        message: "User Remove SuccessFully",
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
  await crud.dbClose(db);
};

// var mongodb = require("mongodb");
// var MongoClient = mongodb.MongoClient;

// const dbCreate = async (regionName, body) => {
//   var db = await MongoClient.connect(
//     `mongodb+srv://root:root@todo.csrq2.mongodb.net/`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   );
//   var dbo = db.db(regionName);
//   let data = await dbo.collection("User").insertOne(body);
//   db.close();
//   return data.result.n;
// };

export default {
  addUser,
  updateUser,
  getUser,
  removeUser,
};
