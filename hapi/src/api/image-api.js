/* eslint-disable func-names */
import Boom from "@hapi/boom";
import { imageStore } from "../models/image-store.js";

export const imageApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const images = await imageStore.getAllImages();
                if (images){
                    return h.response(images).code(201);
                }
                return Boom.badImplementation("Error retrieving images");    
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        // response: {schema: PoiArraySpec, failAction: validationError},
        description: "Get all images",
        notes: "Returns all listed images",
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const requestBody = await request.payload;
                if (!requestBody.fileData || requestBody.fileData === "data:") {
                    return h.response(400, { message: "No file data" });
                }
                const imageData={
                    fileData : requestBody.fileData,
                    fileName: requestBody.fileName
                };
                const imageURL = await imageStore.uploadImageBIN(imageData);
                if (imageURL) {
                    return h.response(imageURL).code(201);
                }
                return Boom.badImplementation("Error creating image");
            } catch (err) {
                return Boom.serverUnavailable("Image Database Error");
            }
        },
        tags: ["api"],
        description: "Upload a new image and return a reference url for that image",
        notes: "Add a new image to the DB based on thr input parameters",
        // validate: {payload: PoiSpec},  // on the incoming we want to match this schema i.e. PoiSpec
        // response: {schema: PoiSpecPlus, failAction: validationError},
    },

    delete: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const retVal = await imageStore.deleteImage(request);
                return h.response().code(200);    
            } catch (err) {
                return Boom.serverUnavailable("Image Delete Error");
            }
        },
        tags: ["api"],
        description: "Delete and image based on its reference url",
        notes: "No Notes",
        // validate: {payload: PoiSpec},  // on the incoming we want to match this schema i.e. PoiSpec
        // response: {schema: PoiSpecPlus, failAction: validationError},
    },


}
