import { useState, useEffect } from 'react'

export function useScreenSize() {
    const getSize = () => window.innerWidth
    const [width, setWidth] = useState(getSize())

    useEffect(() => {
        const onResize = () => setWidth(getSize())
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    return width
}
