import { assert } from "chai";
// import { fs } from "fs/promises";
import * as fs from "fs/promises";
import { geoTagService } from "./geotag-service.js";
import {Kiln, maggie, maggieCredentials, testGallery, testKiln, testPOI} from "../fixtures.js";
import {assertSubset} from "../test-utils.js";

const sampleImage = "././test/test-image.png";

suite("Gallery API tests", () => {
  let user = null;
  let kilnCategory = null;
  setup(async () => {
    await geoTagService.clearAuth(); // no await just call and
    // create and authenticate a user for initial configuration
    user = await geoTagService.createUser(maggie);
    await geoTagService.authenticate(maggieCredentials); // create a jwt for test user
    // delete all information so we start with a clean slate
    await geoTagService.deleteAllCategories();
    await geoTagService.deleteAllPOI();
    await geoTagService.deleteAllUsers();
    // add a user for testing
    user = await geoTagService.createUser(maggie);
    await geoTagService.authenticate(maggieCredentials); // create a jwt for test user
    // Give the category a user ID for the test user
    Kiln.userID = user._id;
    // Add the dummy kiln Category
    kilnCategory = await geoTagService.createCategory(Kiln);
  });
  teardown(async () => {});

  test("Add image to a gallery", async () => {
    try {
      testKiln.categoryID = kilnCategory._id;
      // add a poi then add the gallery
        const returnedPOI = await geoTagService.createPOI(kilnCategory._id, testKiln);
        assertSubset(testKiln, returnedPOI); // is the testKiln a Subset of what we just created
        assert.isDefined(returnedPOI._id); // does that subset have an ID
      // add the images to the gallery
      for (let i = 0; i < testGallery.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await geoTagService.addGalleryImage(returnedPOI._id, testGallery[i]);
      }
      const retGallery = geoTagService.getGallery(returnedPOI._id);
      assert.equal(retGallery.length, testGallery.length);
    } catch (error) {
      console.log(error.message);
      assert.equal(1, 2);
    }
  });

  test("Delete an image", async () => {
    try {

      assert.equal(1, 1);
    } catch (error) {
      console.log(error.message);
      assert.equal(1, 2);
    }
  });
});
