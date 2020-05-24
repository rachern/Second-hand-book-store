export function debounce(func, wait) {
    let timer, context
    return function() {
        context = this
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(context)
        }, wait)
    }
}