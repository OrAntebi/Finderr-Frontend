import { useState, useEffect } from 'react'
import { gigservice } from '../services/gig'

export function GigFilter({ filterBy, onSetFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const tagList = gigservice.getTagList()

    useEffect(() => {
        onSetFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value = ev.target.value

        switch (type) {
            case 'text': setFilterToEdit({ ...filterToEdit, [field]: value })
                break
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number': setFilterToEdit({ ...filterToEdit, [field]: +value || '' })
                break
            case 'range':
                value = +ev.target.value
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function handleTagClick(tag) {
        setFilterToEdit(prev => ({ ...prev, tags: [tag] }))
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', minprice: '', maxPrice: '' })
    }

    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    }

    return <section className="gig-filter">
        <h3>Filter:</h3>
        <input
            type="text"
            name="txt"
            value={filterToEdit.txt}
            placeholder="Search gigs"
            onChange={handleChange}
            required
        />
        <input
            type="number"
            min="0"
            name="minPrice"
            value={filterToEdit.minPrice}
            placeholder="Min. price"
            onChange={handleChange}
            required
        />
        <button
            className="btn-clear"
            onClick={clearFilter}>Clear</button>
        <h3>services</h3>
        <div className="tag-list">
            {tagList.map(tag =>
                <button className="tag-button" key={tag} onClick={() => handleTagClick(tag)}>
                    {tag}
                </button>
            )}
        </div>
    </section>
}