import Boom from "@hapi/boom";
import {db} from "../models/db.js";
import { imageStore } from "../models/image-store.js";
import {IdSpec, gallerySpec, galleryArraySpec, PoiSpecPlus, PoiSpec} from "../models/joi-schemas.js";
import {validationError} from "./logger.js";

export const galleryApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const galleries = await db.galleryStore.getAllImages();
                return galleries;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: {schema: galleryArraySpec, failAction: validationError},
        description: "Get all galleries /images for all places of interest",
        notes: "Returns all galleries ",
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const gallery = await db.galleryStore.getGalleryByPoiId(request.params.id);
                if (!gallery) {
                    return Boom.notFound("No gallery found for this POI");
                }
                return gallery;
            } catch (err) {
                return Boom.serverUnavailable("Gallery DB error");
            }
        },
        tags: ["api"],
        description: "Find A gallery for a given poi",
        validate: {params: {id: IdSpec}, failAction: validationError},
        response: {schema: galleryArraySpec, failAction: validationError},
        notes: "Return all images fro that place of interest",
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const gallery = await db.galleryStore.addToGallery(request.payload.poiID, request.payload);
                if (gallery) {
                    return h.response(gallery).code(201);
                }
                return Boom.badImplementation("error creating or adding to gallery");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a new POI",
        notes: "Add an image to the gallery for that poi and return images",
        validate: {payload: IdSpec},  // on the incoming we want to match this schema i.e. PoiSpec
        response: {schema: galleryArraySpec, failAction: validationError},
    },
    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const image = await db.galleryStore.getGalleryById(request.params.id);
                if (!image) {
                    return Boom.notFound("No image with this id");
                }
                // delete from local store
                const retVal = await imageStore.deleteImage(image[0].img);
                // delete from gallery
                await db.galleryStore.deleteGalleryImageById(request.params.id);
                return h.response().code(202);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "delete a specific image",
        validate: {params: {id: IdSpec}, failAction: validationError},
        notes: "delete a specific image from a gallery based on the id for that image",
    },

};