import { EventEmitter } from "events";
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testDBType,testCategories, Kiln,testPOI } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

EventEmitter.setMaxListeners(25);

suite("Category Model tests", () => {
  setup(async () => {
    db.init(testDBType);
    await db.categoryStore.deleteAllCategories();
    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCategories[i] = await db.categoryStore.addCategory(testCategories[i]); // .addPlaylist(testPlaylists[i]);
    }
  });

  test("create a category", async () => {
    const category = await db.categoryStore.addCategory(Kiln);
    assertSubset(Kiln, category);
    assert.isDefined(category._id);
  });

  test("Get all categories", async () => {
    const returnedCategories = await  db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 3);
  });

  test("delete all categories", async () => {
    let returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 3);
    await db.categoryStore.deleteAllCategories();
    returnedCategories = await  db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 0);
  });

  test("get a category - success", async () => {
    const category = await db.categoryStore.addCategory(Kiln);
    const returnedCategory= await db.categoryStore.getCategoryById(category._id);
    assertSubset(Kiln, returnedCategory);
  });

  test("Get All POI for a category ", async () => {
    const category = await db.categoryStore.addCategory(Kiln);
    const returnedCategory= await db.categoryStore.getCategoryById(category._id);
    // add pos to a test category
    for (let i = 0; i < testPOI.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const poi = await db.poiStore.addPOI(returnedCategory._id, testPOI[i]);
    }
    
    const rPOIs = await db.categoryStore.getPOIByCategoryId(category._id);

    assert.equal(rPOIs.length, testPOI.length);
  });
  test("Delete One category - success", async () => {
    const id = testCategories[0]._id;
    await db.categoryStore.deleteCategoryById(id);
    const returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, testCategories.length - 1);
    const deletedCategory = await db.categoryStore.getCategoryById(id);
    assert.isNull(deletedCategory);
  });

  test("Get a category - bad params", async () => {
    assert.isNull(await db.categoryStore.getCategoryById(""));
    assert.isNull(await db.categoryStore.getCategoryById());
  });

  test("delete One Category - fail", async () => {
    await db.categoryStore.deleteCategoryById("bad-id");
    const allCategories = await db.categoryStore.getAllCategories();
    assert.equal(testCategories.length, allCategories.length);
  });

  test("Get User Category - with bad id ", async () => {
    const categories = await db.categoryStore.getUserCategories("bad-id");
    assert.isNull(categories);
  });
});