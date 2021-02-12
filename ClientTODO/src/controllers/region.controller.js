import { set, connect, connection, createConnection, Schema } from "mongoose";
import { client, client1 } from "../../client";

const addRegion = async (req, res) => {
  // let db = await crud.dbCreate();
  try {
    let { body } = req,
      data = null,
      regionData = null;
    client.CreateRegion(body, async (err, saveRegion) => {
      console.log("Calling client");
      if (err) throw err;
      console.log(saveRegion);
      // regionData = await crud.dbConnect(db, saveRegion.name);
      // data = await regionService.insertOne(saveRegion);
      // data &&
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

const getRegion = async (req, res) => {
  try {
    client.GetAllRegion(null, (err, data) => {
      console.log("Calling client1");
      if (err) throw err;
      console.log("data", data.regions);
      // let data = await regionService.findRegion();
      // data &&
        res.status(200).send({
          success: true,
          regions:data.regions,
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
  getRegion,
};
