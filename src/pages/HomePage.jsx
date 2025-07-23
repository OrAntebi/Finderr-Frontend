import { DynamicHomePage } from "../cmps/dynamicCmps/DynamicHomePage"
import { useScreenSize } from "../customHooks/useScreenSize"


export function HomePage({ onSearch }) {
    const screenWidth = useScreenSize()

    return (
        <DynamicHomePage screenWidth={screenWidth} onSearch={onSearch} />
    )
}