import axios from 'axios';
import { latestPOI, user } from '../stores';

export const geotagService = {
	baseUrl: 'http://localhost:3000',

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
				localStorage.geotag = JSON.stringify({ email: email, token: response.data.token ,_id:response.data._id });
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
			_id : ""
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
				_id : savedUser._id
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

	async getPoiList(id) {
		try {
			const response = await axios.get(this.baseUrl + '/api/category/' + id +'/poi');
			return response.data;
		} catch (error) {
			return [];
		}
	},

		
	async deletePoi(id) {
		try {
			const response = await axios.delete(this.baseUrl + '/api/poi/' + id);
			return response.data;
		} catch (error) {
			return [];
		}
	},



};
