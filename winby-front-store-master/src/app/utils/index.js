
import { EColor, PColor, PLColor, SFColor, SFVColor } from '../../assets/colors'
import moment from 'moment'

export const validationsTF = (input, label, tooltip, icon, text, res) => {
    if (res) {
        input.style.backgroundColor = '#FBCACA'
        input.style.borderColor = PColor
        input.style.color = PColor
        label.style.color = PColor
        tooltip.style.opacity = 1
        tooltip.innerHTML = text
        icon.style.opacity = 1
    } else {
        input.style.backgroundColor = 'transparent'
        input.style.borderColor = SFVColor
        input.style.color = SFColor
        label.style.color = SFColor
        tooltip.style.opacity = 0
        tooltip.innerHTML = ''
        icon.style.opacity = 0
    }
    return res
}

export const parseJson = (jsonString, defaultReturn) => {
    try {
        const parse = JSON.parse(jsonString)
        return parse
    } catch {
        return defaultReturn
    }
}

export const isNull = dato => {
    if (!dato || dato === '') {
        return true
    } else return false
}

export const isNumeric = dato => {
    // const value = dato.replace(/,/g, '');
    if (isNaN(dato) && dato !== '' && dato !== undefined && dato !== null) {
        return true
    } else return false
}

export const onlyLetters = dato => {
    const validar = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
    if (validar.test(dato) === false && dato !== '' && dato !== undefined && dato !== null) {
        return true
    } else return false
}

export const rangeLength = (dato, min, max) => {
    if (dato !== undefined && dato !== '' && dato !== null) {
        if ((dato.length < min) || (dato.length > max)) {
            return true
        } else return false
    } else { return false }
}

export const Match = (dato1, dato2) => {
    if (dato1 !== dato2) {
        return true
    } else return false
}

export const isEmail = email => {
    const validar = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (validar.test(email) === false && email !== '' && email !== undefined && email !== null) {
        return true
    } else return false
}

export const numberFormat = value => {
    if (value) {
        if (parseInt(value)) return new Intl.NumberFormat('de-DE').format(parseFloat(value))
        else return 0
    } else {
        if (isNaN(value)) return ''
        else return 0
    }
}

// export const numberFormat = value => value ? (parseInt(value) ? new Intl.NumberFormat('de-DE').format(parseFloat(`${ value }`.replace(/\./g, ''))) : '') : (value === 0 ? 0 : '')

export const dateFormat = value => moment(value).format('DD-MM-YYYY')

export const validationImg = file => (/\.(jpg|png|gif|jpeg)$/i).test(file.name)

/** valida el formulario */
export const validationFormTwo = (inputs, error) => {
    let errorForm = false
    /** verifica los campos del formulario */
    for (let i = 0; i < inputs.length; i++) {
        const { value, type, nextSibling, parentNode, dataset, name } = inputs[i]
        /** verifica los input y select si se encuentra vacio o si no, si hay un error del onchange */
        if ((!value || value === 'false' || (type === 'tel' && value.length <= 8)) && type !== 'submit' && type !== 'file' && type !== 'button' && name !== 'g-recaptcha-response') {
            /** verifica si es un input, select obligatorio */
            if (type === 'tel') {
                inputs[i].style.backgroundColor = '#FBCACA'
                inputs[i].style.borderColor = PColor
                nextSibling.style.backgroundColor = '#FBCACA'
                nextSibling.style.borderColor = PColor
                parentNode.parentNode.firstChild.nextSibling.style.color = PColor
                parentNode.parentNode.firstChild.nextSibling.nextSibling.style.opacity = 1
                parentNode.parentNode.firstChild.nextSibling.nextSibling.innerHTML = 'Campo Requerido.'
                parentNode.parentNode.lastChild.style.opacity = 1
            } else if (dataset.ignore === 'false') { errorForm = validationsTF(inputs[i], nextSibling, nextSibling.nextSibling, parentNode.lastChild, 'Campo Requerido.', true) } else if (dataset.ignore === undefined) { errorForm = validationsTF(parentNode, parentNode.firstChild.nextSibling, parentNode.firstChild.nextSibling.nextSibling, parentNode.lastChild, 'Campo Requerido.', true) }
        } else
        if (error[inputs[i].name]) { errorForm = true }
    }
    return errorForm
}

