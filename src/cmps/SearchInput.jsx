import { useState } from 'react'
import { SHOW_BACKDROP, HIDE_BACKDROP } from '../store/system.reducer'
import { useDispatch } from 'react-redux'
import submitIcon from '../assets/img/submit-icon.svg'

export default function SearchInput({
    submitBtn = true,
    placeholderText = "What service are you looking for today?",
    onSearch,
    backdropOnFocus = false
}) {
    const [txt, setTxt] = useState('')
    const dispatch = useDispatch()

    function openBackdrop() {
        if (backdropOnFocus) dispatch({ type: SHOW_BACKDROP })
    }

    function closeBackdrop() {
        if (backdropOnFocus) dispatch({ type: HIDE_BACKDROP })
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        setTxt('')
        if (onSearch) onSearch(txt)
        closeBackdrop()
    }

    function handleClear() {
        setTxt('')
        closeBackdrop()
    }

    return (
        <>
            <form className="search-bar-container flex justify-between" onSubmit={handleSubmit}>
                <input
                    type="search"
                    className={`search-bar ${!submitBtn ? "no-submit-btn" : ""}`}
                    placeholder={placeholderText}
                    value={txt}
                    onChange={ev => setTxt(ev.target.value)}
                    onFocus={openBackdrop}
                    onBlur={closeBackdrop}
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
        </>
    )
}
