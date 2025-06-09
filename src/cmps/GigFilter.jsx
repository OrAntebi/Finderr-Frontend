import { useState, useEffect } from 'react'

export function GigFilter({ filterBy, onSetFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [showBudgetDropdown, setShowBudgetDropdown] = useState(false)
    const [showDeliveryDropdown, setShowDeliveryDropdown] = useState(false)

    // useEffect(() => {
    //     onSetFilterBy(filterToEdit)
    // }, [filterToEdit])

    function handleChange(ev) {
        const { name, value, type } = ev.target
        let fixedValue = type === 'number' ? +value || '' : value
        setFilterToEdit(prev => ({ ...prev, [name]: fixedValue }))
    }

    function clearBudget() {
        setFilterToEdit(prev => ({ ...prev, minPrice: '', maxPrice: '' }))
        setShowBudgetDropdown(false)
    }

    function clearDelivery() {
        setFilterToEdit(prev => ({ ...prev, daysToMake: '' }))
        setShowDeliveryDropdown(false)
    }

    function toggleBudgetDropdown() {
        setShowBudgetDropdown(prev => !prev)
    }

    function toggleDeliveryDropdown() {
        setShowDeliveryDropdown(prev => !prev)
    }

    function applyDropdowns() {
        setShowBudgetDropdown(false)
        setShowDeliveryDropdown(false)
        onSetFilterBy(filterToEdit)
    }

    return (
        <section className="gig-filter">
            <div className="dropdown-filter">
                <button onClick={toggleDeliveryDropdown}>Delivery Time</button>
                {showDeliveryDropdown && (
                    <div className="dropdown-content">
                        {['1', '3', '7', ''].map(value => (
                            <label key={value}>
                                <input
                                    type="radio"
                                    name="daysToMake"
                                    value={value}
                                    checked={filterToEdit.daysToMake === value}
                                    onChange={handleChange}
                                />
                                {value === '1' && 'Express 24H'}
                                {value === '3' && 'Up to 3 days'}
                                {value === '7' && 'Up to 7 days'}
                                {value === '' && 'Anytime'}
                            </label>
                        ))}
                        <div className="btn-group">
                            <button onClick={clearDelivery}>Clear</button>
                            <button onClick={applyDropdowns}>Apply</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="dropdown-filter">
                <button onClick={toggleBudgetDropdown}>Budget</button>
                {showBudgetDropdown && (
                    <div className="dropdown-content">
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Min price"
                            value={filterToEdit.minPrice}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Max price"
                            value={filterToEdit.maxPrice}
                            onChange={handleChange}
                        />
                        <div className="btn-group">
                            <button onClick={clearBudget}>Clear</button>
                            <button onClick={applyDropdowns} >Apply</button>
                            {/* <button onClick={() => onSetFilterBy(filterToEdit)}>Apply</button> */}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
