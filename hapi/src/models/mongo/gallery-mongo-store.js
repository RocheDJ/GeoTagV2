import Mongoose from "mongoose";
import { Gallery } from "./gallery.js";
import {Category} from "./category.js";

export const galleryMongoStore = {

  async getAllImages() {
    const images = await Gallery.find().lean();
    return images;
  },

  async addToGallery(poiId, gallery) {
    const newGallery = new Gallery(gallery);
    newGallery.poiID = poiId;
    const GalleryObj = await newGallery.save();
    return this.getGalleryByPoiId(newGallery.poiID);
  },

  async getGalleryByPoiId(id) {
    const gallery = await Gallery.find({ poiID: id }).lean();
    return gallery;
  },

  async getGalleryById(id) {
    const gallery = await Gallery.find({ _id: id }).lean();
    return gallery;
  },
  async deleteGalleryImageById(id) {
    try {
      await Gallery.deleteOne({ _id: id });
    } catch (error) {
      console.log(`Delete Gallery Image By ID Error = ${  error.description}` );
    }
  },

  async deleteAllGalleryImages() {
    await Gallery.deleteMany({});
  },

};
