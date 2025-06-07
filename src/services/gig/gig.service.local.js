
import { storageService } from '../async-storage.service'
import { getRandomIntInclusive, makeId, saveToStorage } from '../util.service'
import { userService } from '../user'

// const GIG_KEY = 'gig'
const GIG_KEY = 'gigDB'


const TAGS = [
    'logo-design', 'wordpress', 'voice-over', 'artistic',
    'professional', 'accessible', 'ai-art', 'branding',
    'seo', 'blog-writing', 'video-editing',
]

const TITLES = [
    'I will design your logo',
    'Custom WordPress site',
    'Pro voice-over in 24h',
    'AI art illustration',
    'Write SEO blog post',
    'Edit your promo video'
]

const LOCATIONS = ['Israel', 'USA', 'Germany', 'India', 'Ghana', 'Brazil']


const DESCRIPTIONS = [
    'Unique design tailored to your brand.',
    'Fast, pixel-perfect and responsive.',
    'Studio-quality WAV and MP3 delivered.',
    'High-resolution artwork in any style.',
    'Well-researched, keyword-rich article.',
    'Smooth cuts, colour-grading and music.'
]

_createDemoGigs()


export const gigservice = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    getTagList,
    getDefaultFilter,
    addGigMsg
}
window.cs = gigservice


async function query(filterBy = { txt: '', price: 0 }) {
    var gigs = await storageService.query(GIG_KEY)
    const { txt, minPrice, tags } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }
    if (minPrice) {
        gigs = gigs.filter(gig => gig.price >= +minPrice)
    }

    if (tags.length) {
        gigs = gigs.filter(gig =>
            tags.every(tag => gig.tags.includes(tag)))
    }

    gigs = gigs.map(({ _id, title, price, daysToMake, owner,imgUrls }) => ({
        _id,
        title,
        price,
        daysToMake,
        owner,
        imgUrls
    }))

    return gigs
}

function getById(gigId) {
    return storageService.get(GIG_KEY, gigId)
}

async function remove(gigId) {
    // throw new Error('Nope')
    await storageService.remove(GIG_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        const gigToSave = {
            _id: gig._id,
            price: gig.price,
            speed: gig.speed,
        }
        savedGig = await storageService.put(GIG_KEY, gigToSave)
    } else {
        const gigToSave = {
            vendor: gig.vendor,
            price: gig.price,
            speed: gig.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedGig = await storageService.post(GIG_KEY, gigToSave)
    }
    return savedGig
}

function getEmptyGig() {
    return {
        title: '',
        price: '',
        daysToMake: 3,
        description: '',
        tags: [],
        imgUrls: [],
        loc: '',
        likedByUsers: [],
        reviews: []
    }
}


function getDefaultFilter() {
    return {
        txt: '',
        minPrice: '',
        tags: [],
        pageIdx: 0,
    }
}

function _createDemoGigs() {
    let gigs = JSON.parse(localStorage.getItem(GIG_KEY))
    if (gigs && gigs.length) return

    gigs = []
    for (let i = 0; i < 20; i++) {
        const gig = {
            _id: makeId(),
            title: _pickRandom(TITLES),
            price: +getRandomIntInclusive(5, 120).toFixed(2),
            daysToMake: getRandomIntInclusive(1, 7),
            description: _pickRandom(DESCRIPTIONS),
            owner: _getDemoOwner(),
            avgResponseTime: getRandomIntInclusive(1, 24),
            loc: _pickRandom(LOCATIONS),
            // imgUrls: [`Img${i}`],
            // imgUrls: [`assets/img/gigImg/img${i+1}.jpg`],
            imgUrls: [`src/assets/img/gigImg/img${i + 1}.jpg`],
            tags: _getRandomTags(),
            likedByUsers: [],
            reviews: [],
            createdAt:
                Date.now() - getRandomIntInclusive(0, 1000 * 60 * 60 * 24 * 5)
        }
        gigs.push(gig)
    }
    // localStorage.setItem(GIG_KEY, JSON.stringify(gigs))
    saveToStorage(GIG_KEY, gigs)
}

function getTagList() {
    return TAGS
}

function _getDemoOwner() {
    return {
        _id: makeId(),
        fullname: _pickRandom(['Farhan', 'Shay', 'Or']),
        imgUrl: 'imgUrl',
        level: getRandomIntInclusive(1, 3),
        rate: +(Math.random() * 1 + 4).toFixed(1) // 3.5-5.0
    }
}

function _getRandomTags(count = 3) {
    const copy = [...TAGS]
    const res = []
    for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * copy.length)
        res.push(copy.splice(idx, 1)[0])
    }
    return res
}

function _pickRandom(arr) {
    return arr[getRandomIntInclusive(0, arr.length - 1)]
}

async function addGigMsg(gigId, txt) {
    // Later, this is all done by the backend
    const gig = await getById(gigId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gig.msgs.push(msg)
    await storageService.put(GIG_KEY, gig)

    return msg
}