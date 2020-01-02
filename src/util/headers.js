export const getHeader = () => ({
    headers: {
        Authorization: sessionStorage.getItem('token')
    }
})