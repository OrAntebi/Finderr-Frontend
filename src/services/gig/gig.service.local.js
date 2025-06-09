
import { storageService } from '../async-storage.service'
import { getRandomIntInclusive, makeId, saveToStorage } from '../util.service'
import { userService } from '../user'
import ownerImg from '../../assets/img/ownerImg.jpg'

const GIG_KEY = 'gigDB'

const LOCATIONS = ['Israel', 'USA', 'Germany', 'India', 'Ghana', 'Brazil']
const LANGUAGES = ['Spanish', 'French', 'English', 'Hebrew', 'German', 'Portuguese', 'Italian']
const CATEGORIES = {
    'graphics-design': [
        { title: 'I will design your logo', description: 'Unique and memorable logo tailored to your brand.' },
        { title: 'I will create your brand identity', description: 'Full branding package including logo, colors, and typography.' },
        { title: 'I will design business cards', description: 'Professional and print-ready business card designs.' },
        { title: 'I will illustrate custom artwork', description: 'High-quality digital illustrations for personal or commercial use.' },
        { title: 'I will design your social media graphics', description: 'Engaging graphics for Inscategoryram, Facebook, and more.' },
    ],
    'programming-tech': [
        { title: 'I will develop your website', description: 'Responsive and modern websites using the latest tech.' },
        { title: 'I will fix bugs in your code', description: 'Quick and efficient debugging for JavaScript, Python, and more.' },
        { title: 'I will build your API', description: 'Secure and scalable APIs built with REST or GraphQL.' },
        { title: 'I will automate your workflows', description: 'Custom scripts and tools to save you time and effort.' },
        { title: 'I will set up your server', description: 'Full-stack server configuration and deployment.' },
    ],
    'digital-marketing': [
        { title: 'I will manage your social media', description: 'Daily posts and engagement strategies for better reach.' },
        { title: 'I will run Facebook ad campaigns', description: 'Optimized ads to drive traffic and conversions.' },
        { title: 'I will do SEO for your website', description: 'On-page and off-page SEO to boost search rankings.' },
        { title: 'I will write marketing copy', description: 'Persuasive copywriting for ads, emails, and landing pages.' },
        { title: 'I will analyze your digital strategy', description: 'Audit and advice to improve your online presence.' },
    ],
    'video-animation': [
        { title: 'I will edit your video professionally', description: 'Smooth cuts, transitions, and effects for any content.' },
        { title: 'I will create a whiteboard animation', description: 'Engaging explainer videos with custom drawings.' },
        { title: 'I will animate your logo', description: 'Custom animated intros and outros for your brand.' },
        { title: 'I will create a YouTube intro', description: 'Catchy and branded intros to elevate your videos.' },
        { title: 'I will produce motion graphics', description: 'Dynamic visuals for ads, presentations, and social media.' },
    ],
    'writing-translation': [
        { title: 'I will write SEO blog posts', description: 'Well-researched, keyword-rich articles that rank.' },
        { title: 'I will proofread your document', description: 'Accurate grammar and style corrections.' },
        { title: 'I will translate English to Spanish', description: 'Human translations with cultural accuracy.' },
        { title: 'I will write website content', description: 'Clear and compelling content for all your pages.' },
        { title: 'I will create product descriptions', description: 'Attractive and concise copy for eCommerce.' },
    ],
    'music-audio': [
        { title: 'I will record a voice-over', description: 'Professional narration for ads, tutorials, and more.' },
        { title: 'I will produce your song', description: 'Full audio production and mixing.' },
        { title: 'I will edit your podcast', description: 'Noise removal, leveling, and intro/outro music.' },
        { title: 'I will write a jingle', description: 'Catchy tunes that stick with your brand.' },
        { title: 'I will master your track', description: 'Polished and loud audio for release-ready tracks.' },
    ],
    'business': [
        { title: 'I will create a business plan', description: 'Clear and investor-ready business planning.' },
        { title: 'I will do market research', description: 'Detailed insights into your industry and audience.' },
        { title: 'I will design pitch decks', description: 'Visually compelling presentations for investors.' },
        { title: 'I will write company bios', description: 'Professional bios for executives and team pages.' },
        { title: 'I will provide business consulting', description: 'Advice to optimize operations and growth.' },
    ],
    'finance': [
        { title: 'I will prepare your financial statements', description: 'Accurate income, balance, and cash flow reports.' },
        { title: 'I will help with budgeting', description: 'Monthly or annual personal and business budgets.' },
        { title: 'I will analyze your investments', description: 'Portfolio reviews and suggestions.' },
        { title: 'I will assist with taxes', description: 'Freelancer or small business tax support.' },
        { title: 'I will audit your expenses', description: 'Find areas to cut costs and improve efficiency.' },
    ],
    'ai-services': [
        { title: 'I will generate AI art', description: 'Custom prompts and fine-tuning for stunning visuals.' },
        { title: 'I will build GPT chatbots', description: 'Conversational bots powered by OpenAI models.' },
        { title: 'I will train machine learning models', description: 'Tailored ML solutions for your data.' },
        { title: 'I will analyze data using AI', description: 'Smart insights and predictions from your datasets.' },
        { title: 'I will create AI tools for automation', description: 'Scripts and models to automate tasks.' },
    ],
    'personal-growth': [
        { title: 'I will coach you for productivity', description: 'Build habits and optimize your daily routine.' },
        { title: 'I will provide life coaching', description: 'Clarity, goals, and motivation to move forward.' },
        { title: 'I will design your meditation plan', description: 'Custom daily practices for calm and focus.' },
        { title: 'I will create a personal journal template', description: 'Track moods, habits, and reflections.' },
        { title: 'I will help with career direction', description: 'Find your path and next step in life.' },
    ],
    'consulting': [
        { title: 'I will consult your startup idea', description: 'Get feedback and a strategy to validate it.' },
        { title: 'I will review your business model', description: 'Spot weaknesses and growth opportunities.' },
        { title: 'I will help plan your product launch', description: 'Steps, tools, and marketing strategies.' },
        { title: 'I will coach you on freelancing', description: 'How to price, pitch, and grow your gig.' },
        { title: 'I will analyze your customer journey', description: 'Optimize onboarding and retention flow.' },
    ],
    'data': [
        { title: 'I will analyze your Excel data', description: 'Pivot tables, formulas, and insights.' },
        { title: 'I will visualize your data', description: 'Dashboards using Power BI or Tableau.' },
        { title: 'I will scrape data from websites', description: 'Clean and formatted datasets on demand.' },
        { title: 'I will clean messy datasets', description: 'Remove duplicates, fill gaps, and standardize.' },
        { title: 'I will write SQL queries', description: 'Fast and optimized data extraction.' },
    ],
    'photography': [
        { title: 'I will edit your photos', description: 'Color correction, retouching, and enhancements.' },
        { title: 'I will shoot your product photos', description: 'High-quality images for online stores.' },
        { title: 'I will design photo albums', description: 'Memorable albums for events or gifts.' },
        { title: 'I will restore old photos', description: 'Repair damaged, faded, or torn images.' },
        { title: 'I will take professional headshots', description: 'Clean and sharp portraits for LinkedIn or CVs.' },
    ]
}


