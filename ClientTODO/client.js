const PROTO_PATH = "users.proto";

const grpc = require("grpc");
const grpc1 = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;
const client = new UserService(
  "localhost:30043",
  grpc.credentials.createInsecure()
);

//const UserService1 = grpc.loadPackageDefinition(packageDefinition).UserService;
const client1 = new UserService(
  "localhost:30044",
  grpc.credentials.createInsecure()
);

/*const UserService = grpc1.loadPackageDefinition(packageDefinition).UserService1;
const client1 = new UserService(
  "localhost:30044",
  grpc1.credentials.createInsecure()
);*/

module.exports = { client, client1 };
