import { crud } from "./src/crudService";
import { regionService } from "./src/mongoServices";
const PROTO_PATH = "users.proto";

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
    let user = call.request;

    callback(null, user);
  },
  CreateRegion: async (call, callback) => {
    console.log("CreateRegion Todo2");

    let region = call.request;
    let db = await crud.dbCreate();
    let regionData = await crud.dbConnect(db, region.name);
    let data = await regionService.insertOne(region);
    callback(null, data);
  },
  CreateTodo: (call, callback) => {
    let Todo = call.request;
    callback(null, Todo);
  },
  GetAllUser: (_, callback) => {
    console.log("GetAllUser Todo2");

    callback(null, {});
  },
  UpdateUser: (call, callback) => {
    let updateUser = call.request;
    callback(null, updateUser);
  },
  GetAllRegion: async (_, callback) => {
    console.log("getAll Region Is Calling");
    let data = await regionService.findRegion();
    console.log("data", data);
    callback(null, { regions: data });
  },
  GetAllTodo: (_, callback) => {
    callback(null, {});
  },
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
server.start();
