import axios from 'axios';

const instance = axios.create({
	baseURL: "https://betting-game-api.onrender.com"
});

export default instance;