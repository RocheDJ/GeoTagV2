/* eslint-disable func-names */
import Boom from "@hapi/boom";
import bcrypt from "bcrypt";  
import { db } from "../models/db.js";
import {IdSpec, UserArray, UserCredentialsSpec, UserSpec, UserSpecPlus,JwtAuth} from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";

const saltRounds = 10;  

export const userApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all userApi",
    notes: "Returns details of all userApi",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    tags: ["api"],
    description: "Get details of individual user",
    notes: "Returns details of all the user based on the given user ID",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const userIn = request.payload;
        userIn.password = await bcrypt.hash(userIn.password, saltRounds);    // encrypt the password here

        const user = await db.userStore.addUser(userIn);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a new user",
    notes: "Add a new user to the DB based on th input parameters",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all Users",
    notes: "Deletes all users from the DB",
  },

// authenticate uses to validate and get users for Java Web tokens
// similar  routing to login web controller except we create and return a token
  authenticate: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        const passwordsMatch = await bcrypt.compare(request.payload.password, user.password);    // decrypting the password 
        if (!passwordsMatch ) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        return h.response({ success: true, token: token ,_id :user._id}).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate a user",
    notes: "Authenticate a user with email and password and generate a Java Web Token token",
    validate: { payload: UserCredentialsSpec, failAction: validationError },
    response: { schema: JwtAuth, failAction: validationError },


  },

};
