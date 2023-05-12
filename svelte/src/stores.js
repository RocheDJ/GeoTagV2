import {writable} from "svelte/store";

export const user = writable({
  email: "",
  token: "",
  _id: "",
});

export const latestCategory = writable(null);
export const latestPOI = writable(null);
export const selectedPOI = writable(null);