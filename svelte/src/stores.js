import {writable} from "svelte/store";

export const user = writable({
  email: "",
  token: "",
  _id: "",
});

export const latestCategory = writable(null);
export const latestPOI = writable(null);
export const selectedCategory = writable(null);
export const selectedGallery = writable(null);
export const geoLocationPoint = writable({
            lat:-1,
            lng:-1,
            });