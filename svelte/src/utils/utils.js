// @ts-ignore
export const createLoadObserver = handler => {
    let waiting = 0
  
    // @ts-ignore
    const onload = el => {
        waiting++
        el.addEventListener('load', () => {
            waiting--
            if (waiting === 0) {
                handler()
            }
        })
    }
    
    return onload
  }