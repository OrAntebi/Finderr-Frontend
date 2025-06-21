import { httpService } from '../http.service'

export const gigservice = {
    query,
    getById,
    save,
    remove,
    addGigMsg,
    getAllTags
}

async function query(filterBy = {}) {
    const params = { ...filterBy };

    if (Array.isArray(params.tags)) params.tags = params.tags.join(',');
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

async function getAllTags() {
    const gigRecords = await query()

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
