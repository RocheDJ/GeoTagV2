import Mongoose from "mongoose";
import { Category } from "./category.js";
import { poiMongoStore } from "./poi-mongo-store.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async getCategoryById(id) {
    if (Mongoose.Types.ObjectId.isValid(id)) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.poi = await poiMongoStore.getPOIByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async getPOIByCategoryId(id) {
    if (Mongoose.Types.ObjectId.isValid(id)) {
      const poi = await poiMongoStore.getPOIByCategoryId(id);
      return poi;
    }
    return null;
  },

  async addCategory(category) {
    try {
      const newCategory = new Category(category);
      const categoryObj = await newCategory.save();
      return this.getCategoryById(categoryObj._id);
    } catch (error) {
      console.log(`Add Category Error = ${error.description}`);
    }
    return null;
  },

  async getUserCategories(id) {
    try {
      const category = await Category.find({ userid: id }).lean();
      if (category) {
        return category;
      }
    } catch (error) {
      console.log(`Delete Poi Error = ${error.description}`);
    }
    return null;
  },

  async updateCategory(categoryId,updatedCategory) {
    let retValue = null
    try {
      const filter = { _id: categoryId };
      const retCategory = await Category.findOneAndUpdate(filter,updatedCategory,{
        new: true
      } );
      const revisedCategory = await Category.findOne({ _id: updatedCategory._id });
      retValue = revisedCategory;
    } catch (error) {
      console.log(`Update Poi Error = ${error.description}`);
    }
    return retValue;
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategories() {
    await Category.deleteMany({});
  },
};