/** valida los inputs */
export const validations = (e, typeNull, typeLetters, typeNumeric, typeRange, minRange, maxRange, typeEmail, typeFormat) => {
    let { value, nextSibling } = e.target

    /** verifica si es formato de numero */
    if (typeFormat) { value = value.replace(/,/g, '') }
    /** verifica que campos seran y si se encuentra la condicion o no */
    if (typeNull) {
        if (isNull(value)) {
            e.target.style.border = `1px solid ${ EColor }`
            nextSibling.innerHTML = 'Campo requerido.'
            return true
        }
    }
    if (typeNumeric) {
        if (isNumeric(value)) {
            e.target.style.border = `1px solid ${ EColor }`
            nextSibling.innerHTML = 'Solo puede contener números.'
            return true
        }
    }
    if (typeRange) {
        if (rangeLength(value, minRange, maxRange)) {
            e.target.style.border = `1px solid ${ EColor }`
            nextSibling.innerHTML = `El rango de caracteres es de ${ minRange } a ${ maxRange }.`
            return true
        }
    }
    if (typeLetters) {
        if (onlyLetters(value)) {
            e.target.style.border = `1px solid ${ EColor }`
            nextSibling.innerHTML = 'Solo puede contener letras.'
            return true
        }
    }
    if (typeEmail) {
        if (isEmail(value)) {
            e.target.style.border = `1px solid ${ EColor }`
            nextSibling.innerHTML = 'No es un formato de email valido.'
            return true
        }
    }
    e.target.style.border = `1px solid ${ PLColor }`
    nextSibling.innerHTML = ''
    return false
}

/** verifica los select */
export const validationsSelectTwo = v => {
    const s = document.getElementById(v)
    if (s) { return validationsTF(s.parentNode, s.parentNode.firstChild.nextSibling, s.parentNode.firstChild.nextSibling.nextSibling, s.nextSibling, false, false) }
}

/** valida los inputs */
export const validationsTwo = (e, typeNull, typeLetters, typeNumeric, typeRange, minRange, maxRange, typeEmail, typeFormat) => {
    let { value, nextSibling, parentNode } = e.target
    /** verifica si es formato de numero */
    if (typeFormat) { value = value.replace(/\./g, '') }
    /** verifica que campos seran y si se encuentra la condicion o no */
    if (typeNull) {
        if (isNull(value)) { return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, 'Campo Requerido', true) }
    }
    if (typeNumeric) {
        if (isNumeric(value)) { return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, 'Solo puede contener números', true) }
    }
    if (typeRange) {
        if (rangeLength(value, minRange, maxRange)) { return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, `El rango de caracteres es de ${ minRange } a ${ maxRange }.`, true) }
    }
    if (typeLetters) {
        if (onlyLetters(value)) { return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, 'Solo puede contener letras', true) }
    }
    if (typeEmail) {
        if (isEmail(value.trim())) { return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, 'No es un formato de email valido', true) }
    }
    return validationsTF(e.target, nextSibling, nextSibling.nextSibling, parentNode.lastChild, false, false)
}

/** valida el formulario */
export const validationForm = (inputs, error) => {
    let errorForm = false
    /** verifica los campos del formulario */
    for (let i = 0; i < inputs.length; i++) {
    /** verifica los input y select si se encuentra vacio o si no, si hay un error del onchange */
        if ((!!inputs[i].value === false || inputs[i].value === 'false') && inputs[i].type !== 'submit' && inputs[i].type !== 'button') {
            /** verifica si es un input, select obligatorio */
            if (inputs[i].dataset.ignore === 'false') {
                inputs[i].style.border = `1px solid ${ EColor }`
                inputs[i].nextSibling.innerHTML = 'Campo requerido.'
                errorForm = !errorForm ? true : true
            } else if (inputs[i].dataset.ignore === undefined) {
                if (inputs[i].type === 'tel') {
                    inputs[i].style.border = `1px solid ${ EColor }`
                    inputs[i].nextSibling.style.border = `1px solid ${ EColor }`
                    inputs[i].parentNode.nextSibling.innerHTML = 'Campo requerido.'
                } else {
                    inputs[i].parentNode.style.border = `1px solid ${ EColor }`
                    inputs[i].parentNode.nextSibling.innerHTML = 'Campo requerido.'
                }
                errorForm = !errorForm ? true : true
            }
        } else
        if (error[inputs[i].name]) { errorForm = !errorForm ? true : true }
    }
    return errorForm
}

/** valida el input del telefono */
export const validationPhone = (v, e, typeNull, typeNumeric) => {
    if (e !== true) {
        const { nextSibling, parentNode } = e.target
        /** verifica que campos seran y si se encuentra la condicion o no */
        if (typeNull) {
            if (isNull(v)) {
                e.target.style.border = `1px solid ${ EColor }`
                nextSibling.style.border = `1px solid ${ EColor }`
                parentNode.nextSibling.innerHTML = 'Campo requerido.'
                return true
            }
        }
        if (typeNumeric) {
            if (isNull(v)) {
                e.target.style.border = `1px solid ${ EColor }`
                nextSibling.style.border = `1px solid ${ EColor }`
                parentNode.nextSibling.innerHTML = 'Solo puede contener letras.'
                return true
            }
        }
        if (rangeLength(v, 5, 15)) {
            e.target.style.border = `1px solid ${ EColor }`
            nextSibling.style.border = `1px solid ${ EColor }`
            parentNode.nextSibling.innerHTML = 'El rango de caracteres es de 5 a 15.'
            return true
        }

        e.target.style.border = `1px solid ${ PLColor }`
        nextSibling.style.border = `1px solid ${ PLColor }`
        parentNode.nextSibling.innerHTML = ''
        return false
    }
    return false
}

