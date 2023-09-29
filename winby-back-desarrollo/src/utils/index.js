const { Base64 } = require('js-base64')
const nodemailer = require('nodemailer')

const generateSku = async (model, col, prefix) => {
    const code = Math.round(Math.random() * (9999 - 1000) + 1000)
    const data = await model.findOne({ where: { [col]: `${prefix}-${code}` } })
    if (data) return await generateSku(model, col, prefix)
    return `${ prefix }-${ code }`
}

const parseJson = (jsonString, defaultReturn) => {
    try {
        const parse = JSON.parse(jsonString)
        return parse
    } catch {
        return defaultReturn
    }
}

const makeUniqueSkuPrefix = async (model, col) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = 0; i < 3; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    const data = await model.findOne({ where: { [col]: result } })
    if (data) return await makeUniqueSkuPrefix()
    return result
}

const codeRed = async model => {
    try {
        /** variables necesarias */
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        /** creación de codigo */
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        /** busca si ya existe */
        const dataUP = await model.findOne({ attributes: ['up_id'], where: { up_code: result } })

        /** verifica si existe */
        if (dataUP) await codeRed()
        else return result
    } catch (error) {
        return { success: 0, message: 'Ha ocurrido un problema' }
    }
}

const transporter = () => nodemailer.createTransport({
    host: 'mail.winby.co',
    port: 587,
    secure: false,
    auth: {
        user: 'no-reply@winby.co',
        pass: 'UzmtvXF466Ff'
    },
    tls: {
        rejectUnauthorized: false
    }
})

const enCode = value => {
    const v = ((((value * 998161) * 793927) * 562841) * 288413) / 472793
    return Base64.encode(`${v}`)
}

const deCode = value => {
    const v = Base64.decode(value)
    return Math.round(((((v * 472793) / 288413) / 562841) / 793927) / 998161)
}

const linkBelongsTo = (modelOne, modelTwo, target, foreign, as) => {
    return modelOne.belongsTo(modelTwo, {
        targetKey: target,
        foreignKey: foreign,
        ...(as ? { as } : {})
    })
}

const linkHasMany = (modelOne, modelTwo, target, foreign) => {
    return modelOne.hasMany(modelTwo, {
        sourceKey: target,
        foreignKey: foreign
    })
}

const consecutive = value => {
    let consecutive = parseInt(value) + 1
    consecutive = `${consecutive}`
    if (consecutive.length === 4) consecutive = `00${consecutive}`
    else if (consecutive.length === 5) consecutive = `0${consecutive}`
    return consecutive
}

const UpCrNotFind = async (model, newItem, where, condition, updateFind = false) => {
    /** confirma si hay id para actualizar o registrar */
    if (condition) {
        const data = await model.update(newItem, { where: where || { [condition.id]: deCode(condition.value) } })
        if (!!data[0] && !!updateFind) return await model.findOne({ where: where || { [condition.id]: deCode(condition.value) } })
        else return where || { [condition.id]: condition.value }
    } else return await model.create(newItem)
}

const UpCrFind = async (model, newItem, where, condition) => {
    const res = await model.findOne({ where: where || { [condition.id]: deCode(condition.value) } })
    /** confirma si hay id para actualizar o registrar */
    if (res) {
        model.update(newItem, { where: where || { [condition.id]: deCode(condition.value) } })
        return res
    } else return await model.create(newItem)
}

/** Validaciones para los parametros de las peticiones */

/**
 * Verifica que contenga un valor
 * @version 0.0.1
 * @param {*} value valor
 * @return {boolean} true o false
 */
const isNull = value => {
    if (!!value || value === 0) return false
    return true
}

/**
 * Verifica que sea numeros
 * @version 0.0.1
 * @param {*} value valor
 * @return {boolean} true o false
 */
const isNumeric = value => {
    if (!isNaN(value)) return false
    return true
}

/**
 * Verifica que sea letras
 * @version 0.0.1
 * @param {*} value valor
 * @return {boolean} true o false
 */
const onlyLetters = value => {
    const validation = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
    if (validation.test(value) || value.length === 0) return false
    return true
}

/**
 * Verifica que sea un correo electrónico
 * @version 0.0.1
 * @param {*} value valor
 * @return {boolean} true o false
 */
const isEmail = value => {
    const validation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (validation.test(value) || value.length === 0) return false
    return true
}

/**
 * Verifica que se encuentre en la cantidad del rango de caracteres
 * @version 0.0.1
 * @param {*} data valor
 * @param {*} min minimo
 * @param {*} max maximo
 * @return {boolean} true o false
 */
