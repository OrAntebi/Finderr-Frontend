import submitIcon from '../assets/img/submit-icon.svg'

export default function SearchInput({ submitBtn = true }) {
    return (
        <form className="search-bar-container flex justify-between">
            <input
                type="search"
                className={`search-bar ${!submitBtn ? "no-submit-btn" : ""}`}
                placeholder="What service are you looking for today?"
            />
            {submitBtn && (
                <button type="submit" className="search-btn">
                    <img src={submitIcon} alt="search icon" />
                </button>
            )}
        </form>
    )
}
