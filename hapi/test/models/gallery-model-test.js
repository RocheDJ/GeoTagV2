import {EventEmitter} from "events";
import {assert} from "chai";
import {db} from "../../src/models/db.js";
import {testDBType, testGallery, Kiln, testKiln,testCategories} from "../fixtures.js";
import {assertSubset} from "../test-utils.js";

EventEmitter.setMaxListeners(25);

suite("Gallery Model tests", () => {
    setup(async () => {
        db.init(testDBType);
        await db.galleryStore.deleteAllGalleryImages();
    });

    test("Add image to a gallery", async () => {
        try {
            // add a category
            const kilnList = await db.categoryStore.addCategory(Kiln);
            // add a poi
            const dummyPOI = await db.poiStore.addPOI(kilnList._id, testKiln);

            assert.isNotNull(dummyPOI._id);
            // add a gallery for that PoI
            let gal = await db.galleryStore.addToGallery(dummyPOI._id, testGallery[0]);
            gal = await db.galleryStore.addToGallery(dummyPOI._id, testGallery[1]);
            gal = await db.galleryStore.addToGallery(dummyPOI._id, testGallery[2]);
            assert.equal(gal.length, 3);
        } catch (err) {
            console.log(err.message);
            assert.equal(0, 3);
        }
    });

    test("delete all galleries", async () => {
        // add a category
        const kilnList = await db.categoryStore.addCategory(Kiln);
        // add a poi
        const dummyPOI = await db.poiStore.addPOI(kilnList._id, testKiln);
        let gal = await db.galleryStore.addToGallery(dummyPOI._id, testGallery[0]);
        gal = await db.galleryStore.addToGallery(dummyPOI._id, testGallery[1]);
        let returnedImages = await db.galleryStore.getAllImages();
        assert.isAtLeast(returnedImages.length, 1);
        await db.galleryStore.deleteAllGalleryImages();
        returnedImages = await db.galleryStore.getAllImages();
        assert.equal(returnedImages.length, 0);
    });

    test("get a gallery - success", async () => {
        // add a category
        const kilnList = await db.categoryStore.addCategory(Kiln);
        // add a poi
        const dummyPOI = await db.poiStore.addPOI(kilnList._id, testKiln);
        // add a gallery 2 images
        let gal =null;
        gal = await db.galleryStore.addToGallery(dummyPOI._id, testGallery[0]);
        gal = await db.galleryStore.addToGallery(dummyPOI._id, testGallery[1]);

        // add a second poi
        const dummyPOI1 = await db.poiStore.addPOI(kilnList._id, testKiln);
        // add a gallery 2 images
        gal = await db.galleryStore.addToGallery(dummyPOI1._id, testGallery[0]);
        gal = await db.galleryStore.addToGallery(dummyPOI1._id, testGallery[1]);

        // get 2 images from 1st poi
        const gallery1   = await db.galleryStore.getGalleryByPoiId(dummyPOI._id);
        // get 2 images from 2nd poi
        const gallery2   = await db.galleryStore.getGalleryByPoiId(dummyPOI1._id);

        assert.equal(gallery1.length, 2);
        assert.equal(gallery2.length, 2);
    });
});
