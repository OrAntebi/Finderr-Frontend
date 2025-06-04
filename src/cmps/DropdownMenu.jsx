import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function DropdownMenu({ isOpen, onClose, items = [], className = '' }) {
    const menuRef = useRef()

    useEffect(() => {
        function handleClickOutside(ev) {
            setTimeout(() => {
                if (menuRef.current && !menuRef.current.contains(ev.target)) {
                    onClose()
                }
            }, 0)
        }

        document.addEventListener("pointerdown", handleClickOutside)
        return () => document.removeEventListener("pointerdown", handleClickOutside)
    }, [onClose])

    return (
        <ul className={`dropdown-menu ${isOpen ? "open" : ""} ${className}`} ref={menuRef}>
            {items.map((item, idx) => (
                <li key={idx}>
                    {item.type === 'link' ? (
                        <Link to={item.to} onClick={onClose}>{item.label}</Link>
                    ) : (
                        <button onClick={() => { item.onClick?.(); onClose(); }}>
                            {item.label}
                        </button>
                    )}
                </li>
            ))}
        </ul>
    )
}
