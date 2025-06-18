import { useState } from 'react'
import submitIcon from '../assets/img/submit-icon.svg'

export default function SearchInput({
    submitBtn = true,
    placeholderText = "What service are you looking for today?",
    onSearch
}) {
    const [txt, setTxt] = useState('')

    function handleSubmit(ev) {
        ev.preventDefault()
        setTxt('')
        if (onSearch) onSearch(txt)
    }

    function handleClear() {
        setTxt('')
    }

    return (
        <form className="search-bar-container flex justify-between" onSubmit={handleSubmit}>
            <input
                type="search"
                className={`search-bar ${!submitBtn ? "no-submit-btn" : ""}`}
                placeholder={placeholderText}
                value={txt}
                onChange={ev => setTxt(ev.target.value)}
            />

            {txt && (
                <button
                    type="button"
                    className="clear-btn"
                    onClick={handleClear}
                    aria-label="Clear search"
                />
            )}

            {submitBtn && (
                <button type="submit" className="search-btn">
                    <img src={submitIcon} alt="search icon" />
                </button>
            )}
        </form>
    )
}
