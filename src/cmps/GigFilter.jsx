import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { setGigFilter } from '../store/gig/gig.actions'
import { gigService } from '../services/gig'

import arrowIcon from '../assets/img/dropdown-arrow-icon.svg'
import checkIcon from '../assets/img/check-icon-2.svg'
import closeIcon from '../assets/img/close-icon.svg'

const { queryParamsToFilter, filterToQueryParams } = gigService

const BUDGET_OPTIONS = [
    { id: 'value', label: 'Value', note: 'Under ₪200', min: '', max: 200 },
    { id: 'mid', label: 'Mid-range', note: '₪200-₪364', min: 200, max: 364 },
    { id: 'high', label: 'High-end', note: '₪364 & Above', min: 364, max: '' },
    { id: 'custom', label: 'Custom', note: '', isCustom: true },
]
const DELIVERY_OPTIONS = [
    { label: 'Express 24H', value: 1 },
    { label: 'Up to 3 days', value: 3 },
    { label: 'Up to 7 days', value: 7 },
    { label: 'Anytime', value: '' },
]
const SORT_OPTIONS = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Best Selling', value: 'best-selling' },
    { label: 'Newest Arrivals', value: 'newest-arrivals' },
    { label: 'Fastest Delivery', value: 'fastest-delivery' },
    { label: 'Price: Low → High', value: 'price-low-to-high' },
    { label: 'Price: High → Low', value: 'price-high-to-low' },
]