const validationTFP = (input, button, label, tooltip, icon, text, res) => {
    if (res) {
        input.style.backgroundColor = '#FBCACA'
        input.style.borderColor = PColor
        button.style.backgroundColor = '#FBCACA'
        button.style.borderColor = PColor
        input.style.color = PColor
        label.style.color = PColor
        tooltip.style.opacity = 1
        tooltip.innerHTML = text
        icon.style.opacity = 1
    } else {
        input.style.backgroundColor = 'transparent'
        input.style.borderColor = SFVColor
        button.style.backgroundColor = PLColor
        button.style.borderColor = SFVColor
        input.style.color = SFColor
        label.style.color = SFColor
        tooltip.style.opacity = 0
        tooltip.innerHTML = ''
        icon.style.opacity = 0
    }
    return res
}

/** valida el input del telefono */
export const validationPhoneTwo = (v, e, typeNull, typeNumeric) => {
    if (e !== true) {
        const { nextSibling, parentNode } = e.target
        if (typeNull) {
            if (isNull(v)) { return validationTFP(e.target, nextSibling, parentNode.parentNode.firstChild.nextSibling, parentNode.parentNode.firstChild.nextSibling.nextSibling, parentNode.parentNode.lastChild, 'Campo Requerido.', true) }
        }
        if (typeNumeric) {
            if (isNull(v)) { return validationTFP(e.target, nextSibling, parentNode.parentNode.firstChild.nextSibling, parentNode.parentNode.firstChild.nextSibling.nextSibling, parentNode.parentNode.lastChild, 'Solo puede contener números.', true) }
        }
        if (rangeLength(v, 8, 20)) { return validationTFP(e.target, nextSibling, parentNode.parentNode.firstChild.nextSibling, parentNode.parentNode.firstChild.nextSibling.nextSibling, parentNode.parentNode.lastChild, 'El rango de caracteres es de 8 a 20.', true) }
        return validationTFP(e.target, nextSibling, parentNode.parentNode.firstChild.nextSibling, parentNode.parentNode.firstChild.nextSibling.nextSibling, parentNode.parentNode.lastChild, false, false)
    }
    return false
}

/** verifica los select */
export const validationsSelect = v => {
    /** le quita las clases a los select por ser seleccionado */
    const select = document.getElementsByName(v.target.name)
    select[0].parentElement.parentNode.classList.remove('border-error')
    select[0].parentElement.parentNode.nextSibling.classList.remove('tooltiptext')
    select[0].parentElement.parentNode.nextSibling.innerHTML = ''
    return false
}

export const CalcularDigitoVerificacion = myNit => {
    let vpri; let x = 0; let y = 0; let i = 0

    // Se limpia el Nit
    myNit = myNit.replace(/\s/g, '') // Espacios
    myNit = myNit.replace(/,/g, '') // Comas
    myNit = myNit.replace(/\./g, '') // Puntos
    myNit = myNit.replace(/-/g, '') // Guiones

    // Se valida el nit
    if (isNaN(myNit)) {
        return ''
    }

    // Procedimiento
    vpri = new Array(16)
    const z = myNit.length

    vpri[1] = 3
    vpri[2] = 7
    vpri[3] = 13
    vpri[4] = 17
    vpri[5] = 19
    vpri[6] = 23
    vpri[7] = 29
    vpri[8] = 37
    vpri[9] = 41
    vpri[10] = 43
    vpri[11] = 47
    vpri[12] = 53
    vpri[13] = 59
    vpri[14] = 67
    vpri[15] = 71

    for (i; i < z; i++) {
        y = myNit.substr(i, 1)

        x += (y * vpri[z - i])
    }

    y = x % 11

    return (y > 1) ? 11 - y : y
}

export const extFile = filename => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined
}

/**
 * Organiza dos array
 * @version 0.0.1
 * @param {array} arrayP primer array
 * @param {array} arrayS segundo array
 * @param {array} priorityP nombre de la prioridad primaria
 * @param {array} priorityS nombre de la prioridad segundaria
 * @return {array} Todos los valores combinados en orden
 */
export const organizeArray = (arrayP, arrayS, priorityP, priorityS) => {
    // retorna el nuevo orden de los productos y servicios
    return [...arrayP, ...arrayS].sort((a, b) => {
        // variables necesarias
        const valueA = a[priorityP] || a[priorityS]
        const valueB = b[priorityP] || b[priorityS]

        // comparacion
        if ((valueA) > valueB) return 1
        if (valueA < valueB) return -1
        return 0
    })
}

/**
 * busca en el localstore la información y la parsea si es necesario
 * @version 0.0.1
 * @param {*} key clave de busqueda
 * @param {boolean} isParse si se quiere parsear o no
 * @return {boolean} devuelve el valor parseado o false si pudo guardar en localStorage
 */
export const getDataLS = (key, isParse) => {
    try {
        const jsonValue = window.localStorage.getItem(key)
        return isParse ? (jsonValue ? JSON.parse(jsonValue) : false) : jsonValue
    } catch (e) {
        return false
    }
}

export { Cookies } from './Cookies'