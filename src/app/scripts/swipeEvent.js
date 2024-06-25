export const swipeEventUpDown = (elem, callbackforUp, callbackforDown) => {
    let touchstartY = 0
    let touchendY = 0

    let element = document.querySelector(elem)

    function checkDirection() {
        if (touchendY < touchstartY) {
            console.log('swiped Up!')
            callbackforUp()
        }
        if (touchendY > touchstartY) {
            console.log('swiped Down!')
            callbackforDown()
        }
    }

    element.addEventListener('touchstart', e => {
        touchstartY = e.changedTouches[0].screenY
    })

    element.addEventListener('touchend', e => {
        touchendY = e.changedTouches[0].screenY
        checkDirection()
    })
}