import { storageService } from '../async-storage.service'
import { httpService } from '../http.service'


const CATEGORIES = {
    'graphics-design': 'Graphics & Design',
    'programming-tech': 'Programming & Tech',
    'digital-marketing': 'Digital Marketing',
    'video-animation': 'Video & Animation',
    'writing-translation': 'Writing & Translation',
    'music-audio': 'Music & Audio',
    'business': 'Business',
    'finance': 'Finance',
    'ai-services': 'AI Services',
    'personal-growth': 'Personal Growth',
    'consulting': 'Consulting',
    'data': 'Data',
    'photography': 'Photography'
}

export const gigservice = {
    query,
    getById,
    save,
    remove,
    addGigMsg,
    getCategoryList,
    getAllTags,
    getCategoryTitleFromPath
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`gig`, filterBy)
}

function getById(gigId) {
    return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
    return httpService.delete(`gig/${gigId}`)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await httpService.put(`gig/${gig._id}`, gig)
    } else {
        savedGig = await httpService.post('gig', gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, { txt })
    return savedMsg
}

function getCategoryList(key = null) {
    if (key) return CATEGORIES[key] || key
    return Object.entries(CATEGORIES).map(([categoryRoute, categoryName]) => ({
        categoryRoute,
        categoryName
    }))
}

function getCategoryTitleFromPath(path) {
    const slug = path.split('/').filter(Boolean).at(-1)
    return getCategoryList(slug)
}

async function getAllTags() {
    const gigRecords = await storageService.query(GIG_KEY)

    const uniqueTagMap = gigRecords
        .flatMap(gigItem => gigItem.tags || [])
        .reduce((tagAccumulator, rawTag) => {
            const trimmedTag = rawTag.trim()
            const normalized = trimmedTag.toLowerCase()
            if (!tagAccumulator.has(normalized)) {
                tagAccumulator.set(normalized, trimmedTag)
            }
            return tagAccumulator
        }, new Map())

    const sortedTags = [...uniqueTagMap.values()]
        .sort((tagA, tagB) => tagA.localeCompare(tagB, 'en', { sensitivity: 'base' }))

    return sortedTags
}

