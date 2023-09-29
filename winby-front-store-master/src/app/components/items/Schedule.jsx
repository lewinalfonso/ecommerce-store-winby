import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled, { css } from 'styled-components'
import { PLColor } from '../../../assets/colors'

const hours = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00']
const daysWeek = [{ type: 1, name: 'LUNES' }, { type: 2, name: 'MARTES' }, { type: 3, name: 'MIERCOLES' }, { type: 4, name: 'JUEVES' }, { type: 5, name: 'VIERNES' }, { type: 6, name: 'SABADO' }, { type: 7, name: 'DOMINGO' }]

const Schedule = ({ onChange, onClick, selectedValues, defaultValue, dayTypeName, hoursArrayName, hoursValues, hoursIdName = 'sch_id', idName = 'sc_id' }) => {
    /** Estados de la aplicación */
    const [daysSelected, setDaysSelected] = useState([])
    const [activeSelection, setActiveSelection] = useState(false)
    const [daysSelectedBDB, setDaysSelectedBDB] = useState([])
    const [scheduleSelected, setScheduleSelected] = useState([])

    useEffect(() => {
        setDaysSelected(defaultValue || [])
        setDaysSelectedBDB(defaultValue || [])
    }, [defaultValue])

    useEffect(() => {
        setScheduleSelected(selectedValues || [])
    }, [selectedValues])

    const handleChange = (e, day, hour) => {
        if (e.target.previousSibling?.disabled) return false
        // console.log()

        const { type } = day
        let data = [], newHours = []

        const findDays = scheduleSelected.find(x => x[dayTypeName] === day.type)
        const findID = daysSelected.find(x => x[dayTypeName] === day.type)
        const findHours = findID[hoursArrayName]?.find(x => x[hoursValues] !== hour)

        if (findDays) {
            // // Verifica si ya la hora está marcada para sobreescribir
            const hoursSelected = findDays[hoursArrayName]

            if (hoursSelected.find(x => x[hoursValues] === hour)) {
                newHours = hoursSelected.filter(x => x[hoursValues] !== hour)

            } else newHours = [...hoursSelected, { [hoursIdName]: findHours[hoursIdName], [hoursValues]: hour }]

            // Verifica si ya el dia está marcado para sobreescribir
            data = scheduleSelected?.reduce((acc, item) => item[dayTypeName] === type ? [...acc,
                { ...item, [dayTypeName]: type, [hoursArrayName]: newHours, sc_date: moment().format('YYYY-MM-DD') }] : [...acc, item]
            , [])

        } else data = [...scheduleSelected, { sc_date: moment().format('YYYY-MM-DD'), [idName]: findID[idName], [dayTypeName]: type, [hoursArrayName]: [{ [hoursIdName]: findHours[hoursIdName], [hoursValues]: hour }] }]

        setScheduleSelected(data)

        !!onChange && onChange(e, day, hour, newHours)

    }

    const handleClick = e => {
        e.preventDefault()
        !!onClick && onClick(e, scheduleSelected)
    }

    const handleMouseDown = (e, day, hour, daysS) => {
        setActiveSelection(true)
        handleChange(e, day, hour, daysS)
    }

    return (
        <Container>
            <Row responsive justify='space-between'>
                <Title>Agenda de servicio</Title>
                <div>
                    <Button type='button' onClick={() => setScheduleSelected([])}>Limpiar</Button>
                    <Button type='button' onClick={handleClick}>Continuar a la compra</Button>
                </div>
            </Row>
            <Row>
                <GridSchedulle>
                    <GridRow>HORA</GridRow>
                    {hours.map(x => <GridRow key={x}>{x}</GridRow>)}
                </GridSchedulle>
                {daysWeek.map(day => <GridSchedulle key={day.type}>
                    <GridRow>{day.name}</GridRow>
                    {hours.map(hour => <GridRow key={hour} onMouseDown={e => handleMouseDown(e, day, hour, !daysSelected.find(x => x[dayTypeName] === day.type && !!x[hoursArrayName]?.find(item => item[hoursValues] === hour)))}
                        onMouseUp={() => setActiveSelection(false)}
                        onMouseOver={e => activeSelection ? handleChange(e, day, hour, !daysSelected.find(x => x[dayTypeName] === day.type && !!x[hoursArrayName]?.find(item => item[hoursValues] === hour))) : e.preventDefault()}
                    >
                        <Check
                            type='checkbox'
                            disabled={!daysSelectedBDB.find(x => x[dayTypeName] === day.type && !!x[hoursArrayName]?.find(item => item[hoursValues] === hour && item[hoursValues]))}
                            checked={!!scheduleSelected.find(x => x[dayTypeName] === day.type && !!x[hoursArrayName]?.find(item => item[hoursValues] === hour))}
                            // onChange={e => handleChange(e, day, hour, !daysSelected.find(x => x[dayTypeName] === day.type && !!x[hoursArrayName]?.find(item => item[hoursValues] === hour)))}
                            id={`${hour}${day.name}`}
                        />
                        <Label htmlFor={`${hour}${day.name}`} />
                    </GridRow>)}
                </GridSchedulle>)}
            </Row>
        </Container>
    )
}

Schedule.propTypes = {
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    defaultValue: PropTypes.array,
    dayTypeName: PropTypes.string,
    hoursArrayName: PropTypes.string,
    hoursValues: PropTypes.string
}

// Vista de agenda
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
`
const Row = styled.div`
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: ${({ direction }) => direction ? direction : 'row'};
    align-items: ${({ align }) => align ? align : 'flex-start'};
    padding: ${({ padding }) => padding ? padding : '0px'};
    ${({ justify }) => justify && css`justify-content: ${justify};`}
    ${({ responsive }) => responsive && css`
    @media(max-width: 400px){
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }   
    
    `}
    }
`
const GridSchedulle = styled.div`
    background-color: ${PLColor}15;
    border: 1px solid ${PLColor}55;
    border-left: none;
    &:first-child { border-left: 1px solid ${PLColor}55; }
`
const GridRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;    
    width: 80px;
    height: 20px;
    font-size: 10px;
    border-bottom: 1px solid ${PLColor}55;
    &:last-child { border-bottom: none; }
    user-select: none;
`
const Check = styled.input`
    display: none;
    &:disabled ~ label{
        background-color: #9e9e9e66;
        cursor: not-allowed;
    }
    &:checked ~ label { background-color: #d6ebfc; }
`
const Label = styled.label`
    height: 100%;
    width: 100%;
    display: flex;
    cursor: cell;
    background-color: #ffeb3b36;
    &:hover {background-color: #d6ebfc;}
`
const Title = styled.h3`
    margin: 0;
    padding-left: 5px;
`
const Button = styled.button`
    border: none;
    outline: none;
    background-image: linear-gradient(45deg,#6B150E 30%,#EB0000);
    cursor: pointer;
    padding: 5px 15px;
    color: #ffffff;
    margin: 0 10px 10px 10px;
`

export default Schedule