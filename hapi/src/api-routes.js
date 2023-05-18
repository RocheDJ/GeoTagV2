import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { poiApi } from "./api/poi-api.js";
import { imageApi } from "./api/image-api.js";
import { galleryApi } from "./api/gallery-api.js";

export const apiRoutes = [
  // USERS API Routes 
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  // CATEGORY API Routes 
  { method: "GET", path: "/api/category", config: categoryApi.find },
  { method: "DELETE", path: "/api/category",config: categoryApi.deleteAll},
  { method: "DELETE", path: "/api/category/{id}",config: categoryApi.deleteOne},
  { method: "POST", path: "/api/category",config: categoryApi.create},
  { method: "POST", path: "/api/category/{id}",config: categoryApi.update},
  { method: "GET", path: "/api/category/{id}", config: categoryApi.findOne },
  { method: "GET", path: "/api/category/{id}/poi",config: categoryApi.findPOIInCategory},
  { method: "GET", path: "/api/category/user/{id}", config: categoryApi.userCategories},

  // Place Of interest API Routes 
  { method: "GET", path: "/api/poi", config: poiApi.find },
  { method: "DELETE", path: "/api/poi",config: poiApi.deleteAll},
  { method: "DELETE", path: "/api/poi/{id}",config: poiApi.deleteOne},
  { method: "POST", path: "/api/category/{id}/poi",config: poiApi.create},
  { method: "POST", path: "/api/category/poi/{id}",config: poiApi.update},
  { method: "GET", path: "/api/poi/{id}", config: poiApi.findOne },
  { method: "GET", path: "/api/poi/{id}/weather", config: poiApi.getWeather },

  // image API routes
  { method: "GET", path: "/api/image", config: imageApi.find },
  { method: "POST", path: "/api/image", config: imageApi.create },
  { method: "DELETE", path: "/api/image", config: imageApi.delete },

  // gallery API routes
  { method: "GET", path: "/api/gallery", config: galleryApi.find },
  { method: "GET", path: "/api/gallery/{id}", config: galleryApi.findOne },
  { method: "POST", path: "/api/gallery/", config: galleryApi.create },
  { method: "DELETE", path: "/api/gallery/{id}", config: galleryApi.deleteOne},


// Authenticate route
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

];
