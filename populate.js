// add mock data from Mockaroo
// we have to connect DB one more time (script -> node .\populate.js)

const User = require("./models/User");
const usersData = require("./mockData/users.json");

const connectDB = require("./db/connect");
require("dotenv").config();

const start = async () => {
  try {
    await connectDB(process.env.CONNECT_STRING);

    // delete existing data
    await User.deleteMany({});

    // add mock data
    await User.create(usersData);
    console.log("Success!!!");
    // terminate the process (0 -> success code)
    process.exit(0);
  } catch (err) {
    console.log(err);
    // terminate the process (1 -> failure code)
    process.exit(1);
  }
};

start();
