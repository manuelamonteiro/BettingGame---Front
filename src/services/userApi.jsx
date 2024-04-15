import api from './api';

export async function signUp(username, password) {
	const res = await api.post('/users/register', { username, password });

	return res.data;
}

export async function signIn(username, password) {
	const res = await api.post('/users/login', { username, password });
	
	return res.data;
}