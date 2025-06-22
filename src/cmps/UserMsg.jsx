import { useState, useEffect, useRef } from 'react'
import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from '../services/socket.service'

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const [anim, setAnim] = useState('')
    const timer = useRef()

    useEffect(() => {
        const unsub = eventBus.on('show-msg', newMsg => {
            clearTimeout(timer.current)
            setMsg(newMsg)
            setAnim('')
            timer.current = setTimeout(autoClose, 3000)
        })

        socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, r =>
            showSuccessMsg(`New review about me – ${r.txt}`)
        )

        return () => {
            unsub()
            socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
            clearTimeout(timer.current)
        }
    }, [])

    const autoClose = () => {
        setAnim('slide')
        setTimeout(() => setMsg(null), 400)
    }

    const manualClose = () => {
        clearTimeout(timer.current)
        setAnim('fade')
        setTimeout(() => setMsg(null), 300)
    }

    return (
        <section className={`user-msg ${msg ? 'show' : ''} ${anim} ${msg?.type || ''}`}>
            <span className="icon" aria-hidden="true">
                {msg?.type === 'success'
                    ? '✔'
                    : msg?.type === 'error'
                        ? '✖'
                        : msg?.type === 'warning'
                            ? '⚠'
                            : 'ℹ'}
            </span>
            <span>{msg?.txt}</span>
            <button onClick={manualClose} aria-label="Close">×</button>
        </section>
    )
}
