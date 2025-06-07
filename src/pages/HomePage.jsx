import { DynamicHomePage } from "../cmps/dynamicCmps/DynamicHomePage"
import { useScreenSize } from "../customHooks/useScreenSize"

export function HomePage() {
    const screenWidth = useScreenSize()

    return (
        <DynamicHomePage screenWidth={screenWidth} />
    )
}