import axios from 'axios';
import { latestCategory, latestPOI, user } from '../stores';

export const geotagService = {
	baseUrl: 'http://localhost:3000',
	// ############################  Authentication logging in and signing up ######################
	// log in to the api and save the web token
	async login(email, password) {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
				email,
				password
			});
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
			if (response.data.success) {
				user.set({
					email: email,
					token: response.data.token,
					_id: response.data._id
				});
				localStorage.geotag = JSON.stringify({
					email: email,
					token: response.data.token,
					_id: response.data._id
				});
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	// log out and destroy the token
	async logout() {
		user.set({
			email: '',
			token: '',
			_id: ''
		});
		axios.defaults.headers.common['Authorization'] = '';
		localStorage.removeItem('geotag');
	},

	// sign up for the service
	async signup(firstName, lastName, email, password) {
		try {
			const userDetails = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			};
			await axios.post(this.baseUrl + '/api/users', userDetails);
			return true;
		} catch (error) {
			return false;
		}
	},
	// - reload the saved credentials for the JWT
	reload() {
		const geotagCredentials = localStorage.geotag;
		if (geotagCredentials) {
			const savedUser = JSON.parse(geotagCredentials);
			user.set({
				email: savedUser.email,
				token: savedUser.token,
				_id: savedUser._id
			});
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + savedUser.token;
		}
	},

	// ########################   Category API Commands #############################################
	async getAllCategories() {
		try {
			const response = await axios.get(this.baseUrl + '/api/category');
			return response.data;
		} catch (error) {
			return [];
		}
	},
	async getUserCategories(id) {
		try {
			const response = await axios.get(this.baseUrl + '/api/category/user/' + id);
			return response.data;
		} catch (error) {
			return [];
		}
	},
	async getCategory(id) {
		try {
			const response = await axios.get(this.baseUrl + '/api/category/' + id);
			return response.data;
		} catch (error) {
			return [];
		}
	},
	async getPoiList(id) {
		try {
			const response = await axios.get(this.baseUrl + '/api/category/' + id + '/poi');
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async addCategory(newCategory) {
		try {
			const response = await axios.post(this.baseUrl + '/api/category', newCategory);
			latestCategory.set(newCategory);
			return response.status == 201; // 201 is response code for created
		} catch (error) {
			return false;
		}
	},
	async updateCategory(updatedCategory) {
		try {
			const response = await axios.post(this.baseUrl + '/api/category/'+ updatedCategory._id, updatedCategory);
			latestCategory.set(updatedCategory);
			return response.status == 202; // 202 is response code for accepted
		} catch (error) {
			return false;
		}
	},

	async deleteCategory(id) {
		try {
			const response = await axios.delete(this.baseUrl + '/api/category/' + id);
			return response.data;
		} catch (error) {
			return false;
		}
	},

	// ########################   Poi API Commands #############################################
	async deletePoi(id) {
		try {
			const response = await axios.delete(this.baseUrl + '/api/poi/' + id);
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getPoiWeather(id) {
		try {
			const response = await axios.get(this.baseUrl + '/api/poi/' + id + '/weather');
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async addPoi(newPoi) {
		try {
			const response = await axios.post(
				this.baseUrl + '/api/category/' + newPoi.categoryID + '/poi',
				newPoi
			);
			if (response.data._id){
				newPoi = response.data;
				latestPOI.set(newPoi);
			}
			return response.status == 201; // 201 is response code for created
		} catch (error) {
			return false;
		}
	},

	async updatePoi(amendedPoi) {
		try {
			const response = await axios.post(
				this.baseUrl + '/api/category/poi/' + amendedPoi._id,
				amendedPoi
			);
			if (response.data._id){
				amendedPoi = response.data;
				latestPOI.set(amendedPoi);
			}
			return response.status == 202; // 202 is response code for accecpted
		} catch (error) {
			return false;
		}
	},

	// ########################   Image API Commands #############################################

	async createImage(iData) {
		try {
			const response = await axios.post(this.baseUrl + '/api/image', iData, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async deleteImage(iURL) {
		try {
			const response = await axios.delete(this.baseUrl + '/api/image', iURL);
			return response.status == 202; // 202 is response code for accecpted
		} catch (error) {
			return [];
		}
	},

	async getGallery(id) {
		try {
			const response = await axios.get(this.baseUrl + '/api/gallery/' + id);
			return response.data;
			
		} catch (error) {
			return [];
		}
	},

	async getAllGallery() {
		try {
			const response = await axios.get(this.baseUrl + '/api/gallery');
			return response.data;
			
		} catch (error) {
			return [];
		}
	},

	async deleteGalleryImage(id) {
		try {
			const response = await axios.delete(this.baseUrl + '/api/gallery/'+ id);
			return response.status == 202; // 202 is response code for accepted	
		} catch (error) {
			return [];
		}
	},

	async addGalleryImage(galleryImage) {
		try {
			const response = await axios.post(
				this.baseUrl + '/api/gallery/',
				galleryImage
			);
			return response.status == 201; // 201 is response code for created	
		} catch (error) {
			return [];
		}
	},
};
