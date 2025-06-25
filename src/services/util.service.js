export function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function makeLorem(size = 100) {
  var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return (data) ? JSON.parse(data) : undefined
}

export function getInitials(fullName) {
  if (!fullName) return ''

  const words = fullName.trim().split(/\s+/)
  const first = words[0]?.[0] || ''
  const second = words[1]?.[0] || ''

  return (first + second).toUpperCase()
}

export function genRandomCardNumber() {
  return [...Array(16)]
    .map(() => getRandomIntInclusive(0, 9))
    .join('')
    .replace(/(\d{4})(?=\d)/g, '$1 ');
}

export function genRandomExpiration() {
  const mm = String(getRandomIntInclusive(1, 12)).padStart(2, '0');
  const yy =
    String(new Date().getFullYear() + getRandomIntInclusive(1, 10)).slice(-2);
  return `${mm} / ${yy}`;
}

export function genRandomCvv() {
  return String(getRandomIntInclusive(0, 999)).padStart(3, '0');
}

export function calculateDueDate(createdAt, daysToAdd) {
  const dueDate = new Date(createdAt)
  dueDate.setDate(dueDate.getDate() + daysToAdd)
  return dueDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function getRandomDemoUser() {

  const addProficiency = list => {
    const prof = ['Basic', 'Conversational', 'Fluent', 'Native'].sort(() => Math.random() - 0.5)

    return list.map((language, i) => ({
      language,
      proficiency: prof[i % prof.length]
    }))
  }

  const demoUsers = [
    {
      memberSince: 'Mar 2017',
      avgResponseTime: '2 hours',
      lastDelivery: '14 hours',
      description: 'Polyglot full-stack engineer crafting scalable SaaS platforms and mentoring junior devs. Passionate about micro-services and clean architecture 🚀',
      languages: addProficiency(['English', 'Hebrew']),
      skills: ['Reactive Streams', 'GraphQL Schemas', 'Docker Compose', 'Serverless APIs', 'TypeScript Generics'],
      education: {
        title: 'B.Sc. – Software Engineering',
        subtitle: 'Technion, Israel • Graduated 2015'
      },
      from: 'Israel'
    },
    {
      memberSince: 'Aug 2019',
      avgResponseTime: '5 hours',
      lastDelivery: '26 hours',
      description: 'Quality-driven automation engineer delivering zero-bug releases via resilient CI pipelines. Expert in coverage analytics and flaky test elimination 🚀',
      languages: addProficiency(['English']),
      skills: ['Test Automation', 'Flaky Tests', 'Coverage Metrics', 'Load Simulation', 'Pipeline Orchestration'],
      education: {
        title: 'B.A. – Information Systems',
        subtitle: 'Ben-Gurion University, Israel • Graduated 2018'
      },
      from: 'Israel'
    },
    {
      memberSince: 'Jan 2020',
      avgResponseTime: '1 hour',
      lastDelivery: '8 hours',
      description: 'DevOps specialist automating cloud infrastructure, observability stacks and zero-downtime deployments. Kubernetes evangelist and Bash ninja 🚀',
      languages: addProficiency(['English', 'Spanish']),
      skills: ['Service Mesh', 'Container Security', 'Infra Testing', 'Zero Downtime', 'Chaos Engineering'],
      education: {
        title: 'M.Sc. – Computer Networks',
        subtitle: 'ETH Zürich, Switzerland • Graduated 2021'
      },
      from: 'Israel'
    },
    {
      memberSince: 'Oct 2016',
      avgResponseTime: '4 hours',
      lastDelivery: '30 hours',
      description: 'Creative frontend engineer crafting pixel-perfect SPA experiences with React and TypeScript. Champions accessibility and performance budgets 🚀',
      languages: addProficiency(['English', 'French']),
      skills: ['Design Systems', 'Accessibility Audits', 'Performance Budget', 'Static Generation', 'Atomic CSS'],
      education: {
        title: 'B.A. – Interactive Design',
        subtitle: 'Sorbonne University, France • Graduated 2014'
      },
      from: 'Israel'
    },
    {
      memberSince: 'Jul 2018',
      avgResponseTime: '3 hours',
      lastDelivery: '18 hours',
      description: 'Scalable data engineer building AI-ready pipelines and streaming ETL. Transforms raw logs into actionable insights 🚀',
      languages: addProficiency(['English', 'German']),
      skills: ['Stream Processing', 'Feature Stores', 'Data Modeling', 'Batch Ingestion', 'Realtime ETL'],
      education: {
        title: 'M.Sc. – Data Science',
        subtitle: 'TU Berlin, Germany • Graduated 2019'
      },
      from: 'Israel'
    }
  ]

  const idx = Math.floor(Math.random() * demoUsers.length)
  return { ...demoUsers[idx] }
}
