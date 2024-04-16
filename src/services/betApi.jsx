import api from './api';

export async function postBet(username, password, betAmount, bet, userId, gameId) {
	const res = await api.post('/bets', { username, password, betAmount, bet, userId, gameId });

	return res.data;
}

export async function getBetsByUser(username, password, userId) {
	const res = await api.post(`/bets/user/${userId}`, { username, password });

	return res.data;
}