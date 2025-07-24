import { storageService } from '../async-storage.service'
import { saveToStorage } from '../util.service'
import { userService } from '../user'
import gigs from '../data/gig.json' assert { type: 'json' }

const GIG_KEY = 'gigDB'

export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg,
    getAllTags
}

window.cs = gigService

_initGigDB()

function _initGigDB() {
    const stored = JSON.parse(localStorage.getItem(GIG_KEY))
    if (!stored || !stored.length) saveToStorage(GIG_KEY, gigs)
}

async function query(filterBy = {}) {
    let gigs = await storageService.query(GIG_KEY)
    const { txt, minPrice, maxPrice, daysToMake, category, tags, sortBy, userId } = filterBy

    if (userId) {
        return gigs.filter(gig => gig.owner._id === userId)
    }

    if (txt) {
        const words = txt.trim().toLowerCase().split(/\s+/)

        gigs = gigs.filter(gig => {
            return words.every(word => {
                return (
                    gig.title?.toLowerCase().includes(word) ||
                    gig.description?.toLowerCase().includes(word) ||
                    gig.category?.toLowerCase().includes(word) ||
                    gig.tags?.some(tag => tag.toLowerCase().includes(word))
                )
            })
        })
    }
    if (category) gigs = gigs.filter(g => category.includes(g.category))
    if (daysToMake) gigs = gigs.filter(g => g.daysToMake <= +daysToMake)
    if (minPrice) gigs = gigs.filter(g => g.price >= +minPrice)
    if (maxPrice) gigs = gigs.filter(g => g.price <= +maxPrice)
    if (tags?.length) gigs = gigs.filter(g => g.tags?.some(t => filterBy.tags.includes(t)))

    if (sortBy) {
        gigs.sort((a, b) => {
            switch (sortBy) {
                case 'recommended':
                    const aScore =
                        (a.owner.rate || 0) * 200 +
                        (a.owner.level || 0) * 100 +
                        (a.owner.reviewsCount || 0) * 0.1

                    const bScore =
                        (b.owner.rate || 0) * 200 +
                        (b.owner.level || 0) * 100 +
                        (b.owner.reviewsCount || 0) * 0.1

                    return bScore - aScore
                case 'best-selling':
                    return (b.orders || 0) - (a.orders || 0)
                case 'newest-arrivals':
                    return b.createdAt - a.createdAt
                case 'fastest-delivery':
                    return a.daysToMake - b.daysToMake
                case 'price-low-to-high':
                    return a.price - b.price
                case 'price-high-to-low':
                    return b.price - a.price
                default:
                    return 0
            }
        })
    }
    return gigs
}

function getById(gigId) {
    return storageService.get(GIG_KEY, gigId)
}

async function remove(gigId) {
    await storageService.remove(GIG_KEY, gigId)
}

async function save(gig) {
    if (gig._id) return storageService.put(GIG_KEY, { ...gig })
    const gigToSave = {
        ...gig,
        createdAt: Date.now(),
    }
    return storageService.post(GIG_KEY, gigToSave)
}

async function addGigMsg(gigId, txt) {
    const gig = await getById(gigId)
    const msg = { id: crypto.randomUUID(), by: userService.getLoggedinUser(), txt }
    gig.msgs = gig.msgs || []
    gig.msgs.push(msg)
    await storageService.put(GIG_KEY, gig)
    return msg
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
