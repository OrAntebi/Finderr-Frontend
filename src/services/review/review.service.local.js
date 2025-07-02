import { storageService } from '../async-storage.service'
import { userService } from '../user'
import { saveToStorage } from '../util.service'

import reviews from '../data/review.json' assert { type: 'json' }

const REVIEW_KEY = 'reviewDB'

export const reviewService = {
	add,
	query,
	remove,
}

_initReviewDB()

function _initReviewDB() {
	const stored = JSON.parse(localStorage.getItem(REVIEW_KEY))
	if (!stored || !stored.length) saveToStorage(REVIEW_KEY, reviews)
}

async function query(filterBy = {}) {
	let reviews = await storageService.query(REVIEW_KEY)

	if (filterBy.gigId) {
		reviews = reviews.filter(review => review.gigId === filterBy.gigId)
	}

	if (filterBy.userId) {
		reviews = reviews.filter(review => review.aboutUser._id === filterBy.userId)
	}

	if (filterBy.byUserId) {
		reviews = reviews.filter(review => review.by._id === filterBy.byUserId)
	}

	switch (filterBy.sortBy) {
		case 'most relevant':
			reviews = [...reviews].sort((a, b) => b.rate - a.rate)
			break
		case 'most recent':
			reviews = [...reviews].sort((a, b) => b.createdAt - a.createdAt)
			break
		default:
			reviews = [...reviews].sort((a, b) => b.rate - a.rate)
	}

	return reviews

}

async function remove(reviewId) {
	await storageService.remove(REVIEW_KEY, reviewId)
}

async function add({ txt, rate, aboutUserId, gigId }) {
	const loggedinUser = userService.getLoggedinUser()
	const aboutUser = await userService.getById(aboutUserId)

	const reviewToAdd = {
		txt,
		rate,
		createdAt: Date.now(),
		gigId,
		by: {
			_id: loggedinUser._id,
			fullname: loggedinUser.fullname,
			imgUrl: loggedinUser.imgUrl,
			location: loggedinUser.location || 'Italy'
		},
		aboutUser: {
			_id: aboutUser._id,
			fullname: aboutUser.fullname,
			imgUrl: aboutUser.imgUrl,
		}
	}

	const addedReview = await storageService.post(REVIEW_KEY, reviewToAdd)
	return addedReview
}