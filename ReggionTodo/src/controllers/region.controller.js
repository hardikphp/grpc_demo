import { set, connect, connection, createConnection, Schema } from "mongoose";
import { regionService } from "../mongoServices";
import { crud } from "../crudService";
import client from "../../client";

const addRegion = async (req, res) => {
  console.log("addRegion 30043 Todo 2")
  let db = await crud.dbCreate();
  try {
    let { body } = req,
      data = null,
      regionData = null;
    client.CreateRegion(body, async (err, saveRegion) => {
      if (err) throw err;
      regionData = await crud.dbConnect(db, saveRegion.name);
      data = await regionService.insertOne(saveRegion);
      data &&
        res.status(200).send({
          success: true,
          message: "Region Add SuccessFully",
        });
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
  // await crud.dbClose(db);
};

const updateRegion = async (req, res) => {
  try {
    let { query, body } = req,
      { id } = query,
      data = null;

    data = await regionService.updateRegion(id, body);
    data &&
      res.status(200).send({
        success: true,
        message: "Region Update SuccessFully",
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const getRegion = async (req, res) => {
  console.log("getRegion 3043 Todo Folder")
  try {
    client.GetAllRegion(null, async (err) => {
      if (err) throw err;
      let data = await regionService.findRegion();
      data &&
        res.status(200).send({
          success: true,
          data,
        });
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// var mongodb = require("mongodb");
// var MongoClient = mongodb.MongoClient;

// const dbCreate = async (regionName) => {
//   MongoClient.connect(
//     `mongodb+srv://root:root@todo.csrq2.mongodb.net/`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     function (err, client) {
//       const collection = client.db(regionName); //.collection("test-collection1");
//       /*collection
//         .insertOne({ id: 1 })
//         .then((result) => console.log(result))
//         .catch((err) => console.log(err));*/
//       //client.close();
//     }
//   );
// };

export default {
  addRegion,
  updateRegion,
  getRegion,
};
