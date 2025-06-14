import { storageService } from '../async-storage.service'
import { saveToStorage } from '../util.service'
import { userService } from '../user'
import { gigsData } from '../data/gigs.js'
import { getRandomIntInclusive } from '../util.service'

const GIG_KEY = 'gigDB'
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
const LOCATIONS = ['Israel', 'USA', 'Germany', 'India', 'France', 'Brazil', 'Japan']
const MEMBERSHIP_YEARS = ['2018', '2019', '2020', '2021', '2022', '2023']
const LANGUAGES_LIST = ['English', 'Hebrew', 'Spanish', 'German', 'French', 'Portuguese']

export const gigservice = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    getDefaultFilter,
    addGigMsg,
    getCategoryList,
    getCategoryTitleFromPath
}

window.cs = gigservice

_initGigDB()

function _initGigDB() {
    const stored = JSON.parse(localStorage.getItem(GIG_KEY))
    if (!stored || !stored.length) {
        for (const gig of gigsData) {
            gig.owner.loc = gig.owner.loc ||
                LOCATIONS[getRandomIntInclusive(0, LOCATIONS.length - 1)]

            gig.owner.memberSince = gig.owner.memberSince ||
                MEMBERSHIP_YEARS[getRandomIntInclusive(0, MEMBERSHIP_YEARS.length - 1)]

            gig.owner.languages = gig.owner.languages ||
                LANGUAGES_LIST[getRandomIntInclusive(0, LANGUAGES_LIST.length - 1)]

        }
        saveToStorage(GIG_KEY, gigsData);
    }
}

async function query(filterBy = getDefaultFilter()) {
    let gigs = await storageService.query(GIG_KEY)
    const { txt, minPrice, maxPrice, daysToMake, categories } = filterBy
    if (txt) {
        const re = new RegExp(txt, 'i')
        gigs = gigs.filter(g => re.test(g.title) || re.test(g.description))
    }
    if (minPrice) gigs = gigs.filter(g => g.price >= +minPrice)
    if (maxPrice) gigs = gigs.filter(g => g.price <= +maxPrice)
    if (daysToMake) gigs = gigs.filter(g => g.daysToMake <= +daysToMake)
    if (categories?.length) gigs = gigs.filter(g => categories.includes(g.category))

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
        owner: userService.getLoggedinUser(),
        createdAt: Date.now(),
        likedByUsers: [],
        reviews: [],
        msgs: []
    }
    return storageService.post(GIG_KEY, gigToSave)
}

function getEmptyGig() {
    return {
        title: '',
        price: '',
        createdAt: Date.now(),
        packages: {
            basic: { title: '', packPrice: 0, packDaysToMake: 0, desc: '', features: [] },
            standard: { title: '', packPrice: 0, packDaysToMake: 0, desc: '', features: [] },
            premium: { title: '', packPrice: 0, packDaysToMake: 0, desc: '', features: [] }
        },
        owner: userService.getLoggedinUser(),
        daysToMake: 3,
        description: '',
        imgUrls: [],
        category: '',
        tags: [],
        likedByUsers: [],
        reviews: []
    }
}

function getDefaultFilter() {
    return { txt: '', minPrice: '', maxPrice: '', daysToMake: '', categories: [] }
}

async function addGigMsg(gigId, txt) {
    const gig = await getById(gigId)
    const msg = { id: crypto.randomUUID(), by: userService.getLoggedinUser(), txt }
    gig.msgs = gig.msgs || []
    gig.msgs.push(msg)
    await storageService.put(GIG_KEY, gig)
    return msg
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
