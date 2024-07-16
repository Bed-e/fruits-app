const mongoose = require("mongoose");

const conn = () => {
  //console.log(process.env.MONGO_URI);
  try {
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once("open", () => {
      console.log("connected to mongodb via mongoose");
    });
  } catch {
    console.error(
      `something went wrong with connect to the database ${error.message}`
    );
  }
};

module.exports = conn;
