export const Cookies = {
    get: key => {
        const name = `${ key }=`
        const cookies = document.cookie
        const split = cookies.split(';')
        for (let i = 0; i < split.length; i++) {
            let x = split[i]
            while (x.charAt(0) === ' ') x = x.substring(1) // delete spaces
            if (x.indexOf(name) === 0) return x.substring(name.length, x.length)
        }
        return ''
    },
    remove: (key, path) => document.cookie = `${ key }=; path=${ path }`
}