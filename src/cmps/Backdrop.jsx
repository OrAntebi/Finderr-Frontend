import { useSelector, useDispatch } from 'react-redux'
import { HIDE_BACKDROP } from '../store/system.reducer'

export function Backdrop() {
    const isBackdropOpen = useSelector(state => state.systemModule.isBackdropOpen)
    const dispatch = useDispatch()

    return (
        <div
            className={`backdrop${isBackdropOpen ? ' active' : ''}`}
            onClick={() => dispatch({ type: HIDE_BACKDROP })}
        />
    )
}
