import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  title: String,
  img:String,
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});


export const Category = Mongoose.model("Category", categorySchema);
