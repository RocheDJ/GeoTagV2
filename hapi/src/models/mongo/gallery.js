import Mongoose from "mongoose";

const { Schema } = Mongoose;

const gallerySchema = new Schema({
  img:String,
  poiID: {
    type: Schema.Types.ObjectId,
    ref: "Poi",
  },
});


export const Gallery = Mongoose.model("Gallery", gallerySchema);