const rangeLength = (data, min, max) => {
    const value = `${data}`
    if (((value.length >= min) && (value.length <= max)) || value.length === 0) return false
    return true
}

/**
 * valida los inputs
 * @version 0.0.1
 * @param {*} data valor
 * @param {boolean} typeNull null
 * @param {boolean} typeRange rango
 * @param {number} minRange minimo de rango
 * @param {number} maxRange maximo de rango
 * @param {boolean} typeLetters letras
 * @param {boolean} typeNumeric numerico
 * @param {boolean} typeEmail correo electronico
 * @param {boolean} typeFormat formato numerico
 * @return {boolean} true o false
 */
const validations = (data, typeNull, typeRange, minRange, maxRange, typeLetters, typeNumeric, typeEmail, typeFormat) => {
    const value = typeFormat ? data.replace(/\./g, '') : data
    /** verifica que campos seran y si se encuentra la condicion o no */
    if (typeNull) {
        if (isNull(value)) throw new Error('Campo requerido.')
    }
    if (typeNumeric) {
        if (isNumeric(value)) throw new Error('Solo puede contener números.')
    }
    if (typeLetters) {
        if (onlyLetters(value)) throw new Error('Solo puede contener letras.')
    }
    if (typeEmail) {
        if (isEmail(value)) throw new Error('No es un formato de email valido.')
    }
    if (typeRange) {
        if (rangeLength(value, minRange, maxRange)) throw new Error(`El rango de caracteres es de ${minRange} a ${maxRange}.`)
    }
    return false
}

/**
 * valida los minimo y maximo
 * @version 0.0.1
 * @param {*} data valor
 * @param {numeric} minValue null
 * @param {numeric} maxValue rango
 * @param {boolean} typeFormat formato numerico
 * @return {boolean} true o false
 */
const validationMM = (data, minValue, maxValue, typeFormat) => {
    const value = typeFormat ? data.replace(/\./g, '') : data
    /** verifica que campos seran y si se encuentra la condicion o no */
    if (!isNaN(value)) {
        if (value < minValue) {
            if (isNull(value)) throw new Error('El valor es muy mínimo.')
        }
        if (value > maxValue) {
            if (isNumeric(value)) throw new Error('El valor excede el maximo.')
        }
    }
    return false
}

/**
 * valida los minimo y maximo
 * @version 0.0.1
 * @param {string} value base64
 * @param {boolean} typeNull null
 * @return {boolean} true o false
 */
const validationID = (value, typeNull = true) => {
    try {
        if (typeNull && isNull(value) && isNaN(Base64.decode(value))) throw new Error('No es una codificación valida.')
        else if (!typeNull && isNaN(value ? Base64.decode(value) : 0)) throw new Error('No es una codificación valida')
        return value ? deCode(value) : null
    } catch (error) {
        throw new Error('No es una codificación valida.')
    }
}

const validateParams = (object) => {
    let error = true

    object.map((item) => {
        /** Get name param **/
        const keyParam = Object.keys(item)[0]
        const value = item[keyParam].value

        /** Requreido */
        if (item[keyParam].required) {
            if (!value) {
                error = 'ERROR: Los campos han sido alterados.'
                return
            }
        }
        /** Numerico */
        if (item[keyParam].number) {
            if (isNumeric(value)) {
                error = 'ERROR: Los campos han sido alterados.'
                return
            }
        }
        /** solo letras */
        if (item[keyParam].letters) {
            if (onlyLetters(value)) {
                error = 'ERROR: Los campos han sido alterados.'
                return
            }
        }
        /** Tipo email */
        if (item[keyParam].email) {
            if (isEmail(value)) {
                error = 'ERROR: Los campos han sido alterados.'
                return
            }
        }
        /** rango */
        if (item[keyParam].range) {
            if (rangeLength(value, item[keyParam].range[0], item[keyParam].range[1])) {
                error = 'ERROR: Los campos han sido alterados.'
                return
            }
        }
    })
    return error
}

const structureParams = (key, value = '', required = false, number = false, letters = false, email = false, range = false, rangeMin = 0, rangeMax = 1) => {
    return {
        [key]: {
            value,
            required,
            number,
            letters,
            email,
            range: range ? [rangeMin, rangeMax] : false
        }
    }
}


module.exports = {
    enCode,
    deCode,
    consecutive,
    codeRed,
    UpCrNotFind,
    UpCrFind,
    linkBelongsTo,
    linkHasMany,
    structureParams,
    validateParams,
    transporter,
    validations,
    validationMM,
    validationID,
    generateSku,
    makeUniqueSkuPrefix,
    parseJson
}