_createDemoGigs()


export const gigservice = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    getCategoryList,
    getCategoryTitleFromPath,
    getDefaultFilter,
    addGigMsg
}
window.cs = gigservice


async function query(filterBy = { txt: '', price: 0 }) {
    var gigs = await storageService.query(GIG_KEY)
    const { txt, minPrice, maxPrice, daysToMake, categories } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }
    if (minPrice) {
        gigs = gigs.filter(gig => gig.price >= +minPrice)
    }
    if (maxPrice) {
        gigs = gigs.filter(gig => gig.price <= +maxPrice)
    }
    if (daysToMake) {
        gigs = gigs.filter(gig => gig.daysToMake <= +daysToMake)
    }

    if (categories.length) {
        gigs = gigs.filter(gig => categories.includes(gig.category))
    }

    gigs = gigs.map(({ _id, title, price, category, daysToMake, owner, imgUrls }) => ({
        _id,
        title,
        price,
        category,
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
        categories: [],
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
        categories: [],
        pageIdx: 0,
    }
}

function _createDemoGigs() {
    let gigs = JSON.parse(localStorage.getItem(GIG_KEY))
    const gigsPerCategory = 3

    if (gigs && gigs.length) return
    gigs = []

    for (const category in CATEGORIES) {
        const gigsData = CATEGORIES[category]

        for (let i = 0; i < gigsPerCategory && i < gigsData.length; i++) {
            const { title, description } = gigsData[i]
            const gig = {
                _id: makeId(),
                title,
                description,
                price: +getRandomIntInclusive(10, 150).toFixed(2),
                daysToMake: getRandomIntInclusive(1, 7),
                owner: _getDemoOwner(),
                avgResponseTime: getRandomIntInclusive(1, 24),
                loc: _pickRandom(LOCATIONS),
                imgUrls: [`/src/assets/img/gigImg/img${getRandomIntInclusive(1, 20)}.jpg`],
                category,
                likedByUsers: [],
                reviews: [],
                createdAt: Date.now() - getRandomIntInclusive(0, 1000 * 60 * 60 * 24 * 5)
            }
            gigs.push(gig)
        }
    }

    saveToStorage(GIG_KEY, gigs)
}

function getCategoryList(categoryKey = null) {
    const categoryDisplayNames = {
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
        'photography': 'Photography',
    }

    if (categoryKey) return categoryDisplayNames[categoryKey]

    return Object.keys(CATEGORIES).map(categoryRoute => ({
        categoryRoute,
        categoryName: categoryDisplayNames[categoryRoute] || categoryRoute
    }))
}

export function getCategoryTitleFromPath(path) {
    const parts = path.split('/').filter(Boolean)
    const last = parts.at(-1)
    const categoryName = gigservice.getCategoryList(last) || last.replace(/-/g, ' ')
    return categoryName.replace(/\b\w/g, c => c.toUpperCase())
}


function _getDemoOwner() {
    return {
        _id: makeId(),
        fullname: _pickRandom(['Farhan G', 'Shay I', 'Or A']),
        imgUrl: ownerImg,
        rate: +(Math.random() * 1 + 4).toFixed(1), // 3.5-5.0,
        level: getRandomIntInclusive(1, 3),
        loc: _pickRandom(LOCATIONS),
        memberSince: _pickRandom(['2015-11', '2016-02', '2020-11', '2022-04']),
        languages: _pickRandom(LANGUAGES),
    }
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