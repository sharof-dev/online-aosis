export const setItems = (key, item) => {
    try {
        localStorage.setItem(key, item)
    } catch (error) {
        console.error(error);
    }
}


export const getItem = (key) => {
    try {
       return localStorage.getItem(key)
    } catch (error) {
        console.error(error);
    }
}
export const removeItem = (key) => {
    try {
       return localStorage.removeItem(key)
    } catch (error) {
        console.error(error);
    }
}