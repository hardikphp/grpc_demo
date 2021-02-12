import { crud } from "./src/crudService";
const PROTO_PATH = "users.proto";
//const REGION_PROTO_PATH = "/home/jay/Documents/TODO/region.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const usersProto = grpc.loadPackageDefinition(packageDefinition);

// const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();

server.addService(usersProto.UserService.service, {
  insert: async (call, callback) => {
    console.log("create USer");
    let user = call.request;
    let db = await crud.dbCreate();
    let dbconnect = await crud.dbConnect(db, user.regionName);
    let data = await dbconnect.collection("User").insertOne(user);

    callback(null, data);
  },
  CreateRegion: (call, callback) => {
    let region = call.request;
    callback(null, region);
  },
  CreateTodo: (call, callback) => {
    let Todo = call.request;
    callback(null, Todo);
  },
  GetAllUser: async (call, callback) => {
    let getUser = call.request;
    let db = await crud.dbCreate();
    let dbconnect = await crud.dbConnect(db, getUser.regionName);
    let findData = dbconnect.collection("User");
    findData
      .find({})
      .toArray()
      .then(function (result) {
        if (!result || result.length <= 0) throw new Error("No data found");
        callback(null, { users: result });
        db.close();
      })
      .catch(function (error) {
        db.close();
      });
  },
  UpdateUser: (call, callback) => {
    let updateUser = call.request;
    callback(null, updateUser);
  },
  GetAllRegion: (_, callback) => {
    callback(null, {});
  },
  GetAllTodo: (_, callback) => {
    callback(null, {});
  },
});

server.bind("127.0.0.1:30044", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30044");
server.start();
