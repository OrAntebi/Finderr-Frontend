import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { setGigFilter } from '../store/gig/gig.actions'
import { gigservice } from '../services/gig'
import arrowIcon from '../assets/img/dropdown-arrow-icon.svg'

export function GigFilter() {
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector(store => store.gigModule.filterBy)
    const [filterToEdit, setFilterToEdit] = useState({
        ...structuredClone(filterBy),
        tags: filterBy.tags || [],
        sortBy: filterBy.sortBy || 'recommended'
    })
    const [openDropdown, setOpenDropdown] = useState(null)
    const [allTags, setAllTags] = useState([])

    const budgetRef = useRef(null)
    const deliveryRef = useRef(null)
    const tagsRef = useRef(null)
    const sortRef = useRef(null)

    useEffect(() => {
        (async () => {
            setAllTags(await gigservice.getAllTags())
        })()
    }, [])

    useEffect(() => {
        function handleClickOutside(ev) {
            const map = {
                budget: budgetRef,
                delivery: deliveryRef,
                tags: tagsRef,
                sort: sortRef
            }
            const openRef = map[openDropdown]?.current
            if (openRef && !openRef.contains(ev.target)) setOpenDropdown(null)
        }
        document.addEventListener('pointerdown', handleClickOutside)
        return () => document.removeEventListener('pointerdown', handleClickOutside)
    }, [openDropdown])

    function handleNumericChange(ev) {
        const { name, value, type } = ev.target
        const fixed = type === 'number' || name === 'daysToMake' ? +value || '' : value
        setFilterToEdit(prev => ({ ...prev, [name]: fixed }))
    }

    function handleTagToggle(ev) {
        const { value, checked } = ev.target
        setFilterToEdit(prev => {
            const next = new Set(prev.tags)
            checked ? next.add(value) : next.delete(value)
            return { ...prev, tags: [...next] }
        })
    }

    function handleSortChange(sortValue) {
        setFilterToEdit(prev => ({ ...prev, sortBy: sortValue }))
        setGigFilter({ ...filterToEdit, sortBy: sortValue })
        setOpenDropdown(null)
    }

    const toggleDropdown = type =>
        setOpenDropdown(prev => (prev === type ? null : type))

    const clearBudget = () =>
        setFilterToEdit(f => ({ ...f, minPrice: '', maxPrice: '' }))

    const clearDelivery = () =>
        setFilterToEdit(f => ({ ...f, daysToMake: '' }))

    const clearTags = () =>
        setFilterToEdit(f => ({ ...f, tags: [] }))

    function applyDropdowns() {
        setGigFilter(filterToEdit)
        setOpenDropdown(null)
    }

    function resetAllFilters() {
        setGigFilter({ ...gigservice.getDefaultFilter(), categories: filterBy.categories })
    }

    const deliveryOptions = [
        { label: 'Express 24H', value: 1 },
        { label: 'Up to 3 days', value: 3 },
        { label: 'Up to 7 days', value: 7 },
        { label: 'Anytime', value: '' }
    ]

    const sortOptions = [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Best Selling', value: 'best-selling' },
        { label: 'Newest Arrivals', value: 'newest-arrivals' },
        { label: 'Fastest Delivery', value: 'fastest-delivery' },
        { label: 'Price: Low to High', value: 'price-low-to-high' },
        { label: 'Price: High to Low', value: 'price-high-to-low' }
    ]

    const ClearApplyBtns = ({ onClear }) => {
        return (
            <div className="btn-group">
                <button className="btn clear-btn" onClick={onClear}>Clear</button>
                <button className="btn apply-btn" onClick={applyDropdowns}>Apply</button>
            </div>
        )
    }

    function getTotalGigsCount() {
        return gigs.length ? `${gigs.length.toLocaleString()}+ results` : ''
    }

    function getCurrentSortLabel() {
        const currentSort = sortOptions.find(opt => opt.value === filterToEdit.sortBy)
        return currentSort?.label || 'Recommended'
    }

    return (
        <section className="gig-filter-container flx column">
            <section className="gig-filter">
                {/* DELIVERY */}
                <section className={`dropdown-filter filter-delivery-time ${openDropdown === 'delivery' ? 'open' : ''}`}>
                    <button onClick={() => toggleDropdown('delivery')}>
                        Delivery Time
                        <img src={arrowIcon} alt="" className={`arrow-icon ${openDropdown === 'delivery' ? 'rotate' : ''}`} />
                    </button>

                    {openDropdown === 'delivery' && (
                        <div className="dropdown-content" ref={deliveryRef}>
                            {deliveryOptions.map(opt => (
                                <label key={opt.label}>
                                    <input
                                        type="radio"
                                        name="daysToMake"
                                        value={opt.value}
                                        checked={String(filterToEdit.daysToMake) === String(opt.value)}
                                        onChange={handleNumericChange}
                                    />
                                    {opt.label}
                                </label>
                            ))}
                            <ClearApplyBtns onClear={clearDelivery} />
                        </div>
                    )}
                </section>

                {/* BUDGET */}
                <section className={`dropdown-filter filter-budget ${openDropdown === 'budget' ? 'open' : ''}`}>
                    <button onClick={() => toggleDropdown('budget')}>
                        Budget
                        <img src={arrowIcon} alt="" className={`arrow-icon ${openDropdown === 'budget' ? 'rotate' : ''}`} />
                    </button>

                    {openDropdown === 'budget' && (
                        <div className="dropdown-content" ref={budgetRef}>
                            <input
                                type="number"
                                name="minPrice"
                                placeholder="Min price"
                                value={filterToEdit.minPrice}
                                onChange={handleNumericChange}
                            />
                            <input
                                type="number"
                                name="maxPrice"
                                placeholder="Max price"
                                value={filterToEdit.maxPrice}
                                onChange={handleNumericChange}
                            />
                            <ClearApplyBtns onClear={clearBudget} />
                        </div>
                    )}
                </section>

                {/* TAGS */}
                <section className={`dropdown-filter filter-tags ${openDropdown === 'tags' ? 'open' : ''}`}>
                    <button onClick={() => toggleDropdown('tags')}>
                        Tags
                        <img src={arrowIcon} alt="" className={`arrow-icon ${openDropdown === 'tags' ? 'rotate' : ''}`} />
                    </button>

                    {openDropdown === 'tags' && (
                        <div className="dropdown-content tags-list" ref={tagsRef}>
                            <div className="tags-scroll">
                                {allTags.map(tag => (
                                    <label key={tag} className="tag-item">
                                        <input
                                            type="checkbox"
                                            name="tags"
                                            value={tag}
                                            checked={filterToEdit.tags.includes(tag)}
                                            onChange={handleTagToggle}
                                        />
                                        {tag}
                                    </label>
                                ))}
                            </div>
                            <ClearApplyBtns onClear={clearTags} />
                        </div>
                    )}
                </section>

                <section className="dropdown-filter">
                    <button onClick={resetAllFilters}>Reset All</button>
                </section>
            </section>
            
            {/* SORT */}
            <section className="gig-sort flex align-center justify-between">
                <span>{getTotalGigsCount()}</span>

                <div className="sort-by-container flex align-center">
                    <span>Sort by:</span>

                    <section className={`dropdown-filter sort flex align-center ${openDropdown === 'sort' ? 'open' : ''}`}>
                        <button className="sort-btn" onClick={() => toggleDropdown('sort')}>
                            {getCurrentSortLabel()}
                            <img src={arrowIcon} alt="" className={`arrow-icon ${openDropdown === 'sort' ? 'rotate' : ''}`} />
                        </button>

                        {openDropdown === 'sort' && (
                            <div className="dropdown-content sort-options" ref={sortRef}>
                                <ul className="sort-options-list">
                                    {sortOptions.map(opt => (
                                        <li
                                            key={opt.value}
                                            className={`sort-option ${filterToEdit.sortBy === opt.value ? 'selected' : ''}`}
                                            onClick={() => handleSortChange(opt.value)}
                                        >
                                            {opt.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                </div>
            </section>
        </section>
    )
}