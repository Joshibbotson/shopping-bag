import { TouchEvent } from "react"

interface SwipeInput {
    onSwipedLeft: () => void
    onSwipedRight: () => void
}

interface SwipeOutput {
    onTouchStart: (e: TouchEvent) => void
    onTouchMove: (e: TouchEvent) => void
    onTouchEnd: () => void
}

export default (input: SwipeInput): SwipeOutput => {
    let touchStart: number
    let touchEnd: number

    const minSwipeDistance = 50
    const onTouchStart = (e: TouchEvent) => {
        touchEnd = 0
        touchStart = e.targetTouches[0].clientX
    }

    const onTouchMove = (e: TouchEvent) =>
        (touchEnd = e.targetTouches[0].clientX)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe) {
            input.onSwipedLeft()
        }
        if (isRightSwipe) {
            input.onSwipedRight()
        }
    }

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    }
}
