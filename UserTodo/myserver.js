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
  insert: (call, callback) => {
    let user = call.request;
    callback(null, user);
  },
  CreateRegion: (call, callback) => {
    console.log("CreateRegion Todo")
    let region = call.request;
    callback(null, region);
  },
  CreateTodo: (call, callback) => {
    let Todo = call.request;
    callback(null, Todo);
  },
  GetAllUser: (_, callback) => {
    console.log('CreateRegion Todo')

    callback(null, {});
  },
  UpdateUser: (call, callback) => {
    let updateUser = call.request;
    callback(null, updateUser);
  },
  GetAllRegion: (_, callback) => {
    console.log('CreateRegion GetAllRegion Todo')
    callback(null, {});
  },
  GetAllTodo: (_, callback) => {
    callback(null, {});
  },
});

server.bind("127.0.0.1:30044", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30044");
server.start();