export function GigFilter() {
    const gigs = useSelector(s => s.gigModule.gigs)
    const filterBy = useSelector(s => s.gigModule.filterBy)

    const [filter, setFilter] = useState(() => ({
        ...structuredClone(filterBy),
        tags: filterBy.tags || [],
        sortBy: filterBy.sortBy || 'recommended'
    }))

    const [allTags, setAllTags] = useState([])
    const [openDropdown, setOpenDropdown] = useState(null)
    const dropdownRefs = useRef({})

    useEffect(() => {
        gigService.getAllTags().then(setAllTags)
    }, [])

    useEffect(() => {
        setFilter({
            ...structuredClone(filterBy),
            tags: filterBy.tags || [],
            sortBy: filterBy.sortBy || 'recommended',
        })
    }, [filterBy])

    useEffect(() => {
        const handler = e => {
            if (!openDropdown) return
            const box = dropdownRefs.current[openDropdown]
            if (box && !box.contains(e.target)) setOpenDropdown(null)
        }
        document.addEventListener('pointerdown', handler)
        return () => document.removeEventListener('pointerdown', handler)
    }, [openDropdown])

    const registerRef = (key, node) => {
        dropdownRefs.current[key] = node
    }

    const applyChanges = useCallback(
        changes => {
            const next = { ...filter, ...changes }
            setFilter(next)
            setGigFilter(next)
            setOpenDropdown(null)
        },
        [filter]
    )

    const clearKey = section => {
        const cleared = {
            delivery: { daysToMake: '' },
            budget: { minPrice: '', maxPrice: '' },
            tags: { tags: [] },
            sort: { sortBy: 'recommended' },
        }[section]
        applyChanges(cleared)
    }

    const gigsCountText = useMemo(
        () => (gigs.length ? `${gigs.length.toLocaleString()}+ results` : ''),
        [gigs.length]
    )

    const resetAll = () => {
        const def = {
            ...gigService.getDefaultFilter(),
            categories: filterBy.categories,
        }
        setFilter(def)
        setGigFilter(def)
        setOpenDropdown(null)
    }

    const removeTag = tag =>
        applyChanges({ tags: filter.tags.filter(t => t !== tag) })

    return (
        <section className="gig-filter-container flx column">
            <section className="gig-filter">
                <DeliveryDropdown
                    isOpen={openDropdown === 'delivery'}
                    toggle={() => setOpenDropdown(openDropdown === 'delivery' ? null : 'delivery')}
                    register={n => registerRef('delivery', n)}
                    draft={{ daysToMake: filter.daysToMake }}
                    options={DELIVERY_OPTIONS}
                    onApply={applyChanges}
                    onClear={() => clearKey('delivery')}
                />

                <BudgetDropdown
                    isOpen={openDropdown === 'budget'}
                    toggle={() => setOpenDropdown(openDropdown === 'budget' ? null : 'budget')}
                    register={n => registerRef('budget', n)}
                    draft={{ minPrice: filter.minPrice, maxPrice: filter.maxPrice }}
                    options={BUDGET_OPTIONS}
                    onApply={applyChanges}
                    onClear={() => clearKey('budget')}
                />

                <TagsDropdown
                    isOpen={openDropdown === 'tags'}
                    toggle={() => setOpenDropdown(openDropdown === 'tags' ? null : 'tags')}
                    register={n => registerRef('tags', n)}
                    tags={allTags}
                    selected={filter.tags}
                    onApply={applyChanges}
                    onClear={() => clearKey('tags')}
                />

                <section className="dropdown-filter">
                    <button onClick={resetAll}>Reset All</button>
                </section>
            </section>

            <ActiveFilters
                filter={filter}
                removeTag={removeTag}
                clearDelivery={() => clearKey('delivery')}
                clearBudget={() => clearKey('budget')}
            />

            <section className="gig-sort flex align-center justify-between">
                <span>{gigsCountText}</span>

                <div className="sort-by-container flex align-center">
                    <span>Sort by:</span>
                    <SortDropdown
                        isOpen={openDropdown === 'sort'}
                        toggle={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
                        register={n => registerRef('sort', n)}
                        options={SORT_OPTIONS}
                        current={filter.sortBy}
                        onApply={applyChanges}
                    />
                </div>
            </section>
        </section>
    )
}

/* ───────── WRAPPER ───────── */
function DropdownWrapper({ isOpen, toggle, register, wrapperClasses, contentClasses, buttonLabel, children }) {
    return (
        <section className={`dropdown-filter ${wrapperClasses} ${isOpen ? 'open' : ''}`}>
            <button onClick={toggle}>
                {buttonLabel}
                <img src={arrowIcon} alt='' className={`arrow-icon ${isOpen ? 'rotate' : ''}`} />
            </button>
            {isOpen &&
                <div className={`dropdown-content ${contentClasses || ''}`} ref={register}>
                    {children}
                </div>}
        </section>
    )
}

/* ───────── DELIVERY ───────── */
function DeliveryDropdown({ isOpen, toggle, register, draft, options, onApply, onClear }) {

    const [temp, setTemp] = useState(draft)

    useEffect(() => {
        if (isOpen) setTemp(draft)
    }, [isOpen, draft])

    return (
        <DropdownWrapper
            wrapperClasses='filter-delivery-time'
            buttonLabel='Delivery Time'
            isOpen={isOpen}
            toggle={toggle}
            register={register}
        >
            {options.map(opt => (
                <label key={opt.label} className='delivery-radio'>
                    <input
                        className='radio-native'
                        type='radio'
                        name='daysToMake'
                        value={opt.value}
                        checked={String(temp.daysToMake) === String(opt.value)}
                        onChange={() => setTemp({ daysToMake: opt.value })}
                    />
                    <span className='radio-custom'></span>
                    {opt.label}
                </label>
            ))}
            <Buttons onClear={onClear} onApply={() => onApply(temp)} />
        </DropdownWrapper>
    )
}

/* ───────── BUDGET ───────── */
function BudgetDropdown({ isOpen, toggle, register, draft, options, onApply, onClear }) {
    const initState = () => {
        const opt = options.find(o => o.min === draft.minPrice && o.max === draft.maxPrice)
        return {
            selected: opt ? opt.id : (draft.minPrice || draft.maxPrice ? 'custom' : ''),
            custom: draft.maxPrice?.toString() || ''
        }
    }
    const [state, setState] = useState(initState)

    useEffect(() => { if (isOpen) setState(initState()) }, [isOpen, draft])

    const apply = () => {
        if (state.selected === 'custom') onApply({ minPrice: 0, maxPrice: +state.custom || '' })
        else {
            const opt = options.find(o => o.id === state.selected) || {}
            onApply({ minPrice: opt.min ?? '', maxPrice: opt.max ?? '' })
        }
    }

    return (
        <DropdownWrapper
            wrapperClasses='filter-budget'
            contentClasses='budget-options'
            buttonLabel='Budget'
            isOpen={isOpen}
            toggle={toggle}
            register={register}
        >
            {options.map(opt => (
                <div key={opt.id} className='budget-option'>
                    <label className='budget-option-label budget-radio'>
                        <input
                            className='radio-native'
                            type='radio'
                            name='budgetOption'
                            value={opt.id}
                            checked={state.selected === opt.id}
                            onChange={() => setState({ ...state, selected: opt.id })}
                        />
                        <span className='radio-custom'></span>
                        <span className='budget-label'>{opt.label}</span>
                        {opt.note && <span className='budget-note'>{opt.note}</span>}
                    </label>

                    {opt.isCustom && state.selected === 'custom' && (
                        <label className='custom-budget-input'>
                            <span className='up-to-label'>Up to</span>
                            <input
                                type='number'
                                placeholder='₪'
                                value={state.custom}
                                onChange={e => setState({ ...state, custom: e.target.value })}
                                className='custom-budget-field'
                                min='0'
                            />
                        </label>
                    )}
                </div>
            ))}
            <Buttons onClear={onClear} onApply={apply} />
        </DropdownWrapper>
    )
}

/* ───────── TAGS ───────── */
function TagsDropdown({ isOpen, toggle, register, tags, selected, onApply, onClear }) {

    const [temp, setTemp] = useState(new Set(selected))

    useEffect(() => {
        if (isOpen) setTemp(new Set(selected))
    }, [isOpen, selected])

    const toggleTag = tag => {
        const next = new Set(temp)
        next.has(tag) ? next.delete(tag) : next.add(tag)
        setTemp(next)
    }

    return (
        <DropdownWrapper
            wrapperClasses='filter-tags'
            contentClasses='tags-list'
            buttonLabel='Tags'
            isOpen={isOpen}
            toggle={toggle}
            register={register}
        >
            <div className='tags-scroll'>
                {tags.map(tag => (
                    <label key={tag} className='tag-item tag-checkbox'>
                        <input
                            className='checkbox-native'
                            type='checkbox'
                            name='tags'
                            value={tag}
                            checked={temp.has(tag)}
                            onChange={() => toggleTag(tag)}
                        />
                        <span className='checkbox-custom'></span>
                        {tag}
                    </label>
                ))}
            </div>
            <Buttons onClear={onClear} onApply={() => onApply({ tags: [...temp] })} />
        </DropdownWrapper>
    )
}

/* ───────── SORT ───────── */
function SortDropdown({ isOpen, toggle, register, options, current, onApply }) {

    const currentLabel = options.find(o => o.value === current)?.label || 'Recommended'

    return (
        <section className={`dropdown-filter sort flex align-center ${isOpen ? 'open' : ''}`}>
            <button className='sort-btn' onClick={toggle}>
                {currentLabel}
                <img src={arrowIcon} alt='' className={`arrow-icon ${isOpen ? 'rotate' : ''}`} />
            </button>
            {isOpen && (
                <div className='dropdown-content sort-options' ref={register}>
                    <ul className='sort-options-list'>
                        {options.map(opt => {
                            const selected = current === opt.value
                            return (
                                <li
                                    key={opt.value}
                                    className={`sort-option flex align-center ${selected ? 'selected' : ''}`}
                                    onClick={() => onApply({ sortBy: opt.value })}
                                >
                                    <img src={checkIcon} alt='check' className={selected ? '' : 'hidden'} />
                                    <label>{opt.label}</label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </section>
    )
}

/* ───────── Active Filters ───────── */
function ActiveFilters({ filter, removeTag, clearDelivery, clearBudget }) {
    const chips = []

    if (filter.daysToMake) {
        const txt =
            DELIVERY_OPTIONS.find(o => String(o.value) === String(filter.daysToMake))?.label ||
            `${filter.daysToMake} days`
        chips.push({ id: 'delivery', label: txt, onClear: clearDelivery })
    }

    if (filter.minPrice || filter.maxPrice) {
        const match = BUDGET_OPTIONS.find(
            o => o.min === filter.minPrice && o.max === filter.maxPrice
        )
        const txt = match ? match.note : `Up to ₪${filter.maxPrice || filter.minPrice}`
        chips.push({ id: 'budget', label: txt, onClear: clearBudget })
    }

    if (filter.tags?.length) {
        filter.tags.forEach(tag =>
            chips.push({ id: `tag-${tag}`, label: tag, onClear: () => removeTag(tag) })
        )
    }

    if (!chips.length) return null

    return (
        <section className='active-filters flex gap8 wrap'>
            {chips.map(c => (
                <span key={c.id} className='chip' onClick={c.onClear}>
                    {c.label}
                    <button>
                        <img src={closeIcon} alt='remove' />
                    </button>
                </span>
            ))}
        </section>
    )
}

/* ───────── BUTTONS ───────── */
function Buttons({ onClear, onApply }) {
    return (
        <div className='btn-group'>
            <button className='btn clear-btn' onClick={onClear}>Clear</button>
            <button className='btn apply-btn' onClick={onApply}>Apply</button>
        </div>
    )
}

