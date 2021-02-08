var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

const dbCreate = async () => {
  var db = await MongoClient.connect(
    `mongodb+srv://root:root@todo.csrq2.mongodb.net/`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  return db;
};

const dbConnect = async (db1, regionName) => {
  var dbo = db1.db(regionName);
  return dbo;
};
const dbClose = async (db) => {
  db.close();
};

export default {
  dbCreate,
  dbConnect,
  dbClose,
};
