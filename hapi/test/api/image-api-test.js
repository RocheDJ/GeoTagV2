import { assert } from "chai";
// import { fs } from "fs/promises";
import * as fs from "fs/promises";
import { geoTagService } from "./geotag-service.js";
import {maggie,maggieCredentials} from "../fixtures.js";

const sampleImage = "././test/test-image.png";

async function loadImageFile(fileName) {
  let retVal ;
  try {
    // retVal = await fs.readFile("././test/test-image.png", { encoding: "utf8" });
    const data = await fs.readFile(fileName, "binary");
    retVal = Buffer.from(data);
  } catch (err) {
    console.log(err);
  }
  return retVal;
}

suite("Image API tests", () => {
  let user = null;
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
  });
  teardown(async () => {});

  test("Upload an image", async () => {
    try {
      const myImage={
        filename:sampleImage,
        imageData:loadImageFile(sampleImage),
      };
      const returnedURL = await geoTagService.uploadImage(myImage);
      assert.isDefined(returnedURL); 
    } catch (error) {
      console.log(error.message);
      assert.equal(1, 2);
    }
  });

  test("Delete an image", async () => {
    try {
      const returnedURL = await geoTagService.uploadImage(sampleImage);
      const retVal = await geoTagService.delateImage(returnedURL);
      assert.isDefined(retVal); 
    } catch (error) {
      console.log(error.message);
      assert.equal(1, 2);
    }
  });
});
