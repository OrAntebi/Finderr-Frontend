const { DEV, VITE_LOCAL } = import.meta.env
import { getRandomIntInclusive, makeId } from '../util.service'
import fullStar from '../../assets/img/owner-level-full.svg'
import emptyStar from '../../assets/img/owner-level-empty.svg'

import { gigservice as local } from './gig.service.local'
import { gigservice as remote } from './gig.service.remote'

function getEmptyGig() {
  return {
    vendor: makeId(),
    price: getRandomIntInclusive(1000, 9000),
    speed: getRandomIntInclusive(80, 240),
    msgs: [],
  }
}

function getDefaultFilter() {
  return { txt: '', minPrice: '', maxPrice: '', daysToMake: '', categories: [], tags: [], sortBy: '' }
}

function convertLvlToStars(level) {
  const maxStars = 3

  return Array.from({ length: maxStars }, (_, i) =>
    i < level ? fullStar : emptyStar
  )
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
    categories: params.category ? [params.category] : [],
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

  if (filter.categories?.length) base.set('category', filter.categories[0])
  if (filter.txt) base.set('query', filter.txt)
  if (filter.daysToMake) base.set('daysToMake', filter.daysToMake)
  if (filter.minPrice) base.set('minPrice', filter.minPrice)
  if (filter.maxPrice) base.set('maxPrice', filter.maxPrice)
  if (filter.tags?.length) base.set('tags', filter.tags.join(','))
  base.set('sortBy', filter.sortBy || 'recommended')

  return base
}

const service = VITE_LOCAL === 'true' ? local : remote
export const gigservice = {
  getEmptyGig,
  getDefaultFilter,
  convertLvlToStars,
  queryParamsToFilter,
  filterToQueryParams,
  FILTER_KEYS,
  ...service
}






























//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.gigservice = gigservice
