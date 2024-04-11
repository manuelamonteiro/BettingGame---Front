import api from './api';

export async function getGames() {
	const res = await api.get('/games');

	return res.data;
}

export async function endGames() {
	const res = await api.put('/games/end');

	return res.data;
}