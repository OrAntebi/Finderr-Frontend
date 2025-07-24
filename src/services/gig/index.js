const { DEV, VITE_LOCAL } = import.meta.env
import { getRandomDemoUser, getRandomIntInclusive, makeId } from '../util.service'
import fullStar from '../../assets/img/owner-level-full.svg'
import emptyStar from '../../assets/img/owner-level-empty.svg'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'
import { userService } from '../user'

function getEmptyGig() {
  const loggedInUser = userService.getLoggedinUser()
  const userDemoData = getRandomDemoUser()

  const gig = {
    title: '',
    price: 0,
    packages: {
      basic: {
        packPrice: 0,
        packDaysToMake: 0,
        desc: '',
        features: []
      },
      standard: {
        packPrice: 0,
        packDaysToMake: 0,
        desc: '',
        features: []
      },
      premium: {
        packPrice: 0,
        packDaysToMake: 0,
        desc: '',
        features: []
      }
    },
    owner: {
      _id: loggedInUser._id,
      fullname: loggedInUser.fullname,
      imgUrl: loggedInUser.imgUrl || '',
      level: getRandomIntInclusive(1, 3),
      rate: getRandomIntInclusive(3, 5),
      memberSince: userDemoData.memberSince,
      loc: userDemoData.from,
      languages: ['Hebrew', 'English'],
      avgResponseTime: userDemoData.avgResponseTime,
      lastDelivery: userDemoData.lastDelivery,
      about: userDemoData.description,
      reviewsCount: 0
    },
    daysToMake: '',
    description: '',
    imgUrls: [],
    category: '',
    tags: [],
    orders: 0,
    impressions: 0
  }

  return gig
}

function getDefaultFilter() {
  return { txt: '', minPrice: '', maxPrice: '', daysToMake: '', category: '', tags: [], sortBy: 'recommended' }
}

function getDefaultImgs() {
  return [
    'https://res.cloudinary.com/dgsfbxsed/image/upload/v1698663092/defaultGigImg_vjtk9e.webp',
    'https://res.cloudinary.com/dgsfbxsed/image/upload/v1698914668/default-img-3_afl2mb.webp',
    'https://res.cloudinary.com/dgsfbxsed/image/upload/v1698914668/default-img-1_qhfps6.webp'
  ]
}

function convertLvlToStars(level) {
  const maxStars = 3

  return Array.from({ length: maxStars }, (_, i) =>
    i < level ? fullStar : emptyStar
  )
}

function getCategoryList(key = null) {
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

  if (key) return CATEGORIES[key] || key
  return Object.entries(CATEGORIES).map(([categoryRoute, categoryName]) => ({
    categoryRoute,
    categoryName
  }))
}

function getCategoryTitleFromPath(input) {
  const key = input.includes('/')
    ? input.split('/').filter(Boolean).at(-1)
    : input
  return getCategoryList(key) || key
}

const FILTER_KEYS = [
  'category',
  'query',
  'daysToMake',
  'minPrice',
  'maxPrice',
  'tags',
  'sortBy'
]

function queryParamsToFilter(qp) {
  const params = Object.fromEntries(
    [...qp].filter(([key]) => FILTER_KEYS.includes(key))
  )
  return {
    category: params.category || '',
    txt: params.query || '',
    daysToMake: params.daysToMake || '',
    minPrice: params.minPrice || '',
    maxPrice: params.maxPrice || '',
    tags: params.tags ? params.tags.split(',') : [],
    sortBy: params.sortBy || 'recommended',
  }
}

function filterToQueryParams(filter, base = new URLSearchParams()) {
  FILTER_KEYS.forEach(key => base.delete(key))

  if (filter.category) base.set('category', filter.category)
  if (filter.txt) base.set('query', filter.txt)
  if (filter.daysToMake) base.set('daysToMake', filter.daysToMake)
  if (filter.minPrice) base.set('minPrice', filter.minPrice)
  if (filter.maxPrice) base.set('maxPrice', filter.maxPrice)
  if (filter.tags?.length) base.set('tags', filter.tags.join(','))
  base.set('sortBy', filter.sortBy || 'recommended')

  return base
}

const service = VITE_LOCAL === 'true' ? local : remote

export const gigService = {
  getEmptyGig,
  getDefaultFilter,
  getDefaultImgs,
  convertLvlToStars,
  getCategoryList,
  getCategoryTitleFromPath,
  queryParamsToFilter,
  filterToQueryParams,
  FILTER_KEYS,
  ...service
}






























//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.gigService = gigService
