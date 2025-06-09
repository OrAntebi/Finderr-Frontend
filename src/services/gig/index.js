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
  return {
    txt: '',
    maxPrice: '',
    minSpeed: '',
    sortField: '',
    sortDir: '',
    // pageIdx: 0
  }
}

function convertLvlToStars(level) {
  const maxStars = 3

  return Array.from({ length: maxStars }, (_, i) =>
    i < level ? fullStar : emptyStar
  )
}

const service = VITE_LOCAL === 'true' ? local : remote
export const gigservice = { getEmptyGig, getDefaultFilter, convertLvlToStars, ...service }






























//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.gigservice = gigservice
