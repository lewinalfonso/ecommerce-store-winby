import React, { Component } from 'react'
import { IconSearch } from '../../assets/icons'
import Scrollbars from 'react-custom-scrollbars'
import styled, { css } from 'styled-components'
import { PColor, PLColor, SFColor, BGColor } from '../../assets/colors'

class TableSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            api: [],
            rangeStart: 0,
            rangeEnd: 10,
            values: [],
            pagination: [],
            position: 1,
            count: 0,
            range: 10,
            length: 0,
            lengthApi: 0,
            update: true,
            dragStart: false
        }

    }

    componentDidMount() {
        const { rangeStart, rangeEnd } = this.state
        const api = this.props.api

        if (api.length > 0 && api.length >= this.state.rangeEnd)
        {this.setState({ api, lengthApi: api.length, update: false }, () => this.resultApi(rangeStart, rangeEnd))}
        else if (api.length > 0 && api.length < this.state.rangeEnd)
        {this.setState({ api, rangeEnd: api.length, range: api.length, lengthApi: api.length, update: false }, () => this.resultApi(rangeStart, api.length))}
        /** eventos de tabla */
        // this.eventTable()
    }

    eventTable() {
        /** variables necesarias */
        const container = document.getElementById('container'),
            table = document.getElementById('table_resize'),
            bodyTable = document.getElementById('bodyTable'),
            table_th = table.getElementsByTagName('th'),
            bodyRect = document.body.getBoundingClientRect(),
            th_length = table_th.length;
        /** crea los contenedores de movimientos */
        for (let i = 1; i <= th_length; i++) {
            let sumWidth = 0
            if (table_th[i]) {
                for (let ii = 0; ii <= i - 1; ii++) {
                    const value = table_th[ii].offsetWidth;
                    if (value > 50)
                    {sumWidth += value}
                    else
                    {sumWidth += 50}
                }
            }
            const yDiv = document.createElement('div')
            // const leftPos = (i * th_width) + 0.5;

            yDiv.className = 'y_resize tb_resize'
            yDiv.setAttribute('data-resizecol', i)
            // yDiv.style.cssText = 'left: ' + leftPos + 'px;'
            yDiv.style.cssText = `left: ${ sumWidth }px;`
            container.append(yDiv)
        }

        /** funcion de creacion de eventos */
        const tb_resize = container.getElementsByClassName('tb_resize')
        for (let i = 0; i < th_length; i++) {
            tb_resize[i].addEventListener('mouseup', mouseUp);
            tb_resize[i].addEventListener('mousedown', mouseDown);
            bodyTable.addEventListener('mousemove', mouseMove);
            // table_th[i].style.width = th_width + 'px';
            table_th[i].style.width = `${ table_th[i].offsetWidth > 50 ? table_th[i].offsetWidth : 50 }px`;
        }

        let resize, resizeCheck, col_element, next_element, width, table_wt, cursorStart, resize_left, dragStart, next_width
        /** Inicio de funciones de eventos */
        /** Funcion de evento capturando el clic presionado */
        function mouseDown(event) {
            /** variables necesarias */
            resize = this
            resizeCheck = this.classList.contains('y_resize')
            const col_index = parseInt(this.getAttribute('data-resizecol')) - 1
            col_element = table_th[col_index]
            next_element = table_th[col_index + 1]
            const elm_bound = col_element.getBoundingClientRect()
            width = elm_bound.width
            table_wt = table.offsetWidth
            cursorStart = (resizeCheck) ? event.pageX : event.pageY
            resize_left = parseFloat(resize.style.left) - bodyRect.left
            dragStart = true
            next_width = 0

            /** verifica si es el siguiguiente elemento */
            if (next_element) {
                next_width = next_element.getBoundingClientRect().width;
            }
        }

        /** Funcion de evento capturando el movimiento del clic */
        function mouseMove(event) {
            if (dragStart && !!event.buttons) {
                /** variables necesarias */
                const cursorPosition = (resizeCheck) ? event.pageX : event.pageY,
                    mouseMoved = (cursorPosition - cursorStart),
                    newLeft = resize_left + mouseMoved,
                    newWidth = width + mouseMoved;
                let new_nextWidth;

                if (next_element) {
                    new_nextWidth = next_width - mouseMoved;
                }
                if (newWidth > 30 && (new_nextWidth > 30 || next_element === undefined)) {
                    col_element.style.cssText = `width: ${ newWidth }px;`

                    if (next_element)
                    {next_element.style.cssText = `width: ${ new_nextWidth }px`}
                    else
                    {table.style.width = `${ table_wt + mouseMoved }px`;}
                    resize.style.cssText = `left: ${ newLeft }px;`;
                }
            } else
            {mouseUp()}
        }
        /** Funcion de evento capturando el soltado del clic */
        function mouseUp() {
            if (dragStart)
            {dragStart = false}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.api !== this.props.api)
        {this.setState({ lengthApi: prevProps.api.length, rangeEnd: 10 }, () => this.updateApi(this.props.api))}
        else if (prevProps.api.length > this.state.lengthApi)
        {this.setState({ lengthApi: prevProps.api.length, rangeEnd: 10 }, () => this.updateApi(this.props.api))}
        else if (!this.props.api.length && !!this.state.api.length)
        {this.setState({ api: [], rangeEnd: 10, range: 0, lengthApi: 0, update: true }, () => this.resultApi(0, 0))}
        else if (!this.state.update && !this.props.api.length)
        {this.setState({ api: [], rangeEnd: 10, range: 0, lengthApi: 0, update: true }, () => this.resultApi(0, 0))}
    }

    updateApi = api => {
        const { rangeStart, rangeEnd, range } = this.state
        if (api.length > 0 && api.length > this.state.rangeEnd)
        {this.setState({ api, lengthApi: api.length, update: false }, () => this.resultApi(rangeStart, rangeEnd))}
        else if (api.length > 0 && api.length < this.state.rangeEnd)
        {this.setState({ api, rangeEnd: api.length, range: range > 10 ? range : 10, lengthApi: api.length, update: false }, () => this.resultApi(rangeStart, api.length))}
    }

    /** ----- resultApi ----- */
    resultApi = (rangeStart, rangeEnd, position = 1) => {
        const { range } = this.state,
            length = this.state.api.length
        let values = [],
            count = Math.ceil(length / range),
            cont = 0;

        for (let i = rangeStart; i < rangeEnd; i++) {
            values[cont] = this.state.api[i]
            cont++
        }

        this.setState({ values, count, position, length, rangeStart, rangeEnd, loading: true }, () => this.pagination())
    }

    /** ----- Paginación ----- */
    pagination = () => {
        const { count, position, range } = this.state,
            pagination = []
        for (let i = position > count - 4 ? count - 4 : position; i <= (position > count - 4 ? count : position + 4); i++) {
            if (i !== 0) {
                pagination[i] = <ButtonPagination key={i} type='button' active={(position === i)}
                    onClick={() => this.resultApi((i - 1) * range, (i * range > this.state.api.length) ? this.state.api.length : i * range, i)}
                >{i}</ButtonPagination>
            }
        }
        this.setState({ pagination })
    }

    /** Rango de la paginación */
    handleRange = e => {
        if (!isNaN(e.target.value)) {
            const value = e.target.value, { length } = this.state

            if (value >= 1 && value <= length)
            {this.setState({ range: value }, () => this.resultApi(0, value))}
            else if (value >= 1)
            {this.setState({ range: value }, () => this.resultApi(0, length))}
            else
            {this.setState({ range: '' }, () => this.resultApi(0, this.state.api.length > 10 ? 10 : this.state.api.length))}
        }
    }

    /** Seleccionar todo el texto escrito en el Rango */
    handleSelect = e => e.target.setSelectionRange(0, e.target.value.length)

    render() {
        const { rangeStart, rangeEnd, length, range, position, count, pagination, values } = this.state
        return (
            <Container marginBottom={this.props.marginBottom}>
                <Header search={this.props.search}>
                    <Flex>
                        {!!this.props.customHeader && this.props.customHeader}
                        {this.props.iconTitle}
                        {this.props.titleH && <H4>{this.props.titleH}</H4>}
                        {this.props.title && <H5>{this.props.title}</H5>}
                    </Flex>
                    {this.props.search &&
                        <Flex>
                            <Span bold={true}>Realizar una busqueda</Span>
                            <BoxRelative header>
                                <InputSearch type='text' data-ignore={true} placeholder='Buscar aquí...' />
                                <ButtonSearch type='button'><IconSearch size={15} color={BGColor} /></ButtonSearch>
                            </BoxRelative>
                        </Flex>
                    }
                </Header>
                <BoxRelative display='inline-block' width='100%' id='container'>
                    <Scrollbars autoHide autoHideDuration={400} autoHideTimeout={1500} autoHeight autoHeightMin={0} autoHeightMax='100%' style={{ backgroundColor: BGColor, margin: '20px 0 10px 0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', border: `1px solid ${ PLColor }` }}>
                        <Table border='0' cellPadding='0' cellSpacing='0' id='table_resize'>
                            <thead>
                                {this.props.tHead}
                            </thead>
                            <tbody>
                                {values.map((x, i) => this.props.tBody(x, i))}
                            </tbody>
                        </Table>
                        <Footer>
                            {/** Arrow Left */}
                            <Span bold={false}>Mostrando {rangeStart} al {rangeEnd} de {length} registros </Span>
                            <BoxRelative>
                                {(position > 1) &&
                                <ButtonPagination type='button'
                                    onClick={() => (position > 1) &&
                                        this.resultApi((position - 2) * range, ((position - 1) * range > length) ? length : (position - 1) * range, position - 1)
                                    }>&#60;</ButtonPagination>}
                                {pagination}
                                {/** Arrow Right */}
                                {(position !== count) &&
                                <ButtonPagination type='button'
                                    onClick={() => (position < count) &&
                                        this.resultApi(position * range, ((position + 1) * range > length) ? length : (position + 1) * range, position + 1)
                                    }>&#62;</ButtonPagination>}
                            </BoxRelative>
                            <BoxRelative>
                                <Span bold={false}>Rango</Span>
                                <InputRange type='text' name='range' value={range} onClick={this.handleSelect} onChange={this.handleRange} />
                            </BoxRelative>
                        </Footer>
                    </Scrollbars>
                </BoxRelative>
            </Container>
        )
    }
}

const Container = styled.div`
    padding: 20px;
    width: 100%;
    ${ ({ marginBottom }) => marginBottom && css`margin-bottom: ${ marginBottom };` }
`

const Header = styled.div`
    display: flex; 
    align-items: center;
    justify-content: space-between;
    border-bottom: ${ ({ search }) => search ? `3px solid ${ PColor }` : 'none' } ;
    padding-bottom: 5px;
`

const Flex = styled.div`
    display: flex; 
    align-items: center;
`

const H4 = styled.h4`
    color: ${ PColor };
    align-items: center;
    height: 50px;
    display: flex;
    margin: 0px 20px;
    padding: 0;
    font-family: Roboto-Bold;
`

const H5 = styled.h5`
    color: ${ PColor };
    padding-left: 20px;
    margin-bottom: 5px;
    font-family: Roboto-Bold;
`

const Span = styled.span`
    font-family: ${ ({ bold }) => bold ? 'Roboto-Bold' : 'Roboto-Regular' };
    color: ${ PColor };
    padding-right: 10px;
    font-size: 12px;
    ${ ({ bold }) => !bold && css`padding: 5px 10px;` }
    ${ ({ bold }) => !bold && css`margin: 0 2px;` }
`

const BoxRelative = styled.div`
    position: relative;
    ${ ({ width }) => width && css`width: ${ width };` }
    ${ ({ display }) => display && css`display: inline-block;` }
    ${ ({ header }) => header && css`display: flex; align-items: center;` }
`

const InputSearch = styled.input`
    border: 1px solid ${ PLColor };
    border-radius: 10px;
    height: 24px;
    width: 200px;
    padding: 3px 30px 3px 10px;
    color: ${ SFColor };
    font-size: 12px;
    outline: 0;
    background-color: #DDD;
`

const ButtonSearch = styled.button`
    outline: 0;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    background-color: ${ PColor };
    border-radius: 0pc 8px 8px 0px;
    padding: 4px 7px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Table = styled.table`
    border-collapse: collapse; 
    outline: none; 
    table-layout: fixed;
    width: 100%;
    border-spacing: 0;
    border-style: hidden; 
    box-shadow: 0 0.03em 0.03em ${ PLColor }; 
    border-bottom: 0.01em solid ${ PLColor };
`

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`

const ButtonPagination = styled.button`
    padding: 5px 10px;
    border-radius: 5px;
    color: ${ PColor };
    font-family: Roboto-Medium;
    font-size: 12px;
    cursor: pointer;
    border: none;
    outline: 0;
    margin: 0px 2px;
    :disabled:hover {background-color: transparent;}
    :hover {background-color: #dddddd;}
    ${ ({ active }) => active && css`background-color: #ddd;` }
`

const InputRange = styled.input`
    border: 1px solid ${ PLColor };
    outline: 0;
    border-radius: 5px;
    width: 60px;
    text-align: center;
    font-size: 12px;
    color: ${ PColor };
`

export default TableSearch