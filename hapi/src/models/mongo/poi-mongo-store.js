import { POI } from "./poi.js";
import { Category } from "./category.js";
import Mongoose from "mongoose";

export const poiMongoStore = {
  async getAllPOI() {
    const poi = await POI.find().lean();
    return poi;
  },

  async addPOI(categoryId, poi) {
    poi.categoryID = categoryId;
    const newPoi = new POI(poi);
    const PoiObj = await newPoi.save();
    return this.getPOIById(PoiObj._id);
  },

  async getPOIByCategoryId(id) {
    const poi = await POI.find({ categoryID: id }).lean();
    return poi;
  },

  async getPOIById(id) {
    if (id) {
      const poi = await POI.findOne({ _id: id }).lean();
      return poi;
    }
    return null;
  },

  async deletePOIById(id) {
    try {
      await POI.deleteOne({ _id: id });
    } catch (error) {
      console.log(`Delete Poi By ID Error = ${  error.description}` );
    }
  },

  async deleteAllPOI() {
    await POI.deleteMany({});
  },

  async updatePOI(poiId, updatedPOI) {
    let idReturn = null
    try {
      const filter = { _id: poiId };
      const update = { updatedPOI };
       // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
      const updPOI = await POI.findOneAndUpdate(filter,updatedPOI,{
        new: true
      } );
      idReturn  = updPOI._id;
    }catch (error) {
      console.log(`Update POI By ID Error = ${  error.description}` );
    }
   return idReturn;
  },
};
