/**
 * @description Función para resolver la petición de "todos"
 * @version 0.0.1
 * @param {object} res Respuesta de la petición
 * @param {object} state Estado de Redux que hay almacenado de las peticiones anteriores
 * @return {object} devuelve el estado nuevo y actualizado que deberá almacenarse en el store de redux bajo el nombre del reducer correspondiente
*/
export const getAll = (res, state) => {
    return state?.data ? { ...state, ...res } : res
}
/**
 * @description Función que hace la comparación y ejecución de la busqueda detalla (get One) utiliza el reductor para distribuir el array en el reducer de manera correcta
 * @version 1.0.1
 * @param {object} res Respuesta de la petición
 * @param {object} state Estado de Redux que hay almacenado de las peticiones anteriores
 * @param {string} name nombre del identificador que tomará la función para manejar el estado y la operación
 * @return {object} devuelve el estado nuevo y actualizado que deberá almacenarse en el store de redux bajo el nombre del reducer correspondiente
*/
export const getOne = (res, state, name) => {
    let data = []
    if (res.success && state.data) data = state.data.reduce((acc, act) => res.data[name] === act[name] ? [...acc, res.data] : [...acc, act], [])

    return { ...state, data: (data.length ? data : state.data) || (res.success ? [res.data] : []), one: res.data, successOne: res.success }
}
/**
 * @description Función que hace la comparación y ejecución del 'update' utiliza el reductor para distribuir el array en el reducer de manera correcta
 * @version 0.1.1
 * @param {object} res Respuesta de la petición
 * @param {object} state Estado de Redux que hay almacenado de las peticiones anteriores
 * @param {string} name nombre del identificador que tomará la función para manejar el estado y la operación
 * @param {object} newData nuevo objeto que debe ser actualizado
 * @return {object} devuelve el estado nuevo y actualizado que deberá almacenarse en el store de redux bajo el nombre del reducer correspondiente
*/
export const updateReducer = (res, state, name, newData) => {
    let data = []
    if (!state?.data) return res
    if (res.success && state?.data) data = state.data.reduce((acc, act) => newData[name] === act[name] ? [...acc, newData] : [...acc, act], [])

    return { ...state, data: (data.length ? data : state.data) || (res.success ? [newData] : []), successPost: res.success, messagePost: res.message }
}
/**
 * @description Función que hace la comparación y ejecución del 'registro'
 * @version 0.0.2
 * @param {object} res Respuesta de la petición
 * @param {object} state Estado de Redux que hay almacenado de las peticiones anteriores
 * @param {object} newData nuevo objeto que debe ser actualizado
 * @return {object} devuelve el estado nuevo y actualizado que deberá almacenarse en el store de redux bajo el nombre del reducer correspondiente
*/
export const registerReducer = (res, state, newData) => {
    let data = []
    if (!res.success) return { ...state, successPost: res.success, messagePost: res.message }
    else if (!state?.data) return { successPost: res.success, messagePost: res.message, data: [newData] }

    data = [...state.data, newData]
    return { ...state, data, successPost: res.success, messagePost: res.message }
}
/**
 * @description Función que elimina un elemento del reducer
 * @version 1.0.1
 * @param {object} res Respuesta de la petición
 * @param {object} state Estado de Redux que hay almacenado de las peticiones anteriores
 * @param {string} name nombre del identificador que tomará la función para manejar el estado y la operación
 * @param {object} id identificador del reducer
 * @return {object} devuelve el estado nuevo y actualizado que deberá almacenarse en el store de redux bajo el nombre del reducer correspondiente
*/
export const deleteReducer = (res, state, name, id) => {
    let data = []
    if (state.success){
        data = state.data.filter(x => x[name] !== id)
    }
    return { ...state, data, messagePost: res.message, successPost: res.success }
}