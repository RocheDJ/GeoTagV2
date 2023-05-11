import {assert} from "chai";
import {db} from "../../src/models/db.js";
import {maggie, testPOI, Kiln, testKiln, maggieCredentials} from "../fixtures.js";
import {assertSubset} from "../test-utils.js";
import {geoTagService} from "./geotag-service.js";


suite("POI API tests", () => {
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
    teardown(async () => {
    });

    test("Create a POI", async () => {
        testKiln.categoryID = kilnCategory._id;
        try{
            const returnedPOI = await geoTagService.createPOI(kilnCategory._id, testKiln);
            assertSubset(testKiln, returnedPOI); // is the testKiln a Subset of what we just created
            assert.isDefined(returnedPOI._id); // does that subset have an ID
        }catch(error){
            console.log(error.message)
            assert.equal(1,2);
        }
    });

    test("Test Weather API ", async () => {
        testKiln.categoryID = kilnCategory._id;
        const returnedPOI = await geoTagService.createPOI(kilnCategory._id, testKiln);
        try{
            const returnedWeather = await geoTagService.getPOIWeather(returnedPOI._id);
            assert.isDefined(returnedWeather.temperature); //
        }catch(error){
            console.log(error.message)
            assert.equal(1,2);
        }
    });

    test("Create Multiple POIs", async () => {
        for (let i = 0; i < testPOI.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await geoTagService.createPOI(kilnCategory._id, testPOI[i]);
        }
        const returnedPOIs = await geoTagService.getAllPOI();
        assert.equal(returnedPOIs.length, testPOI.length);
        for (let i = 0; i < returnedPOIs.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const poi = await geoTagService.getPOI(returnedPOIs[i]._id);
            assertSubset(poi, returnedPOIs[i]);
        }
    });

    test("Delete All POIs 1 by 1", async () => {
        for (let i = 0; i < testPOI.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await geoTagService.createPOI(kilnCategory._id, testPOI[i]);
        }
        let returnedPOIs = await geoTagService.getAllPOI();
        assert.equal(returnedPOIs.length, testPOI.length);
        for (let i = 0; i < returnedPOIs.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const poi = await geoTagService.deletePOI(returnedPOIs[i]._id);
        }
        returnedPOIs = await geoTagService.getAllPOI();
        assert.equal(returnedPOIs.length, 0);
    });


});
