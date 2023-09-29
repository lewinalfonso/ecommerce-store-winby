import React, { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export const Context = createContext()

const Provider = ({ children, active }) => {

    const [isModal, setIsModal] = useState(!active)
    const location = useLocation()

    // useEffect(() => {
    //     setIsModal(!isModal)
    // }, [active])

    useEffect(() => {
        const body = document.body
        body.addEventListener('keyup', e => e.code === 'Escape' && setIsModal(true))

        return () => body.removeEventListener('keyup', () => setIsModal)
    }, [])

    /* Quitar scrooll */
    useEffect(() => {
        if (!isModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isModal])

    const values = {
        isModal,
        setIsModal: () => setIsModal(!isModal)
    }
    useEffect(() => {
        !!isModal && setIsModal(true)
    }, [location.pathname, isModal, setIsModal])
    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export default {
    Provider,
    Consumer: Context.Consumer
}