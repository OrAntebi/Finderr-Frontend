
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gigservice } from '../services/gig'
import { setGigFilter } from '../store/gig/gig.actions'
import { useSelector } from 'react-redux'

const { queryParamsToFilter, filterToQueryParams, getDefaultFilter } = gigservice

export function useGigFilterQuery() {
    const [searchParams, setSearchParams] = useSearchParams()
    const filter = useSelector(s => s.gigModule.filterBy)

    useEffect(() => {
        const fromQuery = queryParamsToFilter(searchParams)
        setGigFilter({ ...getDefaultFilter(), ...fromQuery })
    }, [])

    useEffect(() => {
        const merged = filterToQueryParams(filter, new URLSearchParams(searchParams))
        if (merged.toString() !== searchParams.toString()) {
            setSearchParams(merged, { replace: true })
        }
    }, [filter, searchParams, setSearchParams])

    return { filter }
}

