const { Base64 } = require('js-base64')

/**
 * Valida si un data es númerico
 * @param {any} data String to validate
 * @version 2.0
 * @return {boolean} true si es númerico false si no lo es
 */
const isNumeric = data => {
    if (isNaN(data) && data !== undefined && data !== false && data !== null) return true
    return false
}

const onlyLetters = data => {
    const validate = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g;
    if (validate.test(data) === false && !!data) {
        return true
    }
    return false
}
const isEmail = email => {
    const validate = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/
    if (validate.test(email) === false && !!email) return true
    return false
}

const rangeLength = (data, min, max) => {
    if (((data.length < min) || (data.length > max)) && !!data) return true
    else return false
}

const rangeMath = (data, min, max) => {
    if (((data < min) || (data > max)) && !!data) return true
    else return false
}

const validateParams = object => {
    object.forEach(item => {
        /* Get name param */
        const value = item.value
        const error = { validation: true, message: 'ERROR: Los campos han sido alterados.' }
        /** Requerido */
        if (item.required) {
            if (value === undefined || value === '' || (!item.number && !item.math && value === 0)) throw error
        }
        /** ID */
        if (value && item.id) {
            if (isNaN(Base64.decode(value))) throw error
        }
        /** Numerico */
        if (value && item.number) {
            if (isNumeric(value)) throw error
        }
        /** solo letras */
        if (value && item.letters) {
            if (onlyLetters(value)) throw error
        }
        /** Tipo email */
        if (value && item.email) {
            if (isEmail(value)) throw error
        }
        /** rango */
        if (value && item.range && !item.math) {
            if (rangeLength(value, item.min, item.max)) throw error
        }
        /** rango */
        if (value && item.math && !item.range) {
            if (rangeMath(value, item.min, item.max)) throw error
        }
    })
    return true
}

module.exports = {
    isNumeric,
    onlyLetters,
    isEmail,
    rangeLength,
    rangeMath,
    validateParams
}