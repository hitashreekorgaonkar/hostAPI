const mongoose = require("mongoose");

uri =
  "mongodb+srv://prisha:8fIwU72GGiQQ8iNW@nodetuts.kakpa.mongodb.net/nodetuts?retryWrites=true&w=majority";

const connectDB = () => {
  console.log("connect db");
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
