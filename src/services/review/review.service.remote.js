import { httpService } from '../http.service'

export const reviewService = {
	add,
	query,
	remove,
}

function query(filterBy = {}) {
	const params = []

	if (filterBy.gigId) {
		params.push(`gigId=${filterBy.gigId}`);
	} else if (filterBy.userId) {
		params.push(`userId=${filterBy.userId}`);
	}

	if (filterBy.sortBy) {
		params.push(`sortBy=${filterBy.sortBy}`);
	}

	const queryStr = params.length ? '?' + params.join('&') : '';
	return httpService.get(`review${queryStr}`);
}

async function remove(reviewId) {
	await httpService.delete(`review/${reviewId}`)
}

async function add({ txt, rate, aboutUserId, gigId }) {
	return await httpService.post(`review`, { txt, rate, aboutUserId, gigId })
}