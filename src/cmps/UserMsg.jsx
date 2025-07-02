import { eventBus, showSuccessMsg } from "../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBus.on('show-msg', (msg) => {
            setMsg(msg)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 4000)
        })
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span style={{ position: 'absolute' }}></span>
    return (
        <section className={`user-msg flex align-center ${msg.type}`}>
            {msg.type === 'success'
                ? <i className="fa-solid fa-circle-check check-icon"></i>
                : <i className="fa-regular fa-circle-xmark x-icon"></i>}

            {msg.txt}

            <a className="btn close" onClick={closeMsg}>
                <i className="fa-solid fa-x"></i>
            </a>
        </section>
    )
}