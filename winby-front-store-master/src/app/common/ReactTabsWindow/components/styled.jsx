import styled, { css } from 'styled-components'

export const Container = styled.div`
    ${ ({ height }) => height && css`
        height: ${ height };
        overflow: hidden;
    ` }
`

export const TabsWrapper = styled.div`
    display: flex;
    width: 100%;
    background-color: transparent;
`

export const Tab = styled.div`
    ${({ visible }) => (!visible && visible !== undefined) && css`display: none;`}
    width: ${ ({ active, totalTabs }) => {
        if (active) return '80%';
        return `calc(20% / ${ totalTabs - 1 })`
    } };
    background-color: ${ ({ active }) => active ? '#fff' : '#E4E4E4' };
    margin-left: 15px;
    text-align: center;
    padding: 9px 5px;
    font-size: 16px;
    color: #2A2A2A;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: .14s linear;
    cursor: pointer;
    &:first-child {
        margin-left: 0;
    }

    @media (min-width: 768px) {
        width: calc(100% / ${ ({ totalTabs }) => totalTabs });
        font-size: 18px;
    }
`

export const Wrapper = styled.div`
    background: #fff;
`