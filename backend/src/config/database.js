const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://singhrahulkumar820:listentoit@fullstackprojects.zpy5y.mongodb.net/devSwipe?retryWrites=true&w=majority&appName=Fullstackprojects"
  );
};
module.exports = connectDb;

